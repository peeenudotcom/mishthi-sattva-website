/* Mishthi Sattva — the full product page (/product/<slug>).

   A real page rather than a popup: its own URL to share and for Google to
   index, room for the photo gallery, the seven detail sections as tabs, the
   legal declarations a food product must carry, and rows of other products to
   carry on browsing.

   It renders instantly from the bundled catalogue snapshot, then quietly
   upgrades to live database values (price, sizes, stock, gallery, the detail
   sections) once they arrive — so a price edited in /admin shows here without
   waiting for a rebuild. Exposes window.MSProductPage. */

(function () {
const CART_KEY = "ms_shop_cart";
const money = (n) => (n == null || isNaN(n) ? "Ask for price" : "₹" + Number(n).toLocaleString("en-IN"));
const hasPrice = (p) => p != null && !isNaN(p);
const snapshot = () => (window.MSShopData && window.MSShopData.MS_PRODUCTS) || [];
const cats = () => (window.MSShopData && window.MSShopData.MS_CATEGORIES) || [];
const catName = (id) => (cats().find((c) => c.id === id) || {}).name || "";

function slugFromUrl() {
  if (window.MS_PRODUCT_SLUG) return window.MS_PRODUCT_SLUG;            // baked in per page at build time
  try { return new URLSearchParams(location.search).get("p") || ""; } catch (e) { return ""; }
}

function normVar(raw) {
  return Array.isArray(raw)
    ? raw.filter((v) => v && v.weight).map((v) => ({
        weight: String(v.weight),
        price: v.price == null || v.price === "" ? null : Number(v.price),
        mrp: v.mrp == null || v.mrp === "" ? null : Number(v.mrp),
      }))
    : [];
}

/* One database row → the shape the page renders. */
function fromDb(r, fallback) {
  const base = fallback || {};
  let photo = r.photo || base.photo || "";
  if (photo.indexOf("/assets/") === 0) photo = ".." + photo;
  const variants = normVar(r.variants);
  const def = variants[0];
  return {
    id: r.slug, name: r.name, cat: r.category,
    variants,
    price: variants.length ? def.price : (r.price == null ? null : Number(r.price)),
    mrp: variants.length ? def.mrp : (r.mrp == null ? null : Number(r.mrp)),
    weight: variants.length ? def.weight : (r.weight || base.weight || ""),
    desc: r.short_desc || base.desc || "",
    facts: (r.benefits && r.benefits.length ? r.benefits : base.facts) || [],
    photo, gallery: Array.isArray(r.gallery) ? r.gallery : [],
    badge: r.badge || base.badge, tags: base.tags || [],
    rating: base.rating || 4.8, reviews: base.reviews || 0,
    in_stock: r.in_stock !== false, stock: r.stock,
    long_desc: r.long_desc || "", usage_info: r.usage_info || "",
    wellness_benefits: r.wellness_benefits || [], ingredients: r.ingredients || [],
    allergens: r.allergens || "", nutrition: r.nutrition || {},
    storage_info: r.storage_info || "", shelf_life: r.shelf_life || "",
    promise: r.promise || [], fssai_no: r.fssai_no || "",
  };
}

/* ---------------- gallery ---------------- */
function Gallery({ product }) {
  const shots = [product.photo].concat(product.gallery || []).filter(Boolean);
  const [i, setI] = React.useState(0);
  React.useEffect(() => { setI(0); }, [product.id]);
  const cur = shots[i] || shots[0];
  const step = (d) => setI((n) => (n + d + shots.length) % shots.length);

  return (
    <div className="ms-pp-gallery">
      <div className="ms-pp-shot">
        {cur ? <img src={cur} alt={product.name} /> : <div className="ms-pp-noshot">{product.name}</div>}
        {shots.length > 1 && (
          <React.Fragment>
            <button type="button" className="ms-pp-arrow is-prev" aria-label="Previous photo" onClick={() => step(-1)}>‹</button>
            <button type="button" className="ms-pp-arrow is-next" aria-label="Next photo" onClick={() => step(1)}>›</button>
          </React.Fragment>
        )}
        {product.badge && (
          <span className="ms-badge-glow ms-pp-badge" style={{ background: window.msBadgeStyle(product.badge).bg, color: window.msBadgeStyle(product.badge).fg, "--glow": window.msBadgeStyle(product.badge).bg }}>{product.badge}</span>
        )}
      </div>
      {shots.length > 1 && (
        <div className="ms-pp-thumbs">
          {shots.map((src, n) => (
            <button key={src + n} type="button" className={"ms-pp-thumb" + (n === i ? " is-on" : "")}
              aria-label={"Photo " + (n + 1)} onClick={() => setI(n)}>
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- delivery check ----------------
   Tells a shopper the real delivery charge for their PIN code before they
   commit. Rates come from the server so this can never quote a number the
   checkout then disagrees with. */
function DeliveryCheck({ subtotal }) {
  const [pin, setPin] = React.useState("");
  const [rates, setRates] = React.useState(null);
  const [said, setSaid] = React.useState(null);
  React.useEffect(() => {
    let alive = true;
    fetch("/api/shop-config").then((r) => r.json()).then((d) => alive && setRates(d.shipping)).catch(() => {});
    return () => { alive = false; };
  }, []);

  const check = (e) => {
    e.preventDefault();
    const p = pin.trim();
    if (!/^[1-9][0-9]{5}$/.test(p)) { setSaid({ ok: false, msg: "Please enter a valid 6-digit PIN code." }); return; }
    const r = rates || { freeAbove: 999, local: 0, punjab: 49, india: 99 };
    const fee = subtotal >= r.freeAbove ? 0
      : p === "151204" ? r.local
      : /^(14|15|16)/.test(p) ? r.punjab : r.india;
    const days = p === "151204" ? "1–3 working days" : /^(14|15|16)/.test(p) ? "2–4 working days" : "4–7 working days";
    setSaid({ ok: true, msg: (fee === 0 ? "Free delivery" : "Delivery " + money(fee)) + " · usually " + days });
  };

  return (
    <form className="ms-pp-pin" onSubmit={check}>
      <label htmlFor="ms-pin">Check delivery to your PIN code</label>
      <div className="ms-pp-pinrow">
        <input id="ms-pin" inputMode="numeric" maxLength={6} placeholder="Enter 6-digit pincode"
          value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} />
        <button type="submit">Check</button>
      </div>
      {said && <p className={"ms-pp-pinsaid" + (said.ok ? " is-ok" : " is-bad")}>{said.msg}</p>}
    </form>
  );
}

/* ---------------- other products ---------------- */
function ProductRow({ title, sub, items }) {
  if (!items.length) return null;
  return (
    <section className="ms-pp-row">
      <div className="ms-container">
        <h2>{title}</h2>
        {sub && <p className="ms-pp-rowsub">{sub}</p>}
        <div className="ms-pp-rowscroll">
          {items.map((p) => (
            <a key={p.id} className="ms-pp-mini" href={"/product/" + p.id}>
              <span className="ms-pp-minishot">{p.photo ? <img src={p.photo} alt={p.name} /> : <span />}</span>
              <span className="ms-pp-mininame">{p.name}</span>
              <span className="ms-pp-miniprice">
                {money(p.price)}
                {hasPrice(p.mrp) && hasPrice(p.price) && p.mrp > p.price && <s>{money(p.mrp)}</s>}
              </span>
              <span className="ms-pp-minicta">View</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- the page ---------------- */
function ProductPage() {
  const slug = slugFromUrl();
  const [product, setProduct] = React.useState(() => snapshot().find((p) => p.id === slug) || null);
  const [all, setAll] = React.useState(() => snapshot());
  const [vi, setVi] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);
  const [missing, setMissing] = React.useState(false);

  React.useEffect(() => {
    const D = window.MSData;
    if (!D || !D.configured) { if (!product) setMissing(true); return; }
    let alive = true;
    D.getProducts().then((rows) => {
      if (!alive || !rows) return;
      const snap = {}; snapshot().forEach((p) => { snap[p.id] = p; });
      const live = rows.filter((r) => r.in_stock !== false).map((r) => fromDb(r, snap[r.slug]));
      setAll(live);
      const mine = live.find((p) => p.id === slug);
      if (mine) setProduct(mine); else if (!product) setMissing(true);
    }).catch(() => { if (!product) setMissing(true); });
    return () => { alive = false; };
  }, [slug]);

  if (missing || (!product && !slug)) {
    return (
      <div className="ms-pp-empty">
        <h1>We couldn't find that product</h1>
        <p>It may have sold out or been renamed.</p>
        <a className="ms-pp-btn" href="/shop">Browse the shop</a>
      </div>
    );
  }
  if (!product) return <div className="ms-pp-empty"><p>Loading…</p></div>;

  const variants = product.variants || [];
  const sel = variants.length ? (variants[vi] || variants[0]) : { weight: product.weight, price: product.price, mrp: product.mrp };
  const off = hasPrice(sel.price) && hasPrice(sel.mrp) && sel.mrp > sel.price ? Math.round((1 - sel.price / sel.mrp) * 100) : 0;
  const soldOut = product.in_stock === false || (product.stock != null && Number(product.stock) <= 0);
  const low = !soldOut && product.stock != null && Number(product.stock) <= 5;

  const add = () => {
    const key = product.id + (variants.length ? "|" + sel.weight : "");
    let cart; try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { cart = []; }
    const ex = cart.find((i) => (i.key || i.id) === key);
    if (ex) ex.qty += qty;
    else cart.push({ id: product.id, key, name: product.name, price: sel.price, mrp: sel.mrp, weight: sel.weight, cat: product.cat, photo: product.photo, qty });
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
    setAdded(true);
  };

  const sameCat = all.filter((p) => p.id !== product.id && p.cat === product.cat).slice(0, 8);
  const popular = all.filter((p) => p.id !== product.id && (p.badge === "Bestseller" || (p.tags || []).indexOf("bestseller") !== -1)).slice(0, 8);
  const B = window.MS_BUSINESS || {};

  return (
    <React.Fragment>
      <div className="ms-container ms-pp-crumbs">
        <a href="/">Home</a><span>/</span><a href="/shop">Shop</a>
        {product.cat && <React.Fragment><span>/</span><a href={"/shop?cat=" + product.cat}>{catName(product.cat)}</a></React.Fragment>}
        <span>/</span><b>{product.name}</b>
      </div>

      <div className="ms-container ms-pp-top">
        <Gallery product={product} />

        <div className="ms-pp-buy">
          {product.cat && <p className="ms-pp-eyebrow">{catName(product.cat)}</p>}
          <h1>{product.name}</h1>
          {product.reviews > 0 && (
            <div className="ms-pp-rating">
              {[0,1,2,3,4].map((i) => <span key={i} style={{ opacity: i < Math.round(product.rating) ? 1 : .25 }}>★</span>)}
              <small>{product.rating.toFixed(1)} ({product.reviews} reviews)</small>
            </div>
          )}

          <div className="ms-pp-price">
            <b>{money(sel.price)}</b>
            {off > 0 && <s>{money(sel.mrp)}</s>}
            {off > 0 && <em>{off}% off</em>}
          </div>

          {(product.facts || []).length > 0 && (
            <p className="ms-pp-tagline">{product.facts.slice(0, 3).join(" • ")}</p>
          )}
          {product.desc && <p className="ms-pp-blurb">{product.desc}</p>}

          <ul className="ms-pp-ticks">
            {(window.MS_PROMISE || []).slice(0, 4).map((t) => <li key={t}>{t}</li>)}
          </ul>

          <p className="ms-pp-ship">Free delivery on orders above ₹999, anywhere in India.</p>

          <DeliveryCheck subtotal={hasPrice(sel.price) ? sel.price * qty : 0} />

          {variants.length > 1 && (
            <div className="ms-pp-size">
              <label>Select weight</label>
              {window.MSSizeSelect && <window.MSSizeSelect.SizeSelect variants={variants} index={vi} onPick={(i) => { setVi(i); setAdded(false); }} size="lg" />}
            </div>
          )}

          {soldOut ? (
            <p className="ms-pp-sold">Sold out for now — message us on WhatsApp and we'll tell you when the next batch is ready.</p>
          ) : (
            <React.Fragment>
              {low && <p className="ms-pp-low">Only {product.stock} left</p>}
              <div className="ms-pp-actions">
                <div className="ms-pp-qty">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                  <span>{qty}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>+</button>
                </div>
                <button type="button" className="ms-pp-add" onClick={add}>
                  {added ? "✓ Added to cart" : "Add to cart"}
                </button>
              </div>
              <a className="ms-pp-buynow" href="/shop?cart=1" onClick={(e) => { if (!added) { e.preventDefault(); add(); location.href = "/shop?cart=1"; } }}>
                Buy now →
              </a>
            </React.Fragment>
          )}

          <a className="ms-pp-ask" href={"https://wa.me/" + ((window.MS_CONFIG || {}).WHATSAPP || "") + "?text=" + encodeURIComponent("Hi! I have a question about " + product.name)} target="_blank" rel="noopener noreferrer">
            Questions? Chat with us on WhatsApp
          </a>
        </div>
      </div>

      <div className="ms-container">
        {window.MSProductDetails && <window.MSProductDetails.ProductTabs product={product} />}

        {/* Declarations a packaged food has to carry, in one place. */}
        <div className="ms-pp-legal">
          {(product.fssai_no || B.fssai) && <p><b>FSSAI Licence No:</b> {product.fssai_no || B.fssai}</p>}
          {B.legal && <p><b>Manufacturer / Marketer:</b> {B.legal}{B.address ? ", " + B.address : ""}</p>}
          {B.phone && <p><b>Customer care:</b> <a href={"tel:+" + B.phone}>+{B.phone}</a></p>}
          <p><b>Country of origin:</b> India</p>
          <p className="ms-pp-legalnote">Everything is made fresh in small batches and packed only after you order. Orders usually reach you in 4–7 working days; local Kotkapura deliveries in 1–3.</p>
        </div>
      </div>

      <ProductRow title="You may also like" sub={"More from " + (catName(product.cat) || "our kitchen")} items={sameCat} />
      <ProductRow title="What people order most" sub="Our best-selling products" items={popular} />
    </React.Fragment>
  );
}

window.MSProductPage = { ProductPage };
})();
