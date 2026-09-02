/* Mishthi Sattva — ambient background music with a mute toggle.

   Browsers block audio autoplay until the visitor interacts, so we start the
   track softly on their first gesture (click / scroll / key) — unless they've
   turned it off before (remembered in localStorage). A floating speaker button
   (bottom-left) lets them toggle any time. Self-hides if the track file is
   missing, and never runs on the /admin panel.

   Drop a royalty-free/licensed track at  assets/ambient.mp3  to enable it. */
(function () {
  try { if (location.pathname.indexOf("/admin") !== -1) return; } catch (e) { return; }

  var SRC = "/assets/ambient.mp3";
  var PREF = "ms_music";            // "on" | "off"
  var TARGET_VOL = 0.28;            // gentle
  var pref;
  try { pref = localStorage.getItem(PREF); } catch (e) { pref = null; }

  function save(v) { try { localStorage.setItem(PREF, v); } catch (e) {} }

  function init() {
    if (document.getElementById("ms-music-btn")) return;

    var audio = new Audio(SRC);
    audio.loop = true; audio.preload = "auto"; audio.volume = 0;
    var ready = false, missing = false, fadeTimer = null;

    var style = document.createElement("style");
    style.textContent =
      "#ms-music-btn{position:fixed;left:20px;bottom:20px;z-index:88;display:none;align-items:center;justify-content:center;" +
      "height:44px;width:44px;border-radius:var(--radius-pill,9999px);cursor:pointer;" +
      "background:color-mix(in oklab, var(--card,#fff) 92%, transparent);color:var(--primary,#1f3d31);" +
      "border:1px solid color-mix(in oklab, var(--accent,#c69b4e) 55%, var(--border,#e5ddd0));" +
      "box-shadow:var(--shadow-md,0 6px 18px -8px rgba(30,60,49,.25));backdrop-filter:blur(6px);" +
      "transition:transform .18s ease, box-shadow .18s ease}" +
      "#ms-music-btn:hover{transform:translateY(-2px);box-shadow:var(--shadow-lg,0 14px 36px -12px rgba(30,60,49,.3))}" +
      "#ms-music-btn svg{width:20px;height:20px}" +
      "#ms-music-btn .off{display:none}" +
      "#ms-music-btn.is-off .on{display:none}#ms-music-btn.is-off .off{display:block}" +
      /* gentle pulsing ring while playing, so people notice it's on */
      "#ms-music-btn.is-on::after{content:'';position:absolute;inset:-3px;border-radius:inherit;" +
      "border:1.5px solid color-mix(in oklab, var(--accent,#c69b4e) 55%, transparent);animation:msMusicPulse 2.4s ease-out infinite}" +
      "@keyframes msMusicPulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.5);opacity:0}}" +
      "@media (max-width:680px){#ms-music-btn{bottom:84px}}" +   /* clear the mobile call/WhatsApp bar */
      "@media (prefers-reduced-motion: reduce){#ms-music-btn.is-on::after{animation:none;opacity:0}}";
    document.head.appendChild(style);

    var btn = document.createElement("button");
    btn.id = "ms-music-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Toggle background music");
    btn.title = "Background music";
    btn.innerHTML =
      // speaker + sound waves (playing)
      '<svg class="on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>' +
      // speaker + x (muted)
      '<svg class="off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/></svg>';
    document.body.appendChild(btn);

    function fadeTo(target) {
      if (fadeTimer) clearInterval(fadeTimer);
      fadeTimer = setInterval(function () {
        var d = target - audio.volume;
        if (Math.abs(d) < 0.02) { audio.volume = target; clearInterval(fadeTimer); fadeTimer = null; if (target === 0) audio.pause(); return; }
        audio.volume = Math.max(0, Math.min(1, audio.volume + d * 0.15));
      }, 40);
    }

    function reflect(playing) { btn.classList.toggle("is-on", playing); btn.classList.toggle("is-off", !playing); }

    function play() {
      var p = audio.play();
      if (p && p.catch) p.catch(function () {}); // ignore autoplay rejection; button still works
      fadeTo(TARGET_VOL); reflect(true);
    }
    function stop() { fadeTo(0); reflect(false); }

    btn.addEventListener("click", function () {
      if (audio.paused) { save("on"); play(); }
      else { save("off"); stop(); }
    });

    // Show the button only once we know the track exists.
    audio.addEventListener("canplay", function () {
      if (missing) return;
      ready = true; btn.style.display = "flex"; reflect(!audio.paused);
    });
    audio.addEventListener("error", function () { missing = true; if (btn.parentNode) btn.remove(); });

    // Start on the first user gesture unless they turned it off before.
    if (pref !== "off") {
      var startOnce = function () {
        remove();
        if (pref === "off") return;
        // if the file is still loading, play() will resolve once ready
        play();
      };
      var remove = function () {
        ["pointerdown", "keydown", "scroll", "touchstart"].forEach(function (ev) {
          window.removeEventListener(ev, startOnce);
        });
      };
      ["pointerdown", "keydown", "scroll", "touchstart"].forEach(function (ev) {
        window.addEventListener(ev, startOnce, { once: false, passive: true });
      });
    } else {
      reflect(false);
    }
  }

  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init);
})();
