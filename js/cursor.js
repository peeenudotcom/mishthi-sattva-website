/* Mishthi Sattva — soft brand cursor.
   A gentle gold ring that eases toward the pointer and grows over interactive
   elements. Purely decorative: the real cursor stays visible so clicking is
   never harder. Self-disables on touch devices and when the visitor prefers
   reduced motion. No dependencies. */
(function () {
  // Only for a precise pointer (mouse), and never when reduced motion is asked for.
  try {
    var fine = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
  } catch (e) { return; }

  function init() {
    if (document.getElementById("ms-cursor")) return;

    var style = document.createElement("style");
    style.textContent =
      "#ms-cursor{position:fixed;top:0;left:0;width:26px;height:26px;border-radius:50%;" +
      "border:1.5px solid var(--accent,#c69b4e);" +
      "background:color-mix(in oklab, var(--accent,#c69b4e) 12%, transparent);" +
      "pointer-events:none;z-index:2147483000;opacity:0;" +
      "transform:translate3d(-50%,-50%,0);" +
      "transition:width .18s ease,height .18s ease,background .18s ease,opacity .25s ease;" +
      "will-change:transform}" +
      "#ms-cursor.is-hover{width:48px;height:48px;background:color-mix(in oklab, var(--accent,#c69b4e) 20%, transparent);}" +
      "#ms-cursor.is-down{width:20px;height:20px;}";
    document.head.appendChild(style);

    var dot = document.createElement("div");
    dot.id = "ms-cursor";
    dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot);

    var INTERACTIVE = "a,button,[role=button],input,textarea,select,label,summary";
    var tx = window.innerWidth / 2, ty = window.innerHeight / 2, x = tx, y = ty, shown = false;

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { shown = true; dot.style.opacity = "1"; }
      var over = e.target && e.target.closest && e.target.closest(INTERACTIVE);
      dot.classList.toggle("is-hover", !!over);
    }, { passive: true });

    document.addEventListener("mouseleave", function () { dot.style.opacity = "0"; shown = false; });
    window.addEventListener("mousedown", function () { dot.classList.add("is-down"); });
    window.addEventListener("mouseup", function () { dot.classList.remove("is-down"); });

    function frame() {
      // ease toward the pointer for a soft trailing lag
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      dot.style.transform = "translate3d(" + x + "px," + y + "px,0) translate(-50%,-50%)";
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init);
})();
