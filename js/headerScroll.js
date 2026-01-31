export function headerScroll(options = {}) {
    console.log();

  'use strict';

  const {
    selector = 'header',
    scrollThreshold = null
  } = options;

  const header = document.querySelector(selector);
  if (!header) return;

  let lastScrollPosition = window.scrollY || 0;
  let ticking = false;

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function setHeaderHeight() {
    const h = header.offsetHeight;
    document.body.style.setProperty('--header-height', h + 'px');
    document.body.classList.add('header-compensated');
  }

  function updateHeader(currentScrollPosition) {

    if (!isMobile()) return;

    if (currentScrollPosition < 0) currentScrollPosition = 0;

    const delta = Math.abs(currentScrollPosition - lastScrollPosition);
    if (delta < 5) return;

    const threshold = scrollThreshold ?? header.offsetHeight;

    if (currentScrollPosition < threshold) {
      header.classList.remove('header-hidden');
      header.classList.add('header-visible');
    }
    else if (currentScrollPosition > lastScrollPosition) {
      header.classList.add('header-hidden');
      header.classList.remove('header-visible');
    }
    else {
      header.classList.remove('header-hidden');
      header.classList.add('header-visible');
    }

    lastScrollPosition = currentScrollPosition;
  }

  function onScroll() {
    const currentScrollPosition =
      window.scrollY || document.documentElement.scrollTop;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeader(currentScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  }

  function init() {

    header.classList.add('header-visible');
    setHeaderHeight();
    updateHeader(window.scrollY || 0);

    window.addEventListener('resize', setHeaderHeight);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  init();
}
