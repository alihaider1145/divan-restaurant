/* ============================================================
   DIVAN RESTAURANT — Shared JavaScript
   Zaree Studios · assets/js/main.js
   Linked from all pages with defer.
   ============================================================ */

(function () {
  'use strict';

  /* ===== NAV: Scroll shrink ===== */
  const initNavScroll = () => {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  };

  /* ===== NAV: Mobile drawer ===== */
  const initMobileDrawer = () => {
    const hamburger = document.querySelector('.site-nav__hamburger');
    const drawer    = document.querySelector('.nav-drawer');
    const backdrop  = document.querySelector('.nav-backdrop');
    if (!hamburger || !drawer || !backdrop) return;

    const open = () => {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-visible');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-visible');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      isOpen ? close() : open();
    });

    backdrop.addEventListener('click', close);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    // Close when a drawer link is clicked
    const drawerLinks = document.querySelectorAll('.nav-drawer__link');
    drawerLinks.forEach(link => link.addEventListener('click', close));
  };

  /* ===== SCROLL REVEAL ===== */
  const initScrollReveal = () => {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  };

  /* ===== ACTIVE NAV LINK ===== */
  const initActiveNav = () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.site-nav__link, .nav-drawer__link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.setAttribute('aria-current', 'page');
      }
    });
  };

  /* ===== INIT ===== */
  document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initMobileDrawer();
    initScrollReveal();
    initActiveNav();
  });

})();