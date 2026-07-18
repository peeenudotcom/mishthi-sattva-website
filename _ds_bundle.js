/* @ds-bundle: {"format":4,"namespace":"MishthiSattvaDesignSystem_af8a45","components":[{"name":"BenefitTile","sourcePath":"components/brand/BenefitTile.jsx"},{"name":"FAQItem","sourcePath":"components/brand/FAQItem.jsx"},{"name":"GoldDivider","sourcePath":"components/brand/GoldDivider.jsx"},{"name":"ProductCard","sourcePath":"components/brand/ProductCard.jsx"},{"name":"Testimonial","sourcePath":"components/brand/Testimonial.jsx"},{"name":"WhatsAppButton","sourcePath":"components/brand/WhatsAppButton.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"admin/admin-app.jsx":"f20ffde5189a","admin/admin-form.jsx":"cc66011f2707","admin/config.js":"1db70864d489","components/brand/BenefitTile.jsx":"b05ac2047163","components/brand/FAQItem.jsx":"903ee4edf178","components/brand/GoldDivider.jsx":"1f737ca7bcdc","components/brand/ProductCard.jsx":"0c721f7abb60","components/brand/Testimonial.jsx":"92800e5c7512","components/brand/WhatsAppButton.jsx":"ce3ee62e9c1d","components/core/Badge.jsx":"d75af60623bb","components/core/Button.jsx":"b78113949a56","components/core/Card.jsx":"56f485378180","components/forms/Input.jsx":"9403832484de","ui_kits/shop/Shop.jsx":"42987a46a1ee","ui_kits/shop/ShopParts.jsx":"61ea27ba02a7","ui_kits/shop/data.js":"e1cacb7d297e","ui_kits/website/Sections.jsx":"b3bab25acbc4"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MishthiSattvaDesignSystem_af8a45 = window.MishthiSattvaDesignSystem_af8a45 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// admin/admin-app.jsx
try { (() => {
/* Mishthi Sattva Admin — main app: connect gate + product management.
   Registers window.MSAdminApp. Requires React, ReactDOM, MSAdmin,
   MSProductForm, DS bundle. */
(function () {
  "use strict";

  const {
    useState,
    useEffect,
    useCallback
  } = React;
  const DS = window.MishthiSattvaDesignSystem_af8a45 || {};
  const {
    Button,
    Badge
  } = DS;
  const A = window.MSAdmin;
  const ProductForm = window.MSProductForm;
  const money = function (n) {
    return n == null ? "—" : "₹" + Number(n).toLocaleString("en-IN");
  };

  /* ============================ CONNECT GATE ============================ */
  function Connect(props) {
    const saved = A.loadCreds() || {};
    const [url, setUrl] = useState(saved.url || "");
    const [key, setKey] = useState(saved.key || "");
    const [status, setStatus] = useState("");
    const [busy, setBusy] = useState(false);
    const [copied, setCopied] = useState(false);
    async function connect() {
      if (!url.trim() || !key.trim()) {
        setStatus("Enter both the project URL and anon key.");
        return;
      }
      A.saveCreds(url, key);
      setBusy(true);
      setStatus("Testing connection…");
      const r = await A.testConnection();
      setBusy(false);
      if (r.ok) {
        setStatus("");
        props.onConnected();
      } else {
        setStatus("✕ " + r.error + "  — check the SQL below has been run and keys are correct.");
      }
    }
    const fieldStyle = {
      width: "100%",
      padding: "11px 13px",
      borderRadius: "8px",
      border: "1px solid var(--border)",
      background: "var(--white)",
      fontFamily: "var(--font-sans)",
      fontSize: "0.92rem",
      color: "var(--foreground)"
    };
    const lbl = {
      display: "block",
      marginBottom: "6px",
      fontSize: "0.7rem",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      fontWeight: 600,
      color: "var(--muted-foreground)"
    };
    return React.createElement("div", {
      style: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "56px 20px"
      }
    }, React.createElement("div", {
      style: {
        width: "100%",
        maxWidth: 620
      }
    }, React.createElement("div", {
      style: {
        textAlign: "center",
        marginBottom: "28px"
      }
    }, React.createElement("span", {
      className: "ms-gold-divider is-start",
      style: {
        justifyContent: "center"
      }
    }, "Admin · Connect Database"), React.createElement("h1", {
      style: {
        fontSize: "2.2rem",
        marginTop: "12px"
      }
    }, "Connect your Supabase"), React.createElement("p", {
      style: {
        color: "var(--muted-foreground)",
        marginTop: "10px",
        lineHeight: 1.6
      }
    }, "Paste your project URL and anon (public) key. Run the SQL once in the Supabase SQL editor first, then connect.")), React.createElement("div", {
      style: {
        background: "var(--white)",
        border: "1px solid var(--border)",
        borderRadius: "20px",
        padding: "28px",
        boxShadow: "var(--shadow-md)"
      }
    }, React.createElement("div", {
      style: {
        marginBottom: "16px"
      }
    }, React.createElement("label", {
      style: lbl
    }, "Project URL"), React.createElement("input", {
      style: fieldStyle,
      value: url,
      placeholder: "https://xxxx.supabase.co",
      onChange: function (e) {
        setUrl(e.target.value);
      }
    })), React.createElement("div", {
      style: {
        marginBottom: "18px"
      }
    }, React.createElement("label", {
      style: lbl
    }, "Anon public key"), React.createElement("input", {
      style: fieldStyle,
      value: key,
      placeholder: "eyJhbGciOi…",
      onChange: function (e) {
        setKey(e.target.value);
      }
    })), status && React.createElement("div", {
      style: {
        marginBottom: "14px",
        fontSize: "0.85rem",
        color: status[0] === "✕" ? "var(--destructive)" : "var(--muted-foreground)"
      }
    }, status), React.createElement(Button, {
      variant: "forest",
      fullWidth: true,
      onClick: connect
    }, busy ? "Connecting…" : "Connect")), /* SQL setup */
    React.createElement("div", {
      style: {
        marginTop: "24px",
        background: "var(--forest-deep)",
        borderRadius: "16px",
        overflow: "hidden"
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }
    }, React.createElement("span", {
      style: {
        color: "var(--gold-soft)",
        fontSize: "0.72rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        fontWeight: 600
      }
    }, "One-time setup SQL"), React.createElement("button", {
      onClick: function () {
        navigator.clipboard.writeText(A.SETUP_SQL).then(function () {
          setCopied(true);
          setTimeout(function () {
            setCopied(false);
          }, 1600);
        });
      },
      style: {
        border: "1px solid rgba(255,255,255,0.25)",
        background: "transparent",
        color: "#fff",
        borderRadius: "999px",
        padding: "5px 14px",
        fontSize: "0.78rem",
        cursor: "pointer"
      }
    }, copied ? "Copied ✓" : "Copy")), React.createElement("pre", {
      style: {
        margin: 0,
        padding: "16px",
        overflowX: "auto",
        maxHeight: "220px",
        color: "#EFE9DC",
        fontSize: "0.72rem",
        lineHeight: 1.55,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
      }
    }, A.SETUP_SQL))));
  }

  /* ============================ PRODUCT ROW ============================ */
  function ProductCardRow(props) {
    const p = props.p;
    const cat = A.CATEGORIES.find(function (c) {
      return c.id === p.category;
    });
    return React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "64px 1fr auto",
        gap: "16px",
        alignItems: "center",
        padding: "14px 18px",
        background: "var(--white)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        boxShadow: "var(--shadow-sm)",
        opacity: p.in_stock ? 1 : 0.62
      }
    }, /* thumb */
    React.createElement("div", {
      style: {
        width: 64,
        height: 64,
        borderRadius: "12px",
        overflow: "hidden",
        background: "var(--secondary)",
        border: "1px solid var(--border)",
        flex: "0 0 auto"
      }
    }, p.photo ? React.createElement("img", {
      src: p.photo,
      alt: "",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }) : React.createElement("div", {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--gold)",
        fontSize: "1.4rem"
      }
    }, "❦")), /* info */
    React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap"
      }
    }, React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "1.12rem",
        fontWeight: 600,
        color: "var(--forest)"
      }
    }, p.name), p.featured && React.createElement(Badge, {
      tone: "gold",
      variant: "soft"
    }, "Featured"), !p.in_stock && React.createElement(Badge, {
      tone: "neutral",
      variant: "soft"
    }, "Out of stock")), React.createElement("div", {
      style: {
        fontSize: "0.8rem",
        color: "var(--muted-foreground)",
        marginTop: "3px"
      }
    }, (cat ? cat.name : p.category) + "  ·  " + money(p.price) + (p.weight ? "  ·  " + p.weight : ""))), /* actions */
    React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "6px"
      }
    }, React.createElement(IconBtn, {
      title: "Move up",
      disabled: props.first,
      onClick: props.onUp
    }, "↑"), React.createElement(IconBtn, {
      title: "Move down",
      disabled: props.last,
      onClick: props.onDown
    }, "↓"), React.createElement(IconBtn, {
      title: p.featured ? "Unfeature" : "Feature on homepage",
      active: p.featured,
      onClick: props.onFeature
    }, "★"), React.createElement(IconBtn, {
      title: p.in_stock ? "Mark out of stock" : "Mark in stock",
      onClick: props.onStock
    }, p.in_stock ? "◉" : "○"), React.createElement(Button, {
      variant: "outline",
      size: "sm",
      onClick: props.onEdit
    }, "Edit"), React.createElement(IconBtn, {
      title: "Delete",
      danger: true,
      onClick: props.onDelete
    }, "🗑")));
  }
  function IconBtn(props) {
    return React.createElement("button", {
      title: props.title,
      disabled: props.disabled,
      onClick: props.onClick,
      style: {
        width: 34,
        height: 34,
        borderRadius: "50%",
        cursor: props.disabled ? "default" : "pointer",
        border: "1px solid var(--border)",
        flex: "0 0 auto",
        background: props.active ? "color-mix(in oklab, var(--gold) 22%, var(--white))" : "var(--white)",
        color: props.danger ? "var(--destructive)" : props.active ? "var(--gold)" : "var(--ink-500)",
        opacity: props.disabled ? 0.35 : 1,
        fontSize: "0.95rem",
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, props.children);
  }

  /* ============================ MAIN APP ============================ */
  function App() {
    const [connected, setConnected] = useState(function () {
      const c = A.loadCreds();
      return !!(c && c.url && c.key);
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [q, setQ] = useState("");
    const [catFilter, setCatFilter] = useState("all");
    const [editing, setEditing] = useState(null); // product or {} for new, null closed
    const [saving, setSaving] = useState(false);
    const [seeding, setSeeding] = useState(false);
    const load = useCallback(async function () {
      const client = A.getClient();
      if (!client) {
        setConnected(false);
        return;
      }
      setLoading(true);
      setError("");
      const {
        data,
        error
      } = await client.from("products").select("*").order("sort_order", {
        ascending: true
      }).order("created_at", {
        ascending: true
      });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      setProducts(data || []);
    }, []);
    useEffect(function () {
      if (connected) load();
    }, [connected, load]);
    async function save(payload) {
      const client = A.getClient();
      setSaving(true);
      let res;
      if (editing && editing.id) {
        res = await client.from("products").update(payload).eq("id", editing.id);
      } else {
        payload.sort_order = products.length;
        res = await client.from("products").insert(payload);
      }
      setSaving(false);
      if (res.error) {
        setError(res.error.message);
        return;
      }
      setEditing(null);
      load();
    }
    async function remove(p) {
      if (!confirm("Delete “" + p.name + "”? This cannot be undone.")) return;
      const client = A.getClient();
      const {
        error
      } = await client.from("products").delete().eq("id", p.id);
      if (error) {
        setError(error.message);
        return;
      }
      load();
    }
    async function patch(p, changes) {
      const client = A.getClient();
      // optimistic
      setProducts(function (prev) {
        return prev.map(function (x) {
          return x.id === p.id ? Object.assign({}, x, changes) : x;
        });
      });
      const {
        error
      } = await client.from("products").update(changes).eq("id", p.id);
      if (error) {
        setError(error.message);
        load();
      }
    }
    async function reorder(index, dir) {
      const list = filtered;
      const j = index + dir;
      if (j < 0 || j >= list.length) return;
      const a = list[index],
        b = list[j];
      const client = A.getClient();
      const ao = a.sort_order,
        bo = b.sort_order;
      setProducts(function (prev) {
        return prev.map(function (x) {
          if (x.id === a.id) return Object.assign({}, x, {
            sort_order: bo
          });
          if (x.id === b.id) return Object.assign({}, x, {
            sort_order: ao
          });
          return x;
        });
      });
      await client.from("products").update({
        sort_order: bo
      }).eq("id", a.id);
      await client.from("products").update({
        sort_order: ao
      }).eq("id", b.id);
      load();
    }
    async function seed() {
      if (!confirm("Import the 21 sample Mishthi Sattva products into your database?")) return;
      const client = A.getClient();
      setSeeding(true);
      const {
        error
      } = await client.from("products").insert(A.SEED);
      setSeeding(false);
      if (error) {
        setError(error.message);
        return;
      }
      load();
    }
    function disconnect() {
      A.clearCreds();
      setConnected(false);
      setProducts([]);
    }
    if (!connected) return React.createElement(Connect, {
      onConnected: function () {
        setConnected(true);
      }
    });
    const filtered = products.filter(function (p) {
      if (catFilter !== "all" && p.category !== catFilter) return false;
      if (q && p.name.toLowerCase().indexOf(q.toLowerCase()) === -1) return false;
      return true;
    });
    const featuredCount = products.filter(function (p) {
      return p.featured;
    }).length;
    return React.createElement("div", {
      style: {
        minHeight: "100vh",
        paddingBottom: "80px"
      }
    }, /* top bar */
    React.createElement("header", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "color-mix(in oklab, var(--cream) 88%, transparent)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)"
      }
    }, React.createElement("div", {
      className: "ms-container",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px"
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }
    }, React.createElement("img", {
      src: "../assets/mishthi-logo.png",
      alt: "Mishthi Sattva",
      style: {
        height: 40
      }
    }), React.createElement("div", null, React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "1.15rem",
        color: "var(--forest)"
      }
    }, "Product Admin"), React.createElement("div", {
      style: {
        fontSize: "0.72rem",
        color: "var(--muted-foreground)",
        letterSpacing: "0.06em"
      }
    }, products.length + " products · " + featuredCount + " featured"))), React.createElement("div", {
      style: {
        display: "flex",
        gap: "10px"
      }
    }, React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: disconnect
    }, "Disconnect"), React.createElement(Button, {
      variant: "forest",
      size: "sm",
      onClick: function () {
        setEditing({});
      }
    }, "+ Add product")))), React.createElement("main", {
      className: "ms-container",
      style: {
        padding: "28px 20px"
      }
    }, /* toolbar */
    React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        alignItems: "center",
        marginBottom: "22px"
      }
    }, React.createElement("input", {
      value: q,
      placeholder: "Search products…",
      onChange: function (e) {
        setQ(e.target.value);
      },
      style: {
        flex: "1 1 220px",
        padding: "10px 14px",
        borderRadius: "999px",
        border: "1px solid var(--border)",
        background: "var(--white)",
        fontFamily: "var(--font-sans)",
        fontSize: "0.9rem",
        color: "var(--foreground)"
      }
    }), React.createElement("div", {
      style: {
        display: "flex",
        gap: "6px",
        flexWrap: "wrap"
      }
    }, [{
      id: "all",
      name: "All"
    }].concat(A.CATEGORIES).map(function (c) {
      const on = catFilter === c.id;
      return React.createElement("button", {
        key: c.id,
        onClick: function () {
          setCatFilter(c.id);
        },
        style: {
          padding: "8px 14px",
          borderRadius: "999px",
          cursor: "pointer",
          fontSize: "0.82rem",
          border: "1px solid " + (on ? "var(--forest)" : "var(--border)"),
          background: on ? "var(--forest)" : "var(--white)",
          color: on ? "var(--cream)" : "var(--ink-500)",
          fontWeight: on ? 600 : 400
        }
      }, c.name);
    }))), error && React.createElement("div", {
      style: {
        marginBottom: "16px",
        padding: "12px 14px",
        borderRadius: "10px",
        background: "color-mix(in oklab, var(--destructive) 12%, var(--white))",
        color: "var(--destructive)",
        fontSize: "0.86rem"
      }
    }, error), /* list */
    loading ? React.createElement("p", {
      style: {
        color: "var(--muted-foreground)",
        padding: "40px 0",
        textAlign: "center"
      }
    }, "Loading…") : products.length === 0 ? React.createElement(EmptyState, {
      onSeed: seed,
      onAdd: function () {
        setEditing({});
      },
      seeding: seeding
    }) : React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }
    }, filtered.map(function (p, i) {
      return React.createElement(ProductCardRow, {
        key: p.id,
        p: p,
        first: i === 0,
        last: i === filtered.length - 1,
        onEdit: function () {
          setEditing(p);
        },
        onDelete: function () {
          remove(p);
        },
        onFeature: function () {
          patch(p, {
            featured: !p.featured
          });
        },
        onStock: function () {
          patch(p, {
            in_stock: !p.in_stock
          });
        },
        onUp: function () {
          reorder(i, -1);
        },
        onDown: function () {
          reorder(i, 1);
        }
      });
    }), filtered.length === 0 && React.createElement("p", {
      style: {
        color: "var(--muted-foreground)",
        padding: "24px 0",
        textAlign: "center"
      }
    }, "No products match your filter."))), /* drawer */
    editing !== null && React.createElement(Drawer, {
      onClose: function () {
        setEditing(null);
      }
    }, React.createElement(ProductForm, {
      initial: editing.id ? editing : null,
      saving: saving,
      onSave: save,
      onCancel: function () {
        setEditing(null);
      }
    })));
  }
  function EmptyState(props) {
    return React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "64px 24px",
        background: "var(--white)",
        border: "1px dashed var(--border)",
        borderRadius: "20px"
      }
    }, React.createElement("div", {
      style: {
        fontSize: "2.4rem",
        color: "var(--gold)",
        marginBottom: "12px"
      }
    }, "❦"), React.createElement("h3", {
      style: {
        fontSize: "1.4rem",
        marginBottom: "8px"
      }
    }, "No products yet"), React.createElement("p", {
      style: {
        color: "var(--muted-foreground)",
        marginBottom: "22px"
      }
    }, "Add your first product, or import the sample catalogue to get started."), React.createElement("div", {
      style: {
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        flexWrap: "wrap"
      }
    }, React.createElement(Button, {
      variant: "forest",
      onClick: props.onAdd
    }, "+ Add product"), React.createElement(Button, {
      variant: "outline",
      onClick: props.onSeed
    }, props.seeding ? "Importing…" : "Import 21 sample products")));
  }
  function Drawer(props) {
    return React.createElement("div", {
      onClick: props.onClose,
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(11,51,37,0.42)",
        backdropFilter: "blur(3px)",
        display: "flex",
        justifyContent: "flex-end"
      }
    }, React.createElement("div", {
      onClick: function (e) {
        e.stopPropagation();
      },
      style: {
        width: "min(560px, 100%)",
        height: "100%",
        background: "var(--cream)",
        boxShadow: "-20px 0 60px rgba(0,0,0,0.25)"
      }
    }, props.children));
  }
  window.MSAdminApp = App;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "admin/admin-app.jsx", error: String((e && e.message) || e) }); }

