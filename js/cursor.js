/* Mishthi Sattva — laddu cursor.
   A little golden laddu becomes the pointer, with a soft gold ring trailing
   behind that grows over clickable things. Clicking gives a quick "nibble"
   (the laddu chomps) and a small burst of crumbs. Playful but on-brand.

   Self-disables on touch devices, when reduced motion is preferred, and on the
   /admin panel (data entry shouldn't fight a custom cursor). No dependencies.

   Perf: elements are positioned with transform: translate3d (GPU, no layout);
   hover/chomp use transform: scale on inner nodes so states never reflow. */
(function () {
  try {
    var fine = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    if (location.pathname.indexOf("/admin") !== -1) return; // keep the admin cursor normal
  } catch (e) { return; }

  function init() {
    if (document.getElementById("ms-laddu")) return;

    var style = document.createElement("style");
    style.textContent =
      /* hide the native pointer once the laddu is active (caret still works in fields) */
      "html.ms-cursor-on, html.ms-cursor-on *{cursor:none !important}" +

      /* trailing ring */
      "#ms-ring{position:fixed;top:0;left:0;width:42px;height:42px;pointer-events:none;" +
      "z-index:2147483500;opacity:0;transform:translate3d(-50%,-50%,0);transition:opacity .25s ease;will-change:transform}" +
      "#ms-ring .r{width:100%;height:100%;border-radius:50%;border:1.5px solid var(--accent,#c69b4e);" +
      "background:color-mix(in oklab, var(--accent,#c69b4e) 10%, transparent);" +
      "transform:scale(.5);transition:transform .18s ease,background .18s ease;will-change:transform}" +
      "#ms-ring.is-hover .r{transform:scale(1);background:color-mix(in oklab, var(--accent,#c69b4e) 18%, transparent)}" +
      "#ms-ring.is-down .r{transform:scale(.4)}" +

      /* the laddu itself (tracks the pointer exactly) */
      "#ms-laddu{position:fixed;top:0;left:0;width:18px;height:18px;pointer-events:none;" +
      "z-index:2147483600;opacity:0;transform:translate3d(-50%,-50%,0);transition:opacity .2s ease;will-change:transform}" +
      "#ms-laddu .body{width:100%;height:100%;border-radius:50%;will-change:transform;" +
      "background:" +
        "radial-gradient(circle at 30% 26%, rgba(255,255,255,.55) 0 9%, transparent 13%)," +
        "radial-gradient(circle at 66% 40%, #6b4a12 0 9%, transparent 12%)," +
        "radial-gradient(circle at 40% 67%, #5a3d0f 0 8%, transparent 11%)," +
        "radial-gradient(circle at 73% 71%, #7a5416 0 7%, transparent 10%)," +
        "radial-gradient(circle at 22% 55%, #6b4a12 0 5%, transparent 8%)," +
        "radial-gradient(circle at 38% 34%, #E6C066 0%, #C9962F 52%, #8a5f1d 100%);" +
      "box-shadow:0 2px 5px rgba(90,61,15,.45)}" +
      "@keyframes msChomp{0%{transform:scale(1)}30%{transform:scale(.62)}45%{transform:scale(.62)}75%{transform:scale(1.1)}100%{transform:scale(1)}}" +
      "#ms-laddu .body.chomp{animation:msChomp .32s ease}" +

      /* crumbs flung on click */
      ".ms-crumb{position:fixed;top:0;left:0;border-radius:50%;pointer-events:none;z-index:2147483400;" +
      "will-change:transform,opacity;transition:transform .5s cubic-bezier(.2,.6,.2,1),opacity .5s ease}";
    document.head.appendChild(style);

    var ring = document.createElement("div");
    ring.id = "ms-ring"; ring.setAttribute("aria-hidden", "true");
    ring.innerHTML = '<div class="r"></div>';
    var laddu = document.createElement("div");
    laddu.id = "ms-laddu"; laddu.setAttribute("aria-hidden", "true");
    laddu.innerHTML = '<div class="body"></div>';
    var body = laddu.firstChild;
    document.body.appendChild(ring);
    document.body.appendChild(laddu);
    document.documentElement.classList.add("ms-cursor-on");

    var INTERACTIVE = "a,button,[role=button],input,textarea,select,label,summary";
    var CRUMB_COLORS = ["#9A6B1E", "#C9962F", "#6b4a12", "#7a5416"];
    var tx = window.innerWidth / 2, ty = window.innerHeight / 2, rx = tx, ry = ty, shown = false;

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { shown = true; ring.style.opacity = "1"; laddu.style.opacity = "1"; }
      // laddu tracks the pointer exactly (no lag)
      laddu.style.transform = "translate3d(" + tx + "px," + ty + "px,0) translate(-50%,-50%)";
      var over = e.target && e.target.closest && e.target.closest(INTERACTIVE);
      ring.classList.toggle("is-hover", !!over);
    }, { passive: true });

    document.addEventListener("mouseleave", function () { ring.style.opacity = "0"; laddu.style.opacity = "0"; shown = false; });

    function chomp() {
      ring.classList.add("is-down");
      body.classList.remove("chomp"); void body.offsetWidth; body.classList.add("chomp");
      // fling a few crumbs from the pointer
      var n = 5;
      for (var i = 0; i < n; i++) {
        var c = document.createElement("div");
        c.className = "ms-crumb";
        var sz = 3 + Math.round(Math.random() * 3);
        c.style.width = sz + "px"; c.style.height = sz + "px";
        c.style.background = CRUMB_COLORS[i % CRUMB_COLORS.length];
        c.style.transform = "translate3d(" + tx + "px," + ty + "px,0) translate(-50%,-50%)";
        document.body.appendChild(c);
        (function (el) {
          var ang = Math.random() * Math.PI * 2, dist = 14 + Math.random() * 20;
          var dx = tx + Math.cos(ang) * dist, dy = ty + Math.sin(ang) * dist + 10; // slight gravity
          requestAnimationFrame(function () {
            el.style.transform = "translate3d(" + dx + "px," + dy + "px,0) translate(-50%,-50%) scale(.4)";
            el.style.opacity = "0";
          });
          setTimeout(function () { el.remove(); }, 560);
        })(c);
      }
    }
    window.addEventListener("mousedown", chomp);
    window.addEventListener("mouseup", function () { ring.classList.remove("is-down"); });

    function frame() {
      // ring eases toward the pointer for a soft trailing lag
      rx += (tx - rx) * 0.16; ry += (ty - ry) * 0.16;
      ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0) translate(-50%,-50%)";
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init);
})();
