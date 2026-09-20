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
      list.replaceChildren();
      records.forEach(function(item){list.appendChild(makeTechnologyNode(item.data,item.id))});
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
      ids.slice(0,5).forEach(function(id){
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
          arrow.textContent="↗";
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
      var mediaKey=index===2?"ecology-lab":"pending";
      if(selectedMedia.dataset.mediaKey===mediaKey)return;
      selectedMedia.dataset.mediaKey=mediaKey;
      selectedMedia.classList.add("is-changing");
      selectedMedia.replaceChildren();
      if(index===2){
        var image=document.createElement("img");
        image.src="assets/generated/candidates-v2/flow-lab-ecology-v1.png";
        image.width=2560;
        image.height=1440;
        image.loading="eager";
        image.decoding="async";
        image.alt=language==="en"?"Generated concept image of an unoccupied lab bench; not a GeoSR facility or analytical result.":"사람이 없는 실험대의 생성형 콘셉트 이미지. 실제 GeoSR 시설이나 분석 결과가 아닙니다.";
        selectedMedia.setAttribute("aria-label",image.alt);
        selectedMedia.appendChild(image);
        if(sourceNote)sourceNote.textContent=language==="en"?"Technology titles follow the GeoSR index. Lab image is a generated concept, not a facility or result.":"기술명은 기존 홈페이지 자료에서 확인했습니다. 실험실 이미지는 생성형 콘셉트이며 실제 시설·결과가 아닙니다.";
      }else{
        var pending=document.createElement("span");
        pending.textContent=language==="en"?"CONTENT IN PREPARATION":"콘텐츠 준비 중";
        selectedMedia.setAttribute("aria-label",pending.textContent);
        selectedMedia.appendChild(pending);
        if(sourceNote)sourceNote.textContent=language==="en"?"Technology titles are verified against the existing GeoSR index.":"기술명은 기존 홈페이지 자료에서 확인했습니다.";
      }
      window.requestAnimationFrame(function(){window.requestAnimationFrame(function(){selectedMedia.classList.remove("is-changing")})});
    }
    function refreshSelection(){
      var index=activeIndex();
      renderSelectedMedia(index);
      axisButtons.forEach(function(button,i){
        button.setAttribute("aria-pressed",String(i===index));
        button.classList.toggle("is-preview",preview===i&&i!==selected);
      });
      if(title)title.textContent=axisButtons[index].querySelector(".capability-axis-name").textContent;
      if(summary)summary.textContent=axisButtons[index].dataset.axisSummary||"";
      if(number)number.textContent="0"+(index+1)+" / 05";
      var ids=new Set(groupIds[index]||[]);
      list.querySelectorAll("[data-technology-id]").forEach(function(node){
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
      if(detail){
        detail.classList.add("is-changing");
        window.clearTimeout(pendingTimer);
        pendingTimer=window.setTimeout(function(){detail.classList.remove("is-changing")},450);
      }
      refreshSelection();
    }
    axisButtons.forEach(function(button,index){
      button.addEventListener("click",function(){setSelection(index,true)});
      button.addEventListener("pointerenter",function(event){
        if(event.pointerType==="mouse"){preview=index;setSelection(index,false)}
      });
      button.addEventListener("pointerleave",function(event){
        if(event.pointerType==="mouse"){preview=null;refreshSelection()}
      });
      button.addEventListener("focus",function(){preview=index;refreshSelection()});
      button.addEventListener("blur",function(){
        window.setTimeout(function(){
          if(!root.contains(document.activeElement)){preview=null;refreshSelection()}
        },0);
      });
    });
    if(rail){
      rail.addEventListener("wheel",function(event){
        if(Math.abs(event.deltaY)>Math.abs(event.deltaX)){
          rail.scrollLeft+=event.deltaY;
          event.preventDefault();
        }
      },{passive:false});
      var pointerStart=null;
      var pointerOrigin=0;
      var moved=false;
      rail.addEventListener("pointerdown",function(event){
        if(event.pointerType!=="mouse"||event.button!==0)return;
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
      {name:"Monitor",copy:"관측 상태와 분석 결과를 한 화면에서 관리합니다",copyEn:"Manage observation status and analysis results in one view",ids:["buoy","env","rip"]}
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
    if(reduced.matches||window.innerWidth<=1100){
      root.classList.add("is-static");
      return;
    }
    root.classList.remove("is-static");
    tabs.forEach(function(tab,index){
      tab.addEventListener("click",function(){
        var bounds=root.getBoundingClientRect();
        var travel=Math.max(0,root.offsetHeight-window.innerHeight);
        var target=window.scrollY+bounds.top+travel*(index/2);
        window.scrollTo({top:target,behavior:reduced.matches?"instant":"smooth"});
        setMode(index);
      });
      tab.addEventListener("keydown",function(event){
        var next=null;
        if(event.key==="ArrowDown"||event.key==="ArrowRight")next=(index+1)%tabs.length;
        if(event.key==="ArrowUp"||event.key==="ArrowLeft")next=(index+tabs.length-1)%tabs.length;
        if(next!==null){tabs[next].focus();tabs[next].click();event.preventDefault()}
      });
    });
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
