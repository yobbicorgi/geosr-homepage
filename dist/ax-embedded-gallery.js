/* AX-only content adapted from 123choigem-tech/geosr-homepage-ax-platforms@2533628.
   The corporate sections and temporary external platform destinations are excluded. */
(() => {
  'use strict';
  const services = window.GeoSRAxV2?.services || [];
  const lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'ko';
  const tr = (ko, en) => lang === 'en' ? en : ko;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const categories = [
    ['all', '전체', 'All'],
    ['flood', '침수 예측', 'Flood'],
    ['satellite', '위성 분석', 'Satellite'],
    ['marine', '해양 재해', 'Marine hazards'],
    ['environment', '관측·환경', 'Observation'],
    ['research', '정보 분석', 'Research']
  ];
  const image = service => service.development ? '' : `assets/ax-embedded/${service.id}.webp`;

  window.axPage = () => `<section class="ax-embedded-hero" aria-labelledby="ax-embedded-title">
    <div class="ax-embedded-hero-copy"><p class="eyebrow">GEOSR / AX PLATFORM</p>
      <h1 id="ax-embedded-title">AX <span>Platform</span></h1>
      <p>${tr('해양·환경 데이터를 분석하고 변화의 가능성을 살핍니다','Explore marine and environmental data to understand change')}</p>
      <a href="#platform-browser">${tr('플랫폼 살펴보기','Explore platforms')} <span aria-hidden="true">↓</span></a>
    </div>
    <figure class="ax-embedded-hero-screen"><img src="assets/ax-embedded/satellite.webp" width="1280" height="720" alt="${esc(tr('위성 시설물 탐지 플랫폼의 정적 화면 캡처','Static screen capture of the satellite facility detection platform'))}" fetchpriority="high"><figcaption>${tr('실제 플랫폼 화면 캡처 · 실시간 데이터 아님','ACTUAL PLATFORM SCREEN CAPTURE · NOT LIVE DATA')}</figcaption></figure>
    <span class="ax-embedded-hero-index" aria-hidden="true">DETECT / PREDICT / MONITOR</span>
  </section>
  <section class="ax-embedded-gallery" id="platform-browser" aria-labelledby="ax-embedded-gallery-title">
    <div class="ax-embedded-heading"><p class="eyebrow">AX PLATFORM / DIRECTORY</p><h2 id="ax-embedded-gallery-title">${tr('필요한 플랫폼을 찾아보세요','Find the platform you need')}</h2><p>${tr('관측·분석·예측 분야별 화면과 기능을 살펴봅니다','Explore observation, analysis and forecasting by field')}</p></div>
    <div class="ax-embedded-filters" role="group" aria-label="${tr('플랫폼 분야','Platform categories')}">${categories.map(([id,ko,en])=>`<button type="button" data-ax-filter="${id}" aria-pressed="${id==='all'}">${tr(ko,en)}</button>`).join('')}</div>
    <div class="ax-embedded-stage" tabindex="0" role="region" aria-label="${tr('선택한 플랫폼 화면. 좌우 방향키로 변경','Selected platform screen. Use left and right arrow keys to change')}">
      <figure class="ax-embedded-screen"><img data-ax-screen src="assets/ax-embedded/flood3d.webp" width="1280" height="720" alt=""><div class="ax-embedded-development" data-ax-development hidden>${tr('개발 중 · 실제 화면 없음','IN DEVELOPMENT · NO SCREEN AVAILABLE')}</div><figcaption>${tr('정적 화면 캡처 · 실시간 서비스 연결 아님','STATIC SCREEN CAPTURE · NOT A LIVE SERVICE')}</figcaption></figure>
      <div class="ax-embedded-detail"><span data-ax-number>01 / 09</span><h3 data-ax-name></h3><h4 data-ax-title></h4><p data-ax-description></p><ul data-ax-features></ul><small data-ax-status></small></div>
    </div>
    <nav class="ax-embedded-navigation" aria-label="${tr('플랫폼 이동','Platform navigation')}"><button type="button" data-ax-step="-1" aria-label="${tr('이전 플랫폼','Previous platform')}">←</button><span data-ax-counter aria-live="polite"></span><button type="button" data-ax-step="1" aria-label="${tr('다음 플랫폼','Next platform')}">→</button></nav>
    <div class="ax-embedded-directory" role="group" aria-label="${tr('플랫폼 목록','Platform directory')}">${services.map((service,index)=>`<button type="button" data-ax-select="${index}" aria-pressed="false"><span>${String(index+1).padStart(2,'0')}</span>${esc(service.name)}</button>`).join('')}</div>
  </section>`;

  function init() {
    const root = document.querySelector('#platform-browser');
    if (!root || !services.length) return;
    let category = 'all';
    let selected = 0;
    const visible = () => services.map((service,index)=>({service,index})).filter(({service})=>category==='all'||service.type===category).map(({index})=>index);
    const render = () => {
      const active = visible();
      if (!active.includes(selected)) selected = active[0];
      const service = services[selected];
      const path = image(service);
      const screen = root.querySelector('[data-ax-screen]');
      screen.hidden = !path;
      if (path) { screen.src = path; screen.alt = tr(`${service.k} 플랫폼의 정적 화면 캡처`, `Static screen capture of ${service.name}`); }
      root.querySelector('[data-ax-development]').hidden = !!path;
      root.querySelector('[data-ax-number]').textContent = `${String(selected+1).padStart(2,'0')} / ${String(services.length).padStart(2,'0')}`;
      root.querySelector('[data-ax-name]').textContent = service.name;
      root.querySelector('[data-ax-title]').textContent = tr(service.k,service.e);
      root.querySelector('[data-ax-description]').textContent = tr(service.dk,service.de);
      root.querySelector('[data-ax-features]').replaceChildren(...service.features.map(([ko,en])=>{ const li=document.createElement('li');li.textContent=tr(ko,en);return li }));
      root.querySelector('[data-ax-status]').textContent = service.development ? tr('개발 중 · 실제 화면 없음','In development · no actual screen') : tr('직원이 제작한 AX 화면 자료 · 정적 소개','AX screen material prepared by the team · static introduction');
      root.querySelector('[data-ax-counter]').textContent = `${String(active.indexOf(selected)+1).padStart(2,'0')} / ${String(active.length).padStart(2,'0')}`;
      root.querySelectorAll('[data-ax-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.axFilter===category)));
      root.querySelectorAll('[data-ax-select]').forEach(button=>{const index=Number(button.dataset.axSelect);button.hidden=!active.includes(index);button.setAttribute('aria-pressed',String(index===selected))});
    };
    const step = direction => {const active=visible(); selected=active[(active.indexOf(selected)+direction+active.length)%active.length]; render()};
    root.addEventListener('click', event => {
      const filter = event.target.closest('[data-ax-filter]');
      const item = event.target.closest('[data-ax-select]');
      const control = event.target.closest('[data-ax-step]');
      if (filter) { category=filter.dataset.axFilter; render(); }
      else if (item) { selected=Number(item.dataset.axSelect); render(); }
      else if (control) step(Number(control.dataset.axStep));
    });
    root.querySelector('.ax-embedded-stage').addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
      event.preventDefault();step(event.key==='ArrowRight'?1:-1);
    });
    render();
  }
  document.addEventListener('DOMContentLoaded',init,{once:true});
})();
