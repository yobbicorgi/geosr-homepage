const P=new URLSearchParams(location.search),en=P.get('lang')==='en',L=en?'en':'ko';
const T=(k,e)=>String((en?e:k)??''),E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const U=(p,o={})=>`${p}.html?${new URLSearchParams({...o,lang:L})}`;
const route=location.pathname.split('/').pop().replace('.html','')||'index';
const nav=[['business','기술과 솔루션','Expertise'],['research','연구와 성과','Research'],['ax-platform','AX Platform','AX Platform'],['company','GeoSR 소개','About GeoSR'],['news','소식','News']];
const A=(href,k,e,cl='link')=>{const external=/^https?:\/\//.test(href),contextual=/plain-arrow|ink-link|field-link|pill-link/.test(cl),icon=external?'↗':contextual?'→':'';return `<a class="${cl}" href="${href}"${external?' target="_blank" rel="noopener"':''}>${T(k,e)}${icon?` <span aria-hidden="true">${icon}</span>`:''}</a>`};
const img=(src,alt,concept=false,cl='')=>`<figure class="visual ${cl}"><img src="assets/${src}" alt="${E(alt)}" loading="lazy">${concept?`<figcaption>${T('영상 가안 · IMAGEGEN','FILM CONCEPT · IMAGEGEN')}</figcaption>`:''}</figure>`;
const filmSlot=(id,label,description='')=>`<figure class="visual route-film-frame" data-production-slot="${E(id)}" data-film-slot="${E(id)}" aria-label="${E(label)}"><div class="route-film-fallback"><span>${T('영상 자료 준비 중','VIDEO ASSET IN PREPARATION')}</span><strong>${E(label)}</strong>${description?`<p>${E(description)}</p>`:''}</div></figure>`;
const tech=[{id:46,k:'수환경 통합모델링',e:'Integrated aquatic modelling',image:null,dk:'관측 자료와 환경 조건을 바탕으로 수환경 변화를 수치모델로 분석합니다',de:'Use numerical models and observations to examine change in aquatic environments.'},{id:63,k:'무인선 이용 관측',e:'Uncrewed surface observation',image:'equipment-usv-original.png',source:true,dk:'무인선으로 현장 관측 자료를 수집합니다',de:'Collect field observations with an uncrewed surface vessel.'},{id:61,k:'인공지능 활용기술',e:'Artificial intelligence',image:null,dk:'환경 자료의 패턴을 분석하는 인공지능 기술을 연구합니다',de:'Research AI methods for analysing patterns in environmental data.'}];
const disciplines=[['현장·정밀 관측','Precision observation','현장 조사·정밀 관측','Record the environment','육상과 수로를 측량하고 해저 지형과 조석·해류·파랑을 관측합니다','Field surveys and observation systems gather evidence across land, waterways and oceans.','media-pending.svg',63,false],['수치 모델·예측','Numerical modelling','수치 모델링·환경 예측','Reveal unseen flows','기상·유역·하천·해양 수치모델을 연계해 수환경 변화를 분석·예측합니다','Terrain and observation data inform models of aquatic environmental change.','media-pending.svg',46,true],['AI·데이터 분석','AI & data','AI 기반 해양 예측','Find what comes next','해양 관측 자료를 활용해 수온과 해수위를 예측하고 위성 자료의 해상도를 높이는 기술을 개발합니다','Explore patterns and possibilities in observation and model data.','satellite-layers-v3.png',61,true],['화학·환경 분석','Environmental analysis','환경·생태 조사 및 분석','Understand environmental conditions','수질과 퇴적물을 화학 분석하고 생태를 조사해 해양 환경 상태를 평가합니다','Chemical analysis and environmental and ecological surveys provide complementary perspectives.',null,15,true],['위성·영상','Satellite & imagery','위성영상 처리·분석','Observe at a broader scale','위성·영상 자료를 처리하고 분석해 해양 환경을 모니터링하는 데 활용합니다','Explore environmental information across wider areas using satellite and image data.','satellite-layers-v3.png',56,true],['공간정보·시스템','Spatial data systems','공간정보·데이터 플랫폼','Connect information to decisions','관측·모델·위성 자료를 모아 지도에서 조회하고 분석할 수 있습니다','Explore observation, model and satellite information in spatial context.',null,65,false]];
const types=[['business','사업','Projects'],['research','연구','Research'],['academic','학술','Publications'],['notice','공지','Notices'],['press','언론','Media'],['newsletter','뉴스레터','Newsletters']];
const posts=[['business-1994','business','2024-12-09','연안침식 정밀조사 용역','Detailed coastal erosion survey'],['research-3059','research','2026-04-08','한국형 연안재해 발생요인 예측기술 개발','Prediction technology for coastal hazard drivers in Korea'],['academic-3093','academic','2026-09-09','Establishment of the Erosion Control Line from Long-Term Beach Survey Data on the Macro-Tidal Coast','Establishment of the Erosion Control Line from Long-Term Beach Survey Data on the Macro-Tidal Coast'],['notice-3091','notice','2026-08-20','해양수산 신기술 인증','Marine and fisheries new technology certification'],['press-1440','press','2022-03-25','ICT로 먹이 주고 양식장 관리… “바다가 미래” 6000명 발길','ICT-powered aquaculture: “The ocean is the future”'],['newsletter-1542','newsletter','2023-05-19','GeoSR 뉴스레터 샘터 반기 특별판 vol.2','GeoSR Saemteo newsletter — special edition vol. 2']];
const businessGroups=[
 {n:'01',k:'조사와 관측',e:'Survey and observation',bodyK:'하구·하천과 연안의 수심·지형을 조사하고 무인선·무인항공 관측 자료를 수집합니다',bodyE:'Survey estuaries, rivers and coastal terrain, and collect observations with uncrewed vessels and aircraft',ids:[15,63,64]},
 {n:'02',k:'수환경 모델과 평가',e:'Aquatic models and assessment',bodyK:'기상·유역·하천·해양 자료를 수치모델로 분석하고 해역 이용과 환경 영향을 평가합니다',bodyE:'Use numerical models to analyse weather, watershed, river and ocean data, and assess marine use and environmental impacts',ids:[46,48,52,84]},
 {n:'03',k:'연안 생태와 환경',e:'Coastal ecology and environment',bodyK:'해양쓰레기와 연안 생태를 조사하고 종과 서식 환경의 변화를 살핍니다',bodyE:'Study marine litter and coastal ecology, including changes in species and habitats',ids:[50,51,59]},
 {n:'04',k:'연안 재해와 예측',e:'Coastal hazards and forecasting',bodyK:'연안 침식과 재해 취약성을 분석하고 파랑·수위 변화를 예측합니다',bodyE:'Analyse coastal erosion and hazard vulnerability, and forecast wave and water-level changes',ids:[53,54,55,65]},
 {n:'05',k:'위성·영상과 공간정보',e:'Satellite, imagery and spatial data',bodyK:'위성·영상 자료를 처리하고 해양·환경 공간정보를 구축합니다',bodyE:'Process satellite and image data and build marine and environmental spatial information',ids:[47,56,57,58,60,61,62]}
];
types.forEach(([id,k,e])=>posts.push([`mock-${id}`,id,'—',`${k} 게시물`,`${e} article placeholder`,true]));
function head(){return `<a class="skip" href="#main">${T('본문으로 이동','Skip to content')}</a><header class="${route==='index'?'':'solid'}"><a class="brand" href="${U('index')}"><img src="assets/logo.png" alt="GeoSR"></a><nav id="primary-navigation" aria-label="${T('주 메뉴','Main navigation')}">${nav.map(([r,k,e])=>`<a href="${U(r)}" ${route===r?'aria-current="page"':''}>${T(k,e)}${r==='ax-platform'?' <span aria-hidden="true">→</span>':''}</a>${r==='ax-platform'?'<a href="https://www.geo-dap.com/" target="_blank" rel="noopener">GeoDAP <span aria-hidden="true">↗</span></a>':''}` ).join('')}</nav><div class="header-actions"><button id="language" aria-label="${en?T('한국어로 전환','Switch to Korean'):T('영어로 전환','Switch to English')}">${T('EN','KR')}</button><a href="${U('contact')}" class="contact-link">${T('문의하기','Contact')}</a><button id="menu" aria-controls="primary-navigation" aria-expanded="false" aria-label="${T('메뉴 열기','Open menu')}">☰</button></div></header>`}
function foot(){return modernFooter()}

function title(n,k,e,dk='',de=''){return `<section class="page-title page-title--${route}${P.has('id')?' page-title--detail':''}"><p class="eyebrow">${n}</p><h1>${T(k,e)}</h1><p>${T(dk,de)}</p></section>`}
function rows(items){return items.map(p=>`<a class="record ${p[5]?'mock-record':''}" href="${U(['notice','press','newsletter'].includes(p[1])?'news':'research',{id:p[0],board:P.get('board')||'all',q:P.get('q')||'',year:P.get('year')||'',mock:P.get('mock')||''})}"><span class="record-type">${T(...types.find(x=>x[0]===p[1]).slice(1))}</span><h3>${E(T(p[3],p[4]))}<small class="record-status">${p[5]?T('목업','MOCKUP'):T('원문 기반','SOURCE RECORD')}</small></h3><time>${p[2]}</time><span aria-hidden="true">→</span></a>`).join('')}


const eq=[['1937','survey','원격조종 수중로봇(ROV)','Remotely operated underwater vehicle (ROV)','BlueROV2','equipment-rov.png'],['1176','lab','유도결합플라즈마 질량분석기','Inductively coupled plasma mass spectrometer','ICP-MS · iCAP-RQ','equipment-icp.png'],['1938','vessel','해누리호','Haenuri survey vessel','19톤 조사선','equipment-vessel.jpg'],['63','vessel','무인선 이용 관측','Uncrewed surface observation','','equipment-usv-original.png']];


const metadataConfig={
 "index":{"title":["지구 데이터 인텔리전스","Geo Data Intelligence"],"description":["지오시스템리서치는 해양·환경 분야의 관측, 분석, 모델링과 예측 기술을 연구합니다.","GeoSystem Research develops observation, analysis, modelling and forecasting capabilities for marine and environmental work."]},
 "business":{"title":["기술과 솔루션","Expertise"],"description":["현장 관측부터 환경 분석과 공간정보 활용까지, GeoSR의 기술 분야를 살펴봅니다.","Explore GeoSR capabilities in field observation, environmental analysis, modelling, AI and spatial information."]},
 "research":{"title":["연구개발 및 주요 수행실적","Research and project records"],"description":["GeoSR의 연구개발, 주요 사업 실적과 학술 자료를 찾아볼 수 있습니다.","Browse GeoSR research, project records and academic publications."]},
 "news":{"title":["GeoSR 소식","GeoSR News"],"description":["GeoSR 공지와 언론 보도, 뉴스레터를 확인할 수 있습니다.","Read company announcements, media coverage and newsletters from GeoSR."]},
 "company":{"title":["GeoSR 소개","About GeoSR"],"description":["지오시스템리서치의 사업 분야와 인증·면허·지식재산권 등 회사 정보를 소개합니다.","Learn about GeoSystem Research, its capabilities, credentials and company information."]},
 "equipment":{"title":["관측·분석 장비 및 조사선","Survey and analysis equipment"],"description":["현장 관측과 환경 분석에 사용하는 장비와 조사선을 소개합니다.","Browse selected equipment for field observation and environmental analysis."]},
 "contact":{"title":["사업 및 기술 문의","Business and technical enquiries"],"description":["사업, 기술, 연구 협력 문의를 위한 GeoSR 연락처를 안내합니다.","Contact GeoSR about business, technical and research collaboration."]},
 "ax-platform":{"title":["AX Platform","AX Platform"],"description":["해양·환경 분야의 변화를 탐지하고 예측하며 관측 정보를 살피는 AX Platform을 소개합니다.","Explore AX Platform capabilities for detecting change, comparing scenarios and monitoring observations."]},
 "platforms":{"title":["AX Platform","AX Platform"],"description":["해양·환경 분야의 변화를 탐지하고 예측하며 관측 정보를 살피는 AX Platform을 소개합니다.","Explore AX Platform capabilities for detecting change, comparing scenarios and monitoring observations."]}
};
function resolvePageMetadata(){
 const base=metadataConfig[route]||metadataConfig.index;
 let titlePair=base.title,descriptionPair=base.description;
 if(route==="business"&&P.has("id")){
  const id=String(P.get("id")),item=tech.find(v=>v.id===Number(id));
  if(item){titlePair=[item.k,item.e];descriptionPair=[item.dk,item.de]}
  else{
   const solution=window.siteContent?.solutions?.find(v=>v.id==="solution-"+id);
   if(solution){titlePair=[solution.title,techEnglish[id]||"Technology detail "+id];descriptionPair=["GeoSR의 전문 기술과 관련 정보를 소개합니다.","An overview of GeoSR expertise and related information."]}
   else{titlePair=["기술 상세 · "+id,"Technology detail "+id];descriptionPair=["GeoSR의 전문 기술 상세 정보를 확인합니다.","View details about this GeoSR capability."]}
  }
 }
 if(["research","news"].includes(route)&&P.has("id")){
  const allowed=route==="news"?["notice","press","newsletter"]:["business","research","academic"];
  const item=posts.find(v=>v[0]===P.get("id")&&allowed.includes(v[1]));
  if(item){titlePair=[item[3],item[4]];descriptionPair=item[5]?["게시글 콘텐츠를 위한 예시 자리입니다. 실제 본문 자료는 포함되지 않습니다.","This is a placeholder for article content; the full source record is not included."]:["선택한 GeoSR 연구·소식 자료의 게시 정보를 확인합니다.","View the selected GeoSR research or news record."]}
  else{titlePair=["자료를 찾을 수 없습니다","Content not found"];descriptionPair=["요청한 자료를 찾을 수 없습니다.","The requested record could not be found."]}
 }
  if(route==="equipment"&&P.has("category")){
   const categories={survey:[["조사 장비","Survey equipment"],["현장 조사와 관측에 활용하는 대표 조사 장비를 소개합니다.","Explore selected equipment used for field surveys and observation."]],lab:[["실험 장비","Laboratory equipment"],["환경 분석에 사용하는 대표 실험 장비를 소개합니다.","Explore selected equipment used in environmental analysis."]],vessel:[["조사선","Survey vessels"],["해양 현장 조사에 활용하는 조사선을 소개합니다.","Explore survey vessels used in marine field work."]]};
   const category=categories[P.get("category")];
   if(category){titlePair=category[0];descriptionPair=category[1]}
  }
  if(route==="equipment"&&P.has("id")){
   const item=eq.find(v=>v[0]===P.get("id"));
   if(item){titlePair=[item[2],item[3]];descriptionPair=["GeoSR 홈페이지에서 소개한 관측·분석 장비입니다.","An equipment record published by GeoSR."]}
  }
 return {title:T(...titlePair)+" | GeoSR",description:T(...descriptionPair),locale:en?"en_US":"ko_KR"};
}
function setMeta(attribute,name,value){
 let meta=document.head.querySelector('meta['+attribute+'="'+name+'"]');
 if(!meta){meta=document.createElement("meta");meta.setAttribute(attribute,name);document.head.append(meta)}
 meta.content=value;
}
function applyPageMetadata(){
 const metadata=resolvePageMetadata();
 document.title=metadata.title;
 setMeta("name","description",metadata.description);
 setMeta("property","og:type","website");
 setMeta("property","og:site_name","GeoSR");
 setMeta("property","og:title",metadata.title);
 setMeta("property","og:description",metadata.description);
 setMeta("property","og:locale",metadata.locale);
 const canonicalPath=route==='index'?'/':`/${route}.html`;
 const canonicalParams=new URLSearchParams();
 if(en)canonicalParams.set('lang','en');
 if(P.has('id'))canonicalParams.set('id',P.get('id'));
 const canonical=`https://www.geosr.com${canonicalPath}${canonicalParams.size?'?'+canonicalParams:''}`;
 let canonicalLink=document.head.querySelector('link[rel="canonical"]');
 if(!canonicalLink){canonicalLink=document.createElement('link');canonicalLink.rel='canonical';document.head.append(canonicalLink)}
 canonicalLink.href=canonical;
 const alternateFor=language=>{const params=new URLSearchParams();if(P.has('id'))params.set('id',P.get('id'));if(language==='en')params.set('lang','en');return `https://www.geosr.com${canonicalPath}${params.size?'?'+params:''}`};
 [['ko',alternateFor('ko')],['en',alternateFor('en')],['x-default',alternateFor('ko')]].forEach(([language,href])=>{let link=document.head.querySelector(`link[rel="alternate"][hreflang="${language}"]`);if(!link){link=document.createElement('link');link.rel='alternate';link.hreflang=language;document.head.append(link)}link.href=href});
 setMeta("property","og:url",canonical);
 setMeta("name","twitter:card","summary");
 setMeta("name","twitter:title",metadata.title);
 setMeta("name","twitter:description",metadata.description);
}
document.documentElement.lang=L;document.body.className='design-2026 '+(route==='index'?'home-page':'inner-page')+' route-'+route+(['ax-platform','platforms'].includes(route)&&!P.has('service')?' ax-home':'');document.body.innerHTML=head()+`<main id="main" tabindex="-1">${({index:home,business,research:archive,news:archive,platforms:window.axPage,'ax-platform':window.axPage,equipment,company:companyPage,contact}[route]||home)()}</main>`+foot();applyPageMetadata();
document.querySelector('#language').addEventListener('click',()=>{P.set('lang',en?'ko':'en');location.href=location.pathname+'?'+P+location.hash});
const menuButton=document.querySelector('#menu'),primaryNavigation=document.querySelector('#primary-navigation');let priorBodyOverflow='';
function closeNavigation(restoreFocus=false){if(menuButton.getAttribute('aria-expanded')!=='true')return;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label',T('메뉴 열기','Open menu'));primaryNavigation.classList.remove('open');document.body.classList.remove('menu-open');document.body.style.overflow=priorBodyOverflow;if(restoreFocus)menuButton.focus({preventScroll:true})}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';if(open){priorBodyOverflow=document.body.style.overflow;menuButton.setAttribute('aria-expanded','true');menuButton.setAttribute('aria-label',T('메뉴 닫기','Close menu'));primaryNavigation.classList.add('open');document.body.classList.add('menu-open');document.body.style.overflow='hidden';primaryNavigation.querySelector('a')?.focus({preventScroll:true})}else closeNavigation()});
addEventListener('resize',()=>{if(getComputedStyle(menuButton).display==='none')closeNavigation()},{passive:true});
primaryNavigation.addEventListener('click',event=>{if(event.target.closest('a'))closeNavigation()});
document.addEventListener('keydown',event=>{if(menuButton.getAttribute('aria-expanded')!=='true')return;if(event.key==='Escape'){event.preventDefault();closeNavigation(true);return}if(event.key!=='Tab')return;const focusable=[menuButton,...primaryNavigation.querySelectorAll('a[href]')].filter(node=>node.offsetParent!==null);if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];const current=focusable.indexOf(document.activeElement);if(event.shiftKey){event.preventDefault();focusable[current<=0?focusable.length-1:current-1].focus()}else{event.preventDefault();focusable[current<0||current>=focusable.length-1?0:current+1].focus()}});
document.querySelector('#enquiry')?.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget),type=String(data.get('type')||''),name=String(data.get('name')||''),organisation=String(data.get('organization')||''),email=String(data.get('email')||''),message=String(data.get('message')||'');const subject=`[GeoSR] ${type} · ${name}`;const body=[`${T('문의 분야','Enquiry type')}: ${type}`,`${T('이름','Name')}: ${name}`,`${T('회사·기관','Organisation')}: ${organisation}`,`${T('이메일','Email')}: ${email}`,'',message].join('\n');const status=document.querySelector('#form-status');status.textContent=T('이메일 앱에서 내용을 확인한 뒤 보내 주세요','Review the message in your email app before sending');window.location.href=`mailto:admin@geosr.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`});
const techEnglish={15:'Estuarine and river processes',46:'Integrated aquatic modelling',47:'Marine spatial planning',48:'Marine use consultation and impact assessment',84:'Marine ecosystem conservation and monitoring',50:'Marine litter and microplastics',51:'Living coastlines',52:'Ecosystem, harmful algal bloom and microbial modelling',53:'Coastal erosion monitoring',54:'Coastal hazard monitoring and vulnerability assessment',55:'Hazard and disaster prediction',56:'Satellite image processing and analysis',57:'Automated seismic survey data processing',58:'CCTV image processing and analysis',59:'Image-based marine organism detection',60:'Big data infrastructure',61:'Artificial intelligence',62:'Digital site information for offshore wind',63:'Uncrewed surface observation',64:'UAV photogrammetry and airborne LiDAR',65:'Real-time ocean forecasting systems'};
window.GeoSRTechnologyEnglish=techEnglish;
window.siteContentReady=fetch('content.json').then(r=>r.json()).then(data=>{
 window.siteContent=data;
 const groupTarget=document.querySelector('#capability-map-grid');
 if(groupTarget){
  const sourceSolutions=data.solutions||[];
  groupTarget.querySelectorAll('[data-solution-ids]').forEach(group=>{
   const records=group.dataset.solutionIds.split(',').map(id=>sourceSolutions.find(item=>String(item.id)==='solution-'+id)).filter(Boolean);
   group.querySelector('.capability-examples').innerHTML=records.map(item=>{
    const id=String(item.id).replace('solution-','');
    const label=en?(techEnglish[id]||item.title):item.title;
    const detail=tech.some(entry=>entry.id===Number(id));
    const status=detail?T('기술 소개 보기','Open overview'):T('상세 자료 준비 중','Details pending');
    return '<a href="'+U('business',{id})+'" aria-label="'+E(label+' · '+status)+'"><span>'+E(label)+'</span><small>'+status+'</small><i aria-hidden="true">→</i></a>';
   }).join('');
  });
 }
 const detail=document.querySelector('[data-solution-detail]');
 if(detail){
  const id=detail.dataset.solutionDetail;
  const source=data.solutions?.find(item=>String(item.id)==='solution-'+id);
  if(source){
   const categories={'수환경 보전':'Aquatic environment conservation','수환경 건강성 회복':'Aquatic ecosystem recovery','재해예방':'Hazard prevention','스마트 기술':'Smart technology'};
   const titleText=en?(techEnglish[id]||source.title):source.title;
   detail.querySelector('[data-solution-title]').textContent=titleText;
   detail.querySelector('[data-solution-category]').textContent=en?(categories[source.category]||source.category):source.category;
   detail.querySelector('[data-solution-summary]').textContent=en?`Listed in ${categories[source.category]||source.category}. Detailed information follows source review.`:`${source.category} 분야의 기술 목록에 등록된 항목입니다. 상세 내용은 원문 자료를 확인한 뒤 추가합니다`;
   detail.querySelector('[data-solution-status]').textContent=en?'The original index confirms the title and category':'기술명과 분야는 기존 GeoSR 기술 목록에서 확인했습니다';
   applyPageMetadata();
  }
 }
 const target=document.querySelector('#tech-index');
 if(!target)return;
 target.innerHTML=data.solutions.map(x=>{
  const id=String(x.id).replace('solution-','');
  const label=en?(techEnglish[id]||x.title):x.title;
  const detail=tech.some(item=>item.id===Number(id));
  return '<a href="'+U('business',{id:id})+'" data-tech-name="'+E((x.title+' '+(techEnglish[id]||'')).toLocaleLowerCase())+'"><strong>'+E(label)+'</strong><small>'+T(detail?'상세 보기':'상세 소개 준비 중',detail?'Open details':'Details pending')+' <span aria-hidden="true">→</span></small></a>';
 }).join('');
 const input=document.querySelector('#technology-search');
 const status=document.querySelector('#technology-search-status');
 const entries=[...target.querySelectorAll('a')];
 const update=()=>{
  const term=(input?.value||'').trim().toLocaleLowerCase();
  let visible=0;
  entries.forEach(entry=>{
   const match=!term||entry.dataset.techName.includes(term)||entry.textContent.toLocaleLowerCase().includes(term);
   entry.hidden=!match;
   if(match)visible++;
  });
  if(status)status.textContent=T(visible+'개 기술 분야','Showing '+visible+' technology areas');
 };
 input?.addEventListener('input',update);
 update();
}).catch(()=>{
 const status=document.querySelector('#technology-search-status');
 if(status)status.textContent=T('기술 목록을 불러오지 못했습니다. 잠시 뒤 다시 확인해 주세요.','The technology index could not be loaded. Please try again later.');
});

