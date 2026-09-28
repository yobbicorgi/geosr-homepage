/* Shared credentials, company field data, homepage and footer. */
function credentialGallery(forCompany=false){return `<section class="credential-section credential-section--curated" id="credentials" aria-labelledby="credential-heading"><div class="section-kicker"><span>${forCompany?'CREDENTIALS':'04 / CREDENTIALS'}</span><span>RESEARCH THAT BUILDS</span></div><div class="credential-intro"><div><h2 id="credential-heading">${forCompany?T('인증·면허·지식재산권','Credentials'):T('인증·면허·지식재산권','Credentials')}</h2><p>${T('인증·면허와 지식재산권을 소개합니다','Certifications, registrations and intellectual property behind our work')}</p></div><button class="mobile-disclosure-button" type="button" data-credentials-toggle aria-expanded="false" aria-controls="credential-stage credential-category-tabs">${T('자료 살펴보기','Browse records')}<span aria-hidden="true">+</span></button><div id="credential-category-tabs" class="credential-category-tabs" role="tablist" aria-label="${T('자격 자료 분류','Credential categories')}"><button type="button" id="credential-category-cert" role="tab" aria-controls="credential-stage" aria-selected="true" tabindex="0" data-credential-category="cert"><span>01</span>${T('인증','Certification')}<small>02</small></button><button type="button" id="credential-category-license" role="tab" aria-controls="credential-stage" aria-selected="false" tabindex="-1" data-credential-category="license"><span>02</span>${T('면허·등록','Registration')}<small>02</small></button><button type="button" id="credential-category-patent" role="tab" aria-controls="credential-stage" aria-selected="false" tabindex="-1" data-credential-category="patent"><span>03</span>${T('지식재산권','Intellectual property')}<small>03</small></button></div></div><div class="credential-stage" id="credential-stage" role="tabpanel" aria-labelledby="credential-category-cert" tabindex="0"><div class="credential-stage-head"><span data-credential-stage-title>${T('인증','Certification')}</span><p>${T('대표 자료를 선택해 크게 볼 수 있습니다','Select a representative record for a closer view')}</p><div class="credential-stage-controls"><span data-credential-status aria-live="polite">02</span><button type="button" data-paper-step="-1" aria-label="${T('이전 문서','Previous document')}">‹</button><button type="button" data-paper-step="1" aria-label="${T('다음 문서','Next document')}">›</button></div></div><div class="credential-rail" tabindex="0" role="region" aria-label="${T('인증·면허·지식재산권 자료','Credential records')}" aria-describedby="credential-hint"><div class="credential-loading">${T('자료를 불러오는 중','Loading records')}</div></div></div><div class="credential-bottom"><p id="credential-hint">${T('분류를 선택하거나 문서를 눌러 확인하세요','Choose a category to transition between records · Select a document to enlarge')}</p><a href="${U('company')}#credential-library">${T('인증·면허·지식재산권 전체보기','Explore the document collection')}</a></div></section>${credentialDialog()}`}



/* Preserve the actual screen poster while an approved AX clip is paused, loading, or between chapters. */
(()=>{
 const mark=(event,playing)=>{const video=event.target;if(!(video instanceof HTMLVideoElement))return;const panel=video.closest('.ax-reel-panel--poster');if(panel)panel.classList.toggle('film-playing',playing)};
 document.addEventListener('playing',event=>mark(event,true),true);
 ['pause','ended','error'].forEach(type=>document.addEventListener(type,event=>mark(event,false),true));
})();

