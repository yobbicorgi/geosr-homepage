const P=new URLSearchParams(location.search),en=P.get('lang')==='en',L=en?'en':'ko';
const T=(k,e)=>String((en?e:k)??''),E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const U=(p,o={})=>`${p}.html?${new URLSearchParams({...o,lang:L})}`;
const route=location.pathname.split('/').pop().replace('.html','')||'index';
const nav=[['company','회사 소개','About GeoSR'],['news','소식','News'],['research','연구개발','Research'],['business','사업 분야','Expertise'],['ax-platform','AX Platform','AX Platform']];
const A=(href,k,e,cl='link')=>{const external=/^https?:\/\//.test(href),contextual=/plain-arrow|ink-link|field-link|pill-link/.test(cl),icon=external?'↗':contextual?'→':'';return `<a class="${cl}" href="${href}"${external?' target="_blank" rel="noopener"':''}>${T(k,e)}${icon?` <span aria-hidden="true">${icon}</span>`:''}</a>`};
const img=(src,alt,concept=false,cl='')=>`<figure class="visual ${cl}"><img src="assets/${src}" alt="${E(alt)}" loading="lazy">${concept?`<figcaption>${T('영상 가안 · IMAGEGEN','FILM CONCEPT · IMAGEGEN')}</figcaption>`:''}</figure>`;
const filmSlot=(id,label,description='')=>`<figure class="visual route-film-frame" data-production-slot="${E(id)}" data-film-slot="${E(id)}" aria-label="${E(label)}"><div class="route-film-fallback"><span>${T('영상 자료 준비 중','VIDEO ASSET IN PREPARATION')}</span><strong>${E(label)}</strong>${description?`<p>${E(description)}</p>`:''}</div></figure>`;
const tech=[{id:46,k:'수환경 통합모델링',e:'Integrated aquatic modelling',image:null,dk:'관측 자료와 환경 조건을 바탕으로 수환경 변화를 수치모델로 분석합니다',de:'Use numerical models and observations to examine change in aquatic environments.'},{id:63,k:'무인선 이용 관측',e:'Uncrewed surface observation',image:'equipment-usv-original.png',source:true,dk:'무인선으로 현장 관측 자료를 수집합니다',de:'Collect field observations with an uncrewed surface vessel.'},{id:61,k:'인공지능 활용기술',e:'Artificial intelligence',image:null,dk:'환경 자료의 패턴을 분석하는 인공지능 기술을 연구합니다',de:'Research AI methods for analysing patterns in environmental data.'}];
const types=[['business','사업','Projects'],['research','연구','Research'],['academic','학술','Publications'],['notice','공지','Notices'],['press','언론','Media'],['newsletter','뉴스레터','Newsletters']];
const posts=[['business-1994','business','2024-12-09','연안침식 정밀조사 용역','Detailed coastal erosion survey'],['research-3059','research','2026-04-08','한국형 연안재해 발생요인 예측기술 개발','Prediction technology for coastal hazard drivers in Korea'],['academic-3093','academic','2026-09-09','Establishment of the Erosion Control Line from Long-Term Beach Survey Data on the Macro-Tidal Coast','Establishment of the Erosion Control Line from Long-Term Beach Survey Data on the Macro-Tidal Coast'],['notice-3091','notice','2026-08-20','해양수산 신기술 인증','Marine and fisheries new technology certification'],['press-1440','press','2022-03-25','ICT로 먹이 주고 양식장 관리… “바다가 미래” 6000명 발길','ICT-powered aquaculture: “The ocean is the future”']];
const businessGroups=window.GeoSRBusinessAreas;
types.forEach(([id,k,e])=>posts.push([`mock-${id}`,id,'—',`${k} 게시물`,`${e} article placeholder`,true]));
function navigationGroups(){return [
 {route:'company',label:T('회사 소개','About GeoSR'),href:U('company'),items:[['company-overview','기업 개요','Overview'],['greeting','인사말','CEO message'],['principles','목표와 사명','Mission and vision'],['company-records','연혁','History'],['organization','조직 안내','Organisation'],['credentials','인증·면허','Credentials'],['identity','CI','Identity'],['locations','사업장 안내','Locations']].map(([id,k,e])=>[U('company')+'#'+id,T(k,e)]).concat([[U('careers'),T('채용','Careers')]])},
 {route:'news',label:T('소식','News'),href:U('news'),items:[['notice','공지사항','Notices'],['press','언론 보도','Press']].map(([board,k,e])=>[U('news',{board}),T(k,e)])},
 {route:'research',label:T('연구개발','Research'),href:U('research'),items:[['research','연구개발','Research'],['business','사업 실적','Project records'],['academic','학술 논문','Publications']].map(([board,k,e])=>[U('research',{board}),T(k,e)])},
 {route:'business',label:T('사업 분야','Expertise'),href:U('business'),items:businessGroups.map((g,i)=>[U('business',{axis:i}),T(g.k,g.e)]).concat([[U('equipment'),T('보유 장비','Equipment')]])},
 {route:'ax-platform',label:'AX Platform',href:U('ax-platform'),arrow:true,items:[[U('ax-platform'),T('플랫폼 살펴보기','Explore platforms')],[U('contact',{type:'AX Platform'}),T('플랫폼 문의','Platform enquiries')]]},
 {route:'geodap',label:'GeoDAP',href:'https://www.geo-dap.com/',external:true,arrow:true,items:[['https://www.geo-dap.com/',T('GeoDAP 바로가기','Visit GeoDAP')],[U('index')+'#geodap',T('서비스 소개','Service overview')]]}
]}
function head(){return `<a class="skip" href="#main">${T('본문으로 이동','Skip to content')}</a><header class="site-header ${route==='index'?'':'solid'}"><a class="brand" href="${U('index')}" aria-label="${T('GeoSR 홈','GeoSR home')}"><img src="assets/logo.png" alt="GeoSR" width="170" height="52"></a><nav id="primary-navigation" aria-label="${T('주 메뉴','Main navigation')}">${navigationGroups().map(g=>`<div class="nav-group" data-nav-group="${g.route}"><div class="nav-group-heading"><a class="nav-main" aria-controls="nav-sub-${g.route}" aria-expanded="false" href="${g.href}" ${(route===g.route||(g.route==='company'&&route==='careers'))?'aria-current="page"':''}${g.external?' target="_blank" rel="noopener"':''}>${g.label}${g.arrow?' <span aria-hidden="true">↗</span>':''}</a><button class="nav-expand" type="button" aria-controls="nav-sub-${g.route}" aria-expanded="false" aria-label="${E(g.label+T(' 메뉴 펼치기',' submenu'))}"><span aria-hidden="true"></span></button></div><div id="nav-sub-${g.route}" class="nav-sub" aria-hidden="true">${g.items.map(([href,label])=>`<a href="${href}"${/^https:/.test(href)?' target="_blank" rel="noopener"':''}>${label}</a>`).join('')}</div></div>`).join('')}</nav><div class="header-actions"><button id="language" aria-label="${en?'Switch to Korean':'영어로 전환'}">${T('EN','KR')}</button><a href="${U('contact')}" class="contact-link">${T('문의하기','Contact')}</a><button id="menu" aria-controls="primary-navigation" aria-expanded="false" aria-label="${T('메뉴 열기','Open menu')}"><i aria-hidden="true"></i><i aria-hidden="true"></i></button></div></header>`}
function foot(){return `${route==='contact'?'':`<section class="corporate-enquiry" aria-labelledby="enquiry-heading"><div><span>CONTACT</span><h2 id="enquiry-heading">${T('사업 및 기술 문의','Business and technical enquiries')}</h2></div><a href="${U('contact')}">${T('문의하기','Get in touch')}</a></section>`}
<footer class="corporate-footer">
 <div class="corporate-footer-main">
  <div class="corporate-footer-identity"><a class="brand" href="${U('index')}" aria-label="${T('GeoSR 홈','GeoSR home')}"><img src="assets/logo.png" alt="GeoSR" width="156" height="48" loading="lazy"></a><address><strong>${T('주식회사 지오시스템리서치','GeoSystem Research Corporation')}</strong><span>${T('경기도 군포시 엘에스로 172','172 LS-ro Gunpo-si Korea')}<br>${T('한림휴먼타워 306호','306 Hanlim Human Tower')}</span></address><div class="corporate-footer-contact"><a href="tel:+823151805700">${T('031-5180-5700','+82 31 5180 5700')}</a><a href="mailto:admin@geosr.com">admin@geosr.com</a><a class="corporate-footer-location" href="${U('company')}#locations">${T('사업장 안내','Locations')} <span aria-hidden="true">→</span></a></div></div>
  <nav class="corporate-footer-links" aria-label="${T('하단 메뉴','Footer navigation')}">${navigationGroups().map(g=>`<div class="corporate-footer-group"><div class="corporate-footer-heading"><a href="${g.href}"${g.external?' target="_blank" rel="noopener"':''}>${g.label}${g.external?' <span aria-hidden="true">↗</span>':''}</a><button type="button" class="corporate-footer-expand" aria-expanded="false" aria-controls="footer-sub-${g.route}" aria-label="${E(g.label+T(' 하위 메뉴',' submenu'))}"><span aria-hidden="true"></span></button></div><div class="corporate-footer-sub" id="footer-sub-${g.route}">${g.items.map(([href,label])=>`<a href="${href}"${/^https:/.test(href)?' target="_blank" rel="noopener"':''}>${label}</a>`).join('')}</div></div>`).join('')}</nav>
 </div>
 <div class="corporate-footer-bottom"><span>© ${new Date().getFullYear()} GeoSystem Research Corporation</span><div class="corporate-footer-legal"><a href="${U('privacy')}">${T('개인정보 처리방침','Privacy policy')}</a><a href="${U('careers')}">${T('채용','Careers')}</a><a href="${U('contact')}">${T('문의하기','Contact')}</a><a href="#main">${T('맨 위로','Back to top')} <span aria-hidden="true">↑</span></a></div></div>
</footer>`}

function title(n,k,e,dk='',de=''){return `<section class="page-title page-title--${route}${P.has('id')?' page-title--detail':''}"><p class="eyebrow">${n}</p><h1>${T(k,e)}</h1><p>${T(dk,de)}</p></section>`}
function rows(items){return items.map(p=>`<a class="record ${p[5]?'mock-record':''}" href="${U(['notice','press','newsletter'].includes(p[1])?'news':'research',{id:p[0],board:P.get('board')||'all',q:P.get('q')||'',year:P.get('year')||'',mock:P.get('mock')||''})}"><span class="record-type">${T(...types.find(x=>x[0]===p[1]).slice(1))}</span><h3>${E(T(p[3],p[4]))}<small class="record-status">${p[5]?T('목업','MOCKUP'):T('원문 기반','SOURCE RECORD')}</small></h3><time>${p[2]}</time><span aria-hidden="true">→</span></a>`).join('')}


const eq=[['1937','survey','원격조종 수중로봇(ROV)','Remotely operated underwater vehicle (ROV)','BlueROV2','equipment-rov.png'],['1176','lab','유도결합플라즈마 질량분석기','Inductively coupled plasma mass spectrometer','ICP-MS · iCAP-RQ','equipment-icp.png'],['1938','vessel','해누리호','Haenuri survey vessel','19톤 조사선','equipment-vessel.jpg'],['63','vessel','무인선 이용 관측','Uncrewed surface observation','','equipment-usv-original.png']];


const metadataConfig={
 "index":{"title":["지오시스템리서치","GeoSystem Research"],"description":["지오시스템리서치는 해양과 내륙의 수환경을 조사하고 분석하며 공간정보·인공지능·수치모델 기술을 연구합니다","GeoSystem Research develops observation, analysis, modelling and forecasting capabilities for marine and environmental work."]},
 "business":{"title":["기술과 솔루션","Expertise"],"description":["현장 관측부터 환경 분석과 공간정보 활용까지, GeoSR의 기술 분야를 살펴봅니다.","Explore GeoSR capabilities in field observation, environmental analysis, modelling, AI and spatial information."]},
 "research":{"title":["연구개발 및 주요 수행실적","Research and project records"],"description":["GeoSR의 연구개발, 주요 사업 실적과 학술 자료를 찾아볼 수 있습니다.","Browse GeoSR research, project records and academic publications."]},
 "news":{"title":["GeoSR 소식","GeoSR News"],"description":["GeoSR 공지와 언론 보도를 확인할 수 있습니다","Read company announcements and media coverage from GeoSR"]},
 "source-archive":{"title":["자료실","Records"],"description":["지오시스템리서치의 사업·연구·학술·회사 자료를 검색할 수 있습니다.","Search GeoSR company, project, research, publication and equipment records."]},
 "careers":{"title":["채용","Careers"],"description":["지오시스템리서치의 모집 분야와 근무 조건 및 복리후생을 안내합니다","Recruitment areas working conditions and employee benefits at GeoSR"]},
 "privacy":{"title":["개인정보 처리방침","Privacy policy"],"description":["지오시스템리서치 개인정보 처리방침","GeoSR privacy policy"]},
 "company":{"title":["GeoSR 소개","About GeoSR"],"description":["지오시스템리서치의 사업 분야와 인증·면허·지식재산권 등 회사 정보를 소개합니다.","Learn about GeoSystem Research, its capabilities, credentials and company information."]},
 "equipment":{"title":["관측·분석 장비 및 조사선","Survey and analysis equipment"],"description":["현장 관측과 환경 분석에 사용하는 장비와 조사선을 소개합니다.","Browse selected equipment for field observation and environmental analysis."]},
 "contact":{"title":["사업 및 기술 문의","Business and technical enquiries"],"description":["사업, 기술, 연구 협력 문의를 위한 GeoSR 연락처를 안내합니다.","Contact GeoSR about business, technical and research collaboration."]},
 "ax-platform":{"title":["AX Platform","AX Platform"],"description":["지오시스템리서치의 위성영상 분석·연안 재해 예측·해양 관측 플랫폼을 소개합니다.","Explore GeoSR platforms for satellite analysis, coastal hazard forecasting and marine observation."]},
 "platforms":{"title":["AX Platform","AX Platform"],"description":["지오시스템리서치의 위성영상 분석·연안 재해 예측·해양 관측 플랫폼을 소개합니다.","Explore GeoSR platforms for satellite analysis, coastal hazard forecasting and marine observation."]}
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
 document.title="GeoSR";
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
 if(P.has('record'))canonicalParams.set('record',P.get('record'));
 const canonical=`https://www.geosr.com${canonicalPath}${canonicalParams.size?'?'+canonicalParams:''}`;
 let canonicalLink=document.head.querySelector('link[rel="canonical"]');
 if(!canonicalLink){canonicalLink=document.createElement('link');canonicalLink.rel='canonical';document.head.append(canonicalLink)}
 canonicalLink.href=canonical;
 const alternateFor=language=>{const params=new URLSearchParams();if(P.has('id'))params.set('id',P.get('id'));if(P.has('record'))params.set('record',P.get('record'));if(language==='en')params.set('lang','en');return `https://www.geosr.com${canonicalPath}${params.size?'?'+params:''}`};
 [['ko',alternateFor('ko')],['en',alternateFor('en')],['x-default',alternateFor('ko')]].forEach(([language,href])=>{let link=document.head.querySelector(`link[rel="alternate"][hreflang="${language}"]`);if(!link){link=document.createElement('link');link.rel='alternate';link.hreflang=language;document.head.append(link)}link.href=href});
 setMeta("property","og:url",canonical);
 setMeta("name","twitter:card","summary");
 setMeta("name","twitter:title",metadata.title);
 setMeta("name","twitter:description",metadata.description);
}
document.documentElement.lang=L;document.body.className='design-2026 '+(route==='index'?'home-page':'inner-page')+' route-'+route+(['ax-platform','platforms'].includes(route)&&!P.has('service')?' ax-home':'');document.body.innerHTML=head()+`<main id="main" tabindex="-1">${({index:home,business,research:window.GeoSRSourceArchivePage,news:window.GeoSRSourceArchivePage,'source-archive':window.GeoSRSourceArchivePage,platforms:window.axPage,'ax-platform':window.axPage,equipment:()=>P.has('id')?equipment():window.GeoSRSourceArchivePage(),company:companyPage,careers:window.GeoSRCompanyInformationPage,privacy:window.GeoSRCompanyInformationPage,contact}[route]||home)()}</main>`+foot();applyPageMetadata();
document.querySelector('#language').addEventListener('click',()=>{const current=new URLSearchParams(location.search);current.set('lang',en?'ko':'en');location.href=location.pathname+'?'+current+location.hash});
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
 if(status)status.textContent=T('기술 목록을 불러오지 못했습니다 잠시 뒤 다시 확인해 주세요','The technology index could not be loaded. Please try again later.');
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
 const chart=en?'organization-2026-en.jpg':'organization-2026-ko.jpg';
 const divisions=[
  ['AI & 예측부문','AI & Forecasting Division',[['분석연구소','Research and Development Institute'],['예보사업부','Department of Forecast']]],
  ['환경 & 공간융합 부문','Environment & Spatial Convergence Division',[['환경화학생태부','Department of Environmental Chemistry & Ecology'],['공간융합부','Department of Spatial Convergence']]],
  ['Data & System 부문','Data & System Division',[['환경조사부','Department of Environment Survey'],['연안관리부','Department of Coastal Management'],['공간정보부','Department of Geospatial Information'],['시스템개발부','Department of System Engineering']]]
 ];
 const support=[['Think Tank 본부','Think Tank Director'],['전략기획실','Strategy and Planning Office'],['경영총괄부','Administration and Finance Department']];
 const offices=[['군포 본사','Gunpo head office','경기도 군포시 엘에스로 172<br>한림휴먼타워 306호','306 Hanlim Human Tower<br>172 LS-ro, Gunpo-si, Gyeonggi-do'],['부산 사무소','Busan office','부산광역시 해운대구 세실로69번길 24 5층','5F, 24 Sesil-ro 69beon-gil<br>Haeundae-gu, Busan'],['포항 사무소','Pohang office','경상북도 포항시 남구 운하로 266<br>첨단해양 R&D센터 801호','801 Advanced Marine R&D Center<br>266 Unha-ro, Nam-gu, Pohang-si']];
 const sectionHeading=(index,label,ko,english,descriptionKo,descriptionEn)=>`<div class="company-section-heading"><div><span>${index} / ${label}</span><h2>${T(ko,english)}</h2></div><p>${T(descriptionKo,descriptionEn)}</p></div>`;
 return `
 <section class="company-overview" id="company-overview" aria-labelledby="company-title">
   <div class="company-overview-copy"><div><p class="eyebrow">ABOUT GEOSR</p><h1 id="company-title">${T('지오시스템리서치','GeoSystem Research')}</h1></div><div class="company-overview-description"><p class="company-overview-statement">${T('지구환경을 연구하는 기술기업','Research and technology for the Earth’s environment')}</p><p>${T('해양과 하천에서 얻은 관측 자료를 바탕으로 <br>환경을 분석하고 변화를 예측합니다 <br>인공지능과 공간정보 기술로 연구의 활용 범위를 넓혀갑니다','We study environmental change using observations from oceans and inland waters <br>Our work combines field research with numerical modelling AI and geospatial technology')}</p><a class="company-profile-link" href="assets/company/${en?'geosr-profile-en-2025.pdf':'geosr-profile-ko-2025.pdf'}" download>${T('회사 소개서 다운로드','Download company profile')}<span aria-hidden="true">↓</span></a></div></div>
   <figure class="company-overview-image" data-company-slideshow aria-label="${T('회사 연구 분야 이미지','Company research imagery')}">${[['coastal-erosion-monitoring','연안 해변과 방파제','Coastal shoreline and breakwater','해안선과 연안 시설','Coastline and coastal structures',1672,941],['integrated-water-modeling','유역에서 하구와 해역으로 이어지는 수환경','Water environments linked from watershed to coast','유역에서 해역까지','From watershed to sea',1672,941],['harmful-algae-lab','해양 시료를 분석하는 실험실','Marine sample analysis in a laboratory','해양 시료 분석','Marine sample analysis',1860,846]].map((scene,i)=>`<img data-company-slide="${i}" data-company-caption="${E(T(scene[3],scene[4]))}" class="${i===0?'is-active':''}" src="assets/editorial/${scene[0]}.webp" width="${scene[5]}" height="${scene[6]}" alt="${T(scene[1]+' 콘셉트 이미지','Concept image of '+scene[2].toLowerCase())}" ${i===0?'fetchpriority="high"':'loading="lazy"'} aria-hidden="${i!==0}">`).join('')}<figcaption><div class="company-image-caption-controls"><strong class="company-slide-caption" data-company-slide-caption>${T('해안선과 연안 시설','Coastline and coastal structures')}</strong><div class="company-slide-controls"><span data-company-slide-count>01 <i>/ 03</i></span><button type="button" data-company-slide-pause aria-label="${T('자동 전환 정지','Pause slideshow')}" aria-pressed="false"><span aria-hidden="true">Ⅱ</span></button></div></div><div class="company-since"><span>SINCE</span><strong>2000</strong></div></figcaption></figure>
 </section>
 <nav class="company-anchor-nav" aria-label="${T('회사 소개 항목','Company information')}">${[['company-overview','회사 개요','Overview'],['greeting','인사말','CEO message'],['principles','목표와 사명','Mission and vision'],['company-records','연혁','History'],['organization','조직 안내','Organisation'],['credentials','인증·면허·지식재산권','Credentials'],['identity','CI','Identity'],['locations','사업장 안내','Locations']].map(x=>`<a href="#${x[0]}">${T(x[1],x[2])}</a>`).join('')}</nav>
 <section class="company-source-section" id="greeting" aria-labelledby="company-greeting-title">
  <div class="company-section-heading"><div><span>CEO MESSAGE</span><h2 id="company-greeting-title">${T('인사말','Message from the CEO')}</h2></div></div>
  <div data-company-source="greeting"></div>
 </section>
 <section class="company-source-section company-principles" id="principles" aria-labelledby="company-principles-title">
  <div class="company-section-heading"><div><span>MISSION & VISION</span><h2 id="company-principles-title">${T('목표와 사명','Mission and vision')}</h2></div></div>
  <div data-company-source="principles"></div>
 </section>
 <section class="company-records" id="company-records" aria-labelledby="company-history-title">
  <div data-company-history><p class="company-history-loading">${T('연혁을 불러오는 중','Loading company history')}</p></div>
 </section>
 <section class="company-organisation" id="organization" aria-labelledby="company-org-title">
  <div class="company-section-heading"><div><span>02 / ORGANISATION</span><h2 id="company-org-title">${T('조직 안내','Our organisation')}</h2></div><a class="company-original-link" href="assets/company/${chart}" target="_blank" rel="noopener">${T('조직도 원본 보기','View original organisation chart')}</a></div>
  <div class="company-org-chart"><div class="company-org-ceo">${T('대표이사','CEO')}</div><div class="company-org-branches"><ul class="company-org-support" aria-label="${T('대표이사 직속 조직','Offices reporting to the CEO')}">${support.map(x=>`<li>${T(x[0],x[1])}</li>`).join('')}</ul><ol class="company-org-divisions" aria-label="${T('연구 부문과 부서','Divisions and departments')}">${divisions.map((division,index)=>`<li><div class="company-org-division-head"><span>0${index+1}</span><h3>${T(division[0],division[1])}</h3></div><ul>${division[2].map(team=>`<li>${T(team[0],team[1])}</li>`).join('')}</ul></li>`).join('')}</ol></div></div>
  <div class="company-org-foot"><p>${T('2026년 4월 조직도 기준','Organisation as published in April 2026')}</p><div class="company-profile-downloads"><a href="assets/company/geosr-profile-ko-2025.pdf" download>${T('국문 회사 소개서','Korean company profile')}<span>PDF ↓</span></a><a href="assets/company/geosr-profile-en-2025.pdf" download>${T('영문 회사 소개서','English company profile')}<span>PDF ↓</span></a></div></div>
 <div data-company-source="departments"></div>
 </section>
 ${credentialGallery()}
 <section class="company-source-section company-identity" id="identity" aria-labelledby="company-identity-title">
  <div class="company-section-heading"><div><span>CORPORATE IDENTITY</span><h2 id="company-identity-title">CI</h2></div><a class="company-original-link" href="assets/company/geosr-ci.zip" download>${T('로고 다운로드','Download logo')} ZIP ↓</a></div>
  <div class="company-identity-layout"><figure><img src="assets/company/geosr-ci.png" alt="GeoSR" loading="lazy"></figure><dl><div><dt><i style="background:#255a98" aria-hidden="true"></i>GeoSR Blue</dt><dd>RGB 37 90 152<br>CMYK 92 71 17 3</dd></div><div><dt><i style="background:#1a96d4" aria-hidden="true"></i>GeoSR Light Blue</dt><dd>RGB 26 150 212<br>CMYK 76 27 0 0</dd></div></dl></div>
 </section>
 <section class="company-locations" id="locations">
  ${sectionHeading('03','LOCATIONS','사업장 안내','Our offices','군포 본사와 부산·포항 사무소','Our head office in Gunpo and offices in Busan and Pohang')}
  <div class="company-offices">${offices.map((x,i)=>`<article><small>0${i+1}</small><h3>${T(x[0],x[1])}</h3><p>${T(x[2],x[3])}</p></article>`).join('')}</div>
  <div data-company-source="directions"></div>
 </section>`;
}