if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.section-heading,.spotlight-grid,.platform-copy,.research-home .records,.closing>div').forEach(el=>{el.classList.add('reveal');observer.observe(el)})}


/* Route-specific expertise story: three linked fields replace the repeated row template. */


/* Editorial archive leads feature a real source record and keep placeholders explicit. */


/* Page-specific launch layouts keep archives searchable and the source status visible. */

function selectedRecordBody(item){
 const record=window.GeoSRRecordDetails?.[item[0]];
 if(!record)return `<div class="article-body"><p>${item[5]?T('화면 구성과 탐색 방식을 보여주는 목업입니다','A mock entry demonstrating the archive layout'):T('기존 홈페이지에서 제목과 게시일을 확인한 자료입니다','The title and posting date follow the existing GeoSR record')}</p><div class="article-pending">${T(item[5]?'실제 게시물이 아닙니다':'본문과 첨부 자료 준비 중',item[5]?'This is not a published article':'Full text and attachments in preparation')}</div></div>`;
 const paragraphs=(en?record.en:record.ko).map(text=>`<p>${E(text)}</p>`).join('');
 const facts=record.facts.map(row=>`<div><dt>${E(T(row[0],row[1]))}</dt><dd>${E(T(row[2],row[3]))}</dd></div>`).join('');
 const sourceLink=record.doi?`<a href="${E(record.doi)}" target="_blank" rel="noopener">${T('논문 보기','Read the paper')} <span aria-hidden="true">↗</span></a>`:'';
 return `<div class="article-body article-body--verified">${paragraphs}<dl class="article-facts">${facts}</dl><div class="article-source-links">${sourceLink}<a href="${E(record.source)}" target="_blank" rel="noopener">${T('기존 홈페이지 원문','Original GeoSR record')} <span aria-hidden="true">↗</span></a></div><p class="article-source-note">${T('기존 홈페이지 원문을 바탕으로 정리한 대표 자료입니다','Selected information from GeoSR’s original record')}</p></div>`;
}

