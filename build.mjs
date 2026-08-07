/* Mishthi Sattva — production build.
 *
 * The source pages compile JSX in the browser with @babel/standalone, which is
 * fine for previewing but ships ~4.2 MB of tooling per page load. This build:
 *   1. compiles every .jsx (and inline text/babel block) ahead of time
 *   2. swaps React's development builds for locally-vendored production ones
 *   3. drops the Babel compiler entirely
 * Result: ~138 KB of JS instead of ~4.2 MB, and no third-party CDN at runtime.
 *
 * Output: dist/  (Vercel serves this; see vercel.json for clean URLs)
 */
import { transform } from "esbuild";
import { promises as fs, readFileSync } from "fs";
import path from "path";
import vm from "vm";
import sharp from "sharp";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(ROOT, "dist");

/* ============================ SEO ============================ */
const SITE = "https://www.mishthisattva.com";
const OG_IMAGE = SITE + "/assets/og-image.jpg";

const BIZ = {
  name: "Mishthi Sattva",
  legalName: "Mishthi Sattva (Prop. Kiran Bansal)",
  phone: "+918557942246",
  street: "Valmiki Chowk",
  locality: "Kotkapura",
  region: "Punjab",
  postal: "151204",
  fssai: "22126010000026",
  founder: "Cherry Bansal",
};

/* Per-page meta, keyed by output path. Description ~150 chars, keyword-aware
   but readable; titles lead with the brand's real search terms. */
const SEO = {
  "index.html": {
    path: "/",
    title: "Mishthi Sattva — Homemade Ayurvedic Foods, Spices & Wellness in Kotkapura",
    desc: "Pure, homemade Ayurvedic laddu, spices, wellness blends and skincare — made in small batches in Kotkapura, Punjab. No refined sugar or preservatives. Order on WhatsApp.",
    faq: true, product: true,
  },
  "story.html": {
    path: "/story",
    title: "Our Story — Made in Cherry Bansal's Kitchen | Mishthi Sattva",
    desc: "The story of Mishthi Sattva — homemade Ayurvedic food born in Cherry Bansal's kitchen in Kotkapura, made with honest ingredients and small-batch care.",
  },
  "products.html": {
    path: "/products",
    title: "Products — Homemade Ayurvedic Foods, Spices & Wellness | Mishthi Sattva",
    desc: "Browse Mishthi Sattva's range: Shakti Laddu, sugar-free Chyawanprash, homemade masalas, Ayurvedic hair oil and natural skincare. Home delivery in Kotkapura.",
    product: true,
  },
  "contact.html": {
    path: "/contact",
    title: "Contact & Order on WhatsApp — Mishthi Sattva, Kotkapura",
    desc: "Order Mishthi Sattva's homemade Ayurvedic products on WhatsApp. Home delivery across Kotkapura and nearby areas in Punjab. Call +91 8557942246.",
    faq: true,
  },
  "shop/index.html": {
    path: "/shop",
    title: "Shop Homemade Ayurvedic Products — Mishthi Sattva",
    desc: "Shop Mishthi Sattva's homemade Ayurvedic foods, spices and wellness products online. Small-batch, preservative-free. Checkout on WhatsApp with home delivery.",
    product: true,
  },
  "privacy.html": { path: "/privacy", title: "Privacy Policy — Mishthi Sattva", desc: "How Mishthi Sattva collects and uses your details when you order or enquire.", noindexSoft: true },
  "terms.html": { path: "/terms", title: "Terms & Conditions — Mishthi Sattva", desc: "Terms for ordering Mishthi Sattva's homemade food, spice and personal-care products.", noindexSoft: true },
  "shipping.html": { path: "/shipping", title: "Shipping & Returns — Mishthi Sattva", desc: "Delivery areas, timing and returns for Mishthi Sattva orders in Kotkapura and across India.", noindexSoft: true },
  "account.html": { path: "/account", title: "My Account — Mishthi Sattva", desc: "Sign in to Mishthi Sattva to see your order history and track deliveries.", noindex: true },
  "admin/index.html": { path: "/admin", noindex: true },
};