function equipment(){
 const category=P.get('category')||'all',rawQuery=(P.get('q')||'').trim(),query=rawQuery.toLocaleLowerCase();
 const groups=[{id:'survey',nameK:'현장 조사',nameE:'Field'},{id:'lab',nameK:'실험실',nameE:'Lab'},{id:'vessel',nameK:'조사선·무인체',nameE:'Vessel / USV'}];
 const selected=P.has('id')?eq.find(item=>item[0]===P.get('id')):null;
 if(P.has('id')){
  if(!selected)return `<section class="equipment-detail"><a class="equipment-detail-back" href="${U('equipment',{category})}">${T('장비 목록으로','Back to equipment')}</a><div class="empty"><h1>${T('장비 자료를 찾을 수 없습니다','Equipment record not found')}</h1></div></section>`;
  const selectedGroup=groups.find(group=>group.id===selected[1]);
  const selectedAlt=selected[0]==='63'?T('GeoSR 무인선 관측 사진', 'GeoSR uncrewed vessel observation photo'):T(selected[2]+' 소개 이미지',selected[3]+' source image');
  return `<article class="equipment-detail"><a class="equipment-detail-back" href="${U('equipment',{category:selected[1]})}">${T('장비 목록으로','Back to equipment')}</a><div class="equipment-detail-layout"><figure class="equipment-detail-media"><img src="assets/${E(selected[5])}" alt="${E(selectedAlt)}" width="1600" height="900"><figcaption>${T(selected[0]==='63'?'GeoSR 무인선 관측 사진':'GeoSR 장비 소개 자료',selected[0]==='63'?'GeoSR uncrewed vessel observation photo':'GeoSR equipment reference')}</figcaption></figure><div class="equipment-detail-copy"><p class="eyebrow">${T(selectedGroup.nameK,selectedGroup.nameE)}</p><h1>${T(selected[2],selected[3])}</h1>${selected[4]?`<p>${T(selected[1]==='vessel'?'선박·관측 정보':'모델명',selected[1]==='vessel'?'Vessel / observation':'Model')}: <strong>${E(en&&selected[0]==='1938'?'19-ton survey vessel':selected[4])}</strong></p>`:''}<p>${T('원문에서 확인한 항목명과 모델 정보만 표시합니다','Only the item name and model information found in the source are shown')}</p></div></div></article>`;
 }
 const items=eq.filter(item=>(category==='all'||item[1]===category)&&item.slice(2,5).join(' ').toLocaleLowerCase().includes(query));
 const filters=[['all','전체','All'],['survey','현장 조사','Field'],['lab','실험실','Lab'],['vessel','조사선·무인체','Vessel / USV']].map(v=>`<a class="${category===v[0]?'active':''}" ${category===v[0]?'aria-current="page"':''} href="${U('equipment',{category:v[0],q:rawQuery})}">${T(v[1],v[2])}</a>`).join('');
 const cards=items.map(item=>{const group=groups.find(value=>value.id===item[1]);const alt=item[0]==='63'?T('GeoSR 무인선 관측 사진','GeoSR uncrewed vessel observation photo'):T(item[2]+' 소개 이미지',item[3]+' source image');return `<article class="equipment-card" data-equipment-kind="${item[1]}"><a class="equipment-card-open" href="${U('equipment',{id:item[0],category:item[1]})}" aria-label="${E(T(item[2]+' 상세 보기', 'View details: '+item[3]))}"><figure class="equipment-card-media"><img src="assets/${E(item[5])}" alt="${E(alt)}" loading="lazy" decoding="async"><figcaption>${T(item[0]==='63'?'GeoSR 무인선 관측 사진':'GeoSR 장비 소개 자료',item[0]==='63'?'GeoSR uncrewed vessel observation photo':'GeoSR equipment reference')}</figcaption></figure><div class="equipment-card-copy"><span class="equipment-card-category">${T(group.nameK,group.nameE)}</span><h2>${T(item[2],item[3])}</h2>${item[4]?`<p class="equipment-card-model">${E(en&&item[0]==='1938'?'19-ton survey vessel':item[4])}</p>`:''}<span class="equipment-open-label">${T('장비 살펴보기','Explore equipment')} <span aria-hidden="true">→</span></span></div></a></article>`}).join('');
 return `<section class="equipment-hero"><div><p class="eyebrow">FIELD / LAB / VESSEL</p><h1>${T('관측·분석 장비','Observation and analysis equipment')}</h1><p>${T('현장 조사와 실험 분석에 활용하는 주요 장비를 소개합니다','Selected equipment used in field surveys and laboratory work')}</p></div></section><section class="equipment-browser"><div class="equipment-toolbar"><nav class="filters" role="group" aria-label="${T('장비 분야','Equipment categories')}">${filters}</nav><form class="search" action="equipment.html"><input type="hidden" name="lang" value="${L}"><input type="hidden" name="category" value="${E(category)}"><label for="equipment-query">${T('장비 검색','Search equipment')}</label><div><input id="equipment-query" name="q" value="${E(rawQuery)}" placeholder="${T('장비명이나 모델을 입력하세요','Search by name or model')}"><button type="submit">${T('검색','Search')}</button></div></form></div><p class="equipment-result-count">${T('주요 장비','Selected equipment')} ${items.length}</p><div class="equipment-grid">${cards||`<div class="empty"><h2>${T('조건에 맞는 항목이 없습니다','No matching items')}</h2><a href="${U('equipment',{category:'all'})}">${T('검색 조건 초기화','Clear filters')}</a></div>`}</div></section>`;
}
function contact(){
 return '<section class="contact-hero"><div><p class="eyebrow">CONTACT / GEOSR</p><h1>'+T('사업·기술 문의','Let’s work together')+'</h1><p>'+T('사업 상담과 기술·연구 협력을 위한 연락처입니다','Contact us about business, technical or research collaboration')+'</p></div></section>'+
 '<section class="contact-main"><div class="contact-office"><div class="contact-direct"><span class="eyebrow">DIRECT CONTACT</span><a class="contact-email" href="mailto:admin@geosr.com">admin@geosr.com</a><a href="tel:+823151805700">+82 31 5180 5700</a></div><div class="contact-office-grid"><article class="contact-office-card"><span class="eyebrow">GUNPO / HEAD OFFICE</span><h2>'+T('군포 본사','Gunpo head office')+'</h2><address>'+T('경기도 군포시 엘에스로 172<br>한림휴먼타워 306호','306 Hanlim Human Tower<br>172 LS-ro, Gunpo-si, Gyeonggi-do')+'</address><a href="https://maps.google.com/?q=172+LS-ro,+Gunpo-si,+Gyeonggi-do" target="_blank" rel="noopener">'+T('지도에서 위치 보기','View on map')+' ↗</a></article><article class="contact-office-card"><span class="eyebrow">BUSAN OFFICE</span><h2>'+T('부산 사무소','Busan office')+'</h2><address>'+T('부산광역시 해운대구 세실로69번길 24 5층','5F, 24 Sesil-ro 69beon-gil, Haeundae-gu, Busan')+'</address><a href="https://maps.google.com/?q=24+Sesil-ro+69beon-gil,+Haeundae-gu,+Busan" target="_blank" rel="noopener">'+T('지도에서 위치 보기','View on map')+' ↗</a></article></div></div>'+
 '<form id="enquiry" class="contact-form" data-mailto-preview><div class="contact-form-heading"><p class="eyebrow">ENQUIRY FORM</p><h2>'+T('문의 내용을 남겨 주세요','How can we help?')+'</h2><p>'+T('이메일 앱에서 내용을 확인한 뒤 보내 주세요','Review the message in your email app before sending')+'</p></div><label>'+T('문의 분야','Enquiry type')+'<select name="type"><option>'+T('기술 협력','Technical collaboration')+'</option><option>'+T('사업 상담','Project enquiry')+'</option><option>'+T('연구 협력','Research collaboration')+'</option><option>'+T('기타','Other')+'</option></select></label><div class="contact-form-pair"><label>'+T('이름','Name')+'<input name="name" autocomplete="name" required></label><label>'+T('회사·기관','Organisation')+'<input name="organization" autocomplete="organization"></label></div><label>'+T('이메일','Email')+'<input type="email" name="email" autocomplete="email" required></label><label>'+T('문의 내용','Message')+'<textarea name="message" rows="5" required></textarea></label><button type="submit">'+T('메일 작성하기','Compose email')+'</button><p role="status" id="form-status" aria-live="polite"></p></form></section>';
}

