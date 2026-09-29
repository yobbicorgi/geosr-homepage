/* AX-only content from 123choigem-tech/geosr-homepage-ax-platforms at 2533628. */
(() => {
  'use strict';
  const services=window.GeoSRAxV2?.services||[];
  const en=new URLSearchParams(location.search).get('lang')==='en';
  const t=(ko,english)=>en?english:ko;
  window.portalFilms=services.map(s=>[s.development?null:s.id,s.name,{ko:s.k,en:s.e},{ko:s.dk,en:s.de},{ko:s.features.map(x=>x[0]),en:s.features.map(x=>x[1])}]);
  window.axPage=()=>`
    <section class="ax-hero" aria-labelledby="ax-hero-title">
      <div class="ax-hero-stage"><img src="assets/editorial/ax-estuary-analysis-native-20260929.webp" width="1672" height="941" fetchpriority="high" alt="${t('하구의 공간분석 격자와 수환경 자료를 표현한 설명용 콘셉트 이미지','Illustrative estuarine spatial analysis with a model mesh and environmental data')}"></div>
      <div class="ax-hero-shade" aria-hidden="true"></div>
      <p class="ax-hero-label">Digital platforms</p>
      <div class="ax-hero-copy">
        <h1 id="ax-hero-title">AX Platform</h1>
        <p class="ax-hero-statement">${t('해양·환경 분야의 분석 플랫폼','Platforms for marine and environmental analysis')}</p>
        <p class="ax-hero-lead">${t('위성영상 분석과 연안 재해 예측 및 해양 관측을 위한 플랫폼을 소개합니다','Explore platforms for satellite analysis and coastal hazard forecasting and marine observation')}</p>
        <a class="ax-hero-link" href="#platform-browser">${t('플랫폼 살펴보기','Explore platforms')} <span aria-hidden="true">↓</span></a>
      </div>
    </section>
    <section class="ax-flutter" aria-label="${t('AX 플랫폼 탐색','Explore AX platforms')}"><div id="platform-browser"></div></section>
    <dialog class="ax-screen-dialog" aria-labelledby="ax-screen-dialog-title"><div class="ax-screen-dialog-head"><h2 id="ax-screen-dialog-title"></h2><button type="button" data-ax-close aria-label="${t('닫기','Close')}">×</button></div><img alt=""><p>${t('플랫폼 화면 미리보기 · 실시간 데이터 아님','Platform screen preview · Not live data')}</p></dialog>`;
})();
