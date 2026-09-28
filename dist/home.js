/* Shared credentials, company field data, homepage and footer. */

/* Preserve the actual screen poster while an approved AX clip is paused, loading, or between chapters. */
(()=>{
 const mark=(event,playing)=>{const video=event.target;if(!(video instanceof HTMLVideoElement))return;const panel=video.closest('.ax-reel-panel--poster');if(panel)panel.classList.toggle('film-playing',playing)};
 document.addEventListener('playing',event=>mark(event,true),true);
 ['pause','ended','error'].forEach(type=>document.addEventListener(type,event=>mark(event,false),true));
})();

/* Source-led home sections. The hero uses a real photograph while the film is pending. */
const homeFields=[
 {id:'survey',labelK:'관측·조사',labelE:'Survey',bodyK:'수심·지형과 해양·하천의 물리 환경을 조사하고 현장 자료를 확보합니다',bodyE:'Survey bathymetry, terrain and marine and river conditions to collect field data',image:'equipment-usv-original.png',altK:'실제 GeoSR 무인선이 수면에서 운항하는 사진',altE:'Actual GeoSR unmanned survey vessel underway on water',termsK:['수심·지형','해양·하천 관측','현장 자료'],termsE:['Bathymetry and terrain','Marine and river observation','Field data'],axis:0},
 {id:'environment',labelK:'환경·생태 분석',labelE:'Environment and ecology',bodyK:'수질·퇴적물 분석과 생태 조사를 통해 환경 상태를 살핍니다',bodyE:'Examine environmental conditions through water and sediment analysis and ecological surveys',image:'concepts/reviewed-20260922/cf10-chemistry-wide-v1.png',altK:'사람이 없는 실험대의 생성형 콘셉트 이미지 · 실제 시설이나 분석 결과가 아닙니다',altE:'Generated concept image of an unoccupied lab bench; not a real facility or analysis result',termsK:['수질·퇴적물','생태 조사','환경 평가'],termsE:['Water and sediment','Ecological surveys','Environmental assessment'],axis:2},
 {id:'modelling',labelK:'수치모델·예측',labelE:'Modelling and forecasting',bodyK:'관측 자료와 환경 조건을 바탕으로 하천과 연안의 흐름을 분석합니다',bodyE:'Use observations and environmental conditions to study river and coastal processes',image:'concepts/reviewed-20260922/cf12-wave-model-v1.png',altK:'파랑 수면과 계산 격자의 관계를 설명한 생성형 개념 이미지',altE:'Generated concept of a wave surface transitioning to a computational mesh',termsK:['관측 조건','수치 계산','변화 시나리오'],termsE:['Observation conditions','Numerical analysis','Change scenarios'],axis:1},
 {id:'remote-sensing',labelK:'AI·원격탐사',labelE:'AI and remote sensing',bodyK:'위성 영상과 공간정보를 활용해 해양·환경 변화를 살펴봅니다',bodyE:'Use satellite imagery and spatial information to study marine and environmental change',image:'concepts/corporate-film/hero-earth-satellite-07s-v4.png',altK:'동아시아 지구 렌더링과 위성을 합성한 원격탐사 콘셉트 이미지',altE:'Remote-sensing concept combining an East Asia Earth render and an illustrative satellite',termsK:['위성 영상','영상 처리','공간 분석'],termsE:['Satellite imagery','Image processing','Spatial analysis'],axis:4}
];