/* Shared taxonomy retains all 21 source technologies */
function business(){
 const id=Number(P.get('id'));
 if(P.has('id')) return window.GeoSRBusinessDetailPage(id,tech.find(record=>record.id===id),L,route=>U(route));
 const axes=businessGroups.map(group=>group.k);
 const axesEnglish=businessGroups.map(group=>group.e);
 const initialAxis=Math.max(0,Math.min(businessGroups.length-1,Number(P.get('axis'))||0));
 const groupShell=businessGroups.map((group,index)=>`<button type="button" class="capability-axis" id="capability-tab-${index}" data-capability-axis="${index}" data-solution-ids="${group.ids.join(',')}" data-axis-summary="${E(T(group.bodyK,group.bodyE))}" aria-controls="capability-detail" aria-pressed="${index===initialAxis}" tabindex="${index===initialAxis?0:-1}"><span class="capability-axis-number">0${index+1}</span><span class="capability-axis-name">${T(axes[index],axesEnglish[index])}</span></button>`).join('');
 return `<section class="capability-explorer business-atlas" data-capability-root data-initial-axis="${initialAxis}" aria-labelledby="business-title"><div class="capability-intro"><p class="eyebrow">GEOSR / EXPERTISE</p><h1 id="business-title">${T('사업 및 기술 분야','Business and technology')}</h1><p>${T('인공지능과 수치모델에서 현장 조사와 환경 분석까지<br>연구와 사업에 필요한 기술을 개발합니다','From AI and numerical modelling to field surveys and environmental analysis')}</p></div><div class="capability-workspace"><nav class="capability-axis-rail" role="tablist" aria-orientation="horizontal" aria-label="${T('기술 분야 선택','Select a technology area')}">${groupShell}</nav><div class="capability-selected-media">${window.GeoSRBusinessGallery(businessGroups[initialAxis],L)}</div><section class="capability-detail" id="capability-detail" role="tabpanel" aria-labelledby="capability-tab-${initialAxis}" aria-live="polite"><span class="capability-detail-number" data-capability-number>0${initialAxis+1} / 08</span><h2 data-capability-title>${T(axes[initialAxis],axesEnglish[initialAxis])}</h2><p data-capability-summary>${T(businessGroups[initialAxis].bodyK,businessGroups[initialAxis].bodyE)}</p><nav class="capability-related-links" data-capability-links aria-label="${T('관련 기술 링크','Related technology links')}"></nav><p class="capability-source-note">${T('공개 기술 자료 기준','Based on published GeoSR technology records')}</p></section></div><details class="technology-index"><summary>${T('전체 기술 목록 찾아보기','Browse all technologies')}</summary><div class="technology-index-tools"><label for="technology-search">${T('기술명 검색','Search technologies')}</label><input id="technology-search" type="search" placeholder="${T('기술명을 입력하세요','Enter a technology name')}"><p id="technology-search-status" role="status" aria-live="polite">${T('기술 목록을 불러오는 중','Loading technology index')}</p></div><div id="tech-index" class="technology-index-list"></div></details></section>${window.GeoSRBusinessApplications(L)}`;
}
