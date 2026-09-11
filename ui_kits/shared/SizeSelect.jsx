/* Mishthi Sattva — the size (weight variant) picker.

   A custom listbox rather than a native <select>, so each size can show its
   price and saving on its own line, the open panel can animate, and the chosen
   size gets a tick. Shared by the shop's cards and quick-view and by the
   website's product popup. Exposes window.MSSizeSelect.

   Accessibility is the reason this is a button + listbox and not a styled div:
   it keeps the keyboard behaviour a <select> gives for free — ↑/↓ to move,
   Enter/Space to choose, Escape to close, Home/End to jump — plus the ARIA
   roles a screen reader needs. Motion is CSS and switches off under
   prefers-reduced-motion. */

(function () {
const rupees = (n) => (n == null || isNaN(n) ? null : "₹" + Number(n).toLocaleString("en-IN"));

function Tick() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
  );
}

function Caret() {
  return (
    <svg className="ms-ss-caret" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
         strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
  );
}

function SizeSelect({ variants, index, onPick, size, label = "Choose size" }) {
  const big = size === "lg";
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(index);   // keyboard cursor
  const rootRef = React.useRef(null);
  const listRef = React.useRef(null);
  const id = React.useRef("ms-ss-" + Math.random().toString(36).slice(2, 8)).current;

  const sel = variants[index] || variants[0] || {};
  const close = React.useCallback(() => setOpen(false), []);

  // Clicking anywhere else, or pressing Escape, closes the panel.
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) close(); };
    /* Capture phase + stopPropagation: the quick-view and the product popup
       both close themselves on Escape. With the list open, Escape should shut
       the list and nothing else — otherwise dismissing a dropdown throws the
       shopper out of the whole product. */
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      close();
      const b = rootRef.current && rootRef.current.querySelector("button");
      if (b) b.focus();
    };
    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("keydown", onKey, true);
    return () => { document.removeEventListener("pointerdown", onDown, true); document.removeEventListener("keydown", onKey, true); };
  }, [open, close]);

  React.useEffect(() => { if (open) { setActive(index); if (listRef.current) listRef.current.focus(); } }, [open, index]);

  const choose = (i) => { onPick(i); setOpen(false); const b = rootRef.current && rootRef.current.querySelector("button"); if (b) b.focus(); };

  const onListKey = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Home" || e.key === "End") {
      e.preventDefault();
      setActive((a) => {
        if (e.key === "Home") return 0;
        if (e.key === "End") return variants.length - 1;
        const next = e.key === "ArrowDown" ? a + 1 : a - 1;
        return (next + variants.length) % variants.length;   // wrap, like a native select
      });
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); choose(active);
    } else if (e.key === "Tab") {
      close();
    }
  };

  const saving = (v) => (v.mrp != null && v.price != null && v.mrp > v.price)
    ? Math.round((1 - v.price / v.mrp) * 100) : 0;

  return (
    <div ref={rootRef} className={"ms-ss" + (big ? " ms-ss--lg" : "")} onClick={(e) => e.stopPropagation()}>
      <button type="button" className={"ms-ss-btn" + (open ? " is-open" : "")}
        aria-haspopup="listbox" aria-expanded={open} aria-label={label}
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); } }}>
        <span className="ms-ss-val">
          <span className="ms-ss-weight">{sel.weight}</span>
          {rupees(sel.price) && <span className="ms-ss-price">{rupees(sel.price)}</span>}
        </span>
        <Caret />
      </button>

      {open && (
        <ul ref={listRef} className="ms-ss-panel" role="listbox" id={id} tabIndex={-1}
            aria-activedescendant={id + "-" + active} onKeyDown={onListKey}>
          {variants.map((v, i) => {
            const off = saving(v);
            return (
              <li key={v.weight + i} id={id + "-" + i} role="option" aria-selected={i === index}
                  className={"ms-ss-opt" + (i === index ? " is-sel" : "") + (i === active ? " is-active" : "")}
                  style={{ "--i": i }}
                  onMouseEnter={() => setActive(i)}
                  onClick={(e) => { e.stopPropagation(); choose(i); }}>
                <span className="ms-ss-opt-main">
                  <span className="ms-ss-opt-weight">{v.weight}</span>
                  <span className="ms-ss-opt-sub">
                    {rupees(v.price) || "Price on request"}
                    {off > 0 && <span className="ms-ss-save"> · save {off}%</span>}
                  </span>
                </span>
                {i === index && <span className="ms-ss-tick"><Tick /></span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

window.MSSizeSelect = { SizeSelect };
})();
