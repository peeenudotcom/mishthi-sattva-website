/* Mishthi Sattva — Shop app shell & state.
   Cart, wishlist, search, filters, quick-view, cart drawer, checkout → WhatsApp.
   Composes ShopParts + design-system components. Exposes window.MSShop. */

(function(){
const DS = window.MishthiSattvaDesignSystem_af8a45;
const { Button, GoldDivider, Input } = DS;
const { MS_CATEGORIES, MS_PRODUCTS } = window.MSShopData;
const P = window.MSShopParts;
const { I, money, catName, ProductCard, QuickView, Stepper, ProductMedia, Overlay } = P;

const PHONE = "918557942246";
const FREE_SHIP = 999;
const LS_CART = "ms_shop_cart";
const LS_WISH = "ms_shop_wish";
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };

const SORTS = [
  { id: "featured", name: "Featured" },
  { id: "price-asc", name: "Price: Low to High" },
  { id: "price-desc", name: "Price: High to Low" },
  { id: "rating", name: "Top Rated" },
  { id: "new", name: "Newest" },
];

/* ===================== HEADER ===================== */
function Header({ count, wishCount, onCart, onSearch, search, onWish, onHome, onShopAll }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "color-mix(in oklab, var(--background) 88%, transparent)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ background: "var(--forest-deep)", color: "var(--cream)", fontSize: 12, letterSpacing: "0.08em", textAlign: "center", padding: "7px 12px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><I.gift s={15} /> Free home delivery on orders over {money(FREE_SHIP)} · Complimentary gift this month</span>
      </div>
      <div className="shop-head" style={{ maxWidth: 1280, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", gap: 20 }}>
        <a href="../website/index.html" title="Back to Mishthi Sattva home" style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
          <img src="../../assets/mishthi-logo.png" alt="Mishthi Sattva" style={{ height: 44, width: 44, objectFit: "contain", borderRadius: 8 }} />
          <span>
            <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, letterSpacing: "0.02em", color: "var(--primary)", lineHeight: 1 }}>MISHTHI SATTVA</span>
            <span style={{ display: "block", marginTop: 3, fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.26em", color: "var(--accent)" }}>Pure · Hygienic · Homemade</span>
          </span>
        </a>
        <nav className="shop-nav" style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {[["Home", "../website/index.html"], ["Story", "../website/about.html"], ["Products", "../website/products.html"], ["Contact", "../website/contact.html"]].map(([t, h]) => (
            <a key={t} href={h} style={{ fontSize: 14, fontWeight: 600, color: "color-mix(in oklab, var(--foreground) 82%, transparent)" }}>{t}</a>
          ))}
        </nav>
        <div className="shop-search" style={{ flex: 1, maxWidth: 460, marginInline: "auto", position: "relative", display: "flex", alignItems: "center" }}>
          <span style={{ position: "absolute", left: 16, color: "var(--ink-300)" }}><I.search s={18} /></span>
          <input value={search} onChange={(e) => onSearch(e.target.value)} placeholder="Search laddus, masala, hair oil…"
            style={{ width: "100%", padding: "11px 16px 11px 44px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", background: "var(--card)", fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--foreground)", outline: "none" }}
            onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px color-mix(in oklab, var(--accent) 25%, transparent)"; }}
            onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconBtn onClick={onWish} label="Wishlist" badge={wishCount}><I.heart s={20} /></IconBtn>
          <IconBtn onClick={onCart} label="Cart" badge={count} highlight><I.bag s={21} /></IconBtn>
        </div>
      </div>
    </header>
  );
}

function IconBtn({ children, onClick, label, badge, highlight }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} aria-label={label} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: "relative", height: 44, width: 44, display: "grid", placeItems: "center", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", background: h || highlight ? "var(--primary)" : "var(--card)", color: h || highlight ? "var(--primary-foreground)" : "var(--primary)", cursor: "pointer", transition: "all .18s" }}>
      {children}
      {badge > 0 && <span style={{ position: "absolute", top: -5, right: -5, minWidth: 19, height: 19, padding: "0 5px", display: "grid", placeItems: "center", borderRadius: "var(--radius-pill)", background: "var(--accent)", color: "var(--forest-deep)", fontSize: 11, fontWeight: 800, border: "2px solid var(--background)" }}>{badge}</span>}
    </button>
  );
}

/* ===================== HERO ===================== */
function Hero({ onShopAll, onCategory }) {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(55% 60% at 82% 8%, color-mix(in oklab, var(--gold) 20%, transparent), transparent), radial-gradient(50% 60% at -5% 100%, color-mix(in oklab, var(--forest) 14%, transparent), transparent)" }} />
      <div className="shop-hero" style={{ position: "relative", maxWidth: 1280, margin: "0 auto", alignItems: "center" }}>
        <div style={{ minWidth: 0 }}>
          <GoldDivider>Ayurvedic · Satvic · Homemade</GoldDivider>
          <h1 style={{ margin: "18px 0 0", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(34px, 5.4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.01em", color: "var(--primary)" }}>
            The Homemade<br />Wellness Shop.<br /><span style={{ fontStyle: "italic", color: "var(--accent)" }}>Pure, by nature.</span>
          </h1>
          <p style={{ margin: "18px 0 0", maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
            {MS_PRODUCTS.length} small-batch products from our home kitchen in Kotkapura — laddus, sugar-free chyawanprash, masalas, hair care & skincare. No refined sugar, no preservatives.
          </p>
          <div style={{ marginTop: 26, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Button variant="forest" size="lg" onClick={onShopAll}>Shop All Products →</Button>
            <Button variant="outline" size="lg" onClick={() => onCategory("ayurvedic")}>Explore Ayurvedic</Button>
          </div>
          <div style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: "10px 26px" }}>
            {[["truck","Home delivery"],["shield","100% homemade"],["leaf","No preservatives"]].map(([ic,t]) => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "var(--primary)" }}>
                <span style={{ color: "var(--accent)" }}>{I[ic]({ s: 18 })}</span>{t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", minWidth: 0 }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: -20, borderRadius: 32, background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 22%, transparent), color-mix(in oklab, var(--forest) 12%, transparent))", filter: "blur(38px)" }} />
          <div style={{ position: "relative", overflow: "hidden", borderRadius: 32, border: "1px solid var(--border)", boxShadow: "var(--shadow-xl)" }}>
            {/* hero-products.jpg was byte-identical to founder.jpg, so the shop
                hero was accidentally showing the founder portrait — use the
                actual preparation/products scene instead */}
            <img src="../../assets/hero-products.png" alt="Homemade Ayurvedic products being prepared by hand" style={{ width: "100%", display: "block" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== CATEGORY RAIL ===================== */
function CategoryRail({ active, onCategory }) {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))", gap: 12 }}>
        <CatChip label="All Products" on={active === "all"} onClick={() => onCategory("all")} tint="var(--forest)" />
        {MS_CATEGORIES.map((c) => <CatChip key={c.id} label={c.name} on={active === c.id} onClick={() => onCategory(c.id)} tint={c.tint} count={MS_PRODUCTS.filter((p) => p.cat === c.id).length} />)}
      </div>
    </div>
  );
}
function CatChip({ label, on, onClick, tint, count }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, padding: "16px 16px", borderRadius: "var(--radius-xl)", cursor: "pointer", textAlign: "left",
        border: `1px solid ${on ? "var(--primary)" : h ? "var(--accent)" : "var(--border)"}`, background: on ? "var(--primary)" : "var(--card)", color: on ? "var(--primary-foreground)" : "var(--primary)", transition: "all .18s" }}>
      <span style={{ height: 34, width: 34, display: "grid", placeItems: "center", borderRadius: "var(--radius-pill)", background: on ? "color-mix(in oklab, var(--cream) 20%, transparent)" : "color-mix(in oklab, "+tint+" 16%, transparent)", color: on ? "var(--cream)" : tint }}><I.leaf s={18} /></span>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, lineHeight: 1.1 }}>{label}</span>
      {count != null && <span style={{ fontSize: 11, opacity: 0.7 }}>{count} items</span>}
      {count == null && <span style={{ fontSize: 11, opacity: 0.7 }}>{MS_PRODUCTS.length} items</span>}
    </button>
  );
}

