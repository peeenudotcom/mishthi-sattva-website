/* POST /api/order-create
 *
 * Body: { items: [{id, weight, qty}], customer: {...}, payment_method: "online" | "cod" }
 *
 * Prices every line from the catalogue (the browser's numbers are ignored),
 * writes the order, and — for an online payment — opens a Razorpay order and
 * returns what the checkout widget needs. The order is only marked paid later,
 * by /api/order-verify, after the signature checks out.
 */
import { json, readBody, config, db, priceCart, cleanCustomer, deliveryFee, createRazorpayOrder, decrementStock, applyCoupon } from "./_lib.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  try {
    if (!config.hasDb) return json(res, 503, { error: "Online ordering isn't switched on yet. Please order on WhatsApp." });

    const body = await readBody(req);
    // "whatsapp" = the customer sent their order in chat and we're recording it;
    // nothing is charged, we confirm availability and payment in the chat.
    const allowed = ["online", "cod", "whatsapp"];
    const method = allowed.includes(body.payment_method) ? body.payment_method : "cod";
    if (method === "online" && !config.hasRazorpay) {
      return json(res, 503, { error: "Online payment isn't available right now — please send your order on WhatsApp." });
    }
    if (method === "cod" && !config.hasCod) {
      return json(res, 503, { error: "Cash on delivery isn't available right now — please send your order on WhatsApp." });
    }

    const customer = cleanCustomer(body.customer);
    const { items, subtotal } = await priceCart(body.items, { allowAskPrice: method === "whatsapp" });

    /* The browser sends a CODE, never an amount. Every rule — validity, dates,
       minimum, usage cap, first-order-only — is decided here. */
    const coupon = body.coupon ? await applyCoupon({
      code: body.coupon, subtotal, phone: customer.phone, email: customer.email,
    }) : null;
    const discount = coupon ? coupon.discount : 0;

    const delivery = deliveryFee(subtotal, customer.pincode);
    const total = subtotal + delivery - discount;
    if (method !== "whatsapp" && total < 1) return json(res, 400, { error: "That order total doesn't look right." });

    const row = {
      ...customer,
      user_email: customer.email || null,
      items,
      subtotal,
      delivery_fee: delivery,
      discount,
      coupon_code: coupon ? coupon.code : null,
      total,
      status: "new",
      source: method === "whatsapp" ? "whatsapp" : "website",
      payment_method: method,
      payment_status: "pending",
    };

    // For an online payment, open the Razorpay order FIRST so we never store a
    // row we can't tie back to a payment attempt.
    let rzp = null;
    if (method === "online") {
      rzp = await createRazorpayOrder({
        amountPaise: total * 100,
        receipt: `ms_${Date.now()}`,
        notes: { customer: customer.customer_name, phone: customer.phone },
      });
      row.razorpay_order_id = rzp.id;
    }

    const saved = (await db.insertOrder(row))?.[0] || {};

    // COD and WhatsApp orders are committed the moment they're placed. Online
    // orders wait for /api/order-verify — the stock isn't spoken for until the
    // money actually arrives.
    if (method !== "online") await decrementStock(items);

    // Count the code as used once the order is committed. A failure here must
    // never lose an order that is already recorded, so it only warns.
    if (coupon && method !== "online") {
      db.bumpCouponUse(coupon.id, coupon.used_count + 1).catch((e) => console.error("[coupon]", e.message));
    }

    return json(res, 200, {
      ok: true,
      orderId: saved.id,
      orderNo: saved.order_no,
      subtotal,
      delivery,
      discount,
      coupon: coupon ? { code: coupon.code, label: coupon.label } : null,
      total,
      payment_method: method,
      ...(rzp ? { razorpay: { orderId: rzp.id, amount: rzp.amount, currency: rzp.currency, keyId: config.rzpKeyId } } : {}),
    });
  } catch (err) {
    // Validation messages are written for customers; anything unexpected is not.
    const msg = err?.message || "Something went wrong.";
    const isUserFacing = !/Database error|SUPABASE|fetch failed/i.test(msg);
    if (!isUserFacing) console.error("[order-create]", msg);
    return json(res, isUserFacing ? 400 : 500, {
      error: isUserFacing ? msg : "We couldn't place that order just now. Please try again, or send it to us on WhatsApp.",
    });
  }
}