// admin/admin-form.jsx
try { (() => {
/* Mishthi Sattva Admin — Product form (drawer) with photo upload / URL.
   Registers window.MSProductForm. Requires React, MSAdmin, DS bundle. */
(function () {
  "use strict";

  const {
    useState,
    useRef,
    useCallback
  } = React;
  const DS = window.MishthiSattvaDesignSystem_af8a45 || {};
  const {
    Button,
    Input,
    Badge
  } = DS;
  const A = window.MSAdmin;

  /* Upload a File to Supabase Storage, return its public URL. */
  async function uploadFile(file) {
    const client = A.getClient();
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;
    const {
      error
    } = await client.storage.from(A.BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "image/jpeg"
    });
    if (error) throw error;
    const {
      data
    } = client.storage.from(A.BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }

  /* A drop / click / paste-URL zone. onDone(url). */
  function DropZone(props) {
    const {
      onFiles,
      small
    } = props;
    const inputRef = useRef(null);
    const [over, setOver] = useState(false);
    const [busy, setBusy] = useState(false);
    const handle = useCallback(async function (files) {
      if (!files || !files.length) return;
      setBusy(true);
      try {
        await onFiles(Array.from(files));
      } finally {
        setBusy(false);
      }
    }, [onFiles]);
    return React.createElement("div", {
      onClick: function () {
        if (!busy) inputRef.current && inputRef.current.click();
      },
      onDragOver: function (e) {
        e.preventDefault();
        setOver(true);
      },
      onDragLeave: function () {
        setOver(false);
      },
      onDrop: function (e) {
        e.preventDefault();
        setOver(false);
        handle(e.dataTransfer.files);
      },
      style: {
        border: "1.5px dashed " + (over ? "var(--gold)" : "var(--border)"),
        background: over ? "color-mix(in oklab, var(--gold) 8%, var(--white))" : "var(--secondary)",
        borderRadius: "var(--radius-lg, 12px)",
        padding: small ? "14px" : "22px",
        textAlign: "center",
        cursor: busy ? "wait" : "pointer",
        color: "var(--muted-foreground)",
        fontSize: "0.85rem",
        transition: "all 150ms ease"
      }
    }, React.createElement("input", {
      ref: inputRef,
      type: "file",
      accept: "image/*",
      multiple: !small,
      hidden: true,
      onChange: function (e) {
        handle(e.target.files);
        e.target.value = "";
      }
    }), busy ? "Uploading…" : React.createElement(React.Fragment, null, React.createElement("span", {
      style: {
        color: "var(--gold)",
        fontWeight: 600
      }
    }, "Click"), " or drop " + (small ? "an image" : "image(s)") + " here"));
  }

  /* URL paste row. */
  function UrlAdd(props) {
    const [v, setV] = useState("");
    return React.createElement("div", {
      style: {
        display: "flex",
        gap: "8px",
        marginTop: "8px"
      }
    }, React.createElement("input", {
      value: v,
      placeholder: "…or paste an image URL",
      onChange: function (e) {
        setV(e.target.value);
      },
      style: {
        flex: 1,
        padding: "9px 12px",
        borderRadius: "8px",
        border: "1px solid var(--border)",
        background: "var(--white)",
        fontFamily: "var(--font-sans)",
        fontSize: "0.85rem",
        color: "var(--foreground)"
      }
    }), React.createElement(Button, {
      variant: "outline",
      size: "sm",
      onClick: function () {
        if (v.trim()) {
          props.onAdd(v.trim());
          setV("");
        }
      }
    }, "Add"));
  }
  function Thumb(props) {
    return React.createElement("div", {
      style: {
        position: "relative",
        width: props.size || 76,
        height: props.size || 76,
        borderRadius: "10px",
        overflow: "hidden",
        flex: "0 0 auto",
        border: "1px solid var(--border)",
        background: "var(--secondary)"
      }
    }, React.createElement("img", {
      src: props.src,
      alt: "",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }), React.createElement("button", {
      onClick: props.onRemove,
      title: "Remove",
      style: {
        position: "absolute",
        top: 3,
        right: 3,
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        background: "rgba(11,51,37,0.82)",
        color: "#fff",
        fontSize: "12px",
        lineHeight: "20px",
        padding: 0
      }
    }, "×"));
  }
  function Field(props) {
    return React.createElement("div", {
      style: {
        marginBottom: "16px"
      }
    }, React.createElement("label", {
      style: {
        display: "block",
        marginBottom: "6px",
        fontSize: "0.7rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        fontWeight: 600,
        color: "var(--muted-foreground)"
      }
    }, props.label), props.children);
  }
  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    background: "var(--white)",
    fontFamily: "var(--font-sans)",
    fontSize: "0.92rem",
    color: "var(--foreground)"
  };
  function ProductForm(props) {
    const {
      initial,
      onSave,
      onCancel,
      saving
    } = props;
    const [p, setP] = useState(function () {
      return Object.assign(A.emptyProduct(), initial || {});
    });
    const [benefitInput, setBenefitInput] = useState("");
    const [err, setErr] = useState("");
    function set(k, v) {
      setP(function (prev) {
        return Object.assign({}, prev, {
          [k]: v
        });
      });
    }
    function addBenefit() {
      const t = benefitInput.trim();
      if (!t) return;
      set("benefits", (p.benefits || []).concat(t));
      setBenefitInput("");
    }
    async function onMainFiles(files) {
      try {
        const url = await uploadFile(files[0]);
        set("photo", url);
      } catch (e) {
        setErr("Upload failed: " + e.message);
      }
    }
    async function onGalleryFiles(files) {
      try {
        const urls = [];
        for (const f of files) urls.push(await uploadFile(f));
        set("gallery", (p.gallery || []).concat(urls));
      } catch (e) {
        setErr("Upload failed: " + e.message);
      }
    }
    function submit() {
      if (!p.name.trim()) {
        setErr("Product name is required.");
        return;
      }
      setErr("");
      onSave({
        name: p.name.trim(),
        category: p.category,
        price: p.price === "" ? null : Number(p.price),
        mrp: p.mrp === "" ? null : Number(p.mrp),
        weight: p.weight.trim() || null,
        short_desc: p.short_desc.trim() || null,
        benefits: p.benefits || [],
        photo: p.photo || null,
        gallery: p.gallery || [],
        in_stock: !!p.in_stock,
        featured: !!p.featured
      });
    }
    return React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }
    }, /* header */
    React.createElement("div", {
      style: {
        padding: "20px 24px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flex: "0 0 auto"
      }
    }, React.createElement("h3", {
      style: {
        fontSize: "1.4rem"
      }
    }, initial && initial.id ? "Edit product" : "New product"), React.createElement("button", {
      onClick: onCancel,
      style: {
        border: "none",
        background: "none",
        fontSize: "1.6rem",
        cursor: "pointer",
        color: "var(--muted-foreground)",
        lineHeight: 1
      }
    }, "×")), /* body */
    React.createElement("div", {
      style: {
        padding: "24px",
        overflowY: "auto",
        flex: "1 1 auto"
      }
    }, err && React.createElement("div", {
      style: {
        marginBottom: "16px",
        padding: "10px 12px",
        borderRadius: "8px",
        background: "color-mix(in oklab, var(--destructive) 12%, var(--white))",
        color: "var(--destructive)",
        fontSize: "0.85rem"
      }
    }, err), React.createElement(Field, {
      label: "Product name"
    }, React.createElement("input", {
      style: inputStyle,
      value: p.name,
      onChange: function (e) {
        set("name", e.target.value);
      },
      placeholder: "e.g. Shakti Laddu"
    })), React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "14px"
      }
    }, React.createElement(Field, {
      label: "Category"
    }, React.createElement("select", {
      style: inputStyle,
      value: p.category,
      onChange: function (e) {
        set("category", e.target.value);
      }
    }, A.CATEGORIES.map(function (c) {
      return React.createElement("option", {
        key: c.id,
        value: c.id
      }, c.name);
    }))), React.createElement(Field, {
      label: "Weight / size"
    }, React.createElement("input", {
      style: inputStyle,
      value: p.weight,
      onChange: function (e) {
        set("weight", e.target.value);
      },
      placeholder: "e.g. 500 g"
    }))), React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "14px"
      }
    }, React.createElement(Field, {
      label: "Price (₹)"
    }, React.createElement("input", {
      style: inputStyle,
      type: "number",
      value: p.price,
      onChange: function (e) {
        set("price", e.target.value);
      },
      placeholder: "540"
    })), React.createElement(Field, {
      label: "MRP (₹) · optional"
    }, React.createElement("input", {
      style: inputStyle,
      type: "number",
      value: p.mrp,
      onChange: function (e) {
        set("mrp", e.target.value);
      },
      placeholder: "600"
    }))), React.createElement(Field, {
      label: "Short description"
    }, React.createElement("textarea", {
      style: Object.assign({}, inputStyle, {
        resize: "vertical",
        minHeight: "80px"
      }),
      value: p.short_desc,
      rows: 3,
      onChange: function (e) {
        set("short_desc", e.target.value);
      },
      placeholder: "A modern take on the 5,000-year-old recipe…"
    })), /* benefits */
    React.createElement(Field, {
      label: "Benefits / tags"
    }, React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        marginBottom: "8px"
      }
    }, (p.benefits || []).map(function (b, i) {
      return React.createElement("span", {
        key: i,
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "5px 10px",
          borderRadius: "999px",
          fontSize: "0.78rem",
          background: "color-mix(in oklab, var(--gold) 16%, var(--white))",
          color: "var(--forest-deep)",
          border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)"
        }
      }, b, React.createElement("button", {
        onClick: function () {
          set("benefits", p.benefits.filter(function (_, j) {
            return j !== i;
          }));
        },
        style: {
          border: "none",
          background: "none",
          cursor: "pointer",
          color: "inherit",
          fontSize: "0.95rem",
          lineHeight: 1,
          padding: 0
        }
      }, "×"));
    })), React.createElement("div", {
      style: {
        display: "flex",
        gap: "8px"
      }
    }, React.createElement("input", {
      style: inputStyle,
      value: benefitInput,
      placeholder: 'e.g. "No Refined Sugar"',
      onChange: function (e) {
        setBenefitInput(e.target.value);
      },
      onKeyDown: function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          addBenefit();
        }
      }
    }), React.createElement(Button, {
      variant: "outline",
      size: "sm",
      onClick: addBenefit
    }, "Add"))), /* main photo */
    React.createElement(Field, {
      label: "Main photo"
    }, p.photo ? React.createElement("div", {
      style: {
        display: "flex",
        gap: "12px",
        alignItems: "center"
      }
    }, React.createElement(Thumb, {
      src: p.photo,
      size: 96,
      onRemove: function () {
        set("photo", null);
      }
    }), React.createElement("span", {
      style: {
        fontSize: "0.82rem",
        color: "var(--muted-foreground)"
      }
    }, "Shown on cards & product page")) : React.createElement("div", null, React.createElement(DropZone, {
      small: true,
      onFiles: onMainFiles
    }), React.createElement(UrlAdd, {
      onAdd: function (u) {
        set("photo", u);
      }
    }))), /* gallery */
    React.createElement(Field, {
      label: "Gallery · extra photos"
    }, React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginBottom: "8px"
      }
    }, (p.gallery || []).map(function (g, i) {
      return React.createElement(Thumb, {
        key: i,
        src: g,
        onRemove: function () {
          set("gallery", p.gallery.filter(function (_, j) {
            return j !== i;
          }));
        }
      });
    })), React.createElement(DropZone, {
      onFiles: onGalleryFiles
    }), React.createElement(UrlAdd, {
      onAdd: function (u) {
        set("gallery", (p.gallery || []).concat(u));
      }
    })), /* toggles */
    React.createElement("div", {
      style: {
        display: "flex",
        gap: "20px",
        marginTop: "8px"
      }
    }, React.createElement(Toggle, {
      label: "In stock",
      on: p.in_stock,
      onChange: function (v) {
        set("in_stock", v);
      }
    }), React.createElement(Toggle, {
      label: "Featured on homepage",
      on: p.featured,
      onChange: function (v) {
        set("featured", v);
      }
    }))), /* footer */
    React.createElement("div", {
      style: {
        padding: "16px 24px",
        borderTop: "1px solid var(--border)",
        flex: "0 0 auto",
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        background: "var(--white)"
      }
    }, React.createElement(Button, {
      variant: "ghost",
      onClick: onCancel
    }, "Cancel"), React.createElement(Button, {
      variant: "forest",
      onClick: submit
    }, saving ? "Saving…" : initial && initial.id ? "Save changes" : "Add product")));
  }
  function Toggle(props) {
    return React.createElement("label", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        userSelect: "none"
      }
    }, React.createElement("span", {
      onClick: function () {
        props.onChange(!props.on);
      },
      style: {
        width: 42,
        height: 24,
        borderRadius: "999px",
        position: "relative",
        background: props.on ? "var(--forest)" : "var(--border)",
        transition: "background 150ms ease",
        flex: "0 0 auto"
      }
    }, React.createElement("span", {
      style: {
        position: "absolute",
        top: 3,
        left: props.on ? 21 : 3,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: "#fff",
        transition: "left 150ms ease",
        boxShadow: "0 1px 3px rgba(0,0,0,0.25)"
      }
    })), React.createElement("span", {
      style: {
        fontSize: "0.9rem",
        color: "var(--foreground)"
      }
    }, props.label));
  }
  window.MSProductForm = ProductForm;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "admin/admin-form.jsx", error: String((e && e.message) || e) }); }

