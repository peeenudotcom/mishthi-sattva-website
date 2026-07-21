/* Mishthi Sattva — Website UI kit screens.
   Faithful recreation of the landing page, composing design-system components.
   Loaded as text/babel; exposes window.MSWebsite. */

const DS = window.MishthiSattvaDesignSystem_af8a45;
const { Button, Badge, Card, WhatsAppButton, GoldDivider, ProductCard, BenefitTile, FAQItem, Testimonial, Input } = DS;

const ASSET = "../../assets";
const PHONE = "8557942246";
const WA = "918557942246"; // WhatsApp number (with country code)

/* Editable promo badge shown on the hero image. TODO: confirm gift + minimum
   order value with the owner, or set to null to hide the badge entirely. */
const GIFT_BADGE = { title: "Complimentary wellness gift", sub: "on orders this month — ask us for details" };

/* Social profiles. WhatsApp is live; add the Instagram/Facebook profile URLs
   here and those buttons appear automatically in the footer. */
const SOCIAL = [
  { label: "WhatsApp", href: "https://wa.me/918557942246" },
  { label: "Instagram", href: null }, // TODO: add real profile URL
  { label: "Facebook", href: null },  // TODO: add real profile URL
];

/* name -> product photo (from the brand's uploaded catalogue) */
const PRODUCT_IMAGES = {
  "Shakti Laddu": `${ASSET}/shakti-laddu.png`,
  "Sampooran Laddu": `${ASSET}/sampooran-laddu.png`,
  "Sugar-Free Chyawanprash": `${ASSET}/chyawanprash.jpg`,
  "Herbal Heart Sip": `${ASSET}/herbal-heart-sip.png`,
  "Healthy Namkeen Mix": `${ASSET}/namkeen-mix.png`,
  "Ayurvedic Hair Oil": `${ASSET}/ayurvedic-hair-oil.png`,
  "Ayur Kesh Vash Shampoo": `${ASSET}/kesh-vash-shampoo.png`,
  "Ayur Kesh Vardaan Oil": `${ASSET}/kesh-vardaan-oil.png`,
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
  "Energy Sattu": `${ASSET}/energy-sattu.png`,
  "Paani Puri Combo": `${ASSET}/paani-puri-combo-uniform.png`,
  "Mirchi Pickle": `${ASSET}/mirchi-pickle.png`,
  "Mango Pickle": `${ASSET}/mango-pickle.png`,
  "Nimboo Pickle – Sweet & Spicy": `${ASSET}/nimboo-pickle.png`,
  "Glow Radiance Cream": `${ASSET}/glow-radiance-cream-pack.png`,
};

/* ---------- shared data ---------- */
const PRODUCT_CATS = [
  { id: "ayurvedic", name: "Ayurvedic & Health", blurb: "Natural wellness from traditional Ayurvedic ingredients that support immunity, energy and wellbeing.", items: ["Shakti Laddu", "Sampooran Laddu", "Sugar-Free Chyawanprash", "Herbal Heart Sip", "Healthy Namkeen Mix", "Ayurvedic Hair Oil", "Protein Sattu Drink"] },
  { id: "hair", name: "Hair Care", blurb: "Natural hair care designed to nourish scalp health and promote stronger hair.", items: ["Ayur Kesh Vash Shampoo", "Ayur Kesh Vardaan Oil"] },
  { id: "spices", name: "Spices & Masala", blurb: "Authentic homemade spice blends that enhance flavour while keeping purity and freshness.", items: ["Chat Masala", "Shinkaji Masala", "Thandai Premix", "Shahi Garam Masala", "Ice Cream Premix", "Shahi Sip & Scoop", "Jaljeera Sattu", "Energy Sattu"] },
  { id: "beauty", name: "Beauty & Skincare", blurb: "Natural skincare for healthy, glowing skin.", items: ["Instant Ubtan Glow", "Glow Radiance Cream", "Vitamin C Serum"] },
  { id: "special", name: "Special Foods", blurb: "Traditional homemade food products with authentic taste.", items: ["Paani Puri Combo", "Mirchi Pickle", "Mango Pickle", "Nimboo Pickle – Sweet & Spicy"] },
];

const BENEFITS = [
  { label: "Made Without Refined Oil", good: true },
  { label: "No Refined Sugar", good: true },
  { label: "No Artificial Preservatives", good: true },
  { label: "Homemade in Small Batches", good: true },
  { label: "Natural Ingredients", good: true },
  { label: "Hygienically Prepared", good: true },
];

