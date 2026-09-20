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
    const categoryOf=record=>record.id.includes('patent')?'patent':record.id.includes('registration')?'license':'cert';
    const categoryNames={cert:T('인증','Certification'),license:T('면허·등록','Registration'),patent:T('지식재산권','Intellectual property')};
    const dialog=document.querySelector('#credential-dialog');
    const stageTitle=document.querySelector('[data-credential-stage-title]');
    const stageStatus=document.querySelector('[data-credential-status]');
    let category='cert',returnFocus=null,changingCategory=false;
    function attachDocumentEvents(){
      rail.querySelectorAll('[data-document]').forEach(card=>card.addEventListener('click',()=>{
        const record=records[Number(card.dataset.document)];returnFocus=card;
        dialog.querySelector('h2').textContent=T(record.title,record.titleEn||translations[record.id]||record.title);
        const preview=dialog.querySelector('img');
        const sourceLink=dialog.querySelector('.document-modal-foot a');
        const footnote=dialog.querySelector('.document-modal-foot p');
        if(record.previewStatus==='review'){
          preview.hidden=true;preview.removeAttribute('src');preview.alt='';
          footnote.textContent=T('개인정보 검토를 위해 문서 이미지를 공개하지 않습니다','Document image withheld pending personal-information review');
          sourceLink.hidden=true;sourceLink.removeAttribute('href');
        }else{
          preview.hidden=false;preview.src=record.image;preview.alt=record.title;
          footnote.textContent=T('기존 홈페이지에 공개된 자료의 사본','A copy of the record published on the original website');
          sourceLink.hidden=false;sourceLink.href=record.image;
        }
        dialog.showModal();document.body.style.overflow='hidden';
      }));
    }
    function renderCredentialGroup(){
      const visible=records.map((record,index)=>({...record,index})).filter(record=>categoryOf(record)===category);
      stageTitle.textContent=categoryNames[category];
      stageStatus.textContent=String(visible.length).padStart(2,'0');
      rail.dataset.category=category;
      rail.innerHTML=visible.map((record,index)=>`<button type="button" class="credential-card" data-document="${record.index}" aria-label="${E(T(record.title,record.titleEn||translations[record.id]||record.title))} — ${T('확대 보기','enlarge')}"><span class="credential-card-index">0${index+1} / ${E(T(record.classification,record.classificationEn))}</span><span class="credential-paper">${record.previewStatus==='review'?`<span class="credential-review-slate"><strong>${T('이미지 검토 중','PREVIEW UNDER REVIEW')}</strong><small>${T('개인정보 확인 전까지 공개하지 않습니다','WITHHELD PENDING PRIVACY REVIEW')}</small></span>`:`<img src="${E(record.image)}" alt="${E(record.title)}" loading="lazy" draggable="false">`}</span><span class="credential-label"><strong>${E(T(record.title,record.titleEn||translations[record.id]||record.title))}</strong><small>${T('자료 확대','Enlarge document')}</small></span></button>`).join('');
      attachDocumentEvents();
      if(!reduced.matches){
        stageTitle.animate([{opacity:0,transform:'translate3d(0,6px,0)'},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:420,easing:'cubic-bezier(.16,1,.3,1)'});
        stageStatus.animate([{opacity:0,transform:'translate3d(0,4px,0)'},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:360,delay:55,easing:'cubic-bezier(.16,1,.3,1)'});
        rail.querySelectorAll('.credential-card').forEach((card,index)=>card.animate([{opacity:0,transform:'translate3d(0,24px,0) scale(.97)'},{opacity:1,transform:'translate3d(0,0,0) scale(1)'}],{duration:620,delay:index*90,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'}));
      }
    }
    const categoryTabs=[...document.querySelectorAll('[data-credential-category]')];
    const categoryPanel=document.querySelector('#credential-stage');
    function activateCategory(button){
      if(changingCategory)return;
      const next=button.dataset.credentialCategory;
      categoryTabs.forEach(tab=>{const selected=tab===button;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1});
      categoryPanel?.setAttribute('aria-labelledby',button.id);
      if(next===category)return;
      changingCategory=true;
      const update=()=>{rail.getAnimations().forEach(animation=>animation.cancel());category=next;renderCredentialGroup();changingCategory=false};
      if(reduced.matches){update();return}
      const leave=rail.animate([{opacity:1,transform:'translate3d(0,0,0)',filter:'blur(0)'},{opacity:0,transform:'translate3d(0,-8px,0) scale(.99)',filter:'blur(2px)'}],{duration:180,easing:'cubic-bezier(.4,0,1,1)',fill:'both'});
      leave.finished.catch(()=>{}).then(update);
    }
    categoryTabs.forEach((button,index)=>{
      button.addEventListener('click',()=>activateCategory(button));
      button.addEventListener('keydown',event=>{
        if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
        event.preventDefault();if(changingCategory)return;
        const next=event.key==='Home'?0:event.key==='End'?categoryTabs.length-1:(index+(event.key==='ArrowRight'?1:categoryTabs.length-1))%categoryTabs.length;
        categoryTabs[next].focus();activateCategory(categoryTabs[next]);
      });
    });
    rail.addEventListener('keydown',event=>{
      const cards=[...rail.querySelectorAll('.credential-card')];if(!cards.length)return;
      const current=Math.max(0,cards.indexOf(document.activeElement));
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();
      const next=event.key==='Home'?0:event.key==='End'?cards.length-1:Math.max(0,Math.min(cards.length-1,current+(event.key==='ArrowRight'?1:-1)));
      cards[next].focus();
    });
    dialog.querySelector('[data-close-document]').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close()}});
    dialog.addEventListener('close',()=>{document.body.style.overflow='';returnFocus?.focus({preventScroll:true})});
    renderCredentialGroup();
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
      library.innerHTML=found.map(r=>`<button type="button" class="library-document" data-library-document="${r.index}" aria-label="${E(T(r.title,r.titleEn))} — ${T('자료 확대','enlarge document')}"><span><img src="${E(r.image)}" alt="" loading="lazy"></span><small>${E(T(r.classification,r.classificationEn))}</small><strong>${E(T(r.title,r.titleEn))}</strong></button>`).join('')+(term?(found.length?'':`<p class="library-empty">${T('검색 결과가 없습니다','No matching records')}</p>`):`<div class="library-placeholder"><span aria-hidden="true">+</span><strong>${T('추가 자료 확인 중','Additional records')}</strong><small>${T('그 밖의 자료는 원문을 확인한 뒤 추가하겠습니다.','Additional records will be checked during migration.')}</small></div>`);
      const dialog=document.querySelector('#credential-dialog');
      library.querySelectorAll('[data-library-document]').forEach(button=>button.addEventListener('click',()=>{
        const record=records[Number(button.dataset.libraryDocument)];
        dialog.querySelector('h2').textContent=T(record.title,record.titleEn);
        const preview=dialog.querySelector('img'),link=dialog.querySelector('.document-modal-foot a'),footnote=dialog.querySelector('.document-modal-foot p');
        let reviewNote=dialog.querySelector('.document-review-note');if(!reviewNote){reviewNote=document.createElement('p');reviewNote.className='document-review-note';preview.after(reviewNote)}
        if(record.previewStatus==='review'){preview.hidden=true;preview.removeAttribute('src');preview.alt='';reviewNote.hidden=false;reviewNote.textContent=T('개인정보 검토를 위해 문서 이미지를 공개하지 않습니다. 검토 중입니다.','Document image withheld pending personal-information review.');footnote.textContent=T('개인정보 검토 중 · 문서 이미지 비공개','PRIVACY REVIEW · IMAGE WITHHELD');link.hidden=true;link.removeAttribute('href')}else{preview.hidden=false;preview.src=record.image;preview.alt=record.title;reviewNote.hidden=true;footnote.textContent=T('기존 홈페이지에 공개된 자료의 사본','A copy of the record published on the original website');link.hidden=false;link.href=record.image}
        dialog.addEventListener('close',()=>button.focus({preventScroll:true}),{once:true});
        dialog.showModal();document.body.style.overflow='hidden';
      }));
      if(!dialog.dataset.libraryEvents){
        dialog.dataset.libraryEvents='true';
        dialog.querySelector('[data-close-document]').addEventListener('click',()=>dialog.close());
        dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close()}});
        dialog.addEventListener('close',()=>{document.body.style.overflow=''},{once:false});
      }
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