/* ===================== TOOLBAR (sort + count) ===================== */
function Toolbar({ count, sort, onSort, title, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 34, color: "var(--primary)" }}>{title}</h2>
        <p style={{ marginTop: 4, fontSize: 14, color: "var(--muted-foreground)" }}>{sub || `${count} ${count === 1 ? "product" : "products"}`}</p>
      </div>
      <label style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--muted-foreground)" }}>
        Sort
        <select value={sort} onChange={(e) => onSort(e.target.value)}
          style={{ padding: "9px 14px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", background: "var(--card)", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--primary)", cursor: "pointer" }}>
          {SORTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </label>
    </div>
  );
}

/* ===================== CART DRAWER ===================== */
function CartDrawer({ items, onClose, onQty, onRemove, onCheckout, subtotal }) {
  const remaining = Math.max(0, FREE_SHIP - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIP) * 100);
  return (
    <Overlay onClose={onClose} align="end">
      <aside onClick={(e) => e.stopPropagation()} style={{ width: "min(440px, 96vw)", height: "100%", background: "var(--background)", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-xl)", animation: "msslide .25s var(--ease-out)" }}>
        <div style={{ padding: "20px 22px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "var(--primary)" }}>Your Cart ({items.reduce((n, i) => n + i.qty, 0)})</h3>
          <button onClick={onClose} aria-label="Close" style={{ height: 36, width: 36, display: "grid", placeItems: "center", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", background: "var(--card)", color: "var(--primary)", cursor: "pointer" }}><I.close /></button>
        </div>
        {items.length === 0 ? (
          <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 32, textAlign: "center" }}>
            <div>
              <div style={{ display: "grid", placeItems: "center", height: 80, width: 80, margin: "0 auto", borderRadius: "var(--radius-pill)", background: "var(--secondary)", color: "var(--accent)" }}><I.bag s={36} /></div>
              <p style={{ marginTop: 16, fontFamily: "var(--font-display)", fontSize: 22, color: "var(--primary)" }}>Your cart is empty</p>
              <p style={{ marginTop: 6, fontSize: 14, color: "var(--muted-foreground)" }}>Add some homemade goodness to get started.</p>
              <div style={{ marginTop: 18 }}><Button variant="forest" onClick={onClose}>Continue Shopping</Button></div>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--border)" }}>
              <p style={{ fontSize: 12.5, color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: 7 }}>
                <I.truck s={16} />
                {remaining > 0 ? <span>Add <b style={{ color: "var(--primary)" }}>{money(remaining)}</b> more for free delivery</span> : <span style={{ color: "var(--success)", fontWeight: 600 }}>You've unlocked free delivery!</span>}
              </p>
              <div style={{ marginTop: 8, height: 6, borderRadius: 99, background: "var(--secondary)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: pct + "%", background: "linear-gradient(90deg, var(--gold), var(--whatsapp))", transition: "width .3s" }} />
              </div>
            </div>
            <div style={{ flex: 1, overflow: "auto", padding: "8px 22px" }}>
              {items.map((it) => (
                <div key={it.id} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ width: 72, flexShrink: 0 }}><ProductMedia product={it} height={72} round={12} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--primary)", lineHeight: 1.2 }}>{it.name}</p>
                    <p style={{ marginTop: 2, fontSize: 12, color: "var(--muted-foreground)" }}>{it.weight} · {money(it.price)}</p>
                    <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <Stepper value={it.qty} onChange={(q) => onQty(it.id, q)} size="sm" />
                      <button onClick={() => onRemove(it.id)} aria-label="Remove" style={{ display: "inline-flex", alignItems: "center", gap: 4, border: "none", background: "transparent", color: "var(--ink-300)", fontSize: 12, cursor: "pointer" }}><I.trash s={15} /></button>
                    </div>
                  </div>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "var(--primary)" }}>{it.price == null ? "Ask for price" : money(it.price * it.qty)}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "18px 22px", borderTop: "1px solid var(--border)", background: "var(--card)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ color: "var(--muted-foreground)", fontSize: 14 }}>Subtotal</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24, color: "var(--primary)" }}>{money(subtotal)}</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)", marginBottom: 14 }}>Delivery & taxes confirmed on WhatsApp.</p>
              <button onClick={onCheckout} style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", borderRadius: "var(--radius-pill)", border: "none", background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Checkout →</button>
            </div>
          </React.Fragment>
        )}
      </aside>
    </Overlay>
  );
}