const TESTIMONIALS = [
  { quote: "Pure taste and amazing quality. You can actually feel the difference.", name: "Priya S.", city: "Bathinda" },
  { quote: "The homemade touch makes every product special.", name: "Rajesh K.", city: "Kotkapura" },
  { quote: "Healthy products for the entire family.", name: "Anita M.", city: "Faridkot" },
];

const FAQS = [
  { q: "How do I place an order?", a: "Tap any 'Order on WhatsApp' button and send us your list. We confirm availability, price and delivery on chat." },
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
function Header({ active = "home" }) {
  const nav = [{ label: "Home", href: "index.html", id: "home" }, { label: "Story", href: "about.html", id: "about" }, { label: "Products", href: "products.html", id: "products" }, { label: "Contact", href: "contact.html", id: "contact" }];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, borderBottom: "1px solid color-mix(in oklab, var(--border) 70%, transparent)", background: "color-mix(in oklab, var(--background) 85%, transparent)", backdropFilter: "blur(8px)" }}>
      <div className="ms-container" style={{ display: "flex", height: 88, alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <a href="index.html" style={{ display: "flex", alignItems: "center" }}>
          <img src={`${ASSET}/mishthi-logo-lockup.png`} alt="Mishthi Sattva — Ayurvedic, Satvik, Homemade" style={{ height: 74, width: "auto", objectFit: "contain" }} />
        </a>
        <nav className="ms-nav" style={{ display: "flex", alignItems: "center", gap: 34 }}>
          {nav.map((n) => {
            const on = n.id === active;
            return (
              <a key={n.label} href={n.href} style={{ fontSize: 15, fontWeight: on ? 700 : 600, color: on ? "var(--primary)" : "color-mix(in oklab, var(--foreground) 82%, transparent)", borderBottom: on ? "2px solid var(--accent)" : "2px solid transparent", paddingBottom: 3 }}>{n.label}</a>
            );
          })}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button variant="outline" as="a" href="../shop/index.html">Shop</Button>
          <WhatsAppButton>Order on WhatsApp</WhatsAppButton>
        </div>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section id="top" style={{ position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: -1, background: "radial-gradient(60% 60% at 80% 10%, color-mix(in oklab, var(--gold) 18%, transparent), transparent), radial-gradient(50% 50% at 0% 100%, color-mix(in oklab, var(--forest) 12%, transparent), transparent)" }} />
      <div className="ms-container ms-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1.08fr", gap: 48, alignItems: "center", padding: "72px 20px" }}>
        <div>
          <GoldDivider>Ayurvedic · Satvic · Homemade</GoldDivider>
          <h1 style={{ marginTop: 24, fontSize: "clamp(66px, 9vw, 116px)", fontWeight: 600, lineHeight: 0.94, letterSpacing: "-0.025em", color: "var(--primary)" }}>
            Pure Ingredients.<br />
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Pure Intentions.</span>
          </h1>
          <p style={{ marginTop: 22, maxWidth: 552, fontSize: 18, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
            Homemade Ayurvedic laddoos, wellness blends, traditional spices and handcrafted foods — prepared in small batches in Kiran Bansal's home kitchen in Kotkapura.
          </p>
          <p className="ms-hindi" style={{ marginTop: 12, fontSize: 19, color: "color-mix(in oklab, var(--primary) 90%, transparent)" }}>घर की रसोई से… आपके परिवार की सेहत तक।</p>
          <div style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Button variant="forest" as="a" href="../shop/index.html">Shop Bestsellers →</Button>
            <WhatsAppButton>Order on WhatsApp</WhatsAppButton>
          </div>
          <div style={{ marginTop: 38, display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: "12px 24px", maxWidth: 480 }}>
            {["Homemade", "Sugar-Free", "Preservative Free", "Sattvic"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--primary)" }}>
                <span style={{ color: "var(--accent)" }}><Leaf size={16} /></span> {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: -24, zIndex: -1, borderRadius: 32, background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 20%, transparent), color-mix(in oklab, var(--forest) 10%, transparent))", filter: "blur(40px)" }} />
          <div style={{ overflow: "hidden", borderRadius: 32, aspectRatio: "5 / 6", border: "1px solid var(--border)", boxShadow: "var(--shadow-xl)" }}>
            <img src={`${ASSET}/hero-products.png`} alt="Mishthi Sattva products" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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
        {/* TODO: swap for a real Kiran-in-the-kitchen / preparation photo when available */}
        <div style={{ overflow: "hidden", borderRadius: 28, border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)", aspectRatio: "4 / 5" }}>
          <img src={`${ASSET}/hero-products.png`} alt="Preparing Ayurvedic food by hand in a home kitchen in Kotkapura" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div>
          <GoldDivider>Our Story</GoldDivider>
          <h2 style={{ marginTop: 18, fontSize: 50, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.015em", textWrap: "balance" }}>It began in one home kitchen — with a mother's wish to feed her family better.</h2>
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 18, fontSize: 18, lineHeight: 1.7, color: "color-mix(in oklab, var(--foreground) 85%, transparent)" }}>
            <p>Mishthi Sattva was born in Kiran Bansal's kitchen in Kotkapura — not as a business plan, but as a search for honest everyday food. What began as carefully prepared recipes for family and friends slowly grew into a collection of homemade foods, spices and wellness products for more families to trust.</p>
            <p>Kiran wanted to prepare everyday foods using thoughtfully selected ingredients, familiar recipes and methods she would confidently choose for her own family.</p>
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
          {/* TODO: replace "Price on WhatsApp" with the real ₹ price + jar size once confirmed */}
          <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 16px", fontSize: 13.5, color: "color-mix(in oklab, var(--cream) 80%, transparent)" }}>
            <span>500 g jar</span><span style={{ color: "var(--accent)" }}>◆</span>
            <span>Price on WhatsApp</span><span style={{ color: "var(--accent)" }}>◆</span>
            <span>Home delivery in Kotkapura</span>
          </div>
          <div style={{ marginTop: 26, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <WhatsAppButton message="Hello Mishthi Sattva, I'm interested in Sugar-Free Chyawanprash (500 g). Please share the price and delivery details.">Order Chyawanprash</WhatsAppButton>
            <a href="../shop/index.html" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.875rem 1.5rem", borderRadius: "var(--radius-pill)", border: "1px solid color-mix(in oklab, var(--cream) 45%, transparent)", color: "var(--cream)", fontWeight: 600, fontSize: 15 }}>View in Shop →</a>
          </div>
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
          <p style={{ marginTop: 14, fontSize: 13, fontStyle: "italic", color: "var(--muted-foreground)" }}>Sample reviews shown for layout — to be replaced with real, verified WhatsApp &amp; Google reviews before launch.</p>
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
            <img src={`${ASSET}/founder-kiran.jpg`} alt="Kiran Bansal shaping laddus by hand in her Kotkapura kitchen" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 32%", display: "block" }} />
          </div>
          <div style={{ position: "absolute", bottom: -20, right: -20, borderRadius: 18, border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)", background: "var(--card)", padding: "12px 20px", textAlign: "center", boxShadow: "var(--shadow-lg)" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontStyle: "italic", color: "var(--primary)" }}>Kiran Bansal</p>
            <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.25em", color: "var(--accent)" }}>Founder · Kotkapura</p>
          </div>
        </div>
        <div>
          <GoldDivider>Meet Our Founder</GoldDivider>
          <h2 style={{ marginTop: 20, fontSize: 46, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.015em", textWrap: "balance" }}>Meet Kiran Bansal — the heart and hands behind Mishthi Sattva.</h2>
          <p style={{ marginTop: 22, fontSize: 18, lineHeight: 1.7, color: "color-mix(in oklab, var(--foreground) 85%, transparent)" }}>For Kiran, homemade is not simply a label. It means knowing what goes into every batch, preparing it with care, and serving customers with the same honesty she expects for her own family.</p>
          <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.7, color: "color-mix(in oklab, var(--foreground) 85%, transparent)" }}>She built Mishthi Sattva recipe by recipe — starting with food for her own home, then for friends and neighbours who kept asking for more. Every product still passes through her hands before it reaches yours.</p>
          <p className="ms-hindi" style={{ marginTop: 24, borderLeft: "2px solid var(--accent)", paddingLeft: 20, fontSize: 20, fontStyle: "italic", color: "var(--primary)" }}>"स्वाद ऐसा जो दिल जीत ले, और सेहत ऐसी जिस पर पूरा परिवार भरोसा करे।"</p>
          {/* TODO: confirm this is Kiran's own wording and the exact translation */}
          <p style={{ marginTop: 8, paddingLeft: 20, fontSize: 14, fontStyle: "italic", color: "var(--muted-foreground)" }}>"True taste wins the heart, and true health earns every family's trust."</p>
          <p style={{ marginTop: 12, fontSize: 14, color: "var(--muted-foreground)" }}>— Kiran Bansal, Founder</p>
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
              <WhatsAppButton fullWidth message={waText}>Send via WhatsApp</WhatsAppButton>
            </span>
            {!valid && <p style={{ fontSize: 12, color: "var(--muted-foreground)", textAlign: "center" }}>Add your name and a message — we'll open WhatsApp with it filled in.</p>}
          </div>
        </Card>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  const cats = ["Ayurvedic & Health", "Spices & Masala", "Hair Care", "Beauty & Skincare", "Special Foods"];
  const link = { fontSize: 14, color: "color-mix(in oklab, var(--cream) 80%, transparent)" };
  const heading = { fontFamily: "var(--font-display)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--accent)" };
  return (
    <footer style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
      <div className="ms-container ms-stack" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr", gap: 40, padding: "72px 20px 48px" }}>
        <div>
          <img src={`${ASSET}/mishthi-logo.png`} alt="Mishthi Sattva" style={{ height: 78, width: 78, objectFit: "contain" }} />
          <p style={{ marginTop: 16, maxWidth: 300, fontSize: 14, lineHeight: 1.6, color: "color-mix(in oklab, var(--cream) 78%, transparent)" }}>Pure, hygienic, homemade Ayurvedic foods, spices and wellness — handmade in small batches in Kotkapura, Punjab.</p>
          <p className="ms-hindi" style={{ marginTop: 14, fontSize: 14, color: "color-mix(in oklab, var(--cream) 65%, transparent)" }}>घर की रसोई से… आपके परिवार की सेहत तक।</p>
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
            <li><a href="products.html" style={link}>Products</a></li>
            <li><a href="contact.html" style={link}>Contact</a></li>
          </ul>
        </div>
        <div>
          <p style={heading}>Get in Touch</p>
          <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0 }}>
            <li style={link}>📞 <a href={`tel:+91${PHONE}`} style={{ color: "inherit" }}>+91 {PHONE}</a></li>
            <li style={link}>💬 <a href="https://wa.me/918557942246" style={{ color: "inherit" }}>Order on WhatsApp</a></li>
            {/* registered address per FSSAI certificate 22126010000026 */}
            <li style={link}>📍 9/333, Kot Kapura, Faridkot,<br />Punjab 151204</li>
            <li style={link}>🚚 Home delivery in Kotkapura &amp; nearby</li>
            <li style={link}>🕐 Mon–Sat, 9am–7pm</li>
          </ul>
          {/* Only render links we actually have. Add the real profile URLs to
              SOCIAL below and they'll appear; a dead href="#" is worse than
              no button at all. */}
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            {SOCIAL.filter((s) => s.href).map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                 style={{ borderRadius: "var(--radius-pill)", border: "1px solid color-mix(in oklab, var(--cream) 20%, transparent)", padding: "7px 14px", fontSize: 12, fontWeight: 600 }}>{s.label}</a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid color-mix(in oklab, var(--cream) 12%, transparent)" }}>
        <div className="ms-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, padding: "18px 20px", fontSize: 12, color: "color-mix(in oklab, var(--cream) 60%, transparent)" }}>
          {/* FSSAI registration 22126010000026 — valid to 16-01-2027, renew from ~20-07-2026 */}
          <p>© {new Date().getFullYear()} Mishthi Sattva. All rights reserved. · FSSAI Reg. No. 22126010000026</p>
          <p style={{ display: "flex", gap: 16 }}>
            <a href="privacy.html" style={{ color: "inherit" }}>Privacy</a>
            <a href="terms.html" style={{ color: "inherit" }}>Terms</a>
            <a href="shipping.html" style={{ color: "inherit" }}>Shipping &amp; Returns</a>
          </p>
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
function HomeProductCard({ p }) {
  const [h, setH] = React.useState(false);
  const waMsg = `Hello Mishthi Sattva, I'm interested in ${p.name} (${p.size}). Please share the price and delivery details.`;
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", flexDirection: "column", background: "var(--card)", border: `1px solid ${h ? "var(--accent)" : "var(--border)"}`, borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: h ? "var(--shadow-lg)" : "var(--shadow-sm)", transform: h ? "translateY(-4px)" : "none", transition: "all .2s var(--ease-standard)" }}>
      <div style={{ position: "relative", aspectRatio: "4 / 3", background: "var(--cream)", overflow: "hidden", borderBottom: "1px solid color-mix(in oklab, var(--accent) 20%, transparent)" }}>
        <img src={`${ASSET}/${p.img}`} alt={p.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {p.badge && <span style={{ position: "absolute", top: 12, left: 12, background: "var(--forest-deep)", color: "var(--cream)", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: "var(--radius-pill)" }}>{p.badge}</span>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "20px 20px 22px" }}>
        <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 23, lineHeight: 1.12, color: "var(--primary)" }}>{p.name}</h3>
        <p style={{ margin: "8px 0 0", fontSize: 14.5, lineHeight: 1.5, color: "var(--muted-foreground)" }}>{p.benefit}</p>
        <div style={{ marginTop: 14, display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{p.size}</span>
          <span style={{ color: "var(--accent)" }}>·</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--primary)" }}>{p.price || "Ask for price"}</span>
        </div>
        <div style={{ marginTop: "auto", paddingTop: 18, display: "flex", alignItems: "center", gap: 10 }}>
          <a href="../shop/index.html" style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 14px", borderRadius: "var(--radius-pill)", border: "1px solid var(--primary)", color: "var(--primary)", fontWeight: 600, fontSize: 14 }}>View Details</a>
          <a href={`https://wa.me/${WA}?text=${encodeURIComponent(waMsg)}`} target="_blank" rel="noopener noreferrer" aria-label={`Order ${p.name} on WhatsApp`}
            style={{ flexShrink: 0, display: "grid", placeItems: "center", height: 42, width: 42, borderRadius: "var(--radius-pill)", background: "var(--whatsapp)", color: "#fff" }}>
            <svg viewBox="0 0 32 32" width={20} height={20} fill="currentColor"><path d="M19.11 17.36c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.46-.83-2-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16 4C9.37 4 4 9.37 4 16c0 2.11.55 4.09 1.52 5.81L4 28l6.36-1.49A11.92 11.92 0 0 0 16 28c6.63 0 12-5.37 12-12S22.63 4 16 4z" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function HomeProducts() {
  const picks = [
    { name: "Shakti Laddu", benefit: "Dry fruits, gond & jaggery — no refined sugar.", img: "shakti-laddu.png", size: "250 g", badge: "Bestseller" },
    { name: "Shinkaji Masala", benefit: "A robust homestyle Punjabi blend.", img: "shinkaji-masala-pack.png", size: "100 g" },
    { name: "Herbal Heart Sip", benefit: "A warming daily herbal infusion.", img: "herbal-heart-sip.png", size: "200 g" },
    { name: "Shahi Garam Masala", benefit: "Whole spices, roasted & stone-ground.", img: "shahi-garam-masala.png", size: "100 g", badge: "Bestseller" },
    { name: "Ayurvedic Hair Oil", benefit: "Cold-infused bhringraj & amla.", img: "ayurvedic-hair-oil.png", size: "200 ml" },
    { name: "Instant Ubtan Glow", benefit: "A brightening natural face pack.", img: "ubtan-glow-pack.png", size: "50 g", badge: "New" },
  ];
  return (
    <section id="bestsellers" style={{ background: "var(--white)", padding: "80px 0", scrollMarginTop: 90 }}>
      <div className="ms-container">
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <GoldDivider align="center">Our Bestsellers</GoldDivider>
          <h2 style={{ marginTop: 20, fontSize: 52, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.015em", textWrap: "balance" }}>Made with purpose,<br />chosen for everyday wellness.</h2>
          <p style={{ marginTop: 16, color: "var(--muted-foreground)", fontSize: 17, lineHeight: 1.6 }}>A taste of the range — from laddus and masalas to wellness oils. Message us on WhatsApp for prices and the full catalogue.</p>
        </div>
        <div className="ms-prodgrid" style={{ marginTop: 52, display: "grid", gap: 22, alignItems: "stretch" }}>
          {picks.map((p) => <HomeProductCard key={p.name} p={p} />)}
        </div>
        <div style={{ marginTop: 44, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <Button variant="forest" as="a" href="../shop/index.html">Shop All Products →</Button>
          <WhatsAppButton message="Hello Mishthi Sattva, please share your full product catalogue and prices.">Get the Catalogue</WhatsAppButton>
        </div>
      </div>
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
          <img src={`${ASSET}/founder-kiran.jpg`} alt="Kiran Bansal shaping laddus by hand in her Kotkapura kitchen" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 32%", display: "block" }} />
        </div>
        <div>
          <GoldDivider>From Kiran's Kitchen</GoldDivider>
          <h2 style={{ marginTop: 18, fontSize: 52, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.015em" }}>From my kitchen<br />to your family.</h2>
          <p style={{ marginTop: 22, fontSize: 19, lineHeight: 1.7, fontStyle: "italic", color: "var(--primary)" }}>"I started Mishthi Sattva to prepare the kind of food I wanted for my own family — honest ingredients, careful preparation and no unnecessary shortcuts."</p>
          <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.7, color: "color-mix(in oklab, var(--foreground) 85%, transparent)" }}>Every batch is still made by hand in Kiran's Kotkapura kitchen — no refined oil, no refined sugar, no compromises.</p>
          <p className="ms-hindi" style={{ marginTop: 18, borderLeft: "2px solid var(--accent)", paddingLeft: 18, fontSize: 19, fontStyle: "italic", color: "var(--primary)" }}>"स्वाद ऐसा जो दिल जीत ले, और सेहत ऐसी जिस पर पूरा परिवार भरोसा करे।"</p>
          <div style={{ marginTop: 28 }}><Button variant="outline" as="a" href="about.html">Read Our Story →</Button></div>
        </div>
      </div>
    </section>
  );
}

/* ---------- home: ordering made simple ---------- */
function HomeOrdering() {
  const steps = [
    { n: "1", t: "Choose your product", d: "Browse the shop or this page." },
    { n: "2", t: "Message us on WhatsApp", d: "Order buttons pre-fill your message." },
    { n: "3", t: "Confirm quantity & payment", d: "We confirm price, stock & delivery." },
    { n: "4", t: "Receive home delivery", d: "Delivered fresh to your door." },
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
          <WhatsAppButton message="Hello Mishthi Sattva, I'd like to place an order. Please help me get started.">Start Your Order</WhatsAppButton>
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
        <GoldDivider align="center">Kiran's Promise</GoldDivider>
        <p style={{ marginTop: 24, fontFamily: "var(--font-display)", fontSize: 30, lineHeight: 1.35, fontStyle: "italic", color: "var(--primary)", textWrap: "balance" }}>"We will always tell you what goes into our products, prepare them with personal care, and recommend only what we'd confidently serve in our own home."</p>
        <p style={{ marginTop: 16, fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--accent)" }}>— Kiran Bansal, Founder</p>
        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <Button variant="forest" as="a" href="../shop/index.html">Explore Our Products →</Button>
          <WhatsAppButton message="Namaste Kiran! I read your story on the Mishthi Sattva website and would like to know more.">Talk to Kiran on WhatsApp</WhatsAppButton>
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
  address: "9/333, Kot Kapura, Faridkot, Punjab 151204",
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
      <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{ flex: 2, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, height: 48, borderRadius: "var(--radius-pill)", background: "var(--whatsapp)", color: "#fff", fontWeight: 700, fontSize: 15 }}>💬 Order on WhatsApp</a>
    </div>
  );
}

function StickyWhatsApp() {
  return (
    <a className="ms-fab" href={`https://wa.me/918557942246`} target="_blank" rel="noopener noreferrer" aria-label="Order on WhatsApp"
       style={{ position: "fixed", bottom: 20, right: 20, zIndex: 50, display: "grid", placeItems: "center", height: 56, width: 56, borderRadius: "var(--radius-pill)", background: "var(--whatsapp)", color: "#fff", boxShadow: "var(--shadow-xl)", border: "4px solid color-mix(in oklab, var(--whatsapp) 25%, transparent)" }}>
      <svg viewBox="0 0 32 32" width={28} height={28} fill="currentColor"><path d="M19.11 17.36c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.46-.83-2-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16 4C9.37 4 4 9.37 4 16c0 2.11.55 4.09 1.52 5.81L4 28l6.36-1.49A11.92 11.92 0 0 0 16 28c6.63 0 12-5.37 12-12S22.63 4 16 4z" /></svg>
    </a>
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

window.MSWebsite = { HomePage, AboutPage, ProductsPage, ContactPage, PolicyPage, Website };
