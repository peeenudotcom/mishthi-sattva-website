/* Mishthi Sattva — Website UI kit screens.
   Faithful recreation of the landing page, composing design-system components.
   Loaded as text/babel; exposes window.MSWebsite. */

const DS = window.MishthiSattvaDesignSystem_af8a45;
const { Button, Badge, Card, WhatsAppButton, GoldDivider, ProductCard, BenefitTile, FAQItem, Testimonial, Input } = DS;

const ASSET = "../../assets";
const PHONE = "8557942246";
const WA = "918557942246"; // WhatsApp number (with country code)

/* Customer favourites, stored in localStorage under the SAME key the shop
   wishlist uses, so a heart tapped on the home page shows up in the shop's
   wishlist drawer and vice-versa. No login needed. */
const FAV_KEY = "ms_shop_wish";
function readFavs() { try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; } }
function toggleFav(id) {
  const f = readFavs();
  const next = f.includes(id) ? f.filter((x) => x !== id) : [...f, id];
  try { localStorage.setItem(FAV_KEY, JSON.stringify(next)); } catch (e) {}
  return next.includes(id);
}
/* Shares the shop's cart (same localStorage key + item shape), so items added
   from the home bestsellers show up in the shop cart / checkout. */
const CART_KEY = "ms_shop_cart";
function addToShopCart(item, qty) {
  let cart; try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { cart = []; }
  const ex = cart.find((i) => i.id === item.id);
  if (ex) ex.qty += qty; else cart.push({ ...item, qty: qty });
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  return cart.reduce((n, i) => n + i.qty, 0);
}
function HeartIcon({ filled, size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </svg>
  );
}

/* Editable promo badge shown on the hero image. TODO: confirm gift + minimum
   order value with the owner, or set to null to hide the badge entirely. */
const GIFT_BADGE = { title: "Complimentary wellness gift", sub: "on orders this month — ask us for details" };

/* Social profiles. WhatsApp is live; add the Instagram/Facebook profile URLs
   here and those buttons appear automatically in the footer. */
const SOCIAL = [
  { label: "WhatsApp", href: "https://wa.me/918557942246" },
  { label: "Instagram", href: "https://www.instagram.com/mishthisattva" },
  { label: "Facebook", href: "https://www.facebook.com/p/Mishthi-Sattva-61585174464292/" },
];

/* name -> product photo (from the brand's uploaded catalogue) */
const PRODUCT_IMAGES = {
  "Shakti Laddu": `${ASSET}/shakti-laddu.png`,
  "Sampooran Laddu": `${ASSET}/sampooran-laddu.png`,
  "Sugar-Free Chyawanprash": `${ASSET}/chyawanprash.jpg`,
  "Herbal Heart Sip": `${ASSET}/herbal-heart-sip.png`,
  "Healthy Namkeen Mix": `${ASSET}/namkeen-mix.png`,
  "AyurKesh Wash": `${ASSET}/kesh-vash-shampoo.png`,
  "AyurKesh Vardaan Hair Oil": `${ASSET}/kesh-vardaan-oil.png`,
  "Protein Sattu Drink": `${ASSET}/protein-sattu.png`,
  "Chat Masala": `${ASSET}/chat-masala.png`,
  "Shahi Garam Masala": `${ASSET}/shahi-garam-masala.png`,
  "Instant Ubtan Glow": `${ASSET}/ubtan-glow-pack.png`,
  "Vitamin C Serum": `${ASSET}/vitamin-c-serum-pack.png`,
  "Shinkaji Masala": `${ASSET}/shinkaji-masala-pack.png`,
  "Thandai Premix": `${ASSET}/thandai-premix.png`,
  "Ice Cream Premix": `${ASSET}/ice-cream-premix.png`,
  "Shahi Sip & Scoop": `${ASSET}/shahi-sip-scoop.png`,
  "Jaljeera Sattu": `${ASSET}/jaljeera-sattu.png`,
  "Paani Puri Combo": `${ASSET}/paani-puri-combo-uniform.png`,
  "Nitya Poshan Formula- Kids": "https://wiuokqmggxkonxvzrnsb.supabase.co/storage/v1/object/public/product-photos/nitya-poshan-formula-kids-1784983057177.png",
  "Nitya Poshan Formula- Men": "https://wiuokqmggxkonxvzrnsb.supabase.co/storage/v1/object/public/product-photos/nitya-poshan-formula-men-1784983323822.png",
  "Nitya Poshan Formula- Women": "https://wiuokqmggxkonxvzrnsb.supabase.co/storage/v1/object/public/product-photos/nitya-poshan-formula-women-1784983223006.png",
  "Glow Radiance Cream": `${ASSET}/glow-radiance-cream-pack.png`,
};

/* ---------- shared data ---------- */
const PRODUCT_CATS = [
  { id: "ayurvedic", name: "Ayurvedic & Health", blurb: "Natural wellness from traditional Ayurvedic ingredients that support immunity, energy and wellbeing.", items: ["Shakti Laddu", "Sampooran Laddu", "Sugar-Free Chyawanprash", "Herbal Heart Sip", "Healthy Namkeen Mix", "Protein Sattu Drink"] },
  { id: "hair", name: "Hair Care", blurb: "Natural hair care designed to nourish scalp health and promote stronger hair.", items: ["AyurKesh Wash", "AyurKesh Vardaan Hair Oil"] },
  { id: "spices", name: "Spices & Masala", blurb: "Authentic homemade spice blends that enhance flavour while keeping purity and freshness.", items: ["Chat Masala", "Shinkaji Masala", "Thandai Premix", "Shahi Garam Masala", "Ice Cream Premix", "Shahi Sip & Scoop", "Jaljeera Sattu"] },
  { id: "beauty", name: "Beauty & Skincare", blurb: "Natural skincare for healthy, glowing skin.", items: ["Instant Ubtan Glow", "Glow Radiance Cream", "Vitamin C Serum"] },
  { id: "special", name: "Special Foods", blurb: "Traditional homemade food products with authentic taste.", items: ["Paani Puri Combo", "Nitya Poshan Formula- Kids", "Nitya Poshan Formula- Men", "Nitya Poshan Formula- Women"] },
];

const BENEFITS = [
  // "free-from" points get a cross (what's NOT in the product);
  // the positive qualities get a tick.
  { label: "No Refined Oil", good: false },
  { label: "No Refined Sugar", good: false },
  { label: "No Artificial Preservatives", good: false },
  { label: "Homemade in Small Batches", good: true },
  { label: "Natural Ingredients", good: true },
  { label: "Hygienically Prepared", good: true },
];

const TESTIMONIALS = [
  { quote: "Pure taste and amazing quality. You can actually feel the difference.", name: "Parveen Sukhija", city: "Faridkot" },
  { quote: "The homemade touch makes every product special.", name: "Liku Prusty", city: "Kotkapura" },
  { quote: "Healthy products for the entire family.", name: "Vishu Gulati", city: "Kotkapura" },
];

const FAQS = [
  { q: "How do I place an order?", a: "Browse the shop, add products to your cart and send your order for confirmation — it reaches us as one WhatsApp message. Prefer to chat? Tap the WhatsApp bubble any time and we'll help you personally." },
  { q: "Do you offer home delivery?", a: "Yes. Home delivery is available across Kotkapura and nearby areas; other cities ship via trusted couriers." },
  { q: "Are your products really preservative-free?", a: "Absolutely — prepared fresh in our home kitchen with no refined oil, sugar or artificial preservatives." },
  { q: "What is the shelf life?", a: "Typically 1–6 months when stored as instructed. Exact dates are printed on each pack." },
];

/* ---------- atoms ---------- */
function Leaf({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17 4C9 4 4 9 4 17c0 1.7.3 3 .7 3 .4 0 .8-.8 1.4-2 2-4.2 5.6-7 10-7.6.6-.1.9.6.4.9-4.3 2.4-7.1 5.7-8.4 9.7-.3.8.7 1.3 1.3.7C13.9 17.5 20 14.5 20 7c0-1.7-1.3-3-3-3z" />
    </svg>
  );
}

/* ---------- header ---------- */
/* If a customer is signed in, return their initial + first name for the header avatar. */
function signedInUser() {
  try {
    var d = window.MSData;
    var u = d && d.currentUser ? d.currentUser() : null;
    if (!u) return null;
    var meta = u.user_metadata || {};
    var name = (meta.full_name || meta.name || u.email || "").trim();
    if (!name) return null;
    return { initial: name[0].toUpperCase(), first: name.split(" ")[0], name: name };
  } catch (e) { return null; }
}

