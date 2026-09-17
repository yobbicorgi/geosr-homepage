/* Native scrolling, progressive motion and accessible document viewing */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const initialHash = location.hash;
  const contentReady = [];
  let userNavigated = false;
  ['pointerdown','wheel','touchstart','keydown'].forEach(type=>addEventListener(type,()=>{userNavigated=true},{once:true,passive:true}));
  const tabs = [...document.querySelectorAll('[data-expertise]')];
  const panel = document.querySelector('#expertise-panel');
  function selectExpertise(index, focus = false) {
    if (!panel) return;
    tabs.forEach((tab,i) => {tab.setAttribute('aria-selected',i===index);tab.tabIndex=i===index?0:-1});
    panel.innerHTML=expertisePanel(index);
    panel.setAttribute('aria-labelledby',`expertise-tab-${index}`);
    panel.getAnimations().forEach(animation=>animation.cancel());
    if(!reduced.matches) panel.animate([{opacity:.25,translate:'0 10px'},{opacity:1,translate:'0 0'}],{duration:430,easing:'cubic-bezier(.2,.6,.3,1)'});
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab,index) => {
    tab.addEventListener('click',()=>selectExpertise(index));
    tab.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();
      const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:tabs.length-1))%tabs.length;
      selectExpertise(next,true);
    });
  });

  const rail=document.querySelector('.credential-rail');
  const credentialRecords = rail || document.querySelector('.credential-grid') ? fetch('credentials.json').then(response=>{if(!response.ok)throw Error('Documents unavailable');return response.json()}) : Promise.resolve([]);
  if (rail) contentReady.push(credentialRecords.then(records=>{
    const translations={
      'credential-certification-iso9001':'Quality management system — ISO 9001',
      'credential-certification-venture-20240817':'Venture enterprise certificate',
      'credential-registration-hydrographic-survey-20230725':'Hydrographic survey business registration',
      'credential-registration-weather-business-20230718':'Meteorological business registration'
    };
    rail.innerHTML=records.map((record,index)=>`<button type="button" class="credential-card" data-document="${index}" aria-label="${E(T(record.title,record.titleEn||translations[record.id]||record.title))} — ${T('확대 보기','enlarge')} "><span class="credential-paper"><img src="${E(record.image)}" alt="${E(record.title)}" loading="lazy" draggable="false"></span><span class="credential-label"><small>${String(index+1).padStart(2,'0')} / ${E(T(record.classification,record.classificationEn))}</small><strong>${E(T(record.title,record.titleEn||translations[record.id]||record.title))}</strong></span></button>`).join('');
    const cards=[...rail.querySelectorAll('.credential-card')];
    const status=document.querySelector('#credential-status');
    const dialog=document.querySelector('#credential-dialog');
    let active=0,frame=0,returnFocus=null,moved=false;
    rail.style.position='relative';
    function updateGallery(){
      frame=0;
      const midpoint=rail.scrollLeft+rail.clientWidth/2;
      let distance=Infinity;
      cards.forEach((card,index)=>{
        const delta=(card.offsetLeft+card.offsetWidth/2-midpoint)/(rail.clientWidth*.48);
        const bounded=Math.max(-1,Math.min(1,delta));
        const abs=Math.abs(bounded);
        card.style.setProperty('--turn',`${-bounded*28}deg`);
        card.style.setProperty('--rise',`${abs*19}px`);
        card.style.setProperty('--size',String(1-abs*.10));
        card.style.setProperty('--opacity',String(1-abs*.22));
        if(Math.abs(delta)<distance){distance=Math.abs(delta);active=index}
      });
      status.textContent=`${String(active+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
    }
    function schedule(){if(!frame)frame=requestAnimationFrame(updateGallery)}
    function moveTo(index,instant=false){
      const card=cards[Math.max(0,Math.min(cards.length-1,index))];
      rail.scrollTo({left:card.offsetLeft-(rail.clientWidth-card.offsetWidth)/2,behavior:instant||reduced.matches?'instant':'smooth'});
      schedule();
    }
    rail.addEventListener('scroll',schedule,{passive:true});
    new ResizeObserver(schedule).observe(rail);
    reduced.addEventListener('change',schedule);
    document.querySelectorAll('[data-gallery-step]').forEach(button=>button.addEventListener('click',()=>moveTo((active+Number(button.dataset.galleryStep)+cards.length)%cards.length)));
    rail.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();
      const next=event.key==='Home'?0:event.key==='End'?cards.length-1:Math.max(0,Math.min(cards.length-1,active+(event.key==='ArrowRight'?1:-1)));
      moveTo(next);cards[next].focus({preventScroll:true});
    });
    let pointer=null,startX=0,startScroll=0;
    rail.addEventListener('pointerdown',event=>{
      if(event.pointerType!=='mouse'||event.button!==0)return;
      pointer=event.pointerId;startX=event.clientX;startScroll=rail.scrollLeft;moved=false;
    });
    rail.addEventListener('pointermove',event=>{
      if(pointer!==event.pointerId)return;
      if(Math.abs(event.clientX-startX)>5){moved=true;rail.classList.add('dragging');rail.setPointerCapture(pointer);rail.scrollLeft=startScroll-(event.clientX-startX)}
    });
    function endDrag(){pointer=null;rail.classList.remove('dragging');if(moved)moveTo(active)}
    rail.addEventListener('pointerup',endDrag);rail.addEventListener('pointercancel',endDrag);
    cards.forEach((card,index)=>card.addEventListener('click',event=>{
      if(moved){event.preventDefault();moved=false;return}
      const record=records[index];returnFocus=card;
      dialog.querySelector('h2').textContent=T(record.title,record.titleEn||translations[record.id]||record.title);
      const preview=dialog.querySelector('img');preview.src=record.image;preview.alt=record.title;
      dialog.querySelector('.document-modal-foot a').href=record.image;
      dialog.showModal();document.body.style.overflow='hidden';
    }));
    dialog.querySelector('[data-close-document]').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
    dialog.addEventListener('close',()=>{document.body.style.overflow='';returnFocus?.focus({preventScroll:true})});
    requestAnimationFrame(()=>moveTo(Math.min(3,cards.length-1),true));
  }).catch(()=>{rail.innerHTML=`<p>${T('자료를 불러오지 못했습니다','Documents could not be loaded')} <a href="${U('company')}#credential-library">${T('자료 모음 보기','View document collection')} ↗</a></p>`}));

  const library=document.querySelector('.credential-grid');
  if(library)contentReady.push(credentialRecords.then(records=>{
    let category='all';
    const query=document.querySelector('#credential-query');
    const categoryOf=r=>r.id.includes('patent')?'patent':r.id.includes('registration')?'license':'cert';
    function renderLibrary(){
      const term=query.value.trim().toLocaleLowerCase();
      const found=records.map((r,index)=>({...r,index})).filter(r=>(category==='all'||categoryOf(r)===category)&&`${r.title} ${r.titleEn}`.toLocaleLowerCase().includes(term));
      document.querySelector('.library-count').textContent=T(`대표 자료 ${found.length}건`,`Representative records: ${found.length}`);
      library.innerHTML=found.map(r=>`<button type="button" class="library-document" data-library-document="${r.index}"><span><img src="${E(r.image)}" alt="" loading="lazy"></span><small>${E(T(r.classification,r.classificationEn))}</small><strong>${E(T(r.title,r.titleEn))}</strong><i>↗</i></button>`).join('')+(term?(found.length?'':`<p class="library-empty">${T('검색 결과가 없습니다','No matching records')}</p>`):`<div class="library-placeholder"><span aria-hidden="true">+</span><strong>${T('추가 자료 자리','Additional records')}</strong><small>${T('목업 · 전체 자료 이관 예정','PLACEHOLDER · FULL COLLECTION TO FOLLOW')}</small></div>`);
      library.querySelectorAll('[data-library-document]').forEach(button=>button.addEventListener('click',()=>{
        const original=document.querySelector(`[data-document="${button.dataset.libraryDocument}"]`);
        if(original){original.click();document.querySelector('#credential-dialog').addEventListener('close',()=>button.focus({preventScroll:true}),{once:true})}
      }));
    }
    document.querySelectorAll('[data-credential-category]').forEach(button=>button.addEventListener('click',()=>{
      category=button.dataset.credentialCategory;
      document.querySelectorAll('[data-credential-category]').forEach(b=>b.setAttribute('aria-pressed',b===button));
      renderLibrary();
    }));
    query.addEventListener('input',renderLibrary);renderLibrary();
  }).catch(()=>{library.textContent=T('자료를 불러오지 못했습니다','The collection could not be loaded')}));

  // Restore deep links once asynchronous content and font metrics are ready
  // Never override a visitor who has already started navigating
  if(initialHash) Promise.allSettled([...contentReady,document.fonts.ready]).then(()=>requestAnimationFrame(()=>{
    if(userNavigated || location.hash!==initialHash)return;
    let id;try{id=decodeURIComponent(initialHash.slice(1))}catch{return}
    document.getElementById(id)?.scrollIntoView({behavior:'instant',block:'start'});
  }));

  // Real capture previews load only on demand and stop outside the viewport
  const previews=[...document.querySelectorAll('.feature-video')];
  const visible=new Set(),manuallyPaused=new Set();
  const buttonFor=video=>video.closest('.platform-preview').querySelector('[data-video-toggle]');
  function syncButton(video){const button=buttonFor(video);button.textContent=video.paused?'▶':'Ⅱ';button.setAttribute('aria-label',`${video.getAttribute('aria-label')} — ${video.paused?T('재생','Play'):T('일시정지','Pause')}`);button.setAttribute('aria-pressed',String(!video.paused))}
  function play(video){if(!video.src)video.src=video.dataset.videoSrc;video.play().then(()=>syncButton(video)).catch(()=>syncButton(video))}
  const autoAllowed=()=>!reduced.matches&&!navigator.connection?.saveData&&!document.hidden;
  const videoObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    const video=entry.target;
    if(entry.isIntersecting){visible.add(video);if(autoAllowed()&&!manuallyPaused.has(video))play(video)}else{visible.delete(video);video.pause()}
  }),{threshold:.35});
  previews.forEach(video=>{
    videoObserver.observe(video);syncButton(video);
    video.addEventListener('play',()=>syncButton(video));video.addEventListener('pause',()=>syncButton(video));
    buttonFor(video).addEventListener('click',()=>{if(video.paused){manuallyPaused.delete(video);play(video)}else{manuallyPaused.add(video);video.pause()}});
  });
  document.addEventListener('visibilitychange',()=>previews.forEach(video=>{if(document.hidden)video.pause();else if(visible.has(video)&&autoAllowed()&&!manuallyPaused.has(video))play(video)}));
  reduced.addEventListener('change',()=>previews.forEach(video=>{if(reduced.matches)video.pause();else if(visible.has(video)&&autoAllowed()&&!manuallyPaused.has(video))play(video)}));

  // Headings reveal once without hiding navigable content or hijacking scroll
  if(!reduced.matches){
    const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.animate([{opacity:.45,translate:'0 26px'},{opacity:1,translate:'0 0'}],{duration:850,easing:'cubic-bezier(.16,1,.3,1)'});
      reveal.unobserve(entry.target);
    }),{threshold:.25});
    document.querySelectorAll('.intro-editorial h2,.platform-heading h2,.credential-intro h2,.research-title-row h2,.contact-statement h2').forEach(el=>reveal.observe(el));
  }
})();