/* Home composition: each section remains readable without animation or tab state. */
function home() {
  const sectionHead = (number, label, titleKo, titleEn, introKo, introEn) => `
    <div class="g-section-head">
      <div class="g-section-index"><span>${number}</span><span>${label}</span></div>
      <h2 id="g-${({ '01':'expertise', '02':'platforms', '03':'about', '04':'news' })[number]}-title">${T(titleKo, titleEn)}</h2>
      <p>${T(introKo, introEn)}</p>
    </div>`;
  const fieldScenes = homeFields.map((field, index) => `
    <article class="g-field${index===2?' is-active':''}" id="field-${field.id}">
      <h3><button type="button" data-field="${index}" aria-expanded="${index===2}" aria-controls="field-content-${index}"><span class="g-field-number">0${index+1}</span><span>${T(field.labelK,field.labelE)}</span><i aria-hidden="true"></i></button></h3>
      <div class="g-field-copy" id="field-content-${index}" ${index===2?'':'hidden'}>
        <p>${E(T(field.bodyK, field.bodyE))}</p>
        <ul>${(en ? field.termsE : field.termsK).map(term => `<li>${E(term)}</li>`).join('')}</ul>
        ${A(U('business', {axis: field.axis}), '관련 기술 보기', 'Explore this capability', 'g-text-link')}
      </div>
    </article>`).join('');

  return `
    <section class="g-hero" id="top" aria-labelledby="g-hero-title" data-production-slot="geosr-hero">
      <div class="g-hero-scene">
        <div class="g-hero-film" data-film-slot="geosr-hero" data-higgsfield-slot="geosr-hero">
          <img src="assets/geosr-brochure-coast-2025.jpg"
            data-media-poster="assets/geosr-brochure-coast-2025.jpg"
            width="1657" height="1173" fetchpriority="high"
            alt="${E(T('해안과 해양 환경 전경', 'Coastal and marine landscape'))}">
        </div>
        <div class="g-hero-shade" aria-hidden="true"></div>
        <div class="g-hero-copy">
          <h1 id="g-hero-title" lang="en"><span>Geo Data</span><span>Intelligence</span></h1>
          <p>${T('해양·하천 환경을 조사하고 분석하며<br>수치모델과 공간정보 기술을 개발합니다', 'Marine and environmental research<br>Field science and spatial intelligence')}</p>
          <div class="g-hero-actions">
            <a href="#expertise">${T('사업 분야', 'Explore our expertise')} <span aria-hidden="true">↓</span></a>
            ${A(U('company'), '회사 소개', 'About GeoSR')}
          </div>
        </div>
        <div class="g-hero-bottom"><span>${T('관측·조사　 환경·생태　 수치모델　 AI·원격탐사', 'SURVEY　 ENVIRONMENT　 MODELLING　 REMOTE SENSING')}</span><a href="#expertise" aria-label="${T('사업 분야로 이동','Explore our capabilities')}"><i aria-hidden="true"></i>SCROLL</a></div>
      </div>
    </section>

    <section class="g-expertise" id="expertise" aria-labelledby="g-expertise-title">
      ${sectionHead('01', 'EXPERTISE', '해양·환경 연구와 기술', 'Marine and environmental expertise', '현장 조사와 실험 분석 및 수치모델 개발', 'From field observations to environmental analysis and numerical modelling')}
      <div class="g-technical-stage" data-technical-stage data-mode="2">
        <div class="g-technical-visual" role="group" aria-label="${T('분야별 연구 기술 시각화','Research capability visualisations')}">
          ${homeFields.map((field,index)=>`<figure class="g-field-media" data-field-media="${index}" ${index===2?'':'hidden inert'}>
            <div class="g-field-frame" data-film-slot="expertise-${index+1}" data-film-active="${index===2}">
              <img src="assets/${index===2?'films/ocean-circulation-poster.webp':field.image}" width="1920" height="1080" loading="lazy" decoding="async" alt="${E(index===2?T('NASA ECCO2 해양 순환 모델 시각화','NASA ECCO2 ocean circulation model visualisation'):T(field.altK,field.altE))}">
            </div>
            <figcaption>${index===2?`${T('해양 순환 모델','Ocean circulation model')} <a href="https://svs.gsfc.nasa.gov/5425/" target="_blank" rel="noopener" aria-label="NASA Scientific Visualization Studio">NASA SVS</a>`:T(['해양 관측·조사','환경 분석 시각화 · 콘셉트','','위성 관측 시각화 · 콘셉트'][index],['Hydrographic survey','Environmental analysis · Concept','','Satellite observation · Concept'][index])}</figcaption>
          </figure>`).join('')}
        </div>
        <div class="g-field-sequence">${fieldScenes}</div>
      </div>
      <div class="g-section-end">${A(U('business'), '사업 및 기술 분야 전체 보기', 'Explore all capabilities', 'g-text-link')}</div>
    </section>

    <section class="g-platforms" id="platforms" aria-labelledby="g-platforms-title">
      ${sectionHead('02', 'DIGITAL PLATFORMS', '디지털 플랫폼', 'Digital platforms', '위성영상 분석과 지구환경 데이터 활용을 위한 두 플랫폼', 'Explore AX Platform and GeoDAP through their publicly available interfaces.')}
      <article class="g-platform g-platform--ax">
        <div class="g-platform-copy"><span>01 / APPLIED INTELLIGENCE</span><h3>AX <em>Platform</em></h3>
          <p>${T('위성영상 분석·재해 예측·해양 관측 분야의 플랫폼 화면을 확인할 수 있습니다', 'Explore specialist views for satellite analysis, hazard forecasting and marine observation.')}</p>
          <div class="g-capability-list"><span>${T('위성영상','Satellite imagery')}</span><span>${T('연안재해','Coastal hazards')}</span><span>${T('해양관측','Marine observation')}</span></div>
          ${A(U('ax-platform'), 'AX Platform 살펴보기', 'Explore AX Platform', 'g-text-link')}
        </div>
        <div class="g-platform-screen g-platform-screen--ax" data-home-ax-gallery>
          <div class="g-platform-screen-track">
            <div class="g-platform-screen-slide"><img src="assets/ax-embedded/satellite.webp" width="1280" height="720" loading="lazy" decoding="async" alt="${T('위성영상 탐지 플랫폼 화면','satellite detection platform interface')}"></div>
            <div class="g-platform-screen-slide"><img src="assets/ax-embedded/flood3d.webp" width="1280" height="720" loading="lazy" decoding="async" alt="${T('연안재해 플랫폼 화면','coastal hazard platform interface')}"></div>
            <div class="g-platform-screen-slide"><img src="assets/ax-embedded/buoy.webp" width="1280" height="720" loading="lazy" decoding="async" alt="${T('해양관측 플랫폼 화면','marine observation platform interface')}"></div>
          </div>
          <div class="g-platform-screen-controls"><span data-home-ax-label aria-live="polite">01 / ${T('위성영상 탐지','Satellite detection')}</span><div><button type="button" data-home-ax-prev aria-label="${T('이전 플랫폼 화면','Previous platform view')}">←</button><button type="button" data-home-ax-next aria-label="${T('다음 플랫폼 화면','Next platform view')}">→</button></div></div>
        </div>
      </article>
      <article class="g-platform g-platform--dap">
        <div class="g-platform-copy"><span>02 / EARTH DATA PLATFORM</span><h3>GeoDAP</h3>
          <p>${T('관측·모델·위성 자료를 지도에서 탐색하는 지구환경 데이터 플랫폼', 'A map-based workspace for exploring observation, model and satellite data.')}</p>
          <div class="g-capability-list"><span>${T('관측자료','Observations')}</span><span>${T('모델자료','Model data')}</span><span>${T('위성자료','Satellite data')}</span></div>
          <a class="g-text-link" href="https://www.geo-dap.com/" target="_blank" rel="noopener">${T('GeoDAP 서비스 열기', 'Open GeoDAP')}</a>
        </div>
        <a class="g-platform-screen g-platform-screen--dap" href="https://www.geo-dap.com/" target="_blank" rel="noopener" aria-label="${T('GeoDAP 공개 사이트 열기', 'Open GeoDAP public site')}">
          <img src="assets/geodap-home-public-preview-20260928.png" width="1265" height="712" loading="lazy" decoding="async" alt="${T('2026년 9월 28일 GeoDAP 공개 메인 화면', 'GeoDAP public homepage captured on 28 September 2026')}">
        </a>
      </article>
    </section>

    <section class="g-about" id="about" aria-labelledby="g-about-title"><div><span>03 / ABOUT GEOSR</span><h2 id="g-about-title">${T('지오시스템리서치', 'GeoSystem Research')}</h2></div><div><p>${T('2000년 설립된 해양·환경 분야 연구 기업으로 현장 조사와 실험 분석을 수행하며 수치모델과 공간정보 시스템을 개발합니다', 'Founded in 2000, GeoSR works across marine and environmental surveys, laboratory analysis, numerical models and spatial data systems.')}</p>${A(U('company'), '회사 소개 보기', 'About the company', 'g-text-link')}</div></section>

    <section class="g-news" id="news" aria-labelledby="g-news-title">
      ${sectionHead('04', 'NEWSROOM', '소식', 'News', '공지사항과 보도자료를 확인할 수 있습니다', 'Browse notices and media coverage.')}
      <div class="g-news-list"><a class="g-news-row" href="news.html?lang=${L}&record=ko-news-notices-3091-8372c75064"><span>${T('공지사항','Notice')}</span><strong>${T('해양수산 신기술 인증','Marine and fisheries technology certification')}</strong><time datetime="2026-08-20">2026.08.20</time></a><a class="g-news-row" href="news.html?lang=${L}&record=ko-news-press-2003-c14319c1ac"><span>${T('보도자료','Press')}</span><strong>${T('ESG 우수 중소기업 선정 관련 보도','ESG recognition in the press')}</strong><time datetime="2025-01-06">2025.01.06</time></a><a class="g-news-row" href="news.html?lang=${L}&record=ko-news-press-1885-c14319c1ac"><span>${T('보도자료','Press')}</span><strong>${T('연구개발 성과 관련 보도','Research and development in the press')}</strong><time datetime="2024-03-28">2024.03.28</time></a></div>
      <div class="g-section-end">${A(U('news'), '소식 전체 보기', 'Browse all news', 'g-text-link')}</div>
    </section>`;
}