// admin/config.js
try { (() => {
/* Mishthi Sattva — Admin panel config & Supabase helpers.
   Exposes window.MSAdmin. Plain JS (no build step). */
(function () {
  "use strict";

  const LS_KEY = "ms_admin_supabase";

  /* Fixed brand categories (mirror ui_kits/shop/data.js). */
  const CATEGORIES = [{
    id: "ayurvedic",
    name: "Ayurvedic & Health"
  }, {
    id: "spices",
    name: "Spices & Masala"
  }, {
    id: "hair",
    name: "Hair Care"
  }, {
    id: "beauty",
    name: "Beauty & Skincare"
  }, {
    id: "special",
    name: "Special Foods"
  }];
  const BUCKET = "product-photos";

  /* SQL the user runs once in the Supabase SQL editor. */
  const SETUP_SQL = `-- Mishthi Sattva admin — run once in Supabase SQL editor
create extension if not exists "pgcrypto";

create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    text not null,
  price       numeric,
  mrp         numeric,
  weight      text,
  short_desc  text,
  benefits    text[]  default '{}',
  photo       text,
  gallery     text[]  default '{}',
  in_stock    boolean default true,
  featured    boolean default false,
  sort_order  int     default 0,
  created_at  timestamptz default now()
);

alter table products enable row level security;

-- Prototype policies: anyone with the anon key can read & write.
drop policy if exists "ms_public_read"  on products;
drop policy if exists "ms_public_write" on products;
create policy "ms_public_read"  on products for select using (true);
create policy "ms_public_write" on products for all    using (true) with check (true);

-- Storage bucket for product photos (public read).
insert into storage.buckets (id, name, public)
values ('${BUCKET}', '${BUCKET}', true)
on conflict (id) do nothing;

drop policy if exists "ms_photos_read"  on storage.objects;
drop policy if exists "ms_photos_write" on storage.objects;
create policy "ms_photos_read"  on storage.objects for select
  using (bucket_id = '${BUCKET}');
create policy "ms_photos_write" on storage.objects for all
  using (bucket_id = '${BUCKET}') with check (bucket_id = '${BUCKET}');`;

  /* ---- credential storage ---- */
  function loadCreds() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "null");
    } catch (e) {
      return null;
    }
  }
  function saveCreds(url, key) {
    localStorage.setItem(LS_KEY, JSON.stringify({
      url: url.trim().replace(/\/+$/, ""),
      key: key.trim()
    }));
  }
  function clearCreds() {
    localStorage.removeItem(LS_KEY);
  }
  let _client = null;
  let _clientSig = "";
  function getClient() {
    const c = loadCreds();
    if (!c || !c.url || !c.key) return null;
    if (!window.supabase || !window.supabase.createClient) return null;
    const sig = c.url + "::" + c.key;
    if (_client && _clientSig === sig) return _client;
    _client = window.supabase.createClient(c.url, c.key);
    _clientSig = sig;
    return _client;
  }

  /* Quick connectivity check against the products table. */
  async function testConnection() {
    const client = getClient();
    if (!client) return {
      ok: false,
      error: "No credentials saved."
    };
    const {
      error
    } = await client.from("products").select("id").limit(1);
    if (error) return {
      ok: false,
      error: error.message
    };
    return {
      ok: true
    };
  }

  /* Seed data: the brand's real 21-product catalogue mapped to the schema. */
  const SEED = [["Shakti Laddu", "ayurvedic", 540, 600, "500 g", "Energy-rich laddus made with dry fruits, edible gum and jaggery — a traditional strength tonic with no refined sugar.", ["No Refined Sugar", "Dry Fruits & Gond", "Daily Strength"], true], ["Sampooran Laddu", "ayurvedic", 520, 560, "500 g", "A wholesome blend of seeds, nuts and Ayurvedic herbs bound in jaggery — nourishment in every bite.", ["Seeds & Nuts", "Herb-Infused", "Preservative-Free"], false], ["Sugar-Free Chyawanprash", "ayurvedic", 480, 540, "500 g", "A modern take on the 5,000-year-old recipe — slow-cooked with amla, herbs and natural sweeteners. Zero refined sugar.", ["Amla & 40+ Herbs", "Supports Immunity", "No Refined Sugar"], true], ["Herbal Heart Sip", "ayurvedic", 360, 400, "200 g", "A warming herbal infusion blended to support heart health and circulation. One spoon in hot water, daily.", ["Heart-Friendly", "Caffeine-Free", "Herbal Blend"], false], ["Healthy Namkeen Mix", "ayurvedic", 240, 280, "300 g", "Roasted, never fried — a guilt-free namkeen made with millets, lentils and gentle spices.", ["Roasted not Fried", "No Refined Oil", "High Fibre"], false], ["Ayurvedic Hair Oil", "ayurvedic", 320, 360, "200 ml", "Cold-infused with bhringraj, amla and curry leaf to nourish the scalp and strengthen roots.", ["Bhringraj & Amla", "Cold-Infused", "For All Hair Types"], false], ["Protein Sattu Drink", "ayurvedic", 290, 320, "400 g", "Roasted gram sattu, naturally high in protein and fibre. Mix sweet or savoury for an instant cooling drink.", ["Plant Protein", "Cooling", "No Additives"], false], ["Chat Masala", "spices", 120, 140, "100 g", "Tangy, zesty and freshly ground — the finishing touch for fruits, chaats and snacks.", ["Freshly Ground", "Tangy & Zesty", "No Colour Added"], false], ["Shinkaji Masala", "spices", 150, 170, "100 g", "A robust homestyle blend for hearty Punjabi gravies and dals.", ["Homestyle Blend", "Rich Aroma", "Small Batch"], false], ["Thandai Premix", "spices", 280, 320, "250 g", "Almonds, fennel, rose and saffron, ground for a festive cooling thandai. Just add milk.", ["Saffron & Rose", "Festive Favourite", "No Preservatives"], false], ["Shahi Garam Masala", "spices", 180, 200, "100 g", "A royal garam masala of whole spices roasted and stone-ground for deep, layered warmth.", ["Whole Spices", "Roasted & Ground", "Aromatic"], false], ["Ice Cream Premix", "spices", 260, 300, "200 g", "A rich, creamy ice-cream premix loaded with almonds, pistachios and cashews. Just add milk, churn and freeze.", ["Made with All Nuts", "Rich & Creamy", "Just Add Milk"], false], ["Shahi Sip & Scoop", "spices", 290, 330, "200 g", "A badam-milk premix that doubles as ice cream — drink it, freeze it, love it. No artificial creamers.", ["Badam Milk & Ice Cream", "No Artificial Creamers", "Just Add Milk"], false], ["Jaljeera Sattu", "spices", 180, 210, "250 g", "A cooling pudina-jaljeera sattu blend — instant, tasty and rich in protein. Just add water.", ["Cooling Pudina", "Rich in Protein", "Instant & Tasty"], false], ["Energy Sattu", "spices", 220, 250, "400 g", "Roasted gram sattu with jaggery for natural, sustained energy and no refined sugar.", ["Jaggery Sweetened", "Natural Energy", "No Refined Sugar"], false], ["Ayur Kesh Vash Shampoo", "hair", 340, 380, "200 ml", "A gentle herbal shampoo with shikakai and reetha — cleanses without stripping natural oils.", ["Shikakai & Reetha", "Sulphate-Free", "Gentle Cleanse"], false], ["Ayur Kesh Vardaan Oil", "hair", 360, 400, "200 ml", "An intensive hair-fall oil blend of bhringraj, brahmi and sesame for thicker, stronger hair.", ["Anti Hair-Fall", "Brahmi & Bhringraj", "Deep Nourishment"], false], ["Instant Ubtan Glow", "beauty", 420, 470, "50 g", "A brightening face pack for an instant, natural radiance — perfect before an occasion.", ["Instant Radiance", "Natural Actives", "All Skin Types"], false], ["Glow Radiance Cream", "beauty", 460, 520, "50 g", "A lightweight daily moisturiser with saffron and natural oils for soft, glowing skin.", ["Saffron Infused", "Daily Moisture", "Non-Greasy"], false], ["Vitamin C Serum", "beauty", 540, 600, "30 ml", "A brightening vitamin C serum that evens tone and adds a healthy glow over time.", ["Brightening", "Evens Tone", "Lightweight"], false], ["Paani Puri Combo", "special", 199, 230, "Kit · 24 pc", "Everything for a perfect paani puri party — crisp puris, masala and tangy paani mix.", ["Complete Kit", "Crispy Puris", "Party Favourite"], true], ["Mouth Freshener – Paan Delight", "special", 160, 180, "150 g", "A refreshing after-meal paan-style mouth freshener with gulkand and fennel.", ["Gulkand & Fennel", "After-Meal", "Naturally Sweet"], false]].map(function (r, i) {
    return {
      name: r[0],
      category: r[1],
      price: r[2],
      mrp: r[3],
      weight: r[4],
      short_desc: r[5],
      benefits: r[6],
      photo: null,
      gallery: [],
      in_stock: true,
      featured: r[8],
      sort_order: i
    };
  });
  function catName(id) {
    const c = CATEGORIES.find(function (x) {
      return x.id === id;
    });
    return c ? c.name : id;
  }
  function emptyProduct() {
    return {
      name: "",
      category: "ayurvedic",
      price: "",
      mrp: "",
      weight: "",
      short_desc: "",
      benefits: [],
      photo: null,
      gallery: [],
      in_stock: true,
      featured: false
    };
  }
  window.MSAdmin = {
    CATEGORIES: CATEGORIES,
    BUCKET: BUCKET,
    SETUP_SQL: SETUP_SQL,
    SEED: SEED,
    loadCreds: loadCreds,
    saveCreds: saveCreds,
    clearCreds: clearCreds,
    getClient: getClient,
    testConnection: testConnection,
    catName: catName,
    emptyProduct: emptyProduct
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "admin/config.js", error: String((e && e.message) || e) }); }

// components/brand/BenefitTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function Check() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12l5 5L20 7"
  }));
}
function Cross() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18"
  }));
}

/**
 * Benefit / promise row — a soft green card with a single forest icon
 * beside a label. Used in the "Why Choose Us" grid. `good={false}` marks a
 * "free-from" claim (e.g. No Refined Sugar) with a forest cross; `good`
 * (default) shows a tick. No red — this is a wellness brand.
 */
function BenefitTile({
  label,
  good = true,
  style = {},
  ...props
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      background: h ? "color-mix(in oklab, var(--primary) 12%, var(--card))" : "color-mix(in oklab, var(--primary) 7%, var(--card))",
      border: `1px solid color-mix(in oklab, var(--primary) ${h ? 28 : 16}%, transparent)`,
      borderRadius: "var(--radius-2xl)",
      padding: "1.25rem",
      boxShadow: h ? "var(--shadow-lg)" : "var(--shadow-sm)",
      transform: h ? "translateY(var(--lift))" : "translateY(0)",
      transition: "transform var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard), background var(--duration-base) var(--ease-standard)",
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      placeItems: "center",
      height: "2.75rem",
      width: "2.75rem",
      flexShrink: 0,
      borderRadius: "var(--radius-pill)",
      background: "color-mix(in oklab, var(--primary) 16%, transparent)",
      color: "var(--primary)"
    }
  }, good ? /*#__PURE__*/React.createElement(Check, null) : /*#__PURE__*/React.createElement(Cross, null)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-display)",
      fontSize: "var(--text-lg)",
      color: "var(--primary)"
    }
  }, label));
}
Object.assign(__ds_scope, { BenefitTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/BenefitTile.jsx", error: String((e && e.message) || e) }); }

// components/brand/FAQItem.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Accordion FAQ row. Display-serif question, gold +/× toggle, body answer.
 * Controlled via `defaultOpen` or left uncontrolled.
 */
function FAQItem({
  question,
  answer,
  defaultOpen = false,
  style = {}
}) {
  const [open, setOpen] = useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-2xl)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1rem",
      padding: "1.25rem",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-display)",
      fontSize: "var(--text-lg)",
      color: "var(--primary)"
    }
  }, question), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      placeItems: "center",
      height: "2rem",
      width: "2rem",
      flexShrink: 0,
      borderRadius: "var(--radius-pill)",
      background: "var(--secondary)",
      color: "var(--accent)",
      transform: open ? "rotate(45deg)" : "rotate(0)",
      transition: "transform var(--duration-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  })))), open && /*#__PURE__*/React.createElement("p", {
    style: {
      padding: "0 1.25rem 1.25rem",
      marginTop: "-0.25rem",
      color: "var(--foreground)",
      opacity: 0.8,
      lineHeight: "var(--leading-relaxed)"
    }
  }, answer));
}
Object.assign(__ds_scope, { FAQItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/FAQItem.jsx", error: String((e && e.message) || e) }); }

// components/brand/GoldDivider.jsx
try { (() => {
/**
 * The signature gold eyebrow used above every section heading,
 * e.g. "OUR STORY", "WHY CHOOSE US". Flanked by thin gold rules.
 */
function GoldDivider({
  children,
  align = "start",
  onDark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.625rem",
      color: onDark ? "var(--gold-soft)" : "var(--gold)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      fontWeight: "var(--weight-semibold)",
      ...style
    }
  }, align === "center" && /*#__PURE__*/React.createElement(Rule, null), children, /*#__PURE__*/React.createElement(Rule, null));
}
function Rule() {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: "1.75rem",
      height: "1px",
      background: "currentColor",
      opacity: 0.5
    }
  });
}
Object.assign(__ds_scope, { GoldDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/GoldDivider.jsx", error: String((e && e.message) || e) }); }

// components/brand/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function Leaf({
  size = 40
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17 4C9 4 4 9 4 17c0 1.7.3 3 .7 3 .4 0 .8-.8 1.4-2 2-4.2 5.6-7 10-7.6.6-.1.9.6.4.9-4.3 2.4-7.1 5.7-8.4 9.7-.3.8.7 1.3 1.3.7C13.9 17.5 20 14.5 20 7c0-1.7-1.3-3-3-3z"
  }));
}

/**
 * Product card for the catalogue grid. Leads with a 16:10 product image
 * (warm cream framed placeholder until a real photo is supplied), then the
 * product name in the display serif, a one-line description, and a quiet
 * forest "View Product" link pinned to the bottom so cards stay equal height.
 * Ordering happens inside the shop flow, not on the card.
 */
function ProductCard({
  name,
  description = "Small-batch · preservative-free · made fresh.",
  image,
  href = "#",
  cta = "View Product",
  style = {},
  ...props
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--card)",
      border: `1px solid ${h ? "var(--accent)" : "var(--border)"}`,
      borderRadius: "var(--radius-2xl)",
      overflow: "hidden",
      boxShadow: h ? "var(--shadow-xl)" : "var(--shadow-sm)",
      transform: h ? "translateY(var(--lift))" : "translateY(0)",
      transition: "transform var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard)",
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "1 / 1",
      background: image ? "var(--cream)" : "color-mix(in oklab, var(--secondary) 70%, var(--card))",
      borderBottom: "1px solid color-mix(in oklab, var(--accent) 22%, transparent)",
      display: "grid",
      placeItems: "center",
      overflow: "hidden",
      padding: 0
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      display: "block"
    }
  }), !image && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      placeItems: "center",
      gap: "0.5rem",
      color: "color-mix(in oklab, var(--accent) 65%, transparent)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Leaf, {
    size: 44
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "0.14em",
      textTransform: "uppercase"
    }
  }, "Photo coming soon"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      padding: "1.25rem 1.25rem 1.35rem"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-display)",
      fontSize: "var(--text-lg)",
      lineHeight: 1.15,
      color: "var(--primary)"
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0.4rem 0 0",
      fontSize: "var(--text-sm)",
      lineHeight: 1.4,
      color: "var(--muted-foreground)"
    }
  }, description), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: "1rem"
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.45rem",
      width: "100%",
      background: h ? "var(--primary)" : "transparent",
      color: h ? "var(--primary-foreground)" : "var(--primary)",
      border: "1px solid color-mix(in oklab, var(--primary) 45%, transparent)",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--weight-semibold)",
      fontSize: "var(--text-sm)",
      padding: "0.7rem 1rem",
      borderRadius: "var(--radius-pill)",
      lineHeight: 1,
      transition: "background var(--duration-base) var(--ease-standard), color var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard)"
    }
  }, cta, " ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192"))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/brand/Testimonial.jsx
try { (() => {
/**
 * Customer testimonial card — 5 gold stars, a display-serif quote,
 * and an attribution line (name + city).
 */
function Testimonial({
  quote,
  name,
  city,
  stars = 5,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-2xl)",
      padding: "1.75rem",
      boxShadow: "var(--shadow-sm)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "grid",
      placeItems: "center",
      height: "3rem",
      width: "3rem",
      flexShrink: 0,
      borderRadius: "var(--radius-pill)",
      background: "color-mix(in oklab, var(--accent) 16%, transparent)",
      color: "var(--accent)",
      fontFamily: "var(--font-display)",
      fontSize: "2.6rem",
      fontWeight: "var(--weight-display)",
      lineHeight: 0,
      paddingTop: "1.05rem"
    }
  }, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--accent)",
      letterSpacing: "0.15em",
      fontSize: "var(--text-base)"
    },
    "aria-label": `${stars} out of 5 stars`
  }, "★".repeat(stars))), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: "1rem 0 0",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-xl)",
      fontWeight: "var(--weight-medium)",
      lineHeight: "var(--leading-snug)",
      color: "var(--primary)"
    }
  }, "\u201C", quote, "\u201D"), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: "1.25rem",
      fontSize: "var(--text-sm)",
      color: "var(--muted-foreground)"
    }
  }, "\u2014 ", name, city ? `, ${city}` : ""));
}
Object.assign(__ds_scope, { Testimonial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Testimonial.jsx", error: String((e && e.message) || e) }); }

// components/brand/WhatsAppButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function WhatsAppGlyph({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 32 32",
    width: size,
    height: size,
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19.11 17.36c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.46-.83-2-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16 4C9.37 4 4 9.37 4 16c0 2.11.55 4.09 1.52 5.81L4 28l6.36-1.49A11.92 11.92 0 0 0 16 28c6.63 0 12-5.37 12-12S22.63 4 16 4z"
  }));
}

/**
 * The brand's signature ordering CTA — a green WhatsApp button.
 * Renders as an <a>; pass `message` to prefill the chat and `phone` to target.
 */
