/* Authored visual explanation over original imagery — never a live prediction */
(() => {
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  window.GeoSRTechnologyVisual = (area, language = 'ko') => {
    const en = language === 'en';
    const media = area.visual;
    return '<img src="' + media.src + '" width="' + media.w + '" height="' + media.h + '" loading="lazy" decoding="async" alt="' + esc(en ? media.en : media.ko) + '">';
  };

  const galleryCopy = (slide, language) => language === 'en' ? slide.en : slide.ko;
  function galleryDetails(area, language, index) {
    const en = language === 'en';
    const slides = area.slides?.length ? area.slides : [{...area.visual, id: area.visual.src, kind: 'concept'}];
    index = (index + slides.length) % slides.length;
    const slide = slides[index];
    const concept = slide.kind === 'concept';
    return '<div class="business-visual-frame" data-slide-kind="' + (concept ? 'concept' : 'record') + '"><img src="' + esc(slide.src) + '" width="' + Number(slide.w || 1672) + '" height="' + Number(slide.h || 941) + '" alt="' + esc(galleryCopy(slide, language)) + '" loading="lazy" decoding="async">' + (slide.videoPlanned ? '<span class="film-pending-badge">' + (en ? 'FILM TO FOLLOW' : '영상 대체 예정') + '</span>' : '') + '</div><div class="business-visual-caption"><span data-gallery-caption aria-live="polite">' + esc(galleryCopy(slide, language)) + '</span><div class="business-visual-controls"><span data-gallery-count aria-live="off">' + String(index + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0') + '</span>' + (slides.length > 1 ? '<button type="button" data-business-gallery-toggle aria-pressed="false" aria-label="' + (en ? 'Pause slideshow' : '자동 전환 정지') + '">Ⅱ</button>' : '') + '</div></div>';
  }
  window.GeoSRBusinessGallery = (area, language = 'ko', index = 0) => {
    if (!area) return '';
    const slides = area.slides?.length ? area.slides : [{...area.visual, id: area.visual.src, kind: 'concept'}];
    index = (index + slides.length) % slides.length;
    return '<div class="business-visual-gallery" data-business-gallery data-business-area="' + esc(area.id) + '" data-gallery-index="' + index + '">' + galleryDetails(area, language, index) + '</div>';
  };

  const states = new WeakMap();
  function advance(gallery) {
    const area = window.GeoSRBusinessAreas?.find(item => item.id === gallery.dataset.businessArea);
    if (!area) return;
    const slides = area.slides?.length ? area.slides : [area.visual];
    const next = (Number(gallery.dataset.galleryIndex || 0) + 1) % slides.length;
    gallery.dataset.galleryIndex = String(next);
    gallery.innerHTML = galleryDetails(area, document.documentElement.lang === 'en' ? 'en' : 'ko', next);
    const state = states.get(gallery);
    const toggle = gallery.querySelector('[data-business-gallery-toggle]');
    if (state && toggle) {
      toggle.textContent = state.paused ? '▷' : 'Ⅱ';
      toggle.setAttribute('aria-pressed', String(state.paused));
      toggle.setAttribute('aria-label', document.documentElement.lang === 'en' ? (state.paused ? 'Play slideshow' : 'Pause slideshow') : (state.paused ? '자동 전환 재생' : '자동 전환 정지'));
    }
    const image = gallery.querySelector('.business-visual-frame img');
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && image?.animate) {
      image.animate([{opacity:.28, transform:'scale(1.025)'}, {opacity:1, transform:'scale(1)'}], {duration:650, easing:'cubic-bezier(.16,1,.3,1)'});
    }
  }
  function mount(gallery) {
    if (states.has(gallery)) return;
    const area = window.GeoSRBusinessAreas?.find(item => item.id === gallery.dataset.businessArea);
    if (!area || (area.slides?.length || 1) < 2) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const state = { paused: reduced.matches, visible: false, hovered: false, timer: 0 };
    states.set(gallery, state);
    const syncToggle = () => {
      const toggle = gallery.querySelector('[data-business-gallery-toggle]');
      if (!toggle) return;
      toggle.textContent = state.paused ? '▷' : 'Ⅱ';
      toggle.setAttribute('aria-pressed', String(state.paused));
      toggle.setAttribute('aria-label', document.documentElement.lang === 'en' ? (state.paused ? 'Play slideshow' : 'Pause slideshow') : (state.paused ? '자동 전환 재생' : '자동 전환 정지'));
    };
    const schedule = () => {
      clearInterval(state.timer);
      if (!state.paused && state.visible && !state.hovered && !gallery.matches(':focus-within') && !document.hidden)
        state.timer = setInterval(() => advance(gallery), 6200);
    };
    gallery.addEventListener('click', event => {
      const toggle = event.target.closest?.('[data-business-gallery-toggle]');
      if (!toggle) return;
      state.paused = !state.paused;
      syncToggle();
      schedule();
    });
    gallery.addEventListener('mouseenter', () => { state.hovered = true; schedule(); });
    gallery.addEventListener('mouseleave', () => { state.hovered = false; schedule(); });
    gallery.addEventListener('focusin', schedule);
    gallery.addEventListener('focusout', () => requestAnimationFrame(schedule));
    document.addEventListener('visibilitychange', schedule);
    reduced.addEventListener('change', () => { state.paused = reduced.matches; syncToggle(); schedule(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => { state.visible = entries[0].isIntersecting; schedule(); }, {threshold: .2}).observe(gallery);
    else { state.visible = true; schedule(); }
    syncToggle();
  }
  new MutationObserver(() => document.querySelectorAll('[data-business-gallery]').forEach(mount)).observe(document.body, {childList: true, subtree: true});
  document.querySelectorAll('[data-business-gallery]').forEach(mount);
})();
