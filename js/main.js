/* Medzak Healthcare — site script (vanilla JS, no dependencies) */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    /* Mobile navigation */
    var navBtn = document.querySelector('.nav-toggle');
    var menu = document.getElementById('site-menu');
    function setMenu(open) {
      if (!navBtn || !menu) return;
      menu.classList.toggle('open', open);
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      navBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    if (navBtn && menu) {
      navBtn.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
      menu.addEventListener('click', function (e) { if (e.target.closest('a:not(.dropdown-trigger), button')) setMenu(false); });
      document.addEventListener('click', function (e) {
        if (menu.classList.contains('open') && !e.target.closest('.main-header')) setMenu(false);
      });
      window.addEventListener('resize', function () { if (window.innerWidth > 1199) setMenu(false); });
    }

    /* Hover mega-menus: hover-intent on desktop, accordion on mobile, tap-to-open on touch, full keyboard support */
    var ddItems = Array.prototype.slice.call(document.querySelectorAll('.main-menu .has-dropdown'));
    if (ddItems.length) {
      var isMobile = function () { return window.innerWidth <= 1199; };
      var hoverMQ = window.matchMedia ? window.matchMedia('(hover: hover) and (pointer: fine)') : { matches: true };
      var anyOpen = function () { return ddItems.some(function (l) { return l.classList.contains('dropdown-open'); }); };
      var setExp = function (li, v) { var t = li.querySelector('.dropdown-trigger'); if (t) t.setAttribute('aria-expanded', v ? 'true' : 'false'); };
      var closeDd = function (li) { clearTimeout(li._t); li.classList.remove('dropdown-open'); setExp(li, false); };
      var openDd = function (li) {
        ddItems.forEach(function (o) { if (o !== li) closeDd(o); });
        clearTimeout(li._t); li.classList.remove('dd-closed'); li.classList.add('dropdown-open'); setExp(li, true);
      };
      ddItems.forEach(function (li) {
        var trig = li.querySelector('.dropdown-trigger');
        var panelEl = li.querySelector('.dropdown-mega');
        li.addEventListener('mouseenter', function () {
          if (!hoverMQ.matches || isMobile()) return;
          clearTimeout(li._t);
          li._t = setTimeout(function () { openDd(li); }, anyOpen() ? 0 : 70);
        });
        li.addEventListener('mouseleave', function () {
          if (!hoverMQ.matches || isMobile()) return;
          clearTimeout(li._t);
          li.classList.remove('dd-closed');
          li._t = setTimeout(function () { closeDd(li); }, 160);
        });
        if (trig) {
          trig.addEventListener('click', function (e) {
            if (isMobile()) {
              e.preventDefault();
              var wasOpen = li.classList.contains('dropdown-open');
              ddItems.forEach(closeDd);
              if (!wasOpen) openDd(li);
              return;
            }
            if (!hoverMQ.matches && !li.classList.contains('dropdown-open')) { e.preventDefault(); openDd(li); }
          });
          trig.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown') {
              var first = panelEl && panelEl.querySelector('a');
              if (first) { e.preventDefault(); if (!isMobile()) openDd(li); first.focus(); }
            }
          });
        }
        if (panelEl) panelEl.addEventListener('click', function (e) {
          if (e.target.closest('a') && !isMobile()) { closeDd(li); li.classList.add('dd-closed'); }
        });
        li.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') { closeDd(li); li.classList.add('dd-closed'); if (trig) trig.focus(); }
        });
        li.addEventListener('focusout', function (e) {
          if (!li.contains(e.relatedTarget)) li.classList.remove('dd-closed');
        });
      });
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.has-dropdown')) ddItems.forEach(closeDd);
      });
      window.addEventListener('resize', function () { ddItems.forEach(function (l) { closeDd(l); l.classList.remove('dd-closed'); }); });
    }

    /* Modals (Book a demo, team bios) */
    var lastFocus = null;
    var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
    function openModal(id) {
      var m = document.getElementById(id);
      if (!m) return;
      closeModals(true);
      lastFocus = document.activeElement;
      m.classList.add('open');
      m.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
      var first = m.querySelector('input, textarea, .close');
      if (first) setTimeout(function () { first.focus(); }, 50);
    }
    function closeModals(keepScroll) {
      var any = false;
      document.querySelectorAll('.modal.open').forEach(function (m) {
        m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); any = true;
      });
      if (!keepScroll) document.body.classList.remove('no-scroll');
      if (any && !keepScroll && lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
      if (any && !keepScroll && /^#(bookDemo|varshaSingh)$/.test(location.hash) && history.replaceState) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    }
    document.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-modal]');
      if (opener) { e.preventDefault(); openModal(opener.getAttribute('data-modal')); return; }
      if (e.target.closest('.modal .close')) { closeModals(); return; }
      if (e.target.classList && e.target.classList.contains('modal')) closeModals();
    });
    document.addEventListener('keydown', function (e) {
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
    if (/^#(bookDemo|varshaSingh)$/.test(location.hash)) openModal(location.hash.slice(1));

    /* Book-a-demo form: light client-side checks, then a normal POST */
    var form = document.getElementById('demoForm');
    if (form) {
      var phone = form.querySelector('[name="userPhone"]');
      form.addEventListener('submit', function (e) {
        var note = form.querySelector('.form-note');
        var digits = phone ? phone.value.replace(/[^0-9+]/g, '') : '';
        if (phone && digits.length < 7) {
          e.preventDefault();
          if (note) note.textContent = 'Please enter a valid phone number.';
          phone.focus();
          return;
        }
        if (note) note.textContent = 'Sending…';
      });
    }

    /* Contact page form: inline validation, then a normal POST (same endpoint as the demo form) */
    var cf = document.getElementById('contactForm');
    if (cf) {
      var cfStatus = cf.querySelector('.form-status');
      var cfBtn = cf.querySelector('button[type="submit"]');
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
      var checks = {
        'cf-name': function (v) { return v.trim().length >= 2 ? '' : 'Please enter your name.'; },
        'cf-email': function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.'; },
        'cf-phone': function (v) { return v.replace(/[^0-9]/g, '').length >= 7 ? '' : 'Please enter a valid phone number.'; },
        'cf-msg': function (v) { return v.trim().length >= 10 ? '' : 'Please write a short message (at least 10 characters).'; }
      };
      var runCheck = function (id) { var el = document.getElementById(id); return el ? setErr(el, checks[id](el.value)) : true; };
      Object.keys(checks).forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('blur', function () { if (el.value || el.getAttribute('aria-invalid') === 'true') runCheck(id); });
        el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') runCheck(id); });
      });
      cf.addEventListener('submit', function (e) {
        var firstBad = null;
        Object.keys(checks).forEach(function (id) { if (!runCheck(id) && !firstBad) firstBad = document.getElementById(id); });
        if (firstBad) {
          e.preventDefault();
          cfStatus.className = 'form-status is-error';
          cfStatus.textContent = 'Please correct the highlighted fields.';
          firstBad.focus();
          return;
        }
        if (cf.elements.website && cf.elements.website.value) { e.preventDefault(); return; } /* honeypot */
        var subj = cf.elements.userSubject ? cf.elements.userSubject.value : '';
        cf.elements.userComments.value = (subj ? '[' + subj + '] ' : '') + document.getElementById('cf-msg').value.trim();
        cfStatus.className = 'form-status';
        cfStatus.textContent = 'Sending…';
        if (cfBtn) cfBtn.disabled = true;
      });
    }

    /* Lightbox (Achievements, Gallery & Media) */
    var items = Array.prototype.slice.call(document.querySelectorAll('.lightbox-image'));
    if (items.length) {
      var lb = document.createElement('div');
      lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Image viewer');
      lb.innerHTML = '<button class="lb-close" aria-label="Close">&times;</button><button class="lb-prev" aria-label="Previous">&#8249;</button><img alt=""><p></p><button class="lb-next" aria-label="Next">&#8250;</button>';
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
      });
    }

    /* Scroll to top */
    var up = document.querySelector('.scroll-to-top');
    if (up) {
      var onScroll = function () { up.classList.toggle('show', window.pageYOffset > 400); };
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
      up.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    /* Reveal on scroll */
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add('in');
          io.unobserve(en.target);
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }

    /* Product tabs (Our Products) */
    var tabsWrap = document.querySelector('.product-tabs');
    if (tabsWrap) {
      var tabs = Array.prototype.slice.call(tabsWrap.querySelectorAll('[role="tab"]'));
      var panels = Array.prototype.slice.call(tabsWrap.querySelectorAll('[role="tabpanel"]'));
      var SLUGS = tabs.map(function (t) { return t.id.replace(/^tab-/, ''); });
      var selectTab = function (tab, focus, updateHash) {
        tabs.forEach(function (t, i) {
          var on = t === tab;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.setAttribute('tabindex', on ? '0' : '-1');
          if (on) panels[i].removeAttribute('hidden'); else panels[i].setAttribute('hidden', '');
        });
        if (focus) tab.focus();
        if (updateHash && history.replaceState) history.replaceState(null, '', '#' + tab.id.replace(/^tab-/, ''));
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
        var h = location.hash.slice(1), k = SLUGS.indexOf(h);
        if (k < 0) return false;
        selectTab(tabs[k], false, false);
        if (scroll) tabsWrap.scrollIntoView();
        return true;
      };
      if (!fromHash(true)) selectTab(tabs[0], false, false);
      window.addEventListener('hashchange', function () { fromHash(true); });
    }

    /* News ticker (Home): continuous marquee, pauses on hover/focus */
    var track = document.querySelector('.ticker-track');
    if (track && !reduce) {
      Array.prototype.slice.call(track.children).forEach(function (node) {
        var c = node.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        c.querySelectorAll('a').forEach(function (a) { a.setAttribute('tabindex', '-1'); });
        track.appendChild(c);
      });
      var setDur = function () { track.style.setProperty('--ticker-dur', Math.max(24, Math.round(track.scrollWidth / 2 / 70)) + 's'); };
      setDur();
      window.addEventListener('load', setDur);
      var vp = track.closest('.ticker-viewport');
      if (vp) vp.classList.add('is-running');
    }
  });
})();
