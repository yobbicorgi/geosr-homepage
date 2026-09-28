/* AX-only content from 123choigem-tech/geosr-homepage-ax-platforms at 2533628. */
(() => {
  'use strict';
  const services=window.GeoSRAxV2?.services||[];
  const en=new URLSearchParams(location.search).get('lang')==='en';
  const t=(ko,english)=>en?english:ko;
  window.portalFilms=services.map(s=>[s.development?null:s.id,s.name,{ko:s.k,en:s.e},{ko:s.dk,en:s.de},{ko:s.features.map(x=>x[0]),en:s.features.map(x=>x[1])}]);
  window.axPage=()=>`
    <section class="ax-hero" aria-labelledby="ax-hero-title">
      <div class="ax-hero-grid" aria-hidden="true"></div>
      <div class="ax-hero-copy"><span class="ax-kicker">GEOSR / AX PLATFORM</span>
        <h1 id="ax-hero-title">AX <em>Platform</em></h1>
        <p class="ax-hero-statement">${t('해양·환경 분야의 분석 플랫폼','Platforms for marine and environmental analysis')}</p>
        <p class="ax-hero-lead">${t('위성영상 분석과 연안 재해 예측 및 해양 관측을 위한 플랫폼을 소개합니다','Explore platforms for satellite analysis, coastal hazard forecasting and marine observation.')}</p>
        <a class="ax-hero-link" href="#platform-browser">${t('플랫폼 살펴보기','Explore platforms')} <span aria-hidden="true">↓</span></a>
      </div>
      <div class="ax-hero-stage"><div class="ax-window-bar"><span class="ax-window-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>SATELLITE FACILITY DETECTION</span><span>01 / 08</span></div>
        <img src="assets/ax-embedded/satellite.webp" width="1280" height="720" fetchpriority="high" alt="${t('직원이 제작한 위성 시설물 탐지 플랫폼 정적 화면','Static screen of the team-built satellite facility detection platform')}">
        <span class="ax-window-note">${t('정적 화면 · 실시간 데이터 아님','STATIC SCREEN · NOT LIVE DATA')}</span></div>
      <div class="ax-hero-foot"><span>AX PLATFORM</span><span>${t('8개 화면 · 1개 개발 중','8 screens · 1 in development')}</span></div>
    </section>
    <section class="ax-flutter" aria-label="${t('AX 플랫폼 탐색','Explore AX platforms')}"><div id="platform-browser"></div></section>
    <section class="ax-outro"><span class="ax-kicker">GEOSR / EXPERTISE</span><h2>${t('기술 분야','GeoSR expertise')}</h2><p>${t('현장 조사와 환경 분석 및 수치모델 연구를 소개합니다','Explore field surveys, environmental analysis and numerical modelling.')}</p><a href="business.html?lang=${en?'en':'ko'}">${t('기술 분야 보기','Explore expertise')} ↗</a></section>
    <dialog class="ax-screen-dialog" aria-labelledby="ax-screen-dialog-title"><div class="ax-screen-dialog-head"><h2 id="ax-screen-dialog-title"></h2><button type="button" data-ax-close aria-label="${t('닫기','Close')}">×</button></div><img alt=""><p>${t('제공 저장소의 정적 화면 · 실시간 데이터 아님','Static screen from the supplied repository · not live data')}</p></dialog>`;
})();