function loadCatalogue() {
  const code = readFileSync(path.join(ROOT, "ui_kits/shop/data.js"), "utf8");
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return ctx.window.MSShopData.MS_PRODUCTS;
}

const CAT_NAME = { ayurvedic: "Ayurvedic & Health", spices: "Spices & Masala", hair: "Hair Care", beauty: "Beauty & Skincare", special: "Special Foods" };

function ld(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": SITE + "/#business",
    name: BIZ.name,
    legalName: BIZ.legalName,
    image: OG_IMAGE,
    url: SITE + "/",
    telephone: BIZ.phone,
    priceRange: "₹₹",
    founder: { "@type": "Person", name: BIZ.founder },
    address: {
      "@type": "PostalAddress",
      streetAddress: BIZ.street,
      addressLocality: BIZ.locality,
      addressRegion: BIZ.region,
      postalCode: BIZ.postal,
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: "Kotkapura" },
      { "@type": "AdministrativeArea", name: "Faridkot" },
      { "@type": "State", name: "Punjab" },
    ],
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00", closes: "19:00",
    }],
    identifier: { "@type": "PropertyValue", name: "FSSAI Registration", value: BIZ.fssai },
  };
}

function productsLd(catalogue) {
  const items = catalogue.map((p, i) => {
    const img = SITE + (p.photo || "").replace("../../", "/");
    const prod = {
      "@type": "Product",
      name: p.name,
      description: p.desc,
      image: img,
      category: CAT_NAME[p.cat] || p.cat,
      brand: { "@type": "Brand", name: BIZ.name },
    };
    // Only advertise a price where one is confirmed; "Ask for price" items omit offers.
    if (p.price != null) {
      prod.offers = {
        "@type": "Offer",
        price: String(p.price),
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: SITE + "/shop",
        seller: { "@id": SITE + "/#business" },
      };
    }
    return { "@type": "ListItem", position: i + 1, item: prod };
  });
  return { "@context": "https://schema.org", "@type": "ItemList", itemListElement: items };
}

/* Mirrors the FAQ shown on the site. */
const FAQ = [
  ["How do I place an order?", "Tap any 'Order on WhatsApp' button and send us your list. We confirm availability, price and delivery on chat."],
  ["Do you offer home delivery?", "Yes. Home delivery is available across Kotkapura and nearby areas; other cities ship via trusted couriers."],
  ["Are your products really preservative-free?", "Yes — prepared fresh in our home kitchen with no refined oil, refined sugar or artificial preservatives."],
  ["What is the shelf life?", "Typically 1–6 months when stored as instructed. Exact dates are printed on each pack."],
];
function faqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

