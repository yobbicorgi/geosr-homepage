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
        if (index !== activeIndex) return;
        const media = panel.querySelector('.platform-frame');
        const copy = panel.querySelector('.platform-copy');
        if (!reducedMotion.matches && window.gsap && media && copy) {
          window.gsap.fromTo(media,
            { x: direction * 22, rotateY: direction * -.55, clipPath: direction > 0 ? 'inset(0 8% 0 0)' : 'inset(0 0 0 8%)', opacity: .6 },
            { x: 0, rotateY: 0, clipPath: 'inset(0 0 0 0)', opacity: 1, duration: .68, ease: 'power2.out', clearProps: 'clipPath' });
          window.gsap.fromTo(copy,
            { x: direction * 12, opacity: .65 },
            { x: 0, opacity: 1, duration: .48, ease: 'power2.out', clearProps: 'transform,opacity' });
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

  if (!reducedMotion.matches && window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    document.querySelectorAll('[data-story-slide]').forEach(slide => {
      const image = slide.querySelector('.story-image');
      const copy = slide.querySelector('.story-copy-inner');
      if (image) {
        window.gsap.fromTo(image,
          { scale: 1.055, clipPath: 'inset(2.5% 2% 2.5% 2%)' },
          { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: slide, start: 'top bottom', end: 'bottom top', scrub: .65 } });
      }
      if (copy) {
        window.gsap.fromTo(copy,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: .8, ease: 'power2.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: slide, start: 'top 68%', once: true } });
      }
    });
    if (window.matchMedia('(min-width: 821px)').matches) {
      const railDistances = [44, 60, 36];
      document.querySelectorAll('[data-credential-rail]').forEach((rail, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const distance = railDistances[index % railDistances.length];
        window.gsap.fromTo(rail,
          { x: direction * distance },
          { x: 0, ease: 'none', scrollTrigger: { trigger: rail.closest('.evidence-group'), start: 'top 92%', end: 'bottom 22%', scrub: .7 } });
      });
    }
    window.addEventListener('load', () => window.ScrollTrigger.refresh(), { once: true });
  }

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
