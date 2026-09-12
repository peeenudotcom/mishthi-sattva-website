/* POST /api/coupon-check
 *
 * Body: { code, items: [{id, weight, qty}], phone, email }
 *
 * Tells the checkout what a code is worth on this cart, so the shopper sees the
 * discount before committing. The cart is priced here too — a percentage has to
 * be taken off the real subtotal, not one the browser claims.
 *
 * This is a preview only. /api/order-create re-checks everything when the order
 * is actually placed, so nothing here can be replayed into a cheaper order.
 */
import { json, readBody, config, priceCart, applyCoupon } from "./_lib.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  try {
    if (!config.hasDb) return json(res, 503, { error: "Discount codes aren't available right now." });

    const b = await readBody(req);
    const code = String(b.code || "").trim();
    if (!code) return json(res, 400, { error: "Enter a code." });

    const { subtotal } = await priceCart(b.items);

    // The first-order rule needs to know who is asking. Without a phone we
    // simply can't check it, so say so rather than promising a discount that
    // will be refused at checkout.
    const phone = String(b.phone || "").replace(/\D/g, "").slice(-10);
    const email = String(b.email || "").trim().toLowerCase();
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      return json(res, 400, { error: "Enter your mobile number first, then apply the code." });
    }

    const coupon = await applyCoupon({ code, subtotal, phone, email });
    return json(res, 200, { ok: true, code: coupon.code, label: coupon.label, discount: coupon.discount, subtotal });
  } catch (err) {
    const msg = err?.message || "That code couldn't be applied.";
    const isUserFacing = !/Database error|SUPABASE|fetch failed/i.test(msg);
    if (!isUserFacing) console.error("[coupon-check]", msg);
    return json(res, 400, { error: isUserFacing ? msg : "We couldn't check that code just now." });
  }
}