function headMeta(seo) {
  const url = SITE + seo.path;
  const robots = seo.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const lines = [
    `<meta name="description" content="${esc(seo.desc || "")}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="theme-color" content="#114B35" />`,
    `<link rel="icon" type="image/png" href="/assets/favicon-green-v2.png" />`,
    `<link rel="apple-touch-icon" href="/assets/favicon-green-v2.png" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Mishthi Sattva" />`,
    `<meta property="og:title" content="${esc(seo.title || "")}" />`,
    `<meta property="og:description" content="${esc(seo.desc || "")}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title || "")}" />`,
    `<meta name="twitter:description" content="${esc(seo.desc || "")}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ];
  return lines.join("\n");
}

const STATIC = ["assets", "tokens", "js", "vendor", "styles.css", "_ds_bundle.js"];

/* Pages are emitted at their real public paths rather than being rewritten
   there by vercel.json. Serving /ui_kits/website/index.html at "/" broke every
   relative reference on the page (e.g. <script src="Sections.js"> resolved to
   /Sections.js), so React received an undefined component and nothing rendered.
   Building to the final path keeps links and scripts resolving naturally. */
const PAGES = [
  { src: "ui_kits/website/index.html",    out: "index.html" },
  { src: "ui_kits/website/about.html",    out: "story.html" },
  { src: "ui_kits/website/products.html", out: "products.html" },
  { src: "ui_kits/website/contact.html",  out: "contact.html" },
  { src: "ui_kits/website/account.html",  out: "account.html" },
  { src: "ui_kits/website/privacy.html",  out: "privacy.html" },
  { src: "ui_kits/website/terms.html",    out: "terms.html" },
  { src: "ui_kits/website/shipping.html", out: "shipping.html" },
  { src: "ui_kits/shop/index.html",       out: "shop/index.html" },
  { src: "admin/index.html",              out: "admin/index.html" },
];

/* Source-relative link -> public URL. */
const LINK_MAP = [
  [/(["'])\.\.\/website\/index\.html\1/g, '$1/$1'],
  [/(["'])\.\.\/website\/about\.html\1/g, '$1/story$1'],
  [/(["'])\.\.\/website\/products\.html\1/g, '$1/products$1'],
  [/(["'])\.\.\/website\/contact\.html\1/g, '$1/contact$1'],
  [/(["'])\.\.\/website\/account\.html\1/g, '$1/account$1'],
  [/(["'])\.\.\/website\/privacy\.html\1/g, '$1/privacy$1'],
  [/(["'])\.\.\/website\/terms\.html\1/g, '$1/terms$1'],
  [/(["'])\.\.\/website\/shipping\.html\1/g, '$1/shipping$1'],
  // admin "View site" link (raw dev path → site root in production)
  [/(["'])\.\.\/ui_kits\/website\/index\.html\1/g, '$1/$1'],
  // broad (no quote anchor) so it also catches the template-literal deep-link
  // `../shop/index.html?p=${id}` used by the home "View Details" buttons
  [/\.\.\/shop\/index\.html/g, "/shop"],
  [/(["'])index\.html\1/g, '$1/$1'],
  [/(["'])about\.html\1/g, '$1/story$1'],
  [/(["'])products\.html\1/g, '$1/products$1'],
  [/(["\'])contact\.html\1/g, '$1/contact$1'],
  [/(["\'])account\.html\1/g, '$1/account$1'],
  [/(["'])privacy\.html\1/g, '$1/privacy$1'],
  [/(["'])terms\.html\1/g, '$1/terms$1'],
  [/(["'])shipping\.html\1/g, '$1/shipping$1'],
];

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

/* Photos ship at up to 1254px but are displayed at ~300px in cards and ~600px
   in heroes, so the originals are far larger than needed — ~89 MB in total.
   Resize and recompress into dist, keeping the SAME filenames and formats:
   image paths are also stored in the database, so renaming (e.g. to .webp)
   would break those references. Originals stay untouched in the repo. */
const MAX_EDGE = 900;

async function optimiseImages(dir) {
  let before = 0, after = 0, count = 0;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await optimiseImages(p);
      before += sub.before; after += sub.after; count += sub.count;
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

    const orig = (await fs.stat(p)).size;
    try {
      const img = sharp(p, { failOn: "none" });
      const meta = await img.metadata();
      let pipe = img;
      if (Math.max(meta.width || 0, meta.height || 0) > MAX_EDGE) {
        pipe = pipe.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true });
      }
      pipe = ext === ".png"
        ? pipe.png({ compressionLevel: 9, palette: true, quality: 82 })
        : pipe.jpeg({ quality: 82, mozjpeg: true });

      const buf = await pipe.toBuffer();
      // only keep the optimised version if it actually helps
      if (buf.length < orig) await fs.writeFile(p, buf);
      after += Math.min(buf.length, orig);
      before += orig;
      count++;
    } catch (e) {
      console.warn("    skip", entry.name, e.message);
      before += orig; after += orig;
    }
  }
  return { before, after, count };
}

/** Compile a .jsx file to plain JS, emitted under /app/ with an absolute URL. */
async function compileJsx(srcDir, file) {
  const code = await fs.readFile(path.join(ROOT, srcDir, file), "utf8");
  const out = await transform(code, { loader: "jsx", format: "iife", target: "es2018" });
  /* Nav links are rendered by React, so they live in these compiled bundles
     rather than in the HTML — the page-level link rewriting never sees them.
     Apply the same map here, which lets the source keep relative paths (so the
     local dev server still works) while the build emits clean public URLs. */
  let js = out.code;
  for (const [re, to] of LINK_MAP) js = js.replace(re, to);
  const name = file.replace(/\.jsx$/, ".js");
  const dest = path.join(OUT, "app", name);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, js);
  return "/app/" + name;
}

/** Rewrite a page: production React, no Babel, precompiled scripts, absolute URLs. */
async function buildPage({ src, out }) {
  let html = await fs.readFile(path.join(ROOT, src), "utf8");
  const srcDir = path.dirname(src);

  // 1. React dev (CDN) -> vendored production, referenced absolutely
  html = html.replace(
    /<script src="https:\/\/unpkg\.com\/react@[^"]+"[^>]*><\/script>/,
    `<script src="/vendor/react.production.min.js"></script>`
  );
  html = html.replace(
    /<script src="https:\/\/unpkg\.com\/react-dom@[^"]+"[^>]*><\/script>/,
    `<script src="/vendor/react-dom.production.min.js"></script>`
  );

  // 2. Babel is compile-time now — remove the runtime compiler entirely
  html = html.replace(/\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone@[^"]+"[^>]*><\/script>/, "");

  // 3. External JSX -> precompiled JS at an absolute /app/ URL
  const jsxRefs = [...html.matchAll(/<script type="text\/babel" src="([^"]+)"><\/script>/g)];
  for (const [full, ref] of jsxRefs) {
    const url = await compileJsx(srcDir, ref);
    html = html.replace(full, `<script src="${url}"></script>`);
  }

  // 4. Plain relative scripts that live beside the page (e.g. shop data.js)
  html = html.replace(/<script src="(?!\/|https?:|\.\.\/)([^"]+\.js)"><\/script>/g, (m, f) => {
    return `<script src="/app/${f}"></script>`;
  });

  // 5. Inline text/babel blocks -> compiled inline scripts
  const inline = [...html.matchAll(/<script type="text\/babel">([\s\S]*?)<\/script>/g)];
  for (const [full, body] of inline) {
    const c = await transform(body, { loader: "jsx", target: "es2018" });
    html = html.replace(full, `<script>${c.code.trim()}</script>`);
  }

  // 6. ../../foo -> /foo, and ../foo -> /foo (pages now sit at the root)
  html = html.replace(/(["'])\.\.\/\.\.\//g, "$1/").replace(/(["'])\.\.\//g, "$1/");

  // 7. Internal page links -> clean public URLs
  for (const [re, to] of LINK_MAP) html = html.replace(re, to);

  // 8. SEO: real <title>, meta, Open Graph, and JSON-LD structured data.
  //    Baked into the static HTML so crawlers get it without running React.
  const seo = SEO[out];
  if (seo) {
    if (seo.title) html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${seo.title}</title>`);
    const schemas = [];
    if (!seo.noindex) {
      schemas.push(ld(localBusinessLd()));
      if (seo.faq) schemas.push(ld(faqLd()));
      if (seo.product) schemas.push(ld(productsLd(CATALOGUE)));
    }
    const inject = "\n" + headMeta(seo) + "\n" + schemas.join("\n") + "\n";
    html = html.replace("</head>", inject + "</head>");
  }

  const dest = path.join(OUT, out);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, html);
}