function WhatsAppButton({
  children = "Order on WhatsApp",
  message = "Namaste! I would like to order from Mishthi Sattva.",
  phone = "918557942246",
  size = "md",
  fullWidth = false,
  style = {},
  ...props
}) {
  const [hover, setHover] = useState(false);
  const sizes = {
    sm: {
      padding: "0.6rem 1.1rem",
      fontSize: "var(--text-sm)",
      glyph: 18
    },
    md: {
      padding: "0.875rem 1.5rem",
      fontSize: "var(--text-base)",
      glyph: 20
    },
    lg: {
      padding: "1rem 1.85rem",
      fontSize: "var(--text-lg)",
      glyph: 24
    }
  };
  const s = sizes[size];
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: "_blank",
    rel: "noopener noreferrer",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.625rem",
      width: fullWidth ? "100%" : "auto",
      background: "var(--whatsapp)",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--weight-semibold)",
      padding: s.padding,
      fontSize: s.fontSize,
      borderRadius: "var(--radius-pill)",
      lineHeight: 1,
      boxShadow: hover ? "0 18px 40px -10px color-mix(in oklab, var(--whatsapp) 55%, transparent)" : "var(--shadow-whatsapp)",
      transform: hover ? "translateY(-2px)" : "translateY(0)",
      transition: "transform var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)",
      ...style
    }
  }, props), /*#__PURE__*/React.createElement(WhatsAppGlyph, {
    size: s.glyph
  }), " ", children);
}
Object.assign(__ds_scope, { WhatsAppButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/WhatsAppButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small pill label. Use `tag` for category chips, `badge` for status dots.
 * Tones: gold (default), forest, soft, success, danger.
 */
function Badge({
  children,
  tone = "gold",
  variant = "soft",
  style = {},
  ...props
}) {
  const tones = {
    gold: {
      solid: {
        bg: "var(--gold)",
        fg: "var(--forest-deep)"
      },
      soft: {
        bg: "color-mix(in oklab, var(--gold) 18%, transparent)",
        fg: "color-mix(in oklab, var(--gold) 92%, black)"
      }
    },
    forest: {
      solid: {
        bg: "var(--primary)",
        fg: "var(--primary-foreground)"
      },
      soft: {
        bg: "var(--secondary)",
        fg: "var(--forest-deep)"
      }
    },
    success: {
      solid: {
        bg: "var(--success)",
        fg: "#fff"
      },
      soft: {
        bg: "color-mix(in oklab, var(--success) 16%, transparent)",
        fg: "color-mix(in oklab, var(--success) 75%, black)"
      }
    },
    danger: {
      solid: {
        bg: "var(--destructive)",
        fg: "#fff"
      },
      soft: {
        bg: "color-mix(in oklab, var(--destructive) 14%, transparent)",
        fg: "var(--destructive)"
      }
    },
    neutral: {
      solid: {
        bg: "var(--ink-700)",
        fg: "var(--cream)"
      },
      soft: {
        bg: "var(--muted)",
        fg: "var(--ink-700)"
      }
    }
  };
  const c = (tones[tone] || tones.gold)[variant] || tones.gold.soft;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      background: c.bg,
      color: c.fg,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      padding: "0.3rem 0.7rem",
      borderRadius: "var(--radius-pill)",
      lineHeight: 1.1,
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Mishthi Sattva primary button.
 * Variants: forest (primary), gold (accent), outline, ghost.
 * Pill-shaped, with a soft lift on hover — matching the brand's CTAs.
 */
function Button({
  children,
  variant = "forest",
  size = "md",
  as = "button",
  fullWidth = false,
  style = {},
  ...props
}) {
  const [hover, setHover] = useState(false);
  const sizes = {
    sm: {
      padding: "0.5rem 1rem",
      fontSize: "var(--text-sm)"
    },
    md: {
      padding: "0.75rem 1.5rem",
      fontSize: "var(--text-sm)"
    },
    lg: {
      padding: "0.9rem 1.85rem",
      fontSize: "var(--text-base)"
    }
  };
  const palettes = {
    forest: {
      background: hover ? "var(--forest-deep)" : "var(--primary)",
      color: "var(--primary-foreground)",
      border: "1px solid transparent",
      boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)"
    },
    gold: {
      background: hover ? "color-mix(in oklab, var(--gold) 86%, black)" : "var(--gold)",
      color: "var(--forest-deep)",
      border: "1px solid transparent",
      boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)"
    },
    outline: {
      background: hover ? "var(--primary)" : "transparent",
      color: hover ? "var(--primary-foreground)" : "var(--primary)",
      border: "1px solid color-mix(in oklab, var(--primary) 30%, transparent)",
      boxShadow: "none"
    },
    ghost: {
      background: hover ? "var(--secondary)" : "transparent",
      color: "var(--primary)",
      border: "1px solid transparent",
      boxShadow: "none"
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      width: fullWidth ? "100%" : "auto",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--weight-semibold)",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer",
      lineHeight: 1,
      transform: hover ? "translateY(-2px)" : "translateY(0)",
      transition: "transform var(--duration-base) var(--ease-standard), background var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard), color var(--duration-base) var(--ease-standard)",
      ...sizes[size],
      ...palettes[variant],
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Soft rounded surface card. Optional hover-lift (for interactive cards).
 * Padding scales: sm / md / lg.
 */
function Card({
  children,
  hover = false,
  padding = "md",
  as = "div",
  style = {},
  ...props
}) {
  const [h, setH] = useState(false);
  const pads = {
    none: 0,
    sm: "1.25rem",
    md: "1.75rem",
    lg: "2.25rem"
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    onMouseEnter: hover ? () => setH(true) : undefined,
    onMouseLeave: hover ? () => setH(false) : undefined,
    style: {
      background: "var(--card)",
      color: "var(--card-foreground)",
      border: `1px solid ${h ? "var(--accent)" : "var(--border)"}`,
      borderRadius: "var(--radius-2xl)",
      padding: pads[padding],
      boxShadow: h ? "var(--shadow-lg)" : "var(--shadow-sm)",
      transform: h ? "translateY(var(--lift))" : "translateY(0)",
      transition: "transform var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard)",
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Form text input with brand focus ring (gold). Supply `label` to render a
 * stacked uppercase label. Use `multiline` for a textarea.
 */
function Input({
  label,
  multiline = false,
  rows = 4,
  style = {},
  id,
  ...props
}) {
  const fieldId = id || (label ? `ms-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const field = {
    width: "100%",
    marginTop: label ? "0.5rem" : 0,
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--input)",
    background: "var(--background)",
    padding: "0.75rem 1rem",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--foreground)",
    outline: "none",
    transition: "border-color var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)",
    ...style
  };
  const onFocus = e => {
    e.target.style.borderColor = "var(--accent)";
    e.target.style.boxShadow = "0 0 0 3px color-mix(in oklab, var(--accent) 30%, transparent)";
  };
  const onBlur = e => {
    e.target.style.borderColor = "var(--input)";
    e.target.style.boxShadow = "none";
  };
  const control = multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    rows: rows,
    style: field,
    onFocus: onFocus,
    onBlur: onBlur
  }, props)) : /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    style: field,
    onFocus: onFocus,
    onBlur: onBlur
  }, props));
  if (!label) return control;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--primary)"
    }
  }, label), control);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shop/Shop.jsx
try { (() => {
/* Mishthi Sattva — Shop app shell & state.
   Cart, wishlist, search, filters, quick-view, cart drawer, checkout → WhatsApp.
   Composes ShopParts + design-system components. Exposes window.MSShop. */

(function () {
  const DS = window.MishthiSattvaDesignSystem_af8a45;
  const {
    Button,
    GoldDivider,
    Input
  } = DS;
  const {
    MS_CATEGORIES,
    MS_PRODUCTS
  } = window.MSShopData;
  const P = window.MSShopParts;
  const {
    I,
    money,
    catName,
    ProductCard,
    QuickView,
    Stepper,
    ProductMedia,
    Overlay
  } = P;
  const PHONE = "918557942246";
  const FREE_SHIP = 999;
  const LS_CART = "ms_shop_cart";
  const LS_WISH = "ms_shop_wish";
  const load = (k, d) => {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? d;
    } catch {
      return d;
    }
  };
  const SORTS = [{
    id: "featured",
    name: "Featured"
  }, {
    id: "price-asc",
    name: "Price: Low to High"
  }, {
    id: "price-desc",
    name: "Price: High to Low"
  }, {
    id: "rating",
    name: "Top Rated"
  }, {
    id: "new",
    name: "Newest"
  }];

  /* ===================== HEADER ===================== */
  function Header({
    count,
    wishCount,
    onCart,
    onSearch,
    search,
    onWish,
    onHome,
    onShopAll
  }) {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in oklab, var(--background) 88%, transparent)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--forest-deep)",
        color: "var(--cream)",
        fontSize: 12,
        letterSpacing: "0.08em",
        textAlign: "center",
        padding: "7px 12px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(I.gift, {
      s: 15
    }), " Free home delivery on orders over ", money(FREE_SHIP), " \xB7 Complimentary gift this month")), /*#__PURE__*/React.createElement("div", {
      className: "shop-head",
      style: {
        maxWidth: 1280,
        margin: "0 auto",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 20
      }
    }, /*#__PURE__*/React.createElement("a", {
      onClick: onHome,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/mishthi-logo.png",
      alt: "Mishthi Sattva",
      style: {
        height: 44,
        width: 44,
        objectFit: "contain",
        borderRadius: 8
      }
    }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 18,
        letterSpacing: "0.02em",
        color: "var(--primary)",
        lineHeight: 1
      }
    }, "MISHTHI SATTVA"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        marginTop: 3,
        fontSize: 9,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.26em",
        color: "var(--accent)"
      }
    }, "Pure \xB7 Hygienic \xB7 Homemade"))), /*#__PURE__*/React.createElement("div", {
      className: "shop-search",
      style: {
        flex: 1,
        maxWidth: 460,
        marginInline: "auto",
        position: "relative",
        display: "flex",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 16,
        color: "var(--ink-300)"
      }
    }, /*#__PURE__*/React.createElement(I.search, {
      s: 18
    })), /*#__PURE__*/React.createElement("input", {
      value: search,
      onChange: e => onSearch(e.target.value),
      placeholder: "Search laddus, masala, hair oil\u2026",
      style: {
        width: "100%",
        padding: "11px 16px 11px 44px",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border)",
        background: "var(--card)",
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        color: "var(--foreground)",
        outline: "none"
      },
      onFocus: e => {
        e.target.style.borderColor = "var(--accent)";
        e.target.style.boxShadow = "0 0 0 3px color-mix(in oklab, var(--accent) 25%, transparent)";
      },
      onBlur: e => {
        e.target.style.borderColor = "var(--border)";
        e.target.style.boxShadow = "none";
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(IconBtn, {
      onClick: onWish,
      label: "Wishlist",
      badge: wishCount
    }, /*#__PURE__*/React.createElement(I.heart, {
      s: 20
    })), /*#__PURE__*/React.createElement(IconBtn, {
      onClick: onCart,
      label: "Cart",
      badge: count,
      highlight: true
    }, /*#__PURE__*/React.createElement(I.bag, {
      s: 21
    })))));
  }
  function IconBtn({
    children,
    onClick,
    label,
    badge,
    highlight
  }) {
    const [h, setH] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      "aria-label": label,
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      style: {
        position: "relative",
        height: 44,
        width: 44,
        display: "grid",
        placeItems: "center",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border)",
        background: h || highlight ? "var(--primary)" : "var(--card)",
        color: h || highlight ? "var(--primary-foreground)" : "var(--primary)",
        cursor: "pointer",
        transition: "all .18s"
      }
    }, children, badge > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: -5,
        right: -5,
        minWidth: 19,
        height: 19,
        padding: "0 5px",
        display: "grid",
        placeItems: "center",
        borderRadius: "var(--radius-pill)",
        background: "var(--accent)",
        color: "var(--forest-deep)",
        fontSize: 11,
        fontWeight: 800,
        border: "2px solid var(--background)"
      }
    }, badge));
  }

  /* ===================== HERO ===================== */
  function Hero({
    onShopAll,
    onCategory
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: "relative",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        background: "radial-gradient(55% 60% at 82% 8%, color-mix(in oklab, var(--gold) 20%, transparent), transparent), radial-gradient(50% 60% at -5% 100%, color-mix(in oklab, var(--forest) 14%, transparent), transparent)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "shop-hero",
      style: {
        position: "relative",
        maxWidth: 1280,
        margin: "0 auto",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement(GoldDivider, null, "Ayurvedic \xB7 Satvic \xB7 Homemade"), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: "18px 0 0",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "clamp(34px, 5.4vw, 52px)",
        lineHeight: 1.08,
        letterSpacing: "-0.01em",
        color: "var(--primary)"
      }
    }, "The Homemade", /*#__PURE__*/React.createElement("br", null), "Wellness Shop.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        fontStyle: "italic",
        color: "var(--accent)"
      }
    }, "Pure, by nature.")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "18px 0 0",
        maxWidth: 520,
        fontSize: 17,
        lineHeight: 1.6,
        color: "var(--muted-foreground)"
      }
    }, MS_PRODUCTS.length, " small-batch products from our home kitchen in Kotkapura \u2014 laddus, sugar-free chyawanprash, masalas, hair care & skincare. No refined sugar, no preservatives."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 26,
        display: "flex",
        flexWrap: "wrap",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "forest",
      size: "lg",
      onClick: onShopAll
    }, "Shop All Products \u2192"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "lg",
      onClick: () => onCategory("ayurvedic")
    }, "Explore Ayurvedic")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 30,
        display: "flex",
        flexWrap: "wrap",
        gap: "10px 26px"
      }
    }, [["truck", "Home delivery"], ["shield", "100% homemade"], ["leaf", "No preservatives"]].map(([ic, t]) => /*#__PURE__*/React.createElement("span", {
      key: t,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        fontWeight: 600,
        color: "var(--primary)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--accent)"
      }
    }, I[ic]({
      s: 18
    })), t)))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: -20,
        borderRadius: 32,
        background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 22%, transparent), color-mix(in oklab, var(--forest) 12%, transparent))",
        filter: "blur(38px)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        overflow: "hidden",
        borderRadius: 32,
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-xl)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/hero-products.jpg",
      alt: "Mishthi Sattva products",
      style: {
        width: "100%",
        display: "block"
      }
    })))));
  }

  /* ===================== CATEGORY RAIL ===================== */
  function CategoryRail({
    active,
    onCategory
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 24px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(CatChip, {
      label: "All Products",
      on: active === "all",
      onClick: () => onCategory("all"),
      tint: "var(--forest)"
    }), MS_CATEGORIES.map(c => /*#__PURE__*/React.createElement(CatChip, {
      key: c.id,
      label: c.name,
      on: active === c.id,
      onClick: () => onCategory(c.id),
      tint: c.tint,
      count: MS_PRODUCTS.filter(p => p.cat === c.id).length
    }))));
  }
  function CatChip({
    label,
    on,
    onClick,
    tint,
    count
  }) {
    const [h, setH] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
        padding: "16px 16px",
        borderRadius: "var(--radius-xl)",
        cursor: "pointer",
        textAlign: "left",
        border: `1px solid ${on ? "var(--primary)" : h ? "var(--accent)" : "var(--border)"}`,
        background: on ? "var(--primary)" : "var(--card)",
        color: on ? "var(--primary-foreground)" : "var(--primary)",
        transition: "all .18s"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        height: 34,
        width: 34,
        display: "grid",
        placeItems: "center",
        borderRadius: "var(--radius-pill)",
        background: on ? "color-mix(in oklab, var(--cream) 20%, transparent)" : "color-mix(in oklab, " + tint + " 16%, transparent)",
        color: on ? "var(--cream)" : tint
      }
    }, /*#__PURE__*/React.createElement(I.leaf, {
      s: 18
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 15,
        lineHeight: 1.1
      }
    }, label), count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        opacity: 0.7
      }
    }, count, " items"), count == null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        opacity: 0.7
      }
    }, MS_PRODUCTS.length, " items"));
  }

  /* ===================== TOOLBAR (sort + count) ===================== */
  function Toolbar({
    count,
    sort,
    onSort,
    title,
    sub
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 34,
        color: "var(--primary)"
      }
    }, title), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 4,
        fontSize: 14,
        color: "var(--muted-foreground)"
      }
    }, sub || `${count} ${count === 1 ? "product" : "products"}`)), /*#__PURE__*/React.createElement("label", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontSize: 13,
        color: "var(--muted-foreground)"
      }
    }, "Sort", /*#__PURE__*/React.createElement("select", {
      value: sort,
      onChange: e => onSort(e.target.value),
      style: {
        padding: "9px 14px",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border)",
        background: "var(--card)",
        fontFamily: "var(--font-sans)",
        fontSize: 13,
        fontWeight: 600,
        color: "var(--primary)",
        cursor: "pointer"
      }
    }, SORTS.map(s => /*#__PURE__*/React.createElement("option", {
      key: s.id,
      value: s.id
    }, s.name)))));
  }

  /* ===================== CART DRAWER ===================== */
  function CartDrawer({
    items,
    onClose,
    onQty,
    onRemove,
    onCheckout,
    subtotal
  }) {
    const remaining = Math.max(0, FREE_SHIP - subtotal);
    const pct = Math.min(100, subtotal / FREE_SHIP * 100);
    return /*#__PURE__*/React.createElement(Overlay, {
      onClose: onClose,
      align: "end"
    }, /*#__PURE__*/React.createElement("aside", {
      onClick: e => e.stopPropagation(),
      style: {
        width: "min(440px, 96vw)",
        height: "100%",
        background: "var(--background)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--shadow-xl)",
        animation: "msslide .25s var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "20px 22px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 22,
        color: "var(--primary)"
      }
    }, "Your Cart (", items.reduce((n, i) => n + i.qty, 0), ")"), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      "aria-label": "Close",
      style: {
        height: 36,
        width: 36,
        display: "grid",
        placeItems: "center",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border)",
        background: "var(--card)",
        color: "var(--primary)",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(I.close, null))), items.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "grid",
        placeItems: "center",
        padding: 32,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        placeItems: "center",
        height: 80,
        width: 80,
        margin: "0 auto",
        borderRadius: "var(--radius-pill)",
        background: "var(--secondary)",
        color: "var(--accent)"
      }
    }, /*#__PURE__*/React.createElement(I.bag, {
      s: 36
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 16,
        fontFamily: "var(--font-display)",
        fontSize: 22,
        color: "var(--primary)"
      }
    }, "Your cart is empty"), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 6,
        fontSize: 14,
        color: "var(--muted-foreground)"
      }
    }, "Add some homemade goodness to get started."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "forest",
      onClick: onClose
    }, "Continue Shopping")))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "14px 22px",
        borderBottom: "1px solid var(--border)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12.5,
        color: "var(--muted-foreground)",
        display: "flex",
        alignItems: "center",
        gap: 7
      }
    }, /*#__PURE__*/React.createElement(I.truck, {
      s: 16
    }), remaining > 0 ? /*#__PURE__*/React.createElement("span", null, "Add ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--primary)"
      }
    }, money(remaining)), " more for free delivery") : /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--success)",
        fontWeight: 600
      }
    }, "You've unlocked free delivery!")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        height: 6,
        borderRadius: 99,
        background: "var(--secondary)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: pct + "%",
        background: "linear-gradient(90deg, var(--gold), var(--whatsapp))",
        transition: "width .3s"
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: "auto",
        padding: "8px 22px"
      }
    }, items.map(it => /*#__PURE__*/React.createElement("div", {
      key: it.id,
      style: {
        display: "flex",
        gap: 12,
        padding: "14px 0",
        borderBottom: "1px solid var(--border)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 72,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(ProductMedia, {
      product: it,
      height: 72,
      round: 12
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 16,
        color: "var(--primary)",
        lineHeight: 1.2
      }
    }, it.name), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 2,
        fontSize: 12,
        color: "var(--muted-foreground)"
      }
    }, it.weight, " \xB7 ", money(it.price)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Stepper, {
      value: it.qty,
      onChange: q => onQty(it.id, q),
      size: "sm"
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => onRemove(it.id),
      "aria-label": "Remove",
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        border: "none",
        background: "transparent",
        color: "var(--ink-300)",
        fontSize: 12,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(I.trash, {
      s: 15
    })))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 17,
        color: "var(--primary)"
      }
    }, money(it.price * it.qty))))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "18px 22px",
        borderTop: "1px solid var(--border)",
        background: "var(--card)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--muted-foreground)",
        fontSize: 14
      }
    }, "Subtotal"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 24,
        color: "var(--primary)"
      }
    }, money(subtotal))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--muted-foreground)",
        marginBottom: 14
      }
    }, "Delivery & taxes confirmed on WhatsApp."), /*#__PURE__*/React.createElement("button", {
      onClick: onCheckout,
      style: {
        width: "100%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "14px",
        borderRadius: "var(--radius-pill)",
        border: "none",
        background: "var(--primary)",
        color: "var(--primary-foreground)",
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 15,
        cursor: "pointer"
      }
    }, "Checkout \u2192")))));
  }

  /* ===================== CHECKOUT ===================== */
  function Checkout({
    items,
    subtotal,
    onClose,
    onBack,
    onPlaced
  }) {
    const [form, setForm] = React.useState({
      name: "",
      phone: "",
      address: "",
      city: "Kotkapura",
      note: ""
    });
    const [done, setDone] = React.useState(false);
    const set = k => e => setForm(f => ({
      ...f,
      [k]: e.target.value
    }));
    const ship = subtotal >= FREE_SHIP || subtotal === 0 ? 0 : 49;
    const total = subtotal + ship;
    const valid = form.name.trim() && form.phone.trim().length >= 10 && form.address.trim();
    const placeOrder = () => {
      const lines = items.map(it => `• ${it.name} (${it.weight}) × ${it.qty} — ${money(it.price * it.qty)}`).join("\n");
      const msg = `Namaste Mishthi Sattva! 🌿 I'd like to place an order:\n\n${lines}\n\nSubtotal: ${money(subtotal)}\nDelivery: ${ship === 0 ? "Free" : money(ship)}\nTotal: ${money(total)}\n\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}, ${form.city}${form.note ? `\nNote: ${form.note}` : ""}`;
      window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
      setDone(true);
    };
    return /*#__PURE__*/React.createElement(Overlay, {
      onClose: onClose,
      align: "center"
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => e.stopPropagation(),
      style: {
        width: "min(820px, 95vw)",
        maxHeight: "92vh",
        overflow: "auto",
        background: "var(--background)",
        borderRadius: "var(--radius-3xl)",
        boxShadow: "var(--shadow-xl)",
        border: "1px solid var(--border)"
      }
    }, done ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "56px 40px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        placeItems: "center",
        height: 84,
        width: 84,
        margin: "0 auto",
        borderRadius: "var(--radius-pill)",
        background: "var(--success)",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement(I.check, {
      s: 42
    })), /*#__PURE__*/React.createElement("h2", {
      style: {
        marginTop: 22,
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 36,
        color: "var(--primary)"
      }
    }, "Order sent on WhatsApp!"), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 12,
        maxWidth: 460,
        marginInline: "auto",
        fontSize: 16,
        lineHeight: 1.6,
        color: "var(--muted-foreground)"
      }
    }, "We've opened a WhatsApp chat with your order summary. Send it to us and we'll confirm availability, delivery time and payment. Dhanyavaad! \uD83D\uDE4F"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 26
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "forest",
      size: "lg",
      onClick: onPlaced
    }, "Continue Shopping"))) : /*#__PURE__*/React.createElement("div", {
      className: "shop-checkout",
      style: {
        display: "grid"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 32
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        border: "none",
        background: "transparent",
        color: "var(--muted-foreground)",
        fontSize: 13,
        cursor: "pointer",
        marginBottom: 8
      }
    }, "\u2190 Back to cart"), /*#__PURE__*/React.createElement(GoldDivider, null, "Checkout"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: "14px 0 0",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 30,
        color: "var(--primary)"
      }
    }, "Delivery details"), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 6,
        fontSize: 14,
        color: "var(--muted-foreground)"
      }
    }, "We confirm every order personally on WhatsApp \u2014 no online payment needed now."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 22,
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Full Name",
      placeholder: "Your name",
      value: form.name,
      onChange: set("name")
    }), /*#__PURE__*/React.createElement(Input, {
      label: "WhatsApp Number",
      type: "tel",
      placeholder: "10-digit mobile",
      value: form.phone,
      onChange: set("phone")
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Delivery Address",
      multiline: true,
      rows: 2,
      placeholder: "House / street / area",
      value: form.address,
      onChange: set("address")
    }), /*#__PURE__*/React.createElement(Input, {
      label: "City",
      value: form.city,
      onChange: set("city")
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Order Note (optional)",
      placeholder: "Any preferences or gift message",
      value: form.note,
      onChange: set("note")
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 32,
        background: "var(--card)",
        borderLeft: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 20,
        color: "var(--primary)"
      }
    }, "Order summary"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        flex: 1,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, items.map(it => /*#__PURE__*/React.createElement("div", {
      key: it.id,
      style: {
        display: "flex",
        justifyContent: "space-between",
        gap: 8,
        fontSize: 13.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--foreground)"
      }
    }, it.name, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--muted-foreground)"
      }
    }, "\xD7 ", it.qty)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: "var(--primary)"
      }
    }, money(it.price * it.qty))))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        paddingTop: 14,
        borderTop: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        gap: 7,
        fontSize: 14
      }
    }, /*#__PURE__*/React.createElement(Row, {
      k: "Subtotal",
      v: money(subtotal)
    }), /*#__PURE__*/React.createElement(Row, {
      k: "Delivery",
      v: ship === 0 ? "Free" : money(ship),
      accent: ship === 0
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 6,
        paddingTop: 10,
        borderTop: "1px dashed var(--border)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: "var(--primary)"
      }
    }, "Total"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 26,
        color: "var(--primary)"
      }
    }, money(total)))), /*#__PURE__*/React.createElement("button", {
      onClick: placeOrder,
      disabled: !valid,
      style: {
        marginTop: 18,
        width: "100%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        padding: "15px",
        borderRadius: "var(--radius-pill)",
        border: "none",
        background: valid ? "var(--whatsapp)" : "var(--muted)",
        color: valid ? "#fff" : "var(--muted-foreground)",
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 15,
        cursor: valid ? "pointer" : "not-allowed",
        boxShadow: valid ? "var(--shadow-whatsapp)" : "none"
      }
    }, /*#__PURE__*/React.createElement(I.wa, {
      s: 20
    }), " Place Order on WhatsApp"), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 10,
        fontSize: 11.5,
        textAlign: "center",
        color: "var(--muted-foreground)"
      }
    }, "By placing the order you'll be taken to WhatsApp to confirm.")))));
  }
  function Row({
    k,
    v,
    accent
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--muted-foreground)"
      }
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: accent ? "var(--success)" : "var(--primary)"
      }
    }, v));
  }

  /* ===================== TOASTS ===================== */
  function Toasts({
    toasts
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        bottom: 22,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 120,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        pointerEvents: "none"
      }
    }, toasts.map(t => /*#__PURE__*/React.createElement("div", {
      key: t.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "var(--forest-deep)",
        color: "var(--cream)",
        padding: "12px 18px",
        borderRadius: "var(--radius-pill)",
        boxShadow: "var(--shadow-lg)",
        fontSize: 14,
        fontWeight: 500,
        animation: "mstoast .3s var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "grid",
        placeItems: "center",
        height: 22,
        width: 22,
        borderRadius: "var(--radius-pill)",
        background: "var(--success)",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement(I.check, {
      s: 14
    })), t.msg)));
  }

  /* ===================== FOOTER ===================== */
  function Footer() {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        marginTop: 80,
        background: "var(--primary)",
        color: "var(--primary-foreground)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1280,
        margin: "0 auto",
        padding: "56px 24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 36
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/mishthi-logo.png",
      alt: "Mishthi Sattva",
      style: {
        height: 52,
        width: 52,
        objectFit: "contain",
        borderRadius: 8
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 19
      }
    }, "MISHTHI SATTVA"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 9,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.26em",
        color: "var(--accent)"
      }
    }, "Pure \xB7 Hygienic \xB7 Homemade"))), /*#__PURE__*/React.createElement("p", {
      className: "ms-hindi",
      style: {
        marginTop: 16,
        maxWidth: 300,
        fontSize: 14,
        color: "color-mix(in oklab, var(--cream) 72%, transparent)"
      }
    }, "\u0918\u0930 \u0915\u0940 \u0930\u0938\u094B\u0908 \u0938\u0947\u2026 \u0906\u092A\u0915\u0947 \u092A\u0930\u093F\u0935\u093E\u0930 \u0915\u0940 \u0938\u0947\u0939\u0924 \u0924\u0915\u0964")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: "var(--accent)",
        marginBottom: 14
      }
    }, "Shop"), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 9,
        fontSize: 14,
        color: "color-mix(in oklab, var(--cream) 82%, transparent)"
      }
    }, MS_CATEGORIES.map(c => /*#__PURE__*/React.createElement("li", {
      key: c.id
    }, c.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: "var(--accent)",
        marginBottom: 14
      }
    }, "Contact"), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 9,
        fontSize: 14,
        color: "color-mix(in oklab, var(--cream) 82%, transparent)"
      }
    }, /*#__PURE__*/React.createElement("li", null, "\uD83D\uDCDE 8557942246"), /*#__PURE__*/React.createElement("li", null, "\uD83D\uDCCD Kotkapura, Punjab"), /*#__PURE__*/React.createElement("li", null, "\uD83D\uDE9A Home delivery available")))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid color-mix(in oklab, var(--cream) 12%, transparent)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1280,
        margin: "0 auto",
        padding: "18px 24px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 8,
        fontSize: 12,
        color: "color-mix(in oklab, var(--cream) 60%, transparent)"
      }
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " Mishthi Sattva. All rights reserved."), /*#__PURE__*/React.createElement("span", null, "Crafted with love in Kotkapura, Punjab."))));
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
    React.useEffect(() => {
      localStorage.setItem(LS_CART, JSON.stringify(cart));
    }, [cart]);
    React.useEffect(() => {
      localStorage.setItem(LS_WISH, JSON.stringify(wish));
    }, [wish]);
    const toast = msg => {
      const id = Date.now() + Math.random();
      setToasts(t => [...t, {
        id,
        msg
      }]);
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2200);
    };
    const addToCart = (product, qty = 1) => {
      setCart(c => {
        const ex = c.find(i => i.id === product.id);
        if (ex) return c.map(i => i.id === product.id ? {
          ...i,
          qty: i.qty + qty
        } : i);
        const {
          id,
          name,
          price,
          weight,
          cat,
          photo,
          mrp
        } = product;
        return [...c, {
          id,
          name,
          price,
          weight,
          cat,
          photo,
          mrp,
          qty
        }];
      });
      toast(`${product.name} added to cart`);
    };
    const setQty = (id, qty) => setCart(c => c.map(i => i.id === id ? {
      ...i,
      qty
    } : i));
    const removeItem = id => setCart(c => c.filter(i => i.id !== id));
    const toggleWish = id => setWish(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
    const subtotal = cart.reduce((n, i) => n + i.price * i.qty, 0);
    const count = cart.reduce((n, i) => n + i.qty, 0);
    const goCategory = c => {
      setCat(c);
      setSearch("");
      setTimeout(() => gridRef.current && window.scrollTo({
        top: gridRef.current.offsetTop - 80,
        behavior: "smooth"
      }), 0);
    };
    const shopAll = () => goCategory("all");
    let list = MS_PRODUCTS.filter(p => (cat === "all" || p.cat === cat) && (!search || (p.name + " " + p.desc + " " + catName(p.cat)).toLowerCase().includes(search.toLowerCase())));
    const wishList = MS_PRODUCTS.filter(p => wish.includes(p.id));
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "new") return (b.tags.includes("new") ? 1 : 0) - (a.tags.includes("new") ? 1 : 0);
      return (b.tags.includes("bestseller") ? 1 : 0) - (a.tags.includes("bestseller") ? 1 : 0);
    });
    const title = search ? `Results for "${search}"` : cat === "all" ? "All Products" : catName(cat);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100vh",
        background: "var(--background)",
        color: "var(--foreground)"
      }
    }, /*#__PURE__*/React.createElement(Header, {
      count: count,
      wishCount: wish.length,
      search: search,
      onSearch: setSearch,
      onCart: () => setView("cart"),
      onWish: () => setView("wishlist"),
      onHome: shopAll,
      onShopAll: shopAll
    }), /*#__PURE__*/React.createElement(Hero, {
      onShopAll: shopAll,
      onCategory: goCategory
    }), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: "8px 0 4px"
      }
    }, /*#__PURE__*/React.createElement(CategoryRail, {
      active: cat,
      onCategory: goCategory
    })), /*#__PURE__*/React.createElement("section", {
      ref: gridRef,
      style: {
        maxWidth: 1280,
        margin: "0 auto",
        padding: "40px 24px 0"
      }
    }, /*#__PURE__*/React.createElement(Toolbar, {
      count: list.length,
      sort: sort,
      onSort: setSort,
      title: title
    }), list.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "60px 0",
        textAlign: "center",
        color: "var(--muted-foreground)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        placeItems: "center",
        height: 70,
        width: 70,
        margin: "0 auto",
        borderRadius: "var(--radius-pill)",
        background: "var(--secondary)",
        color: "var(--accent)"
      }
    }, /*#__PURE__*/React.createElement(I.search, {
      s: 30
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 16,
        fontFamily: "var(--font-display)",
        fontSize: 22,
        color: "var(--primary)"
      }
    }, "No products found"), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 6
      }
    }, "Try another search or browse all products."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      onClick: shopAll
    }, "View All Products"))) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(228px, 1fr))",
        gap: 18
      }
    }, list.map(p => /*#__PURE__*/React.createElement(ProductCard, {
      key: p.id,
      product: p,
      onOpen: setQuick,
      onAdd: addToCart,
      onToggleWish: toggleWish,
      wished: wish.includes(p.id)
    })))), /*#__PURE__*/React.createElement(Footer, null), quick && /*#__PURE__*/React.createElement(QuickView, {
      product: quick,
      onClose: () => setQuick(null),
      onAdd: addToCart,
      onToggleWish: toggleWish,
      wished: wish.includes(quick.id)
    }), view === "cart" && /*#__PURE__*/React.createElement(CartDrawer, {
      items: cart,
      subtotal: subtotal,
      onClose: () => setView(null),
      onQty: setQty,
      onRemove: removeItem,
      onCheckout: () => setView("checkout")
    }), view === "checkout" && /*#__PURE__*/React.createElement(Checkout, {
      items: cart,
      subtotal: subtotal,
      onClose: () => setView(null),
      onBack: () => setView("cart"),
      onPlaced: () => {
        setCart([]);
        setView(null);
      }
    }), view === "wishlist" && /*#__PURE__*/React.createElement(WishlistDrawer, {
      items: wishList,
      onClose: () => setView(null),
      onAdd: addToCart,
      onToggleWish: toggleWish,
      onOpen: p => {
        setView(null);
        setQuick(p);
      }
    }), /*#__PURE__*/React.createElement(Toasts, {
      toasts: toasts
    }));
  }

  /* ===================== WISHLIST DRAWER ===================== */
  function WishlistDrawer({
    items,
    onClose,
    onAdd,
    onToggleWish,
    onOpen
  }) {
    return /*#__PURE__*/React.createElement(Overlay, {
      onClose: onClose,
      align: "end"
    }, /*#__PURE__*/React.createElement("aside", {
      onClick: e => e.stopPropagation(),
      style: {
        width: "min(440px, 96vw)",
        height: "100%",
        background: "var(--background)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--shadow-xl)",
        animation: "msslide .25s var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "20px 22px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 22,
        color: "var(--primary)"
      }
    }, "Wishlist (", items.length, ")"), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      "aria-label": "Close",
      style: {
        height: 36,
        width: 36,
        display: "grid",
        placeItems: "center",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border)",
        background: "var(--card)",
        color: "var(--primary)",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(I.close, null))), items.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "grid",
        placeItems: "center",
        padding: 32,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        placeItems: "center",
        height: 80,
        width: 80,
        margin: "0 auto",
        borderRadius: "var(--radius-pill)",
        background: "var(--secondary)",
        color: "var(--destructive)"
      }
    }, /*#__PURE__*/React.createElement(I.heart, {
      s: 36
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 16,
        fontFamily: "var(--font-display)",
        fontSize: 22,
        color: "var(--primary)"
      }
    }, "No saved items yet"), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 6,
        fontSize: 14,
        color: "var(--muted-foreground)"
      }
    }, "Tap the heart on any product to save it here."))) : /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: "auto",
        padding: "8px 22px"
      }
    }, items.map(it => /*#__PURE__*/React.createElement("div", {
      key: it.id,
      style: {
        display: "flex",
        gap: 12,
        padding: "14px 0",
        borderBottom: "1px solid var(--border)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 72,
        flexShrink: 0,
        cursor: "pointer"
      },
      onClick: () => onOpen(it)
    }, /*#__PURE__*/React.createElement(ProductMedia, {
      product: it,
      height: 72,
      round: 12
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("p", {
      onClick: () => onOpen(it),
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 16,
        color: "var(--primary)",
        lineHeight: 1.2,
        cursor: "pointer"
      }
    }, it.name), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 2,
        fontSize: 13,
        color: "var(--primary)",
        fontWeight: 600
      }
    }, money(it.price), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--muted-foreground)",
        fontWeight: 400
      }
    }, "\xB7 ", it.weight)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onAdd(it, 1),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 13px",
        borderRadius: "var(--radius-pill)",
        border: "none",
        background: "var(--primary)",
        color: "var(--primary-foreground)",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(I.bag, {
      s: 15
    }), " Add"), /*#__PURE__*/React.createElement("button", {
      onClick: () => onToggleWish(it.id),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "7px 11px",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border)",
        background: "var(--card)",
        color: "var(--ink-500)",
        fontSize: 13,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(I.trash, {
      s: 14
    }), " Remove"))))))));
  }
  window.MSShop = {
    Shop
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shop/Shop.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shop/ShopParts.jsx
try { (() => {
/* Mishthi Sattva — Shop presentational parts.
   Stateless UI: icons, product media, cards, quick-view, cart & checkout
   panels, toasts, header, hero. State + handlers come from Shop.jsx.
   Exposes window.MSShopParts. */

(function () {
  const DS = window.MishthiSattvaDesignSystem_af8a45;
  const {
    Button,
    Badge,
    GoldDivider,
    Input
  } = DS;
  const {
    MS_CATEGORIES
  } = window.MSShopData;
  const ASSET = "../../assets";
  const money = n => "₹" + n.toLocaleString("en-IN");
  const catName = id => (MS_CATEGORIES.find(c => c.id === id) || {}).name || id;
  const catTint = id => (MS_CATEGORIES.find(c => c.id === id) || {}).tint || "var(--forest)";

  /* ---------------- icons ---------------- */
  const I = {
    search: p => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: p.s || 20,
      height: p.s || 20,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 21l-4.3-4.3"
    })),
    bag: p => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: p.s || 22,
      height: p.s || 22,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 8h12l-1 12H7L6 8z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 8V6a3 3 0 0 1 6 0v2"
    })),
    heart: p => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: p.s || 20,
      height: p.s || 20,
      fill: p.fill || "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 20s-7-4.6-9.3-9C1 7.7 2.6 4.5 5.8 4.5c2 0 3.3 1.2 4.2 2.6.9-1.4 2.2-2.6 4.2-2.6 3.2 0 4.8 3.2 3.1 6.5C19 15.4 12 20 12 20z"
    })),
    plus: p => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: p.s || 16,
      height: p.s || 16,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.4",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14"
    })),
    minus: p => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: p.s || 16,
      height: p.s || 16,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.4",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14"
    })),
    close: p => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: p.s || 20,
      height: p.s || 20,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 6l12 12M18 6L6 18"
    })),
    trash: p => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: p.s || 16,
      height: p.s || 16,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13"
    })),
    check: p => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: p.s || 16,
      height: p.s || 16,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M5 12l5 5L20 7"
    })),
    leaf: p => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: p.s || 18,
      height: p.s || 18,
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M17 4C9 4 4 9 4 17c0 1.7.3 3 .7 3 .4 0 .8-.8 1.4-2 2-4.2 5.6-7 10-7.6.6-.1.9.6.4.9-4.3 2.4-7.1 5.7-8.4 9.7-.3.8.7 1.3 1.3.7C13.9 17.5 20 14.5 20 7c0-1.7-1.3-3-3-3z"
    })),
    truck: p => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: p.s || 22,
      height: p.s || 22,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 6h11v9H3zM14 9h4l3 3v3h-7z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "7",
      cy: "18",
      r: "1.6"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "17",
      cy: "18",
      r: "1.6"
    })),
    gift: p => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: p.s || 22,
      height: p.s || 22,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 11h16v9H4zM4 7h16v4H4zM12 7v13M12 7S10 3 7.5 4 9 7 12 7zM12 7s2-4 4.5-3S15 7 12 7z"
    })),
    shield: p => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: p.s || 22,
      height: p.s || 22,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 12l2 2 4-4"
    })),
    star: p => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: p.s || 14,
      height: p.s || 14,
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 2l2.9 6.3 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 21l1.3-6.7-5-4.6 6.8-.8z"
    })),
    wa: p => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 32 32",
      width: p.s || 20,
      height: p.s || 20,
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19.11 17.36c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.46-.83-2-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16 4C9.37 4 4 9.37 4 16c0 2.11.55 4.09 1.52 5.81L4 28l6.36-1.49A11.92 11.92 0 0 0 16 28c6.63 0 12-5.37 12-12S22.63 4 16 4z"
    }))
  };
  function Stars({
    value,
    count,
    size = 14
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        color: "var(--accent)"
      }
    }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        opacity: i < Math.round(value) ? 1 : 0.25
      }
    }, /*#__PURE__*/React.createElement(I.star, {
      s: size
    })))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--muted-foreground)"
      }
    }, value.toFixed(1), count != null ? ` (${count})` : ""));
  }

  /* ---------------- product media (tinted leaf tile or photo) ---------------- */
  function ProductMedia({
    product,
    height = 200,
    round = 16
  }) {
    if (product.photo) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          height,
          borderRadius: round,
          overflow: "hidden",
          background: "var(--cream)",
          display: "grid",
          placeItems: "center",
          padding: Math.round(height * 0.06)
        }
      }, /*#__PURE__*/React.createElement("img", {
        src: product.photo,
        alt: product.name,
        style: {
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          display: "block"
        }
      }));
    }
    const tint = catTint(product.cat);
    const initials = product.name.split(" ").slice(0, 2).map(w => w[0]).join("");
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height,
        borderRadius: round,
        position: "relative",
        overflow: "hidden",
        background: `radial-gradient(120% 120% at 30% 20%, color-mix(in oklab, ${tint} 22%, var(--cream)) 0%, var(--cream) 70%)`,
        display: "grid",
        placeItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        right: -16,
        bottom: -16,
        color: tint,
        opacity: 0.14
      }
    }, /*#__PURE__*/React.createElement(I.leaf, {
      s: Math.round(height * 0.7)
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: Math.round(height * 0.26),
        color: "color-mix(in oklab, " + tint + " 80%, var(--forest-deep))",
        letterSpacing: "0.02em"
      }
    }, initials));
  }
  function TagPill({
    tag
  }) {
    const map = {
      bestseller: {
        t: "Bestseller",
        tone: "gold"
      },
      "sugar-free": {
        t: "Sugar-Free",
        tone: "forest"
      },
      new: {
        t: "New",
        tone: "success"
      }
    };
    const m = map[tag];
    if (!m) return null;
    return /*#__PURE__*/React.createElement(Badge, {
      tone: m.tone
    }, m.t);
  }

  /* ---------------- product card ---------------- */
  function ProductCard({
    product,
    onOpen,
    onAdd,
    onToggleWish,
    wished
  }) {
    const [h, setH] = React.useState(false);
    const off = product.mrp > product.price ? Math.round((1 - product.price / product.mrp) * 100) : 0;
    return /*#__PURE__*/React.createElement("div", {
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      style: {
        display: "flex",
        flexDirection: "column",
        background: "var(--card)",
        border: `1px solid ${h ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "var(--radius-2xl)",
        padding: 14,
        boxShadow: h ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transform: h ? "translateY(-4px)" : "none",
        transition: "all .2s var(--ease-standard)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        cursor: "pointer"
      },
      onClick: () => onOpen(product)
    }, /*#__PURE__*/React.createElement(ProductMedia, {
      product: product,
      height: 188
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 10,
        left: 10,
        display: "flex",
        gap: 6
      }
    }, off > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        background: "var(--destructive)",
        color: "#fff",
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 8px",
        borderRadius: "var(--radius-pill)"
      }
    }, "-", off, "%"), product.badge && /*#__PURE__*/React.createElement("span", {
      style: {
        background: "var(--forest-deep)",
        color: "var(--cream)",
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 8px",
        borderRadius: "var(--radius-pill)"
      }
    }, product.badge)), /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        onToggleWish(product.id);
      },
      "aria-label": "Wishlist",
      style: {
        position: "absolute",
        top: 8,
        right: 8,
        height: 34,
        width: 34,
        display: "grid",
        placeItems: "center",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border)",
        background: "color-mix(in oklab, var(--card) 90%, transparent)",
        color: wished ? "var(--destructive)" : "var(--ink-500)",
        cursor: "pointer",
        backdropFilter: "blur(4px)"
      }
    }, /*#__PURE__*/React.createElement(I.heart, {
      s: 18,
      fill: wished ? "currentColor" : "none"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        flex: 1,
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--accent)"
      }
    }, catName(product.cat)), /*#__PURE__*/React.createElement("h3", {
      onClick: () => onOpen(product),
      style: {
        margin: "4px 0 0",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 19,
        lineHeight: 1.15,
        color: "var(--primary)",
        cursor: "pointer"
      }
    }, product.name), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement(Stars, {
      value: product.rating,
      count: product.reviews
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "8px 0 0",
        fontSize: 13,
        lineHeight: 1.5,
        color: "var(--muted-foreground)",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden"
      }
    }, product.desc), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "auto",
        paddingTop: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 7
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 22,
        color: "var(--primary)"
      }
    }, money(product.price)), off > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--muted-foreground)",
        textDecoration: "line-through"
      }
    }, money(product.mrp)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--muted-foreground)"
      }
    }, "\xB7 ", product.weight))), /*#__PURE__*/React.createElement("button", {
      onClick: () => onAdd(product, 1),
      style: {
        marginTop: 12,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: "100%",
        padding: "10px 14px",
        borderRadius: "var(--radius-pill)",
        border: "1px solid transparent",
        background: h ? "var(--forest-deep)" : "var(--primary)",
        color: "var(--primary-foreground)",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        transition: "background .2s"
      }
    }, /*#__PURE__*/React.createElement(I.bag, {
      s: 18
    }), " Add to Cart")));
  }

  /* ---------------- quantity stepper ---------------- */
  function Stepper({
    value,
    onChange,
    size = "md"
  }) {
    const dim = size === "sm" ? 30 : 38;
    const btn = {
      height: dim,
      width: dim,
      display: "grid",
      placeItems: "center",
      border: "none",
      background: "transparent",
      color: "var(--primary)",
      cursor: "pointer"
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-pill)",
        background: "var(--card)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: btn,
      onClick: () => onChange(Math.max(1, value - 1)),
      "aria-label": "Decrease"
    }, /*#__PURE__*/React.createElement(I.minus, null)), /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 28,
        textAlign: "center",
        fontWeight: 700,
        fontSize: 14,
        color: "var(--primary)"
      }
    }, value), /*#__PURE__*/React.createElement("button", {
      style: btn,
      onClick: () => onChange(value + 1),
      "aria-label": "Increase"
    }, /*#__PURE__*/React.createElement(I.plus, null)));
  }

  /* ---------------- quick-view modal ---------------- */
  function QuickView({
    product,
    onClose,
    onAdd,
    onToggleWish,
    wished
  }) {
    const [qty, setQty] = React.useState(1);
    React.useEffect(() => {
      setQty(1);
    }, [product && product.id]);
    if (!product) return null;
    const off = product.mrp > product.price ? Math.round((1 - product.price / product.mrp) * 100) : 0;
    return /*#__PURE__*/React.createElement(Overlay, {
      onClose: onClose,
      align: "center"
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => e.stopPropagation(),
      style: {
        width: "min(880px, 94vw)",
        maxHeight: "90vh",
        overflow: "auto",
        background: "var(--card)",
        borderRadius: "var(--radius-3xl)",
        boxShadow: "var(--shadow-xl)",
        border: "1px solid var(--border)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "shop-quick",
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "shop-quick-media",
      style: {
        padding: 24
      }
    }, /*#__PURE__*/React.createElement(ProductMedia, {
      product: product,
      height: 360,
      round: 24
    })), /*#__PURE__*/React.createElement("div", {
      className: "shop-quick-info",
      style: {
        padding: "32px 32px 32px 8px",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      "aria-label": "Close",
      style: {
        position: "absolute",
        top: 16,
        right: 16,
        height: 36,
        width: 36,
        display: "grid",
        placeItems: "center",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border)",
        background: "var(--card)",
        color: "var(--primary)",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(I.close, null)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "var(--accent)"
      }
    }, catName(product.cat)), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: "8px 0 0",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 34,
        lineHeight: 1.05,
        color: "var(--primary)"
      }
    }, product.name), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement(Stars, {
      value: product.rating,
      count: product.reviews,
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        display: "flex",
        alignItems: "baseline",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 30,
        color: "var(--primary)"
      }
    }, money(product.price)), off > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        color: "var(--muted-foreground)",
        textDecoration: "line-through"
      }
    }, money(product.mrp)), off > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "var(--destructive)"
      }
    }, "Save ", off, "%")), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 16,
        fontSize: 15,
        lineHeight: 1.65,
        color: "color-mix(in oklab, var(--foreground) 82%, transparent)"
      }
    }, product.desc), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        display: "flex",
        flexWrap: "wrap",
        gap: 8
      }
    }, product.facts.map(f => /*#__PURE__*/React.createElement("span", {
      key: f,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        fontWeight: 600,
        color: "var(--primary)",
        background: "var(--secondary)",
        padding: "6px 11px",
        borderRadius: "var(--radius-pill)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--accent)"
      }
    }, /*#__PURE__*/React.createElement(I.leaf, {
      s: 14
    })), f))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 24,
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Stepper, {
      value: qty,
      onChange: setQty
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        onAdd(product, qty);
        onClose();
      },
      style: {
        flex: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "13px 18px",
        borderRadius: "var(--radius-pill)",
        border: "none",
        background: "var(--primary)",
        color: "var(--primary-foreground)",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: 15,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(I.bag, {
      s: 19
    }), " Add ", qty, " \xB7 ", money(product.price * qty)), /*#__PURE__*/React.createElement("button", {
      onClick: () => onToggleWish(product.id),
      "aria-label": "Wishlist",
      style: {
        height: 48,
        width: 48,
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border)",
        background: "var(--card)",
        color: wished ? "var(--destructive)" : "var(--ink-500)",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(I.heart, {
      s: 20,
      fill: wished ? "currentColor" : "none"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18,
        display: "flex",
        flexWrap: "wrap",
        gap: "8px 18px",
        fontSize: 12,
        color: "var(--muted-foreground)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(I.truck, {
      s: 16
    }), " Home delivery"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(I.shield, {
      s: 16
    }), " 100% homemade"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(I.leaf, {
      s: 14
    }), " No preservatives"))))));
  }

  /* ---------------- overlay shell ---------------- */
  function Overlay({
    children,
    onClose,
    align = "end"
  }) {
    React.useEffect(() => {
      const onKey = e => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "color-mix(in oklab, var(--forest-deep) 45%, transparent)",
        backdropFilter: "blur(3px)",
        display: "flex",
        justifyContent: align === "center" ? "center" : "flex-end",
        alignItems: align === "center" ? "center" : "stretch",
        animation: "msfade .2s ease"
      }
    }, children);
  }
  window.MSShopParts = {
    I,
    Stars,
    money,
    catName,
    catTint,
    ProductMedia,
    ProductCard,
    Stepper,
    QuickView,
    Overlay,
    TagPill
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shop/ShopParts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shop/data.js
try { (() => {
/* Mishthi Sattva — Shop catalogue.
   Real product range from the brand; INR prices, weights, ratings and copy
   added for the storefront. Exposes window.MSShopData. */

const MS_CATEGORIES = [{
  id: "ayurvedic",
  name: "Ayurvedic & Health",
  tint: "var(--forest)"
}, {
  id: "spices",
  name: "Spices & Masala",
  tint: "var(--gold)"
}, {
  id: "hair",
  name: "Hair Care",
  tint: "var(--forest-deep)"
}, {
  id: "beauty",
  name: "Beauty & Skincare",
  tint: "var(--gold-soft)"
}, {
  id: "special",
  name: "Special Foods",
  tint: "var(--whatsapp)"
}];

/* photo: real asset path (optional). Otherwise a tinted leaf tile is drawn. */
const MS_PRODUCTS = [
// ---- Ayurvedic & Health ----
{
  id: "shakti-laddu",
  name: "Shakti Laddu",
  cat: "ayurvedic",
  price: 540,
  mrp: 600,
  weight: "500 g",
  rating: 4.9,
  reviews: 128,
  tags: ["bestseller", "sugar-free"],
  badge: "Bestseller",
  photo: "../../assets/shakti-laddu.png",
  desc: "Energy-rich laddus made with dry fruits, edible gum and jaggery — a traditional strength tonic with no refined sugar.",
  facts: ["No Refined Sugar", "Dry Fruits & Gond", "Daily Strength"]
}, {
  id: "sampooran-laddu",
  name: "Sampooran Laddu",
  cat: "ayurvedic",
  price: 520,
  mrp: 560,
  weight: "500 g",
  rating: 4.8,
  reviews: 86,
  tags: ["sugar-free"],
  photo: "../../assets/sampooran-laddu.png",
  desc: "A wholesome blend of seeds, nuts and Ayurvedic herbs bound in jaggery — nourishment in every bite.",
  facts: ["Seeds & Nuts", "Herb-Infused", "Preservative-Free"]
}, {
  id: "chyawanprash",
  name: "Sugar-Free Chyawanprash",
  cat: "ayurvedic",
  price: 480,
  mrp: 540,
  weight: "500 g",
  rating: 5.0,
  reviews: 214,
  tags: ["bestseller", "sugar-free", "new"],
  badge: "Featured",
  photo: "../../assets/chyawanprash.jpg",
  desc: "A modern take on the 5,000-year-old recipe — slow-cooked with amla, herbs and natural sweeteners. Zero refined sugar.",
  facts: ["Amla & 40+ Herbs", "Supports Immunity", "No Refined Sugar"]
}, {
  id: "herbal-heart-sip",
  name: "Herbal Heart Sip",
  cat: "ayurvedic",
  price: 360,
  mrp: 400,
  weight: "200 g",
  rating: 4.7,
  reviews: 54,
  tags: [],
  photo: "../../assets/herbal-heart-sip.png",
  desc: "A warming herbal infusion blended to support heart health and circulation. One spoon in hot water, daily.",
  facts: ["Heart-Friendly", "Caffeine-Free", "Herbal Blend"]
}, {
  id: "namkeen-mix",
  name: "Healthy Namkeen Mix",
  cat: "ayurvedic",
  price: 240,
  mrp: 280,
  weight: "300 g",
  rating: 4.6,
  reviews: 72,
  tags: [],
  photo: "../../assets/namkeen-mix.png",
  desc: "Roasted, never fried — a guilt-free namkeen made with millets, lentils and gentle spices.",
  facts: ["Roasted not Fried", "No Refined Oil", "High Fibre"]
}, {
  id: "ayurvedic-hair-oil",
  name: "Ayurvedic Hair Oil",
  cat: "ayurvedic",
  price: 320,
  mrp: 360,
  weight: "200 ml",
  rating: 4.8,
  reviews: 96,
  tags: ["bestseller"],
  photo: "../../assets/ayurvedic-hair-oil.png",
  desc: "Cold-infused with bhringraj, amla and curry leaf to nourish the scalp and strengthen roots.",
  facts: ["Bhringraj & Amla", "Cold-Infused", "For All Hair Types"]
}, {
  id: "protein-sattu",
  name: "Protein Sattu Drink",
  cat: "ayurvedic",
  price: 290,
  mrp: 320,
  weight: "400 g",
  rating: 4.7,
  reviews: 61,
  tags: ["new"],
  badge: "New",
  photo: "../../assets/protein-sattu.png",
  desc: "Roasted gram sattu, naturally high in protein and fibre. Mix sweet or savoury for an instant cooling drink.",
  facts: ["Plant Protein", "Cooling", "No Additives"]
},
// ---- Spices & Masala ----
{
  id: "chat-masala",
  name: "Chat Masala",
  cat: "spices",
  price: 120,
  mrp: 140,
  weight: "100 g",
  rating: 4.8,
  reviews: 143,
  tags: ["bestseller"],
  photo: "../../assets/chat-masala.png",
  desc: "Tangy, zesty and freshly ground — the finishing touch for fruits, chaats and snacks.",
  facts: ["Freshly Ground", "Tangy & Zesty", "No Colour Added"]
}, {
  id: "shinkaji-masala",
  name: "Shinkaji Masala",
  cat: "spices",
  price: 150,
  mrp: 170,
  weight: "100 g",
  rating: 4.7,
  reviews: 38,
  tags: [],
  photo: "../../assets/shinkaji-masala-pack.png",
  desc: "A robust homestyle blend for hearty Punjabi gravies and dals.",
  facts: ["Homestyle Blend", "Rich Aroma", "Small Batch"]
}, {
  id: "thandai-premix",
  name: "Thandai Premix",
  cat: "spices",
  price: 280,
  mrp: 320,
  weight: "250 g",
  rating: 4.9,
  reviews: 67,
  tags: ["new"],
  badge: "Seasonal",
  photo: "../../assets/protein-sattu.png",
  desc: "Almonds, fennel, rose and saffron, ground for a festive cooling thandai. Just add milk.",
  facts: ["Saffron & Rose", "Festive Favourite", "No Preservatives"]
}, {
  id: "shahi-garam-masala",
  name: "Shahi Garam Masala",
  cat: "spices",
  price: 180,
  mrp: 200,
  weight: "100 g",
  rating: 4.9,
  reviews: 112,
  tags: ["bestseller"],
  photo: "../../assets/shahi-garam-masala.png",
  desc: "A royal garam masala of whole spices roasted and stone-ground for deep, layered warmth.",
  facts: ["Whole Spices", "Roasted & Ground", "Aromatic"]
}, {
  id: "ice-cream-premix",
  name: "Ice Cream Premix",
  cat: "spices",
  price: 260,
  mrp: 300,
  weight: "200 g",
  rating: 4.9,
  reviews: 24,
  tags: ["new"],
  badge: "New",
  photo: "../../assets/ice-cream-premix.png",
  desc: "A rich, creamy ice-cream premix loaded with almonds, pistachios and cashews. Just add milk, churn and freeze.",
  facts: ["Made with All Nuts", "Rich & Creamy", "Just Add Milk"]
}, {
  id: "shahi-sip-scoop",
  name: "Shahi Sip & Scoop",
  cat: "spices",
  price: 290,
  mrp: 330,
  weight: "200 g",
  rating: 4.9,
  reviews: 19,
  tags: ["new"],
  badge: "New",
  photo: "../../assets/shahi-sip-scoop.png",
  desc: "A badam-milk premix that doubles as ice cream — drink it, freeze it, love it. No artificial creamers.",
  facts: ["Badam Milk & Ice Cream", "No Artificial Creamers", "Just Add Milk"]
}, {
  id: "jaljeera-sattu",
  name: "Jaljeera Sattu",
  cat: "spices",
  price: 180,
  mrp: 210,
  weight: "250 g",
  rating: 4.8,
  reviews: 27,
  tags: ["new"],
  photo: "../../assets/jaljeera-sattu.png",
  desc: "A cooling pudina-jaljeera sattu blend — instant, tasty and rich in protein. Just add water.",
  facts: ["Cooling Pudina", "Rich in Protein", "Instant & Tasty"]
}, {
  id: "energy-sattu",
  name: "Energy Sattu",
  cat: "spices",
  price: 220,
  mrp: 250,
  weight: "400 g",
  rating: 4.8,
  reviews: 31,
  tags: ["new"],
  photo: "../../assets/energy-sattu.png",
  desc: "Roasted gram sattu with jaggery for natural, sustained energy and no refined sugar.",
  facts: ["Jaggery Sweetened", "Natural Energy", "No Refined Sugar"]
},
// ---- Hair Care ----
{
  id: "kesh-vash-shampoo",
  name: "Ayur Kesh Vash Shampoo",
  cat: "hair",
  price: 340,
  mrp: 380,
  weight: "200 ml",
  rating: 4.7,
  reviews: 88,
  tags: ["bestseller"],
  photo: "../../assets/kesh-vash-shampoo.png",
  desc: "A gentle herbal shampoo with shikakai and reetha — cleanses without stripping natural oils.",
  facts: ["Shikakai & Reetha", "Sulphate-Free", "Gentle Cleanse"]
}, {
  id: "kesh-vardaan-oil",
  name: "Ayur Kesh Vardaan Oil",
  cat: "hair",
  price: 360,
  mrp: 400,
  weight: "200 ml",
  rating: 4.8,
  reviews: 74,
  tags: [],
  photo: "../../assets/kesh-vardaan-oil.png",
  desc: "An intensive hair-fall oil blend of bhringraj, brahmi and sesame for thicker, stronger hair.",
  facts: ["Anti Hair-Fall", "Brahmi & Bhringraj", "Deep Nourishment"]
},
// ---- Beauty & Skincare ----
{
  id: "urban-glow",
  name: "Instant Ubtan Glow",
  cat: "beauty",
  price: 420,
  mrp: 470,
  weight: "50 g",
  rating: 4.6,
  reviews: 52,
  tags: ["new"],
  badge: "New",
  photo: "../../assets/ubtan-glow-pack.png",
  desc: "A brightening face pack for an instant, natural radiance — perfect before an occasion.",
  facts: ["Instant Radiance", "Natural Actives", "All Skin Types"]
}, {
  id: "glow-radiance-cream",
  name: "Glow Radiance Cream",
  cat: "beauty",
  price: 460,
  mrp: 520,
  weight: "50 g",
  rating: 4.7,
  reviews: 63,
  tags: ["bestseller"],
  photo: "../../assets/glow-radiance-cream-pack.png",
  desc: "A lightweight daily moisturiser with saffron and natural oils for soft, glowing skin.",
  facts: ["Saffron Infused", "Daily Moisture", "Non-Greasy"]
}, {
  id: "vitamin-c-serum",
  name: "Vitamin C Serum",
  cat: "beauty",
  price: 540,
  mrp: 600,
  weight: "30 ml",
  rating: 4.8,
  reviews: 91,
  tags: ["bestseller", "new"],
  photo: "../../assets/vitamin-c-serum-pack.png",
  desc: "A brightening vitamin C serum that evens tone and adds a healthy glow over time.",
  facts: ["Brightening", "Evens Tone", "Lightweight"]
},
// ---- Special Foods ----
{
  id: "paani-puri-combo",
  name: "Paani Puri Combo",
  cat: "special",
  price: 199,
  mrp: 230,
  weight: "Kit · 24 pc",
  rating: 4.9,
  reviews: 156,
  tags: ["bestseller"],
  badge: "Party Pack",
  photo: "../../assets/paani-puri-combo-uniform.png",
  desc: "Everything for a perfect paani puri party — crisp puris, masala and tangy paani mix.",
  facts: ["Complete Kit", "Crispy Puris", "Party Favourite"]
},
// ---- Pickles (Special Foods) ----
{
  id: "mirchi-pickle",
  name: "Mirchi Pickle",
  cat: "special",
  price: 180,
  mrp: 210,
  weight: "400 g",
  rating: 4.8,
  reviews: 64,
  tags: ["bestseller"],
  badge: "Bestseller",
  photo: "../../assets/mirchi-pickle.png",
  desc: "Fiery green chillies cured in mustard oil and hand-ground spices — a bold, tangy kick for every meal.",
  facts: ["Mustard Oil", "Small Batch", "No Preservatives"]
}, {
  id: "mango-pickle",
  name: "Mango Pickle",
  cat: "special",
  price: 180,
  mrp: 210,
  weight: "400 g",
  rating: 4.9,
  reviews: 98,
  tags: ["bestseller"],
  photo: "../../assets/mango-pickle.png",
  desc: "Raw mango chunks slow-cured with garlic, chilli and whole spices — the classic Punjabi aam ka achaar.",
  facts: ["Raw Mango", "Traditional Recipe", "Mustard Oil"]
}, {
  id: "nimboo-pickle",
  name: "Nimboo Pickle – Sweet & Spicy",
  cat: "special",
  price: 190,
  mrp: 220,
  weight: "400 g",
  rating: 4.8,
  reviews: 51,
  tags: ["new"],
  badge: "New",
  photo: "../../assets/nimboo-pickle.png",
  desc: "Sun-cured lemon pickle in two moods — a mellow sweet and a bright spicy — rich in natural tang.",
  facts: ["Sweet & Spicy", "Sun-Cured", "No Preservatives"]
}];
window.MSShopData = {
  MS_CATEGORIES,
  MS_PRODUCTS
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shop/data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Mishthi Sattva — Website UI kit screens.
   Faithful recreation of the landing page, composing design-system components.
   Loaded as text/babel; exposes window.MSWebsite. */

const DS = window.MishthiSattvaDesignSystem_af8a45;
const {
  Button,
  Badge,
  Card,
  WhatsAppButton,
  GoldDivider,
  ProductCard,
  BenefitTile,
  FAQItem,
  Testimonial,
  Input
} = DS;
const ASSET = "../../assets";
const PHONE = "8557942246";

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
  "Thandai Premix": `${ASSET}/grid-thandai-premix.png`,
  "Ice Cream Premix": `${ASSET}/ice-cream-premix.png`,
  "Shahi Sip & Scoop": `${ASSET}/shahi-sip-scoop.png`,
  "Jaljeera Sattu": `${ASSET}/jaljeera-sattu.png`,
  "Energy Sattu": `${ASSET}/energy-sattu.png`,
  "Paani Puri Combo": `${ASSET}/paani-puri-combo-uniform.png`,
  "Mirchi Pickle": `${ASSET}/mirchi-pickle.png`,
  "Mango Pickle": `${ASSET}/mango-pickle.png`,
  "Nimboo Pickle – Sweet & Spicy": `${ASSET}/nimboo-pickle.png`,
  "Glow Radiance Cream": `${ASSET}/glow-radiance-cream-pack.png`
};

/* ---------- shared data ---------- */
const PRODUCT_CATS = [{
  id: "ayurvedic",
  name: "Ayurvedic & Health",
  blurb: "Natural wellness from traditional Ayurvedic ingredients that support immunity, energy and wellbeing.",
  items: ["Shakti Laddu", "Sampooran Laddu", "Sugar-Free Chyawanprash", "Herbal Heart Sip", "Healthy Namkeen Mix", "Ayurvedic Hair Oil", "Protein Sattu Drink"]
}, {
  id: "hair",
  name: "Hair Care",
  blurb: "Natural hair care designed to nourish scalp health and promote stronger hair.",
  items: ["Ayur Kesh Vash Shampoo", "Ayur Kesh Vardaan Oil"]
}, {
  id: "spices",
  name: "Spices & Masala",
  blurb: "Authentic homemade spice blends that enhance flavour while keeping purity and freshness.",
  items: ["Chat Masala", "Shinkaji Masala", "Thandai Premix", "Shahi Garam Masala", "Ice Cream Premix", "Shahi Sip & Scoop", "Jaljeera Sattu", "Energy Sattu"]
}, {
  id: "beauty",
  name: "Beauty & Skincare",
  blurb: "Natural skincare for healthy, glowing skin.",
  items: ["Instant Ubtan Glow", "Glow Radiance Cream", "Vitamin C Serum"]
}, {
  id: "special",
  name: "Special Foods",
  blurb: "Traditional homemade food products with authentic taste.",
  items: ["Paani Puri Combo", "Mirchi Pickle", "Mango Pickle", "Nimboo Pickle – Sweet & Spicy"]
}];
const BENEFITS = [{
  label: "No Refined Oil",
  good: false
}, {
  label: "No Refined Sugar",
  good: false
}, {
  label: "No Preservatives",
  good: false
}, {
  label: "Homemade",
  good: true
}, {
  label: "Natural Ingredients",
  good: true
}, {
  label: "Hygienically Prepared",
  good: true
}];
const TESTIMONIALS = [{
  quote: "Pure taste and amazing quality. You can actually feel the difference.",
  name: "Priya S.",
  city: "Bathinda"
}, {
  quote: "The homemade touch makes every product special.",
  name: "Rajesh K.",
  city: "Kotkapura"
}, {
  quote: "Healthy products for the entire family.",
  name: "Anita M.",
  city: "Faridkot"
}];
const FAQS = [{
  q: "How do I place an order?",
  a: "Tap any 'Order on WhatsApp' button and send us your list. We confirm availability, price and delivery on chat."
}, {
  q: "Do you offer home delivery?",
  a: "Yes. Home delivery is available across Kotkapura and nearby areas; other cities ship via trusted couriers."
}, {
  q: "Are your products really preservative-free?",
  a: "Absolutely — prepared fresh in our home kitchen with no refined oil, sugar or artificial preservatives."
}, {
  q: "What is the shelf life?",
  a: "Typically 1–6 months when stored as instructed. Exact dates are printed on each pack."
}];

/* ---------- atoms ---------- */
function Leaf({
  size = 16
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17 4C9 4 4 9 4 17c0 1.7.3 3 .7 3 .4 0 .8-.8 1.4-2 2-4.2 5.6-7 10-7.6.6-.1.9.6.4.9-4.3 2.4-7.1 5.7-8.4 9.7-.3.8.7 1.3 1.3.7C13.9 17.5 20 14.5 20 7c0-1.7-1.3-3-3-3z"
  }));
}

/* ---------- header ---------- */
function Header({
  active = "home"
}) {
  const nav = [{
    label: "Home",
    href: "index.html",
    id: "home"
  }, {
    label: "Story",
    href: "about.html",
    id: "about"
  }, {
    label: "Products",
    href: "products.html",
    id: "products"
  }, {
    label: "Contact",
    href: "contact.html",
    id: "contact"
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 40,
      borderBottom: "1px solid color-mix(in oklab, var(--border) 70%, transparent)",
      background: "color-mix(in oklab, var(--background) 85%, transparent)",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      display: "flex",
      height: 76,
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html",
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}/mishthi-logo-lockup.png`,
    alt: "Mishthi Sattva \u2014 Ayurvedic, Satvik, Homemade",
    style: {
      height: 54,
      width: "auto",
      objectFit: "contain"
    }
  })), /*#__PURE__*/React.createElement("nav", {
    className: "ms-nav",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 28
    }
  }, nav.map(n => {
    const on = n.id === active;
    return /*#__PURE__*/React.createElement("a", {
      key: n.label,
      href: n.href,
      style: {
        fontSize: 14,
        fontWeight: on ? 600 : 500,
        color: on ? "var(--primary)" : "color-mix(in oklab, var(--foreground) 80%, transparent)",
        borderBottom: on ? "2px solid var(--accent)" : "2px solid transparent",
        paddingBottom: 2
      }
    }, n.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    as: "a",
    href: "../shop/index.html"
  }, "Shop"), /*#__PURE__*/React.createElement(WhatsAppButton, {
    size: "sm"
  }, "Order Now"))));
}