/* Compact, source-led home sections. The approved Earth hero remains unchanged. */
const homeFields=[
 {id:'survey',labelK:'관측·조사',labelE:'Survey',titleK:'해양과 하천을 정밀하게 관측합니다',titleE:'Survey field conditions',bodyK:'수심·지형과 해양·하천의 물리 환경을 조사하고 현장 자료를 확보합니다',bodyE:'Survey bathymetry, terrain and marine and river conditions to collect field data',image:'concepts/reviewed-20260922/cf05-usv-wide-v2.png',width:1672,height:941,altK:'GeoSR 무인선 원본을 참고한 관측 영상 콘셉트',altE:'Survey film concept based on the GeoSR vessel reference',noteK:'영상 콘셉트 · 원본 장비 참고 / 생성 배경',noteE:'FILM CONCEPT · SOURCE-REFERENCED CRAFT / GENERATED SETTING',termsK:['수심·지형','해양·하천 관측','현장 자료'],termsE:['Bathymetry and terrain','Marine and river observation','Field data'],axis:0},
 {id:'environment',labelK:'환경·생태 분석',labelE:'Environment and ecology',titleK:'수질과 생태계의 변화를 분석합니다',titleE:'Analyse samples and ecological records',bodyK:'수질·퇴적물 분석과 생태 조사를 통해 환경 상태를 살핍니다',bodyE:'Examine environmental conditions through water and sediment analysis and ecological surveys',image:'concepts/reviewed-20260922/cf10-chemistry-wide-v1.png',width:1672,height:941,altK:'사람이 없는 실험대의 생성형 콘셉트 이미지 · 실제 시설이나 분석 결과가 아닙니다',altE:'Generated concept image of an unoccupied lab bench; not a real facility or analysis result',noteK:'실험실 콘셉트 이미지 · 실제 시설·결과 아님',noteE:'LAB CONCEPT IMAGE · NOT A REAL FACILITY OR RESULT',termsK:['수질·퇴적물','생태 조사','환경 평가'],termsE:['Water and sediment','Ecological surveys','Environmental assessment'],axis:2},
 {id:'modelling',labelK:'수치모델·예측',labelE:'Modelling and forecasting',titleK:'수치모델로 환경 변화를 예측합니다',titleE:'Use numerical models to examine environmental change',bodyK:'관측 자료와 환경 조건을 바탕으로 하천과 연안의 흐름을 분석합니다',bodyE:'Use observations and environmental conditions to study river and coastal processes',image:'concepts/reviewed-20260922/cf12-wave-model-v1.png',width:1672,height:941,altK:'파랑 수면과 계산 격자의 관계를 설명한 생성형 개념 이미지',altE:'Generated concept of a wave surface transitioning to a computational mesh',noteK:'수치모델 개념 이미지 · 실제 계산 결과 아님',noteE:'MODELLING CONCEPT · NOT A SIMULATION RESULT',termsK:['관측 조건','수치 계산','변화 시나리오'],termsE:['Observation conditions','Numerical analysis','Change scenarios'],axis:1},
 {id:'remote-sensing',labelK:'AI·원격탐사',labelE:'AI and remote sensing',titleK:'영상과 공간정보에서 변화를 찾습니다',titleE:'Process and analyse satellite and image data',bodyK:'위성 영상과 공간정보를 활용해 해양·환경 변화를 살펴봅니다',bodyE:'Use satellite imagery and spatial information to study marine and environmental change',image:'concepts/corporate-film/hero-earth-satellite-07s-v4.png',altK:'동아시아 지구 렌더링과 위성을 합성한 원격탐사 콘셉트 이미지',altE:'Remote-sensing concept combining an East Asia Earth render and an illustrative satellite',noteK:'원격탐사 콘셉트 · 실제 관측 장면 아님',noteE:'REMOTE-SENSING CONCEPT · NOT AN ACTUAL OBSERVATION',termsK:['위성 영상','영상 처리','공간 분석'],termsE:['Satellite imagery','Image processing','Spatial analysis'],axis:4}
];

