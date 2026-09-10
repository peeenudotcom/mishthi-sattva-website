/* Mishthi Sattva — shared helpers for the order/payment API.
 *
 * SECURITY MODEL
 * The browser may not be trusted with prices or order rows. It sends only
 * WHICH product and HOW MANY; every rupee in an order is looked up here from
 * the products table and recomputed server-side. Orders are written with the
 * Supabase service_role key, which bypasses row-level security and therefore
 * exists ONLY as a Vercel environment variable — never in this repo, never in
 * js/config.js, never in anything the browser downloads.
 */

const SUPABASE_URL = process.env.SUPABASE_URL || "https://wiuokqmggxkonxvzrnsb.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const RZP_KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const RZP_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

export const config = {
  hasDb: !!SERVICE_KEY,
  hasRazorpay: !!(RZP_KEY_ID && RZP_SECRET),
  // Cash on delivery is a business decision, not a side effect of the database
  // key being present — the owner turns it on with ENABLE_COD=true in Vercel.
  hasCod: !!SERVICE_KEY && String(process.env.ENABLE_COD || "").toLowerCase() === "true",
  rzpKeyId: RZP_KEY_ID,
};

/* ---------- responses ---------- */
export function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

export async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { throw new Error("Malformed request body"); }
}

/* ---------- supabase (service role) ---------- */
async function sb(path, opts = {}) {
  if (!SERVICE_KEY) throw new Error("Server is missing SUPABASE_SERVICE_ROLE_KEY");
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...opts,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`Database error (${r.status}): ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
}

export const db = {
  products: () => sb("products?select=slug,name,price,mrp,weight,variants,in_stock,stock"),
  insertOrder: (row) => sb("orders", { method: "POST", body: row, headers: { Prefer: "return=representation" } }),
  findOrderByRzp: (id) => sb(`orders?razorpay_order_id=eq.${encodeURIComponent(id)}&select=id,order_no,total,payment_status,items`),
  markPaid: (id, patch) => sb(`orders?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: patch, headers: { Prefer: "return=representation" } }),
};

/* ---------- delivery charges ----------
   Kept in one place so the checkout summary and the amount actually charged can
   never disagree. Rates are the owner's to set — change them here and in
   js/config.js (MS_SHIPPING) together. */
export const SHIPPING = {
  freeAbove: 999,        // ₹ — matches the "free delivery above ₹999" promise in the cart
  localPincodes: ["151204"], // Kotkapura
  local: 0,
  punjabPrefixes: ["14", "15", "16"], // Punjab/Chandigarh pincode ranges
  punjab: 49,
  india: 99,
};

export function deliveryFee(subtotal, pincode) {
  if (subtotal <= 0) return 0;
  if (subtotal >= SHIPPING.freeAbove) return 0;
  const pin = String(pincode || "").trim();
  if (SHIPPING.localPincodes.includes(pin)) return SHIPPING.local;
  if (SHIPPING.punjabPrefixes.some((p) => pin.startsWith(p))) return SHIPPING.punjab;
  return SHIPPING.india;
}

/* ---------- pricing ----------
   Resolves the real price of each requested line from the catalogue. A product
   sold in several weights prices the chosen weight; an unknown product, an
   out-of-stock one, or one whose price is "on request" is rejected rather than
   guessed. */
