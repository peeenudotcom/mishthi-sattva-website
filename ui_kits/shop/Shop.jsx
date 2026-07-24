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

/* ---------- database → shop shape ----------
   The DB owns the commercial fields (name, price, stock, photo). Presentation
   extras the schema doesn't carry (rating, review count, tags) are merged from
   the local catalogue by slug, so cards keep their look. Unknown products still
   render with safe defaults. */
function mergeFromDb(rows) {
  if (!rows || !rows.length) return null;
  const local = {};
  MS_PRODUCTS.forEach((p) => { local[p.id] = p; });
  return rows
    .filter((r) => r.in_stock !== false)
    .map((r) => {
      const base = local[r.slug] || {};
      let photo = r.photo || base.photo;
      // DB stores root-relative paths ("/assets/x.png"); the shop lives two
      // levels down, so normalise to a relative path that works either way.
      if (photo && photo.indexOf("/assets/") === 0) photo = ".." + "/.." + photo;
      return {
        id: r.slug,
        name: r.name,
        cat: r.category,
        price: r.price == null ? null : Number(r.price),
        mrp: r.mrp == null ? null : Number(r.mrp),
        weight: r.weight || base.weight || "",
        desc: r.short_desc || base.desc || "",
        facts: (r.benefits && r.benefits.length ? r.benefits : base.facts) || [],
        photo: photo,
        badge: base.badge,
        tags: base.tags || [],
        rating: base.rating || 4.8,
        reviews: base.reviews || 0,
      };
    });
}

