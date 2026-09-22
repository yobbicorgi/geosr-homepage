/* Interaction layer for the confirmed GeoSR art direction. */
(function(){
  "use strict";
  var reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer=window.matchMedia("(hover: hover) and (pointer: fine)");
  var language=document.documentElement.lang==="en"?"en":"ko";

  function clamp(value,min,max){return Math.max(min,Math.min(max,value))}
  function text(element,value){if(element)element.textContent=value}
  function setInert(element,value){if(element&&"inert" in element)element.inert=value}

  function initResearchFlow(){
    var root=document.querySelector("[data-research-flow]");
    if(!root)return;
    var copies=Array.from(root.querySelectorAll("[data-flow-copy]"));
    var media=Array.from(root.querySelectorAll("[data-flow-media]"));
    var technologies=Array.from(root.querySelectorAll("[data-flow-technologies]"));
    var triggers=Array.from(root.querySelectorAll("[data-flow-trigger]"));
    var buttons=Array.from(root.querySelectorAll("[data-flow-select]"));
    var progress=root.querySelector(".research-flow-progress-track i");
    var active=-1;
    var scrollDriven=window.CSS&&CSS.supports&&CSS.supports("animation-timeline","view()");
    var queued=false;
    function setActive(index,scrollProgress){
      index=clamp(index,0,copies.length-1);
      if(index===active&&typeof scrollProgress!=="number")return;
      active=index;
      copies.forEach(function(node,i){
        var selected=i===index;
        node.classList.toggle("is-active",selected);
        node.setAttribute("aria-hidden",String(!selected));
        setInert(node,!selected);
      });
      media.forEach(function(node,i){
        var selected=i===index;
        node.classList.toggle("is-active",selected);
        node.setAttribute("aria-hidden",String(!selected));
        setInert(node,!selected);
      });
      technologies.forEach(function(node,i){
        var selected=i===index;
        node.classList.toggle("is-active",selected);
        node.setAttribute("aria-hidden",String(!selected));
        setInert(node,!selected);
      });
      buttons.forEach(function(node,i){node.setAttribute("aria-pressed",String(i===index))});
      root.dataset.activeStage=String(index);
      if(progress&&!scrollDriven&&typeof scrollProgress==="number"){
        progress.style.transform="scaleX("+clamp(scrollProgress,0,1)+")";
      }
    }
    if(reduced.matches||window.innerWidth<=1100){
      root.classList.add("is-static");
      return;
    }
    root.classList.remove("is-static");
    setActive(0,0);
    buttons.forEach(function(button){
      button.addEventListener("click",function(){
        var index=Number(button.dataset.flowSelect);
        var bounds=root.getBoundingClientRect();
        var target=window.scrollY+bounds.top+root.offsetHeight*((index+.5)/copies.length)-window.innerHeight/2;
        window.scrollTo({top:target,behavior:reduced.matches?"instant":"smooth"});
        setActive(index,index/(copies.length-1));
      });
    });
    if("IntersectionObserver" in window){
      triggers.forEach(function(node,index){
        node.style.top="calc("+((index*100)+50)+"svh)";
        node.style.height="20svh";
      });
      var observer=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting)setActive(Number(entry.target.dataset.flowTrigger));
        });
      },{root:null,rootMargin:"-35% 0px -35% 0px",threshold:.01});
      triggers.forEach(function(node){observer.observe(node)});
    }else{
      function update(){
        queued=false;
        var bounds=root.getBoundingClientRect();
        var travel=Math.max(1,root.offsetHeight-window.innerHeight);
        var value=clamp(-bounds.top/travel,0,1);
        setActive(Math.min(copies.length-1,Math.floor(value*copies.length)),value);
      }
      function schedule(){if(!queued){queued=true;requestAnimationFrame(update)}}
      window.addEventListener("scroll",schedule,{passive:true});
      window.addEventListener("resize",schedule);
      update();
    }
    if(progress&&!scrollDriven){
      function updateProgress(){
        var bounds=root.getBoundingClientRect();
        var travel=Math.max(1,root.offsetHeight-window.innerHeight);
        progress.style.transform="scaleX("+clamp(-bounds.top/travel,0,1)+")";
      }
      window.addEventListener("scroll",updateProgress,{passive:true});
      window.addEventListener("resize",updateProgress);
      updateProgress();
    }
  }

  function initCapabilityField(){
    var root=document.querySelector("[data-capability-root]");
    if(!root)return;
    var axisButtons=Array.from(root.querySelectorAll("[data-capability-axis]"));
    var selected=Number(root.dataset.initialAxis)||0;
    var preview=null;
    var title=root.querySelector("[data-capability-title]");
    var summary=root.querySelector("[data-capability-summary]");
    var number=root.querySelector("[data-capability-number]");
    var related=root.querySelector("[data-capability-links]");
    var detail=root.querySelector(".capability-detail");
    var rail=root.querySelector("#capability-technology-rail");
    var list=root.querySelector("#capability-technology-list");
    var map=root.querySelector("[data-capability-map]");
    var selectedMedia=root.querySelector(".capability-selected-media");
    var sourceNote=root.querySelector(".capability-source-note");
    var records=[];
    var pendingTimer=0;
    var frame=0;
    var detailIds=new Set(["46","63","61"]);
    var groupIds=axisButtons.map(function(button){
      return button.dataset.solutionIds.split(",").map(function(id){return id.trim()});
    });
    var english=window.GeoSRTechnologyEnglish||{};
    var sourceReady=window.siteContentReady||Promise.resolve();
    function activeIndex(){return preview===null?selected:preview}
    function getName(record,id){
      if(language==="en")return english[id]||record.title;
      return record.title;
    }
    function makeTechnologyNode(record,id){
      var anchor=document.createElement("a");
      anchor.className="capability-technology-item";
      anchor.dataset.technologyId=id;
      anchor.href="business.html?id="+encodeURIComponent(id)+"&lang="+language;
      var connector=document.createElement("span");
      connector.className="tech-connector-anchor";
      connector.setAttribute("aria-hidden","true");
      var label=document.createElement("strong");
      label.textContent=getName(record,id);
      var state=document.createElement("small");
      state.textContent=detailIds.has(id)?(language==="en"?"Verified overview":"기술 개요 확인"): (language==="en"?"Details pending":"상세 준비 중");
      anchor.append(connector,label,state);
      return anchor;
    }
    function renderTechnologyRail(){
      var content=window.siteContent;
      var solutions=content&&Array.isArray(content.solutions)?content.solutions:[];
      records=solutions.map(function(record){
        var match=String(record.id).match(/(\d+)$/);
        return match?{data:record,id:match[1]}:null;
      }).filter(Boolean);
      if(list){
        list.replaceChildren();
        records.forEach(function(item){list.appendChild(makeTechnologyNode(item.data,item.id))});
      }
      refreshSelection();
      requestDraw();
    }
    function drawLinks(){
      if(!map||!root||!rail||!records.length)return;
      var box=root.getBoundingClientRect();
      var width=Math.max(1,root.clientWidth);
      var height=Math.max(1,root.clientHeight);
      map.setAttribute("viewBox","0 0 "+Math.round(width)+" "+Math.round(height));
      map.replaceChildren();
      var svgNS="http://www.w3.org/2000/svg";
      var current=activeIndex();
      var visibleLeft=rail.getBoundingClientRect().left;
      var visibleRight=rail.getBoundingClientRect().right;
      axisButtons.forEach(function(button,axisIndex){
        var axisBox=button.getBoundingClientRect();
        var startX=axisBox.right-box.left;
        var startY=axisBox.top-box.top+axisBox.height/2;
        var allowed=new Set(groupIds[axisIndex]);
        records.forEach(function(item){
          if(!allowed.has(item.id))return;
          var node=list.querySelector('[data-technology-id="'+item.id+'"]');
          if(!node)return;
          var nodeBox=node.getBoundingClientRect();
          if(nodeBox.right<visibleLeft||nodeBox.left>visibleRight)return;
          var endX=nodeBox.left-box.left+nodeBox.width/2;
          var endY=nodeBox.top-box.top+2;
          var curve=Math.max(18,Math.min(90,(endX-startX)*.22));
          var path=document.createElementNS(svgNS,"path");
          path.setAttribute("d","M "+startX+" "+startY+" C "+(startX+curve)+" "+startY+", "+(endX-curve)+" "+endY+", "+endX+" "+endY);
          path.dataset.axis=String(axisIndex);
          path.dataset.technologyId=item.id;
          if(axisIndex===current)path.classList.add("is-active");
          map.appendChild(path);
        });
      });
    }
    function requestDraw(){
      if(frame)return;
      frame=requestAnimationFrame(function(){frame=0;drawLinks()});
    }
    function renderRelated(index){
      var ids=groupIds[index]||[];
      var group=window.siteContent&&window.siteContent.solutions||[];
      var byId=new Map();
      group.forEach(function(item){
        var match=String(item.id).match(/(\d+)$/);
        if(match)byId.set(match[1],item);
      });
      related.replaceChildren();
      ids.forEach(function(id){
        var item=byId.get(id);
        if(!item)return;
        var link=document.createElement("a");
        link.href="business.html?id="+encodeURIComponent(id)+"&lang="+language;
        var label=document.createElement("span");
        label.textContent=getName(item,id);
        link.appendChild(label);
        if(detailIds.has(id)){
          var arrow=document.createElement("span");
          arrow.className="actual-arrow";
          arrow.setAttribute("aria-hidden","true");
          arrow.textContent="→";
          link.appendChild(arrow);
        }else{
          var status=document.createElement("small");
          status.className="actual-placeholder";
          status.textContent=language==="en"?"Details pending":"상세 준비 중";
          link.appendChild(status);
        }
        related.appendChild(link);
      });
    }
    function renderSelectedMedia(index){
      if(!selectedMedia)return;
      var examples=[
        {src:"assets/equipment-usv-original.png",ko:"무인선 이용 관측",en:"Uncrewed surface observation",noteK:"기존 GeoSR 홈페이지에 소개된 무인선 관측 사진",noteE:"Uncrewed observation photograph from the GeoSR website"},
        {src:"assets/platforms/env-full-temperature.jpg",ko:"해양환경 플랫폼의 해수면 온도 화면",en:"Sea surface temperature view in Ocean Environment",noteK:"해양환경 플랫폼 적용 예시 · 실제 인터페이스 캡처",noteE:"Ocean Environment application example · actual interface capture"},
        {src:"assets/generated/candidates-v2/flow-lab-ecology-v1.png",ko:"사람이 없는 실험대의 생성형 콘셉트 이미지",en:"Generated concept of an unoccupied laboratory bench",noteK:"실험·분석 영상 콘셉트 · 실제 GeoSR 시설이나 분석 결과가 아닙니다",noteE:"Laboratory film concept · not a GeoSR facility or an analytical result"},
        {src:"assets/platforms/flood3d-poster.webp",ko:"3차원 침수 예측 플랫폼 화면",en:"Flood 3D platform interface",noteK:"침수 예측 플랫폼 적용 예시 · 실제 인터페이스 캡처",noteE:"Flood 3D application example · actual interface capture"},
        {src:"assets/platforms/satellite-poster.webp",ko:"위성 시설물 탐지 플랫폼 화면",en:"Satellite facility detection platform interface",noteK:"위성영상 분석 적용 예시 · 실제 인터페이스 캡처",noteE:"Satellite imagery application example · actual interface capture"}
      ];
      var example=examples[index];
      var mediaKey=example.src;
      if(selectedMedia.dataset.mediaKey===mediaKey)return;
      selectedMedia.dataset.mediaKey=mediaKey;
      selectedMedia.replaceChildren();
        var image=document.createElement("img");
        image.src=example.src;
        image.width=index===0?1771:1920;
        image.height=index===0?1068:1080;
        image.loading="eager";
        image.decoding="async";
        image.alt=language==="en"?example.en:example.ko;
        selectedMedia.setAttribute("aria-label",image.alt);
        selectedMedia.appendChild(image);
        if(sourceNote)sourceNote.textContent=language==="en"?example.noteE:example.noteK;
      if(!reduced.matches&&image.animate){
        image.animate([{opacity:.2,transform:"scale(1.035)"},{opacity:1,transform:"scale(1)"}],{duration:760,easing:"cubic-bezier(.16,1,.3,1)"});
      }
    }    function refreshSelection(){
      var index=activeIndex();
      renderSelectedMedia(index);
      axisButtons.forEach(function(button,i){
        button.setAttribute("role","tab");
        button.removeAttribute("aria-pressed");
        button.setAttribute("aria-selected",String(i===index));
        button.setAttribute("aria-controls","capability-detail");
        button.tabIndex=i===index?0:-1;
        button.classList.toggle("is-preview",preview===i&&i!==selected);
      });
      if(detail)detail.setAttribute("aria-labelledby",axisButtons[index].id);
      if(title)title.textContent=axisButtons[index].querySelector(".capability-axis-name").textContent;
      if(summary)summary.textContent=axisButtons[index].dataset.axisSummary||"";
      if(number)number.textContent="0"+(index+1)+" / 05";
      var ids=new Set(groupIds[index]||[]);
      if(list)list.querySelectorAll("[data-technology-id]").forEach(function(node){
        var selectedNode=ids.has(node.dataset.technologyId);
        node.classList.toggle("is-related",selectedNode);
        node.classList.toggle("is-selected",selectedNode);
      });
      if(records.length)renderRelated(index);
      requestDraw();
    }
    function setSelection(index,commit){
      index=clamp(index,0,axisButtons.length-1);
      if(commit){selected=index;preview=null}
      refreshSelection();
      if(detail&&!reduced.matches&&detail.animate){
        detail.getAnimations().forEach(function(animation){animation.cancel()});
        detail.animate([{opacity:.25,transform:"translateY(12px)"},{opacity:1,transform:"translateY(0)"}],{duration:640,easing:"cubic-bezier(.16,1,.3,1)"});
      }
    }
    axisButtons.forEach(function(button,index){
      button.addEventListener("click",function(){setSelection(index,true)});
      button.addEventListener("keydown",function(event){
        if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(event.key))return;
        event.preventDefault();
        var next=event.key==="Home"?0:event.key==="End"?axisButtons.length-1:(index+(["ArrowRight","ArrowDown"].includes(event.key)?1:axisButtons.length-1))%axisButtons.length;
        setSelection(next,true);axisButtons[next].focus({preventScroll:true});
      });
    });
    if(rail){
      var pointerStart=null;
      var pointerOrigin=0;
      var moved=false;
      rail.addEventListener("pointerdown",function(event){
        if(event.pointerType!=="mouse"||event.button!==0||rail.scrollWidth<=rail.clientWidth)return;
        pointerStart=event.clientX;
        pointerOrigin=rail.scrollLeft;
        moved=false;
        rail.classList.add("is-dragging");
        rail.setPointerCapture(event.pointerId);
      });
      rail.addEventListener("pointermove",function(event){
        if(pointerStart===null)return;
        var delta=event.clientX-pointerStart;
        if(Math.abs(delta)>4)moved=true;
        if(moved){rail.scrollLeft=pointerOrigin-delta;event.preventDefault()}
      });
      function endDrag(){
        if(pointerStart===null)return;
        pointerStart=null;
        rail.classList.remove("is-dragging");
        if(moved)window.setTimeout(function(){moved=false},0);
      }
      rail.addEventListener("pointerup",endDrag);
      rail.addEventListener("pointercancel",endDrag);
      rail.addEventListener("click",function(event){
        if(moved){event.preventDefault();event.stopPropagation();moved=false}
      },true);
      rail.addEventListener("keydown",function(event){
        if(event.key==="ArrowRight"){rail.scrollLeft=clamp(rail.scrollLeft+180,0,rail.scrollWidth-rail.clientWidth);event.preventDefault()}
        if(event.key==="ArrowLeft"){rail.scrollLeft=clamp(rail.scrollLeft-180,0,rail.scrollWidth-rail.clientWidth);event.preventDefault()}
        if(event.key==="Home"){rail.scrollTo({left:0,behavior:"instant"});event.preventDefault()}
        if(event.key==="End"){rail.scrollTo({left:rail.scrollWidth,behavior:"instant"});event.preventDefault()}
      });
      rail.addEventListener("scroll",requestDraw,{passive:true});
    }
    window.addEventListener("resize",requestDraw,{passive:true});
    var contentReady=Promise.resolve(sourceReady).then(renderTechnologyRail).catch(function(){
      if(root.querySelector(".capability-source-note"))root.querySelector(".capability-source-note").textContent=language==="en"?"Technology list temporarily unavailable.":"기술 목록을 불러오지 못했습니다.";
    });
    refreshSelection();
  }

  function initAxFlow(){
    var root=document.querySelector("[data-ax-platform-flow]");
    if(!root)return;
    var tabs=Array.from(root.querySelectorAll("[data-ax-mode-select]"));
    var capture=root.querySelector("#ax-platform-capture");
    var detail=root.querySelector(".ax-mode-detail");
    var name=detail&&detail.querySelector("[data-ax-mode-name]");
    var copy=detail&&detail.querySelector("[data-ax-mode-copy]");
    var links=detail&&detail.querySelector("[data-ax-mode-services]");
    var modes=[
      {name:"Detect",copy:"위성·영상·센서에서 변화를 포착합니다",copyEn:"Detect change in satellite, video and sensor data",ids:["satellite","news"]},
      {name:"Predict",copy:"AI와 수치모델로 환경 변화와 위험을 예측합니다",copyEn:"Forecast environmental change and risk with AI and numerical models",ids:["flood3d","surge","sealevel","flood-xai"]},
      {name:"Monitor",copy:"관측 상태와 분석 결과를 살펴봅니다",copyEn:"Review observation status and analysis results",ids:["buoy","env","rip"]}
    ];
    var active=0;
    var queued=false;
    var detailTimer=0;
    var changeTimer=0;
    function renderLinks(mode){
      if(!links)return;
      var fragment=document.createDocumentFragment();
      mode.ids.forEach(function(id){
        var row=document.getElementById("platform-"+id);
        var title=row&&row.querySelector(".ax-service-copy h3");
        if(!row||!title)return;
        var anchor=document.createElement("a");
        anchor.href="#"+row.id;
        var label=document.createElement("span");
        label.textContent=title.textContent.trim();
        var arrow=document.createElement("span");
        arrow.setAttribute("aria-hidden","true");
        arrow.textContent="↗";
        anchor.append(label,document.createTextNode(" "),arrow);
        fragment.appendChild(anchor);
      });
      links.replaceChildren(fragment);
    }
    function setMode(index){
      index=clamp(index,0,modes.length-1);
      if(index===active)return;
      active=index;
      var mode=modes[index];
      tabs.forEach(function(tab,i){
        var selected=i===index;
        tab.setAttribute("aria-selected",String(selected));
        tab.tabIndex=selected?0:-1;
      });
      if(detail){
        detail.classList.add("is-changing");
        window.clearTimeout(detailTimer);
        detailTimer=window.setTimeout(function(){
          if(active!==index)return;
          text(name,mode.name);
          text(copy,language==="en"?mode.copyEn:mode.copy);
          renderLinks(mode);
          detail.classList.remove("is-changing");
        },250);
      }
      if(capture){
        capture.classList.add("is-changing");
        window.clearTimeout(changeTimer);
        changeTimer=window.setTimeout(function(){capture.classList.remove("is-changing")},250);
      }
    }
    var staticMode=true;
    if(staticMode)root.classList.add("is-static");
    else root.classList.remove("is-static");
    tabs.forEach(function(tab,index){
      tab.addEventListener("click",function(){
        if(!staticMode){
          var bounds=root.getBoundingClientRect();
          var travel=Math.max(0,root.offsetHeight-window.innerHeight);
          var target=window.scrollY+bounds.top+travel*(index/2);
          window.scrollTo({top:target,behavior:reduced.matches?"instant":"smooth"});
        }
        setMode(index);
      });
      tab.addEventListener("keydown",function(event){
        var next=null;
        if(event.key==="ArrowDown"||event.key==="ArrowRight")next=(index+1)%tabs.length;
        if(event.key==="ArrowUp"||event.key==="ArrowLeft")next=(index+tabs.length-1)%tabs.length;
        if(next!==null){tabs[next].focus();tabs[next].click();event.preventDefault()}
      });
    });
    if(staticMode)return;
    function update(){
      queued=false;
      var bounds=root.getBoundingClientRect();
      var travel=Math.max(1,root.offsetHeight-window.innerHeight);
      var progress=clamp(-bounds.top/travel,0,1);
      setMode(Math.min(modes.length-1,Math.floor(progress*modes.length)));
    }
    function schedule(){if(!queued){queued=true;requestAnimationFrame(update)}}
    window.addEventListener("scroll",schedule,{passive:true});
    window.addEventListener("resize",schedule);
    update();
  }

  function initParallax(){
    var surfaces=Array.from(document.querySelectorAll("[data-parallax-surface]"));
    if(!surfaces.length||reduced.matches||!finePointer.matches)return;
    surfaces.forEach(function(surface){
      surface.addEventListener("pointermove",function(event){
        if(event.pointerType!=="mouse")return;
        var rect=surface.getBoundingClientRect();
        var x=clamp((event.clientX-rect.left)/Math.max(1,rect.width)-.5,-.5,.5);
        var y=clamp((event.clientY-rect.top)/Math.max(1,rect.height)-.5,-.5,.5);
        surface.style.setProperty("--parallax-x",(x*12).toFixed(2)+"px");
        surface.style.setProperty("--parallax-y",(y*12).toFixed(2)+"px");
      });
      surface.addEventListener("pointerleave",function(){
        surface.style.setProperty("--parallax-x","0px");
        surface.style.setProperty("--parallax-y","0px");
      });
    });
    reduced.addEventListener("change",function(event){
      if(event.matches)surfaces.forEach(function(surface){
        surface.style.setProperty("--parallax-x","0px");
        surface.style.setProperty("--parallax-y","0px");
      });
    });
  }

  initResearchFlow();
  initCapabilityField();
  initAxFlow();
  initParallax();
})();