function archive(){
 const news=route==='news',allowed=news?['notice','press','newsletter']:['business','research','academic'];
 const id=P.get('id');
 if(id){
  const item=posts.find(v=>v[0]===id&&allowed.includes(v[1]));
  return `<article class="article"><a class="article-back" href="${U(route,{board:P.get('board')||'all',q:P.get('q')||'',year:P.get('year')||'all',mock:P.get('mock')||''})}">${T('목록으로','Back to records')}</a><p class="eyebrow">${item?T(...types.find(v=>v[0]===item[1]).slice(1)):'NOT FOUND'}</p><h1>${item?E(T(item[3],item[4])):T('자료를 찾을 수 없습니다','Record not found')}</h1>${item?`<div class="article-meta"><span>${item[5]?T('목업','MOCKUP'):T('원문 기반','SOURCE RECORD')}</span><time datetime="${E(item[2])}">${E(item[2])}</time></div>${selectedRecordBody(item)}`:''}</article>`;
 }
 const board=P.get('board')||'all',q=(P.get('q')||'').trim(),year=P.get('year')||'all',includeMocks=P.get('mock')==='1';
 const list=posts.filter(p=>allowed.includes(p[1])&&(includeMocks||!p[5])&&(board==='all'||p[1]===board)&&(year==='all'||p[2].startsWith(year))&&(p[3]+' '+p[4]).toLocaleLowerCase().includes(q.toLocaleLowerCase()));
 const featured=board==='all'&&year==='all'&&!q?posts.find(p=>!p[5]&&p[1]===(news?'notice':'research')):null;
 const visible=featured?list.filter(p=>p!==featured):list;
 const heading=news?T('GeoSR 소식','GeoSR News'):T('연구와 성과','Research & results');
  const lead=news?T('연구와 사업 현장에서 전하는 GeoSR의 소식','News from our research and project teams'):T('현장 조사에서 기술 개발까지<br>GeoSR의 연구와 수행 기록을 살펴보세요','From field studies to technology development<br>Explore selected work at GeoSR');
 const kinds=news?T('공지 · 언론 보도 · 뉴스레터','NOTICES · MEDIA · NEWSLETTERS'):T('사업 · 연구 · 학술','PROJECTS · RESEARCH · PUBLICATIONS');
 const years=[...new Set(posts.filter(p=>allowed.includes(p[1])&&!p[5]&&/^\d{4}/.test(p[2])).map(p=>p[2].slice(0,4)))].sort((a,b)=>b.localeCompare(a));
 const queryState={board,q,year,mock:includeMocks?'1':''};
 const mockToggle=U(route,{board,q,year,...(includeMocks?{}:{mock:'1'})});
 return `<section class="archive-hero archive-hero--${news?'news':'research'}"><div class="archive-hero-copy"><nav class="archive-breadcrumb" aria-label="${T('현재 위치','Breadcrumb')}"><a href="${U('index')}">${T('홈','Home')}</a><span aria-hidden="true">/</span><span>${news?T('소식','News'):T('연구와 성과','Research')}</span></nav><p class="eyebrow">${news?'GEOSR / NEWSROOM':'GEOSR / RESEARCH'}</p><h1>${heading}</h1><p>${lead}</p><div class="archive-hero-index"><span>${kinds}</span><span>${T('자료 찾아보기','BROWSE RECORDS')}</span></div></div>${featured?`<a class="archive-featured" href="${U(route,{id:featured[0],...queryState})}"><span class="archive-featured-label">${T(news?'주요 소식':'주요 연구','FEATURED')}</span><h2>${E(T(featured[3],featured[4]))}</h2><time class="archive-featured-meta" datetime="${E(featured[2])}">${E(featured[2])}</time><span class="archive-featured-link">${T('자세히 보기','View record')} <i aria-hidden="true">→</i></span></a>`:`<div class="archive-filter-state"><span>${T('현재 선택','CURRENT SELECTION')}</span><strong>${E(q)||T(...(types.find(x=>x[0]===board)||['all','전체','All']).slice(1))}</strong><p>${T('아래에서 조건에 맞는 자료를 확인하세요','Review matching records below')}</p></div>`}</section><section class="archive archive--${news?'news':'research'}"><div class="archive-controls"><nav class="filters" role="group" aria-label="${T('자료 유형 선택','Choose a record type')}">${[['all','전체','All'],...types.filter(v=>allowed.includes(v[0]))].map(v=>`<a class="${board===v[0]?'active':''}" ${board===v[0]?'aria-current="page"':''} href="${U(route,{board:v[0],q,year,mock:includeMocks?'1':''})}">${T(v[1],v[2])}</a>`).join('')}</nav><form class="search" action="${route}.html"><input name="lang" type="hidden" value="${L}"><input name="board" type="hidden" value="${E(board)}"><input name="mock" type="hidden" value="${includeMocks?'1':''}"><label for="q">${T('자료 검색','Search records')}</label><div><input id="q" name="q" placeholder="${T('제목을 입력하세요','Enter a title')}" value="${E(q)}"><button type="submit">${T('검색','Search')}</button></div><label class="archive-year-label" for="year-filter">${T('연도','Year')}</label><select id="year-filter" name="year"><option value="all" ${year==='all'?'selected':''}>${T('전체 연도','All years')}</option>${years.map(value=>`<option value="${value}" ${year===value?'selected':''}>${value}</option>`).join('')}</select></form></div><div class="archive-results-heading"><p class="result-count">${T('검색 결과','Results')} <strong>${list.length}</strong> ${T('건','records')}</p><a class="archive-mock-toggle" href="${mockToggle}" aria-pressed="${includeMocks}">${includeMocks?T('목업 항목 숨기기','Hide mock entries'):T('목업 항목 보기','Show mock entries')}</a></div><div class="records">${visible.length?rows(visible):`<div class="empty"><h2>${T('검색 결과가 없습니다','No matching records')}</h2><a href="${U(route)}">${T('검색 조건 지우기','Clear search')}</a></div>`}</div></section>`;
}

