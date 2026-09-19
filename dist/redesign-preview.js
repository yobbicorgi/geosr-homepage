(() => {
  'use strict';

  const query = new URLSearchParams(window.location.search);
  const supportedLanguages = new Set(['ko', 'en']);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const savedLanguage = (() => {
    try { return window.localStorage.getItem('geosr-preview-language'); }
    catch { return null; }
  })();
  let language = supportedLanguages.has(query.get('lang'))
    ? query.get('lang')
    : (supportedLanguages.has(savedLanguage) ? savedLanguage : 'ko');

  document.body.classList.add('js');

  function applyLanguage(next, updateUrl = true) {
    if (!supportedLanguages.has(next)) return;
    language = next;
    document.documentElement.lang = language;
    document.title = language === 'ko' ? 'GeoSR — 관측에서 예측까지' : 'GeoSR — From observation to foresight';

    document.querySelectorAll('[data-copy-ko][data-copy-en]').forEach(node => {
      node.textContent = language === 'en' ? node.dataset.copyEn : node.dataset.copyKo;
    });
    document.querySelectorAll('[data-copy-aria-ko][data-copy-aria-en]').forEach(node => {
      node.setAttribute('aria-label', language === 'en' ? node.dataset.copyAriaEn : node.dataset.copyAriaKo);
    });
    document.querySelectorAll('[data-alt-ko][data-alt-en]').forEach(node => {
      const alt = language === 'en' ? node.dataset.altEn : node.dataset.altKo;
      if (node instanceof HTMLImageElement) node.alt = alt;
      else node.setAttribute('aria-label', alt);
    });
    document.querySelectorAll('[data-title][data-title-en]').forEach(node => {
      node.dataset.activeTitle = language === 'en' ? node.dataset.titleEn : node.dataset.title;
    });
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });

    document.querySelectorAll('[data-route]').forEach(link => {
      const url = new URL(link.getAttribute('href'), window.location.href);
      url.searchParams.set('lang', language);
      link.setAttribute('href', url.pathname.split('/').pop() + url.search + url.hash);
    });
    try { window.localStorage.setItem('geosr-preview-language', language); }
    catch { /* The query parameter remains the shareable language state. */ }
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', language);
      window.history.pushState({ language }, '', url.pathname + url.search + url.hash);
    }
  }

  applyLanguage(language, false);
  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => {
      applyLanguage(button.dataset.language);
      const menuOpen = menuButton?.getAttribute('aria-expanded') === 'true';
      menuButton?.setAttribute('aria-label', menuOpen
        ? (language === 'en' ? 'Close menu' : '메뉴 닫기')
        : (language === 'en' ? 'Open menu' : '메뉴 열기'));
      if (dialog?.open && dialogTrigger && dialogTitle && dialogImage) {
        dialogTitle.textContent = dialogTrigger.dataset.activeTitle || dialogTrigger.dataset.title;
        dialogImage.alt = dialogTitle.textContent;
      }
    });
  });
  window.addEventListener('popstate', () => {
    const lang = new URLSearchParams(window.location.search).get('lang');
    applyLanguage(supportedLanguages.has(lang) ? lang : 'ko', false);
  });

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-nav');
  const closeMenu = (restoreFocus = false) => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', language === 'en' ? 'Open menu' : '메뉴 열기');
    navigation.classList.remove('is-open');
    if (restoreFocus) menuButton.focus();
  };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open
      ? (language === 'en' ? 'Close menu' : '메뉴 닫기')
      : (language === 'en' ? 'Open menu' : '메뉴 열기'));
    navigation?.classList.toggle('is-open', open);
  });
  navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  window.matchMedia('(min-width: 821px)').addEventListener?.('change', event => {
    if (event.matches) closeMenu();
  });

  const platformTabs = [...document.querySelectorAll('[data-platform-tab]')];
  const platformPanels = [...document.querySelectorAll('[data-platform-panel]')];
  if (platformTabs.length && platformPanels.length === platformTabs.length) {
    let activeIndex = Math.max(0, platformTabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true'));
    const activatePlatform = (nextIndex, moveFocus = false) => {
      if (nextIndex === activeIndex) {
        if (moveFocus) platformTabs[nextIndex].focus();
        return;
      }
      const direction = nextIndex < activeIndex ? -1 : 1;
      activeIndex = nextIndex;
      platformTabs.forEach((tab, index) => {
        const selected = index === activeIndex;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      platformPanels.forEach((panel, index) => {
        panel.hidden = index !== activeIndex;
        if (index !== activeIndex) {
          panel.classList.remove('is-transitioning');
          return;
        }
        const media = panel.querySelector('.platform-frame');
        const copy = panel.querySelector('.platform-copy');
        if (!reducedMotion.matches && media && copy) {
          panel.dataset.transitionDirection = direction > 0 ? 'forward' : 'backward';
          panel.classList.remove('is-transitioning');
          void panel.offsetWidth;
          panel.classList.add('is-transitioning');
          const finishTransition = () => panel.classList.remove('is-transitioning');
          media.addEventListener('animationend', finishTransition, { once: true });
          window.setTimeout(finishTransition, 760);
        }
      });
      if (moveFocus) platformTabs[activeIndex].focus();
    };

    platformTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activatePlatform(index));
      tab.addEventListener('keydown', event => {
        let nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % platformTabs.length;
        else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + platformTabs.length) % platformTabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = platformTabs.length - 1;
        else return;
        event.preventDefault();
        activatePlatform(nextIndex, true);
      });
    });
    platformPanels.forEach((panel, index) => { panel.hidden = index !== activeIndex; });
  }

  const desktopMotion = window.matchMedia('(min-width: 821px)');
  let revealObserver = null;
  let chapterObserver = null;
  let motionFrame = 0;
  const motionSelector = [
    '.story-intro .section-meta', '.story-intro > .eyebrow', '.story-intro h2', '.story-intro .story-intro-copy',
    '.story-copy-inner', '.platform-section > .wrap > .section-meta', '.platform-heading > *', '.ax-concept-film',
    '.platform-evidence-heading', '.platform-tabs', '.geodap-grid > .section-meta', '.geodap-copy > *', '.geodap-figure',
    '.evidence-section > .wrap > .section-meta', '.evidence-heading > *', '.evidence-group', '.news-layout > .section-meta',
    '.news-heading > *', '.news-summary', '.company-layout > .section-meta', '.company-copy > *', '.contact-links', '.page-footer'
  ].join(',');

  function updateScrollTransforms() {
    motionFrame = 0;
    if (reducedMotion.matches || !desktopMotion.matches) return;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    document.querySelectorAll('[data-story-slide]').forEach((slide, index) => {
      const image = slide.querySelector('.story-image');
      if (!image) return;
      const rect = slide.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
      const direction = index % 2 === 0 ? -1 : 1;
      const scale = 1.032 - progress * .014;
      const x = (progress - .5) * 20 * direction;
      image.style.transform = `translate3d(${x.toFixed(1)}px,0,0) scale(${scale.toFixed(4)})`;
    });
    document.querySelectorAll('[data-credential-rail]').forEach((rail, index) => {
      const group = rail.closest('.evidence-group');
      if (!group) return;
      const rect = group.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
      const direction = index % 2 === 0 ? 1 : -1;
      const distance = 24 + (index % 3) * 6;
      const x = (progress - .5) * distance * 2 * direction;
      rail.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
    });
  }

  function scheduleScrollTransforms() {
    if (!motionFrame) motionFrame = window.requestAnimationFrame(updateScrollTransforms);
  }

  function initScrollMotion() {
    revealObserver?.disconnect();
    revealObserver = null;
    chapterObserver?.disconnect();
    chapterObserver = null;
    document.documentElement.classList.remove('has-scroll-motion');
    document.querySelectorAll('.motion-reveal').forEach(node => {
      node.classList.remove('motion-reveal', 'motion-mask', 'is-visible');
      node.style.removeProperty('--motion-delay');
    });
    document.querySelectorAll('.story-chapter').forEach(node => node.classList.remove('is-visible'));
    document.querySelectorAll('.story-image, [data-credential-rail]').forEach(node => node.style.removeProperty('transform'));

    if (reducedMotion.matches || !desktopMotion.matches || !('IntersectionObserver' in window)) return;
    const targets = [...document.querySelectorAll(motionSelector)];
    targets.forEach((node, index) => {
      node.classList.add('motion-reveal');
      if (node.matches('h2')) node.classList.add('motion-mask');
      node.style.setProperty('--motion-delay', `${(index % 4) * 65}ms`);
    });
    document.documentElement.classList.add('has-scroll-motion');
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -5% 0px' });
    targets.forEach(node => revealObserver.observe(node));

    const chapters = [...document.querySelectorAll('.story-chapter')];
    chapterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: .04, rootMargin: '8% 0px' });
    chapters.forEach(node => chapterObserver.observe(node));
    window.addEventListener('scroll', scheduleScrollTransforms, { passive: true });
    window.addEventListener('resize', scheduleScrollTransforms, { passive: true });
    scheduleScrollTransforms();
  }

  initScrollMotion();
  reducedMotion.addEventListener?.('change', initScrollMotion);
  desktopMotion.addEventListener?.('change', initScrollMotion);

  const dialog = document.querySelector('.document-dialog');
  const dialogTitle = document.querySelector('#document-dialog-title');
  const dialogImage = dialog?.querySelector('img');
  let dialogTrigger = null;
  document.querySelectorAll('[data-document]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      if (!dialog || !dialogImage || !dialogTitle || typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      dialogTrigger = trigger;
      dialogTitle.textContent = trigger.dataset.activeTitle || trigger.dataset.title;
      dialogImage.src = trigger.dataset.document;
      dialogImage.alt = dialogTitle.textContent;
      dialog.showModal();
    });
  });
  dialog?.addEventListener('close', () => dialogTrigger?.focus());
  dialog?.addEventListener('click', event => {
    if (event.target === dialog && typeof dialog.close === 'function') dialog.close();
  });
})();
