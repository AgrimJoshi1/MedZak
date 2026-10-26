/* Medzak Healthcare — site script (vanilla JS, no dependencies) */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var root = document.documentElement;
  var KEY = 'medzak-theme';
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  /* ---------- Theme (runs immediately to avoid a flash) ---------- */
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function resolve() { var s = stored(); return s === 'dark' || s === 'light' ? s : (mq && mq.matches ? 'dark' : 'light'); }
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"][data-dynamic]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#07121F' : '#F4F9FD');
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }
  root.classList.add('js');
  apply(resolve());
  if (mq) {
    var onSys = function () { if (!stored()) apply(resolve()); };
    if (mq.addEventListener) mq.addEventListener('change', onSys); else if (mq.addListener) mq.addListener(onSys);
  }

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    apply(resolve());
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Theme toggle */
    var tbtn = document.querySelector('.theme-toggle');
    var toggleTheme = function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    };
    if (tbtn) tbtn.addEventListener('click', toggleTheme);

    /* Mobile navigation */
    var navBtn = document.querySelector('.nav-toggle');
    var menu = document.getElementById('site-menu');
    function setMenu(open) {
      if (!navBtn || !menu) return;
      menu.classList.toggle('open', open);
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      navBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', open);
      document.body.classList.toggle('no-scroll', open); /* the drawer is full-screen */
    }
    if (navBtn && menu) {
      navBtn.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
      menu.addEventListener('click', function (e) { if (e.target.closest('a:not(.dropdown-trigger), button')) setMenu(false); });
      document.addEventListener('click', function (e) {
        if (menu.classList.contains('open') && !e.target.closest('.main-header, [data-open-menu]')) setMenu(false);
      });
      /* Esc closes the drawer, unless it was used to collapse an open accordion first */
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !e.defaultPrevented && menu.classList.contains('open')) { setMenu(false); navBtn.focus(); }
      });
      window.addEventListener('resize', function () { if (window.innerWidth > 1199 && menu.classList.contains('open')) setMenu(false); });
    }
    /* "Menu" in the mobile quick-action bar drives the same drawer */
    document.querySelectorAll('[data-open-menu]').forEach(function (b) {
      b.addEventListener('click', function () { if (navBtn) navBtn.click(); });
    });

    /* Sticky header: compact state after 8px of scroll + reading-progress hairline */
    var header = document.querySelector('[data-header]');
    if (header) {
      var progress = header.querySelector('.header-progress span'), headTick = false;
      var onHeadScroll = function () {
        headTick = false;
        var y = window.pageYOffset, max = document.documentElement.scrollHeight - window.innerHeight;
        header.classList.toggle('is-scrolled', y > 8);
        if (progress) progress.style.setProperty('--progress', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');
      };
      window.addEventListener('scroll', function () { if (!headTick) { headTick = true; requestAnimationFrame(onHeadScroll); } }, { passive: true });
      window.addEventListener('resize', onHeadScroll);
      onHeadScroll();
    }


    /* Nav dropdowns: one compact menu per tab, one open at a time.
       Desktop: hover-intent open / grace-period close, keyboard (focus, Enter/Space, arrows, Esc).
       Touch and <=1199px: tapping the tab toggles its menu (an accordion on mobile). */
    var ddItems = Array.prototype.slice.call(document.querySelectorAll('.main-menu .has-dropdown'));
    if (ddItems.length) {
      var OPEN_DELAY = 80, CLOSE_DELAY = 150;
      var isMobile = function () { return window.innerWidth <= 1199; };
      var hoverMQ = window.matchMedia ? window.matchMedia('(hover: hover) and (pointer: fine)') : { matches: true };
      var canHover = function () { return hoverMQ.matches && !isMobile(); };
      var kbFocus = function (el) { try { return el.matches(':focus-visible'); } catch (e) { return true; } };
      var isOpen = function (li) { return li.classList.contains('dropdown-open'); };
      var anyOpen = function () { return ddItems.some(isOpen); };
      var menuItems = function (li) { return Array.prototype.slice.call(li.querySelectorAll('[role="menuitem"]')); };
      var closeDd = function (li) {
        clearTimeout(li._t); li.classList.remove('dropdown-open');
        if (li._trig) li._trig.setAttribute('aria-expanded', 'false');
      };
      var openDd = function (li) {
        ddItems.forEach(function (o) { if (o !== li) closeDd(o); });
        clearTimeout(li._t); li.classList.add('dropdown-open');
        if (li._trig) li._trig.setAttribute('aria-expanded', 'true');
        /* point the notch at the centre of this tab */
        if (!isMobile() && li._trig && li._panel) {
          var x = li._trig.offsetLeft + li._trig.offsetWidth / 2 - li._panel.offsetLeft;
          li._panel.style.setProperty('--dd-notch', Math.max(22, Math.min(x, li._panel.offsetWidth - 22)) + 'px');
        }
      };
      /* move focus without the trigger's focus handler re-opening the menu */
      var focusTrigger = function (li) { li._quiet = true; li._trig.focus(); li._quiet = false; };
      ddItems.forEach(function (li) {
        var trig = li._trig = li.querySelector('.dropdown-trigger');
        var panel = li._panel = li.querySelector('.dd-panel');
        if (!trig || !panel) return;
        /* menu items are reached with the arrow keys; Tab moves on to the footer CTA / next tab */
        menuItems(li).forEach(function (a) { a.tabIndex = -1; });

        li.addEventListener('mouseenter', function () {
          if (!canHover()) return;
          clearTimeout(li._t);
          li._t = setTimeout(function () { openDd(li); }, anyOpen() ? 0 : OPEN_DELAY);
        });
        li.addEventListener('mouseleave', function () {
          if (!canHover()) return;
          clearTimeout(li._t);
          li._t = setTimeout(function () { closeDd(li); }, CLOSE_DELAY);
        });

        trig.addEventListener('click', function (e) {
          if (canHover()) return; /* mouse: the tab is a normal link to its page */
          e.preventDefault();
          if (isOpen(li)) closeDd(li); else openDd(li);
        });
        trig.addEventListener('focus', function () {
          if (canHover() && !li._quiet && kbFocus(trig)) openDd(li);
        });
        trig.addEventListener('keydown', function (e) {
          var items;
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault(); openDd(li);
            items = menuItems(li);
            if (items.length) items[e.key === 'ArrowDown' ? 0 : items.length - 1].focus();
          } else if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            if (isOpen(li)) closeDd(li); else openDd(li);
          } else if (e.key === 'Enter' && !isOpen(li)) {
            e.preventDefault(); openDd(li); /* Enter on an open menu follows the link */
          }
        });

        panel.addEventListener('keydown', function (e) {
          var items = menuItems(li), i = items.indexOf(document.activeElement), next = -1;
          if (i < 0) return;
          if (e.key === 'ArrowDown') next = (i + 1) % items.length;
          else if (e.key === 'ArrowUp') next = (i - 1 + items.length) % items.length;
          else if (e.key === 'Home') next = 0;
          else if (e.key === 'End') next = items.length - 1;
          if (next < 0) return;
          e.preventDefault(); items[next].focus();
        });
        panel.addEventListener('click', function (e) {
          if (e.target.closest('a') && !isMobile()) closeDd(li);
        });
        li.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && isOpen(li)) { e.preventDefault(); closeDd(li); focusTrigger(li); }
        });
        /* keyboard users tabbing away. In tap mode taps manage the menu: closing here would
           collapse the accordion between touch-down and click and make the tap miss. */
        li.addEventListener('focusout', function (e) {
          if (!canHover() || li.contains(e.relatedTarget) || li.matches(':hover')) return;
          closeDd(li);
        });
      });
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.has-dropdown')) ddItems.forEach(closeDd);
      });
      /* width only: mobile browsers fire resize when the address bar hides while scrolling */
      var lastW = window.innerWidth;
      window.addEventListener('resize', function () {
        if (window.innerWidth !== lastW) { lastW = window.innerWidth; ddItems.forEach(closeDd); }
      });
    }

    /* Modals (Book a demo, Call back, Search palette, team bios) */
    var lastFocus = null;
    var onOpen = {};
    var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
    var MODAL_HASH = /^#(bookDemo|callback|varshaSingh|sagarJuneja)$/;
    function openModal(id) {
      var m = document.getElementById(id);
      if (!m) return;
      var already = document.querySelector('.modal.open');
      closeModals(true);
      if (!already) lastFocus = document.activeElement;
      m.classList.add('open');
      m.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
      if (onOpen[id]) onOpen[id](m);
      var first = m.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([tabindex="-1"]), textarea') || m.querySelector('.close');
      if (first) setTimeout(function () { first.focus(); }, 50);
    }
    function closeModals(keepScroll) {
      var any = false;
      document.querySelectorAll('.modal.open').forEach(function (m) {
        m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); any = true;
      });
      if (!keepScroll) document.body.classList.remove('no-scroll');
      if (any && !keepScroll && lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
      if (any && !keepScroll && MODAL_HASH.test(location.hash) && history.replaceState) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    }
    document.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-modal]');
      if (opener) { e.preventDefault(); if (menu && menu.classList.contains('open')) setMenu(false); openModal(opener.getAttribute('data-modal')); return; }
      if (e.target.closest('.modal .close, [data-close-modal]')) { closeModals(); return; }
      if (e.target.classList && e.target.classList.contains('modal')) closeModals();
    });
    document.addEventListener('keydown', function (e) {
      /* Ctrl/Cmd+K opens the search palette from anywhere */
      if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        var p = document.getElementById('palette');
        if (p && p.classList.contains('open')) closeModals(); else openModal('palette');
        return;
      }
      var open = document.querySelector('.modal.open');
      if (!open) return;
      if (e.key === 'Escape') { closeModals(); return; }
      if (e.key === 'Tab') {
        var f = open.querySelectorAll(FOCUSABLE);
        if (!f.length) return;
        var a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    });
    if (MODAL_HASH.test(location.hash)) openModal(location.hash.slice(1));

    /* Search palette: filters the index that tools/build.py writes from nav-data.json */
    var palette = document.getElementById('palette');
    if (palette) {
      var pData = [];
      try { pData = JSON.parse(document.getElementById('search-index').textContent); } catch (e) {}
      var pIn = document.getElementById('palette-input');
      var pList = document.getElementById('palette-list');
      var pShown = [], pSel = 0;
      var pNorm = function (s) { return String(s).toLowerCase().replace(/[^a-z0-9>]+/g, ' ').trim(); };
      var pEsc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
      var pScore = function (it, toks) {
        var t = pNorm(it.t), d = pNorm(it.d), g = pNorm(it.g), s = 0;
        for (var i = 0; i < toks.length; i++) {
          var k = toks[i];
          if (t.indexOf(k) === 0) s += 4; else if (t.indexOf(' ' + k) > -1) s += 3; else if (t.indexOf(k) > -1) s += 2;
          else if (d.indexOf(k) > -1) s += 1; else if (g.indexOf(k) > -1) s += 0.5; else return 0;
        }
        return s;
      };
      var pRender = function () {
        var q = pNorm(pIn.value), toks = q ? q.split(' ') : [];
        if (!toks.length) pShown = pData.filter(function (it) { return it.g === 'Action' || (it.g === 'Page' && it.h); }).slice(0, 12);
        else pShown = pData.map(function (it) { return { it: it, s: pScore(it, toks) }; })
          .filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 12).map(function (x) { return x.it; });
        pSel = 0;
        if (!pShown.length) { pList.innerHTML = '<li class="palette-empty" role="presentation">No results for &ldquo;' + pEsc(pIn.value.trim()) + '&rdquo;. Try &ldquo;products&rdquo; or &ldquo;contact&rdquo;.</li>'; pIn.removeAttribute('aria-activedescendant'); return; }
        pList.innerHTML = pShown.map(function (it, i) {
          var attrs = it.m ? ' href="#" data-p-modal="' + it.m + '"' : it.a ? ' href="#" data-p-action="' + it.a + '"' : ' href="' + pEsc(it.h) + '"';
          return '<li class="palette-item" role="option" id="p-' + i + '" aria-selected="' + (i === 0) + '"><a' + attrs + ' tabindex="-1"><span class="p-text"><span class="p-title">' + pEsc(it.t) + '</span><span class="p-desc">' + pEsc(it.d) + '</span></span><span class="p-group">' + pEsc(it.g) + '</span></a></li>';
        }).join('');
        pIn.setAttribute('aria-activedescendant', 'p-0');
      };
      var pMove = function (n) {
        if (!pShown.length) return;
        pSel = (n + pShown.length) % pShown.length;
        Array.prototype.forEach.call(pList.children, function (li, i) { li.setAttribute('aria-selected', i === pSel ? 'true' : 'false'); });
        var li = pList.children[pSel];
        pIn.setAttribute('aria-activedescendant', li.id);
        if (li.scrollIntoView) li.scrollIntoView({ block: 'nearest' });
      };
      var pGo = function (it) {
        if (!it) return;
        if (it.m) { closeModals(true); openModal(it.m); return; }
        closeModals();
        if (it.a === 'theme') { toggleTheme(); return; }
        if (it.h) location.href = it.h;
      };
      onOpen.palette = function () { pIn.value = ''; pRender(); };
      pIn.addEventListener('input', pRender);
      pIn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); pMove(pSel + 1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); pMove(pSel - 1); }
        else if (e.key === 'Enter') { e.preventDefault(); pGo(pShown[pSel]); }
      });
      pList.addEventListener('mousemove', function (e) {
        var li = e.target.closest('.palette-item');
        if (li) { var i = Array.prototype.indexOf.call(pList.children, li); if (i !== pSel) pMove(i); }
      });
      pList.addEventListener('click', function (e) {
        var li = e.target.closest('.palette-item');
        if (!li) return;
        e.preventDefault();
        pGo(pShown[Array.prototype.indexOf.call(pList.children, li)]);
      });
    }

    /* Inline field errors shared by the forms (errors are tied to the field with aria-describedby) */
    var setErr = function (input, msg) {
      var wrap = input.closest('.field');
      var err = wrap.querySelector('.field-error');
      if (!err) { err = document.createElement('span'); err.className = 'field-error'; err.id = input.id + '-err'; wrap.appendChild(err); }
      err.textContent = msg || '';
      wrap.classList.toggle('has-error', !!msg);
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (msg) input.setAttribute('aria-describedby', err.id); else input.removeAttribute('aria-describedby');
      return !msg;
    };
    var isEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); };
    var digitCount = function (v) { return v.replace(/[^0-9]/g, '').length; };
    var valueOf = function (el) { return el.type === 'checkbox' ? el.checked : el.value; };
    /* wire blur/input re-checks; returns a function that validates all fields and focuses the first bad one */
    var liveChecks = function (checks) {
      var run = function (id) { var el = document.getElementById(id); return el ? setErr(el, checks[id](valueOf(el))) : true; };
      Object.keys(checks).forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('blur', function () { if (valueOf(el) || el.getAttribute('aria-invalid') === 'true') run(id); });
        el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', function () { if (el.getAttribute('aria-invalid') === 'true') run(id); });
      });
      return function () {
        var firstBad = null;
        Object.keys(checks).forEach(function (id) { if (!run(id) && !firstBad) firstBad = document.getElementById(id); });
        if (firstBad) firstBad.focus();
        return !firstBad;
      };
    };

    /* Forms: inline validation + honeypot. On medzak.co the request is sent in the page and a success
       panel replaces the form; anywhere else (local preview, another host) it is a normal POST to
       esend.php, because a cross-origin response cannot be read. */
    var sameOrigin = function (action) { try { return new URL(action, location.href).origin === location.origin; } catch (e) { return false; } };
    var wireForm = function (form, checks, beforeSend) {
      if (!form) return;
      var status = form.querySelector('.form-status');
      var btn = form.querySelector('[type="submit"]');
      var valid = liveChecks(checks);
      var say = function (cls, msg) { if (status) { status.className = 'form-status' + (cls ? ' ' + cls : ''); status.textContent = msg; } };
      form.addEventListener('submit', function (e) {
        if (form.elements.website && form.elements.website.value) { e.preventDefault(); return; } /* honeypot */
        if (!valid()) { e.preventDefault(); say('is-error', 'Please correct the highlighted fields.'); return; }
        if (beforeSend) beforeSend(form);
        say('', 'Sending…');
        if (btn) btn.disabled = true;
        if (!window.fetch || !window.FormData || !sameOrigin(form.action)) return; /* native POST */
        e.preventDefault();
        fetch(form.action, { method: 'POST', body: new FormData(form), credentials: 'same-origin' })
          .then(function (r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            var ok = form.parentNode.querySelector('.form-success');
            if (!ok) { say('is-ok', 'Thank you. Your message has been sent.'); return; }
            form.hidden = true; ok.hidden = false; ok.focus();
          })
          .catch(function () {
            if (btn) btn.disabled = false;
            say('is-error', 'Sorry, that did not go through. Please try again or email admin@medzak.co.');
          });
      });
    };

    wireForm(document.getElementById('demoForm'), {
      'df-name': function (v) { return v.trim().length >= 2 ? '' : 'Please enter your name.'; },
      'df-email': function (v) { return isEmail(v) ? '' : 'Please enter a valid email address.'; },
      'df-phone': function (v) { return digitCount(v) >= 7 ? '' : 'Please enter a valid phone number.'; },
      'df-company': function (v) { return v.trim() ? '' : 'Please enter your company or organisation.'; },
      'df-comments': function (v) { return v.trim() ? '' : 'Please add a short comment.'; }
    });

    wireForm(document.getElementById('callbackForm'), {
      'cb-name': function (v) { return v.trim().length >= 2 ? '' : 'Please enter your name.'; },
      'cb-phone': function (v) { return digitCount(v) >= 7 ? '' : 'Please enter a valid phone number.'; },
      'cb-email': function (v) { return !v.trim() || isEmail(v) ? '' : 'Please enter a valid email address or leave it empty.'; },
      'cb-consent': function (v) { return v ? '' : 'Please tick the box so we may contact you.'; }
    }, function (f) {
      var msg = document.getElementById('cb-msg').value.trim();
      document.getElementById('cb-comments').value = '[Call back request] Interested in: ' + f.elements.userInterest.value + (msg ? ' | ' + msg : '');
    });

    wireForm(document.getElementById('contactForm'), {
      'cf-name': function (v) { return v.trim().length >= 2 ? '' : 'Please enter your name.'; },
      'cf-email': function (v) { return isEmail(v) ? '' : 'Please enter a valid email address.'; },
      'cf-phone': function (v) { return digitCount(v) >= 7 ? '' : 'Please enter a valid phone number.'; },
      'cf-msg': function (v) { return v.trim().length >= 10 ? '' : 'Please write a short message (at least 10 characters).'; }
    }, function (f) {
      var subj = f.elements.userSubject ? f.elements.userSubject.value : '';
      f.elements.userComments.value = (subj ? '[' + subj + '] ' : '') + document.getElementById('cf-msg').value.trim();
    });

    /* Lightbox (Achievements, Gallery & Media, Home gallery) */
    var items = Array.prototype.slice.call(document.querySelectorAll('.lightbox-image'));
    if (items.length) {
      var lb = document.createElement('div');
      lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Image viewer');
      lb.innerHTML = '<button type="button" class="lb-close" aria-label="Close"><svg class="icon"><use href="#i-x"/></svg></button><button type="button" class="lb-prev" aria-label="Previous image"><svg class="icon"><use href="#i-chevron-left"/></svg></button><img alt=""><p aria-live="polite"></p><button type="button" class="lb-next" aria-label="Next image"><svg class="icon"><use href="#i-chevron-right"/></svg></button>';
      document.body.appendChild(lb);
      var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('p'), idx = 0, lbFocus = null;
      var show = function (i) {
        idx = (i + items.length) % items.length;
        var a = items[idx];
        lbImg.src = a.getAttribute('href'); lbImg.alt = a.getAttribute('data-caption') || '';
        lbCap.textContent = a.getAttribute('data-caption') || '';
      };
      var openLb = function (i) { lbFocus = document.activeElement; show(i); lb.classList.add('open'); document.body.classList.add('no-scroll'); lb.querySelector('.lb-close').focus(); };
      var closeLb = function () { lb.classList.remove('open'); document.body.classList.remove('no-scroll'); if (lbFocus && lbFocus.focus) lbFocus.focus(); };
      items.forEach(function (a, i) { a.addEventListener('click', function (e) { e.preventDefault(); openLb(i); }); });
      lb.addEventListener('click', function (e) {
        if (e.target === lb || e.target.closest('.lb-close')) closeLb();
        else if (e.target.closest('.lb-prev')) show(idx - 1);
        else if (e.target.closest('.lb-next')) show(idx + 1);
      });
      document.addEventListener('keydown', function (e) {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'Escape') closeLb();
        else if (e.key === 'ArrowLeft') show(idx - 1);
        else if (e.key === 'ArrowRight') show(idx + 1);
        else if (e.key === 'Tab') { /* keep focus on the three controls */
          var f = lb.querySelectorAll('button'), a = f[0], z = f[f.length - 1];
          if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
          else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
        }
      });
    }

    /* Scroll to top */
    var up = document.querySelector('.scroll-to-top');
    if (up) {
      var onScroll = function () { up.classList.toggle('show', window.pageYOffset > 400); };
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
      up.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
    }

    /* Cookie / storage notice: shown once, remembered on the device */
    var consent = document.getElementById('consent');
    if (consent) {
      var seen = false;
      try { seen = localStorage.getItem('medzak-consent') === '1'; } catch (e) {}
      if (!seen) consent.hidden = false;
      var cbtn = consent.querySelector('[data-consent]');
      if (cbtn) cbtn.addEventListener('click', function () {
        try { localStorage.setItem('medzak-consent', '1'); } catch (e) {}
        consent.hidden = true;
      });
    }

    /* Skeleton: image wrappers shimmer until their photo has loaded */
    document.querySelectorAll('.tile-media img, .award-media img, .tile img, .photo-frame img, .team-photo img').forEach(function (img) {
      if (img.complete && img.naturalWidth) return;
      var wrap = img.parentNode, done = function () { wrap.classList.remove('is-loading'); };
      wrap.classList.add('is-loading');
      img.addEventListener('load', done); img.addEventListener('error', done);
    });

    /* Stagger: children of a [data-stagger] grid reveal one after another */
    document.querySelectorAll('[data-stagger]').forEach(function (grid) {
      Array.prototype.forEach.call(grid.children, function (el, i) {
        el.classList.add('reveal');
        el.style.setProperty('--d', Math.min(i, 8) * 70 + 'ms');
      });
    });

    /* Hero parallax: --py (px) follows the scroll for the first 700px; off for reduced motion and small screens */
    var heroVis = document.querySelector('.hero-visual');
    if (heroVis && !reduce && window.matchMedia('(min-width: 992px)').matches) {
      var pyTick = false;
      var onPy = function () {
        pyTick = false;
        var y = Math.min(window.pageYOffset, 700);
        heroVis.style.setProperty('--py', (y * 0.06).toFixed(1));
      };
      window.addEventListener('scroll', function () { if (!pyTick) { pyTick = true; requestAnimationFrame(onPy); } }, { passive: true });
    }

    /* Reveal on scroll + count-up numbers */
    var reveals = document.querySelectorAll('.reveal');
    var counters = document.querySelectorAll('[data-count]');
    var fmt = function (el, n) { return (el.getAttribute('data-prefix') || '') + n.toLocaleString('en-US') + (el.getAttribute('data-suffix') || ''); };
    function countUp(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (reduce || !target) { el.textContent = fmt(el, target || 0); return; }
      var dur = 1600, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(el, Math.round(target * e));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if ('IntersectionObserver' in window) {
      if (!reduce) counters.forEach(function (el) { el.textContent = fmt(el, 0); }); /* final value stays in the HTML for no-JS */
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add('in');
          if (en.target.hasAttribute('data-count')) countUp(en.target);
          io.unobserve(en.target);
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
      counters.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
      counters.forEach(function (el) { countUp(el); });
    }

    /* Carousel (Home achievements): scroll-snap track with previous / next buttons */
    document.querySelectorAll('[data-carousel]').forEach(function (c) {
      var track = c.querySelector('.carousel-track');
      var prev = c.querySelector('[data-prev]'), next = c.querySelector('[data-next]');
      if (!track || !prev || !next) return;
      var sync = function () {
        prev.disabled = track.scrollLeft < 4;
        next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      };
      var by = function (dir) {
        var card = track.children[0];
        var w = (card ? card.getBoundingClientRect().width : 300) + 20;
        track.scrollBy({ left: dir * w * (window.innerWidth > 900 ? 2 : 1), behavior: reduce ? 'auto' : 'smooth' });
      };
      prev.addEventListener('click', function () { by(-1); });
      next.addEventListener('click', function () { by(1); });
      track.addEventListener('scroll', sync, { passive: true });
      window.addEventListener('resize', sync);
      sync();
    });

    /* Tabs (Home products + Our Products): ARIA tabs with arrow keys and a sliding indicator */
    var tabsWrap = document.querySelector('.product-tabs');
    if (tabsWrap) {
      var tabs = Array.prototype.slice.call(tabsWrap.querySelectorAll('[role="tab"]'));
      var panels = Array.prototype.slice.call(tabsWrap.querySelectorAll('[role="tabpanel"]'));
      var tablist = tabsWrap.querySelector('[role="tablist"]');
      var indicator = tablist && tablist.querySelector('.tab-indicator');
      var SLUGS = tabs.map(function (t) { return t.id.replace(/^tab-/, ''); });
      var useHash = tabsWrap.getAttribute('data-hash') !== 'off';
      var place = function () {
        var on = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0];
        if (!on || !indicator) return;
        tablist.style.setProperty('--ti-x', on.offsetLeft + 'px');
        tablist.style.setProperty('--ti-y', on.offsetTop + 'px');
        tablist.style.setProperty('--ti-w', on.offsetWidth + 'px');
        tablist.style.setProperty('--ti-h', on.offsetHeight + 'px');
        tablist.classList.add('has-indicator');
      };
      var selectTab = function (tab, focus, updateHash) {
        tabs.forEach(function (t, i) {
          var on = t === tab;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.setAttribute('tabindex', on ? '0' : '-1');
          if (on) panels[i].removeAttribute('hidden'); else panels[i].setAttribute('hidden', '');
        });
        place();
        if (focus) tab.focus();
        if (useHash && updateHash && history.replaceState) history.replaceState(null, '', '#' + tab.id.replace(/^tab-/, ''));
      };
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { selectTab(t, false, true); });
        t.addEventListener('keydown', function (e) {
          var n = null;
          if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
          else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
          else if (e.key === 'Home') n = 0;
          else if (e.key === 'End') n = tabs.length - 1;
          else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectTab(t, false, true); return; }
          if (n !== null) { e.preventDefault(); selectTab(tabs[n], true, true); }
        });
      });
      var fromHash = function (scroll) {
        if (!useHash) return false;
        var h = location.hash.slice(1), k = SLUGS.indexOf(h);
        if (k < 0) return false;
        selectTab(tabs[k], false, false);
        if (scroll) tabsWrap.scrollIntoView();
        return true;
      };
      if (indicator) { tablist.classList.add('no-indicator-yet'); }
      if (!fromHash(true)) selectTab(tabs[0], false, false);
      if (indicator) {
        requestAnimationFrame(function () { place(); requestAnimationFrame(function () { tablist.classList.remove('no-indicator-yet'); }); });
        window.addEventListener('resize', place);
        window.addEventListener('load', place);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
      }
      if (useHash) window.addEventListener('hashchange', function () { fromHash(true); });
    }

    /* News ticker (Home): two rows moving in opposite directions, paused on hover / focus */
    var ticker = document.querySelector('.ticker');
    if (ticker && !reduce) {
      var tracks = ticker.querySelectorAll('.ticker-track');
      tracks.forEach(function (track) {
        Array.prototype.slice.call(track.children).forEach(function (node) {
          var c = node.cloneNode(true);
          c.setAttribute('aria-hidden', 'true');
          c.querySelectorAll('a').forEach(function (a) { a.setAttribute('tabindex', '-1'); });
          track.appendChild(c);
        });
      });
      var setDur = function () {
        tracks.forEach(function (track) { track.style.setProperty('--ticker-dur', Math.max(40, Math.round(track.scrollWidth / 2 / 55)) + 's'); });
      };
      setDur();
      window.addEventListener('load', setDur);
      ticker.classList.add('is-running');
    }

    /* Footer year (only where a data-year node exists) */
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  });
})();