/* ===================== HEADER ===================== */
function Header({ count, wishCount, onCart, onSearch, search, onWish, onHome, onShopAll, products, onPick }) {
  const [focused, setFocused] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  // typeahead suggestions: match the query against name / category / benefits
  const q = search.trim().toLowerCase();
  const suggestions = q
    ? (products || []).filter((p) => {
        const hay = (p.name + " " + catName(p.cat) + " " + (p.facts || []).join(" ")).toLowerCase();
        return hay.includes(q);
      }).slice(0, 6)
    : [];
  const showList = focused && q.length >= 1 && suggestions.length > 0;

  const choose = (p) => { setFocused(false); setActive(-1); if (onPick) onPick(p); };
  const onKey = (e) => {
    if (!showList) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); choose(suggestions[active]); }
    else if (e.key === "Escape") { setFocused(false); setActive(-1); }
  };
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "var(--primary)", borderBottom: "1px solid color-mix(in oklab, var(--cream) 12%, transparent)", boxShadow: "0 8px 24px -12px color-mix(in oklab, var(--forest-deep) 60%, transparent)" }}>
      {/* Single-tier bar matching the website header: logo left, nav centre, actions right. */}
      <div className="shop-head" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", minHeight: 88, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <a href="../website/index.html" title="Back to Mishthi Sattva home" style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <img src="../../assets/mishthi-logo-white.png" alt="Mishthi Sattva — Ayurvedic, Satvic, Homemade" style={{ height: 66, width: "auto", objectFit: "contain", display: "block" }} />
        </a>
        <nav className="shop-nav" style={{ display: "flex", alignItems: "center", gap: 30 }}>
          {[["Home", "../website/index.html"], ["Story", "../website/about.html"], ["Shop", "../shop/index.html"], ["Contact", "../website/contact.html"]].map(([t, h]) => {
            const on = t === "Shop";
            return <a key={t} href={h} style={{ fontSize: 15, fontWeight: on ? 700 : 600, color: on ? "var(--cream)" : "color-mix(in oklab, var(--cream) 78%, transparent)", borderBottom: on ? "2px solid var(--accent)" : "2px solid transparent", paddingBottom: 3 }}>{t}</a>;
          })}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="shop-search" style={{ width: 230, position: "relative", display: "flex", alignItems: "center" }}>
            <span style={{ position: "absolute", left: 14, color: "var(--ink-300)", zIndex: 1, display: "inline-flex" }}><I.search s={17} /></span>
            <input value={search} onChange={(e) => { onSearch(e.target.value); setActive(-1); }} placeholder="Search products…"
              role="combobox" aria-expanded={showList} aria-autocomplete="list"
              onKeyDown={onKey}
              style={{ width: "100%", padding: "10px 14px 10px 40px", borderRadius: showList ? "16px 16px 0 0" : "var(--radius-pill)", border: "1px solid var(--border)", background: "var(--card)", fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--foreground)", outline: "none" }}
              onFocus={(e) => { setFocused(true); e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px color-mix(in oklab, var(--accent) 25%, transparent)"; }}
              onBlur={(e) => { setTimeout(() => setFocused(false), 150); e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }} />
            {showList && (
              <ul role="listbox" style={{ position: "absolute", top: "100%", left: 0, right: 0, margin: 0, padding: "6px", listStyle: "none", background: "var(--card)", border: "1px solid var(--accent)", borderTop: "none", borderRadius: "0 0 16px 16px", boxShadow: "var(--shadow-lg)", zIndex: 60, maxHeight: 360, overflow: "auto" }}>
                {suggestions.map((p, i) => (
                  <li key={p.id} role="option" aria-selected={i === active}
                    onMouseDown={(e) => { e.preventDefault(); choose(p); }}
                    onMouseEnter={() => setActive(i)}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 10px", borderRadius: 10, cursor: "pointer", background: i === active ? "color-mix(in oklab, var(--secondary) 60%, transparent)" : "transparent" }}>
                    <span style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 8, overflow: "hidden", background: "var(--cream)", display: "grid", placeItems: "center" }}>
                      {p.photo ? <img src={p.photo} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} /> : <I.leaf s={18} />}
                    </span>
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: "block", fontWeight: 600, fontSize: 14, color: "var(--primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</span>
                      <span style={{ display: "block", fontSize: 12, color: "var(--muted-foreground)" }}>{catName(p.cat)}{p.price != null ? " · " + money(p.price) : ""}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <a href="../website/account.html" aria-label="My account" title="My account"
             style={{ height: 44, width: 44, display: "grid", placeItems: "center", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", background: "var(--card)", color: "var(--primary)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" /></svg>
          </a>
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
function Hero({ onShopAll, onCategory, products }) {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(55% 60% at 82% 8%, color-mix(in oklab, var(--gold) 20%, transparent), transparent), radial-gradient(50% 60% at -5% 100%, color-mix(in oklab, var(--forest) 14%, transparent), transparent)" }} />
      <div className="shop-hero" style={{ position: "relative", maxWidth: 1280, margin: "0 auto", alignItems: "center" }}>
        <div style={{ minWidth: 0 }}>
          <GoldDivider>Ayurvedic · Satvic · Homemade</GoldDivider>
          <h1 style={{ margin: "18px 0 0", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(38px, 5.9vw, 62px)", lineHeight: 1.08, letterSpacing: "-0.01em", color: "var(--primary)" }}>
            The Homemade<br />Wellness Shop.<br /><span style={{ fontStyle: "italic", color: "var(--accent)" }}>Pure, by nature.</span>
          </h1>
          <p style={{ margin: "18px 0 0", maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
            {products.length} small-batch products from our home kitchen in Kotkapura — laddus, sugar-free chyawanprash, masalas, hair care & skincare. No refined sugar, no preservatives.
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
          <div style={{ position: "relative", overflow: "hidden", borderRadius: 32, aspectRatio: "4 / 5", border: "1px solid var(--border)", boxShadow: "var(--shadow-xl)" }}>
            <img src="../../assets/shop-hero-packing.png" alt="Kiran Bansal packing a Mishthi Sattva gift box of homemade laddus and wellness products" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== CATEGORY RAIL ===================== */
function CategoryRail({ active, onCategory, products }) {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))", gap: 12 }}>
        <CatChip label="All Products" on={active === "all"} onClick={() => onCategory("all")} tint="var(--forest)" total={products.length} />
        {MS_CATEGORIES.map((c) => <CatChip key={c.id} label={c.name} on={active === c.id} onClick={() => onCategory(c.id)} tint={c.tint} count={products.filter((p) => p.cat === c.id).length} />)}
      </div>
    </div>
  );
}
function CatChip({ label, on, onClick, tint, count, total }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, padding: "16px 16px", borderRadius: "var(--radius-xl)", cursor: "pointer", textAlign: "left",
        border: `1px solid ${on ? "var(--primary)" : h ? "var(--accent)" : "var(--border)"}`, background: on ? "var(--primary)" : "var(--card)", color: on ? "var(--primary-foreground)" : "var(--primary)", transition: "all .18s" }}>
      <span style={{ height: 34, width: 34, display: "grid", placeItems: "center", borderRadius: "var(--radius-pill)", background: on ? "color-mix(in oklab, var(--cream) 20%, transparent)" : "color-mix(in oklab, "+tint+" 16%, transparent)", color: on ? "var(--cream)" : tint }}><I.leaf s={18} /></span>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, lineHeight: 1.1 }}>{label}</span>
      {count != null && <span style={{ fontSize: 11, opacity: 0.7 }}>{count} items</span>}
      {count == null && total != null && <span style={{ fontSize: 11, opacity: 0.7 }}>{total} items</span>}
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

    /* Save a record of the order, then hand off to WhatsApp.
       The WhatsApp handoff must NEVER be blocked by the database — losing a
       real order because a save failed would be far worse than losing the
       record. So this is fire-and-forget and failures are only logged. */
    if (window.MSData && window.MSData.configured) {
      window.MSData.createOrder({
        customer_name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        note: form.note || null,
        items: items.map((it) => ({ id: it.id, name: it.name, qty: it.qty, price: it.price, weight: it.weight })),
        subtotal: subtotal,
        delivery_fee: ship,
        total: total,
        source: "website",
      }).catch(function (err) {
        console.warn("[order] could not be saved to the database:", err.message);
      });
    }

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
  // Mirrors the website footer (ui_kits/website/Sections.jsx) so every page shares
  // one footer. Paths are relative to /shop: ../website/* for pages, ../../assets for images.
  const link = { fontSize: 14, color: "color-mix(in oklab, var(--cream) 80%, transparent)" };
  const heading = { fontFamily: "var(--font-display)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--accent)" };
  return (
    <footer style={{ marginTop: 80, background: "var(--primary)", color: "var(--primary-foreground)" }}>
      <div className="ms-container ms-stack" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr", gap: 40, padding: "72px 24px 48px" }}>
        <div>
          {/* transparent brand lockup (background removed) — logo sits directly on the green footer */}
          <img src="../../assets/mishthi-logo-white.png" alt="Mishthi Sattva — Ayurvedic, Satvic, Homemade" style={{ height: 96, width: "auto", objectFit: "contain", display: "block" }} />
          <p style={{ marginTop: 16, maxWidth: 300, fontSize: 14, lineHeight: 1.6, color: "color-mix(in oklab, var(--cream) 78%, transparent)" }}>Pure, hygienic, homemade Ayurvedic foods, spices and wellness — handmade in small batches in Kotkapura, Punjab.</p>
          <p className="ms-hindi" style={{ marginTop: 14, fontSize: 14, color: "color-mix(in oklab, var(--cream) 65%, transparent)" }}>घर की रसोई से… आपके परिवार की सेहत तक।</p>
        </div>
        <div>
          <p style={heading}>Shop</p>
          <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 9, listStyle: "none", padding: 0 }}>
            {MS_CATEGORIES.map((c) => <li key={c.id} style={link}>{c.name}</li>)}
          </ul>
        </div>
        <div>
          <p style={heading}>Company</p>
          <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 9, listStyle: "none", padding: 0 }}>
            <li><a href="../website/index.html" style={link}>Home</a></li>
            <li><a href="../website/about.html" style={link}>Our Story</a></li>
            <li><a href="../shop/index.html" style={link}>Shop</a></li>
            <li><a href="../website/contact.html" style={link}>Contact</a></li>
          </ul>
        </div>
        <div>
          <p style={heading}>Get in Touch</p>
          <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0 }}>
            <li style={link}>📞 <a href={"tel:+91" + PHONE.replace(/^91/, "")} style={{ color: "inherit" }}>+91 {PHONE.replace(/^91/, "")}</a></li>
            <li style={link}>💬 <a href={"https://wa.me/" + PHONE} style={{ color: "inherit" }}>Order on WhatsApp</a></li>
            <li style={link}>📍 9/333, Kot Kapura, Faridkot,<br />Punjab 151204</li>
            <li style={link}>🚚 Home delivery in Kotkapura &amp; nearby</li>
            <li style={link}>🕐 Mon–Sat, 9am–7pm</li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid color-mix(in oklab, var(--cream) 12%, transparent)" }}>
        <div className="ms-container" style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, padding: "18px 24px", fontSize: 12, color: "color-mix(in oklab, var(--cream) 60%, transparent)" }}>
          <p>© {new Date().getFullYear()} Mishthi Sattva. All rights reserved. · FSSAI Reg. No. 22126010000026</p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <p style={{ display: "flex", gap: 16 }}>
              <a href="../website/privacy.html" style={{ color: "inherit" }}>Privacy</a>
              <a href="../website/terms.html" style={{ color: "inherit" }}>Terms</a>
              <a href="../website/shipping.html" style={{ color: "inherit" }}>Shipping &amp; Returns</a>
            </p>
            <p style={{ margin: 0 }}>Crafted by <span style={{ color: "var(--accent)", fontWeight: 600 }}>TARAhut AI Labs</span></p>
          </div>
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
  /* Start from the bundled catalogue so the shop renders instantly and still
     works if the database is unreachable; swap in live data once it arrives. */
  const [catalogue, setCatalogue] = React.useState(MS_PRODUCTS);
  const [liveData, setLiveData] = React.useState(false);
  const gridRef = React.useRef(null);

  React.useEffect(() => {
    if (!window.MSData || !window.MSData.configured) return;
    var cancelled = false;
    window.MSData.getProducts().then(function (rows) {
      if (cancelled) return;
      var merged = mergeFromDb(rows);
      if (merged && merged.length) { setCatalogue(merged); setLiveData(true); }
    });
    return function () { cancelled = true; };
  }, []);

  /* Deep-link: /shop?p=<id> (from the home "View Details" buttons) opens that
     product's detail view directly, instead of dumping the visitor on the grid.
     Runs whenever the catalogue changes so it works with both local and DB data. */
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("cart")) setView("cart");   // e.g. home "View cart" after add-to-cart
    const id = params.get("p");
    if (!id) return;
    const found = catalogue.find((x) => x.id === id);
    if (found) setQuick(found);
  }, [catalogue]);

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

  let list = catalogue.filter((p) => (cat === "all" || p.cat === cat) && (!search || (p.name + " " + p.desc + " " + catName(p.cat)).toLowerCase().includes(search.toLowerCase())));
  const wishList = catalogue.filter((p) => wish.includes(p.id));
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
      <Header count={count} wishCount={wish.length} search={search} onSearch={setSearch} onCart={() => setView("cart")} onWish={() => setView("wishlist")} onHome={shopAll} onShopAll={shopAll}
        products={catalogue} onPick={(p) => { setQuick(p); setSearch(""); }} />
      <Hero onShopAll={shopAll} onCategory={goCategory} products={catalogue} />
      <section style={{ padding: "8px 0 4px" }}><CategoryRail active={cat} onCategory={goCategory} products={catalogue} /></section>
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