function companyPage(){
 const milestones=[
  ['2000.07','수환경연구소 설립','Water Environment Research Institute established'],
  ['2005.02','수로측량업 등록','Hydrographic surveying registration'],
  ['2011.03','해양환경 측정·분석 능력 인증','Marine environment measurement and analysis certification'],
  ['2021.03','해양조사·정보업 등록','Marine survey and information business registration']
 ];
 const chart=en?'organization-2026-en.jpg':'organization-2026-ko.jpg';
 const companyResources=`<details><summary><span>${T('조직 안내','Organisation')}</span><em>${T('2026.04 공개본','APR 2026 SOURCE')}</em><i aria-hidden="true">+</i></summary><div class="company-resource"><figure class="company-resource-chart"><img src="assets/company/${chart}" width="1400" height="632" loading="lazy" alt="${T('2026년 4월 GeoSR 공개 조직도','GeoSR organisation chart published in April 2026')}"><figcaption>${T('2026년 4월 공개 조직도 · 현재 조직과 다를 수 있습니다','Organisation chart published in April 2026; current structure may differ')}</figcaption></figure><div class="company-organization-summary"><p>${T('2026년 4월 공개 조직도는 대표이사, Think Tank 본부, 전략기획실, 경영총괄부와 세 연구 부문을 표시합니다','The April 2026 chart shows the CEO, Think Tank Director, Strategy and Planning Office, Administration and Finance Department, and three divisions')}</p><ul><li><strong>${T('AI·예측 부문','AI & Forecasting Division')}</strong><span>${T('분석연구소 · 예보사업부','Research and Development Institute · Department of Forecast')}</span></li><li><strong>${T('환경·공간융합 부문','Environment & Spatial Convergence Division')}</strong><span>${T('환경화학생태부 · 공간융합부','Environmental Chemistry & Ecology · Spatial Convergence')}</span></li><li><strong>${T('Data & System 부문','Data & System Division')}</strong><span>${T('환경조사부 · 연안관리부 · 공간정보부 · 시스템개발부','Environmental Survey · Coastal Management · Geospatial Information · System Engineering')}</span></li></ul></div><a class="company-resource-link" href="assets/company/${chart}" target="_blank" rel="noopener">${T('조직도 크게 보기','Open full-size chart')} <span aria-hidden="true">↗</span></a></div></details><details><summary><span>${T('회사 소개서','Company profile')}</span><em>${T('국문·영문 PDF','KO / EN PDF')}</em><i aria-hidden="true">+</i></summary><div class="company-resource"><p>${T('기존 GeoSR 홈페이지에 공개된 2025년 6월 소개서입니다','Company profiles published on the previous GeoSR site in June 2025')}</p><div class="company-resource-links"><a href="assets/company/geosr-profile-ko-2025.pdf" download>${T('국문 소개서 PDF','Korean profile PDF')} <small>13.6 MB</small><span aria-hidden="true">↓</span></a><a href="assets/company/geosr-profile-en-2025.pdf" download>${T('영문 소개서 PDF','English profile PDF')} <small>12.6 MB</small><span aria-hidden="true">↓</span></a></div></div></details>`;
 const offices=[['군포 본사','Gunpo head office','경기도 군포시 엘에스로 172<br>한림휴먼타워 306호','306 Hanlim Human Tower<br>172 LS-ro, Gunpo-si, Gyeonggi-do'],['부산 사무소','Busan office','부산광역시 해운대구 세실로69번길 24 5층','5F, 24 Sesil-ro 69beon-gil<br>Haeundae-gu, Busan']];
 const fullLibrary=`<div class="credential-library-full" aria-labelledby="credential-library-heading"><div class="credential-library-full-heading"><div><p class="eyebrow">DOCUMENT LIBRARY</p><h2 id="credential-library-heading">${T('인증·면허·지식재산권','Credentials and intellectual property')}</h2></div><div class="credential-library-full-tools"><label for="credential-query">${T('자료 검색','Search documents')}</label><input id="credential-query" type="search" placeholder="${T('자료명을 입력하세요','Search by title')}"><p class="library-count" role="status" aria-live="polite">${T('자료를 불러오는 중','Loading records')}</p></div></div><nav class="credential-category-tabs" aria-label="${T('자료 분류','Document categories')}"><button type="button" data-credential-category="all" aria-pressed="true">${T('전체','All')}</button><button type="button" data-credential-category="cert" aria-pressed="false">${T('인증','Certification')}</button><button type="button" data-credential-category="license" aria-pressed="false">${T('면허·등록','Registration')}</button><button type="button" data-credential-category="patent" aria-pressed="false">${T('지식재산권','Intellectual property')}</button></nav><div class="credential-grid" aria-live="polite"></div></div>`;
 const companyFieldLinks=[U('business',{axis:0}),U('business',{axis:1}),U('business',{id:61}),U('business',{axis:2}),U('business',{axis:4}),U('business',{axis:4})];
 const fieldMedia=[homeFields[0],homeFields[2],homeFields[3],homeFields[1],homeFields[3],{image:'platform-geodap.png',altK:'GeoDAP 서비스 화면',altE:'GeoDAP service interface',noteK:'GeoDAP 실제 화면 캡처',noteE:'ACTUAL GEODAP INTERFACE'}];
 const fieldLabels=[
  [['조사 영역','COVERAGE'],['관측 항목','OBSERVATIONS'],['확보 자료','OUTPUT']],
  [['모델 범위','COVERAGE'],['연계 방법','METHOD'],['연구 목적','PURPOSE']],
  [['입력 자료','INPUT'],['연구 방법','METHOD'],['적용 대상','APPLICATION']],
  [['분석 대상','SAMPLES'],['수행 방법','METHOD'],['평가 목적','PURPOSE']],
  [['입력 자료','INPUT'],['수행 방법','METHOD'],['활용 분야','APPLICATION']],
  [['통합 자료','SOURCES'],['주요 기능','FUNCTIONS'],['활용 분야','APPLICATION']]
 ];
 const fieldFacts=[
 [['육상·하천·해양','Land, rivers and oceans'],['수심·지형·조석·해류·파랑','Bathymetry, terrain, tides, currents and waves'],['현장 관측자료 확보','Field observation data']],
 [['기상·유역·하천·해양','Atmosphere, catchments, rivers and oceans'],['수치모델 연계','Linked numerical models'],['수환경 변화 분석·예측','Analysis and forecasting of aquatic change']],
 [['해양 관측·위성 자료','Marine observations and satellite data'],['AI 예측·해상도 개선','AI forecasting and resolution enhancement'],['수온·해수위·위성 영상','Temperature, sea level and satellite imagery']],
 [['수질·퇴적물·생태','Water, sediment and ecosystems'],['화학 분석·생태 조사','Chemical analysis and ecological surveys'],['해양 환경 상태 평가','Marine environmental assessment']],
 [['위성·영상 자료','Satellite and image data'],['영상 처리·정보 분석','Image processing and analysis'],['해양 환경 모니터링','Marine environment monitoring']],
 [['관측·모델·위성 자료','Observation, model and satellite data'],['자료 통합·지도 조회','Data integration and map exploration'],['환경자료 탐색·분석','Environmental data exploration and analysis']]
 ];
 const expertiseSection=`<section class="company-science" id="company-fields" data-company-atlas aria-labelledby="company-science-title"><div class="company-science-heading"><div><p class="eyebrow">GEOSR / RESEARCH CAPABILITIES</p><h2 id="company-science-title">${T('관측부터 해석까지<br>연구를 연결합니다','Connecting observation<br>and understanding')}</h2></div><p>${T('현장 조사와 실험 분석<br>수치모델과 AI를 아우르는 전문 분야','From field surveys and laboratory analysis<br>to numerical models and AI')}</p></div><label class="company-science-select">${T('전문 분야 선택','Choose a discipline')}<select data-company-field-select>${disciplines.map((d,i)=>`<option value="${i}">${T(d[2],d[1])}</option>`).join('')}</select></label><div class="company-science-workspace"><nav class="company-science-nav" role="tablist" aria-orientation="vertical" aria-label="${T('전문 분야','Research capabilities')}">${disciplines.map((d,i)=>`<button id="company-science-tab-${i}" role="tab" type="button" data-company-field="${i}" aria-selected="${i===0}" aria-controls="company-science-panel-${i}" tabindex="${i===0?0:-1}"><span>0${i+1}</span><strong>${T(d[0],d[1])}</strong></button>`).join('')}</nav><div class="company-science-panels">${disciplines.map((d,i)=>`<section id="company-science-panel-${i}" class="company-science-panel" role="tabpanel" aria-labelledby="company-science-tab-${i}" data-company-panel="${i}" ${i?'hidden':''}><figure class="company-science-media" ${i===5?'data-actual="true"':''}><img src="assets/${fieldMedia[i].image}" alt="${E(T(fieldMedia[i].altK,fieldMedia[i].altE))}" loading="lazy"><figcaption>${T(fieldMedia[i].noteK,fieldMedia[i].noteE)}</figcaption></figure><div class="company-science-copy"><span class="company-science-index">0${i+1} / RESEARCH FIELD</span><h3>${T(d[2],d[1])}</h3><p>${T(d[4],d[5])}</p><details class="company-science-facts" data-responsive-disclosure open><summary>${T('연구 내용 살펴보기','Explore the research')}<span aria-hidden="true">+</span></summary><dl>${fieldFacts[i].map((f,k)=>`<div><dt>${T(...fieldLabels[i][k])}</dt><dd>${T(...f)}</dd></div>`).join('')}</dl></details><a href="${companyFieldLinks[i]}">${T('관련 기술 살펴보기','Explore related technologies')} <span aria-hidden="true">↗</span></a></div></section>`).join('')}</div></div></section>`;

 return `<section class="company-hero company-hero--story" id="company-overview"><figure class="company-story-media" data-film-slot="company-overview"><img src="assets/concepts/reviewed-20260922/cf10-chemistry-wide-v1.png" width="1672" height="941" alt="${T('환경 시료 분석을 표현한 실험실 콘셉트 이미지','Laboratory concept illustrating environmental sample analysis')}" fetchpriority="high"><figcaption>${T('실험실 콘셉트 이미지 · 회사 소개 영상 제작 중','LABORATORY CONCEPT · COMPANY FILM IN PRODUCTION')}</figcaption></figure><div class="company-hero-copy"><p class="eyebrow">GEOSYSTEM RESEARCH / ABOUT US</p><h1>${T('해양과 환경의 변화를<br>연구합니다','Understanding change<br>in our environment')}</h1><p>${T('지오시스템리서치는 현장 조사와 실험 분석<br>수치모델과 AI를 통해 해양·환경 문제를 연구합니다','GeoSystem Research brings together field surveys, laboratory analysis, numerical modelling and AI')}</p><a href="#company-fields">${T('GeoSR의 전문 분야','Our areas of expertise')} <span aria-hidden="true">↓</span></a></div><span class="company-hero-signature" aria-hidden="true">GeoSR</span></section><nav class="company-anchor-nav" aria-label="${T('회사 소개 항목','Company information')}">${[['company-overview','회사 개요','Overview'],['company-fields','전문 분야','Expertise'],['company-records','연혁과 회사 자료','History and information'],['credential-library','인증·면허·지식재산권','Credentials'],['locations','사업장 안내','Locations']].map(x=>`<a href="#${x[0]}">${T(x[1],x[2])}</a>`).join('')}</nav>${expertiseSection}<section class="company-records section" id="company-records"><div class="section-heading"><div><p class="eyebrow">COMPANY INFORMATION</p><h2>${T('연혁과 회사 자료','History and company records')}</h2></div><p>${T('GeoSR 홈페이지의 회사 소개 자료 기준','Based on company information published by GeoSR')}</p></div><details class="company-history-disclosure" data-responsive-disclosure open><summary>${T('주요 연혁','Milestones')}<span aria-hidden="true">+</span></summary><div class="company-timeline" aria-label="${T('GeoSR 주요 연혁','GeoSR milestones')}">${milestones.map(x=>`<article data-company-year><time datetime="${x[0].replace('.','-')}">${x[0]}</time><h3>${T(x[1],x[2])}</h3></article>`).join('')}</div></details><div class="company-record-accordion">${companyResources}</div></section>${credentialDialog()}<section id="credential-library" aria-label="${T('인증·면허·지식재산권 자료','Credentials and intellectual property')}">${fullLibrary}</section><section class="company-locations section" id="locations"><div class="section-heading"><div><p class="eyebrow">OFFICES</p><h2>${T('사업장 안내','Our offices')}</h2></div><a href="${U('contact')}" class="plain-arrow">${T('문의하기','Contact')} <span aria-hidden="true">→</span></a></div><div>${offices.map((x,i)=>`<article><small>0${i+1}</small><h3>${T(x[0],x[1])}</h3><p>${T(x[2],x[3])}</p></article>`).join('')}</div></section>`;
}

