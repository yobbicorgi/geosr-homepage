/* Native scrolling, progressive motion and accessible document viewing */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const initialHash = location.hash;
  const contentReady = [window.GeoSRCompanyInformationReady,window.GeoSRCompanyHistoryReady,window.GeoSRCredentialsReady].filter(Boolean);
  let userNavigated = false;
  ['pointerdown','wheel','touchstart','keydown'].forEach(type=>addEventListener(type,()=>{userNavigated=true},{once:true,passive:true}));
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