/* Home composition: each section remains readable without animation or tab state. */
function home() {
  const realPosts = posts.filter(post => !post[5]);
  const projectIds = ['research-3059', 'business-1994', 'academic-3093'];
  const projects = projectIds.map(id => realPosts.find(post => post[0] === id)).filter(Boolean);
  const news = realPosts
    .filter(post => ['notice', 'press', 'newsletter'].includes(post[1]))
    .sort((a, b) => b[2].localeCompare(a[2]))
    .slice(0, 3);
  const postType = post => {
    const type = types.find(item => item[0] === post[1]);
    return type ? T(type[1], type[2]) : '';
  };
  const sectionHead = (number, label, titleKo, titleEn, introKo, introEn) => `
    <div class="g-section-head">
      <div class="g-section-index"><span>${number}</span><span>${label}</span></div>
      <h2 id="g-${({ '01':'expertise', '02':'projects', '03':'platforms', '06':'news' })[number]}-title">${T(titleKo, titleEn)}</h2>
      <p>${T(introKo, introEn)}</p>
    </div>`;
  const fieldScenes = homeFields.map((field, index) => `
    <article class="g-field g-field--${field.id}" id="field-${field.id}">
      <figure class="g-field-media" data-production-slot="expertise-${index + 1}" data-film-slot="expertise-${index + 1}">
        <img src="assets/${E(field.image)}" width="${field.width || 2560}" height="${field.height || 1440}"
          alt="${E(T(field.altK, field.altE))}" loading="lazy" decoding="async">
        <figcaption>${T(field.noteK, field.noteE)}</figcaption>
      </figure>
      <div class="g-field-copy">
        <span class="g-field-number">0${index + 1} / 04 <i></i> ${T(field.labelK, field.labelE)}</span>
        <h3>${E(T(field.titleK, field.titleE))}</h3>
        <p>${E(T(field.bodyK, field.bodyE))}</p>
        <ul>${(en ? field.termsE : field.termsK).map(term => `<li>${E(term)}</li>`).join('')}</ul>
        ${A(U('business', {axis: field.axis}), '관련 기술 보기', 'Explore this capability', 'g-text-link')}
      </div>
    </article>`).join('');
  const projectNames = [
    ['연안재해 예측', 'Coastal hazard forecasting'],
    ['해안 변화 조사', 'Coastal change surveys'],
    ['침식관리선 연구', 'Erosion management research']
  ];
  const projectList = projects.map((post, index) => `
    <a class="g-project-row" href="${U('research', {id: post[0]})}">
      <span class="g-row-index">0${index + 1}</span>
      <span class="g-row-body"><small>${E(postType(post))} / ${E(post[2])}</small>
      <strong>${E(T(projectNames[index][0], projectNames[index][1]))}</strong>
      <em>${E(T(post[3], post[4]))}</em></span>
      <span class="g-row-arrow" aria-hidden="true">↗</span>
    </a>`).join('');
  const newsList = news.map(post => `
    <a class="g-news-row" href="${U('news', {id: post[0]})}">
      <span>${E(postType(post))}</span><strong>${E(T(post[3], post[4]))}</strong>
      <time datetime="${E(post[2])}">${E(post[2])}</time><span aria-hidden="true">↗</span>
    </a>`).join('');

  return `
    <section class="g-hero" id="top" aria-labelledby="g-hero-title" data-production-slot="geosr-hero">
      <div class="g-hero-film" data-film-slot="geosr-hero" data-higgsfield-slot="geosr-hero">
        <img src="assets/hero-coastal-estuary-concept-20260928.webp"
          data-media-poster="assets/hero-coastal-estuary-concept-20260928.webp"
          width="1672" height="941" fetchpriority="high"
          alt="${E(T('하구와 외해, 섬, 도시를 넓게 보여 주는 생성형 콘셉트 이미지. 실제 지역은 아닙니다', 'Generated wide estuary, open sea, island and city concept; not an actual location'))}">
      </div>
      <div class="g-hero-shade" aria-hidden="true"></div>
      <div class="g-hero-copy">
        <span class="g-overline">GEOSYSTEM RESEARCH <i></i> SEA · LAND · DATA</span>
        <h1 id="g-hero-title">Geo Data<br>Intelligence<span class="g-hero-period">.</span></h1>
        <p>${T('해양과 환경을 관측하고, 변화의 근거를 찾습니다', 'Observing marine environments. Making sense of change.')}</p>
        <div class="g-hero-actions">
          <a href="#expertise">${T('우리의 기술 살펴보기', 'Explore our expertise')} <span aria-hidden="true">↓</span></a>
          ${A(U('company'), '회사 소개', 'About GeoSR')}
        </div>
      </div>
      <div class="g-hero-bottom"><span>01 — 06</span><span>${T('연안 콘셉트 이미지 · 실제 지역 아님 · 메인 영상 준비 중', 'COASTAL CONCEPT · NOT AN ACTUAL LOCATION · FILM IN PREPARATION')}</span><a href="#expertise">SCROLL ↓</a></div>
    </section>

    <section class="g-intro" aria-label="${T('GeoSR의 연구 방식', 'How GeoSR works')}">
      <p class="g-intro-marker">GEO / SYSTEM / RESEARCH</p>
      <div><h2>${T('현장에서 얻은 자료를<br><span>이해할 수 있는 정보로.</span>', 'From field evidence<br><span>to usable understanding.</span>')}</h2>
        <p>${T('지오시스템리서치는 해양·하천의 현장 조사, 환경 분석, 수치모델과 공간정보 기술을 연결해 문제를 살핍니다', 'GeoSR connects field surveys, environmental analysis, numerical models and spatial information to study marine and river challenges.')}</p>
      </div>
      <div class="g-intro-lines" aria-hidden="true"><span>OBSERVE</span><span>ANALYSE</span><span>MODEL</span><span>APPLY</span></div>
    </section>

    <section class="g-expertise" id="expertise" aria-labelledby="g-expertise-title">
      ${sectionHead('01', 'OUR EXPERTISE', '현장부터 해석까지', 'From fieldwork to insight', '관측, 환경 분석, 수치모델, AI·원격탐사를 분야별 장면과 함께 소개합니다', 'Four connected disciplines, each grounded in a different way of working.')}
      <div class="g-field-sequence">${fieldScenes}</div>
      <div class="g-section-end">${A(U('business'), '기술과 솔루션 전체 보기', 'View all technologies', 'g-text-link')}</div>
    </section>

    <section class="g-projects" id="projects" aria-labelledby="g-projects-title">
      ${sectionHead('02', 'RESEARCH & PROJECTS', '연구를 기록하고<br>결과를 공유합니다', 'Research with a record', '기존 홈페이지에 공개된 수행 사례와 연구 자료를 원문 기반으로 볼 수 있습니다', 'Explore project and research records published on the original GeoSR website.')}
      <div class="g-project-layout">
        <figure class="g-project-image"><img src="assets/concepts/reviewed-20260922/cf12-wave-model-v1.png" width="1672" height="941" loading="lazy" alt="${T('파랑과 계산 격자를 표현한 생성형 수치모델 콘셉트 이미지', 'Generated wave and computational mesh concept image')}"><figcaption>${T('수치모델 콘셉트 이미지 · 실제 연구 결과 아님', 'MODELLING CONCEPT · NOT AN ACTUAL RESULT')}</figcaption></figure>
        <div class="g-project-list">${projectList}${A(U('research'), '연구·수행 사례 전체 보기', 'Browse research records', 'g-text-link')}</div>
      </div>
    </section>

    <section class="g-platforms" id="platforms" aria-labelledby="g-platforms-title">
      ${sectionHead('03', 'DIGITAL PLATFORMS', '데이터가 쓰이는 화면', 'Where data meets the screen', 'AX Platform과 GeoDAP을 각각의 목적과 실제 공개 화면으로 소개합니다', 'Two independent platforms, shown through their publicly available interfaces.')}
      <article class="g-platform g-platform--ax">
        <div class="g-platform-copy"><span>01 / APPLIED INTELLIGENCE</span><h3>AX <em>Platform</em></h3>
          <p>${T('위성영상 분석, 재해 예측, 해양 관측 등 전문 분야별 화면을 살펴보세요', 'Explore specialist views for satellite analysis, hazard forecasting and marine observation.')}</p>
          <div class="g-capability-list"><span>DETECT</span><span>PREDICT</span><span>MONITOR</span></div>
          ${A(U('ax-platform'), 'AX Platform 살펴보기', 'Explore AX Platform', 'g-text-link')}
        </div>
        <a class="g-platform-screen" href="${U('ax-platform')}" aria-label="${T('AX Platform의 화면과 기능 살펴보기', 'Explore AX Platform interface and features')}">
          <img src="assets/ax-embedded/satellite.webp" width="1280" height="720" loading="lazy" decoding="async" alt="${T('직원이 제작한 위성 시설물 탐지 플랫폼의 전체 정적 화면', 'Full static interface of the team-built satellite facility detection platform')}">
          <span>${T('직원 제작 정적 화면 · 실시간 데이터 아님', 'TEAM-BUILT STATIC CAPTURE · NOT LIVE DATA')}</span>
        </a>
      </article>
      <article class="g-platform g-platform--dap">
        <div class="g-platform-copy"><span>02 / EARTH DATA PLATFORM</span><h3>GeoDAP</h3>
          <p>${T('관측·모델·위성 자료를 지도에서 탐색하는 지구환경 데이터 플랫폼', 'A map-based workspace for exploring observation, model and satellite data.')}</p>
          <div class="g-capability-list"><span>DISCOVER</span><span>EXPLORE</span><span>CONNECT</span></div>
          <a class="g-text-link" href="https://www.geo-dap.com/" target="_blank" rel="noopener">${T('GeoDAP 서비스 열기', 'Open GeoDAP')}</a>
        </div>
        <a class="g-platform-screen g-platform-screen--dap" href="https://www.geo-dap.com/" target="_blank" rel="noopener" aria-label="${T('GeoDAP 공개 사이트 열기', 'Open GeoDAP public site')}">
          <img src="assets/geodap-workspace-public-preview-20260928.jpg" width="1585" height="892" loading="lazy" decoding="async" alt="${T('GeoDAP 공개 소개 페이지의 지도 작업화면 미리보기', 'GeoDAP public page map workspace preview')}">
          <span>${T('공개 소개 페이지의 미리보기 · 실시간 서비스 화면 아님', 'PUBLIC PAGE PREVIEW · NOT LIVE SERVICE')}</span>
        </a>
      </article>
    </section>

    ${credentialGallery(false)}

    <section class="g-records" id="records" aria-labelledby="g-records-title">
      <div><span class="g-small-label">05 / SOURCE ARCHIVE</span><h2 id="g-records-title">${T('기존 홈페이지의<br>공개 글을 찾아볼 수 있습니다', 'Explore the original public records')}</h2>
        <p>${T('공지, 사업, 연구, 학술 자료와 회사 소개 원문을 분류와 검색으로 확인할 수 있습니다', 'Search the original news, project, research, publication and company records.')}</p>
        ${A(U('source-archive'), '원문 자료실 열기', 'Open source archive', 'g-text-link')}
      </div><div class="g-record-lines" aria-hidden="true"><span>NEWS</span><span>PROJECTS</span><span>RESEARCH</span><span>COMPANY</span></div>
    </section>

    <section class="g-news" id="news" aria-labelledby="g-news-title">
      ${sectionHead('06', 'NEWSROOM', 'GeoSR 소식', 'News from GeoSR', '공지와 소식을 날짜순으로 볼 수 있습니다', 'Recent notices and published updates.')}
      <div class="g-news-list">${newsList}</div>
      <div class="g-section-end">${A(U('news'), '소식 전체 보기', 'Browse all news', 'g-text-link')}</div>
    </section>`;
}