/* ===================== CHECKOUT ===================== */
function Checkout({ items, subtotal, onClose, onBack, onPlaced }) {
  const [form, setForm] = React.useState({ name: "", phone: "", address: "", city: "Kotkapura", note: "" });
  const [done, setDone] = React.useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const ship = subtotal >= FREE_SHIP || subtotal === 0 ? 0 : 49;
  const total = subtotal + ship;
  const valid = form.name.trim() && form.phone.trim().length >= 10 && form.address.trim();

  const placeOrder = () => {
    const lines = items.map((it) => `• ${it.name} (${it.weight}) × ${it.qty} — ${it.price == null ? "Ask for price" : money(it.price * it.qty)}`).join("\n");
    const msg = `Namaste Mishthi Sattva! 🌿 I'd like to place an order:\n\n${lines}\n\nSubtotal: ${money(subtotal)}\nDelivery: ${ship === 0 ? "Free" : money(ship)}\nTotal: ${money(total)}\n\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}, ${form.city}${form.note ? `\nNote: ${form.note}` : ""}`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
    setDone(true);
  };

  return (
    <Overlay onClose={onClose} align="center">
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(820px, 95vw)", maxHeight: "92vh", overflow: "auto", background: "var(--background)", borderRadius: "var(--radius-3xl)", boxShadow: "var(--shadow-xl)", border: "1px solid var(--border)" }}>
        {done ? (
          <div style={{ padding: "56px 40px", textAlign: "center" }}>
            <div style={{ display: "grid", placeItems: "center", height: 84, width: 84, margin: "0 auto", borderRadius: "var(--radius-pill)", background: "var(--success)", color: "#fff" }}><I.check s={42} /></div>
            <h2 style={{ marginTop: 22, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 36, color: "var(--primary)" }}>Order sent on WhatsApp!</h2>
            <p style={{ marginTop: 12, maxWidth: 460, marginInline: "auto", fontSize: 16, lineHeight: 1.6, color: "var(--muted-foreground)" }}>We've opened a WhatsApp chat with your order summary. Send it to us and we'll confirm availability, delivery time and payment. Dhanyavaad! 🙏</p>
            <div style={{ marginTop: 26 }}><Button variant="forest" size="lg" onClick={onPlaced}>Continue Shopping</Button></div>
          </div>
        ) : (
          <div className="shop-checkout" style={{ display: "grid" }}>
            <div style={{ padding: 32 }}>
              <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "none", background: "transparent", color: "var(--muted-foreground)", fontSize: 13, cursor: "pointer", marginBottom: 8 }}>← Back to cart</button>
              <GoldDivider>Checkout</GoldDivider>
              <h2 style={{ margin: "14px 0 0", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 30, color: "var(--primary)" }}>Delivery details</h2>
              <p style={{ marginTop: 6, fontSize: 14, color: "var(--muted-foreground)" }}>We confirm every order personally on WhatsApp — no online payment needed now.</p>
              <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
                <Input label="Full Name" placeholder="Your name" value={form.name} onChange={set("name")} />
                <Input label="WhatsApp Number" type="tel" placeholder="10-digit mobile" value={form.phone} onChange={set("phone")} />
                <Input label="Delivery Address" multiline rows={2} placeholder="House / street / area" value={form.address} onChange={set("address")} />
                <Input label="City" value={form.city} onChange={set("city")} />
                <Input label="Order Note (optional)" placeholder="Any preferences or gift message" value={form.note} onChange={set("note")} />
              </div>
            </div>
            <div style={{ padding: 32, background: "var(--card)", borderLeft: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "var(--primary)" }}>Order summary</h3>
              <div style={{ marginTop: 14, flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((it) => (
                  <div key={it.id} style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 13.5 }}>
                    <span style={{ color: "var(--foreground)" }}>{it.name} <span style={{ color: "var(--muted-foreground)" }}>× {it.qty}</span></span>
                    <span style={{ fontWeight: 600, color: "var(--primary)" }}>{it.price == null ? "Ask for price" : money(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 7, fontSize: 14 }}>
                <Row k="Subtotal" v={money(subtotal)} />
                <Row k="Delivery" v={ship === 0 ? "Free" : money(ship)} accent={ship === 0} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, paddingTop: 10, borderTop: "1px dashed var(--border)" }}>
                  <span style={{ fontWeight: 700, color: "var(--primary)" }}>Total</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26, color: "var(--primary)" }}>{money(total)}</span>
                </div>
                {items.some((i) => i.price == null) && (
                  <p style={{ marginTop: 8, fontSize: 12, lineHeight: 1.5, color: "var(--accent)" }}>
                    Some items are priced on request — we'll confirm those on WhatsApp, so the total above may change.
                  </p>
                )}
              </div>
              <button onClick={placeOrder} disabled={!valid} style={{ marginTop: 18, width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, padding: "15px", borderRadius: "var(--radius-pill)", border: "none", background: valid ? "var(--whatsapp)" : "var(--muted)", color: valid ? "#fff" : "var(--muted-foreground)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, cursor: valid ? "pointer" : "not-allowed", boxShadow: valid ? "var(--shadow-whatsapp)" : "none" }}>
                <I.wa s={20} /> Place Order on WhatsApp
              </button>
              <p style={{ marginTop: 10, fontSize: 11.5, textAlign: "center", color: "var(--muted-foreground)" }}>By placing the order you'll be taken to WhatsApp to confirm.</p>
            </div>
          </div>
        )}
      </div>
    </Overlay>
  );
}
function Row({ k, v, accent }) {
  return <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--muted-foreground)" }}>{k}</span><span style={{ fontWeight: 600, color: accent ? "var(--success)" : "var(--primary)" }}>{v}</span></div>;
}