function Header({ active = "home" }) {
  const acct = signedInUser();
  // Account is intentionally NOT in this content nav — it's a separate, demarcated
  // button on the right (below) so it reads as the sign-in / account area.
  const nav = [{ label: "Home", href: "index.html", id: "home" }, { label: "Story", href: "about.html", id: "about" }, { label: "Shop", href: "../shop/index.html", id: "products" }, { label: "Contact", href: "contact.html", id: "contact" }];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, borderBottom: "1px solid color-mix(in oklab, var(--cream) 12%, transparent)", background: "var(--primary)", boxShadow: "0 8px 24px -12px color-mix(in oklab, var(--forest-deep) 60%, transparent)" }}>
      <div className="ms-container" style={{ display: "flex", height: 88, alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <a href="index.html" style={{ display: "flex", alignItems: "center" }}>
          {/* white/transparent lockup — sits directly on the green bar, no chip */}
          <img src={`${ASSET}/mishthi-logo-white.png`} alt="Mishthi Sattva — Ayurvedic, Satvic, Homemade" style={{ height: 66, width: "auto", objectFit: "contain", display: "block" }} />
        </a>
        <nav className="ms-nav" style={{ display: "flex", alignItems: "center", gap: 34 }}>
          {nav.map((n) => {
            const on = n.id === active;
            return (
              <a key={n.label} href={n.href} style={{ fontSize: 15, fontWeight: on ? 700 : 600, color: on ? "var(--cream)" : "color-mix(in oklab, var(--cream) 78%, transparent)", borderBottom: on ? "2px solid var(--accent)" : "2px solid transparent", paddingBottom: 3 }}>{n.label}</a>
            );
          })}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href="account.html" title={acct ? "Signed in as " + acct.name : "My account"} aria-label={acct ? "My account — signed in as " + acct.name : "My account"} aria-current={active === "account" ? "page" : undefined}
             style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: acct ? "0.4rem 0.9rem 0.4rem 0.4rem" : "0.55rem 0.95rem", borderRadius: "var(--radius-pill)", fontWeight: 600, fontSize: 15,
               color: active === "account" ? "var(--forest-deep)" : "var(--cream)",
               background: active === "account" ? "var(--cream)" : "transparent",
               border: "1px solid color-mix(in oklab, var(--cream) 35%, transparent)" }}>
            {acct
              ? <span aria-hidden="true" style={{ display: "grid", placeItems: "center", height: 26, width: 26, borderRadius: "var(--radius-pill)", background: "var(--accent)", color: "var(--forest-deep)", fontWeight: 700, fontSize: 13.5, flexShrink: 0 }}>{acct.initial}</span>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" /></svg>}
            {acct ? acct.first : "Account"}
          </a>
          <span aria-hidden="true" style={{ width: 1, height: 26, background: "color-mix(in oklab, var(--cream) 22%, transparent)" }} />
          <Button variant="gold" as="a" href="../shop/index.html">Shop Products</Button>
        </div>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */
function Hero() {
  const [finder, setFinder] = React.useState(false);
  return (
    <section id="top" style={{ position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: -1, background: "radial-gradient(60% 60% at 80% 10%, color-mix(in oklab, var(--gold) 18%, transparent), transparent), radial-gradient(50% 50% at 0% 100%, color-mix(in oklab, var(--forest) 12%, transparent), transparent)" }} />
      <div className="ms-container ms-stack" style={{ display: "grid", gridTemplateColumns: "1.18fr 0.82fr", gap: 48, alignItems: "center", padding: "72px 20px" }}>
        <div>
          <GoldDivider>Ayurvedic · Satvic · Homemade</GoldDivider>
          <h1 style={{ marginTop: 24, fontSize: "clamp(66px, 9vw, 116px)", fontWeight: 600, lineHeight: 0.94, letterSpacing: "-0.025em", color: "var(--primary)" }}>
            Pure Ingredients.<br />
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Pure Intentions.</span>
          </h1>
          <p style={{ marginTop: 22, maxWidth: 552, fontSize: 18, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
            Homemade Ayurvedic laddu, wellness blends, traditional spices and handcrafted foods — prepared in small batches in Cherry Bansal's home kitchen in Kotkapura.
          </p>
          <p className="ms-hindi" style={{ marginTop: 12, fontSize: 19, color: "color-mix(in oklab, var(--primary) 90%, transparent)" }}>घर की रसोई से… आपके परिवार की सेहत तक।</p>
          <div style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Button variant="forest" as="a" href="../shop/index.html">Explore Our Bestsellers →</Button>
            <Button variant="outline" onClick={() => setFinder(true)}>Help Me Choose</Button>
          </div>
          {finder && <ProductFinder onClose={() => setFinder(false)} />}
          <div style={{ marginTop: 38, display: "flex", flexWrap: "wrap", gap: "12px 24px", maxWidth: 520 }}>
            {["Homemade", "Sugar-Free", "Preservative Free", "Sattvic"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--primary)" }}>
                <span style={{ color: "var(--accent)" }}><Leaf size={16} /></span> {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: -24, zIndex: -1, borderRadius: 32, background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 20%, transparent), color-mix(in oklab, var(--forest) 10%, transparent))", filter: "blur(40px)" }} />
          <div style={{ overflow: "hidden", borderRadius: 32, aspectRatio: "4 / 5", border: "1px solid var(--border)", boxShadow: "var(--shadow-xl)" }}>
            <img src={`${ASSET}/hero-kiran-kitchen.png`} alt="Cherry Bansal preparing Ayurvedic food by hand in her Kotkapura home kitchen" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ position: "absolute", bottom: -22, left: 28, width: 280, borderRadius: 18, border: "1px solid var(--border)", background: "color-mix(in oklab, var(--card) 95%, transparent)", padding: 16, boxShadow: "var(--shadow-lg)", backdropFilter: "blur(8px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "grid", placeItems: "center", height: 44, width: 44, borderRadius: "var(--radius-pill)", background: "color-mix(in oklab, var(--gold) 15%, transparent)", color: "var(--accent)" }}><Leaf size={22} /></div>
              <div>
                {/* TODO: confirm the gift + minimum order value, or remove this badge. Edit GIFT_BADGE at top of file. */}
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--primary)" }}>{GIFT_BADGE.title}</p>
                <p style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{GIFT_BADGE.sub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- marquee ---------- */
function MarqueeStrip() {
  const items = ["Homemade in Small Batches", "Natural Ingredients", "Made in Kotkapura", "Home Delivery Available"];
  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--primary)", color: "var(--primary-foreground)" }}>
      <div className="ms-container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "8px 32px", padding: "12px 20px", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.22em" }}>
        {items.map((t, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>{t}{i < items.length - 1 && <span style={{ color: "var(--accent)" }}>◆</span>}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- about ---------- */
function About() {
  return (
    <section id="about" style={{ background: "var(--white)", padding: "84px 0", scrollMarginTop: 84 }}>
      <div className="ms-container ms-stack" style={{ display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: 52, alignItems: "center" }}>
        <div style={{ overflow: "hidden", borderRadius: 28, border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)", aspectRatio: "4 / 5" }}>
          <img src={`${ASSET}/story-serving-green.png`} alt="Cherry Bansal serving homemade laddu and herbal tea to her family" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" }} />
        </div>
        <div>
          <GoldDivider>Our Story</GoldDivider>
          <h2 style={{ marginTop: 18, fontSize: 50, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.015em", textWrap: "balance" }}>It began in one home kitchen — with a mother's wish to feed her family better.</h2>
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 18, fontSize: 18, lineHeight: 1.7, color: "color-mix(in oklab, var(--foreground) 85%, transparent)" }}>
            <p>Mishthi Sattva was born in Cherry Bansal's kitchen in Kotkapura — not as a business plan, but as a search for honest everyday food. What began as carefully prepared recipes for family and friends slowly grew into a collection of homemade foods, spices and wellness products for more families to trust.</p>
            <p>Cherry wanted to prepare everyday foods using thoughtfully selected ingredients, familiar recipes and methods she would confidently choose for her own family.</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 22, fontStyle: "italic", color: "var(--primary)" }}>Every product is crafted with a commitment to quality, purity and family wellness.</p>
          </div>
          <p style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--accent)" }}><Leaf size={14} /> Rooted in Kotkapura, Punjab</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- why us ---------- */
function WhyUs() {
  return (
    <section id="why" style={{ background: "var(--background)", padding: "78px 0", scrollMarginTop: 84 }}>
      <div className="ms-container">
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <GoldDivider align="center">Why Choose Us</GoldDivider>
          <h2 style={{ marginTop: 20, fontSize: 52, fontWeight: 700, lineHeight: 1.14, letterSpacing: "-0.015em", textWrap: "balance" }}>Six standards we<br />never compromise on.</h2>
          <p style={{ marginTop: 20, color: "var(--muted-foreground)", fontSize: 17, lineHeight: 1.6 }}>Every batch is held to the same standards — no shortcuts, no compromises.</p>
        </div>
        <div className="ms-why-grid" style={{ marginTop: 48, display: "grid", gap: 18, alignItems: "stretch" }}>
          {BENEFITS.map((b) => <BenefitTile key={b.label} label={b.label} good={b.good} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- products ---------- */
function Products() {
  const [active, setActive] = React.useState("all");
  const filtered = active === "all" ? PRODUCT_CATS : PRODUCT_CATS.filter((c) => c.id === active);
  const tabs = [{ id: "all", name: "All" }, ...PRODUCT_CATS];
  return (
    <section id="products" style={{ padding: "96px 0", scrollMarginTop: 84 }}>
      <div className="ms-container">
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <GoldDivider align="center">Our Premium Range</GoldDivider>
          <h2 style={{ marginTop: 20, fontSize: 64, fontWeight: 700, lineHeight: 1.16, letterSpacing: "-0.015em", textWrap: "balance" }}>Crafted in small batches,<br />served with love.</h2>
          <p style={{ marginTop: 16, color: "var(--muted-foreground)" }}>Filter the range below or message us on WhatsApp for the full catalogue.</p>
        </div>
        <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
          {tabs.map((c) => {
            const on = active === c.id;
            return (
              <button key={c.id} onClick={() => setActive(c.id)} style={{ borderRadius: "var(--radius-pill)", border: `1px solid ${on ? "var(--primary)" : "var(--border)"}`, background: on ? "var(--primary)" : "var(--card)", color: on ? "var(--primary-foreground)" : "color-mix(in oklab, var(--foreground) 70%, transparent)", padding: "8px 16px", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", cursor: "pointer", transition: "all .2s" }}>{c.name}</button>
            );
          })}
        </div>
        <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 48 }}>
          {filtered.map((cat) => (
            <div key={cat.id}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, borderBottom: "1px solid var(--border)", paddingBottom: 16, marginBottom: 24 }}>
                <div>
                  <h3 style={{ fontSize: 30, color: "var(--primary)" }}>{cat.name}</h3>
                  <p style={{ marginTop: 4, maxWidth: 640, fontSize: 14, color: "var(--muted-foreground)" }}>{cat.blurb}</p>
                </div>
                <span style={{ flexShrink: 0, fontFamily: "var(--font-display)", fontSize: 30, color: "color-mix(in oklab, var(--accent) 60%, transparent)" }}>{String(PRODUCT_CATS.findIndex((p) => p.id === cat.id) + 1).padStart(2, "0")}</span>
              </div>
              {/* fixed columns (see .ms-catgrid) so categories with only 2 items
                  don't stretch their cards across the full width */}
              <div className="ms-catgrid" style={{ display: "grid", gap: 20, alignItems: "stretch" }}>
                {cat.items.map((item) => (
                  <div key={item} style={{ display: "flex" }}>
                    <ProductCard name={item} href="../shop/index.html" image={PRODUCT_IMAGES[item]} style={{ width: "100%" }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- featured ---------- */
function Featured() {
  const bullets = ["No Refined Sugar", "Amla & Warming Spices", "Small-Batch Made", "Homemade Quality", "Family Friendly"];
  const [showDetails, setShowDetails] = React.useState(false);
  // id matches the shop catalogue slug so Add to Cart syncs with the shop cart
  const chyawanprash = { id: "chyawanprash", name: "Sugar-Free Chyawanprash", desc: "Inspired by the traditional Ayurvedic preparation of amla, herbs and warming spices — slow-cooked in small batches for modern families. No refined sugar, no compromises.", img: "chyawanprash.jpg", size: "500 g", price: 600, mrp: 1000, badge: "Featured" };
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--primary)", color: "var(--primary-foreground)", padding: "96px 0" }}>
      <div aria-hidden="true" style={{ position: "absolute", right: -128, top: -128, height: 384, width: 384, borderRadius: "50%", background: "color-mix(in oklab, var(--gold) 20%, transparent)", filter: "blur(60px)" }} />
      <div className="ms-container ms-stack" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div style={{ overflow: "hidden", borderRadius: 32, border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)", boxShadow: "var(--shadow-xl)" }}>
          <img src={`${ASSET}/chyawanprash.jpg`} alt="Sugar-Free Chyawanprash" style={{ width: "100%", display: "block" }} />
        </div>
        <div>
          <GoldDivider onDark>Featured Product</GoldDivider>
          <h2 style={{ marginTop: 20, fontSize: 64, fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.015em", color: "var(--cream)" }}>Sugar-Free<br /><span style={{ fontStyle: "italic", color: "var(--accent)" }}>Chyawanprash.</span></h2>
          <p style={{ marginTop: 20, maxWidth: 470, color: "color-mix(in oklab, var(--cream) 80%, transparent)" }}>Inspired by the traditional Ayurvedic preparation of amla, herbs and warming spices — slow-cooked in small batches for modern families. No refined sugar, no compromises.</p>
          <ul className="ms-stack" style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, listStyle: "none", padding: 0 }}>
            {bullets.map((b) => (
              <li key={b} style={{ display: "flex", alignItems: "center", gap: 12, borderRadius: 12, border: "1px solid color-mix(in oklab, var(--gold) 25%, transparent)", background: "color-mix(in oklab, var(--cream) 4%, transparent)", padding: "10px 14px" }}>
                <span style={{ display: "grid", placeItems: "center", height: 30, width: 30, borderRadius: "var(--radius-pill)", background: "var(--accent)", color: "var(--forest-deep)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                </span>
                <span style={{ fontWeight: 500 }}>{b}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 16px", fontSize: 13.5, color: "color-mix(in oklab, var(--cream) 80%, transparent)" }}>
            <span>500 g jar</span><span style={{ color: "var(--accent)" }}>◆</span>
            <span><span style={{ fontWeight: 700, fontSize: 16, color: "var(--cream)" }}>₹600</span> <s style={{ opacity: 0.65 }}>₹1,000</s></span><span style={{ color: "var(--accent)" }}>◆</span>
            <span>Home delivery in Kotkapura</span>
          </div>
          <div style={{ marginTop: 26, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Button variant="gold" onClick={() => setShowDetails(true)}>View Chyawanprash Details →</Button>
          </div>
          {showDetails && <ProductModal p={chyawanprash} onClose={() => setShowDetails(false)} />}
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */
function Testimonials() {
  return (
    <section style={{ background: "var(--white)", padding: "96px 0" }}>
      <div className="ms-container">
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <GoldDivider align="center">Loved by Families</GoldDivider>
          <h2 style={{ marginTop: 20, fontSize: 56, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.015em", textWrap: "balance" }}>Trusted in homes across Punjab.</h2>
        </div>
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {TESTIMONIALS.map((t) => <Testimonial key={t.name} {...t} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- founder ---------- */
function Founder() {
  return (
    <section id="founder" style={{ background: "color-mix(in oklab, var(--secondary) 60%, var(--background))", padding: "96px 0", scrollMarginTop: 84 }}>
      <div className="ms-container ms-stack" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          {/* portrait source (977x1610) — framed 4:5 and focused slightly high so
              her face, hands and the laddu tray all stay in shot */}
          <div style={{ overflow: "hidden", borderRadius: 32, border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)", aspectRatio: "4 / 5", position: "relative" }}>
            <img src={`${ASSET}/founder-maroon.png`} alt="Cherry Bansal selecting fresh Ayurvedic ingredients in her garden in Kotkapura" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 8%", display: "block" }} />
          </div>
          <div style={{ position: "absolute", bottom: -20, right: -20, borderRadius: 18, border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)", background: "var(--card)", padding: "12px 20px", textAlign: "center", boxShadow: "var(--shadow-lg)" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontStyle: "italic", color: "var(--primary)" }}>Cherry Bansal</p>
            <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.25em", color: "var(--accent)" }}>Founder · Kotkapura</p>
          </div>
        </div>
        <div>
          <GoldDivider>Meet Our Founder</GoldDivider>
          <h2 style={{ marginTop: 20, fontSize: 46, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.015em", textWrap: "balance" }}>Meet Cherry Bansal — the heart and hands behind Mishthi Sattva.</h2>
          <p style={{ marginTop: 22, fontSize: 18, lineHeight: 1.7, color: "color-mix(in oklab, var(--foreground) 85%, transparent)" }}>For Cherry, homemade is not simply a label. It means knowing what goes into every batch, preparing it with care, and serving customers with the same honesty she expects for her own family.</p>
          <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.7, color: "color-mix(in oklab, var(--foreground) 85%, transparent)" }}>She built Mishthi Sattva recipe by recipe — starting with food for her own home, then for friends and neighbours who kept asking for more. Every product still passes through her hands before it reaches yours.</p>
          <p className="ms-hindi" style={{ marginTop: 24, borderLeft: "2px solid var(--accent)", paddingLeft: 20, fontSize: 20, fontStyle: "italic", color: "var(--primary)" }}>"स्वाद ऐसा जो दिल जीत ले, और सेहत ऐसी जिस पर पूरा परिवार भरोसा करे।"</p>
          {/* TODO: confirm this is Cherry's own wording and the exact translation */}
          <p style={{ marginTop: 8, paddingLeft: 20, fontSize: 14, fontStyle: "italic", color: "var(--muted-foreground)" }}>"True taste wins the heart, and true health earns every family's trust."</p>
          <p style={{ marginTop: 12, fontSize: 14, color: "var(--muted-foreground)" }}>— Cherry Bansal, Founder</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- faq ---------- */
function FAQ() {
  return (
    <section style={{ background: "var(--primary)", color: "var(--primary-foreground)", padding: "96px 0" }}>
      <div className="ms-container ms-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, alignItems: "start" }}>
        <div>
          <GoldDivider onDark>FAQ</GoldDivider>
          <h2 style={{ marginTop: 20, fontSize: 64, fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.015em", color: "var(--cream)" }}>Questions, answered.</h2>
          <p style={{ marginTop: 16, color: "color-mix(in oklab, var(--cream) 75%, transparent)" }}>Can't find what you're looking for? Message us on WhatsApp — we usually reply within minutes.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((f, i) => <FAQItem key={f.q} question={f.q} answer={f.a} defaultOpen={i === 0} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */
function Contact() {
  /* The form previously had no state, so anything a customer typed was thrown
     away and the button opened a blank WhatsApp chat. Now the fields are bound
     and composed into the outgoing message. */
  const [form, setForm] = React.useState({ name: "", phone: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const valid = form.name.trim() && form.message.trim();
  const waText = `Namaste Mishthi Sattva!\n\nName: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`;

  /* Save the enquiry as well as opening WhatsApp, so nothing is lost if the
     chat is never sent. Never block the WhatsApp handoff on the database. */
  const saveEnquiry = () => {
    if (!valid || !window.MSData || !window.MSData.configured) return;
    window.MSData.createEnquiry({
      name: form.name,
      phone: form.phone || null,
      message: form.message,
    }).catch(function (err) {
      console.warn("[enquiry] could not be saved:", err.message);
    });
  };

  const rows = [
    { icon: "📞", label: "Call / WhatsApp", value: PHONE },
    { icon: "📍", label: "Location", value: "Kotkapura, Punjab" },
    { icon: "🚚", label: "Delivery", value: "Home delivery available" },
  ];
  return (
    <section id="contact" style={{ padding: "96px 0", scrollMarginTop: 84 }}>
      <div className="ms-container ms-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
        <div>
          <GoldDivider>Get in Touch</GoldDivider>
          <h2 style={{ marginTop: 20, fontSize: 64, fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.015em" }}>Order directly on WhatsApp.</h2>
          <p style={{ marginTop: 16, color: "var(--muted-foreground)" }}>We take orders, share the catalogue and answer questions on WhatsApp. Home delivery across Kotkapura and nearby areas.</p>
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
            {rows.map((r) => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 16, borderRadius: 18, border: "1px solid var(--border)", background: "var(--card)", padding: 16 }}>
                <span style={{ display: "grid", placeItems: "center", height: 48, width: 48, flexShrink: 0, borderRadius: "var(--radius-pill)", background: "var(--primary)", color: "var(--primary-foreground)", fontSize: 20 }}>{r.icon}</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--accent)" }}>{r.label}</p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--primary)" }}>{r.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Card padding="lg">
          <h3 style={{ fontSize: 24, color: "var(--primary)" }}>Send us a message</h3>
          <p style={{ marginTop: 4, fontSize: 14, color: "var(--muted-foreground)" }}>We'll continue the conversation on WhatsApp.</p>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <Input label="Name" placeholder="Your name" value={form.name} onChange={set("name")} />
            <Input label="Phone" type="tel" placeholder="10-digit mobile" value={form.phone} onChange={set("phone")} />
            <Input label="Message" multiline rows={4} placeholder="What would you like to order or ask?" value={form.message} onChange={set("message")} />
            <span onClick={saveEnquiry}>
              <Button variant="forest" fullWidth as="a" href={`https://wa.me/${WA}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer">Send via WhatsApp</Button>
            </span>
            {!valid && <p style={{ fontSize: 12, color: "var(--muted-foreground)", textAlign: "center" }}>Add your name and a message — we'll open WhatsApp with it filled in.</p>}
          </div>
        </Card>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function WAicon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.06 1.6 5.83L2 22l4.4-1.15a9.9 9.9 0 0 0 5.64 1.76h.01c5.46 0 9.91-4.45 9.91-9.91C22.06 6.45 17.5 2 12.04 2Zm5.8 14.16c-.24.68-1.4 1.3-1.94 1.35-.5.05-.95.24-3.2-.67-2.7-1.06-4.42-3.8-4.55-3.98-.13-.18-1.1-1.46-1.1-2.79 0-1.33.7-1.98.95-2.25.24-.27.53-.34.7-.34.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.54.8 1.87.87 2 .07.13.12.29.02.47-.1.18-.15.29-.29.45-.14.16-.3.36-.43.48-.14.13-.29.28-.12.55.17.27.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.33 1.46.27.13.43.11.6-.07.16-.18.68-.8.86-1.07.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.86.27.13.45.2.51.31.06.11.06.63-.18 1.31Z" />
    </svg>
  );
}

/* Share the site/a product to a WhatsApp contact (opens the contact picker). */
function shareToWhatsApp(text) {
  const origin = (typeof window !== "undefined" && window.location && window.location.origin) ? window.location.origin : "https://mishthisattva.com";
  return `https://wa.me/?text=${encodeURIComponent(text.replace("{site}", origin))}`;
}

function IcoIG({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="2" y="2" width="20" height="20" rx="5.4" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IcoFB({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M13 22v-8h2.7l.4-3H13V9.1c0-.87.24-1.46 1.5-1.46H16V5.02C15.72 4.98 14.79 4.9 13.7 4.9c-2.28 0-3.84 1.39-3.84 3.95V11H7.5v3h2.36v8H13z" />
    </svg>
  );
}
const socialIcon = (label) => label === "Instagram" ? <IcoIG /> : label === "Facebook" ? <IcoFB /> : <WAicon size={15} />;

function Footer() {
  const cats = ["Ayurvedic & Health", "Spices & Masala", "Hair Care", "Beauty & Skincare", "Special Foods"];
  const link = { fontSize: 14, color: "color-mix(in oklab, var(--cream) 80%, transparent)" };
  const heading = { fontFamily: "var(--font-display)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--accent)" };
  return (
    <footer style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
      <div className="ms-container ms-stack" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr", gap: 40, padding: "72px 20px 48px" }}>
        <div>
          <div style={{ maxWidth: 300 }}>
            <img src={`${ASSET}/mishthi-logo-white.png`} alt="Mishthi Sattva" style={{ height: 112, width: "auto", objectFit: "contain", display: "block", margin: "0 auto" }} />
            <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.6, color: "color-mix(in oklab, var(--cream) 78%, transparent)" }}>Pure, hygienic, homemade Ayurvedic foods, spices and wellness — handmade in small batches in Kotkapura, Punjab.</p>
            <p className="ms-hindi" style={{ marginTop: 14, fontSize: 14, color: "color-mix(in oklab, var(--cream) 65%, transparent)" }}>घर की रसोई से… आपके परिवार की सेहत तक।</p>
            <a href={shareToWhatsApp("🌿 Homemade Ayurvedic foods, spices & wellness from Mishthi Sattva — pure, hygienic, handmade in Kotkapura. Take a look: {site}")}
               target="_blank" rel="noopener noreferrer"
               style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: "var(--radius-pill)", background: "#25D366", color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              <WAicon size={18} /> Share Mishthi Sattva
            </a>
          </div>
        </div>
        <div>
          <p style={heading}>Shop</p>
          <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 9, listStyle: "none", padding: 0 }}>
            {cats.map((c) => <li key={c}><a href="../shop/index.html" style={link}>{c}</a></li>)}
          </ul>
        </div>
        <div>
          <p style={heading}>Company</p>
          <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 9, listStyle: "none", padding: 0 }}>
            <li><a href="index.html" style={link}>Home</a></li>
            <li><a href="about.html" style={link}>Our Story</a></li>
            <li><a href="../shop/index.html" style={link}>Shop</a></li>
            <li><a href="contact.html" style={link}>Contact</a></li>
          </ul>
        </div>
        <div>
          <p style={heading}>Get in Touch</p>
          <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0 }}>
            <li style={link}>📞 <a href={`tel:+91${PHONE}`} style={{ color: "inherit" }}>+91 {PHONE}</a></li>
            <li style={link}>💬 <a href="https://wa.me/918557942246" style={{ color: "inherit" }}>Chat With Us on WhatsApp</a></li>
            <li style={link}>📍 Mishthi Sattva Enterprises,<br />Valmiki Chowk, Kotkapura, Punjab</li>
            <li style={link}>🚚 Home delivery in Kotkapura &amp; nearby</li>
            <li style={link}>🕐 Mon–Sat, 9am–7pm</li>
          </ul>
          {/* Only render links we actually have. Add the real profile URLs to
              SOCIAL below and they'll appear; a dead href="#" is worse than
              no button at all. */}
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            {SOCIAL.filter((s) => s.href).map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                 style={{ display: "inline-flex", alignItems: "center", gap: 7, borderRadius: "var(--radius-pill)", border: "1px solid color-mix(in oklab, var(--cream) 20%, transparent)", padding: "7px 14px", fontSize: 12, fontWeight: 600 }}>{socialIcon(s.label)}{s.label}</a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid color-mix(in oklab, var(--cream) 12%, transparent)" }}>
        <div className="ms-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, padding: "18px 20px", fontSize: 12, color: "color-mix(in oklab, var(--cream) 60%, transparent)" }}>
          {/* FSSAI registration 22126010000026 — valid to 16-01-2027, renew from ~20-07-2026 */}
          <p>© {new Date().getFullYear()} Mishthi Sattva. All rights reserved. · FSSAI Reg. No. 22126010000026</p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <p style={{ display: "flex", gap: 16 }}>
              <a href="privacy.html" style={{ color: "inherit" }}>Privacy</a>
              <a href="terms.html" style={{ color: "inherit" }}>Terms</a>
              <a href="shipping.html" style={{ color: "inherit" }}>Shipping &amp; Returns</a>
            </p>
            <p style={{ margin: 0 }}>Crafted by <a href="https://tarahutaibuilds.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontWeight: 600 }}>TARAhut AI Builds</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- home: bestsellers grid (balanced 3 × 2) ---------- */
/* NOTE: photos come from the design project and vary in lighting/treatment.
   Uniform framing (4:3, cream backdrop, same corners) is applied here, but a
   real single-shoot catalogue is still recommended for full consistency.
   TODO: replace "Ask for price" with real ₹ prices once confirmed. */
const INR = (n) => "₹" + Number(n).toLocaleString("en-IN");
function askPriceWA(p) {
  return "https://wa.me/918557942246?text=" + encodeURIComponent("Namaste Mishthi Sattva! Please share the price of " + p.name + (p.size ? " (" + p.size + ")" : "") + ".");
}
/* Shows the price (with struck-through MRP), or — when a product has no set
   price — a clickable "Ask price on WhatsApp" link so it's obvious how to ask. */
function PriceTag({ p, big }) {
  if (p.price == null) {
    return (
      <a href={askPriceWA(p)} target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontSize: big ? 15 : 13.5, fontWeight: 600, color: "var(--primary)", textDecoration: "underline", textUnderlineOffset: 2 }}>
        Ask price on WhatsApp →
      </a>
    );
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: big ? 21 : 18, color: "var(--primary)" }}>{INR(p.price)}</span>
      {p.mrp && p.mrp > p.price ? <span style={{ fontSize: big ? 14 : 12.5, color: "var(--muted-foreground)", textDecoration: "line-through" }}>{INR(p.mrp)}</span> : null}
    </span>
  );
}

function HomeProductCard({ p, onView }) {
  const [h, setH] = React.useState(false);
  const [faved, setFaved] = React.useState(false);
  // read the saved state on mount (localStorage isn't available during SSR-style init)
  React.useEffect(() => { setFaved(readFavs().includes(p.id)); }, [p.id]);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", flexDirection: "column", background: "var(--card)", border: `1px solid ${h ? "var(--accent)" : "var(--border)"}`, borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: h ? "var(--shadow-lg)" : "var(--shadow-sm)", transform: h ? "translateY(-4px)" : "none", transition: "all .2s var(--ease-standard)" }}>
      <div style={{ position: "relative", aspectRatio: "4 / 3", background: "var(--cream)", overflow: "hidden", borderBottom: "1px solid color-mix(in oklab, var(--accent) 20%, transparent)" }}>
        <img src={p.photo || `${ASSET}/${p.img}`} alt={p.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {p.badge && <span style={{ position: "absolute", top: 12, left: 12, background: "var(--forest-deep)", color: "var(--cream)", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: "var(--radius-pill)" }}>{p.badge}</span>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "20px 20px 22px" }}>
        <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 23, lineHeight: 1.12, color: "var(--primary)" }}>{p.name}</h3>
        <p style={{ margin: "8px 0 0", fontSize: 14.5, lineHeight: 1.5, color: "var(--muted-foreground)" }}>{p.benefit}</p>
        <div style={{ marginTop: 14, display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{p.size}</span>
          <span style={{ color: "var(--accent)" }}>·</span>
          <PriceTag p={p} />
        </div>
        <div style={{ marginTop: "auto", paddingTop: 18, display: "flex", alignItems: "center", gap: 10 }}>
          {/* opens this product's details in a popup on THIS page — no navigation to the shop */}
          <button type="button" onClick={() => onView && onView(p)} style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 14px", borderRadius: "var(--radius-pill)", border: "1px solid var(--primary)", background: "var(--card)", color: "var(--primary)", fontFamily: "inherit", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>View Details</button>
          <button type="button" onClick={() => setFaved(toggleFav(p.id))}
            aria-label={faved ? `Remove ${p.name} from favourites` : `Add ${p.name} to favourites`} aria-pressed={faved}
            style={{ flexShrink: 0, display: "grid", placeItems: "center", height: 42, width: 42, borderRadius: "var(--radius-pill)", cursor: "pointer", transition: "all .18s",
              background: faved ? "color-mix(in oklab, var(--destructive) 12%, var(--card))" : "var(--card)",
              border: `1px solid ${faved ? "var(--destructive)" : "var(--border)"}`,
              color: faved ? "var(--destructive)" : "var(--ink-500)" }}>
            <HeartIcon filled={faved} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* In-place product popup for the home bestsellers. Shows the product's details
   right on the home page so "View Details" never navigates away to the shop. */
function ProductModal({ p, onClose }) {
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  const waMsg = `Namaste! I have a question about ${p.name}${p.size ? " (" + p.size + ")" : ""}.`;
  const imgSrc = p.photo || `${ASSET}/${p.img}`;
  const shareHref = shareToWhatsApp(`You have to try the ${p.name} from Mishthi Sattva 🌿 — homemade & preservative-free. See it here: {site}/shop`);
  const add = () => {
    addToShopCart({ id: p.id, name: p.name, price: p.price != null ? p.price : null, weight: p.size, cat: p.cat || null, photo: imgSrc, mrp: p.mrp != null ? p.mrp : null }, qty);
    setAdded(true);
  };
  const stepBtn = { height: 38, width: 38, display: "grid", placeItems: "center", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", background: "var(--card)", color: "var(--primary)", cursor: "pointer", fontSize: 18, lineHeight: 1 };
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label={p.name}
      style={{ position: "fixed", inset: 0, zIndex: 120, background: "color-mix(in oklab, var(--forest-deep) 55%, transparent)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ width: "min(440px, 96vw)", maxHeight: "92vh", overflow: "auto", background: "var(--white)", borderRadius: "var(--radius-3xl)", boxShadow: "var(--shadow-xl)", border: "1px solid var(--border)" }}>
        <div style={{ position: "relative", aspectRatio: "4 / 3", background: "var(--cream)", overflow: "hidden", borderTopLeftRadius: "var(--radius-3xl)", borderTopRightRadius: "var(--radius-3xl)" }}>
          <img src={imgSrc} alt={p.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          {p.badge && <span style={{ position: "absolute", top: 14, left: 14, background: "var(--forest-deep)", color: "var(--cream)", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: "var(--radius-pill)" }}>{p.badge}</span>}
          <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 12, right: 12, height: 36, width: 36, display: "grid", placeItems: "center", borderRadius: "var(--radius-pill)", border: "none", background: "color-mix(in oklab, var(--forest-deep) 55%, transparent)", color: "var(--cream)", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: "26px 26px 28px" }}>
          <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, lineHeight: 1.1, color: "var(--primary)" }}>{p.name}</h3>
          <p style={{ margin: "12px 0 0", fontSize: 15.5, lineHeight: 1.6, color: "var(--muted-foreground)" }}>{p.desc || p.benefit}</p>
          <div style={{ marginTop: 16, display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>{p.size}</span>
            <span style={{ color: "var(--accent)" }}>·</span>
            <PriceTag p={p} big />
          </div>
          {added ? (
            <div style={{ marginTop: 22 }}>
              <p style={{ margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8, fontWeight: 600, color: "var(--primary)" }}>
                <span style={{ display: "grid", placeItems: "center", height: 24, width: 24, borderRadius: "var(--radius-pill)", background: "var(--success, #2e7d32)", color: "#fff", fontSize: 15 }}>✓</span>
                Added {qty} to your cart
              </p>
              <Button variant="forest" as="a" href="../shop/index.html?cart=1" fullWidth>View cart &amp; checkout →</Button>
              <button type="button" onClick={onClose} style={{ marginTop: 10, width: "100%", background: "transparent", border: "none", color: "var(--muted-foreground)", fontFamily: "inherit", fontSize: 14, cursor: "pointer" }}>Keep browsing</button>
            </div>
          ) : (
            <div style={{ marginTop: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>Quantity</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} style={stepBtn}>−</button>
                  <span style={{ minWidth: 24, textAlign: "center", fontWeight: 600, fontSize: 16, color: "var(--primary)" }}>{qty}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} style={stepBtn}>+</button>
                </div>
              </div>
              <Button variant="forest" onClick={add} fullWidth>Add to Cart</Button>
              <div style={{ marginTop: 10 }}>
                <Button variant="outline" fullWidth as="a" href={`https://wa.me/${WA}?text=${encodeURIComponent(waMsg)}`} target="_blank" rel="noopener noreferrer">Questions? Chat with Us</Button>
              </div>
              <div style={{ marginTop: 14, textAlign: "center" }}>
                <a href={shareHref} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 600, color: "var(--whatsapp, #128C4B)", textDecoration: "none" }}>
                  <WAicon size={16} /> Share this with a friend
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- "Help Me Choose" product finder ---------- */
const FINDER_GOALS = [
  { id: "wellness", emoji: "🌿", label: "Daily wellness & immunity", sub: "Immunity & everyday health", slugs: ["chyawanprash", "herbal-heart-sip", "shakti-laddu"] },
  { id: "energy",   emoji: "💪", label: "Energy & strength",         sub: "Stamina for active days",   slugs: ["shakti-laddu", "protein-sattu", "sampooran-laddu"] },
  { id: "cooking",  emoji: "🍲", label: "Everyday cooking & spices",  sub: "Masalas & kitchen staples", slugs: ["shahi-garam-masala", "chat-masala", "shinkaji-masala"] },
  { id: "care",     emoji: "✨", label: "Hair & skin care",          sub: "Natural self-care",         slugs: ["kesh-vardaan-oil", "urban-glow", "vitamin-c-serum"] },
  { id: "treats",   emoji: "🎁", label: "Gifting & treats",          sub: "Snacks & gift-worthy picks", slugs: ["shakti-laddu", "paani-puri-combo", "shahi-sip-scoop"] },
];

function ProductFinder({ onClose }) {
  const [goal, setGoal] = React.useState(null);
  const [bySlug, setBySlug] = React.useState(null); // null = still loading
  const [selected, setSelected] = React.useState(null);
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { if (selected) setSelected(null); else onClose(); } };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose, selected]);
  React.useEffect(() => {
    let alive = true;
    if (window.MSData && window.MSData.getProducts) {
      window.MSData.getProducts()
        .then((rows) => { if (alive) { const m = {}; (rows || []).forEach((r) => { m[r.slug] = r; }); setBySlug(m); } })
        .catch(() => { if (alive) setBySlug({}); });
    } else { setBySlug({}); }
    return () => { alive = false; };
  }, []);
  const toP = (r) => ({ id: r.slug, name: r.name, size: r.weight, desc: r.short_desc, photo: r.photo, price: r.price == null ? null : Number(r.price), mrp: r.mrp == null ? null : Number(r.mrp), badge: r.badge || undefined, cat: r.category });
  const g = FINDER_GOALS.find((x) => x.id === goal);
  const recs = g && bySlug ? g.slugs.map((s) => bySlug[s]).filter(Boolean).map(toP) : [];
  const waHelp = `https://wa.me/${WA}?text=` + encodeURIComponent("Namaste! I'm looking for a Mishthi Sattva product for my family. Please help me choose the right option.");
  return (
    <React.Fragment>
      <div onClick={onClose} role="dialog" aria-modal="true" aria-label="Help me choose"
        style={{ position: "fixed", inset: 0, zIndex: 118, background: "color-mix(in oklab, var(--forest-deep) 55%, transparent)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", padding: 20 }}>
        <div onClick={(e) => e.stopPropagation()}
          style={{ width: "min(560px, 96vw)", maxHeight: "92vh", overflow: "auto", background: "var(--white)", borderRadius: "var(--radius-3xl)", boxShadow: "var(--shadow-xl)", border: "1px solid var(--border)", padding: "26px 24px 24px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div>
              <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>Help me choose</p>
              <h3 style={{ margin: "6px 0 0", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, lineHeight: 1.1, color: "var(--primary)" }}>{goal ? "Our picks for you" : "What are you looking for?"}</h3>
            </div>
            <button onClick={onClose} aria-label="Close" style={{ flex: "0 0 auto", height: 36, width: 36, display: "grid", placeItems: "center", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", background: "var(--card)", color: "var(--primary)", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
          </div>
          {!goal ? (
            <div style={{ marginTop: 20, display: "grid", gap: 10 }}>
              {FINDER_GOALS.map((x) => (
                <button key={x.id} onClick={() => setGoal(x.id)}
                  style={{ display: "flex", alignItems: "center", gap: 14, textAlign: "left", padding: "14px 16px", borderRadius: 16, border: "1px solid var(--border)", background: "var(--card)", cursor: "pointer", fontFamily: "inherit" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}>
                  <span style={{ fontSize: 26, lineHeight: 1 }}>{x.emoji}</span>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: "block", fontWeight: 700, fontSize: 16, color: "var(--primary)" }}>{x.label}</span>
                    <span style={{ display: "block", fontSize: 13, color: "var(--muted-foreground)" }}>{x.sub}</span>
                  </span>
                  <span style={{ marginLeft: "auto", color: "var(--accent)", fontSize: 18 }}>→</span>
                </button>
              ))}
            </div>
          ) : (
            <div style={{ marginTop: 18 }}>
              <button onClick={() => setGoal(null)} style={{ background: "transparent", border: "none", color: "var(--muted-foreground)", fontFamily: "inherit", fontSize: 14, cursor: "pointer", padding: 0, marginBottom: 12 }}>← Choose something else</button>
              {bySlug == null ? (
                <p style={{ color: "var(--muted-foreground)", fontSize: 15, padding: "16px 0" }}>Finding the best matches…</p>
              ) : recs.length ? (
                <div style={{ display: "grid", gap: 12 }}>
                  {recs.map((p) => (
                    <button key={p.id} onClick={() => setSelected(p)}
                      style={{ display: "flex", alignItems: "center", gap: 14, textAlign: "left", padding: 10, borderRadius: 16, border: "1px solid var(--border)", background: "var(--card)", cursor: "pointer", fontFamily: "inherit" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}>
                      <span style={{ flex: "0 0 auto", height: 64, width: 64, borderRadius: 12, overflow: "hidden", background: "var(--cream)", display: "block" }}>
                        {p.photo ? <img src={p.photo} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : null}
                      </span>
                      <span style={{ minWidth: 0 }}>
                        <span style={{ display: "block", fontWeight: 700, fontSize: 15.5, color: "var(--primary)" }}>{p.name}</span>
                        {p.size ? <span style={{ display: "block", fontSize: 12.5, color: "var(--muted-foreground)", marginBottom: 3 }}>{p.size}</span> : null}
                        <PriceTag p={p} />
                      </span>
                      <span style={{ marginLeft: "auto", flex: "0 0 auto", color: "var(--accent)", fontSize: 13, fontWeight: 600 }}>View →</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p style={{ color: "var(--muted-foreground)", fontSize: 15, padding: "10px 0" }}>We couldn't load products just now — tap "Chat with us" below and we'll help you personally.</p>
              )}
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--border)", textAlign: "center" }}>
                <a href={waHelp} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 600, color: "var(--primary)", textDecoration: "underline", textUnderlineOffset: 2 }}>Still not sure? Chat with us on WhatsApp →</a>
              </div>
            </div>
          )}
        </div>
      </div>
      {selected && <ProductModal p={selected} onClose={() => setSelected(null)} />}
    </React.Fragment>
  );
}

function HomeProducts() {
  const [view, setView] = React.useState(null);
  const [rows, setRows] = React.useState(null); // full live catalogue, so the home reflects admin edits
  // ids match the shop catalogue slugs, so favourites sync with the shop wishlist
  const picks = [
    { id: "shakti-laddu", name: "Shakti Laddu", benefit: "Dry fruits, gond & jaggery — no refined sugar.", desc: "Energy-rich laddu made with dry fruits, edible gum (gond) and jaggery — a traditional strength tonic with no refined sugar.", img: "shakti-laddu.png", size: "500 g", price: 850, mrp: 1200, badge: "Bestseller" },
    { id: "shinkaji-masala", name: "Shinkaji Masala", benefit: "A robust homestyle Punjabi blend.", desc: "A robust, homestyle Punjabi masala for everyday sabzis and gravies — freshly ground in small batches.", img: "shinkaji-masala-pack.png", size: "100 g", price: 200, mrp: 500 },
    { id: "herbal-heart-sip", name: "Herbal Heart Sip", benefit: "A warming daily herbal infusion.", desc: "A warming herbal infusion of traditional herbs — one soothing pinch in hot water, any time of day.", img: "herbal-heart-sip.png", size: "40 g", price: 200, mrp: 500 },
    { id: "shahi-garam-masala", name: "Shahi Garam Masala", benefit: "Whole spices, roasted & stone-ground.", desc: "A royal garam masala of whole spices, roasted and stone-ground for deep, aromatic flavour.", img: "shahi-garam-masala.png", size: "50 g", price: 120, mrp: 300, badge: "Bestseller" },
    { id: "kesh-vardaan-oil", name: "AyurKesh Vardaan Hair Oil", benefit: "Bhringraj, brahmi, sesame & amaltas — helps reverse greying.", desc: "An intensive hair-fall oil blend of bhringraj, brahmi, sesame and amaltas pods — nourishes the scalp for thicker, stronger hair and helps reverse greying.", img: "kesh-vardaan-oil.png", size: "100 ml", price: 250, mrp: 350 },
    { id: "urban-glow", name: "Instant Ubtan Glow", benefit: "A brightening natural face pack.", desc: "A brightening face pack for an instant, natural radiance — a classic ubtan, ready in minutes.", img: "ubtan-glow-pack.png", size: "100 g", price: 200, mrp: 350, badge: "New" },
  ];
  React.useEffect(() => {
    let alive = true;
    if (window.MSData && window.MSData.getProducts) {
      window.MSData.getProducts().then((rs) => { if (alive) setRows(rs || []); }).catch(() => { if (alive) setRows(null); });
    }
    return () => { alive = false; };
  }, []);
  // Home Bestsellers are built LIVE from the database so admin edits always show here too.
  // Owner-featured products (ticked in /admin) lead; the curated picks fill the rest, each
  // refreshed with live price/description. Falls back to the static set only if the DB is unreachable.
  const list = (() => {
    if (!rows || !rows.length) return picks;
    const bySlug = {}; rows.forEach((r) => { bySlug[r.slug] = r; });
    const live = (r, fb) => ({ id: r.slug, name: r.name, benefit: (fb && fb.benefit) || r.short_desc || "", desc: r.short_desc || (fb && fb.desc) || "", photo: r.photo, size: r.weight, price: r.price == null ? null : Number(r.price), mrp: r.mrp == null ? null : Number(r.mrp), badge: r.badge || (fb && fb.badge) || undefined, cat: r.category });
    const curated = picks.map((pk) => (bySlug[pk.id] && bySlug[pk.id].in_stock !== false) ? live(bySlug[pk.id], pk) : null).filter(Boolean);
    const curIds = new Set(curated.map((p) => p.id));
    const feat = rows.filter((r) => r.featured === true && r.in_stock !== false && !curIds.has(r.slug)).map((r) => live(r));
    const combined = [...feat, ...curated].slice(0, 6);
    return combined.length ? combined : picks;
  })();
  return (
    <section id="bestsellers" style={{ background: "var(--white)", padding: "80px 0", scrollMarginTop: 90 }}>
      <div className="ms-container">
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <GoldDivider align="center">Our Bestsellers</GoldDivider>
          <h2 style={{ marginTop: 20, fontSize: 52, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.015em", textWrap: "balance" }}>Made with purpose,<br />chosen for everyday wellness.</h2>
          <p style={{ marginTop: 16, color: "var(--muted-foreground)", fontSize: 17, lineHeight: 1.6 }}>Explore our bestselling laddu, masalas, wellness blends and handcrafted care products.</p>
        </div>
        <div className="ms-prodgrid" style={{ marginTop: 52, display: "grid", gap: 22, alignItems: "stretch" }}>
          {list.map((p) => <HomeProductCard key={p.id || p.name} p={p} onView={setView} />)}
        </div>
        <div style={{ marginTop: 44, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <Button variant="forest" as="a" href="../shop/index.html">Explore All Products →</Button>
          <Button variant="gold" as="a" href="https://wa.me/c/918557942246" target="_blank" rel="noopener noreferrer">Get the Catalogue</Button>
        </div>
      </div>
      {view && <ProductModal p={view} onClose={() => setView(null)} />}
    </section>
  );
}

/* ---------- home: how it's made ---------- */
function Process() {
  const steps = [
    { n: "01", t: "Ingredients selected", d: "Natural, seasonal ingredients chosen with care." },
    { n: "02", t: "Prepared in small batches", d: "Cooked fresh at home — never mass-produced." },
    { n: "03", t: "Hygienically packed", d: "Sealed clean to keep every batch fresh." },
    { n: "04", t: "Delivered fresh", d: "Home delivery in Kotkapura & nearby areas; other locations confirmed on WhatsApp." },
  ];
  return (
    <section style={{ background: "var(--background)", padding: "80px 0" }}>
      <div className="ms-container">
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <GoldDivider align="center">How It's Made</GoldDivider>
          <h2 style={{ marginTop: 20, fontSize: 50, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.015em", textWrap: "balance" }}>Homemade, the honest way.</h2>
          <p style={{ marginTop: 16, color: "var(--muted-foreground)", fontSize: 17 }}>From our kitchen to your family — every batch follows the same four steps.</p>
        </div>
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-2xl)", padding: 28, boxShadow: "var(--shadow-sm)" }}>
              <span style={{ display: "grid", placeItems: "center", height: 48, width: 48, borderRadius: "var(--radius-pill)", background: "color-mix(in oklab, var(--gold) 16%, transparent)", color: "var(--accent)" }}><Leaf size={24} /></span>
              <p style={{ marginTop: 18, fontFamily: "var(--font-display)", fontSize: 30, color: "color-mix(in oklab, var(--accent) 60%, transparent)" }}>{s.n}</p>
              <h3 style={{ marginTop: 4, fontSize: 21, color: "var(--primary)" }}>{s.t}</h3>
              <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: "var(--muted-foreground)" }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- home: founder teaser ---------- */
function FounderTeaser() {
  return (
    <section style={{ background: "color-mix(in oklab, var(--secondary) 60%, var(--background))", padding: "84px 0" }}>
      <div className="ms-container ms-stack" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 48, alignItems: "center" }}>
        <div style={{ overflow: "hidden", borderRadius: 28, border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)", aspectRatio: "4 / 5" }}>
          <img src={`${ASSET}/founder-kiran.jpg`} alt="Cherry Bansal shaping laddu by hand in her Kotkapura kitchen" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 32%", display: "block" }} />
        </div>
        <div>
          <GoldDivider>From Cherry's Kitchen</GoldDivider>
          <h2 style={{ marginTop: 18, fontSize: 52, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.015em" }}>From my kitchen<br />to your family.</h2>
          <p style={{ marginTop: 22, fontSize: 19, lineHeight: 1.7, fontStyle: "italic", color: "var(--primary)" }}>"I started Mishthi Sattva to prepare the kind of food I wanted for my own family — honest ingredients, careful preparation and no unnecessary shortcuts."</p>
          <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.7, color: "color-mix(in oklab, var(--foreground) 85%, transparent)" }}>Every batch is still made by hand in Cherry's Kotkapura kitchen — no refined oil, no refined sugar, no compromises.</p>
          <p className="ms-hindi" style={{ marginTop: 18, borderLeft: "2px solid var(--accent)", paddingLeft: 18, fontSize: 19, fontStyle: "italic", color: "var(--primary)" }}>"स्वाद ऐसा जो दिल जीत ले, और सेहत ऐसी जिस पर पूरा परिवार भरोसा करे।"</p>
          <div style={{ marginTop: 28 }}><Button variant="outline" as="a" href="about.html">Meet Cherry &amp; Discover Our Story →</Button></div>
        </div>
      </div>
    </section>
  );
}

/* ---------- home: ordering made simple ---------- */
function HomeOrdering() {
  const steps = [
    { n: "1", t: "Explore products", d: "Browse the shop and view product details." },
    { n: "2", t: "Add to your cart", d: "Choose quantities and build your complete order." },
    { n: "3", t: "Send for confirmation", d: "Checkout sends your full cart to us as one WhatsApp message." },
    { n: "4", t: "Payment & delivery", d: "We confirm payment and deliver fresh to your door." },
  ];
  /* TODO: confirm exact delivery time, payment methods (COD?) and any minimum order. */
  const info = [
    ["🚚", "Delivery area", "Kotkapura & nearby; other cities via courier"],
    ["⏱️", "Delivery time", "Usually 1–3 days locally"],
    ["💳", "Payment", "Options confirmed on WhatsApp"],
    ["🎁", "Custom orders", "Bulk & gift orders welcome"],
  ];
  return (
    <section style={{ background: "var(--background)", padding: "80px 0" }}>
      <div className="ms-container">
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <GoldDivider align="center">Ordering Made Simple</GoldDivider>
          <h2 style={{ marginTop: 20, fontSize: 50, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.015em", textWrap: "balance" }}>Four steps to your doorstep.</h2>
        </div>
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-2xl)", padding: 26, boxShadow: "var(--shadow-sm)" }}>
              <span style={{ display: "grid", placeItems: "center", height: 44, width: 44, borderRadius: "var(--radius-pill)", background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600 }}>{s.n}</span>
              <h3 style={{ marginTop: 16, fontSize: 20, color: "var(--primary)" }}>{s.t}</h3>
              <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: "var(--muted-foreground)" }}>{s.d}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {info.map(([icon, k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, background: "color-mix(in oklab, var(--secondary) 55%, var(--card))", borderRadius: "var(--radius-xl)", padding: "14px 16px" }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent)" }}>{k}</p>
                <p style={{ fontSize: 13.5, color: "var(--foreground)" }}>{v}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Button variant="forest" as="a" href="../shop/index.html">Build Your Cart →</Button>
          <p style={{ marginTop: 14, fontSize: 14, color: "var(--muted-foreground)" }}>
            Prefer personal help? <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hello Mishthi Sattva, I'd like to place an order. Please help me get started.")}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "underline" }}>Order on WhatsApp</a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- about: journey timeline ---------- */
function Journey() {
  /* TODO: add real years/dates once confirmed with the founder */
  const steps = [
    { t: "The first recipe", d: "Made at home, for her own family." },
    { t: "Shared with loved ones", d: "Friends and neighbours began asking for more." },
    { t: "Mishthi Sattva was born", d: "A homemade wellness brand took shape." },
    { t: "Growing with care", d: "More foods, spices and wellness products were added." },
    { t: "Still made personally", d: "Small batches, careful preparation, direct relationships." },
  ];
  return (
    <section style={{ background: "var(--background)", padding: "84px 0" }}>
      <div className="ms-container">
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <GoldDivider align="center">Our Journey</GoldDivider>
          <h2 style={{ marginTop: 20, fontSize: 48, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.015em", textWrap: "balance" }}>From one kitchen to many homes.</h2>
        </div>
        <ol style={{ maxWidth: 640, margin: "48px auto 0", listStyle: "none", padding: 0 }}>
          {steps.map((s, i) => (
            <li key={s.t} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ display: "grid", placeItems: "center", height: 40, width: 40, flexShrink: 0, borderRadius: "var(--radius-pill)", background: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 700, fontSize: 15 }}>{i + 1}</span>
                {i < steps.length - 1 && <span style={{ flex: 1, width: 2, background: "color-mix(in oklab, var(--accent) 45%, transparent)", marginTop: 6 }} />}
              </div>
              <div style={{ paddingBottom: i < steps.length - 1 ? 28 : 0 }}>
                <h3 style={{ fontSize: 22, color: "var(--primary)" }}>{s.t}</h3>
                <p style={{ marginTop: 4, fontSize: 16, lineHeight: 1.6, color: "var(--muted-foreground)" }}>{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- about: what "Mishthi Sattva" means ---------- */
function NameMeaning() {
  return (
    <section style={{ background: "var(--primary)", color: "var(--primary-foreground)", padding: "84px 0" }}>
      <div className="ms-container" style={{ maxWidth: 820, marginInline: "auto", textAlign: "center" }}>
        <GoldDivider align="center" onDark>The Name</GoldDivider>
        <h2 style={{ marginTop: 20, fontSize: 48, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.015em", color: "var(--cream)" }}>What "Mishthi Sattva" means.</h2>
        {/* TODO: confirm this meaning with the founder before launch */}
        <p style={{ marginTop: 22, fontSize: 19, lineHeight: 1.75, color: "color-mix(in oklab, var(--cream) 85%, transparent)" }}>
          <b style={{ color: "var(--accent)" }}>Mishthi</b> speaks of sweetness and warmth. <b style={{ color: "var(--accent)" }}>Sattva</b> represents purity, balance and goodness. Together, the name carries our belief that nourishing food should bring both joy and wellbeing.
        </p>
      </div>
    </section>
  );
}

/* ---------- about: what homemade means (brand philosophy) ---------- */
function HomemadePhilosophy() {
  const cards = [
    { t: "Ingredients we recognise", d: "Carefully selected ingredients chosen for taste, freshness and suitability." },
    { t: "Preparation we can stand behind", d: "Made in manageable batches, with personal attention at every stage." },
    { t: "Food we'd serve our own family", d: "Every product is approached with the same care we expect in our own home." },
  ];
  return (
    <section style={{ background: "var(--background)", padding: "84px 0" }}>
      <div className="ms-container">
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <GoldDivider align="center">What Homemade Means</GoldDivider>
          <h2 style={{ marginTop: 20, fontSize: 48, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.015em", textWrap: "balance" }}>More than a label.</h2>
        </div>
        <div style={{ marginTop: 52, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
          {cards.map((c, i) => (
            <div key={c.t} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-2xl)", padding: 32, boxShadow: "var(--shadow-sm)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 34, color: "color-mix(in oklab, var(--accent) 60%, transparent)" }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 style={{ marginTop: 10, fontSize: 23, lineHeight: 1.15, color: "var(--primary)" }}>{c.t}</h3>
              <p style={{ marginTop: 10, fontSize: 15.5, lineHeight: 1.6, color: "var(--muted-foreground)" }}>{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- about: founder's promise + CTA ---------- */
function FounderPromise() {
  return (
    <section style={{ background: "color-mix(in oklab, var(--secondary) 60%, var(--background))", padding: "88px 0" }}>
      <div className="ms-container" style={{ maxWidth: 780, marginInline: "auto", textAlign: "center" }}>
        <GoldDivider align="center">Cherry's Promise</GoldDivider>
        <p style={{ marginTop: 24, fontFamily: "var(--font-display)", fontSize: 30, lineHeight: 1.35, fontStyle: "italic", color: "var(--primary)", textWrap: "balance" }}>"We will always tell you what goes into our products, prepare them with personal care, and recommend only what we'd confidently serve in our own home."</p>
        <p style={{ marginTop: 16, fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--accent)" }}>— Cherry Bansal, Founder</p>
        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <Button variant="forest" as="a" href="../shop/index.html">Explore Our Products →</Button>
          <Button variant="outline" as="a" href={`https://wa.me/${WA}?text=${encodeURIComponent("Namaste Cherry! I read your story on the Mishthi Sattva website and would like to know more.")}`} target="_blank" rel="noopener noreferrer">Talk to Cherry on WhatsApp</Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- policy pages (privacy / terms / shipping) ----------
   Business details are the real registered ones from the FSSAI certificate.
   TODO: the owner should review these before launch — the returns window and
   dispatch times in particular are business decisions, not legal boilerplate. */
const BUSINESS = {
  legal: "Mishthi Sattva (Prop. Kiran Bansal)",
  address: "Mishthi Sattva Enterprises, Valmiki Chowk, Kotkapura, Punjab",
  fssai: "22126010000026",
  phone: PHONE,
};

function PolicySection({ title, updated, blocks }) {
  return (
    <section style={{ background: "var(--white)", padding: "72px 0", minHeight: "60vh" }}>
      <div className="ms-container" style={{ maxWidth: 820, marginInline: "auto" }}>
        <GoldDivider>Legal</GoldDivider>
        <h1 style={{ marginTop: 16, fontSize: 48, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.015em" }}>{title}</h1>
        <p className="muted" style={{ marginTop: 10, fontSize: 13, color: "var(--muted-foreground)" }}>Last updated: {updated}</p>
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 26 }}>
          {blocks.map((b) => (
            <div key={b.h}>
              <h2 style={{ fontSize: 22, color: "var(--primary)" }}>{b.h}</h2>
              {b.p.map((para, i) => (
                <p key={i} style={{ marginTop: 10, fontSize: 16, lineHeight: 1.7, color: "color-mix(in oklab, var(--foreground) 85%, transparent)" }}>{para}</p>
              ))}
            </div>
          ))}
          <div style={{ marginTop: 10, padding: 22, borderRadius: "var(--radius-2xl)", background: "var(--background)", border: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: 20, color: "var(--primary)" }}>Contact us</h2>
            <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.7, color: "var(--muted-foreground)" }}>
              {BUSINESS.legal}<br />{BUSINESS.address}<br />
              FSSAI Reg. No. {BUSINESS.fssai}<br />
              WhatsApp / Phone: <a href={`tel:+91${BUSINESS.phone}`} style={{ color: "var(--primary)" }}>+91 {BUSINESS.phone}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const POLICIES = {
  privacy: {
    title: "Privacy Policy",
    updated: "21 July 2026",
    blocks: [
      { h: "What we collect", p: [
        "When you place an order or send an enquiry we collect the details you give us: your name, phone number, delivery address and any note you add. We do not ask for payment card details on this website.",
        "We do not use advertising trackers or sell your information to anyone.",
      ]},
      { h: "How we use it", p: [
        "Only to process and deliver your order, to reply to your enquiry, and to keep a record of past orders. Because we take orders over WhatsApp, your message and phone number are also visible in that chat.",
      ]},
      { h: "Where it is stored", p: [
        "Order and enquiry records are stored in our database (Supabase). Access is restricted to the business owner through a password-protected admin login; they are not publicly readable.",
      ]},
      { h: "Your choices", p: [
        "You can ask us to delete your details at any time by messaging us on WhatsApp, and we will remove them from our records.",
      ]},
    ],
  },
  terms: {
    title: "Terms & Conditions",
    updated: "21 July 2026",
    blocks: [
      { h: "Placing an order", p: [
        "Adding items on this website starts an order request; it is confirmed only once we have agreed the items, price, delivery and payment with you on WhatsApp. Until then no contract exists.",
      ]},
      { h: "Prices and availability", p: [
        "Prices shown are in Indian Rupees and may change. Some items are marked \"Ask for price\" — we will quote those on WhatsApp. Products are made in small batches, so availability can vary.",
      ]},
      { h: "About our products", p: [
        "Our products are foods, spices and personal-care items prepared in a home kitchen registered under FSSAI Reg. No. " + BUSINESS.fssai + ". They are not medicines. Nothing on this website is medical advice, and our products are not intended to diagnose, treat or cure any condition. If you are pregnant, have a medical condition or a known allergy, please check the ingredients with us before ordering.",
      ]},
      { h: "Ingredients and allergens", p: [
        "Many products contain nuts, dairy, sesame or gluten and are prepared in a kitchen that handles these. If you have an allergy, ask us before ordering.",
      ]},
    ],
  },
  shipping: {
    title: "Shipping & Returns",
    updated: "21 July 2026",
    blocks: [
      { h: "Where we deliver", p: [
        "We deliver to homes in Kotkapura and nearby areas. For other locations in India we send orders through trusted courier services — we will confirm availability and any charges on WhatsApp before dispatch.",
      ]},
      { h: "Dispatch and delivery time", p: [
        "Because everything is made in small batches, orders are usually prepared and dispatched within a few days. Local deliveries typically arrive within 1–3 days. We will confirm the timing for your order on WhatsApp.",
      ]},
      { h: "Returns", p: [
        "Food products are perishable and prepared to order, so for hygiene and safety reasons we cannot accept returns on opened or used items.",
        "If your order arrives damaged, incorrect or spoiled, message us on WhatsApp within 48 hours with a photo and we will replace it or refund you.",
      ]},
      { h: "Cancellations", p: [
        "You can cancel before your order has been prepared or dispatched — just message us on WhatsApp as soon as possible.",
      ]},
    ],
  },
};

function PolicyPage({ which }) {
  const p = POLICIES[which];
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", color: "var(--foreground)" }}>
      <Header />
      <main><PolicySection title={p.title} updated={p.updated} blocks={p.blocks} /></main>
      <Footer />
      <StickyWhatsApp />
      <MobileBar />
    </div>
  );
}

/* ---------- mobile sticky call + whatsapp bar ---------- */
function MobileBar() {
  return (
    <div className="ms-mobilebar" style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 60, gap: 10, padding: "10px 12px calc(10px + env(safe-area-inset-bottom))", background: "color-mix(in oklab, var(--card) 96%, transparent)", borderTop: "1px solid var(--border)", backdropFilter: "blur(8px)", boxShadow: "0 -6px 24px -12px oklch(0.24 0.05 158 / 0.25)" }}>
      <a href={`tel:+91${PHONE}`} style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, height: 48, borderRadius: "var(--radius-pill)", border: "1px solid var(--primary)", color: "var(--primary)", fontWeight: 700, fontSize: 15 }}>📞 Call</a>
      <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{ flex: 2, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, height: 48, borderRadius: "var(--radius-pill)", background: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 700, fontSize: 15 }}>💬 Chat With Us</a>
    </div>
  );
}

function StickyWhatsApp() {
  return (
    <a className="ms-fab" href={`https://wa.me/918557942246`} target="_blank" rel="noopener noreferrer" aria-label="Need help? Chat with us on WhatsApp" title="Need Help? Chat With Us"
       style={{ position: "fixed", bottom: 20, right: 20, zIndex: 50, display: "grid", placeItems: "center", height: 56, width: 56, borderRadius: "var(--radius-pill)", background: "var(--primary)", color: "var(--cream)", boxShadow: "var(--shadow-xl)", border: "4px solid color-mix(in oklab, var(--gold) 45%, transparent)" }}>
      <svg viewBox="0 0 32 32" width={28} height={28} fill="currentColor"><path d="M19.11 17.36c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.46-.83-2-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16 4C9.37 4 4 9.37 4 16c0 2.11.55 4.09 1.52 5.81L4 28l6.36-1.49A11.92 11.92 0 0 0 16 28c6.63 0 12-5.37 12-12S22.63 4 16 4z" /></svg>
    </a>
  );
}

/* ---------- customer account: login / signup / order history + tracking ---------- */
const ORDER_STEPS = ["new", "confirmed", "packed", "delivered"];
const STEP_LABEL = { new: "Placed", confirmed: "Confirmed", packed: "Packed", delivered: "Delivered" };

function OrderTracker({ status }) {
  if (status === "cancelled") return <p style={{ marginTop: 12, fontSize: 13, fontWeight: 700, color: "var(--destructive)" }}>Cancelled</p>;
  const idx = ORDER_STEPS.indexOf(status);
  return (
    <div style={{ display: "flex", alignItems: "flex-start", marginTop: 14 }}>
      {ORDER_STEPS.map((s, i) => {
        const done = i <= idx;
        return (
          <React.Fragment key={s}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, width: 66 }}>
              <span style={{ height: 24, width: 24, borderRadius: "var(--radius-pill)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700, background: done ? "var(--primary)" : "var(--secondary)", color: done ? "var(--primary-foreground)" : "var(--muted-foreground)" }}>{done ? "✓" : i + 1}</span>
              <span style={{ fontSize: 11, textAlign: "center", color: done ? "var(--primary)" : "var(--muted-foreground)" }}>{STEP_LABEL[s]}</span>
            </div>
            {i < ORDER_STEPS.length - 1 && <div style={{ flex: 1, height: 2, marginTop: 11, background: i < idx ? "var(--primary)" : "var(--border)" }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Account() {
  const D = window.MSData;
  const configured = D && D.configured;
  const [user, setUser] = React.useState(configured ? D.currentUser() : null);
  const [mode, setMode] = React.useState("login");
  const [form, setForm] = React.useState({ name: "", phone: "", email: "", password: "" });
  const [busy, setBusy] = React.useState(false);
  const [welcome, setWelcome] = React.useState(false); // show a confirmation right after a new account is created
  const [msg, setMsg] = React.useState("");
  const [orders, setOrders] = React.useState(null);
  const [oauthBusy, setOauthBusy] = React.useState(configured && (window.location.hash || "").indexOf("access_token=") !== -1);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  React.useEffect(() => { if (user && configured) D.myOrders().then(setOrders); }, [user]);
  // If we just returned from Google's OAuth redirect, capture the session.
  React.useEffect(() => {
    if (!oauthBusy) return;
    D.handleOAuthReturn().then((ok) => { if (ok) setUser(D.currentUser()); setOauthBusy(false); });
  }, []);

  if (!configured) {
    return (
      <section style={{ padding: "96px 0", minHeight: "60vh" }}>
        <div className="ms-container" style={{ maxWidth: 520, marginInline: "auto", textAlign: "center" }}>
          <GoldDivider align="center">Account</GoldDivider>
          <h1 style={{ marginTop: 16, fontSize: 40, fontWeight: 700 }}>Accounts are being set up</h1>
          <p style={{ marginTop: 12, color: "var(--muted-foreground)" }}>Customer login isn't connected yet — please order on WhatsApp in the meantime.</p>
          <div style={{ marginTop: 24 }}><Button variant="forest" as="a" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">Order on WhatsApp</Button></div>
        </div>
      </section>
    );
  }

  const submit = (e) => {
    e.preventDefault(); setBusy(true); setMsg("");
    const p = mode === "signup"
      ? D.signUp(form.email.trim(), form.password, form.name.trim(), form.phone.trim())
      : D.signIn(form.email.trim(), form.password);
    p.then(() => {
      setBusy(false);
      if (D.isSignedIn()) { setUser(D.currentUser()); if (mode === "signup") setWelcome(true); }
      else { setMode("login"); setMsg("Account created. Check your email to confirm, then sign in."); }
    }).catch((ex) => { setBusy(false); setMsg(ex.message); });
  };

  if (!user) {
    if (oauthBusy) {
      return (
        <section style={{ padding: "140px 0", minHeight: "60vh", textAlign: "center" }}>
          <div className="ms-container"><p style={{ fontSize: 18, color: "var(--muted-foreground)" }}>Signing you in with Google…</p></div>
        </section>
      );
    }
    return (
      <section style={{ padding: "72px 0", minHeight: "70vh" }}>
        <div className="ms-container" style={{ maxWidth: 460, marginInline: "auto" }}>
          <div style={{ textAlign: "center" }}><GoldDivider align="center">My Account</GoldDivider></div>
          {/* Google sign-in — one tap, no password. Needs the Google provider
              enabled in Supabase (Authentication → Providers → Google). */}
          <button type="button" onClick={() => D.signInWithGoogle()}
            style={{ marginTop: 20, width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px 16px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)", background: "var(--white)", color: "var(--foreground)", fontFamily: "inherit", fontWeight: 600, fontSize: 15, cursor: "pointer", boxShadow: "var(--shadow-sm)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" /><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" /></svg>
            Continue with Google
          </button>
          <div style={{ margin: "18px 0 6px", display: "flex", alignItems: "center", gap: 12, color: "var(--muted-foreground)", fontSize: 12 }}>
            <span style={{ flex: 1, height: 1, background: "var(--border)" }} /> or use email <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "center" }}>
            {[["login", "Sign in"], ["signup", "Create account"]].map(([m, lbl]) => (
              <button key={m} onClick={() => { setMode(m); setMsg(""); }} style={{ padding: "8px 18px", borderRadius: "var(--radius-pill)", border: `1px solid ${mode === m ? "var(--primary)" : "var(--border)"}`, background: mode === m ? "var(--primary)" : "var(--card)", color: mode === m ? "var(--primary-foreground)" : "var(--primary)", fontWeight: 600, cursor: "pointer" }}>{lbl}</button>
            ))}
          </div>
          <form onSubmit={submit} style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-2xl)", padding: 26 }}>
            {mode === "signup" && <Input label="Full name" value={form.name} onChange={set("name")} placeholder="Your name" />}
            {mode === "signup" && <Input label="Phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="10-digit mobile" />}
            <Input label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
            <Input label="Password" type="password" value={form.password} onChange={set("password")} placeholder="At least 6 characters" />
            {msg && <p style={{ fontSize: 13, color: "var(--destructive)" }}>{msg}</p>}
            <Button variant="forest" type="submit" fullWidth>{busy ? "Please wait…" : (mode === "signup" ? "Create account" : "Sign in")}</Button>
          </form>
          <p style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: "var(--muted-foreground)" }}>Your account keeps your order history and lets you track deliveries.</p>
        </div>
      </section>
    );
  }

  const firstName = user.user_metadata && user.user_metadata.full_name ? ", " + user.user_metadata.full_name.split(" ")[0] : "";
  return (
    <section style={{ padding: "72px 0", minHeight: "70vh" }}>
      <div className="ms-container" style={{ maxWidth: 820, marginInline: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
          <div>
            <GoldDivider>My Account</GoldDivider>
            <h1 style={{ marginTop: 12, fontSize: 40, fontWeight: 700 }}>Namaste{firstName}.</h1>
            <p style={{ marginTop: 6, color: "var(--muted-foreground)" }}>{user.email}</p>
          </div>
          <Button variant="outline" onClick={() => { D.signOut(); setUser(null); setOrders(null); }}>Sign out</Button>
        </div>
        {welcome && (
          <div style={{ marginTop: 24, padding: "14px 18px", borderRadius: 16, border: "1px solid color-mix(in oklab, var(--success, #2e7d32) 40%, transparent)", background: "color-mix(in oklab, var(--success, #2e7d32) 10%, var(--card))", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "grid", placeItems: "center", height: 24, width: 24, borderRadius: "var(--radius-pill)", background: "var(--success, #2e7d32)", color: "#fff", fontSize: 15, flexShrink: 0 }}>✓</span>
            <span style={{ fontWeight: 600, color: "var(--primary)" }}>Your account is active — welcome! You're signed in, and your details will be saved for faster checkout.</span>
          </div>
        )}
        <h2 style={{ marginTop: 40, fontSize: 26, color: "var(--primary)" }}>Your orders</h2>
        {orders === null && <p style={{ color: "var(--muted-foreground)" }}>Loading your orders…</p>}
        {orders && orders.length === 0 && (
          <div style={{ marginTop: 16, padding: 28, borderRadius: "var(--radius-2xl)", border: "1px solid var(--border)", background: "var(--card)", textAlign: "center" }}>
            <p style={{ color: "var(--muted-foreground)" }}>No orders yet. Orders you place while signed in appear here with live delivery tracking.</p>
            <div style={{ marginTop: 16 }}><Button variant="forest" as="a" href="../shop/index.html">Start shopping →</Button></div>
          </div>
        )}
        {orders && orders.length > 0 && (
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 16 }}>
            {orders.map((o) => (
              <div key={o.id} style={{ padding: 22, borderRadius: "var(--radius-2xl)", border: "1px solid var(--border)", background: "var(--card)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <p style={{ fontWeight: 700, color: "var(--primary)" }}>Order #{o.order_no}</p>
                    <p style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{new Date(o.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
                  </div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--primary)" }}>₹{Number(o.total).toLocaleString("en-IN")}</p>
                </div>
                <p style={{ marginTop: 8, fontSize: 13.5, color: "var(--muted-foreground)" }}>{(o.items || []).map((i) => `${i.name} ×${i.qty}`).join(", ") || "—"}</p>
                <OrderTracker status={o.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AccountPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", color: "var(--foreground)" }}>
      <Header active="account" />
      <main><Account /></main>
      <Footer />
      <StickyWhatsApp />
      <MobileBar />
    </div>
  );
}

function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", color: "var(--foreground)" }}>
      <Header active="home" />
      <main>
        <Hero />
        <MarqueeStrip />
        <WhyUs />
        <HomeProducts />
        <Featured />
        <Process />
        <FounderTeaser />
        <HomeOrdering />
        <FAQ />
        <Testimonials />
      </main>
      <Footer />
      <StickyWhatsApp />
      <MobileBar />
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", color: "var(--foreground)" }}>
      <Header active="about" />
      <main>
        <About />
        <Journey />
        <Founder />
        <NameMeaning />
        <HomemadePhilosophy />
        <FounderPromise />
      </main>
      <Footer />
      <StickyWhatsApp />
      <MobileBar />
    </div>
  );
}

function ProductsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", color: "var(--foreground)" }}>
      <Header active="products" />
      <main>
        <Products />
        <Featured />
      </main>
      <Footer />
      <StickyWhatsApp />
      <MobileBar />
    </div>
  );
}

function ContactPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", color: "var(--foreground)" }}>
      <Header active="contact" />
      <main>
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
}

/* legacy single-page export kept for compatibility */
function Website() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", color: "var(--foreground)" }}>
      <Header />
      <main>
        <Hero />
        <MarqueeStrip />
        <About />
        <WhyUs />
        <Products />
        <Featured />
        <Testimonials />
        <Founder />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
}

window.MSWebsite = { HomePage, AboutPage, ProductsPage, ContactPage, PolicyPage, AccountPage, Website };
