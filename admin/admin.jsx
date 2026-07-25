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
        <img src="../assets/mishthi-logo.png" alt="" style={{ height: 56, width: 56, objectFit: "contain" }} />
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
const CATS = [["ayurvedic", "Ayurvedic & Health"], ["spices", "Spices & Masala"], ["hair", "Hair Care"], ["beauty", "Beauty & Skincare"], ["special", "Special Foods"]];
const catLabel = (v) => (CATS.find((c) => c[0] === v) || [v, v])[1];
const slugify = (s) => (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const lbl = { display: "grid", gap: 5, fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" };

/* ---- add a brand-new product (with photo upload) ---- */
function NewProduct({ onAdded }) {
  const [open, setOpen] = React.useState(false);
  const empty = { name: "", category: "ayurvedic", price: "", mrp: "", weight: "", short_desc: "" };
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
      <label style={lbl}>Category<select value={f.category} onChange={set("category")}>{CATS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
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

function Products() {
  const [rows, setRows] = React.useState(null);
  const [saving, setSaving] = React.useState({});
  const [err, setErr] = React.useState("");

  const load = () => D.adminProducts().then(setRows).catch((e) => setErr(e.message));
  React.useEffect(() => { load(); }, []);

  const patch = (row, field, raw) => {
    const value = field === "in_stock" ? raw
      : field === "weight" ? (String(raw).trim() === "" ? null : String(raw).trim())
      : raw === "" ? null : Number(raw);
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, [field]: value } : r)));
    setSaving((s) => ({ ...s, [row.id]: true }));
    D.updateProduct(row.id, { [field]: value })
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

  if (err) return <p style={{ color: "var(--destructive)" }}>{err} <button className="btn ghost" onClick={() => { setErr(""); load(); }}>Retry</button></p>;
  if (!rows) return <p className="muted">Loading products…</p>;

  const noPrice = rows.filter((r) => r.price == null).length;

  return (
    <div>
      <NewProduct onAdded={(p) => setRows((rs) => [...rs, p])} />
      <p className="muted" style={{ marginBottom: 14 }}>
        {rows.length} products · {noPrice} still showing “Ask for price”. Edits save immediately.
      </p>
      <div style={{ overflowX: "auto" }} className="card">
        <table>
          <thead><tr>
            <th>Product</th><th>Price ₹</th><th>MRP ₹</th><th>Weight</th><th>In stock</th><th></th>
          </tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 8, overflow: "hidden", background: "var(--secondary)", display: "grid", placeItems: "center" }}>
                      {r.photo ? <img src={r.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span className="muted" style={{ fontSize: 10 }}>no img</span>}
                    </span>
                    <span>
                      <b style={{ color: "var(--primary)" }}>{r.name}</b>
                      <div className="muted" style={{ fontSize: 12 }}>{catLabel(r.category)}</div>
                    </span>
                  </div>
                </td>
                <td><input className="num" type="number" defaultValue={r.price == null ? "" : r.price}
                      placeholder="Ask" onBlur={(e) => patch(r, "price", e.target.value)} /></td>
                <td><input className="num" type="number" defaultValue={r.mrp == null ? "" : r.mrp}
                      placeholder="—" onBlur={(e) => patch(r, "mrp", e.target.value)} /></td>
                <td><input className="num" type="text" defaultValue={r.weight || ""}
                      placeholder="500 g" onBlur={(e) => patch(r, "weight", e.target.value)} /></td>
                <td>
                  <input type="checkbox" style={{ width: 18, height: 18 }} checked={r.in_stock !== false}
                    onChange={(e) => patch(r, "in_stock", e.target.checked)} />
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <span className="muted" style={{ fontSize: 12, marginRight: 8 }}>{saving[r.id] ? "…" : ""}</span>
                  <button className="btn ghost" style={{ padding: "5px 10px", fontSize: 12 }} onClick={() => remove(r)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

/* ---------------- shell ---------------- */
function MSAdminApp() {
  const [signedIn, setSignedIn] = React.useState(D.isSignedIn());
  const [tab, setTab] = React.useState("products");

  if (!signedIn) return <SignIn onDone={() => setSignedIn(true)} />;

  const TABS = [
    ["products", "Products"],
    ["orders", "Orders"],
    ["enquiries", "Enquiries"],
    ["reviews", "Reviews"],
  ];

  return (
    <div className="wrap">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="../assets/mishthi-logo.png" alt="" style={{ height: 46, width: 46, objectFit: "contain" }} />
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

      {tab === "products" && <Products />}
      {tab === "orders" && <Orders />}
      {tab === "enquiries" && <Enquiries />}
      {tab === "reviews" && <Reviews />}
    </div>
  );
}

window.MSAdminApp = MSAdminApp;
