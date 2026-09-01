/* Mishthi Sattva — admin panel.
   Sign in with the Supabase user created in Authentication → Users. That login
   is what the "to authenticated" RLS policies check, so nothing here works with
   the public anon key alone. Exposes window.MSAdminApp. */

const D = window.MSData;
const money = (n) => (n == null || isNaN(n) ? "—" : "₹" + Number(n).toLocaleString("en-IN"));
const when = (s) => (s ? new Date(s).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—");

/* ---------------- sign-in ---------------- */
function SignIn({ onDone }) {
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");

  const submit = (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    D.signIn(email.trim(), pw)
      .then(onDone)
      .catch((ex) => setErr(ex.message))
      .then(() => setBusy(false));
  };

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", padding: 20 }}>
      <form className="card" onSubmit={submit} style={{ width: "min(400px, 100%)" }}>
        <img src="../assets/mishthi-logo-tag.png" alt="Mishthi Sattva" style={{ height: 60, width: "auto", objectFit: "contain", borderRadius: 10 }} />
        <h1 style={{ margin: "14px 0 4px", fontSize: 26, color: "var(--primary)" }}>Admin sign in</h1>
        <p className="muted" style={{ margin: "0 0 20px" }}>Manage products, orders and enquiries.</p>
        <label className="muted" style={{ display: "block", marginBottom: 6 }}>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
        <label className="muted" style={{ display: "block", margin: "14px 0 6px" }}>Password</label>
        <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} required autoComplete="current-password" />
        {err && <p style={{ marginTop: 14, fontSize: 13, color: "var(--destructive)" }}>{err}</p>}
        <button className="btn" style={{ width: "100%", marginTop: 20 }} disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <p className="muted" style={{ marginTop: 16, fontSize: 12 }}>
          No account? Create one in Supabase → Authentication → Users.
        </p>
      </form>
    </div>
  );
}

/* ---------------- products ---------------- */
/* Fallback used only until the DB `categories` table has been created/loaded.
   The live list comes from D.adminCategories() and is threaded down as `cats`. */
