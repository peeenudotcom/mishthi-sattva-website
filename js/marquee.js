/* Mishthi Sattva — the announcement bar that scrolls across the top of every
   page.

   Written as plain DOM rather than a React component because the website and
   the shop have separate React trees and separate headers; this way the bar is
   defined once, appears identically everywhere, and neither tree has to know
   about it. Skips the admin panel.

   Messages come from window.MS_MARQUEE (js/config.js) so the owner has one
   place to change what it says. */
(function () {
  try { if (location.pathname.indexOf("/admin") !== -1) return; } catch (e) { return; }

  function init() {
    if (document.getElementById("ms-marquee")) return;
    var msgs = (window.MS_MARQUEE || []).filter(Boolean);
    if (!msgs.length) return;

    var bar = document.createElement("div");
    bar.id = "ms-marquee";
    bar.setAttribute("role", "complementary");
    bar.setAttribute("aria-label", "Offers and announcements");

    var track = document.createElement("div");
    track.className = "ms-marquee-track";

    /* The strip is rendered twice, back to back. The animation moves it by
       exactly half its width, so the second copy lands where the first began
       and the loop is seamless — no jump, no gap. */
    function strip() {
      var g = document.createElement("div");
      g.className = "ms-marquee-group";
      g.setAttribute("aria-hidden", "false");
      msgs.forEach(function (m) {
        /* Each message may carry an href. A claim the visitor can act on —
           "free delivery above ₹999", "FSSAI registered" — should take them to
           the page that backs it up, rather than being a line of text that
           scrolls by and can't be checked. */
        var text = typeof m === "string" ? m : m.text;
        var href = typeof m === "string" ? null : m.href;
        var item = document.createElement(href ? "a" : "span");
        item.className = "ms-marquee-item";
        if (href) item.href = href;
        item.textContent = text;
        g.appendChild(item);
        var dot = document.createElement("span");
        dot.className = "ms-marquee-dot";
        dot.setAttribute("aria-hidden", "true");
        dot.textContent = "✦";
        g.appendChild(dot);
      });
      return g;
    }
    track.appendChild(strip());
    var copy = strip();
    copy.setAttribute("aria-hidden", "true");   // a screen reader should hear it once
    // ...and tabbing must not land on the duplicate's links either.
    Array.prototype.forEach.call(copy.querySelectorAll("a"), function (a) { a.tabIndex = -1; });
    track.appendChild(copy);

    bar.appendChild(track);
    document.body.insertBefore(bar, document.body.firstChild);

    // Longer strips need proportionally longer to cross, or short ones race.
    requestAnimationFrame(function () {
      var w = track.scrollWidth / 2;
      if (w > 0) track.style.animationDuration = Math.max(18, Math.round(w / 55)) + "s";
    });
  }

  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init);
})();
