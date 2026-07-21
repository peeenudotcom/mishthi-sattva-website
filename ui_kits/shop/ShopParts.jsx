/* Mishthi Sattva — Shop presentational parts.
   Stateless UI: icons, product media, cards, quick-view, cart & checkout
   panels, toasts, header, hero. State + handlers come from Shop.jsx.
   Exposes window.MSShopParts. */

(function(){
const DS = window.MishthiSattvaDesignSystem_af8a45;
const { Button, Badge, GoldDivider, Input } = DS;
const { MS_CATEGORIES } = window.MSShopData;
const ASSET = "../../assets";

/* Products whose price isn't confirmed yet store price = null. Never render a
   guessed number — show "Ask for price" and let the customer ask on WhatsApp. */
const money = (n) => (n == null || isNaN(n) ? "Ask for price" : "₹" + Number(n).toLocaleString("en-IN"));
const hasPrice = (p) => p != null && !isNaN(p);
const catName = (id) => (MS_CATEGORIES.find((c) => c.id === id) || {}).name || id;
const catTint = (id) => (MS_CATEGORIES.find((c) => c.id === id) || {}).tint || "var(--forest)";

/* ---------------- icons ---------------- */
const I = {
  search: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  bag: (p) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>,
  heart: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill={p.fill||"none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.6-9.3-9C1 7.7 2.6 4.5 5.8 4.5c2 0 3.3 1.2 4.2 2.6.9-1.4 2.2-2.6 4.2-2.6 3.2 0 4.8 3.2 3.1 6.5C19 15.4 12 20 12 20z"/></svg>,
  plus: (p) => <svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  minus: (p) => <svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14"/></svg>,
  close: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  trash: (p) => <svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>,
  leaf: (p) => <svg viewBox="0 0 24 24" width={p.s||18} height={p.s||18} fill="currentColor"><path d="M17 4C9 4 4 9 4 17c0 1.7.3 3 .7 3 .4 0 .8-.8 1.4-2 2-4.2 5.6-7 10-7.6.6-.1.9.6.4.9-4.3 2.4-7.1 5.7-8.4 9.7-.3.8.7 1.3 1.3.7C13.9 17.5 20 14.5 20 7c0-1.7-1.3-3-3-3z"/></svg>,
  truck: (p) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>,
  gift: (p) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11h16v9H4zM4 7h16v4H4zM12 7v13M12 7S10 3 7.5 4 9 7 12 7zM12 7s2-4 4.5-3S15 7 12 7z"/></svg>,
  shield: (p) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>,
  star: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="currentColor"><path d="M12 2l2.9 6.3 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 21l1.3-6.7-5-4.6 6.8-.8z"/></svg>,
  wa: (p) => <svg viewBox="0 0 32 32" width={p.s||20} height={p.s||20} fill="currentColor"><path d="M19.11 17.36c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.46-.83-2-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16 4C9.37 4 4 9.37 4 16c0 2.11.55 4.09 1.52 5.81L4 28l6.36-1.49A11.92 11.92 0 0 0 16 28c6.63 0 12-5.37 12-12S22.63 4 16 4z"/></svg>,
};

function Stars({ value, count, size = 14 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ display: "inline-flex", color: "var(--accent)" }}>
        {[0,1,2,3,4].map((i) => (
          <span key={i} style={{ opacity: i < Math.round(value) ? 1 : 0.25 }}><I.star s={size} /></span>
        ))}
      </span>
      <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{value.toFixed(1)}{count != null ? ` (${count})` : ""}</span>
    </span>
  );
}

/* ---------------- product media (tinted leaf tile or photo) ---------------- */
function ProductMedia({ product, height = 200, round = 16 }) {
  if (product.photo) {
    return <div style={{ height, borderRadius: round, overflow: "hidden", background: "var(--cream)", display: "grid", placeItems: "center", padding: Math.round(height * 0.06) }}>
      <img src={product.photo} alt={product.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} />
    </div>;
  }
  const tint = catTint(product.cat);
  const initials = product.name.split(" ").slice(0, 2).map((w) => w[0]).join("");
  return (
    <div style={{ height, borderRadius: round, position: "relative", overflow: "hidden",
      background: `radial-gradient(120% 120% at 30% 20%, color-mix(in oklab, ${tint} 22%, var(--cream)) 0%, var(--cream) 70%)`,
      display: "grid", placeItems: "center" }}>
      <span aria-hidden="true" style={{ position: "absolute", right: -16, bottom: -16, color: tint, opacity: 0.14 }}><I.leaf s={Math.round(height*0.7)} /></span>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: Math.round(height*0.26), color: "color-mix(in oklab, "+tint+" 80%, var(--forest-deep))", letterSpacing: "0.02em" }}>{initials}</span>
    </div>
  );
}