/* ===================== TOASTS ===================== */
function Toasts({ toasts }) {
  return (
    <div style={{ position: "fixed", bottom: 22, left: "50%", transform: "translateX(-50%)", zIndex: 120, display: "flex", flexDirection: "column", gap: 10, alignItems: "center", pointerEvents: "none" }}>
      {toasts.map((t) => (
        <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--forest-deep)", color: "var(--cream)", padding: "12px 18px", borderRadius: "var(--radius-pill)", boxShadow: "var(--shadow-lg)", fontSize: 14, fontWeight: 500, animation: "mstoast .3s var(--ease-out)" }}>
          <span style={{ display: "grid", placeItems: "center", height: 22, width: 22, borderRadius: "var(--radius-pill)", background: "var(--success)", color: "#fff" }}><I.check s={14} /></span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

/* ===================== FOOTER ===================== */
function Footer() {
  return (
    <footer style={{ marginTop: 80, background: "var(--primary)", color: "var(--primary-foreground)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 36 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="../../assets/mishthi-logo.png" alt="Mishthi Sattva" style={{ height: 52, width: 52, objectFit: "contain", borderRadius: 8 }} />
            <div><p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19 }}>MISHTHI SATTVA</p><p style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.26em", color: "var(--accent)" }}>Pure · Hygienic · Homemade</p></div>
          </div>
          <p className="ms-hindi" style={{ marginTop: 16, maxWidth: 300, fontSize: 14, color: "color-mix(in oklab, var(--cream) 72%, transparent)" }}>घर की रसोई से… आपके परिवार की सेहत तक।</p>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--accent)", marginBottom: 14 }}>Shop</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9, fontSize: 14, color: "color-mix(in oklab, var(--cream) 82%, transparent)" }}>
            {MS_CATEGORIES.map((c) => <li key={c.id}>{c.name}</li>)}
          </ul>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--accent)", marginBottom: 14 }}>Contact</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9, fontSize: 14, color: "color-mix(in oklab, var(--cream) 82%, transparent)" }}>
            <li>📞 8557942246</li><li>📍 Kotkapura, Punjab</li><li>🚚 Home delivery available</li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid color-mix(in oklab, var(--cream) 12%, transparent)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "18px 24px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, fontSize: 12, color: "color-mix(in oklab, var(--cream) 60%, transparent)" }}>
          <span>© {new Date().getFullYear()} Mishthi Sattva. All rights reserved.</span>
          <span>Crafted with love in Kotkapura, Punjab.</span>
        </div>
      </div>
    </footer>
  );
}

/* ===================== APP ===================== */
function Shop() {
  const [cart, setCart] = React.useState(() => load(LS_CART, []));
  const [wish, setWish] = React.useState(() => load(LS_WISH, []));
  const [search, setSearch] = React.useState("");
  const [cat, setCat] = React.useState("all");
  const [sort, setSort] = React.useState("featured");
  const [quick, setQuick] = React.useState(null);
  const [view, setView] = React.useState(null); // null | 'cart' | 'checkout' | 'wishlist'
  const [toasts, setToasts] = React.useState([]);
  const gridRef = React.useRef(null);

  React.useEffect(() => { localStorage.setItem(LS_CART, JSON.stringify(cart)); }, [cart]);
  React.useEffect(() => { localStorage.setItem(LS_WISH, JSON.stringify(wish)); }, [wish]);

  const toast = (msg) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2200);
  };

  const addToCart = (product, qty = 1) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === product.id);
      if (ex) return c.map((i) => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      const { id, name, price, weight, cat, photo, mrp } = product;
      return [...c, { id, name, price, weight, cat, photo, mrp, qty }];
    });
    toast(`${product.name} added to cart`);
  };
  const setQty = (id, qty) => setCart((c) => c.map((i) => i.id === id ? { ...i, qty } : i));
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const toggleWish = (id) => setWish((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]);

  /* Items with an unconfirmed price contribute 0 here, so the subtotal only
     covers priced items — the checkout notes this rather than implying free. */
  const subtotal = cart.reduce((n, i) => n + (i.price || 0) * i.qty, 0);
  const count = cart.reduce((n, i) => n + i.qty, 0);

  const goCategory = (c) => { setCat(c); setSearch(""); setTimeout(() => gridRef.current && window.scrollTo({ top: gridRef.current.offsetTop - 80, behavior: "smooth" }), 0); };
  const shopAll = () => goCategory("all");

  let list = MS_PRODUCTS.filter((p) => (cat === "all" || p.cat === cat) && (!search || (p.name + " " + p.desc + " " + catName(p.cat)).toLowerCase().includes(search.toLowerCase())));
  const wishList = MS_PRODUCTS.filter((p) => wish.includes(p.id));
  list = [...list].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "new") return (b.tags.includes("new") ? 1 : 0) - (a.tags.includes("new") ? 1 : 0);
    return (b.tags.includes("bestseller") ? 1 : 0) - (a.tags.includes("bestseller") ? 1 : 0);
  });

  const title = search ? `Results for "${search}"` : cat === "all" ? "All Products" : catName(cat);

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", color: "var(--foreground)" }}>
      <Header count={count} wishCount={wish.length} search={search} onSearch={setSearch} onCart={() => setView("cart")} onWish={() => setView("wishlist")} onHome={shopAll} onShopAll={shopAll} />
      <Hero onShopAll={shopAll} onCategory={goCategory} />
      <section style={{ padding: "8px 0 4px" }}><CategoryRail active={cat} onCategory={goCategory} /></section>
      <section ref={gridRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px 0" }}>
        <Toolbar count={list.length} sort={sort} onSort={setSort} title={title} />
        {list.length === 0 ? (
          <div style={{ padding: "60px 0", textAlign: "center", color: "var(--muted-foreground)" }}>
            <div style={{ display: "grid", placeItems: "center", height: 70, width: 70, margin: "0 auto", borderRadius: "var(--radius-pill)", background: "var(--secondary)", color: "var(--accent)" }}><I.search s={30} /></div>
            <p style={{ marginTop: 16, fontFamily: "var(--font-display)", fontSize: 22, color: "var(--primary)" }}>No products found</p>
            <p style={{ marginTop: 6 }}>Try another search or browse all products.</p>
            <div style={{ marginTop: 16 }}><Button variant="outline" onClick={shopAll}>View All Products</Button></div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(228px, 1fr))", gap: 18 }}>
            {list.map((p) => <ProductCard key={p.id} product={p} onOpen={setQuick} onAdd={addToCart} onToggleWish={toggleWish} wished={wish.includes(p.id)} />)}
          </div>
        )}
      </section>
      <Footer />

      {quick && <QuickView product={quick} onClose={() => setQuick(null)} onAdd={addToCart} onToggleWish={toggleWish} wished={wish.includes(quick.id)} />}
      {view === "cart" && <CartDrawer items={cart} subtotal={subtotal} onClose={() => setView(null)} onQty={setQty} onRemove={removeItem} onCheckout={() => setView("checkout")} />}
      {view === "checkout" && <Checkout items={cart} subtotal={subtotal} onClose={() => setView(null)} onBack={() => setView("cart")} onPlaced={() => { setCart([]); setView(null); }} />}
      {view === "wishlist" && <WishlistDrawer items={wishList} onClose={() => setView(null)} onAdd={addToCart} onToggleWish={toggleWish} onOpen={(p) => { setView(null); setQuick(p); }} />}
      <Toasts toasts={toasts} />
    </div>
  );
}