/* ---------- hero ---------- */
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      zIndex: -1,
      background: "radial-gradient(60% 60% at 80% 10%, color-mix(in oklab, var(--gold) 18%, transparent), transparent), radial-gradient(50% 50% at 0% 100%, color-mix(in oklab, var(--forest) 12%, transparent), transparent)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ms-container ms-stack",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.08fr",
      gap: 48,
      alignItems: "center",
      padding: "72px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(GoldDivider, null, "Ayurvedic \xB7 Satvic \xB7 Homemade"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 24,
      fontSize: "clamp(66px, 9vw, 116px)",
      fontWeight: 600,
      lineHeight: 0.94,
      letterSpacing: "-0.025em",
      color: "var(--primary)"
    }
  }, "Pure Ingredients.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: "italic",
      color: "var(--accent)"
    }
  }, "Pure Intentions.")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 22,
      maxWidth: 540,
      fontSize: 18,
      lineHeight: 1.6,
      color: "var(--muted-foreground)"
    }
  }, "Homemade Ayurvedic foods, spices and wellness \u2014 prepared in Cherry Bansal's home kitchen in Kotkapura with traditional wisdom and uncompromised purity."), /*#__PURE__*/React.createElement("p", {
    className: "ms-hindi",
    style: {
      marginTop: 12,
      fontSize: 19,
      color: "color-mix(in oklab, var(--primary) 90%, transparent)"
    }
  }, "\u0918\u0930 \u0915\u0940 \u0930\u0938\u094B\u0908 \u0938\u0947\u2026 \u0906\u092A\u0915\u0947 \u092A\u0930\u093F\u0935\u093E\u0930 \u0915\u0940 \u0938\u0947\u0939\u0924 \u0924\u0915\u0964"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30,
      display: "flex",
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(WhatsAppButton, null), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    as: "a",
    href: "../shop/index.html"
  }, "Shop the Range \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 38,
      display: "grid",
      gridTemplateColumns: "repeat(4, auto)",
      gap: "12px 24px",
      maxWidth: 480
    }
  }, ["Homemade", "Sugar-Free", "Preservative Free", "Sattvic"].map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "var(--primary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, /*#__PURE__*/React.createElement(Leaf, {
    size: 16
  })), " ", t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: -24,
      zIndex: -1,
      borderRadius: 32,
      background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 20%, transparent), color-mix(in oklab, var(--forest) 10%, transparent))",
      filter: "blur(40px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden",
      borderRadius: 32,
      aspectRatio: "5 / 6",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-xl)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}/hero-products.png`,
    alt: "Mishthi Sattva products",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: -22,
      left: 28,
      width: 280,
      borderRadius: 18,
      border: "1px solid var(--border)",
      background: "color-mix(in oklab, var(--card) 95%, transparent)",
      padding: 16,
      boxShadow: "var(--shadow-lg)",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      placeItems: "center",
      height: 44,
      width: 44,
      borderRadius: "var(--radius-pill)",
      background: "color-mix(in oklab, var(--gold) 15%, transparent)",
      color: "var(--accent)"
    }
  }, /*#__PURE__*/React.createElement(Leaf, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--primary)"
    }
  }, "Complimentary gift"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--muted-foreground)"
    }
  }, "on every order this month.")))))));
}

/* ---------- marquee ---------- */
function MarqueeStrip() {
  const items = ["Pure · Hygienic · Homemade", "Made in Kotkapura, Punjab", "No Refined Oil", "No Refined Sugar", "No Preservatives", "Home Delivery"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      background: "var(--primary)",
      color: "var(--primary-foreground)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px 32px",
      padding: "12px 20px",
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.22em"
    }
  }, items.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, t, i < items.length - 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "\u25C6")))));
}

/* ---------- about ---------- */
function About() {
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    style: {
      background: "var(--white)",
      padding: "96px 0",
      scrollMarginTop: 84
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container ms-stack",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 48,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(GoldDivider, null, "Our Story"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20,
      fontSize: 64,
      fontWeight: 700,
      lineHeight: 1.04,
      letterSpacing: "-0.015em"
    }
  }, "From our home kitchen, with care.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      fontSize: 18,
      lineHeight: 1.7,
      color: "color-mix(in oklab, var(--foreground) 85%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("p", null, "Mishthi Sattva was founded with a simple mission \u2014 to provide pure, hygienic, homemade products made with natural ingredients and traditional wisdom."), /*#__PURE__*/React.createElement("p", null, "Many products today contain refined oil, refined sugar and artificial preservatives. Mishthi Sattva offers healthier alternatives prepared with love, care and cleanliness in a home kitchen."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22,
      fontStyle: "italic",
      color: "var(--primary)"
    }
  }, "Every product is crafted with a commitment to quality, purity and family wellness."))));
}

/* ---------- why us ---------- */
function WhyUs() {
  return /*#__PURE__*/React.createElement("section", {
    id: "why",
    style: {
      background: "var(--background)",
      padding: "96px 0",
      scrollMarginTop: 84
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(GoldDivider, {
    align: "center"
  }, "Why Choose Us"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20,
      fontSize: 56,
      fontWeight: 700,
      lineHeight: 1.16,
      letterSpacing: "-0.015em",
      textWrap: "balance"
    }
  }, "A promise of purity", /*#__PURE__*/React.createElement("br", null), "in every jar."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 22,
      color: "var(--muted-foreground)",
      fontSize: 17,
      lineHeight: 1.6
    }
  }, "Every batch is held to the same six standards \u2014 no shortcuts, no compromises.")), /*#__PURE__*/React.createElement("div", {
    className: "ms-why-grid",
    style: {
      marginTop: 64,
      display: "grid",
      gap: 18,
      alignItems: "stretch"
    }
  }, BENEFITS.map(b => /*#__PURE__*/React.createElement(BenefitTile, {
    key: b.label,
    label: b.label,
    good: b.good
  })))));
}

/* ---------- products ---------- */
function Products() {
  const [active, setActive] = React.useState("all");
  const filtered = active === "all" ? PRODUCT_CATS : PRODUCT_CATS.filter(c => c.id === active);
  const tabs = [{
    id: "all",
    name: "All"
  }, ...PRODUCT_CATS];
  return /*#__PURE__*/React.createElement("section", {
    id: "products",
    style: {
      padding: "96px 0",
      scrollMarginTop: 84
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 600,
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(GoldDivider, {
    align: "center"
  }, "Our Premium Range"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20,
      fontSize: 64,
      fontWeight: 700,
      lineHeight: 1.16,
      letterSpacing: "-0.015em",
      textWrap: "balance"
    }
  }, "Crafted in small batches,", /*#__PURE__*/React.createElement("br", null), "served with love."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      color: "var(--muted-foreground)"
    }
  }, "Filter the range below or message us on WhatsApp for the full catalogue.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 8
    }
  }, tabs.map(c => {
    const on = active === c.id;
    return /*#__PURE__*/React.createElement("button", {
      key: c.id,
      onClick: () => setActive(c.id),
      style: {
        borderRadius: "var(--radius-pill)",
        border: `1px solid ${on ? "var(--primary)" : "var(--border)"}`,
        background: on ? "var(--primary)" : "var(--card)",
        color: on ? "var(--primary-foreground)" : "color-mix(in oklab, var(--foreground) 70%, transparent)",
        padding: "8px 16px",
        fontSize: 12,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        cursor: "pointer",
        transition: "all .2s"
      }
    }, c.name);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      display: "flex",
      flexDirection: "column",
      gap: 48
    }
  }, filtered.map(cat => /*#__PURE__*/React.createElement("div", {
    key: cat.id
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 16,
      borderBottom: "1px solid var(--border)",
      paddingBottom: 16,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 30,
      color: "var(--primary)"
    }
  }, cat.name), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 4,
      maxWidth: 640,
      fontSize: 14,
      color: "var(--muted-foreground)"
    }
  }, cat.blurb)), /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      fontFamily: "var(--font-display)",
      fontSize: 30,
      color: "color-mix(in oklab, var(--accent) 60%, transparent)"
    }
  }, String(PRODUCT_CATS.findIndex(p => p.id === cat.id) + 1).padStart(2, "0"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 20,
      alignItems: "stretch"
    }
  }, cat.items.map(item => /*#__PURE__*/React.createElement("div", {
    key: item,
    className: item === "Ayur Kesh Vardaan Oil" || item === "Ayur Kesh Vash Shampoo" ? "ms-oil" : undefined,
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(ProductCard, {
    name: item,
    href: "../shop/index.html",
    image: PRODUCT_IMAGES[item],
    style: {
      width: "100%"
    }
  })))))))));
}

/* ---------- featured ---------- */
function Featured() {
  const bullets = ["No Refined Sugar", "Rich Traditional Ingredients", "Supports Immunity", "Homemade Quality", "Family Friendly"];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--primary)",
      color: "var(--primary-foreground)",
      padding: "96px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: -128,
      top: -128,
      height: 384,
      width: 384,
      borderRadius: "50%",
      background: "color-mix(in oklab, var(--gold) 20%, transparent)",
      filter: "blur(60px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ms-container ms-stack",
    style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 48,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden",
      borderRadius: 32,
      border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)",
      boxShadow: "var(--shadow-xl)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}/chyawanprash.jpg`,
    alt: "Sugar-Free Chyawanprash",
    style: {
      width: "100%",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(GoldDivider, {
    onDark: true
  }, "Featured Product"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20,
      fontSize: 64,
      fontWeight: 700,
      lineHeight: 1.0,
      letterSpacing: "-0.015em",
      color: "var(--cream)"
    }
  }, "Sugar-Free", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: "italic",
      color: "var(--accent)"
    }
  }, "Chyawanprash.")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20,
      maxWidth: 460,
      color: "color-mix(in oklab, var(--cream) 80%, transparent)"
    }
  }, "A modern take on a 5,000-year-old Ayurvedic recipe \u2014 slow-cooked with amla, herbs and natural sweeteners. Zero refined sugar, zero compromises."), /*#__PURE__*/React.createElement("ul", {
    className: "ms-stack",
    style: {
      marginTop: 28,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      listStyle: "none",
      padding: 0
    }
  }, bullets.map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      borderRadius: 12,
      border: "1px solid color-mix(in oklab, var(--gold) 25%, transparent)",
      background: "color-mix(in oklab, var(--cream) 4%, transparent)",
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      placeItems: "center",
      height: 30,
      width: 30,
      borderRadius: "var(--radius-pill)",
      background: "var(--accent)",
      color: "var(--forest-deep)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12l5 5L20 7"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500
    }
  }, b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(WhatsAppButton, {
    message: "Hi! I'd like to order Sugar-Free Chyawanprash."
  }, "Order Chyawanprash")))));
}