function modernFooter(){return `<section class="studio-contact" aria-labelledby="studio-contact-heading"><div class="studio-contact-top"><p class="eyebrow">CONTACT / GEOSR</p><span>BUSINESS · TECHNOLOGY · RESEARCH</span></div><div class="studio-contact-statement"><h2 id="studio-contact-heading">${T('사업과 연구를<br>함께 논의합니다',"Let’s work<br>together")}</h2><a class="studio-contact-cta" href="${U('contact')}">${T('문의하기','Get in touch')} <span aria-hidden="true">→</span></a></div><div class="studio-contact-bottom"><p>${T('사업 상담부터 기술 개발과 공동 연구까지','Projects, technology development and research partnerships')}</p><address class="studio-contact-contact-links"><a href="mailto:admin@geosr.com">admin@geosr.com</a><a href="tel:+823151805700">${T('031-5180-5700','+82 31 5180 5700')}</a></address></div></section><footer class="site-footer"><div class="footer-information"><div><a class="brand" href="${U('index')}"><img src="assets/logo.png" alt="GeoSR"></a><p>${T('지오시스템리서치','GeoSystem Research Corporation')}<br>${T('경기도 군포시 엘에스로 172 한림휴먼타워 306호','306 Hanlim Human Tower, 172 LS-ro, Gunpo-si, Korea')}</p><a href="tel:+823151805700">+82 31 5180 5700</a></div><div class="footer-navigation">${nav.map(n=>A(U(n[0]),n[1],n[2])).join('')}${A('https://www.geo-dap.com/','GeoDAP','GeoDAP')}</div><div class="footer-meta"><span>© GEOSYSTEM RESEARCH</span><a href="${U('equipment')}">${T('관측·분석 장비','Observation and analysis equipment')}</a><a href="${U('contact')}">${T('문의하기','Contact')}</a></div></div><div class="footer-wordmark" aria-hidden="true">GeoSR</div></footer>`}

function credentialDialog(){return `<dialog id="credential-dialog" aria-labelledby="credential-dialog-title"><div class="document-modal-head"><h2 id="credential-dialog-title"></h2><button type="button" data-close-document aria-label="${T('닫기','Close')}">×</button></div><img alt=""><div class="document-modal-foot"><p>${T('기존 홈페이지에 공개된 자료의 사본','A copy of the record published on the original website')}</p><a target="_blank" rel="noopener">${T('문서 사본 열기','Open document copy')} ↗</a></div></dialog>`}