function modernFooter(){return `<section class="studio-contact" aria-labelledby="studio-contact-heading"><div class="studio-contact-top"><p class="eyebrow">CONTACT / GEOSR</p><span>BUSINESS · TECHNOLOGY · RESEARCH</span></div><div class="studio-contact-statement"><h2 id="studio-contact-heading">${T('사업·기술 문의',"Business and technical enquiries")}</h2><a class="studio-contact-cta" href="${U('contact')}">${T('문의하기','Get in touch')} </a></div><div class="studio-contact-bottom"><p>${T('사업 상담과 기술·연구 협력 문의','Projects, technology development and research partnerships')}</p><address class="studio-contact-contact-links"><a href="mailto:admin@geosr.com">admin@geosr.com</a><a href="tel:+823151805700">${T('031-5180-5700','+82 31 5180 5700')}</a></address></div></section><footer class="site-footer"><div class="footer-information"><div><a class="brand" href="${U('index')}"><img src="assets/logo.png" alt="GeoSR"></a><p>${T('지오시스템리서치','GeoSystem Research Corporation')}<br>${T('경기도 군포시 엘에스로 172 한림휴먼타워 306호','306 Hanlim Human Tower, 172 LS-ro, Gunpo-si, Korea')}</p><a href="tel:+823151805700">+82 31 5180 5700</a></div><div class="footer-navigation">${nav.map(n=>A(U(n[0]),n[1],n[2])).join('')}${A('https://www.geo-dap.com/','GeoDAP','GeoDAP')}</div><div class="footer-meta"><span>© GEOSYSTEM RESEARCH</span><a href="${U('equipment')}">${T('관측·분석 장비','Observation and analysis equipment')}</a><a href="${U('source-archive')}">${T('자료실','Records')}</a><a href="${U('contact')}">${T('문의하기','Contact')}</a></div></div></footer>`}

