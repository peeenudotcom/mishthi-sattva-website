/* Mishthi Sattva — the product detail sections, shared by the shop and the
   website.

   Every product reads the same way, in the same order, so shoppers learn where
   to look: Product Description → Wellness Benefits → Ingredients → Nutritional
   Information → Storage & Shelf Life → Our Promise → Customer Reviews.
   A section with no data doesn't render — no empty headings.

   This lives outside both bundles because the shop's quick-view AND the
   website's product popup show the same thing; one copy means they can never
   drift apart. Depends only on React, MSData and MS_CONFIG/MS_PROMISE, so it is
   safe to load on any page. Exposes window.MSProductDetails. */

(function () {
const money = (n) => (n == null || isNaN(n) ? "" : "₹" + Number(n).toLocaleString("en-IN"));

/* Its own small icon set, so the file carries no dependency on the shop's. */
const Ico = {
  leaf: (p) => <svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="currentColor" aria-hidden="true"><path d="M17 4C9 4 4 9 4 17c0 1.7.3 3 .7 3 .4 0 .8-.8 1.4-2 2-4.2 5.6-7 10-7.6.6-.1.9.6.4.9-4.3 2.4-7.1 5.7-8.4 9.7-.3.8.7 1.3 1.3.7C13.9 17.5 20 14.5 20 7c0-1.7-1.3-3-3-3z"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" width={p.s||15} height={p.s||15} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>,
  star: (p) => <svg viewBox="0 0 24 24" width={p.s||13} height={p.s||13} fill="currentColor" aria-hidden="true"><path d="M12 2l2.9 6.3 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 21l1.3-6.7-5-4.6 6.8-.8z"/></svg>,
  wa: (p) => <svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.06 1.6 5.83L2 22l4.4-1.15a9.9 9.9 0 0 0 5.64 1.76h.01c5.46 0 9.91-4.45 9.91-9.91C22.06 6.45 17.5 2 12.04 2Zm5.8 14.16c-.24.68-1.4 1.3-1.94 1.35-.5.05-.95.24-3.2-.67-2.7-1.06-4.42-3.8-4.55-3.98-.13-.18-1.1-1.46-1.1-2.79 0-1.33.7-1.98.95-2.25.24-.27.53-.34.7-.34.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.54.8 1.87.87 2 .07.13.12.29.02.47-.1.18-.15.29-.29.45-.14.16-.3.36-.43.48-.14.13-.29.28-.12.55.17.27.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.33 1.46.27.13.43.11.6-.07.16-.18.68-.8.86-1.07.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.86.27.13.45.2.51.31.06.11.06.63-.18 1.31Z"/></svg>,
};

function MiniStars({ value, size = 13 }) {
  return (
    <span style={{ display: "inline-flex", color: "var(--accent)" }}>
      {[0,1,2,3,4].map((i) => <span key={i} style={{ opacity: i < Math.round(value) ? 1 : 0.25 }}><Ico.star s={size} /></span>)}
    </span>
  );
}

/* The open/closed arrow on each section heading. */
function Chevron({ open }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
         style={{ transition: "transform .2s ease", transform: open ? "rotate(180deg)" : "none", flexShrink: 0 }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{ borderTop: "1px solid var(--border)" }}>
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "16px 2px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", color: "var(--primary)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, letterSpacing: "0.01em" }}>
        {title}
        <Chevron open={open} />
      </button>
      {open && <div style={{ padding: "0 2px 20px" }}>{children}</div>}
    </div>
  );
}

const bodyText = { margin: 0, fontSize: 14.5, lineHeight: 1.7, color: "color-mix(in oklab, var(--foreground) 82%, transparent)" };

/* Benefits accept either rich objects ({title, text}) or plain strings, so the
   older `facts` lists keep working until each product is filled in properly. */
function BenefitList({ items }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 12 }}>
      {items.map((b, i) => {
        const title = typeof b === "string" ? b : b.title;
        const text = typeof b === "string" ? "" : b.text;
        return (
          <li key={i} style={{ display: "flex", gap: 10 }}>
            <span style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }}><Ico.leaf s={16} /></span>
            <span>
              <strong style={{ display: "block", fontSize: 14, color: "var(--primary)" }}>{title}</strong>
              {text ? <span style={{ fontSize: 14, lineHeight: 1.6, color: "var(--muted-foreground)" }}>{text}</span> : null}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function NutritionTable({ nutrition }) {
  const rows = (nutrition && nutrition.rows) || [];
  const cell = { padding: "9px 12px", fontSize: 14, borderTop: "1px solid var(--border)" };
  return (
    <div>
      {nutrition.serving && (
        <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)" }}>
          Per {nutrition.serving}
        </p>
      )}
      <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", background: "var(--card)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={i === 0 ? { } : {}}>
                <td style={{ ...cell, color: "var(--muted-foreground)", borderTop: i === 0 ? "none" : cell.borderTop }}>{r.label}</td>
                <td style={{ ...cell, textAlign: "right", fontWeight: 700, color: "var(--primary)", borderTop: i === 0 ? "none" : cell.borderTop, whiteSpace: "nowrap" }}>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {nutrition.note && <p style={{ margin: "10px 0 0", fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6 }}>{nutrition.note}</p>}
    </div>
  );
}

/* Published reviews for this product. Reviews are stored with the product NAME
   (that's how the admin approves them), so match on that. */
function ReviewList({ product }) {
  const [state, setState] = React.useState({ loading: true, items: [] });
  React.useEffect(() => {
    let alive = true;
    const D = window.MSData;
    if (!D || !D.configured) { setState({ loading: false, items: [] }); return; }
    D.getReviews().then((rows) => {
      if (!alive) return;
      const name = (product.name || "").trim().toLowerCase();
      const mine = (rows || []).filter((r) => (r.product_name || "").trim().toLowerCase() === name);
      setState({ loading: false, items: mine });
    }).catch(() => alive && setState({ loading: false, items: [] }));
    return () => { alive = false; };
  }, [product.id]);

  if (state.loading) return <p style={bodyText}>Loading reviews…</p>;
  if (!state.items.length) {
    return (
      <div>
        <p style={bodyText}>No written reviews for this one yet — you could be the first.</p>
        <a href={"https://wa.me/" + ((window.MS_CONFIG && window.MS_CONFIG.WHATSAPP) || "") + "?text=" + encodeURIComponent("Hi! I'd like to leave a review for " + product.name)}
           target="_blank" rel="noopener noreferrer"
           style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 13, fontWeight: 700, color: "var(--primary)", textDecoration: "none" }}>
          <Ico.wa s={16} /> Share your experience
        </a>
      </div>
    );
  }
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {state.items.map((r) => (
        <div key={r.id} style={{ padding: "14px 16px", borderRadius: "var(--radius-md)", background: "var(--secondary)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <strong style={{ fontSize: 14, color: "var(--primary)" }}>{r.customer_name}{r.city ? <span style={{ fontWeight: 400, color: "var(--muted-foreground)" }}> · {r.city}</span> : null}</strong>
            {r.rating ? <MiniStars value={r.rating} size={13} /> : null}
          </div>
          <p style={{ ...bodyText, marginTop: 8 }}>“{r.quote}”</p>
        </div>
      ))}
    </div>
  );
}