const DEFAULT_CATS = [
  { slug: "sweetness", name: "Wellness with Sweetness" },
  { slug: "sip", name: "Sattvic Sip" },
  { slug: "immunity", name: "Immunity Booster" },
  { slug: "bodycare", name: "Sattvic Body Care" },
];
const catNameOf = (cats, v) => { const c = (cats || []).find((x) => x.slug === v); return c ? c.name : v; };
const slugify = (s) => (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const lbl = { display: "grid", gap: 5, fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" };

/* ---- add a brand-new product (with photo upload) ---- */
function NewProduct({ onAdded, cats }) {
  const [open, setOpen] = React.useState(false);
  const firstCat = (cats && cats[0] && cats[0].slug) || "immunity";
  const empty = { name: "", category: firstCat, price: "", mrp: "", weight: "", short_desc: "" };
  const [f, setF] = React.useState(empty);
  const [file, setFile] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const set = (k) => (e) => setF((o) => ({ ...o, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim()) { setMsg("Please enter a product name."); return; }
    setBusy(true); setMsg("");
    const slug = slugify(f.name);
    const create = (photo) => D.createProduct({
      name: f.name.trim(), slug: slug, category: f.category,
      price: f.price === "" ? null : Number(f.price),
      mrp: f.mrp === "" ? null : Number(f.mrp),
      weight: f.weight.trim() || null, short_desc: f.short_desc.trim() || null,
      photo: photo || null, in_stock: true,
    });
    (file ? D.uploadProductImage(file, slug) : Promise.resolve(null))
      .then(create)
      .then((row) => { setBusy(false); setOpen(false); setF(empty); setFile(null); if (onAdded) onAdded(row); })
      .catch((ex) => { setBusy(false); setMsg(ex.message); });
  };

  if (!open) return <button className="btn" style={{ marginBottom: 16 }} onClick={() => setOpen(true)}>+ Add product</button>;

  return (
    <form onSubmit={submit} className="card" style={{ marginBottom: 18, display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <b style={{ color: "var(--primary)", fontSize: 16 }}>New product</b>
        <button type="button" className="btn ghost" onClick={() => { setOpen(false); setMsg(""); }}>Cancel</button>
      </div>
      <label style={lbl}>Product name<input value={f.name} onChange={set("name")} placeholder="e.g. Nitya Poshan Formula" /></label>
      <label style={lbl}>Category<select value={f.category} onChange={set("category")}>{(cats || []).map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <label style={lbl}>Price ₹<input type="number" value={f.price} onChange={set("price")} placeholder="blank = Ask" /></label>
        <label style={lbl}>MRP ₹<input type="number" value={f.mrp} onChange={set("mrp")} placeholder="optional" /></label>
        <label style={lbl}>Weight<input value={f.weight} onChange={set("weight")} placeholder="500 g" /></label>
      </div>
      <label style={lbl}>Short description<textarea value={f.short_desc} onChange={set("short_desc")} rows={2} placeholder="A line or two shown on the product." /></label>
      <label style={lbl}>Photo<input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] || null)} /></label>
      <p className="muted" style={{ margin: 0, fontSize: 11 }}>Tip: upload a square-ish image around 800×800px for best results.</p>
      {msg && <p style={{ color: "var(--destructive)", fontSize: 13, margin: 0 }}>{msg}</p>}
      <button className="btn" type="submit" disabled={busy}>{busy ? "Saving…" : "Add product"}</button>
    </form>
  );
}

/* Weight-variant editor (opened per product from the "Sizes" button).
   Saving also syncs the product's single price/weight to the first (default)
   size, so the table + sorting stay sensible. Empty ⇒ single-size product. */
function VariantsEditor({ product, onClose, onSaved }) {
  const init = Array.isArray(product.variants) && product.variants.length
    ? product.variants.map((v) => ({ weight: v.weight || "", price: v.price == null ? "" : v.price, mrp: v.mrp == null ? "" : v.mrp }))
    : [];
  const [rows, setRows] = React.useState(init);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");
  const addRow = () => setRows((r) => [...r, { weight: "", price: "", mrp: "" }]);
  const upd = (i, k, v) => setRows((r) => r.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  const del = (i) => setRows((r) => r.filter((_, j) => j !== i));

  const save = () => {
    const clean = rows.filter((x) => String(x.weight).trim()).map((x) => ({
      weight: String(x.weight).trim(),
      price: x.price === "" || x.price == null ? null : Number(x.price),
      mrp: x.mrp === "" || x.mrp == null ? null : Number(x.mrp),
    }));
    setBusy(true); setErr("");
    const patch = { variants: clean };
    if (clean.length) { patch.price = clean[0].price; patch.mrp = clean[0].mrp; patch.weight = clean[0].weight; }
    D.updateProductFields(product.id, patch)
      .then(() => { setBusy(false); onSaved(product.id, patch); onClose(); })
      .catch((e) => { setBusy(false); setErr(e.message); });
  };

  const cell = { padding: "8px 10px" };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "color-mix(in oklab, #10231c 55%, transparent)", display: "grid", placeItems: "center", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="card" style={{ width: "min(580px, 96vw)", maxHeight: "90vh", overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <b style={{ color: "var(--primary)", fontSize: 17 }}>Sizes — {product.name}</b>
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>
        <p className="muted" style={{ fontSize: 12, marginTop: 8 }}>
          Add each weight this product is sold in, with its own price. The <b>first</b> size is the default shown on the shop card.
          Leave empty to sell it as a single size (uses the Price/Weight from the table).
        </p>
        <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr auto", gap: 8, fontSize: 11, fontWeight: 700, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: ".05em" }}>
            <span style={cell}>Weight</span><span style={cell}>Price ₹</span><span style={cell}>MRP ₹</span><span></span>
          </div>
          {rows.length === 0 && <p className="muted" style={{ fontSize: 13, margin: 0 }}>No sizes yet — this product uses its single price. Click “+ Add size”.</p>}
          {rows.map((x, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr auto", gap: 8, alignItems: "center" }}>
              <input value={x.weight} placeholder="250 g" onChange={(e) => upd(i, "weight", e.target.value)} />
              <input type="number" value={x.price} placeholder="450" onChange={(e) => upd(i, "price", e.target.value)} />
              <input type="number" value={x.mrp} placeholder="600" onChange={(e) => upd(i, "mrp", e.target.value)} />
              <button className="btn ghost" style={{ padding: "6px 10px" }} onClick={() => del(i)} title="Remove size">✕</button>
            </div>
          ))}
          <div><button className="btn ghost" onClick={addRow}>+ Add size</button></div>
        </div>
        {err && <p style={{ color: "var(--destructive)", fontSize: 13 }}>{err}</p>}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={save} disabled={busy}>{busy ? "Saving…" : "Save sizes"}</button>
        </div>
      </div>
    </div>
  );
}

function Products({ cats }) {
  const [rows, setRows] = React.useState(null);
  const [saving, setSaving] = React.useState({});
  const [saved, setSaved] = React.useState({});
  const [drafts, setDrafts] = React.useState({});
  const [err, setErr] = React.useState("");
  const [editingSizes, setEditingSizes] = React.useState(null); // product row whose sizes are open

  const load = () => D.adminProducts().then((r) => { setRows(r); setDrafts({}); }).catch((e) => setErr(e.message));
  React.useEffect(() => { load(); }, []);

  const edit = (id, field, val) => setDrafts((d) => ({ ...d, [id]: { ...d[id], [field]: val } }));
  const cur = (row, field) => (drafts[row.id] && field in drafts[row.id]) ? drafts[row.id][field] : row[field];
  const dirty = (id) => drafts[id] && Object.keys(drafts[id]).length > 0;

  const save = (row) => {
    const d = drafts[row.id]; if (!d) return;
    const patch = {};
    Object.keys(d).forEach((f) => {
      let v = d[f];
      if (f === "in_stock" || f === "featured") v = !!v;
      else if (f === "price" || f === "mrp") v = (v === "" || v == null) ? null : Number(v);
      else v = String(v).trim() === "" ? (f === "name" ? row.name : null) : String(v).trim();
      patch[f] = v;
    });
    setSaving((s) => ({ ...s, [row.id]: true })); setErr("");
    D.updateProductFields(row.id, patch)
      .then(() => {
        setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, ...patch } : r)));
        setDrafts((dd) => { const n = { ...dd }; delete n[row.id]; return n; });
        setSaved((m) => ({ ...m, [row.id]: 1 }));
        setTimeout(() => setSaved((m) => { const n = { ...m }; delete n[row.id]; return n; }), 2500);
      })
      .catch((e) => setErr(e.message))
      .then(() => setSaving((s) => ({ ...s, [row.id]: false })));
  };

  const changePhoto = (row, file) => {
    if (!file) return;
    setSaving((s) => ({ ...s, [row.id]: true })); setErr("");
    D.uploadProductImage(file, row.slug || slugify(row.name))
      .then((url) => D.updateProductFields(row.id, { photo: url }).then(() => url))
      .then((url) => { setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, photo: url } : r))); })
      .catch((e) => setErr(e.message))
      .then(() => setSaving((s) => ({ ...s, [row.id]: false })));
  };

  const remove = (row) => {
    if (!window.confirm("Delete “" + row.name + "”? This can't be undone.")) return;
    setSaving((s) => ({ ...s, [row.id]: true }));
    D.deleteProduct(row.id)
      .then(() => setRows((rs) => rs.filter((r) => r.id !== row.id)))
      .catch((e) => setErr(e.message))
      .then(() => setSaving((s) => ({ ...s, [row.id]: false })));
  };

  if (err) return (
    <p style={{ color: "var(--destructive)" }}>
      {err}{" "}
      <button className="btn ghost" onClick={() => { setErr(""); load(); }}>Retry</button>{" "}
      <button className="btn ghost" onClick={() => { D.signOut(); window.location.reload(); }}>Sign in again</button>
    </p>
  );
  if (!rows) return <p className="muted">Loading products…</p>;

  const noPrice = rows.filter((r) => r.price == null).length;

  return (
    <div>
      <NewProduct cats={cats} onAdded={(p) => setRows((rs) => [...rs, p])} />
      <p className="muted" style={{ marginBottom: 14 }}>
        {rows.length} products · {noPrice} without a price. Edit any field, then click <b>Save</b> on that row.
        <br />Use the <b>category</b> dropdown under each product name to move it into another category. Add or rename categories in the <b>Categories</b> tab.
        <br />Tick <b>Featured</b> to show a product in the home-page <b>Bestsellers</b> row (up to 6). Leave all unticked to show the default set.
        <br /><b>Label</b> sets the little badge on the product card (Bestseller / New / Special Offer / Limited) — or “none” for no badge.
      </p>
      <div style={{ overflowX: "auto" }} className="card">
        <table>
          <thead><tr>
            <th>Product</th><th>Price ₹</th><th>MRP ₹</th><th>Weight</th><th>In stock</th><th>Featured</th><th>Label</th><th></th>
          </tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={dirty(r.id) ? { background: "color-mix(in oklab, var(--accent) 8%, transparent)" } : null}>
                <td>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ display: "grid", gap: 3, justifyItems: "center", flexShrink: 0 }}>
                      <span style={{ width: 48, height: 48, borderRadius: 8, overflow: "hidden", background: "var(--secondary)", display: "grid", placeItems: "center" }}>
                        {r.photo ? <img src={r.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span className="muted" style={{ fontSize: 10 }}>no img</span>}
                      </span>
                      <label className="btn ghost" style={{ padding: "2px 8px", fontSize: 10, cursor: "pointer" }}>
                        Change<input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => changePhoto(r, e.target.files[0])} />
                      </label>
                    </div>
                    <div style={{ display: "grid", gap: 5, minWidth: 240 }}>
                      <input type="text" value={cur(r, "name") || ""} onChange={(e) => edit(r.id, "name", e.target.value)}
                        style={{ fontWeight: 700, color: "var(--primary)", width: "100%" }} />
                      <select title="Category (move this product to another category)" value={cur(r, "category") || ""} onChange={(e) => edit(r.id, "category", e.target.value)}
                        style={{ fontFamily: "inherit", fontSize: 12, padding: "3px 6px", maxWidth: "100%" }}>
                        {(cats || []).map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                        {cats && !cats.some((c) => c.slug === (cur(r, "category") || "")) && <option value={cur(r, "category") || ""}>{catNameOf(cats, cur(r, "category"))} (unlisted)</option>}
                      </select>
                      <textarea value={cur(r, "short_desc") || ""} onChange={(e) => edit(r.id, "short_desc", e.target.value)} rows={2}
                        placeholder="Short description shown on the product…" style={{ width: "100%", fontSize: 12, resize: "vertical" }} />
                    </div>
                  </div>
                </td>
                <td><input className="num" type="number" value={cur(r, "price") == null ? "" : cur(r, "price")}
                      placeholder="Ask" onChange={(e) => edit(r.id, "price", e.target.value)} /></td>
                <td><input className="num" type="number" value={cur(r, "mrp") == null ? "" : cur(r, "mrp")}
                      placeholder="—" onChange={(e) => edit(r.id, "mrp", e.target.value)} /></td>
                <td>
                  <input className="num" type="text" value={cur(r, "weight") || ""}
                    placeholder="500 g" onChange={(e) => edit(r.id, "weight", e.target.value)} />
                  <div style={{ marginTop: 6 }}>
                    <button className="btn ghost" style={{ padding: "3px 9px", fontSize: 11 }} onClick={() => setEditingSizes(r)}
                      title="Sell this product in multiple weights, each with its own price">
                      {r.variants && r.variants.length ? `Sizes (${r.variants.length})` : "+ Sizes"}
                    </button>
                  </div>
                </td>
                <td>
                  <input type="checkbox" style={{ width: 18, height: 18 }} checked={cur(r, "in_stock") !== false}
                    onChange={(e) => edit(r.id, "in_stock", e.target.checked)} />
                </td>
                <td>
                  <input type="checkbox" title="Show in the home-page Bestsellers row" style={{ width: 18, height: 18 }} checked={cur(r, "featured") === true}
                    onChange={(e) => edit(r.id, "featured", e.target.checked)} />
                </td>
                <td>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
                    <select title="Badge shown on the product card" value={cur(r, "badge") || ""} onChange={(e) => edit(r.id, "badge", e.target.value)}
                      style={{ fontFamily: "inherit", fontSize: 13, padding: "5px 6px" }}>
                      <option value="">— none —</option>
                      <option value="Bestseller">Bestseller</option>
                      <option value="New">New</option>
                      <option value="Special Offer">Special Offer</option>
                      <option value="Limited">Limited</option>
                      <option value="Festive Special">Festive Special</option>
                      <option value="Combo Offer">Combo Offer</option>
                    </select>
                    {cur(r, "badge") && (() => { const b = window.msBadgeStyle(cur(r, "badge")); return (
                      <span title="How this badge looks on the shop" style={{ background: b.bg, color: b.fg, fontSize: 11, fontWeight: 700, letterSpacing: "0.02em", padding: "3px 9px", borderRadius: 999 }}>{cur(r, "badge")}</span>
                    ); })()}
                  </div>
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <button className="btn" style={{ padding: "6px 14px", fontSize: 13 }} disabled={!dirty(r.id) || saving[r.id]} onClick={() => save(r)}>
                    {saving[r.id] ? "Saving…" : saved[r.id] ? "Saved ✓" : "Save"}
                  </button>
                  <button className="btn ghost" style={{ padding: "6px 10px", fontSize: 12, marginLeft: 6 }} onClick={() => remove(r)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingSizes && <VariantsEditor product={editingSizes} onClose={() => setEditingSizes(null)}
        onSaved={(id, patch) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)))} />}
    </div>
  );
}