/* ---------- testimonials ---------- */
function Testimonials() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--primary)",
      color: "var(--primary-foreground)",
      padding: "96px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(GoldDivider, {
    align: "center",
    onDark: true
  }, "Loved by Families"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20,
      fontSize: 64,
      fontWeight: 700,
      lineHeight: 1.04,
      letterSpacing: "-0.015em",
      color: "var(--cream)"
    }
  }, "Trusted in homes across Punjab.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: 24
    }
  }, TESTIMONIALS.map(t => /*#__PURE__*/React.createElement(Testimonial, _extends({
    key: t.name
  }, t))))));
}

/* ---------- founder ---------- */
function Founder() {
  return /*#__PURE__*/React.createElement("section", {
    id: "founder",
    style: {
      background: "color-mix(in oklab, var(--secondary) 60%, var(--background))",
      padding: "96px 0",
      scrollMarginTop: 84
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container ms-stack",
    style: {
      display: "grid",
      gridTemplateColumns: "0.9fr 1.1fr",
      gap: 48,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden",
      borderRadius: 32,
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-lg)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}/founder.jpg`,
    alt: "Cherry Bansal, Founder",
    style: {
      width: "100%",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: -20,
      right: -20,
      borderRadius: 18,
      border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)",
      background: "var(--card)",
      padding: "12px 20px",
      textAlign: "center",
      boxShadow: "var(--shadow-lg)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 24,
      fontStyle: "italic",
      color: "var(--primary)"
    }
  }, "Cherry Bansal"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.25em",
      color: "var(--accent)"
    }
  }, "Founder \xB7 Kotkapura"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(GoldDivider, null, "Meet Our Founder"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20,
      fontSize: 64,
      fontWeight: 700,
      lineHeight: 1.04,
      letterSpacing: "-0.015em"
    }
  }, "A mother's recipe, made for every family."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 24,
      fontSize: 18,
      lineHeight: 1.7,
      color: "color-mix(in oklab, var(--foreground) 85%, transparent)"
    }
  }, "Cherry Bansal believes healthy living begins with pure ingredients and honest preparation. Every Mishthi Sattva product reflects her dedication to family wellness, hygiene and traditional values."), /*#__PURE__*/React.createElement("p", {
    className: "ms-hindi",
    style: {
      marginTop: 24,
      borderLeft: "2px solid var(--accent)",
      paddingLeft: 20,
      fontSize: 20,
      fontStyle: "italic",
      color: "var(--primary)"
    }
  }, "\"\u0938\u094D\u0935\u093E\u0926 \u0910\u0938\u093E \u091C\u094B \u0926\u093F\u0932 \u091C\u0940\u0924 \u0932\u0947, \u0914\u0930 \u0938\u0947\u0939\u0924 \u0910\u0938\u0940 \u091C\u093F\u0938 \u092A\u0930 \u092A\u0942\u0930\u093E \u092A\u0930\u093F\u0935\u093E\u0930 \u092D\u0930\u094B\u0938\u093E \u0915\u0930\u0947\u0964\""), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      fontSize: 14,
      color: "var(--muted-foreground)"
    }
  }, "\u2014 Cherry Bansal, Founder"))));
}

/* ---------- faq ---------- */
function FAQ() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--primary)",
      color: "var(--primary-foreground)",
      padding: "96px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container ms-stack",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.2fr",
      gap: 48,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(GoldDivider, {
    onDark: true
  }, "FAQ"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20,
      fontSize: 64,
      fontWeight: 700,
      lineHeight: 1.04,
      letterSpacing: "-0.015em",
      color: "var(--cream)"
    }
  }, "Questions, answered."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      color: "color-mix(in oklab, var(--cream) 75%, transparent)"
    }
  }, "Can't find what you're looking for? Message us on WhatsApp \u2014 we usually reply within minutes.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, FAQS.map((f, i) => /*#__PURE__*/React.createElement(FAQItem, {
    key: f.q,
    question: f.q,
    answer: f.a,
    defaultOpen: i === 0
  })))));
}

/* ---------- contact ---------- */
function Contact() {
  const rows = [{
    icon: "📞",
    label: "Call / WhatsApp",
    value: PHONE
  }, {
    icon: "📍",
    label: "Location",
    value: "Kotkapura, Punjab"
  }, {
    icon: "🚚",
    label: "Delivery",
    value: "Home delivery available"
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      padding: "96px 0",
      scrollMarginTop: 84
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container ms-stack",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 48,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(GoldDivider, null, "Get in Touch"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 20,
      fontSize: 64,
      fontWeight: 700,
      lineHeight: 1.04,
      letterSpacing: "-0.015em"
    }
  }, "Order directly on WhatsApp."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      color: "var(--muted-foreground)"
    }
  }, "We take orders, share the catalogue and answer questions on WhatsApp. Home delivery across Kotkapura and nearby areas."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.label,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      borderRadius: 18,
      border: "1px solid var(--border)",
      background: "var(--card)",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      placeItems: "center",
      height: 48,
      width: 48,
      flexShrink: 0,
      borderRadius: "var(--radius-pill)",
      background: "var(--primary)",
      color: "var(--primary-foreground)",
      fontSize: 20
    }
  }, r.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "var(--accent)"
    }
  }, r.label), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22,
      color: "var(--primary)"
    }
  }, r.value)))))), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 24,
      color: "var(--primary)"
    }
  }, "Send us a message"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 4,
      fontSize: 14,
      color: "var(--muted-foreground)"
    }
  }, "We'll continue the conversation on WhatsApp."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "Your name"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Phone",
    type: "tel",
    placeholder: "10-digit mobile"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Message",
    multiline: true,
    rows: 4,
    placeholder: "What would you like to order or ask?"
  }), /*#__PURE__*/React.createElement(WhatsAppButton, {
    fullWidth: true
  }, "Send via WhatsApp")))));
}

/* ---------- footer ---------- */
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--primary)",
      color: "var(--primary-foreground)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 40,
      padding: "64px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}/mishthi-logo.png`,
    alt: "Mishthi Sattva",
    style: {
      height: 64,
      width: 64,
      objectFit: "contain"
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "ms-hindi",
    style: {
      marginTop: 20,
      maxWidth: 280,
      fontSize: 14,
      color: "color-mix(in oklab, var(--cream) 70%, transparent)"
    }
  }, "\u0918\u0930 \u0915\u0940 \u0930\u0938\u094B\u0908 \u0938\u0947\u2026 \u0906\u092A\u0915\u0947 \u092A\u0930\u093F\u0935\u093E\u0930 \u0915\u0940 \u0938\u0947\u0939\u0924 \u0924\u0915\u0964")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 14,
      textTransform: "uppercase",
      letterSpacing: "0.25em",
      color: "var(--accent)"
    }
  }, "Contact"), /*#__PURE__*/React.createElement("ul", {
    style: {
      marginTop: 16,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontSize: 14,
      listStyle: "none",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("li", null, "\uD83D\uDCDE ", PHONE), /*#__PURE__*/React.createElement("li", null, "\uD83D\uDCCD Kotkapura, Punjab"), /*#__PURE__*/React.createElement("li", null, "\uD83D\uDE9A Home Delivery Available"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 14,
      textTransform: "uppercase",
      letterSpacing: "0.25em",
      color: "var(--accent)"
    }
  }, "Follow Us"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: "flex",
      gap: 12
    }
  }, ["Instagram", "Facebook", "WhatsApp"].map(s => /*#__PURE__*/React.createElement("a", {
    key: s,
    href: "#",
    style: {
      borderRadius: "var(--radius-pill)",
      border: "1px solid color-mix(in oklab, var(--cream) 20%, transparent)",
      padding: "8px 16px",
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.04em"
    }
  }, s))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid color-mix(in oklab, var(--cream) 10%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      padding: "20px",
      fontSize: 12,
      color: "color-mix(in oklab, var(--cream) 60%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("p", null, "\xA9 ", new Date().getFullYear(), " Mishthi Sattva. All rights reserved."), /*#__PURE__*/React.createElement("p", null, "Crafted with love in Kotkapura, Punjab."))));
}
function StickyWhatsApp() {
  return /*#__PURE__*/React.createElement("a", {
    href: `https://wa.me/918557942246`,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": "Order on WhatsApp",
    style: {
      position: "fixed",
      bottom: 20,
      right: 20,
      zIndex: 50,
      display: "grid",
      placeItems: "center",
      height: 56,
      width: 56,
      borderRadius: "var(--radius-pill)",
      background: "var(--whatsapp)",
      color: "#fff",
      boxShadow: "var(--shadow-xl)",
      border: "4px solid color-mix(in oklab, var(--whatsapp) 25%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 32 32",
    width: 28,
    height: 28,
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19.11 17.36c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.46-.83-2-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16 4C9.37 4 4 9.37 4 16c0 2.11.55 4.09 1.52 5.81L4 28l6.36-1.49A11.92 11.92 0 0 0 16 28c6.63 0 12-5.37 12-12S22.63 4 16 4z"
  })));
}
function HomePage() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--background)",
      color: "var(--foreground)"
    }
  }, /*#__PURE__*/React.createElement(Header, {
    active: "home"
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(MarqueeStrip, null), /*#__PURE__*/React.createElement(WhyUs, null), /*#__PURE__*/React.createElement(Featured, null), /*#__PURE__*/React.createElement(Testimonials, null)), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(StickyWhatsApp, null));
}
function AboutPage() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--background)",
      color: "var(--foreground)"
    }
  }, /*#__PURE__*/React.createElement(Header, {
    active: "about"
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(Founder, null), /*#__PURE__*/React.createElement(WhyUs, null), /*#__PURE__*/React.createElement(Testimonials, null)), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(StickyWhatsApp, null));
}
function ProductsPage() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--background)",
      color: "var(--foreground)"
    }
  }, /*#__PURE__*/React.createElement(Header, {
    active: "products"
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Products, null), /*#__PURE__*/React.createElement(Featured, null)), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(StickyWhatsApp, null));
}
function ContactPage() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--background)",
      color: "var(--foreground)"
    }
  }, /*#__PURE__*/React.createElement(Header, {
    active: "contact"
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Contact, null), /*#__PURE__*/React.createElement(FAQ, null)), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(StickyWhatsApp, null));
}

/* legacy single-page export kept for compatibility */
function Website() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--background)",
      color: "var(--foreground)"
    }
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(MarqueeStrip, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(WhyUs, null), /*#__PURE__*/React.createElement(Products, null), /*#__PURE__*/React.createElement(Featured, null), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(Founder, null), /*#__PURE__*/React.createElement(FAQ, null), /*#__PURE__*/React.createElement(Contact, null)), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(StickyWhatsApp, null));
}
window.MSWebsite = {
  HomePage,
  AboutPage,
  ProductsPage,
  ContactPage,
  Website
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BenefitTile = __ds_scope.BenefitTile;

__ds_ns.FAQItem = __ds_scope.FAQItem;

__ds_ns.GoldDivider = __ds_scope.GoldDivider;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Testimonial = __ds_scope.Testimonial;

__ds_ns.WhatsAppButton = __ds_scope.WhatsAppButton;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

})();
