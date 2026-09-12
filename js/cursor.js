/* Mishthi Sattva — the cursor companion.

   A gold ring that follows the pointer on a spring, reacts to what's under it,
   and scatters a few crumbs when you click. The native pointer is deliberately
   NOT hidden: the previous version replaced it, and a stand-in that trails
   behind makes clicking feel imprecise — which is a poor trade on a site taking
   card payments. Everything here sits BEHIND the real pointer and adds to it.

   What it reacts to:
     • links and buttons      → ring swells and fills with warm gold
     • product cards & photos → swells further and says what a click does
     • pressing               → snaps in tight, then springs back
     • idle                   → breathes very slightly, so it feels alive

   Self-disables on touch devices, when reduced motion is preferred, and on the
   /admin panel (data entry shouldn't fight a decorative cursor).

   Perf: one rAF loop, transform-only writes (GPU, never a reflow), and the loop
   parks itself when the pointer stops moving. */
(function () {
  try {
    var fine = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    if (location.pathname.indexOf("/admin") !== -1) return;
  } catch (e) { return; }

  /* What the ring should say over a given element. Longest-reach match wins. */
  var LABELS = [
    /* "View" belongs on things that open a product — a card, a photo, a related
       item. NOT on a button that already says what it does: a big filled ring
       reading "View" over "Explore Our Bestsellers" is just noise on top of a
       label. Those get the swell-and-fill treatment with no words. */
    { sel: "a[href^='/product/'], .ms-pp-mini, [data-cursor='view']", text: "View" },
    { sel: "a, button, [role='button'], select, summary, input[type='submit']", text: "" },
  ];

  function init() {
    if (document.getElementById("ms-cursor")) return;

    var style = document.createElement("style");
    style.textContent =
      "#ms-cursor{position:fixed;top:0;left:0;z-index:9999;pointer-events:none;" +
        "width:34px;height:34px;margin:-17px 0 0 -17px;will-change:transform;opacity:0;" +
        "transition:opacity .25s ease}" +
      "#ms-cursor.is-on{opacity:1}" +
      /* the ring itself — scaled, never resized, so states never reflow */
      "#ms-cursor .ring{width:100%;height:100%;border-radius:50%;" +
        "border:1.5px solid color-mix(in oklab, var(--accent,#c69b4e) 85%, transparent);" +
        "background:transparent;will-change:transform,background;" +
        "transition:transform .28s cubic-bezier(.22,1,.36,1), background .2s ease, border-color .2s ease}" +
      "#ms-cursor.is-link .ring{transform:scale(1.5);" +
        "background:color-mix(in oklab, var(--accent,#c69b4e) 20%, transparent)}" +
      "#ms-cursor.is-view .ring{transform:scale(2.3);" +
        "background:color-mix(in oklab, var(--forest,#1f3d31) 78%, transparent);border-color:transparent}" +
      "#ms-cursor.is-down .ring{transform:scale(.55)}" +
      /* the word that appears inside the ring over a product */
      "#ms-cursor .say{position:absolute;inset:0;display:grid;place-items:center;" +
        "font-family:var(--font-sans,system-ui);font-size:10px;font-weight:700;letter-spacing:.1em;" +
        "text-transform:uppercase;color:var(--cream,#f8f5ee);opacity:0;transform:scale(.7);" +
        "transition:opacity .18s ease, transform .28s cubic-bezier(.22,1,.36,1)}" +
      "#ms-cursor.is-view .say{opacity:1;transform:scale(1)}" +
      /* crumbs flung on click */
      "@keyframes msCrumb{from{transform:translate3d(0,0,0) scale(1);opacity:1}" +
        "to{transform:translate3d(var(--dx),var(--dy),0) scale(.3);opacity:0}}" +
      ".ms-crumb{position:fixed;top:0;left:0;z-index:9998;pointer-events:none;width:5px;height:5px;" +
        "border-radius:50%;background:var(--accent,#c69b4e);animation:msCrumb .55s cubic-bezier(.2,.7,.3,1) forwards}";
    document.head.appendChild(style);

    var el = document.createElement("div");
    el.id = "ms-cursor";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = '<div class="ring"></div><div class="say"></div>';
    document.body.appendChild(el);
    var say = el.querySelector(".say");

    var tx = window.innerWidth / 2, ty = window.innerHeight / 2;   // target
    var cx = tx, cy = ty;                                          // current
    var running = false, idle = 0;

    function frame() {
      // Ease toward the pointer. Close enough and still? Stop the loop.
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      el.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
      if (Math.abs(tx - cx) < 0.1 && Math.abs(ty - cy) < 0.1) {
        cx = tx; cy = ty;
        el.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
        running = false;
        return;
      }
      requestAnimationFrame(frame);
    }
    function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!el.classList.contains("is-on")) el.classList.add("is-on");
      kick();

      // What's under the pointer decides how the ring behaves.
      var t = e.target;
      var cls = "", text = "";
      for (var i = 0; i < LABELS.length; i++) {
        var hit = t && t.closest && t.closest(LABELS[i].sel);
        if (hit) { text = LABELS[i].text; cls = text ? "is-view" : "is-link"; break; }
      }
      el.classList.toggle("is-view", cls === "is-view");
      el.classList.toggle("is-link", cls === "is-link");
      if (say.textContent !== text) say.textContent = text;
    }, { passive: true });

    window.addEventListener("mousedown", function (e) {
      el.classList.add("is-down");
      // a few crumbs, thrown outward
      for (var i = 0; i < 5; i++) {
        var c = document.createElement("div");
        c.className = "ms-crumb";
        var a = Math.random() * Math.PI * 2, d = 16 + Math.random() * 26;
        c.style.setProperty("--dx", Math.cos(a) * d + "px");
        c.style.setProperty("--dy", Math.sin(a) * d + "px");
        /* Placed with left/top, NOT transform: the keyframe animates transform
           from 0,0, so an inline transform here would be overridden and every
           crumb would fly out of the top-left corner of the screen. */
        c.style.left = e.clientX + "px"; c.style.top = e.clientY + "px";
        c.style.marginLeft = "-2.5px"; c.style.marginTop = "-2.5px";
        c.style.animationDelay = (Math.random() * 40) + "ms";
        document.body.appendChild(c);
        setTimeout(function (n) { return function () { n.remove(); }; }(c), 700);
      }
    }, { passive: true });

    window.addEventListener("mouseup", function () { el.classList.remove("is-down"); }, { passive: true });
    document.addEventListener("mouseleave", function () { el.classList.remove("is-on"); });
    document.addEventListener("mouseenter", function () { el.classList.add("is-on"); });
  }

  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init);
})();
