/* AX uses the existing platform records and approved, full-frame screen captures. */
(()=>{
  "use strict";

  const data=window.GeoSRAxV2;
  if(!data||!Array.isArray(data.services))return;

  const t=(ko,en)=>data.translate(ko,en);
  const e=value=>data.escapeHtml(value);
  const services=new Map(data.services.map(service=>[service.id,service]));
  const groups=[
    {id:"detect",ko:"탐지",en:"Detect",services:["satellite","news"]},
    {id:"predict",ko:"예측",en:"Predict",services:["flood3d","surge","sealevel","flood-xai"]},
    {id:"monitor",ko:"모니터링",en:"Monitor",services:["buoy","env","rip"]}
  ];
  const captures={
    satellite:{file:"satellite-poster.webp",width:1280,height:720},
    news:{file:"news-poster.webp",width:1280,height:720},
    flood3d:{file:"flood3d-poster.webp",width:1280,height:720},
    surge:{file:"surge-poster.webp",width:1280,height:720},
    sealevel:{file:"sealevel-poster.webp",width:1280,height:720},
    buoy:{file:"buoy-poster.webp",width:1280,height:720},
    rip:{file:"rip-poster.webp",width:1280,height:720}
  };
  const environmentFrames=[
    {id:"temperature",file:"env-full-temperature.jpg",width:1920,height:1080,ko:"수온 분포",en:"Sea surface temperature",date:"2026-09-18"},
    {id:"salinity",file:"env-full-salinity.jpg",width:1920,height:1080,ko:"표층 염분 분포",en:"Surface salinity",date:"2026-09-19"}
  ];
  const initialGroup=groups[0];
  const motionCaptures=new Set(['satellite','flood3d','buoy']);
  const initialService=services.get(initialGroup.services[0]);

  function groupFor(serviceId){return groups.find(group=>group.services.includes(serviceId))||initialGroup}
  function serviceName(service){
    if(service.id==="news")return t("자연현상 뉴스 분석","Natural Phenomena News Analysis");
    return t(service.k,service.name);
  }
  function serviceSummary(service){
    if(service.id==="news")return t(
      "자연 현상 관련 보도를 지도에서 탐색하고 지역과 현상에 따라 분류합니다",
      "Explore reports about natural phenomena on a map and organize them by region and event"
    );
    return t(service.dk,service.de);
  }
  function selectedEnvironmentFrame(frameId){
    return environmentFrames.find(frame=>frame.id===frameId)||environmentFrames[0]||null;
  }
  function captureFor(service,frameId){
    if(service.id==="env"){
      const frame=selectedEnvironmentFrame(frameId);
      return frame?{file:frame.file,width:frame.width,height:frame.height,frame}:null;
    }
    const capture=captures[service.id];
    return capture?{...capture,frame:null}:null;
  }
  function captureDescription(service,capture){
    if(service.development)return t("개발 중 · 실제 화면 없음","In development · no actual screen");
    if(!capture&&service.id==="env")return t("전체 화면 캡처를 확인한 뒤 연결합니다","A verified full-frame capture will be connected when available");
    if(!capture)return t("화면 촬영 준비 중","Screen capture in preparation");
    if(capture.frame)return t(
      `자료 기준일 ${capture.frame.date} · 2026-09-20 캡처`,
      `Source data date ${capture.frame.date} · captured 2026-09-20`
    );
    return t("실제 화면 · 캡처 당시의 인터페이스 미리보기","Actual screen · interface preview from the capture date");
  }
  function captureFailureDescription(service){
    if(service.development)return t("개발 중 · 실제 화면 없음","In development · no actual screen");
    return t("캡처를 불러오지 못했습니다 · 화면 촬영 준비 중","Capture unavailable · screen capture in preparation");
  }
  function categoryTabsMarkup(){
    return groups.map((group,index)=>`<button type="button" class="ax-category-tab" role="tab" id="ax-category-${group.id}" aria-controls="ax-category-panel" aria-selected="${index===0}" tabindex="${index===0?0:-1}" data-ax-category="${group.id}"><span class="ax-category-name">${t(group.ko,group.en)}</span><span class="ax-category-english">0${index+1} / ${e(group.en.toUpperCase())}</span></button>`).join("");
  }
  function platformTabsMarkup(group,selectedId){
    return group.services.map((id,index)=>{
      const service=services.get(id);
      if(!service)return "";
      const available=Boolean(captureFor(service,service.id==="env"?"temperature":null));
      const status=service.development?t("개발 중","IN DEVELOPMENT"):available?t("화면 확인","SCREEN PREVIEW"):t("화면 준비 중","SCREEN PENDING");
      return `<button type="button" class="ax-platform-tab" role="tab" id="ax-platform-tab-${e(service.id)}" aria-controls="ax-platform-view" aria-selected="${id===selectedId}" tabindex="${id===selectedId?0:-1}" data-ax-platform="${e(id)}"><span class="ax-platform-tab-index">0${index+1}</span><span class="ax-platform-tab-name">${e(serviceName(service))}</span>${service.development?`<span class="ax-platform-tab-status">${status}</span>`:''}</button>`;
    }).join("");
  }
  function captureVisualMarkup(service,frameId){
    const capture=captureFor(service,frameId);
    if(capture){
      const captureName=capture.frame?t(capture.frame.ko,capture.frame.en):serviceName(service);
      const alt=t(`${captureName} 실제 화면 캡처`,`${captureName} actual interface capture`);
      const image=`<img class="ax-capture-visual" data-ax-capture-visual src="assets/platforms/${e(capture.file)}" width="${capture.width}" height="${capture.height}" alt="${e(alt)}" loading="lazy" decoding="async">`;
      return motionCaptures.has(service.id)?`<div class="ax-capture-visual ax-capture-film" data-ax-capture-visual data-film-slot="platform-${service.id}">${image.replace('data-ax-capture-visual','')}</div>`:image;
    }
    const pending=service.development
      ?t("개발 중 · 실제 화면 없음","In development · no actual screen")
      :t("화면 촬영 준비 중","Screen capture in preparation");
    const note=service.id==="env"
      ?t("전체 화면 자료를 확인한 뒤 연결합니다","A full-frame source will be connected after review")
      :t("검증된 인터페이스 화면을 준비하고 있습니다","A verified interface capture is being prepared");
    return `<div class="ax-capture-visual ax-capture-slate" data-ax-capture-visual role="img" aria-label="${e(pending)}"><small>${service.development?t("개발 상태","DEVELOPMENT STATUS"):t("인터페이스 미리보기","INTERFACE PREVIEW")}</small><strong>${e(pending)}</strong><span>${e(note)}</span></div>`;
  }
  function createCaptureSlate(service,failed=false){
    const slate=document.createElement("div");
    slate.className="ax-capture-visual ax-capture-slate";
    slate.dataset.axCaptureVisual="";
    if(failed)slate.dataset.axCaptureFailure="true";
    slate.setAttribute("role","img");
    const pending=service.development?t("개발 중 · 실제 화면 없음","In development · no actual screen"):t("화면 촬영 준비 중","Screen capture in preparation");
    slate.setAttribute("aria-label",pending);
    const label=document.createElement("small");
    label.textContent=service.development?t("개발 상태","DEVELOPMENT STATUS"):t("인터페이스 미리보기","INTERFACE PREVIEW");
    const title=document.createElement("strong");
    title.textContent=pending;
    const note=document.createElement("span");
    note.textContent=failed
      ?t("승인된 화면을 불러오지 못했습니다","The approved screen capture could not be loaded")
      :service.development?t("실제 화면은 제공되지 않습니다","No actual screen is available"):t("검증된 인터페이스 화면을 준비하고 있습니다","A verified interface capture is being prepared");
    slate.append(label,title,note);
    return slate;
  }
  function featuresMarkup(service,selectedFrameId){
    if(service.id==="env"){
      const features=(service.features||[]).slice(0,3);
      return `<div class="ax-environment-feature-list" role="group" aria-label="${e(t("해양환경 화면 및 기능","Ocean environment views and features"))}" data-ax-environment-features>${features.map((feature,index)=>{
        const frame=environmentFrames[index];
        if(frame)return `<button type="button" class="ax-environment-feature-item" aria-pressed="${frame.id===selectedFrameId}" aria-controls="ax-capture-viewport" data-ax-environment-feature="${e(frame.id)}"><span class="ax-environment-feature-index">0${index+1}</span><span>${e(t(feature[0],feature[1]))}</span></button>`;
        return `<div class="ax-environment-feature-item ax-environment-feature-static"><span class="ax-environment-feature-index">0${index+1}</span><span>${e(t(feature[0],feature[1]))}</span></div>`;
      }).join("")}</div>`;
    }
    return `<ul class="ax-platform-features">${(service.features||[]).slice(0,3).map((feature,index)=>`<li><span>0${index+1}</span>${e(t(feature[0],feature[1]))}</li>`).join("")}</ul>`;
  }
  function platformCopyMarkup(service,group,selectedFrameId){
    const status=service.development
      ?`<p class="ax-platform-status">${t("개발 중 · 실제 화면 없음","In development · no actual screen")}</p>`
      :"";
    return `<div class="ax-platform-copy-heading"><div><p class="ax-platform-copy-label">${e(t(group.ko,group.en).toUpperCase())} / AX PLATFORM</p><h3 id="ax-platform-service-title" data-ax-service-title>${e(serviceName(service))}</h3></div><p class="ax-platform-summary" data-ax-service-summary>${e(serviceSummary(service))}</p></div>${status}${featuresMarkup(service,selectedFrameId)}<p class="ax-explorer-source-note">${service.development?e(t("화면이나 구현 기능을 보유한 것으로 표현하지 않습니다","No interface or implemented feature is represented")):e(t("화면의 날짜·값은 캡처 당시 표시이며 실시간 자료가 아닙니다","Dates and values shown are from the capture and are not live data"))}</p>`;
  }
  function heroMarkup(){
    return `<section class="ax-concept-hero" aria-labelledby="ax-title"><div class="ax-concept-hero-inner"><div class="ax-concept-hero-copy"><p class="ax-concept-kicker">GEOSR / APPLIED INTELLIGENCE</p><h1 id="ax-title">AX<br>Platform</h1><p class="ax-concept-heading">${t("해양·환경 데이터를<br>탐지와 예측에 활용합니다","Turn marine and environmental data<br>into detection and forecasts")}</p></div><div class="ax-concept-film-stage" id="ax-concept-film-slot" data-film-slot="ax-concept-film" role="group" aria-label="${e(t("AX 탐지 콘셉트 영상 준비 중","AX concept film in preparation"))}"><img class="ax-detection-poster" src="assets/concepts/ax-detection-v3/ax-detect-start.png" width="1672" height="941" alt="${e(t("해상 양식 시설물 탐지를 설명하는 생성형 콘셉트","Generated concept illustrating marine facility detection"))}" fetchpriority="high"><div class="ax-concept-film-slate"><span class="ax-concept-film-label">AX PLATFORM / CONCEPT FILM</span><p class="ax-concept-film-pending">${e(t("시설물 탐지 콘셉트 · 영상 제작 중","FACILITY DETECTION CONCEPT · FILM IN PRODUCTION"))}</p></div></div></div></section>`;
  }
  function explorerMarkup(){
    const firstCapture=captureFor(initialService,null);
    const firstName=serviceName(initialService);
    const firstDescription=captureDescription(initialService,firstCapture);
    return `<section class="ax-platform-explorer" id="ax-platform-explorer" data-ax-explorer aria-labelledby="ax-explorer-title"><div class="ax-platform-explorer-inner"><div class="ax-explorer-intro"><div><p class="ax-explorer-kicker">GEOSR / AX PLATFORM</p><h2 id="ax-explorer-title">${e(t("분야별 플랫폼","Platforms by discipline"))}</h2></div><p>${t("위성영상 분석부터 재해 예측과 해양 관측까지<br>분야별 플랫폼의 주요 기능을 살펴보세요","Explore key features across satellite imagery, hazard forecasting and marine observations")}</p></div><div class="ax-category-tabs" role="tablist" aria-label="${e(t("플랫폼 분야 선택","Choose a platform category"))}" aria-orientation="horizontal" data-ax-category-tabs>${categoryTabsMarkup()}</div><div class="ax-platform-workspace" id="ax-category-panel" role="tabpanel" aria-labelledby="ax-category-${initialGroup.id}" data-ax-category-panel><aside class="ax-platform-browser"><p class="ax-platform-list-label" id="ax-platform-list-label">${e(t("플랫폼 선택","Select a platform"))}</p><div class="ax-platform-tabs" role="tablist" aria-labelledby="ax-platform-list-label" aria-orientation="vertical" data-ax-platform-tabs>${platformTabsMarkup(initialGroup,initialService.id)}</div></aside><section class="ax-platform-view" id="ax-platform-view" role="tabpanel" aria-labelledby="ax-platform-tab-${e(initialService.id)}" tabindex="0" data-ax-platform-view><figure class="ax-selected-capture" data-ax-selected-capture><div class="ax-capture-viewport" id="ax-capture-viewport" data-ax-capture-viewport>${captureVisualMarkup(initialService,null)}</div><figcaption class="ax-capture-caption"><span>${e(t("실제 화면 · 인터페이스 미리보기","Actual interface preview"))}</span><span data-ax-capture-caption>${e(firstDescription)}</span></figcaption></figure><div class="ax-platform-copy" data-ax-platform-copy>${platformCopyMarkup(initialService,initialGroup,null)}</div></section></div></div></section>`;
  }
  function renderPage(){return heroMarkup()+explorerMarkup()}

  window.axPage=renderPage;

  function createVisual(service,frameId){
    const capture=captureFor(service,frameId);
    if(capture){
      const image=document.createElement("img");
      image.className="ax-capture-visual";
      image.dataset.axCaptureVisual="";
      image.width=capture.width;
      image.height=capture.height;
      const captureName=capture.frame?t(capture.frame.ko,capture.frame.en):serviceName(service);
      image.alt=t(`${captureName} 실제 화면 캡처`,`${captureName} actual interface capture`);
      image.loading="eager";
      image.decoding="async";
      image.addEventListener("error",()=>{image.dataset.axCaptureFailure="true"},{once:true});
      image.src=`assets/platforms/${capture.file}`;
      if(motionCaptures.has(service.id)){
        const wrapper=document.createElement('div');
        wrapper.className='ax-capture-visual ax-capture-film';
        wrapper.dataset.axCaptureVisual='';wrapper.dataset.filmSlot=`platform-${service.id}`;
        delete image.dataset.axCaptureVisual;wrapper.append(image);return wrapper;
      }
      return image;
    }
    return createCaptureSlate(service);
  }
  function visualImage(visual){return visual instanceof HTMLImageElement?visual:visual.querySelector('img')}
  function waitForImage(visual){
    const image=visualImage(visual);
    if(!(image instanceof HTMLImageElement))return Promise.resolve();
    if(image.complete){
      if(image.naturalWidth===0)image.dataset.axCaptureFailure="true";
      return Promise.resolve();
    }
    return new Promise(resolve=>{
      let settled=false;
      const finish=()=>{if(settled)return;settled=true;resolve()};
      image.addEventListener("load",finish,{once:true});
      image.addEventListener("error",()=>{image.dataset.axCaptureFailure="true";finish()},{once:true});
      if(typeof image.decode==="function")image.decode().then(finish).catch(()=>{image.dataset.axCaptureFailure="true";finish()});
    });
  }
  function bindRovingTabs(tablist,{orientation="horizontal",activate=true}={}){
    if(!tablist)return;
    tablist.addEventListener("keydown",event=>{
      const tabs=Array.from(tablist.querySelectorAll('[role="tab"]'));
      const current=tabs.indexOf(event.target.closest('[role="tab"]'));
      if(current<0)return;
      const currentOrientation=tablist.getAttribute("aria-orientation")||orientation;
      let next=null;
      if(event.key==="Home")next=0;
      if(event.key==="End")next=tabs.length-1;
      if(currentOrientation==="horizontal"&&(event.key==="ArrowRight"||event.key==="ArrowDown"))next=(current+1)%tabs.length;
      if(currentOrientation==="horizontal"&&(event.key==="ArrowLeft"||event.key==="ArrowUp"))next=(current+tabs.length-1)%tabs.length;
      if(currentOrientation==="vertical"&&(event.key==="ArrowDown"||event.key==="ArrowRight"))next=(current+1)%tabs.length;
      if(currentOrientation==="vertical"&&(event.key==="ArrowUp"||event.key==="ArrowLeft"))next=(current+tabs.length-1)%tabs.length;
      if(next===null)return;
      event.preventDefault();
      tabs[next].focus({preventScroll:true});
      const box=tabs[next].getBoundingClientRect(),edge=tablist.getBoundingClientRect();
      if(box.left<edge.left||box.right>edge.right)tablist.scrollBy({left:box.left<edge.left?box.left-edge.left:box.right-edge.right,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
      if(activate)tabs[next].click();
    });
  }
  function initializeExplorer(){
    const root=document.querySelector("[data-ax-explorer]");
    if(!root||root.dataset.initialized==="true")return;
    root.dataset.initialized="true";

    const categoryTabs=root.querySelector("[data-ax-category-tabs]");
    const categoryPanel=root.querySelector("[data-ax-category-panel]");
    const platformTabs=root.querySelector("[data-ax-platform-tabs]");
    const view=root.querySelector("[data-ax-platform-view]");
    const viewport=root.querySelector("[data-ax-capture-viewport]");
    const copy=root.querySelector("[data-ax-platform-copy]");
    const caption=root.querySelector("[data-ax-capture-caption]");
    if(!categoryTabs||!categoryPanel||!platformTabs||!view||!viewport||!copy)return;

    let activeGroup=initialGroup;
    let activeServiceId=initialService.id;
    let activeFrameId=initialService.id==="env"?"temperature":null;
    let transitionVersion=0;
    let copyAnimation=null;
    const reduceQuery=window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery=window.matchMedia("(max-width: 700px)");
    const syncPlatformOrientation=()=>platformTabs.setAttribute("aria-orientation","horizontal");

    function installInitialImageFallback(){
      const visual=viewport.querySelector('[data-ax-capture-visual]');
      const image=visual&&visualImage(visual);
      if(!image)return;
      let handled=false;
      const fallback=()=>{
        if(handled)return;
        handled=true;
        if(!image.parentNode||!viewport.contains(visual))return;
        visual.replaceWith(createCaptureSlate(services.get(activeServiceId),true));
        expandButton.disabled=true;
        if(caption)caption.textContent=captureFailureDescription(services.get(activeServiceId));
      };
      image.addEventListener("error",fallback,{once:true});
      if(image.complete&&image.naturalWidth===0)fallback();
      if(typeof image.decode==="function")image.decode().catch(fallback);
    }

    function updateCategoryTabs(){
      categoryTabs.querySelectorAll("[data-ax-category]").forEach(tab=>{
        const selected=tab.dataset.axCategory===activeGroup.id;
        tab.setAttribute("aria-selected",String(selected));
        tab.tabIndex=selected?0:-1;
      });
      categoryPanel.setAttribute("aria-labelledby",`ax-category-${activeGroup.id}`);
    }
    function updatePlatformTabs(){
      platformTabs.querySelectorAll("[data-ax-platform]").forEach(tab=>{
        const selected=tab.dataset.axPlatform===activeServiceId;
        tab.setAttribute("aria-selected",String(selected));
        tab.tabIndex=selected?0:-1;
      });
      view.setAttribute("aria-labelledby",`ax-platform-tab-${activeServiceId}`);
    }
    function updateFeatureTabs(){
      const featureTabs=copy.querySelector("[data-ax-environment-features]");
      if(!featureTabs)return;
      featureTabs.querySelectorAll("[data-ax-environment-feature]").forEach(tab=>{
        const selected=tab.dataset.axEnvironmentFeature===activeFrameId;
        tab.setAttribute("aria-pressed",String(selected));
      });
    }
    function bindFeatureTabs(){
      const featureTabs=copy.querySelector("[data-ax-environment-features]");
      if(!featureTabs)return;
      featureTabs.addEventListener("click",event=>{
        const button=event.target.closest("[data-ax-environment-feature]");
        if(!button)return;
        const frame=selectedEnvironmentFrame(button.dataset.axEnvironmentFeature);
        if(!frame||frame.id===activeFrameId)return;
        activeFrameId=frame.id;
        updateFeatureTabs();
        const service=services.get("env");
        switchCapture(service,activeFrameId,true);
      });
      featureTabs.addEventListener("keydown",event=>{
        const buttons=Array.from(featureTabs.querySelectorAll("[data-ax-environment-feature]"));
        const current=buttons.indexOf(event.target.closest("[data-ax-environment-feature]"));
        if(current<0)return;
        let next=null;
        if(event.key==="Home")next=0;
        if(event.key==="End")next=buttons.length-1;
        if(event.key==="ArrowRight"||event.key==="ArrowDown")next=(current+1)%buttons.length;
        if(event.key==="ArrowLeft"||event.key==="ArrowUp")next=(current+buttons.length-1)%buttons.length;
        if(next===null)return;
        event.preventDefault();
        buttons[next].focus({preventScroll:true});
        buttons[next].click();
      });
    }
    function animateCopy(){
      if(copyAnimation){copyAnimation.cancel();copyAnimation=null}
      if(reduceQuery.matches||typeof copy.animate!=="function")return;
      copyAnimation=copy.animate([{opacity:.55},{opacity:1}],{duration:240,easing:"ease-out",fill:"none"});
      copyAnimation.finished.catch(()=>{}).finally(()=>{copyAnimation=null});
    }
    async function switchCapture(service,frameId,animate){
      const capture=captureFor(service,frameId);
      let incoming=createVisual(service,frameId);
      const version=++transitionVersion;
      await waitForImage(incoming);
      if(version!==transitionVersion)return;
      const image=visualImage(incoming);
      const failed=Boolean(image&&(image.dataset.axCaptureFailure==="true"||image.naturalWidth===0));
      if(failed)incoming=createCaptureSlate(service,true);
      expandButton.disabled=failed||!capture;

      const existing=Array.from(viewport.querySelectorAll("[data-ax-capture-visual]"));
      const previous=existing[existing.length-1]||null;
      existing.forEach(node=>{
        if(typeof node.getAnimations==="function")node.getAnimations().forEach(animation=>animation.cancel());
        if(node!==previous)node.remove();
      });
      viewport.appendChild(incoming);
      previous?.querySelectorAll('video').forEach(video=>video.pause());
      document.dispatchEvent(new Event('geosr:media-updated'));
      if(caption)caption.textContent=failed?captureFailureDescription(service):captureDescription(service,capture);
      if(reduceQuery.matches||!animate||!previous||typeof incoming.animate!=="function"){
        if(previous)previous.remove();
        document.dispatchEvent(new Event('geosr:media-updated'));
        return;
      }

      const options={duration:620,easing:"cubic-bezier(.16,1,.3,1)",fill:"none"};
      const incomingAnimation=incoming.animate([
        {opacity:.35,clipPath:"inset(0 8% 0 0)",transform:"translateY(8px)"},
        {opacity:1,clipPath:"inset(0 0 0 0)",transform:"translateY(0)"}
      ],options);
      const previousAnimation=previous.animate([
        {opacity:1,transform:"translateX(0)"},
        {opacity:0,transform:"translateX(-8px)"}
      ],options);
      Promise.all([incomingAnimation.finished.catch(()=>{}),previousAnimation.finished.catch(()=>{})]).then(()=>{
        if(version!==transitionVersion)return;
        previous.remove();
        document.dispatchEvent(new Event('geosr:media-updated'));
      });
    }
    function selectService(serviceId,animate=true){
      const service=services.get(serviceId);
      if(!service)return;
      const nextGroup=groupFor(serviceId);
      if(nextGroup.id!==activeGroup.id){
        activeGroup=nextGroup;
        updateCategoryTabs();
      }
      const changed=serviceId!==activeServiceId;
      activeServiceId=serviceId;
      if(changed)activeFrameId=serviceId==="env"?(environmentFrames[0]?.id||null):null;
      updatePlatformTabs();
      copy.innerHTML=platformCopyMarkup(service,activeGroup,activeFrameId);
      updateFeatureTabs();
      bindFeatureTabs();
      if(changed)animateCopy();
      switchCapture(service,activeFrameId,animate);
    }
    function selectCategory(groupId){
      const nextGroup=groups.find(group=>group.id===groupId);
      if(!nextGroup||nextGroup.id===activeGroup.id)return;
      activeGroup=nextGroup;
      updateCategoryTabs();
      platformTabs.innerHTML=platformTabsMarkup(activeGroup,activeGroup.services[0]);
      syncPlatformOrientation();
      selectService(activeGroup.services[0],true);
    }

    // The enlarged view shows the original capture, with its ratio and provenance intact
    const figure=root.querySelector('[data-ax-selected-capture]');
    const toolbar=document.createElement('div');toolbar.className='ax-screen-toolbar';
    const screenLabel=document.createElement('span');screenLabel.textContent='PLATFORM / ACTUAL INTERFACE';
    const expandButton=document.createElement('button');expandButton.type='button';expandButton.dataset.axExpand='';
    expandButton.textContent=t('화면 캡처 확대','Enlarge capture');expandButton.setAttribute('aria-haspopup','dialog');
    toolbar.append(screenLabel,expandButton);figure.prepend(toolbar);
    const dialog=document.createElement('dialog');dialog.className='ax-screen-dialog';dialog.setAttribute('aria-labelledby','ax-screen-dialog-title');
    dialog.innerHTML=`<div class="ax-screen-dialog-bar"><h2 id="ax-screen-dialog-title"></h2><button type="button" aria-label="${e(t('닫기','Close'))}">×</button></div><img alt=""><p>${e(t('실제 화면 캡처 · 실시간 자료가 아닙니다','Actual interface capture · not live data'))}</p>`;
    root.append(dialog);let previousOverflow='';
    expandButton.addEventListener('click',()=>{
      const service=services.get(activeServiceId),capture=captureFor(service,activeFrameId);if(!capture)return;
      const image=dialog.querySelector('img');image.src=`assets/platforms/${capture.file}`;image.alt=serviceName(service);
      dialog.querySelector('h2').textContent=serviceName(service)+(capture.frame?' / '+t(capture.frame.ko,capture.frame.en):'');
      previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();
    });
    dialog.querySelector('button').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close()}});
    dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;expandButton.focus({preventScroll:true})});
    categoryTabs.addEventListener("click",event=>{
      const button=event.target.closest("[data-ax-category]");
      if(button)selectCategory(button.dataset.axCategory);
    });
    platformTabs.addEventListener("click",event=>{
      const button=event.target.closest("[data-ax-platform]");
      if(button)selectService(button.dataset.axPlatform,true);
    });
    bindRovingTabs(categoryTabs,{orientation:"horizontal"});
    bindRovingTabs(platformTabs,{orientation:mobileQuery.matches?"horizontal":"vertical"});
    syncPlatformOrientation();
    installInitialImageFallback();
    if(typeof mobileQuery.addEventListener==="function")mobileQuery.addEventListener("change",syncPlatformOrientation);
  }

  if(document.readyState==="complete")initializeExplorer();
  else document.addEventListener("DOMContentLoaded",initializeExplorer,{once:true});
})();
