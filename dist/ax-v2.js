/* AX Platform is an independent GeoSR introduction; service endpoints stay out of this page. */
(()=>{
const axCategories=[['all','전체','All platforms'],['flood','침수 예측','Flood'],['marine','해양 재해','Marine hazards'],['satellite','위성 분석','Satellite'],['environment','관측·환경','Environment'],['research','정보 분석','Research support']];
const axServices=[
 {id:'flood3d',type:'flood',name:'Flood 3D',k:'3차원 침수범람 예측',e:'3D flood scenario analysis',dk:'태풍 시나리오에 따른 연안 침수 범위를 3차원 지형에서 살펴봅니다',de:'Explore coastal inundation scenarios in the context of three-dimensional terrain',features:[['태풍 시나리오','Typhoon scenarios'],['3차원 침수 분포','3D inundation'],['시간별 변화','Change over time']],nk:'2022년 힌남노 연구 시나리오',ne:'2022 Hinnamnor research scenario'},
 {id:'satellite',type:'satellite',name:'Satellite Facility Detection',k:'위성 시설물 탐지',e:'Satellite facility detection',dk:'위성영상에서 시설물을 탐지하고 지역별 분포와 변화를 살펴봅니다',de:'Detect facilities in satellite imagery and explore their distribution and change',features:[['위성영상 탐색','Image exploration'],['시설물 탐지','Facility detection'],['지역별 현황','Regional summaries']],nk:'완도 해역의 시설물 탐지 대표 화면',ne:'Representative facility detection view around Wando'},
 {id:'surge',type:'marine',name:'Storm Surge',k:'태풍·폭풍해일 예측',e:'Typhoon and storm surge prediction',dk:'태풍의 이동과 관측소별 해일 예측 정보를 함께 확인합니다',de:'View typhoon tracks alongside station-based storm surge forecasts',features:[['태풍 이동 경로','Typhoon tracks'],['관측소별 예측','Station forecasts'],['시계열 분석','Time-series analysis']],nk:'2024년 산산 예측 사례 화면',ne:'Historical forecast example for Shanshan in 2024'},
 {id:'sealevel',type:'marine',name:'Extreme Sea Level',k:'극치해면고 예측',e:'Extreme sea level prediction',dk:'관측소별 해수면고 변화와 위험 시점을 지도와 시계열로 살펴봅니다',de:'Explore sea-level changes and critical periods through maps and station time series',features:[['관측소별 해수면고','Station sea levels'],['위험 시점 탐색','Critical time periods'],['조위와 모델 비교','Tide and model comparison']],nk:'2003년 매미 검증 시나리오',ne:'Validation scenario for Maemi in 2003'},
 {id:'rip',type:'marine',name:'Rip Current',k:'이안류 모니터링',e:'Rip current monitoring',dk:'해수욕장별 이안류 위험 정보와 현장 영상을 한 화면에서 확인합니다',de:'Bring beach-level rip current risk information and shore-camera views into one monitoring interface',features:[['해수욕장 현황','Beach overview'],['현장 영상','Shore cameras'],['위험 정보 조회','Risk information']],nk:'해운대 대표 화면과 CCTV 분할 보기',ne:'Haeundae overview and multi-camera view'},
 {id:'buoy',type:'environment',name:'Ocean Buoy',k:'해양부이 모니터링',e:'Ocean buoy monitoring',dk:'해양부이의 관측 위치와 기상·해양 자료를 공간과 시간 안에서 탐색합니다',de:'Explore buoy locations and marine observations across space and time',features:[['관측망 탐색','Observation network'],['관측 자료 조회','Observation data'],['기간별 변화','Time-series exploration']],nk:'남해 111 관측 지점 대표 화면',ne:'Representative view with Namhae 111 selected'},
 {id:'env',type:'environment',name:'Ocean Environment',k:'해양환경 변화 모니터링',e:'Ocean environment monitoring',dk:'수온과 표층염분 및 클로로필 자료로 해양환경의 분포와 변화를 살펴봅니다',de:'Explore marine environmental patterns using temperature, surface salinity and chlorophyll products',features:[['수온장','Temperature'],['표층염분장','Surface salinity'],['클로로필장','Chlorophyll']],nk:'환경 변수별 실제 플랫폼 화면',ne:'Actual environmental product views'},
 {id:'news',type:'research',name:'Natural Phenomena News',k:'자연현상 뉴스',e:'Natural phenomena news',dk:'자연현상 관련 보도를 지도에서 찾고 지역과 현상별로 정리합니다',de:'Discover reports of natural phenomena on a map and explore regional and thematic summaries',features:[['공간 기반 탐색','Spatial discovery'],['현상별 통계','Thematic summaries'],['뉴스 검색','News search']],nk:'연안침식 보도 검색과 현상별 통계 화면',ne:'Coastal erosion news search and thematic statistics'},
 {id:'flood-xai',type:'flood',name:'Integrated Flood XAI',k:'통합 침수 예측·분석',e:'Integrated flood prediction and analysis',dk:'침수 예측과 분석 과정을 함께 살펴보는 플랫폼을 준비하고 있습니다',de:'A platform concept for exploring flood predictions alongside their analysis',development:true,features:[['개발 중','In development'],['기능 소개 예정','Features to follow'],['목업 영역','Prototype layout']],nk:'개발 중인 플랫폼의 소개 자리이며 실제 화면이 아닙니다',ne:'A reserved introduction for a platform in development, not an actual service screen'},
 {id:'geodap',type:'data',name:'GeoDAP',k:'통합 데이터',e:'Integrated data',dk:'관측·모델·위성 자료를 한곳에서 탐색합니다',de:'Explore observation, model and satellite data in one place',features:[['관측 자료','Observations'],['수치모델','Models'],['위성 자료','Satellite data']],nk:'GeoDAP 통합 데이터',ne:'GeoDAP integrated data'}
];
const axPrinciples=[
 {id:'discover',name:'Discover',ko:'탐지',titleK:'현상을 찾고 구분합니다',titleE:'Find and classify change',bodyK:'위성 영상과 공간 정보에서 시설물과 자연현상의 위치와 분포를 살핍니다',bodyE:'Explore the location and distribution of facilities and natural phenomena in imagery and spatial data',services:['geodap','satellite','news']},
 {id:'predict',name:'Predict',ko:'예측',titleK:'가능한 변화를 살핍니다',titleE:'Explore what may follow',bodyK:'지형과 관측 자료를 바탕으로 침수와 해양 재해 시나리오를 비교합니다',bodyE:'Compare inundation and marine-hazard scenarios using terrain and observation data',services:['flood3d','surge','sealevel','flood-xai']},
 {id:'monitor',name:'Monitor',ko:'모니터링',titleK:'상태와 흐름을 계속 봅니다',titleE:'Follow conditions over time',bodyK:'부이 관측과 해양환경 정보를 시간과 공간의 맥락에서 살펴봅니다',bodyE:'Follow buoy observations and marine environmental information across time and space',services:['buoy','env','rip']}
];
function principleMedia(p){
 const previews={discover:'assets/platforms/satellite-poster.webp',predict:'assets/platforms/flood3d-poster.webp',monitor:'assets/platforms/buoy-poster.webp'};
 return `<figure class="platform-preview"><img src="${previews[p.id]}" width="2560" height="1440" alt="${E(T(p.titleK,p.titleE))}" loading="lazy"><figcaption>${T('실제 플랫폼 화면','ACTUAL PLATFORM SCREEN')}</figcaption></figure>`
}
function principleApplications(p){
 const names=p.services.map(id=>{const service=axServices.find(item=>item.id===id);return `${E(service.name)}${service.development?` (${T('개발 중','in development')})`:''}`});
 return `<div class="ax-principle-applications"><span>${T('관련 플랫폼','RELATED PLATFORMS')}</span><p>${names.join(' · ')}</p></div>`
}
function axPage(){
 return `<section class="ax-concept-hero" data-film-slot="ax-concept-film" data-production-slot="ax-concept-film" aria-labelledby="ax-title"><img class="ax-concept-poster" src="assets/concepts/ax-platform-v4/ax-data-planes-start-v1.png" data-media-poster="assets/concepts/ax-platform-v4/ax-data-planes-start-v1.png" width="1672" height="941" alt="${T('세 개의 추상 재질면을 표현한 콘셉트 이미지. 실제 데이터나 플랫폼 화면이 아닙니다.','Abstract concept image of three material planes; not actual data or a platform interface.')}"><div class="ax-concept-hero-atmosphere" aria-hidden="true"></div><div class="ax-concept-poster-shade" aria-hidden="true"></div><div class="ax-concept-hero-content"><div class="ax-masthead-top"><span>GEOSR / APPLIED INTELLIGENCE</span><span>30 SEC · CONCEPT FILM</span></div><h1 id="ax-title">AX<span>Platform</span></h1><div class="ax-masthead-bottom"><p>${T('관측과 분석을<br>현장에서 쓰는 도구로','Observation and analysis<br>shaped for field use')}</p><div><p>${T('해양·환경 분야의 변화를<br>탐지하고 예측하며 모니터링합니다','Discover, predict and monitor change<br>across marine and environmental contexts')}</p></div></div><div class="ax-concept-film-meta"><p class="ax-concept-film-status" role="status"><span>AX CONCEPT FILM</span><span>${T('영상 제작 준비 중','FILM IN PREPARATION')}</span></p><div class="ax-concept-hero-modes" aria-label="${T('플랫폼 기능','Platform capabilities')}"><span>DISCOVER</span><i aria-hidden="true">·</i><span>PREDICT</span><i aria-hidden="true">·</i><span>MONITOR</span></div></div><div class="ax-concept-time-rail" aria-hidden="true"><span>FRAME 01 / 06</span><span class="ax-concept-timeline"><i></i><i></i><i></i><i></i><i></i><i></i></span><span>00:00 <b>/</b> 00:30</span></div></div></section><section class="ax-overview" aria-label="${T('실제 AX 제품 화면','Actual AX product screens')}" data-production-slot="ax-overview-film">${axFilmReel()}</section><section class="ax-principles" id="ax-services"><div class="ax-principles-head"><div><p class="eyebrow">APPLIED INTELLIGENCE</p><h2>${T('세 가지 작동 원리<br><span>목적별 플랫폼으로 이어집니다</span>','Three operating principles<br><span>Applied across focused platforms</span>')}</h2></div><p>${T('탐지·예측·모니터링의 실제 화면과 각 플랫폼을 함께 살펴보세요.','Explore the actual screens and platforms behind discovery, prediction and monitoring.')}</p></div><div class="ax-principles-grid">${axPrinciples.map((p,i)=>`<article class="ax-principle-card" data-motion-mode="${['slow-push','lateral-pan','detail-focus'][i]}">${principleMedia(p)}<div class="ax-principle-copy"><span class="ax-principle-index">0${i+1} / ${p.name.toUpperCase()}</span><h3>${T(p.ko,p.name)}</h3><h4>${T(p.titleK,p.titleE)}</h4><p>${T(p.bodyK,p.bodyE)}</p>${principleApplications(p)}</div></article>`).join('')}</div></section>`
}
function initAxStages(){
 const selectors=['.ax-overview .ax-reel-context','.ax-overview .ax-reel-viewport','.ax-overview .ax-reel-sequence','.ax-principles-head','.ax-principle-card'];
 const install=()=>{
  const targets=[...document.querySelectorAll(selectors.join(','))];
  if(!targets.length)return false;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!matchMedia('(min-width: 821px)').matches||!('IntersectionObserver'in window)){targets.forEach(node=>node.classList.add('is-in-view'));return true}
  document.documentElement.classList.add('has-ax-scroll-motion');
  targets.forEach((node,index)=>{node.classList.add('ax-scroll-reveal');node.style.setProperty('--ax-reveal-delay',`${(index%3)*75}ms`)});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-in-view');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
  targets.forEach(node=>observer.observe(node));
  return true
 };
 if(install())return;
 const parent=document.body;
 if(!('MutationObserver'in window))return;
 const watcher=new MutationObserver(()=>{if(install())watcher.disconnect()});
 watcher.observe(parent,{childList:true,subtree:true});
}
window.axPage=axPage;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initAxStages,{once:true});else initAxStages();
})();