export async function priceCart(lines, { allowAskPrice = false } = {}) {
  if (!Array.isArray(lines) || !lines.length) throw new Error("Your cart is empty.");
  if (lines.length > 40) throw new Error("That's a very large order — please send it to us on WhatsApp.");

  const rows = await db.products();
  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  const items = [];
  let subtotal = 0;

  for (const line of lines) {
    const qty = Math.floor(Number(line.qty));
    if (!Number.isFinite(qty) || qty < 1 || qty > 50) throw new Error("Invalid quantity in your cart.");

    const p = bySlug.get(String(line.id || ""));
    if (!p) throw new Error(`"${line.id}" is no longer available.`);
    if (p.in_stock === false) throw new Error(`${p.name} is out of stock right now.`);

    const variants = Array.isArray(p.variants) ? p.variants : [];
    let price = p.price, weight = p.weight;
    if (variants.length) {
      const want = String(line.weight || "").trim();
      const v = want ? variants.find((x) => String(x.weight).trim() === want) : variants[0];
      if (!v) throw new Error(`${p.name} isn't sold in "${want}" any more.`);
      price = v.price; weight = v.weight;
    }
    if (price == null || isNaN(Number(price))) {
      // A WhatsApp order may carry these — we quote them in the chat. A paid
      // order may not: we'd have no amount to charge.
      if (!allowAskPrice) throw new Error(`${p.name} is priced on request — please order it on WhatsApp.`);
      items.push({ id: p.slug, name: p.name, qty, price: null, weight: weight || "" });
      continue;
    }
    if (p.stock != null && Number(p.stock) < qty) {
      throw new Error(`Only ${p.stock} left of ${p.name}.`);
    }

    price = Math.round(Number(price));
    subtotal += price * qty;
    items.push({ id: p.slug, name: p.name, qty, price, weight: weight || "" });
  }

  return { items, subtotal };
}

/* ---------- stock ----------
   Only products with a counted stock are touched; everything else is left
   alone. This is a read-then-write, not a database-level atomic decrement — at
   this shop's order volume that's fine, and priceCart has already refused
   anything that exceeds what's on hand. Never let a stock failure lose an
   order: the order is already recorded, so we log and move on. */
export async function decrementStock(items) {
  try {
    const rows = await db.products();
    const bySlug = new Map(rows.map((r) => [r.slug, r]));
    for (const it of items) {
      const p = bySlug.get(it.id);
      if (!p || p.stock == null) continue;
      const left = Math.max(0, Number(p.stock) - Number(it.qty));
      await sb(`products?slug=eq.${encodeURIComponent(it.id)}`, {
        method: "PATCH",
        body: left === 0 ? { stock: 0, in_stock: false } : { stock: left },
      });
    }
  } catch (e) {
    console.error("[stock] could not be updated:", e?.message);
  }
}

/* ---------- customer details ---------- */
export function cleanCustomer(c = {}) {
  const s = (v, max) => String(v == null ? "" : v).trim().slice(0, max);
  const out = {
    customer_name: s(c.name, 80),
    phone: s(c.phone, 20),
    email: s(c.email, 120).toLowerCase(),
    address: s(c.address, 400),
    city: s(c.city, 80) || "Kotkapura",
    state: s(c.state, 80),
    pincode: s(c.pincode, 10),
    note: s(c.note, 500) || null,
  };
  if (out.customer_name.length < 2) throw new Error("Please enter your name.");
  // Store one consistent shape (10 digits) whatever the customer typed, so the
  // admin's WhatsApp links and any future SMS always work.
  const digits = out.phone.replace(/\D/g, "").slice(-10);
  if (!/^[6-9][0-9]{9}$/.test(digits)) throw new Error("Please enter a valid 10-digit mobile number.");
  out.phone = digits;
  if (out.address.length < 8) throw new Error("Please enter your full delivery address.");
  if (!/^[1-9][0-9]{5}$/.test(out.pincode)) throw new Error("Please enter a valid 6-digit PIN code.");
  if (out.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(out.email)) throw new Error("Please check your email address.");
  return out;
}

/* ---------- razorpay (REST — no SDK dependency) ---------- */
const RZP_AUTH = () => "Basic " + Buffer.from(`${RZP_KEY_ID}:${RZP_SECRET}`).toString("base64");

export async function createRazorpayOrder({ amountPaise, receipt, notes }) {
  const r = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { Authorization: RZP_AUTH(), "Content-Type": "application/json" },
    body: JSON.stringify({ amount: amountPaise, currency: "INR", receipt, notes, payment_capture: 1 }),
  });
  const body = await r.json();
  if (!r.ok) throw new Error(body?.error?.description || "Could not start the payment.");
  return body;
}

export async function verifySignature({ orderId, paymentId, signature }) {
  const { createHmac, timingSafeEqual } = await import("node:crypto");
  const expected = createHmac("sha256", RZP_SECRET).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(String(signature || ""), "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}
