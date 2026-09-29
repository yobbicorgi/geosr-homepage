/* Scroll-led editorial media for GeoSR interior pages. */
(() => {
  'use strict';
  if (!document.body.classList.contains('inner-page')) return;

  const params = new URLSearchParams(location.search);
  const en = document.documentElement.lang === 'en';
  const tr = (ko, english) => en ? english : ko;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const route = [...document.body.classList].find(name => name.startsWith('route-'))?.slice(6) || '';
  const scenes = {
    equipment: {
      label: ['관측과 분석 장비', 'Observation and analysis equipment'],
      slides: [
        ['assets/editorial/environmental-lab-native-20260929.webp', '환경분석 연구실', 'Environmental analysis laboratory']
      ]
    },
    careers: {
      label: ['현장 조사와 연구 환경', 'Field research and working environments'],
      slides: [
        ['assets/editorial/marine-observation.webp', '해양 관측', 'Marine observations'],
        ['assets/editorial/uav-survey.webp', '항공 측량', 'Aerial surveys'],
        ['assets/editorial/ecology-survey-wide.webp', '생태 조사', 'Ecology surveys']
      ]
    },
  };

  function buildCarousel(config) {
    const section = document.createElement('section');
    section.className = 'inner-visual-story';
    section.setAttribute('aria-label', tr(...config.label));
    const figure = document.createElement('figure');
    figure.className = 'inner-visual-stage';
    figure.dataset.innerVisualCarousel = '';
    figure.setAttribute('aria-roledescription', tr('이미지 슬라이드','image carousel'));
    const frame = document.createElement('div');
    frame.className = 'inner-visual-frame';
    config.slides.forEach((scene, index) => {
      const image = document.createElement('img');
      image.src = scene[0];
      image.alt = tr(scene[1] + ' 콘셉트 이미지', 'Concept image: ' + scene[2]);
      image.width = 1672;
      image.height = 941;
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';
      image.className = index === 0 ? 'is-active' : '';
      image.setAttribute('aria-hidden', String(index !== 0));
      image.dataset.innerVisualSlide = String(index);
      frame.append(image);
    });
    figure.append(frame);

    const shade = document.createElement('div');
    shade.className = 'inner-visual-shade';
    shade.setAttribute('aria-hidden', 'true');
    figure.append(shade);

    const caption = document.createElement('figcaption');
    caption.className = 'inner-visual-caption';
    caption.innerHTML = '<div class="inner-visual-caption-copy"><span data-inner-visual-caption>' + escape(tr(...config.slides[0].slice(1))) + '</span></div>' +
      '<div class="inner-visual-controls"><span data-inner-visual-count aria-live="off">01 <i>/ ' + String(config.slides.length).padStart(2, '0') + '</i></span><button type="button" data-inner-visual-toggle aria-pressed="false" aria-label="' + tr('자동 전환 정지','Pause slideshow') + '"><span aria-hidden="true">Ⅱ</span></button></div>';
    if (config.slides.length === 1) caption.querySelector('.inner-visual-controls')?.remove();
    figure.append(caption);
    section.append(figure);
    return section;
  }

  function mountPageLead() {
    if (route === 'equipment') {
      // Individual source records keep their original title, body and images without a generic cover.
      if (params.has('record') || params.has('id')) return;
      const root = document.querySelector('.source-archive');
      const heading = root?.querySelector('.source-archive-head');
      if (!root || !heading || root.querySelector('.inner-visual-story')) return;
      heading.insertAdjacentElement('afterend', buildCarousel(scenes[route]));
      return;
    }
    if (route === 'careers') {
      const root = document.querySelector('.company-information-page');
      const heading = root?.querySelector('.company-information-heading');
      if (!root || !heading || root.querySelector('.inner-visual-story')) return;
      heading.insertAdjacentElement('afterend', buildCarousel(scenes.careers));
      return;
    }
    if (route === 'business') {
      const story = document.querySelector('.tech-story');
      const storyImage = story?.querySelector('.tech-story-hero');
      if (story && storyImage) {
        storyImage.dataset.innerExpandingVisual = '';
        return;
      }
      // The capability workspace owns its page-specific concept/source gallery.
      // A second generic carousel here duplicated the hero and mismatched selected areas.
    }
  }

  function bindCarousel(figure) {
    const images = [...figure.querySelectorAll('[data-inner-visual-slide]')];
    if (images.length < 2) return;
    const caption = figure.querySelector('[data-inner-visual-caption]');
    const count = figure.querySelector('[data-inner-visual-count]');
    const pause = figure.querySelector('[data-inner-visual-toggle]');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0;
    let paused = reduced.matches;
    let visible = false;
    let timer = 0;
    const show = next => {
      index = (next + images.length) % images.length;
      images.forEach((image, i) => {
        image.classList.toggle('is-active', i === index);
        image.setAttribute('aria-hidden', String(i !== index));
      });
      const scene = scenes[route]?.slides[index];
      if (caption && scene) caption.textContent = tr(scene[1], scene[2]);
      if (count) count.innerHTML = String(index + 1).padStart(2, '0') + ' <i>/ ' + String(images.length).padStart(2, '0') + '</i>';
    };
    const schedule = () => {
      clearInterval(timer);
      if (!paused && visible && !figure.matches(':hover,:focus-within') && !document.hidden) timer = setInterval(() => show(index + 1), 7000);
    };
    const syncPause = () => {
      if (!pause) return;
      pause.setAttribute('aria-pressed', String(paused));
      pause.setAttribute('aria-label', en ? (paused ? 'Play slideshow' : 'Pause slideshow') : (paused ? '자동 전환 재생' : '자동 전환 정지'));
      pause.firstElementChild.textContent = paused ? '▷' : 'Ⅱ';
      schedule();
    };
    pause?.addEventListener('click', () => { paused = !paused; syncPause(); });
    figure.addEventListener('focusin', () => clearInterval(timer));
    figure.addEventListener('focusout', () => requestAnimationFrame(schedule));
    figure.addEventListener('mouseenter', schedule);
    figure.addEventListener('mouseleave', schedule);
    document.addEventListener('visibilitychange', schedule);
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, { threshold: .15 }).observe(figure);
    reduced.addEventListener('change', () => { paused = reduced.matches; syncPause(); });
    syncPause();
  }

  function bindExpansion(target) {
    let frame = 0;
    const headerHeight = () => document.querySelector('.site-header')?.getBoundingClientRect().height || 88;
    const update = () => {
      frame = 0;
      const bounds = target.getBoundingClientRect();
      const progress = matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : Math.max(0, Math.min(1, (headerHeight() - bounds.top + 8) / Math.max(1, innerHeight * .34)));
      target.style.setProperty('--inner-visual-progress', progress.toFixed(3));
      target.style.setProperty('--inner-visual-inset', Math.max(0, innerWidth * .065 * (1 - progress)).toFixed(1) + 'px');
      const heightRatio = innerWidth <= 700 ? .43 + .13 * progress : .54 + .16 * progress;
      target.style.setProperty('--inner-visual-height', Math.min(innerHeight * (innerWidth <= 700 ? .60 : .76), innerHeight * heightRatio).toFixed(1) + 'px');
      target.style.setProperty('--inner-visual-title-opacity', String(Math.max(0, Math.min(1, (progress - .26) / .55))));
      target.style.setProperty('--inner-visual-title-shift', (12 * (1 - progress)).toFixed(1) + 'px');
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request, { passive: true });
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', request);
    update();
  }

  // One title moves from a white introduction onto an expanding media scene
  // The document keeps a single accessible h1 and the original content below it
  function mountCorporateIntros() {
    const main = document.querySelector('main');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const compact = matchMedia('(max-width: 700px)');
    if (!main) return;
    const create = ({anchor, heading, media, label, title, summary, link}) => {
      if (!anchor || !heading || !media) return;
      const h1 = heading.querySelector('h1');
      if (!h1) return;
      const scene = document.createElement('section');
      scene.className = 'corporate-intro';
      const sticky = document.createElement('div');
      sticky.className = 'corporate-intro-sticky';
      const copy = document.createElement('header');
      copy.className = 'corporate-intro-heading';
      const name = document.createElement('p');
      name.textContent = label;
      if (title) h1.innerHTML = title;
      copy.append(name, h1);
      const visual = document.createElement('div');
      visual.className = 'corporate-intro-visual';
      const scrim = document.createElement('div');
      scrim.className = 'corporate-intro-scrim';
      scrim.setAttribute('aria-hidden', 'true');
      visual.append(media, scrim);
      sticky.append(copy, visual);
      scene.append(sticky);
      anchor.before(scene);
      if (summary || link) {
        const detail = document.createElement('div');
        detail.className = 'corporate-intro-summary';
        const detailHeading = document.createElement('h2');
        detailHeading.textContent = label;
        const body = document.createElement('div');
        if (summary) body.append(summary);
        if (link) body.append(link);
        detail.append(detailHeading, body);
        scene.after(detail);
      }
      heading.remove();
      let frame = 0;
      const update = () => {
        frame = 0;
        const header = document.querySelector('.site-header')?.getBoundingClientRect().height || 80;
        const bounds = scene.getBoundingClientRect();
        const distance = Math.max(1, scene.offsetHeight - innerHeight + header);
        const progress = compact.matches || reduced.matches ? 0 : Math.max(0, Math.min(1, (header - bounds.top) / distance));
        scene.style.setProperty('--scene-progress', progress.toFixed(4));
        scene.classList.toggle('is-immersed', progress > .64);
      };
      const request = () => { if (!frame) frame = requestAnimationFrame(update); };
      addEventListener('scroll', request, {passive:true});
      addEventListener('resize', request, {passive:true});
      reduced.addEventListener('change', request);
      update();
      return scene;
    };
    if (route === 'company') {
      const root = document.querySelector('.company-overview');
      const heading = root?.querySelector('.company-overview-copy');
      const description = heading?.querySelector('.company-overview-description');
      description?.querySelector('.company-overview-statement')?.remove();
      const scene = create({anchor:root, heading, media:root?.querySelector('.company-overview-image'), label:tr('회사 소개','About GeoSR'), title:tr('해양과 내륙의<br>수환경을 연구합니다','Research across marine<br>and inland environments'), summary:description});
      if (scene) {
        scene.id = root.id;
        const facts = document.createElement('section');
        facts.className = 'company-facts';
        facts.setAttribute('aria-labelledby','company-facts-title');
        facts.innerHTML = `<div class="company-facts-heading"><span>${tr('기업 개요','COMPANY PROFILE')}</span><h2 id="company-facts-title">${tr('지오시스템리서치','GeoSystem Research')}</h2></div><dl>
          <div><dt>${tr('설립','Founded')}</dt><dd>${tr('2000년 7월','July 2000')}</dd></div>
          <div><dt>${tr('연구 환경','Research environments')}</dt><dd>${tr('해양 · 하구 · 하천','Oceans · estuaries · rivers')}</dd></div>
          <div><dt>${tr('사업장','Offices')}</dt><dd>${tr('군포 · 부산 · 포항','Gunpo · Busan · Pohang')}</dd></div>
        </dl>`;
        scene.nextElementSibling?.after(facts);
        root.remove();
      }
    } else if (route === 'ax-platform') {
      const root = document.querySelector('.ax-hero');
      const scene = create({anchor:root, heading:root?.querySelector('.ax-hero-copy'), media:root?.querySelector('.ax-hero-stage'), label:'AX Platform', title:tr('해양·환경 데이터<br>분석 플랫폼','Marine and environmental<br>analysis platforms'), summary:root?.querySelector('.ax-hero-lead'), link:root?.querySelector('.ax-hero-link')});
      if (scene) root.remove();
    } else if (['equipment','careers'].includes(route) && !params.has('record') && !params.has('id')) {
      const root = document.querySelector(route === 'careers' ? '.company-information-page' : '.source-archive');
      const heading = root?.querySelector(route === 'careers' ? '.company-information-heading' : '.source-archive-head');
      const wrapper = root?.querySelector('.inner-visual-story');
      const scene = create({anchor:root, heading, media:wrapper?.querySelector('.inner-visual-stage'), label:tr(...{research:['연구개발','Research'],equipment:['보유 장비','Equipment'],careers:['채용','Careers']}[route]), title:tr(...{research:['연구개발 및 수행 실적','Research and project records'],equipment:['현장 관측과<br>분석을 위한 장비','Equipment for observation<br>and analysis'],careers:['채용안내','Careers']}[route])});
      if (scene) wrapper.remove();
    }
  }

  mountPageLead();
  mountCorporateIntros();
  if (route === 'contact') {
    const title = document.querySelector('.contact-hero h1');
    const directLabel = document.querySelector('.contact-direct .eyebrow');
    const formTitle = document.querySelector('.contact-form-heading h2');
    const formIntro = document.querySelector('.contact-form-heading>p:last-child');
    if (title && en) title.textContent = 'Business and technical enquiries';
    if (directLabel) directLabel.textContent = tr('연락처', 'Direct contact');
    document.querySelector('.contact-form-heading .eyebrow')?.remove();
    document.querySelectorAll('.contact-office-card .eyebrow').forEach(label => label.remove());
    if (formTitle) formTitle.textContent = tr('이메일로 문의하기', 'Compose an enquiry');
    if (formIntro) formIntro.textContent = tr('입력한 내용으로 이메일 앱을 엽니다', 'The details you enter will open in your email app');
  }
  document.querySelectorAll('[data-inner-visual-carousel]').forEach(figure => {
    bindCarousel(figure);
    if (!figure.closest('.corporate-intro')) bindExpansion(figure);
  });
  document.querySelectorAll('[data-inner-expanding-visual]').forEach(bindExpansion);
})();
