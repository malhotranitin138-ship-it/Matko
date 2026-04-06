/* ============================================================
   script.js — shared across all pages
   All DOM accesses are null-checked. Safe on every page.
   ============================================================ */

/* ── Music fade-in ─────────────────────────────────────────
   Reads localStorage flag set at unlock.
   Gracefully handles autoplay restrictions.
   ---------------------------------------------------------- */
function startMusic(targetVol) {
  if (localStorage.getItem("playMusic") !== "true") return;
  var el = document.getElementById("bgMusic");
  if (!el) return;
  el.volume = 0;
  var p = el.play();
  if (p !== undefined) {
    p.then(function () {
      var v = 0;
      var iv = setInterval(function () {
        v = Math.min(v + 0.02, targetVol);
        el.volume = v;
        if (v >= targetVol) clearInterval(iv);
      }, 150);
    }).catch(function () {});
  }
}

/* ── Floating hearts ────────────────────────────────────────
   Different heart emojis, random sizes, random speeds.
   pointer-events:none on container — never blocks clicks.
   ---------------------------------------------------------- */
function initHearts() {
  var container = document.querySelector(".hearts-container");
  if (!container) return;

  /* Mix of heart types for variety */
  var types = [
    { emoji: "💖", size: [18, 28] },
    { emoji: "💕", size: [14, 22] },
    { emoji: "💗", size: [16, 26] },
    { emoji: "💓", size: [14, 24] },
    { emoji: "💞", size: [16, 26] },
    { emoji: "🌸", size: [14, 20] },
    { emoji: "✨", size: [12, 18] },
    { emoji: "💝", size: [16, 24] },
  ];

  function spawn() {
    var t   = types[Math.floor(Math.random() * types.length)];
    var sz  = t.size[0] + Math.random() * (t.size[1] - t.size[0]);
    var dur = 6 + Math.random() * 5;   /* 6–11 s */

    var h = document.createElement("div");
    h.className = "heart";
    h.textContent = t.emoji;
    h.style.left             = (Math.random() * 98) + "%";
    h.style.fontSize         = sz + "px";
    h.style.animationDuration = dur + "s";
    h.style.opacity          = (0.55 + Math.random() * 0.45).toFixed(2);

    container.appendChild(h);
    setTimeout(function () { if (h.parentNode) h.remove(); }, (dur + 0.5) * 1000);
  }

  /* Stagger initial spawn so they don't all appear at once */
  for (var i = 0; i < 6; i++) {
    (function (delay) { setTimeout(spawn, delay); })(i * 400);
  }
  setInterval(spawn, 500);
}

/* ── Typewriter ─────────────────────────────────────────── */
function typeWriter(el, text, speed) {
  if (!el) return;
  var i = 0;
  el.textContent = "";
  (function tick() {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      setTimeout(tick, speed || 36);
    }
  })();
}

/* ── Yes handler (home.html) ────────────────────────────── */
function sayYes() {
  window.location.href = "next.html";
}

/* ── DOM ready ──────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {

  /* Hearts on every page */
  initHearts();

  /* Music — called immediately after script.js loads on each page
     via inline <script>startMusic(0.4);</script>
     DOMContentLoaded is too late for some browsers, so we call it
     both ways; startMusic is idempotent (audio won't double-play). */

  /* Typewriter greeting — home.html */
  var textEl = document.getElementById("text");
  if (textEl) {
    var msg = "Heyyyyy, I hope you're having the most beautiful day 🥹\nBecause you deserve it — always 💕";
    setTimeout(function () { typeWriter(textEl, msg, 36); }, 600);
  }

  /* Escaping No button — home.html */
  var noBtn = document.getElementById("noBtn");
  if (noBtn) {
    function flee(e) {
      if (e && e.cancelable) e.preventDefault();
      var bw = noBtn.offsetWidth  || 80;
      var bh = noBtn.offsetHeight || 40;
      var maxX = Math.max(bw + 10, window.innerWidth  - bw - 20);
      var maxY = Math.max(bh + 10, window.innerHeight - bh - 20);
      noBtn.style.position   = "fixed";
      noBtn.style.zIndex     = "999";
      noBtn.style.transition = "top 0.13s ease, left 0.13s ease";
      noBtn.style.left = (10 + Math.random() * (maxX - 10)) + "px";
      noBtn.style.top  = (10 + Math.random() * (maxY - 10)) + "px";
    }
    noBtn.addEventListener("mouseover",  flee);
    noBtn.addEventListener("touchstart", flee, { passive: false });
    noBtn.addEventListener("click",      function (e) { e.preventDefault(); flee(e); });
  }

});
