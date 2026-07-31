/* ============================================================
   Mishthi Sattva — catalogue sync
   ------------------------------------------------------------
   Regenerates ui_kits/shop/data.js from the LIVE Supabase database so the
   shop's instant-load snapshot, the SEO JSON-LD (built from this file) and the
   database never drift apart.

   WHEN TO RUN: after you add / delete / rename / reprice a product in the admin
   panel. The admin panel updates the database instantly, but the bundled
   snapshot in the code only refreshes when you run this.

     npm run sync          # rewrite data.js from the database
     npm run sync -- --build   # rewrite AND rebuild dist/ ready to deploy

   It uses the PUBLIC anon key from js/config.js (read-only) — no secrets, safe
   to run any time. Presentation extras the database doesn't store (star rating,
   review count, tags, badge, long description) are preserved per product from
   the current data.js, so cards keep their look.
   ============================================================ */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";
import { execSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_JS = path.join(ROOT, "ui_kits/shop/data.js");
const CONFIG_JS = path.join(ROOT, "js/config.js");

/* ---- 1. read Supabase URL + public anon key from js/config.js ---- */
function loadConfig() {
  const src = readFileSync(CONFIG_JS, "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  const c = sandbox.window.MS_CONFIG || {};
  if (!c.SUPABASE_URL || !c.SUPABASE_ANON_KEY) {
    throw new Error("Could not read SUPABASE_URL / SUPABASE_ANON_KEY from js/config.js");
  }
  return c;
}

/* ---- 2. load the current data.js (categories + presentation extras) ---- */
function loadCurrent() {
  const src = readFileSync(DATA_JS, "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  const d = sandbox.window.MSShopData || {};
  const bySlug = {};
  (d.MS_PRODUCTS || []).forEach((p) => { bySlug[p.id] = p; });
  return { categories: d.MS_CATEGORIES || [], bySlug };
}

/* ---- 3. fetch the live catalogue ---- */
async function fetchProducts(cfg) {
  const url = cfg.SUPABASE_URL.replace(/\/$/, "") +
    "/rest/v1/products?select=*&order=category.asc,sort_order.asc,name.asc";
  const res = await fetch(url, {
    headers: { apikey: cfg.SUPABASE_ANON_KEY, Authorization: "Bearer " + cfg.SUPABASE_ANON_KEY },
  });
  if (!res.ok) throw new Error("Supabase fetch failed: " + res.status + " " + (await res.text()));
  return res.json();
}

/* ---- 4. build one data.js product entry from a DB row + existing extras ---- */
function toEntry(row, prev) {
  prev = prev || {};
  const num = (v) => (v == null || v === "" ? null : Number(v));
  const price = num(row.price);
  const mrp = num(row.mrp);
  // photo: prefer whatever the DB stores (admin uploads win); else keep the
  // existing asset path so the snapshot still shows an image. Normalise
  // root-relative "/assets/x" the same way the shop does at runtime, so the
  // snapshot photo matches the post-load photo exactly (no image re-render).
  let photo = row.photo || prev.photo || "";
  if (photo.indexOf("/assets/") === 0) photo = "../.." + photo;
  const desc = prev.desc || row.short_desc || "";
  const facts = (prev.facts && prev.facts.length)
    ? prev.facts
    : (Array.isArray(row.benefits) ? row.benefits : []);
  const entry = {
    id: row.slug,
    name: row.name,
    cat: row.category,
    price,
    mrp,
    weight: row.weight || prev.weight || "",
    rating: prev.rating != null ? prev.rating : 4.8,
    reviews: prev.reviews != null ? prev.reviews : 0,
    tags: Array.isArray(prev.tags) ? prev.tags : [],
    photo,
    desc,
    facts,
  };
  if (prev.badge) entry.badge = prev.badge;
  return entry;
}

/* ---- 5. serialise the whole file (keeps the original hand-written style) ---- */
function render(categories, products) {
  const S = (v) => JSON.stringify(v); // safe JS string / array literal
  const cat = categories
    .map((c) => `  { id: ${S(c.id)}, name: ${S(c.name)}, tint: ${c.tint ? S(c.tint) : '""'} },`)
    .join("\n");

  // group products by category, in the category order, for a tidy file
  const order = categories.map((c) => c.id);
  const sorted = [...products].sort((a, b) => {
    const ai = order.indexOf(a.cat), bi = order.indexOf(b.cat);
    if (ai !== bi) return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
    return a.name.localeCompare(b.name);
  });

  let lastCat = null;
  const lines = [];
  for (const p of sorted) {
    if (p.cat !== lastCat) {
      const label = (categories.find((c) => c.id === p.cat) || {}).name || p.cat;
      lines.push(`\n  // ---- ${label} ----`);
      lastCat = p.cat;
    }
    const head = [
      `id: ${S(p.id)}`, `name: ${S(p.name)}`, `cat: ${S(p.cat)}`,
      `price: ${p.price == null ? "null" : p.price}`,
      `mrp: ${p.mrp == null ? "null" : p.mrp}`,
      `weight: ${S(p.weight)}`, `rating: ${p.rating}`, `reviews: ${p.reviews}`,
      `tags: ${S(p.tags)}`,
    ];
    if (p.badge) head.push(`badge: ${S(p.badge)}`);
    head.push(`photo: ${S(p.photo)}`);
    lines.push(`  { ${head.join(", ")},\n    desc: ${S(p.desc)},\n    facts: ${S(p.facts)} },`);
  }

  return `/* Mishthi Sattva — Shop catalogue (instant-load snapshot).
   AUTO-GENERATED from the live Supabase 'products' table by scripts/sync-catalogue.mjs.
   Do not hand-edit product prices here — change them in the admin panel, then run
   \`npm run sync\` to regenerate this file. Presentation extras (rating, reviews,
   tags, badge, long desc) are preserved per product across syncs.
   Exposes window.MSShopData. */

const MS_CATEGORIES = [
${cat}
];

const MS_PRODUCTS = [${lines.join("\n")}
];

window.MSShopData = { MS_CATEGORIES, MS_PRODUCTS };
`;
}

/* ---- main ---- */
(async () => {
  const cfg = loadConfig();
  const { categories, bySlug } = loadCurrent();
  const rows = await fetchProducts(cfg);

  const live = rows.filter((r) => r.in_stock !== false);
  const liveSlugs = new Set(live.map((r) => r.slug));
  const prevSlugs = new Set(Object.keys(bySlug));

  const added = live.filter((r) => !prevSlugs.has(r.slug)).map((r) => r.name);
  const removed = [...prevSlugs].filter((s) => !liveSlugs.has(s)).map((s) => bySlug[s].name);

  const products = live.map((r) => toEntry(r, bySlug[r.slug]));
  const out = render(categories, products);
  writeFileSync(DATA_JS, out);

  console.log(`✅ Synced ui_kits/shop/data.js from the live database.`);
  console.log(`   ${products.length} products in stock.`);
  if (added.length) console.log(`   + Added:   ${added.join(", ")}`);
  if (removed.length) console.log(`   - Removed: ${removed.join(", ")}`);
  if (!added.length && !removed.length) console.log(`   (product list unchanged — prices/weights refreshed)`);

  if (process.argv.includes("--build")) {
    console.log(`\n🏗  Rebuilding dist/ …`);
    execSync("node build.mjs", { cwd: ROOT, stdio: "inherit" });
    console.log(`\n➡  Now deploy:  vercel deploy --prod --yes --scope tara-hut-s-projects`);
  } else {
    console.log(`\n➡  Next:  npm run build   (then deploy)   —   or run:  npm run sync -- --build`);
  }
})().catch((e) => { console.error("❌ Sync failed:", e.message); process.exit(1); });
