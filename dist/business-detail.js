(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const en = new URLSearchParams(location.search).get('lang') === 'en';
  const tr = (ko, english) => en ? english : ko;
  const caption = image => en ? image.captionEn : image.captionKo;
  const still = image => image.poster || image.src;
  const playButton = image => image.animated ? '<button type="button" class="tech-motion-control" data-tech-play data-src="' + esc(image.src) + '" data-poster="' + esc(image.poster) + '" aria-pressed="false">' + tr('움직임 재생', 'Play animation') + '</button>' : '';
  let motionObserver;
  const pause = button => {
    const image = button.closest('figure').querySelector('img');
    image.src = button.dataset.poster;
    button.setAttribute('aria-pressed', 'false');
    button.textContent = tr('움직임 재생', 'Play animation');
  };
  window.GeoSRBusinessDetailPage = (id, item, lang, link) => {
    const data = window.GeoSRBusinessDetails?.[id]?.[lang];
    const media = window.GeoSRTechnologyMedia?.[id];
    if (!data || !media) return '<section class="tech-story"><a href="' + link('business') + '">' + tr('사업 분야로 돌아가기','Back to business areas') + '</a><h1>' + tr('기술 자료를 찾을 수 없습니다','Technology record not found') + '</h1></section>';
    const hero = media.hero;
    const heroIndex = media.images.findIndex(image => image.src === hero.src);
    const evidenceImages = media.images.map((image, index) => ({image, index})).filter(({image}) => image.src !== hero.src);
    const heroClass = hero.concept ? 'tech-story-hero--concept' : 'tech-story-hero--record';
    const filmSlot = ({'15':'technology-estuary','46':'technology-water-model','52':'technology-ecosystem-model','53':'technology-coastal-monitoring','56':'technology-satellite','57':'technology-seismic','64':'technology-uav','65':'technology-ocean-forecast'})[String(id)];
    const mobileSubjectClass = ({'50':' tech-story-hero--debris-sampling','51':' tech-story-hero--saltmarsh-sampling','58':' tech-story-hero--shoreline-camera'})[String(id)] || '';
    const list = values => values.map(value => '<li>' + esc(value) + '</li>').join('');
    const imageButton = (image, index, priority = false) => '<button type="button" class="tech-image-open" data-tech-image="' + index + '" data-tech-id="' + id + '" data-tech-src="' + esc(image.src) + '" data-tech-poster="' + esc(image.poster || '') + '" data-tech-width="' + Number(image.width || 0) + '" data-tech-height="' + Number(image.height || 0) + '" data-tech-caption-ko="' + esc(image.captionKo || '') + '" data-tech-caption-en="' + esc(image.captionEn || '') + '" aria-label="' + esc(caption(image) + ' · ' + tr('확대 보기','Enlarge image')) + '"><img src="' + esc(still(image)) + '" width="' + image.width + '" height="' + image.height + '" alt="' + esc(caption(image)) + '" ' + (priority ? 'fetchpriority="high"' : 'loading="lazy"') + '><span aria-hidden="true">＋</span></button>';
    const heroCaption = hero.concept ? '' : '<figcaption><span class="tech-image-index">01</span><span>' + esc(caption(hero)) + '</span></figcaption>';
    return '<article class="tech-story" aria-labelledby="tech-story-title">' +
      '<nav class="tech-story-top" aria-label="' + tr('현재 위치','Breadcrumb') + '"><a href="' + link('business') + '">' + tr('사업 및 기술 분야','Business and technology') + '</a><span aria-hidden="true">/</span><span>' + esc(data.title) + '</span></nav>' +
      '<header class="tech-story-header"><div class="tech-story-heading"><p class="eyebrow">GeoSR</p><h1 id="tech-story-title">' + esc(data.title) + '</h1><p class="tech-story-summary">' + esc(en ? media.summaryEn : media.summaryKo) + '</p><nav class="tech-story-jumps" aria-label="' + tr('기술 페이지 목차','On this page') + '"><a href="#tech-overview">' + tr('사업소개','Business introduction') + '</a><a href="#tech-capabilities">' + tr('보유기술과 활용분야','Capabilities and applications') + '</a><a href="#tech-evidence">' + tr('주요 기술 자료','Technology in practice') + '</a></nav></div><figure class="tech-story-hero ' + heroClass + mobileSubjectClass + (Number(id) === 61 ? ' tech-story-hero--ai-series' : '') + '"' + (filmSlot ? ' data-film-slot="' + filmSlot + '"' : '') + '>' + imageButton(hero, heroIndex, true) + heroCaption + '</figure></header>' +
      '<section class="tech-overview" id="tech-overview"><div class="tech-section-heading"><span>01</span><h2>' + tr('사업소개','Business introduction') + '</h2></div><div class="tech-overview-copy">' + data.lead.split(/\n+/).filter(Boolean).map(p => '<p>' + esc(p) + '</p>').join('') + '</div></section>' +
      '<section class="tech-capabilities" id="tech-capabilities"><div class="tech-section-heading"><span>02</span><h2>' + tr('보유기술과 활용분야','Capabilities and applications') + '</h2></div><div class="tech-story-columns"><section><h3>' + tr('보유기술','Capabilities') + '</h3><ul>' + list(data.skills) + '</ul></section><section><h3>' + tr('활용분야','Applications') + '</h3><ul>' + list(data.uses) + '</ul></section></div></section>' +
      '<section class="tech-evidence" id="tech-evidence"><div class="tech-section-heading"><span>03</span><h2>' + tr('주요 기술 자료','Technology in practice') + '</h2></div><div class="tech-evidence-grid">' + evidenceImages.map(({image, index}) => '<figure>' + imageButton(image, index) + '<figcaption><span class="tech-image-index">' + String(index + 1).padStart(2, '0') + '</span><span>' + esc(caption(image)) + '</span>' + playButton(image) + '</figcaption></figure>').join('') + '</div></section>' +
      '<nav class="tech-story-next" aria-label="' + tr('관련 페이지','Related pages') + '"><a href="' + link('research') + '&technology=' + id + '">' + tr('관련 연구와 수행 실적','Related research and projects') + '<span aria-hidden="true">→</span></a><a href="' + link('contact') + '">' + tr('사업 및 기술 문의','Business and technical enquiries') + '<span aria-hidden="true">→</span></a></nav></article>';
  };

  let dialog, returnFocus;
  function closeDialog() {
    dialog?.querySelectorAll('[data-tech-play][aria-pressed="true"]').forEach(pause);
    dialog?.close();
  }
  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const play = target.closest('[data-tech-play]');
    if (play) {
      if (play.getAttribute('aria-pressed') === 'true') { pause(play); return; }
      const figure = play.closest('figure');
      figure.querySelector('img').src = play.dataset.src;
      play.setAttribute('aria-pressed', 'true');
      play.textContent = tr('움직임 정지','Pause animation');
      if ('IntersectionObserver' in window) {
        motionObserver ||= new IntersectionObserver(entries => entries.forEach(entry => {
          if (!entry.isIntersecting) entry.target.querySelectorAll('[data-tech-play][aria-pressed="true"]').forEach(pause);
        }));
        motionObserver.observe(figure);
      }
      return;
    }
    const opener = target.closest('[data-tech-image]');
    if (!opener) return;
    const catalogue = window.GeoSRTechnologyMedia?.[opener.dataset.techId];
    const image = catalogue?.images[Number(opener.dataset.techImage)] || (opener.dataset.techSrc ? {
      src: opener.dataset.techSrc,
      poster: opener.dataset.techPoster || null,
      width: Number(opener.dataset.techWidth),
      height: Number(opener.dataset.techHeight),
      captionKo: opener.dataset.techCaptionKo,
      captionEn: opener.dataset.techCaptionEn
    } : null);
    if (!image) return;
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.className = 'tech-image-dialog';
      dialog.setAttribute('aria-label', tr('기술 자료 확대 보기','Enlarged technology image'));
      dialog.innerHTML = '<button type="button" class="tech-dialog-close" aria-label="' + tr('닫기','Close') + '">×</button><figure></figure>';
      document.body.append(dialog);
      dialog.querySelector('.tech-dialog-close').addEventListener('click', closeDialog);
      dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
      dialog.addEventListener('close', () => {
        dialog.querySelectorAll('[data-tech-play][aria-pressed="true"]').forEach(pause);
        returnFocus?.focus({preventScroll:true});
      });
    }
    returnFocus = opener;
    dialog.querySelector('figure').innerHTML = '<img src="' + esc(still(image)) + '" width="' + image.width + '" height="' + image.height + '" alt="' + esc(caption(image)) + '"><figcaption><span>' + esc(caption(image)) + '</span>' + playButton(image) + '</figcaption>';
    dialog.showModal();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) document.querySelectorAll('[data-tech-play][aria-pressed="true"]').forEach(pause);
  });
  document.addEventListener('DOMContentLoaded', () => {
    const header=document.querySelector('.tech-story-header');
    const hero=header?.querySelector('.tech-story-hero');
    const heading=header?.querySelector('.tech-story-heading');
    if(!hero||!heading)return;
    if(hero.classList.contains('tech-story-hero--concept')){
      const overlay=document.createElement('div');
      overlay.className='tech-story-scene-copy';
      overlay.setAttribute('aria-hidden','true');
      const title=document.createElement('strong');title.textContent=heading.querySelector('h1')?.textContent||'';
      const summary=document.createElement('span');summary.textContent=heading.querySelector('.tech-story-summary')?.textContent||'';
      overlay.append(title,summary);hero.append(overlay);
    }
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0;
    const update=()=>{
      frame=0;
      const progress=reduced.matches||innerWidth<901?1:Math.max(0,Math.min(1,scrollY/(innerHeight*.58)));
      hero.style.setProperty('--tech-reveal',progress.toFixed(3));
    };
    addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update)},{passive:true});
    addEventListener('resize',update,{passive:true});
    update();
  },{once:true});
})();