function TagPill({ tag }) {
  const map = { bestseller: { t: "Bestseller", tone: "gold" }, "sugar-free": { t: "Sugar-Free", tone: "forest" }, new: { t: "New", tone: "success" } };
  const m = map[tag]; if (!m) return null;
  return <Badge tone={m.tone}>{m.t}</Badge>;
}

/* ---------------- product card ---------------- */
function ProductCard({ product, onOpen, onAdd, onToggleWish, wished }) {
  const [h, setH] = React.useState(false);
  const off = hasPrice(product.price) && hasPrice(product.mrp) && product.mrp > product.price ? Math.round((1 - product.price / product.mrp) * 100) : 0;
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", flexDirection: "column", background: "var(--card)", border: `1px solid ${h ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "var(--radius-2xl)", padding: 14, boxShadow: h ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transform: h ? "translateY(-4px)" : "none", transition: "all .2s var(--ease-standard)" }}>
      <div style={{ position: "relative", cursor: "pointer" }} onClick={() => onOpen(product)}>
        <ProductMedia product={product} height={188} />
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6 }}>
          {off > 0 && <span style={{ background: "var(--destructive)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: "var(--radius-pill)" }}>-{off}%</span>}
          {product.badge && <span style={{ background: "var(--forest-deep)", color: "var(--cream)", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: "var(--radius-pill)" }}>{product.badge}</span>}
        </div>
        <button onClick={(e) => { e.stopPropagation(); onToggleWish(product.id); }} aria-label="Wishlist"
          style={{ position: "absolute", top: 8, right: 8, height: 34, width: 34, display: "grid", placeItems: "center", borderRadius: "var(--radius-pill)",
            border: "1px solid var(--border)", background: "color-mix(in oklab, var(--card) 90%, transparent)", color: wished ? "var(--destructive)" : "var(--ink-500)", cursor: "pointer", backdropFilter: "blur(4px)" }}>
          <I.heart s={18} fill={wished ? "currentColor" : "none"} />
        </button>
      </div>
      <div style={{ marginTop: 12, flex: 1, display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)" }}>{catName(product.cat)}</span>
        <h3 onClick={() => onOpen(product)} style={{ margin: "4px 0 0", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, lineHeight: 1.15, color: "var(--primary)", cursor: "pointer" }}>{product.name}</h3>
        <div style={{ marginTop: 6 }}><Stars value={product.rating} count={product.reviews} /></div>
        <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.5, color: "var(--muted-foreground)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{product.desc}</p>
        <div style={{ marginTop: "auto", paddingTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "var(--primary)" }}>{money(product.price)}</span>
            {off > 0 && <span style={{ fontSize: 13, color: "var(--muted-foreground)", textDecoration: "line-through" }}>{money(product.mrp)}</span>}
            <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>· {product.weight}</span>
          </div>
        </div>
        <button onClick={() => onAdd(product, 1)}
          style={{ marginTop: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "10px 14px",
            borderRadius: "var(--radius-pill)", border: "1px solid transparent", background: h ? "var(--forest-deep)" : "var(--primary)", color: "var(--primary-foreground)",
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "background .2s" }}>
          <I.bag s={18} /> Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ---------------- quantity stepper ---------------- */
function Stepper({ value, onChange, size = "md" }) {
  const dim = size === "sm" ? 30 : 38;
  const btn = { height: dim, width: dim, display: "grid", placeItems: "center", border: "none", background: "transparent", color: "var(--primary)", cursor: "pointer" };
  return (
    <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "var(--radius-pill)", background: "var(--card)" }}>
      <button style={btn} onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease"><I.minus /></button>
      <span style={{ minWidth: 28, textAlign: "center", fontWeight: 700, fontSize: 14, color: "var(--primary)" }}>{value}</span>
      <button style={btn} onClick={() => onChange(value + 1)} aria-label="Increase"><I.plus /></button>
    </div>
  );
}

/* ---------------- quick-view modal ---------------- */
function QuickView({ product, onClose, onAdd, onToggleWish, wished }) {
  const [qty, setQty] = React.useState(1);
  React.useEffect(() => { setQty(1); }, [product && product.id]);
  if (!product) return null;
  const off = hasPrice(product.price) && hasPrice(product.mrp) && product.mrp > product.price ? Math.round((1 - product.price / product.mrp) * 100) : 0;
  return (
    <Overlay onClose={onClose} align="center">
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(880px, 94vw)", maxHeight: "90vh", overflow: "auto", background: "var(--card)", borderRadius: "var(--radius-3xl)", boxShadow: "var(--shadow-xl)", border: "1px solid var(--border)" }}>
        <div className="shop-quick" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div className="shop-quick-media" style={{ padding: 24 }}><ProductMedia product={product} height={360} round={24} /></div>
          <div className="shop-quick-info" style={{ padding: "32px 32px 32px 8px", position: "relative" }}>
            <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 16, right: 16, height: 36, width: 36, display: "grid", placeItems: "center", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", background: "var(--card)", color: "var(--primary)", cursor: "pointer" }}><I.close /></button>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)" }}>{catName(product.cat)}</span>
            <h2 style={{ margin: "8px 0 0", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 34, lineHeight: 1.05, color: "var(--primary)" }}>{product.name}</h2>
            <div style={{ marginTop: 10 }}><Stars value={product.rating} count={product.reviews} size={16} /></div>
            <div style={{ marginTop: 16, display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 30, color: "var(--primary)" }}>{money(product.price)}</span>
              {off > 0 && <span style={{ fontSize: 16, color: "var(--muted-foreground)", textDecoration: "line-through" }}>{money(product.mrp)}</span>}
              {off > 0 && <span style={{ fontSize: 13, fontWeight: 700, color: "var(--destructive)" }}>Save {off}%</span>}
            </div>
            <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.65, color: "color-mix(in oklab, var(--foreground) 82%, transparent)" }}>{product.desc}</p>
            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {product.facts.map((f) => (
                <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--primary)", background: "var(--secondary)", padding: "6px 11px", borderRadius: "var(--radius-pill)" }}>
                  <span style={{ color: "var(--accent)" }}><I.leaf s={14} /></span>{f}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12 }}>
              <Stepper value={qty} onChange={setQty} />
              <button onClick={() => { onAdd(product, qty); onClose(); }} style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 18px", borderRadius: "var(--radius-pill)", border: "none", background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, cursor: "pointer" }}>
                <I.bag s={19} /> Add {qty}{hasPrice(product.price) ? ` · ${money(product.price * qty)}` : ""}
              </button>
              <button onClick={() => onToggleWish(product.id)} aria-label="Wishlist" style={{ height: 48, width: 48, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", background: "var(--card)", color: wished ? "var(--destructive)" : "var(--ink-500)", cursor: "pointer" }}>
                <I.heart s={20} fill={wished ? "currentColor" : "none"} />
              </button>
            </div>
            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: "8px 18px", fontSize: 12, color: "var(--muted-foreground)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><I.truck s={16} /> Home delivery</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><I.shield s={16} /> 100% homemade</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><I.leaf s={14} /> No preservatives</span>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

/* ---------------- overlay shell ---------------- */
function Overlay({ children, onClose, align = "end" }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "color-mix(in oklab, var(--forest-deep) 45%, transparent)", backdropFilter: "blur(3px)", display: "flex", justifyContent: align === "center" ? "center" : "flex-end", alignItems: align === "center" ? "center" : "stretch", animation: "msfade .2s ease" }}>
      {children}
    </div>
  );
}

window.MSShopParts = { I, Stars, money, catName, catTint, ProductMedia, ProductCard, Stepper, QuickView, Overlay, TagPill };
})();