/* ---------------- orders ---------------- */
const ORDER_STATUS = ["new", "confirmed", "packed", "delivered", "cancelled"];

function Orders() {
  const [rows, setRows] = React.useState(null);
  const [err, setErr] = React.useState("");
  React.useEffect(() => { D.adminOrders().then(setRows).catch((e) => setErr(e.message)); }, []);

  if (err) return <p style={{ color: "var(--destructive)" }}>{err}</p>;
  if (!rows) return <p className="muted">Loading orders…</p>;
  if (!rows.length) return <p className="muted">No orders yet. They'll appear here as customers check out.</p>;

  const setStatus = (row, status) => {
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status } : r)));
    D.updateOrderStatus(row.id, status).catch((e) => setErr(e.message));
  };

  return (
    <div className="card" style={{ overflowX: "auto" }}>
      <table>
        <thead><tr>
          <th>#</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th className="hide-sm">Placed</th>
        </tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="muted">{r.order_no}</td>
              <td>
                <b style={{ color: "var(--primary)" }}>{r.customer_name}</b>
                <div className="muted" style={{ fontSize: 12 }}>
                  <a href={"https://wa.me/91" + String(r.phone).replace(/\D/g, "").slice(-10)} target="_blank" rel="noopener noreferrer">{r.phone}</a>
                </div>
                {r.address && <div className="muted" style={{ fontSize: 12 }}>{r.address}, {r.city}</div>}
              </td>
              <td className="muted" style={{ fontSize: 13, maxWidth: 260 }}>
                {(r.items || []).map((i) => `${i.name} ×${i.qty}`).join(", ") || "—"}
              </td>
              <td><b>{money(r.total)}</b></td>
              <td>
                <select value={r.status} onChange={(e) => setStatus(r, e.target.value)} style={{ maxWidth: 140 }}>
                  {ORDER_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td className="hide-sm muted" style={{ fontSize: 12 }}>{when(r.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- enquiries ---------------- */
function Enquiries() {
  const [rows, setRows] = React.useState(null);
  const [err, setErr] = React.useState("");
  React.useEffect(() => { D.adminEnquiries().then(setRows).catch((e) => setErr(e.message)); }, []);

  if (err) return <p style={{ color: "var(--destructive)" }}>{err}</p>;
  if (!rows) return <p className="muted">Loading enquiries…</p>;
  if (!rows.length) return <p className="muted">No enquiries yet.</p>;

  const setStatus = (row, status) => {
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status } : r)));
    D.updateEnquiryStatus(row.id, status).catch((e) => setErr(e.message));
  };

  return (
    <div className="card" style={{ overflowX: "auto" }}>
      <table>
        <thead><tr><th>From</th><th>Message</th><th>Status</th><th className="hide-sm">Received</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>
                <b style={{ color: "var(--primary)" }}>{r.name}</b>
                {r.phone && <div className="muted" style={{ fontSize: 12 }}>
                  <a href={"https://wa.me/91" + String(r.phone).replace(/\D/g, "").slice(-10)} target="_blank" rel="noopener noreferrer">{r.phone}</a>
                </div>}
              </td>
              <td style={{ maxWidth: 420 }}>{r.message}</td>
              <td>
                <select value={r.status} onChange={(e) => setStatus(r, e.target.value)} style={{ maxWidth: 130 }}>
                  {["new", "replied", "closed"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td className="hide-sm muted" style={{ fontSize: 12 }}>{when(r.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- reviews ---------------- */
function Reviews() {
  const [rows, setRows] = React.useState(null);
  const [err, setErr] = React.useState("");
  React.useEffect(() => { D.adminReviews().then(setRows).catch((e) => setErr(e.message)); }, []);

  if (err) return <p style={{ color: "var(--destructive)" }}>{err}</p>;
  if (!rows) return <p className="muted">Loading reviews…</p>;
  if (!rows.length) return (
    <p className="muted">
      No reviews yet. Add real customer reviews here and tick “Published” — only published
      ones appear on the website, so nothing goes live without your approval.
    </p>
  );

  const toggle = (row) => {
    const next = !row.is_published;
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, is_published: next } : r)));
    D.setReviewPublished(row.id, next).catch((e) => setErr(e.message));
  };

  return (
    <div className="card" style={{ overflowX: "auto" }}>
      <table>
        <thead><tr><th>Customer</th><th>Review</th><th>Rating</th><th>Published</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td><b style={{ color: "var(--primary)" }}>{r.customer_name}</b>
                <div className="muted" style={{ fontSize: 12 }}>{r.city}</div></td>
              <td style={{ maxWidth: 420 }}>{r.quote}</td>
              <td>{r.rating ? "★".repeat(r.rating) : "—"}</td>
              <td><input type="checkbox" style={{ width: 18, height: 18 }}
                    checked={!!r.is_published} onChange={() => toggle(r)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- categories ---------------- */
/* Owner-managed shop categories. Needs the `categories` table (supabase/categories.sql).
   `onChange` refreshes the shared list so the product dropdowns update immediately. */
/* Preset accent colours for categories — the owner picks by name, no CSS needed.
   Values use the brand tokens (defined via styles.css) so they match the site. */
const CAT_TINTS = [
  ["var(--gold)", "Gold"],
  ["var(--gold-soft)", "Soft Gold"],
  ["var(--forest)", "Forest Green"],
  ["var(--forest-deep)", "Deep Forest"],
  ["color-mix(in oklab, var(--forest) 55%, var(--gold))", "Green-Gold"],
  ["#B45309", "Saffron"],
  ["#C0492F", "Terracotta"],
  ["#6D2E5B", "Plum"],
  ["#2C7A7B", "Teal"],
  ["#9B2D6B", "Berry"],
];
/* Colour dropdown with a live swatch. Falls back to a "Current" option if the
   stored value isn't one of the presets (e.g. an older hand-typed colour). */
function TintSelect({ value, onChange }) {
  const v = value || "var(--gold)";
  const known = CAT_TINTS.some(([val]) => val === v);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span aria-hidden="true" style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, background: v, border: "1px solid var(--border)" }} />
      <select value={known ? v : "__custom"} onChange={(e) => { if (e.target.value !== "__custom") onChange(e.target.value); }}
        style={{ fontSize: 13, padding: "6px 8px", minWidth: 148 }}>
        {CAT_TINTS.map(([val, name]) => <option key={val} value={val}>{name}</option>)}
        {!known && <option value="__custom">Current (custom)</option>}
      </select>
    </div>
  );
}

function Categories({ cats, onChange }) {
  const [drafts, setDrafts] = React.useState({});
  const [saving, setSaving] = React.useState({});
  const [saved, setSaved] = React.useState({});
  const [err, setErr] = React.useState("");
  const [nu, setNu] = React.useState({ name: "", tint: "var(--gold)" });
  const [adding, setAdding] = React.useState(false);
  // Product count per category slug — so the owner can see which categories are
  // populated (and which are hidden on the shop because they're still empty).
  const [counts, setCounts] = React.useState(null);
  React.useEffect(() => {
    D.adminProducts().then((rows) => {
      const m = {}; (rows || []).forEach((r) => { m[r.category] = (m[r.category] || 0) + 1; }); setCounts(m);
    }).catch(() => setCounts({}));
  }, []);

  const cur = (c, f) => (drafts[c.id] && f in drafts[c.id]) ? drafts[c.id][f] : c[f];
  const edit = (id, f, v) => setDrafts((d) => ({ ...d, [id]: { ...d[id], [f]: v } }));
  const dirty = (id) => drafts[id] && Object.keys(drafts[id]).length > 0;

  const save = (c) => {
    const d = drafts[c.id]; if (!d) return;
    const patch = {};
    if ("name" in d) patch.name = String(d.name).trim() || c.name;
    if ("tint" in d) patch.tint = String(d.tint).trim();
    if ("sort_order" in d) patch.sort_order = Number(d.sort_order) || 0;
    setSaving((s) => ({ ...s, [c.id]: true })); setErr("");
    D.updateCategory(c.id, patch)
      .then(() => {
        setDrafts((dd) => { const n = { ...dd }; delete n[c.id]; return n; });
        setSaved((m) => ({ ...m, [c.id]: 1 }));
        setTimeout(() => setSaved((m) => { const n = { ...m }; delete n[c.id]; return n; }), 2200);
        if (onChange) onChange();
      })
      .catch((e) => setErr(e.message))
      .then(() => setSaving((s) => ({ ...s, [c.id]: false })));
  };

  const add = (e) => {
    e.preventDefault();
    const name = nu.name.trim(); if (!name) { setErr("Enter a category name."); return; }
    const slug = slugify(name);
    if (cats.some((c) => c.slug === slug)) { setErr("A category with that name already exists."); return; }
    setAdding(true); setErr("");
    D.createCategory({ slug: slug, name: name, tint: nu.tint.trim() || "var(--forest)", sort_order: (cats.length + 1) })
      .then(() => { setNu({ name: "", tint: "var(--forest)" }); if (onChange) onChange(); })
      .catch((e) => setErr(e.message))
      .then(() => setAdding(false));
  };

  const remove = (c) => {
    if (!window.confirm("Delete the “" + c.name + "” category?\n\nProducts in it stay in the database but won't show under any category until you move them (Products tab) to another one.")) return;
    setSaving((s) => ({ ...s, [c.id]: true })); setErr("");
    D.deleteCategory(c.id)
      .then(() => { if (onChange) onChange(); })
      .catch((e) => setErr(e.message))
      .then(() => setSaving((s) => ({ ...s, [c.id]: false })));
  };

  if (!cats) return <p className="muted">Loading categories…</p>;

  return (
    <div>
      <p className="muted" style={{ marginBottom: 14 }}>
        These are the category cards shown on the shop, left to right by <b>order</b>. Add, rename, recolour or remove them here —
        then use the <b>Products</b> tab to file each product into a category.
        <br /><b>A category only appears on the shop once it has at least one product</b> — empty categories stay hidden from customers (so nobody lands on a blank page). The “On shop” column below shows which are live.
        {!cats.length && <><br /><b style={{ color: "var(--destructive)" }}>No categories found.</b> Run <code>supabase/categories.sql</code> once in Supabase, then reload.</>}
      </p>

      <form onSubmit={add} className="card" style={{ marginBottom: 18, display: "grid", gap: 12 }}>
        <b style={{ color: "var(--primary)", fontSize: 16 }}>New category</b>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr auto", gap: 12, alignItems: "end" }}>
          <label style={lbl}>Category name<input value={nu.name} onChange={(e) => setNu((o) => ({ ...o, name: e.target.value }))} placeholder="e.g. Festive Hampers" /></label>
          <label style={lbl}>Accent colour<TintSelect value={nu.tint} onChange={(v) => setNu((o) => ({ ...o, tint: v }))} /></label>
          <button className="btn" type="submit" disabled={adding}>{adding ? "Adding…" : "+ Add"}</button>
        </div>
        <p className="muted" style={{ margin: 0, fontSize: 11 }}>Pick an accent colour from the list — it tints the category card on the shop. Remember to assign products in the <b>Products</b> tab, or the new category stays hidden.</p>
      </form>

      {err && <p style={{ color: "var(--destructive)", marginBottom: 12 }}>{err}</p>}

      {!!cats.length && (
        <div className="card" style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>Order</th><th>Category name</th><th>Accent</th><th>On shop</th><th>Slug</th><th></th></tr></thead>
            <tbody>
              {cats.map((c) => (
                <tr key={c.id} style={dirty(c.id) ? { background: "color-mix(in oklab, var(--accent) 8%, transparent)" } : null}>
                  <td><input className="num" type="number" value={cur(c, "sort_order") == null ? "" : cur(c, "sort_order")}
                        onChange={(e) => edit(c.id, "sort_order", e.target.value)} style={{ width: 64 }} /></td>
                  <td><input type="text" value={cur(c, "name") || ""} onChange={(e) => edit(c.id, "name", e.target.value)}
                        style={{ fontWeight: 700, color: "var(--primary)", minWidth: 200 }} /></td>
                  <td>
                    <TintSelect value={cur(c, "tint")} onChange={(v) => edit(c.id, "tint", v)} />
                  </td>
                  <td style={{ fontSize: 12 }}>
                    {counts == null ? <span className="muted">…</span>
                      : (counts[c.slug] || 0) > 0
                        ? <span style={{ color: "var(--primary)", fontWeight: 600 }}>{counts[c.slug]} product{counts[c.slug] > 1 ? "s" : ""}</span>
                        : <span style={{ color: "var(--destructive)" }}>0 — hidden</span>}
                  </td>
                  <td className="muted" style={{ fontSize: 12 }}>{c.slug}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <button className="btn" style={{ padding: "6px 14px", fontSize: 13 }} disabled={!dirty(c.id) || saving[c.id]} onClick={() => save(c)}>
                      {saving[c.id] ? "Saving…" : saved[c.id] ? "Saved ✓" : "Save"}
                    </button>
                    <button className="btn ghost" style={{ padding: "6px 10px", fontSize: 12, marginLeft: 6 }} onClick={() => remove(c)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---------------- shell ---------------- */
function MSAdminApp() {
  const [signedIn, setSignedIn] = React.useState(D.isSignedIn());
  const [tab, setTab] = React.useState("products");
  const [cats, setCats] = React.useState(null);

  const loadCats = React.useCallback(() => {
    D.adminCategories()
      .then((r) => setCats(r && r.length ? r : DEFAULT_CATS.map((c, i) => ({ id: c.slug, slug: c.slug, name: c.name, tint: "", sort_order: i + 1 }))))
      .catch(() => setCats(DEFAULT_CATS.map((c, i) => ({ id: c.slug, slug: c.slug, name: c.name, tint: "", sort_order: i + 1 }))));
  }, []);
  React.useEffect(() => { if (signedIn) loadCats(); }, [signedIn, loadCats]);

  if (!signedIn) return <SignIn onDone={() => setSignedIn(true)} />;

  const TABS = [
    ["products", "Products"],
    ["categories", "Categories"],
    ["orders", "Orders"],
    ["enquiries", "Enquiries"],
    ["reviews", "Reviews"],
  ];

  return (
    <div className="wrap">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="../assets/mishthi-logo-tag.png" alt="Mishthi Sattva" style={{ height: 50, width: "auto", objectFit: "contain", borderRadius: 8 }} />
          <div>
            <h1 style={{ margin: 0, fontSize: 24, color: "var(--primary)" }}>Mishthi Sattva Admin</h1>
            <p className="muted" style={{ margin: 0, fontSize: 13 }}>Products, orders, enquiries &amp; reviews</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a className="btn ghost" href="../ui_kits/website/index.html">View site</a>
          <button className="btn ghost" onClick={() => { D.signOut(); setSignedIn(false); }}>Sign out</button>
        </div>
      </div>

      <div className="tabs">
        {TABS.map(([id, label]) => (
          <button key={id} className={"tab" + (tab === id ? " on" : "")} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {tab === "products" && <Products cats={cats} />}
      {tab === "categories" && <Categories cats={cats} onChange={loadCats} />}
      {tab === "orders" && <Orders />}
      {tab === "enquiries" && <Enquiries />}
      {tab === "reviews" && <Reviews />}
    </div>
  );
}

window.MSAdminApp = MSAdminApp;