function equipment(){
 const category=P.get('category')||'all',rawQuery=(P.get('q')||'').trim(),query=rawQuery.toLocaleLowerCase();
 const groups=[{id:'survey',nameK:'현장 조사',nameE:'Field'},{id:'lab',nameK:'실험실',nameE:'Lab'},{id:'vessel',nameK:'조사선·무인체',nameE:'Vessel / USV'}];
 const selected=P.has('id')?eq.find(item=>item[0]===P.get('id')):null;
 if(P.has('id')){
  if(!selected)return `<section class="equipment-detail"><a class="equipment-detail-back" href="${U('equipment',{category})}">${T('장비 목록으로','Back to equipment')}</a><div class="empty"><h1>${T('장비 자료를 찾을 수 없습니다','Equipment record not found')}</h1></div></section>`;
  const selectedGroup=groups.find(group=>group.id===selected[1]);
  const selectedAlt=selected[0]==='63'?T('기존 GeoSR 홈페이지에 소개된 무인선 관측 사진', 'Uncrewed vessel observation photo from the existing GeoSR website'):T(selected[2]+' 소개 이미지',selected[3]+' source image');
  return `<article class="equipment-detail"><a class="equipment-detail-back" href="${U('equipment',{category:selected[1]})}">${T('장비 목록으로','Back to equipment')}</a><div class="equipment-detail-layout"><figure class="equipment-detail-media"><img src="assets/${E(selected[5])}" alt="${E(selectedAlt)}" width="1600" height="900"><figcaption>${T(selected[0]==='63'?'GeoSR 무인선 관측 사진':'GeoSR 장비 소개 자료',selected[0]==='63'?'GeoSR uncrewed vessel observation photo':'GeoSR equipment reference')}</figcaption></figure><div class="equipment-detail-copy"><p class="eyebrow">${T(selectedGroup.nameK,selectedGroup.nameE)}</p><h1>${T(selected[2],selected[3])}</h1>${selected[4]?`<p>${T(selected[1]==='vessel'?'선박·관측 정보':'모델명',selected[1]==='vessel'?'Vessel / observation':'Model')}: <strong>${E(en&&selected[0]==='1938'?'19-ton survey vessel':selected[4])}</strong></p>`:''}<p>${T('원문에서 확인한 항목명과 모델 정보만 표시합니다','Only the item name and model information found in the source are shown')}</p></div></div></article>`;
 }
 const items=eq.filter(item=>(category==='all'||item[1]===category)&&item.slice(2,5).join(' ').toLocaleLowerCase().includes(query));
 const filters=[['all','전체','All'],['survey','현장 조사','Field'],['lab','실험실','Lab'],['vessel','조사선·무인체','Vessel / USV']].map(v=>`<a class="${category===v[0]?'active':''}" ${category===v[0]?'aria-current="page"':''} href="${U('equipment',{category:v[0],q:rawQuery})}">${T(v[1],v[2])}</a>`).join('');
 const cards=items.map(item=>{const group=groups.find(value=>value.id===item[1]);const alt=item[0]==='63'?T('기존 GeoSR 홈페이지에 소개된 무인선 관측 사진','Uncrewed vessel observation photo from the existing GeoSR website'):T(item[2]+' 소개 이미지',item[3]+' source image');return `<article class="equipment-card" data-equipment-kind="${item[1]}"><a class="equipment-card-open" href="${U('equipment',{id:item[0],category:item[1]})}" aria-label="${E(T(item[2]+' 상세 보기', 'View details: '+item[3]))}"><figure class="equipment-card-media"><img src="assets/${E(item[5])}" alt="${E(alt)}" loading="lazy" decoding="async"><figcaption>${T(item[0]==='63'?'GeoSR 무인선 관측 사진':'GeoSR 장비 소개 자료',item[0]==='63'?'GeoSR uncrewed vessel observation photo':'GeoSR equipment reference')}</figcaption></figure><div class="equipment-card-copy"><span class="equipment-card-category">${T(group.nameK,group.nameE)}</span><h2>${T(item[2],item[3])}</h2>${item[4]?`<p class="equipment-card-model">${E(en&&item[0]==='1938'?'19-ton survey vessel':item[4])}</p>`:''}<span class="equipment-open-label">${T('장비 살펴보기','Explore equipment')} <span aria-hidden="true">→</span></span></div></a></article>`}).join('');
 return `<section class="equipment-hero"><div><p class="eyebrow">FIELD / LAB / VESSEL</p><h1>${T('관측·분석 장비','Observation and analysis equipment')}</h1><p>${T('현장 조사와 실험 분석에 활용하는 주요 장비를 소개합니다','Selected equipment used in field surveys and laboratory work')}</p></div></section><section class="equipment-browser"><div class="equipment-toolbar"><nav class="filters" role="group" aria-label="${T('장비 분야','Equipment categories')}">${filters}</nav><form class="search" action="equipment.html"><input type="hidden" name="lang" value="${L}"><input type="hidden" name="category" value="${E(category)}"><label for="equipment-query">${T('장비 검색','Search equipment')}</label><div><input id="equipment-query" name="q" value="${E(rawQuery)}" placeholder="${T('장비명이나 모델을 입력하세요','Search by name or model')}"><button type="submit">${T('검색','Search')}</button></div></form></div><p class="equipment-result-count">${T('주요 장비','Selected equipment')} ${items.length}</p><div class="equipment-grid">${cards||`<div class="empty"><h2>${T('조건에 맞는 항목이 없습니다','No matching items')}</h2><a href="${U('equipment',{category:'all'})}">${T('검색 조건 초기화','Clear filters')}</a></div>`}</div></section>`;
}
function contact(){
 return '<section class="contact-hero"><div><p class="eyebrow">CONTACT / GEOSR</p><h1>'+T('사업·기술 문의','Let’s work together')+'</h1><p>'+T('사업 상담과 기술·연구 협력을 위한 연락처입니다','Contact us about business, technical or research collaboration')+'</p></div></section>'+
 '<section class="contact-main"><div class="contact-office"><div class="contact-direct"><span class="eyebrow">DIRECT CONTACT</span><a class="contact-email" href="mailto:admin@geosr.com">admin@geosr.com</a><a href="tel:+823151805700">+82 31 5180 5700</a></div><div class="contact-office-grid"><article class="contact-office-card"><span class="eyebrow">GUNPO / HEAD OFFICE</span><h2>'+T('군포 본사','Gunpo head office')+'</h2><address>'+T('경기도 군포시 엘에스로 172<br>한림휴먼타워 306호','306 Hanlim Human Tower<br>172 LS-ro, Gunpo-si, Gyeonggi-do')+'</address><a href="https://maps.google.com/?q=172+LS-ro,+Gunpo-si,+Gyeonggi-do" target="_blank" rel="noopener">'+T('지도에서 위치 보기','View on map')+' ↗</a></article><article class="contact-office-card"><span class="eyebrow">BUSAN OFFICE</span><h2>'+T('부산 사무소','Busan office')+'</h2><address>'+T('부산광역시 해운대구 세실로69번길 24 5층','5F, 24 Sesil-ro 69beon-gil, Haeundae-gu, Busan')+'</address><a href="https://maps.google.com/?q=24+Sesil-ro+69beon-gil,+Haeundae-gu,+Busan" target="_blank" rel="noopener">'+T('지도에서 위치 보기','View on map')+' ↗</a></article></div></div>'+
 '<form id="enquiry" class="contact-form" data-mailto-preview><div class="contact-form-heading"><p class="eyebrow">ENQUIRY FORM</p><h2>'+T('문의 내용을 남겨 주세요','How can we help?')+'</h2><p>'+T('이메일 앱에서 내용을 확인한 뒤 보내 주세요','Review the message in your email app before sending')+'</p></div><label>'+T('문의 분야','Enquiry type')+'<select name="type"><option>'+T('기술 협력','Technical collaboration')+'</option><option>'+T('사업 상담','Project enquiry')+'</option><option>'+T('연구 협력','Research collaboration')+'</option><option>'+T('기타','Other')+'</option></select></label><div class="contact-form-pair"><label>'+T('이름','Name')+'<input name="name" autocomplete="name" required></label><label>'+T('회사·기관','Organisation')+'<input name="organization" autocomplete="organization"></label></div><label>'+T('이메일','Email')+'<input type="email" name="email" autocomplete="email" required></label><label>'+T('문의 내용','Message')+'<textarea name="message" rows="5" required></textarea></label><button type="submit">'+T('메일 작성하기','Compose email')+'</button><p role="status" id="form-status" aria-live="polite"></p></form></section>';
}