/* 1200×630 social share image: the hero photo, darkened, with a brand plate. */
async function makeOgImage() {
  const src = path.join(ROOT, "assets", "hero-products.png");
  if (!(await fs.stat(src).catch(() => null))) return false;
  const W = 1200, H = 630;
  const overlay = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
       <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0%" stop-color="rgba(11,51,37,0)"/>
         <stop offset="60%" stop-color="rgba(11,51,37,0.15)"/>
         <stop offset="100%" stop-color="rgba(11,51,37,0.88)"/>
       </linearGradient></defs>
       <rect width="${W}" height="${H}" fill="url(#g)"/>
       <text x="70" y="500" font-family="Georgia, serif" font-size="72" font-weight="700" fill="#F8F5EE">Mishthi Sattva</text>
       <text x="72" y="548" font-family="Arial, sans-serif" font-size="26" letter-spacing="6" fill="#C9A24D">AYURVEDIC · SATVIC · HOMEMADE</text>
       <text x="72" y="590" font-family="Arial, sans-serif" font-size="24" fill="#E3CD93">Homemade Ayurvedic foods &amp; wellness · Kotkapura, Punjab</text>
     </svg>`
  );
  const buf = await sharp(src)
    .resize(W, H, { fit: "cover", position: "attention" })
    .composite([{ input: overlay }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();
  await fs.writeFile(path.join(OUT, "assets", "og-image.jpg"), buf);
  return true;
}

async function writeSitemapAndRobots() {
  const pages = Object.values(SEO).filter((s) => !s.noindex).map((s) => s.path);
  const today = "2026-07-21";
  const urls = pages.map((p) =>
    `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${p === "/" ? "1.0" : "0.7"}</priority></url>`
  ).join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await fs.writeFile(path.join(OUT, "sitemap.xml"), sitemap);

  const robots = `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${SITE}/sitemap.xml\n`;
  await fs.writeFile(path.join(OUT, "robots.txt"), robots);
}

/** Copy any plain .js that sits beside a page (shop's data.js) into /app/. */
async function copySiblingScripts() {
  const extras = [["ui_kits/shop", "data.js"]];
  for (const [dir, file] of extras) {
    const s = path.join(ROOT, dir, file);
    if (!(await fs.stat(s).catch(() => null))) continue;
    await fs.mkdir(path.join(OUT, "app"), { recursive: true });
    await fs.copyFile(s, path.join(OUT, "app", file));
  }
}

let CATALOGUE = [];

async function main() {
  CATALOGUE = loadCatalogue();
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(OUT, { recursive: true });

  for (const item of STATIC) {
    const src = path.join(ROOT, item);
    const dest = path.join(OUT, item);
    const st = await fs.stat(src).catch(() => null);
    if (!st) { console.warn("  skip (missing):", item); continue; }
    if (st.isDirectory()) await copyDir(src, dest);
    else await fs.copyFile(src, dest);
    console.log("  copied", item);
  }

  await copySiblingScripts();
  for (const page of PAGES) {
    await buildPage(page);
    console.log("  built ", page.out);
  }

  process.stdout.write("\n  optimising images… ");
  const img = await optimiseImages(path.join(OUT, "assets"));
  const mb = (n) => (n / 1024 / 1024).toFixed(1);
  console.log(
    `${img.count} files: ${mb(img.before)} MB → ${mb(img.after)} MB ` +
    `(${Math.round((1 - img.after / img.before) * 100)}% smaller)`
  );

  // OG image is generated AFTER optimiseImages so it isn't shrunk below 1200px.
  const og = await makeOgImage();
  console.log("  og-image:", og ? "created (1200×630)" : "skipped (no hero)");
  await writeSitemapAndRobots();
  console.log("  sitemap.xml + robots.txt written");

  console.log("\nBuild complete → dist/");
}

main().catch((e) => { console.error(e); process.exit(1); });
