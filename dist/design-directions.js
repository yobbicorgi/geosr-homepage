(() => {
  'use strict';

  const body = document.body;
  const tabs = [...document.querySelectorAll('[data-direction-tab]')];
  const langButtons = [...document.querySelectorAll('[data-language-button]')];
  const panel = document.getElementById('direction-panel');
  const description = document.querySelector('[data-direction-description]');
  const scoreNote = document.querySelector('[data-score-note]');
  const processCopy = document.querySelector('[data-process-copy]');
  const processLabel = document.querySelector('[data-process-label]');
  const processButtons = [...document.querySelectorAll('[data-process-step]')];

  const directions = {
    a: {
      title: 'A — Cinematic Scientific',
      description: {
        ko: '어두운 전체 화면의 영상 프레임과 장면 전환으로 현장부터 분석까지 이어가는 구성입니다.',
        en: 'A full-screen dark film frame and chapter transitions carry the story from fieldwork to analysis.'
      },
      note: {
        ko: '영화적 장면 크기와 연결감이 회사 범위, 근거 접근성, 모바일 읽기성을 압도하지 않는지 살핍니다.',
        en: 'Review whether cinematic scale and transitions preserve company scope, evidence access and mobile readability.'
      }
    },
    b: {
      title: 'B — Spatial Editorial',
      description: {
        ko: '현장 자료와 편집형 타이포그래피를 중심으로, 근거를 차분하게 살펴보는 구성입니다.',
        en: 'Field references and editorial typography create a calm, evidence-first reading experience.'
      },
      note: {
        ko: '현장 자료가 구체성을 만들고, 기술 근거와 탐색 흐름이 첫눈에 읽히는지 살핍니다.',
        en: 'Review whether field evidence makes the design specific and the technical pathways immediately legible.'
      }
    },
    c: {
      title: 'C — Interactive Technical',
      description: {
        ko: '관측·분석·모델링 단계를 직접 살펴보고 실제 플랫폼 화면을 비율 그대로 보여주는 구성입니다.',
        en: 'An interactive process stepper and uncropped product capture clarify how the work is organized.'
      },
      note: {
        ko: '상호작용이 근거를 설명하는지, 가상의 실시간 데이터나 통합 제품 흐름처럼 보이지 않는지 살핍니다.',
        en: 'Review whether interaction explains evidence without suggesting fictional live data or a single merged product.'
      }
    }
  };

  const processDetails = {
    observe: {label: 'OBSERVE', ko: '현장과 공간 자료를 목적에 맞게 확보하고 기준을 기록합니다.', en: 'Collect field and spatial evidence for the purpose, and document the reference conditions.'},
    analyze: {label: 'ANALYZE', ko: '수질·퇴적물·생태 자료와 관측 조건을 함께 검토합니다.', en: 'Review water, sediment and ecological evidence alongside observation conditions.'},
    model: {label: 'MODEL', ko: '검증된 입력 자료와 경계 조건을 바탕으로 변화 과정을 분석합니다.', en: 'Analyze processes using checked inputs and documented boundary conditions.'},
    predict: {label: 'PREDICT', ko: '예측은 실제 모델 결과와 적용 조건을 확인해 제시합니다.', en: 'Present predictions only with the actual model result and its applicable conditions.'},
    deliver: {label: 'DELIVER', ko: '검증된 결과를 사업 목적과 의사결정 맥락에 연결합니다.', en: 'Connect reviewed results to the project purpose and decision context.'}
  };

  function currentLanguage() {
    return body.dataset.language === 'en' ? 'en' : 'ko';
  }

  function setDirection(value, updateUrl = true) {
    const direction = directions[value] ? value : 'b';
    body.dataset.direction = direction;
    tabs.forEach((tab) => {
      const selected = tab.dataset.directionTab === direction;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    if (panel) panel.setAttribute('aria-labelledby', `direction-tab-${direction}`);
    const lang = currentLanguage();
    const selected = directions[direction];
    document.querySelector('[data-direction-letter]').textContent = direction.toUpperCase();
    document.querySelector('[data-direction-title]').textContent = selected.title;
    description.textContent = selected.description[lang];
    scoreNote.textContent = selected.note[lang];
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('direction', direction);
      window.history.replaceState({}, '', url);
    }
  }

  function setLanguage(language) {
    const next = language === 'en' ? 'en' : 'ko';
    body.dataset.language = next;
    document.documentElement.lang = next;
    document.querySelectorAll('[data-copy]').forEach((element) => {
      const value = element.dataset[next];
      if (value !== undefined) element.textContent = value.replaceAll('<br>', '\n');
    });
    document.querySelectorAll('[data-alt-ko], [data-alt-en]').forEach((element) => {
      const value = element.getAttribute(`data-alt-${next}`);
      if (value !== null) element.setAttribute('alt', value);
    });
    document.querySelectorAll('[data-copy-aria-ko], [data-copy-aria-en]').forEach((element) => {
      const value = element.getAttribute(`data-copy-aria-${next}`);
      if (value !== null) element.setAttribute('aria-label', value);
    });
    langButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.languageButton === next)));
    setDirection(body.dataset.direction, false);
    updateProcess(processButtons.find((button) => button.getAttribute('aria-pressed') === 'true')?.dataset.processStep || 'observe');
  }

  function updateProcess(step) {
    const entry = processDetails[step] || processDetails.observe;
    processButtons.forEach((button) => {
      const active = button.dataset.processStep === step;
      button.classList.toggle('is-current', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (processLabel) processLabel.textContent = entry.label;
    if (processCopy) processCopy.textContent = entry[currentLanguage()];
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setDirection(tab.dataset.directionTab));
    tab.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[next].focus();
      setDirection(tabs[next].dataset.directionTab);
    });
  });

  langButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.languageButton)));
  processButtons.forEach((button) => button.addEventListener('click', () => updateProcess(button.dataset.processStep)));

  const queryDirection = new URLSearchParams(window.location.search).get('direction');
  setDirection(queryDirection || 'b', false);
  setLanguage('ko');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    body.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));
  }
})();
