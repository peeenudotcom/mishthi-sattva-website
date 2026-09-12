/* POST /api/order-verify
 *
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 *
 * Razorpay signs every successful payment with our key secret. Only the server
 * knows that secret, so recomputing the HMAC here is what actually proves the
 * money arrived — the browser saying "payment succeeded" proves nothing.
 */
import { json, readBody, config, db, verifySignature, decrementStock, applyCouponUse } from "./_lib.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  try {
    if (!config.hasDb || !config.hasRazorpay) return json(res, 503, { error: "Payments aren't configured." });

    const b = await readBody(req);
    const orderId = String(b.razorpay_order_id || "");
    const paymentId = String(b.razorpay_payment_id || "");
    const signature = String(b.razorpay_signature || "");
    if (!orderId || !paymentId || !signature) return json(res, 400, { error: "Incomplete payment details." });

    const ok = await verifySignature({ orderId, paymentId, signature });
    if (!ok) {
      console.error("[order-verify] signature mismatch for", orderId);
      return json(res, 400, { error: "We couldn't verify that payment. If money has left your account, send us the payment ID on WhatsApp and we'll sort it out." });
    }

    const found = await db.findOrderByRzp(orderId);
    const order = found?.[0];
    if (!order) return json(res, 404, { error: "We couldn't find that order." });

    // Already confirmed (e.g. the customer refreshed) — return the same answer.
    if (order.payment_status === "paid") {
      return json(res, 200, { ok: true, orderNo: order.order_no, total: order.total, alreadyPaid: true });
    }

    const updated = (await db.markPaid(order.id, {
      payment_status: "paid",
      razorpay_payment_id: paymentId,
      paid_at: new Date().toISOString(),
      status: "confirmed",
    }))?.[0] || order;

    // Payment confirmed — now the stock and the discount code are genuinely
    // spoken for. Neither may lose an order that is already paid, so both warn.
    await decrementStock(order.items || updated.items || []);
    const usedCode = updated.coupon_code || order.coupon_code;
    if (usedCode) applyCouponUse(usedCode).catch((e) => console.error("[coupon]", e.message));

    return json(res, 200, { ok: true, orderNo: updated.order_no, total: updated.total });
  } catch (err) {
    console.error("[order-verify]", err?.message);
    return json(res, 500, { error: "We couldn't confirm that payment. Please send us the payment ID on WhatsApp." });
  }
}
