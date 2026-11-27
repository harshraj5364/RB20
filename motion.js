/* ==========================================================================
   motion.js  -  extra polish that makes the whole site feel smoother.
   Loaded last on every page. Each feature is wrapped in safe(), so if one
   effect ever has a problem the page itself keeps working.
   ========================================================================== */
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var safe = function (name, fn) { try { fn(); } catch (e) { console.warn('[motion] ' + name, e); } };

  /* 1. PREFETCH: ask the browser to download the next page while she reads this one,
        so the page change feels instant. */
  safe('prefetch', function () {
    if (typeof FLOW === 'undefined' || ix < 0 || !FLOW[ix + 1]) return;
    var l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = FLOW[ix + 1] + '.html';
    document.head.appendChild(l);
  });

  /* 2. TAP SPARKLES: a tiny burst of stars wherever she taps (not while drawing, typing or pulling the bow). */
  safe('sparkles', function () {
    if (reduce) return;
    var stars = ['✦', '✧', '✿', '❀', '★'];
    function burst(x, y) {
      for (var i = 0; i < 7; i++) {
        var s = document.createElement('i');
        var a = Math.random() * Math.PI * 2, d = 28 + Math.random() * 46;
        s.className = 'spk';
        s.textContent = stars[(Math.random() * stars.length) | 0];
        s.style.cssText = 'left:' + x + 'px;top:' + y + 'px;--dx:' + (Math.cos(a) * d).toFixed(0) + 'px;--dy:' + (Math.sin(a) * d).toFixed(0) + 'px;font-size:' + (0.8 + Math.random() * 1.1).toFixed(2) + 'rem';
        s.onanimationend = function () { s.remove(); };
        document.body.appendChild(s);
      }
    }
    addEventListener('pointerdown', function (e) {
      if (e.target.closest && e.target.closest('canvas,input,textarea,video,select,#bw,#pz,.gk')) return;
      burst(e.clientX, e.clientY);
    }, { passive: true });
  });

  /* 3. KEYBOARD: the right arrow opens the next page once the "next" button is showing. */
  safe('keyboard-next', function () {
    addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'PageDown') return;
      var t = document.activeElement && document.activeElement.tagName;
      if (t === 'INPUT' || t === 'TEXTAREA' || t === 'VIDEO') return;
      if (typeof nx !== 'undefined' && nx && nx.classList.contains('show') && !document.body.dataset.gate) nx.click();
    });
  });

  /* 4. KEYBOARD ACCESS: things that are clickable but are not buttons can be reached with Tab and opened with Enter / Space. */
  safe('a11y', function () {
    var sel = '#kn,#env,#gb,#ev,#dd,.fc,.po,.tg,.it,.bar,[onclick]';
    document.querySelectorAll(sel).forEach(function (el) {
      var tag = el.tagName;
      if (tag === 'BUTTON' || tag === 'A' || tag === 'INPUT' || tag === 'LABEL') return;
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
      if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
      });
    });
  });

  /* 5. NEVER STUCK: if she does nothing for a while on a "tap this" page, the page plays the next step by itself.
        The timer restarts whenever she touches the screen, so it never takes over while she is busy. */
  safe('idle-helpers', function () {
    function idle(ms, fn) {
      var t = setTimeout(run, ms);
      function run() { try { fn(); } catch (e) {} t = setTimeout(run, ms); }
      ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
        addEventListener(ev, function () { clearTimeout(t); t = setTimeout(run, ms * 1.4); }, { passive: true });
      });
    }
    var $ = function (i) { return document.getElementById(i); };
    /* the museum door: knock three times */
    if ($('kn') && $('dr')) idle(14000, function () {
      var k = $('kn');
      if ($('dr').classList.contains('open')) return;
      k.click(); setTimeout(function () { k.click(); }, 800); setTimeout(function () { k.click(); }, 1600);
    });
    /* the friendship band: tie it on, then move on */
    if ($('bd') && typeof nx !== 'undefined' && nx) idle(15000, function () { nx.click(); });
    /* the sealed letter in the reading room */
    if ($('env') && $('nt')) idle(15000, function () { if (!$('env').hidden) $('env').click(); });
    /* the gift box on the rose pages */
    if ($('gb')) idle(14000, function () { $('gb').click(); });
    /* the envelope letter: turn it over, then break the seal */
    if ($('ev') && $('sh')) idle(16000, function () {
      if (typeof st === 'undefined') return;
      if (st === 0) $('ev').click(); else if (st === 1 && $('wx')) $('wx').click();
    });
  });
})();