/* ===================== WISHLIST DRAWER ===================== */
function WishlistDrawer({ items, onClose, onAdd, onToggleWish, onOpen }) {
  return (
    <Overlay onClose={onClose} align="end">
      <aside onClick={(e) => e.stopPropagation()} style={{ width: "min(440px, 96vw)", height: "100%", background: "var(--background)", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-xl)", animation: "msslide .25s var(--ease-out)" }}>
        <div style={{ padding: "20px 22px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "var(--primary)" }}>Wishlist ({items.length})</h3>
          <button onClick={onClose} aria-label="Close" style={{ height: 36, width: 36, display: "grid", placeItems: "center", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", background: "var(--card)", color: "var(--primary)", cursor: "pointer" }}><I.close /></button>
        </div>
        {items.length === 0 ? (
          <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 32, textAlign: "center" }}>
            <div>
              <div style={{ display: "grid", placeItems: "center", height: 80, width: 80, margin: "0 auto", borderRadius: "var(--radius-pill)", background: "var(--secondary)", color: "var(--destructive)" }}><I.heart s={36} /></div>
              <p style={{ marginTop: 16, fontFamily: "var(--font-display)", fontSize: 22, color: "var(--primary)" }}>No saved items yet</p>
              <p style={{ marginTop: 6, fontSize: 14, color: "var(--muted-foreground)" }}>Tap the heart on any product to save it here.</p>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, overflow: "auto", padding: "8px 22px" }}>
            {items.map((it) => (
              <div key={it.id} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ width: 72, flexShrink: 0, cursor: "pointer" }} onClick={() => onOpen(it)}><ProductMedia product={it} height={72} round={12} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p onClick={() => onOpen(it)} style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--primary)", lineHeight: 1.2, cursor: "pointer" }}>{it.name}</p>
                  <p style={{ marginTop: 2, fontSize: 13, color: "var(--primary)", fontWeight: 600 }}>{money(it.price)} <span style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>· {it.weight}</span></p>
                  <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                    <button onClick={() => onAdd(it, 1)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 13px", borderRadius: "var(--radius-pill)", border: "none", background: "var(--primary)", color: "var(--primary-foreground)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}><I.bag s={15} /> Add</button>
                    <button onClick={() => onToggleWish(it.id)} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 11px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", background: "var(--card)", color: "var(--ink-500)", fontSize: 13, cursor: "pointer" }}><I.trash s={14} /> Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </Overlay>
  );
}

window.MSShop = { Shop };
})();