function credentialGallery(){return `<section class="credential-gallery" id="credentials" aria-labelledby="credential-gallery-title">
  <div class="credential-gallery-heading"><span class="eyebrow">GEOSR / CREDENTIALS</span><h2 id="credential-gallery-title">${T('인증·면허·지식재산권','Certifications, registrations and intellectual property')}</h2><p>${T('발급 문서의 앞면을 분야별로 확인할 수 있습니다','Browse document faces by category')}</p></div>
  <div class="credential-gallery-controls"><div class="credential-gallery-tabs" role="group" aria-label="${T('문서 분류','Document categories')}"></div><label class="credential-gallery-search">${T('자료 검색','Search documents')}<input id="credential-index-query" type="search" placeholder="${T('자료명 입력','Enter a document title')}" autocomplete="off"></label></div>
  <div class="credential-gallery-meta"><span class="credential-gallery-count" aria-live="polite"></span><span>${T('공개 문서 이미지 · 일부 자료는 이미지 검토 중','Published document images · Some previews are under review')}</span></div>
  <div class="credential-gallery-results" aria-live="polite"></div>
  <dialog class="credential-gallery-dialog" aria-labelledby="credential-gallery-dialog-title"><div><h2 id="credential-gallery-dialog-title"></h2><button type="button" data-credential-close aria-label="${T('닫기','Close')}">×</button></div><img alt=""><p>${T('공개된 문서 이미지 · 현재 유효 여부는 발급기관에서 확인해 주세요','Published document image · Check current validity with the issuer')}</p></dialog>
  </section>`}