function ProductDetails({ product }) {
  const description = product.long_desc || product.desc;
  const benefits = (product.wellness_benefits && product.wellness_benefits.length)
    ? product.wellness_benefits
    : (product.facts || []);
  const ingredients = product.ingredients || [];
  const nutrition = product.nutrition || {};
  const hasNutrition = nutrition.rows && nutrition.rows.length;
  const storage = product.storage_info;
  const shelf = product.shelf_life;
  const promise = (product.promise && product.promise.length) ? product.promise : (window.MS_PROMISE || []);

  return (
    <div style={{ marginTop: 26 }}>
      {description && (
        <Section title="Product Description" defaultOpen>
          <p style={bodyText}>{description}</p>
          {product.usage_info && (
            <React.Fragment>
              <p style={{ margin: "16px 0 6px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)" }}>How to use</p>
              <p style={bodyText}>{product.usage_info}</p>
            </React.Fragment>
          )}
        </Section>
      )}

      {benefits.length > 0 && (
        <Section title="Wellness Benefits"><BenefitList items={benefits} /></Section>
      )}

      {ingredients.length > 0 && (
        <Section title="Ingredients">
          {/* Single words sit nicely in pills; phrases ("nuts like almonds,
              cashews, walnuts") do not — they wrap badly and look broken. So the
              shape follows the content: pills for short entries, a list for
              anything written out longhand. */}
          {ingredients.some((ing) => String(ing).length > 24) ? (
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 9 }}>
              {ingredients.map((ing, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.6, color: "color-mix(in oklab, var(--foreground) 82%, transparent)" }}>
                  <span style={{ color: "var(--accent)", marginTop: 3, flexShrink: 0 }}><Ico.leaf s={14} /></span>{ing}
                </li>
              ))}
            </ul>
          ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ingredients.map((ing) => (
              <span key={ing} style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)", background: "var(--secondary)", padding: "7px 12px", borderRadius: "var(--radius-pill)" }}>{ing}</span>
            ))}
          </div>
          )}
          {product.allergens && (
            <p style={{ margin: "14px 0 0", fontSize: 13, lineHeight: 1.6, color: "var(--destructive)", fontWeight: 600 }}>Allergen information: {product.allergens}</p>
          )}
        </Section>
      )}

      {hasNutrition && (
        <Section title="Nutritional Information"><NutritionTable nutrition={nutrition} /></Section>
      )}

      {(storage || shelf) && (
        <Section title="Storage & Shelf Life">
          {storage && <p style={bodyText}>{storage}</p>}
          {shelf && <p style={{ ...bodyText, marginTop: storage ? 12 : 0 }}><strong style={{ color: "var(--primary)" }}>Best before:</strong> {shelf}</p>}
        </Section>
      )}

      {promise.length > 0 && (
        <Section title="Our Promise">
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
            {promise.map((p) => (
              <li key={p} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.6, color: "color-mix(in oklab, var(--foreground) 82%, transparent)" }}>
                <span style={{ color: "var(--accent)", marginTop: 3, flexShrink: 0 }}><Ico.check s={15} /></span>{p}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Customer Reviews"><ReviewList product={product} /></Section>
    </div>
  );
}

window.MSProductDetails = { ProductDetails, Section };
})();