/* Current Business presentation: five source-backed areas and the complete 21-item index. */
function business(){
 const id=Number(P.get('id'));
 if(P.has('id')){
  const item=tech.find(record=>record.id===id);
  const titleText=item?T(item.k,item.e):T('기술 자료','Technology record');
  const summary=item?T(item.dk,item.de):T('원문 기술명과 분야 정보를 불러옵니다','Loading the source technology title and category');
  const media=item&&item.id===63
   ?`<figure class="technology-detail-media"><img src="assets/equipment-usv-original.png" alt="${T('기존 GeoSR 홈페이지에 소개된 무인선 관측 사진','Uncrewed vessel observation photo from the existing GeoSR website')}" width="1771" height="1068"><figcaption>${T('GeoSR 무인선 관측 사진','GeoSR uncrewed vessel observation photo')}</figcaption></figure>`
   :`<div class="technology-detail-media technology-detail-media--text" aria-label="${E(titleText)}"><span>${E(item?T('기술 분야','TECHNOLOGY AREA'):T('기술 자료','TECHNOLOGY RECORD'))}</span><strong>${E(titleText)}</strong><small>${T('분야 영상 준비 중','FIELD FILM IN PREPARATION')}</small></div>`;
  return `<article class="technology-detail" data-solution-detail="${id}" aria-labelledby="technology-detail-title"><a class="article-back" href="${U('business')}">${T('기술 분야 전체 보기','Back to expertise')}</a><div class="technology-detail-heading"><p class="eyebrow">GEOSR / EXPERTISE</p><h1 id="technology-detail-title" data-solution-title>${E(titleText)}</h1><p class="technology-detail-category" data-solution-category>${item?T('주요 기술','Selected technology'):T('기술 자료','Technology record')}</p></div><div class="technology-detail-layout">${media}<div class="technology-detail-copy"><p class="eyebrow">OVERVIEW</p><p class="technology-detail-summary" data-solution-summary>${E(summary)}</p><p class="technology-detail-status" data-solution-status>${item?T('기술 설명은 확인된 원문을 기준으로 추가합니다','Further technical detail will follow the verified source'):T('상세 내용은 원문을 확인한 뒤 추가합니다','Further detail will follow source review')}</p><a href="${U('equipment',{category:'all'})}" class="plain-arrow">${T('관측·분석 장비 보기','Browse observation equipment')} <span aria-hidden="true">→</span></a></div></div><section class="technology-detail-resources"><h2>${T('GeoSR 연구와 성과','More from GeoSR Research')}</h2><div class="records">${rows(posts.filter(post=>!post[5]&&['business','research','academic'].includes(post[1])).slice(0,3))}</div></section></article>`;
 }
 const axes=['조사와 관측','수환경 모델과 평가','연안 생태와 환경','연안 재해와 예측','위성·영상과 공간정보'];
 const axesEnglish=['Survey and observation','Aquatic models and assessment','Coastal ecology and environment','Coastal hazards and forecasting','Satellite, imagery and spatial data'];
 const initialAxis=Math.max(0,Math.min(businessGroups.length-1,Number(P.get('axis'))||0));
 const groupShell=businessGroups.map((group,index)=>`<button type="button" class="capability-axis" id="capability-tab-${index}" data-capability-axis="${index}" data-solution-ids="${group.ids.join(',')}" data-axis-summary="${E(T(group.bodyK,group.bodyE))}" aria-controls="capability-detail" aria-pressed="${index===initialAxis}" tabindex="${index===initialAxis?0:-1}"><span class="capability-axis-number">0${index+1}</span><span class="capability-axis-name">${T(axes[index],axesEnglish[index])}</span></button>`).join('');
 return `<section class="capability-explorer business-atlas" data-capability-root data-initial-axis="${initialAxis}" aria-labelledby="business-title"><div class="capability-intro"><p class="eyebrow">GEOSR / EXPERTISE</p><h1 id="business-title">${T('현장을 관측하고<br>변화를 해석합니다','Observe the environment<br>Understand its change')}</h1><p>${T('해양·하천 조사부터 환경 분석과 재해 예측까지<br>관측과 분석을 바탕으로 현장의 과제를 연구합니다','Explore GeoSR work in field surveys, environmental analysis, numerical modelling and spatial data')}</p></div><div class="capability-workspace"><nav class="capability-axis-rail" role="tablist" aria-orientation="horizontal" aria-label="${T('기술 분야 선택','Select a technology area')}">${groupShell}</nav><div class="capability-selected-media" role="img" aria-label="${T(axes[initialAxis],axesEnglish[initialAxis])}"><span>${T('분야 영상 준비 중','FIELD FILM IN PREPARATION')}</span></div><section class="capability-detail" id="capability-detail" role="tabpanel" aria-labelledby="capability-tab-${initialAxis}" aria-live="polite"><span class="capability-detail-number" data-capability-number>0${initialAxis+1} / 05</span><h2 data-capability-title>${T(axes[initialAxis],axesEnglish[initialAxis])}</h2><p data-capability-summary>${T(businessGroups[initialAxis].bodyK,businessGroups[initialAxis].bodyE)}</p><nav class="capability-related-links" data-capability-links aria-label="${T('관련 기술 링크','Related technology links')}"></nav><p class="capability-source-note">${T('기술명은 기존 GeoSR 기술 목록에서 확인했습니다','Technology titles follow the existing GeoSR index')}</p></section></div><details class="technology-index"><summary>${T('전체 기술 목록 찾아보기','Browse all technologies')}</summary><div class="technology-index-tools"><label for="technology-search">${T('기술명 검색','Search technologies')}</label><input id="technology-search" type="search" placeholder="${T('기술명을 입력하세요','Enter a technology name')}"><p id="technology-search-status" role="status" aria-live="polite">${T('기술 목록을 불러오는 중','Loading technology index')}</p></div><div id="tech-index" class="technology-index-list"></div></details></section>`;
}
