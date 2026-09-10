/* GET /api/shop-config
 *
 * Tells the checkout what it may offer. Until the Razorpay keys are added to
 * Vercel, "Pay online" simply doesn't appear — the shop keeps working on Cash
 * on Delivery and WhatsApp instead of showing a button that would fail.
 * Returns no secrets: the Razorpay key_id is public by design.
 */
import { json, config, SHIPPING } from "./_lib.mjs";

export default async function handler(req, res) {
  return json(res, 200, {
    online: config.hasRazorpay && config.hasDb,
    cod: config.hasCod,
    keyId: config.hasRazorpay ? config.rzpKeyId : null,
    shipping: { freeAbove: SHIPPING.freeAbove, local: SHIPPING.local, punjab: SHIPPING.punjab, india: SHIPPING.india },
  });
}
