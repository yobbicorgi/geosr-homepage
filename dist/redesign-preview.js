(() => {
  'use strict';

  const query = new URLSearchParams(window.location.search);
  const supportedLanguages = new Set(['ko', 'en']);
  const savedLanguage = (() => {
    try { return window.localStorage.getItem('geosr-preview-language'); }
    catch { return null; }
  })();
  let language = supportedLanguages.has(query.get('lang'))
    ? query.get('lang')
    : (supportedLanguages.has(savedLanguage) ? savedLanguage : 'ko');
  let videoButtons = [];

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
    videoButtons.forEach(button => {
      const video = button.closest('.platform-frame')?.querySelector('video');
      if (!video) return;
      const label = video.paused
        ? (language === 'en' ? 'Play preview' : '미리보기 재생')
        : (language === 'en' ? 'Pause preview' : '미리보기 일시정지');
      button.textContent = label;
      button.setAttribute('aria-label', `${label}: ${video.getAttribute('aria-label') || ''}`.trim());
    });
    document.querySelectorAll('[data-route]').forEach(link => {
      const url = new URL(link.getAttribute('href'), window.location.href);
      url.searchParams.set('lang', language);
      link.setAttribute('href', `${url.pathname.split('/').pop()}${url.search}${url.hash}`);
    });
    try { window.localStorage.setItem('geosr-preview-language', language); }
    catch { /* Storage is optional; the query parameter is the shareable state. */ }
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', language);
      window.history.pushState({ language }, '', `${url.pathname}${url.search}${url.hash}`);
    }
  }

  applyLanguage(language, false);
  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => {
      applyLanguage(button.dataset.language);
      if (menuButton) {
        const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-label', isOpen
          ? (language === 'en' ? 'Close menu' : '메뉴 닫기')
          : (language === 'en' ? 'Open menu' : '메뉴 열기'));
      }
      if (dialog?.open && dialogTrigger && dialogTitle) {
        dialogTitle.textContent = language === 'en' ? dialogTrigger.dataset.titleEn : dialogTrigger.dataset.title;
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

  const platformTabList = document.querySelector('.platform-tabs');
  const platformTabs = [...document.querySelectorAll('[data-platform-tab]')];
  const platformPanels = [...document.querySelectorAll('.platform-example[role="tabpanel"]')];
  if (platformTabList && platformTabs.length && platformPanels.length === platformTabs.length) {
    const activatePlatform = (nextIndex, moveFocus = false) => {
      const currentIndex = platformTabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
      if (currentIndex === nextIndex) {
        if (moveFocus) platformTabs[nextIndex].focus();
        return;
      }
      const direction = nextIndex < currentIndex ? 'backward' : 'forward';
      platformTabs.forEach((tab, index) => {
        const selected = index === nextIndex;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      platformPanels.forEach((panel, index) => {
        const selected = index === nextIndex;
        const video = panel.querySelector('video.platform-video');
        if (!selected && video && !video.paused) video.pause();
        panel.hidden = !selected;
        panel.classList.remove('is-entering');
        if (selected) {
          panel.dataset.enterDirection = direction;
          requestAnimationFrame(() => {
            if (panel.hidden) return;
            panel.classList.add('is-entering');
          });
        }
      });
      if (moveFocus) platformTabs[nextIndex].focus();
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
    platformPanels.forEach((panel, index) => { panel.hidden = index !== 0; });
    activatePlatform(0);
  }

  const flowSteps = [...document.querySelectorAll('.flow-step')];
  flowSteps.forEach((step, index) => {
    step.open = index === 0;
    step.addEventListener('toggle', () => {
      if (!step.open) return;
      flowSteps.forEach(other => { if (other !== step) other.open = false; });
    });
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = () => Boolean(navigator.connection?.saveData);
  videoButtons = [...document.querySelectorAll('[data-video-toggle]')];
  function updateVideoButton(button, video, state = 'idle') {
    const value = state === 'playing'
      ? (language === 'en' ? 'Pause preview' : '미리보기 일시정지')
      : (language === 'en' ? 'Play preview' : '미리보기 재생');
    button.textContent = value;
    button.setAttribute('aria-pressed', String(state === 'playing'));
    button.setAttribute('aria-label', `${value}: ${video.getAttribute('aria-label') || ''}`.trim());
  }
  videoButtons.forEach(button => {
    const figure = button.closest('.platform-frame');
    const video = figure?.querySelector('video[data-video-src]');
    if (!video) return;
    button.hidden = false;
    updateVideoButton(button, video);
    const message = document.createElement('span');
    message.className = 'video-message';
    message.setAttribute('role', 'status');
    message.setAttribute('aria-live', 'polite');
    message.dataset.copyKo = '정적 캡처를 계속 표시합니다.';
    message.dataset.copyEn = 'Static capture remains visible.';
    message.setAttribute('data-copy-ko', message.dataset.copyKo);
    message.setAttribute('data-copy-en', message.dataset.copyEn);
    figure.append(message);
    const setPosterMessage = () => {
      message.textContent = language === 'en' ? message.dataset.copyEn : message.dataset.copyKo;
    };
    const pause = () => {
      if (!video.paused) video.pause();
      updateVideoButton(button, video);
    };
    video.addEventListener('play', () => updateVideoButton(button, video, 'playing'));
    video.addEventListener('pause', () => updateVideoButton(button, video));
    video.addEventListener('error', () => {
      pause();
      setPosterMessage();
    });
    button.addEventListener('click', async () => {
      if (!video.paused) { pause(); return; }
      if (!video.src) {
        video.src = video.dataset.videoSrc;
        video.load();
      }
      message.textContent = '';
      try {
        await video.play();
      } catch {
        pause();
        setPosterMessage();
      }
    });
    video._previewPause = pause;
  });

  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && !entry.target.paused) entry.target._previewPause?.();
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.platform-video').forEach(video => videoObserver.observe(video));
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) document.querySelectorAll('.platform-video').forEach(video => video._previewPause?.());
  });
  reducedMotion.addEventListener?.('change', () => {
    if (reducedMotion.matches) document.querySelectorAll('.platform-video').forEach(video => video._previewPause?.());
  });
  navigator.connection?.addEventListener?.('change', () => {
    if (saveData()) document.querySelectorAll('.platform-video').forEach(video => video._previewPause?.());
  });

  const tiltSupported = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (tiltSupported && !reducedMotion.matches) {
    document.querySelectorAll('.credential-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse') return;
        const rect = card.getBoundingClientRect();
        card.dataset.tilt = event.clientX < rect.left + rect.width / 2 ? 'left' : 'right';
      });
      card.addEventListener('pointerleave', () => { delete card.dataset.tilt; });
    });
  }

  const dialog = document.querySelector('.document-dialog');
  const dialogTitle = document.querySelector('#document-dialog-title');
  const dialogImage = dialog?.querySelector('img');
  let dialogTrigger = null;
  document.querySelectorAll('[data-document]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      if (!dialog || !dialogImage || !dialogTitle || typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      const button = trigger;
      dialogTrigger = button;
      dialogTitle.textContent = language === 'en' ? button.dataset.titleEn : button.dataset.title;
      dialogImage.src = button.dataset.document;
      dialogImage.alt = dialogTitle.textContent;
      dialog.showModal();
    });
  });
  dialog?.addEventListener('close', () => dialogTrigger?.focus());
  dialog?.addEventListener('click', event => {
    if (event.target === dialog && typeof dialog.close === 'function') dialog.close();
  });
})();
