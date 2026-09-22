/* Small, progressive behaviours for the source-led home and company timeline. */
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const enter=(element,distance=18,delay=0)=>{
  if(!element||reduced.matches||!element.animate)return;
  element.getAnimations().forEach(animation=>animation.cancel());
  element.animate([{opacity:0,translate:`0 ${distance}px`},{opacity:1,translate:'0 0'}],{duration:680,delay,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});
 };
 const tabs=[...document.querySelectorAll('[data-home-field]')];
 if(tabs.length){
  const panels=new Map([...document.querySelectorAll('[data-home-panel]')].map(panel=>[panel.dataset.homePanel,panel]));
  const activate=(tab,focus=false)=>{
   tabs.forEach(item=>{
    const selected=item===tab;
    item.setAttribute('aria-selected',String(selected));
    item.tabIndex=selected?0:-1;
   });
   panels.forEach((panel,id)=>{
    const selected=id===tab.dataset.homeField;
    const changed=panel.hidden===selected;
    panel.hidden=!selected;
    panel.querySelectorAll('[data-film-slot]').forEach(host=>window.GeoSRFilm?.activate?.(host.dataset.filmSlot,selected));
    if(selected&&changed){
     const media=panel.querySelector('.studio-field-media');
     if(media&&!reduced.matches)media.animate([{opacity:.2,clipPath:'inset(0 6% 0 0)',transform:'translateY(12px)'},{opacity:1,clipPath:'inset(0 0 0 0)',transform:'translateY(0)'}],{duration:760,easing:'cubic-bezier(.16,1,.3,1)'});
     enter(panel.querySelector('.studio-field-copy'),24,100);
    }
   });
   document.dispatchEvent(new CustomEvent('geosr:media-updated'));
   if(focus)tab.focus({preventScroll:true});
  };
  tabs.forEach((tab,index)=>{
   tab.addEventListener('click',()=>activate(tab));
   tab.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
    event.preventDefault();
    const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(['ArrowRight','ArrowDown'].includes(event.key)?1:tabs.length-1))%tabs.length;
    activate(tabs[next],true);
   });
  });
 }

 // Documents remain front-facing while their depth responds to native horizontal scrolling.
 const rail=document.querySelector('.credential-rail');
 if(rail){
  let frame=0;
  const update=()=>{
   frame=0;
   const bounds=rail.getBoundingClientRect();
   const flat=reduced.matches||innerWidth<=820;
   const maxScroll=Math.max(0,rail.scrollWidth-rail.clientWidth);
   document.querySelectorAll('[data-paper-step]').forEach(button=>{
    button.disabled=Number(button.dataset.paperStep)<0?rail.scrollLeft<=1:rail.scrollLeft>=maxScroll-1;
   });
   rail.querySelectorAll('.credential-card').forEach(card=>{
    const rect=card.getBoundingClientRect();
    const offset=Math.max(-1,Math.min(1,(rect.left+rect.width/2-bounds.left-bounds.width/2)/(bounds.width/2)));
    card.style.setProperty('--paper-angle',`${flat?0:-offset*12}deg`);
    card.style.setProperty('--paper-scale',String(flat?1:1-Math.abs(offset)*.035));
   });
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  rail.addEventListener('scroll',schedule,{passive:true});
  document.querySelectorAll('[data-paper-step]').forEach(button=>button.addEventListener('click',()=>{
   const step=(rail.querySelector('.credential-card')?.getBoundingClientRect().width||220)+parseFloat(getComputedStyle(rail).columnGap||0);
   rail.scrollBy({left:Number(button.dataset.paperStep)*step,behavior:reduced.matches?'instant':'smooth'});
  }));
  addEventListener('resize',schedule,{passive:true});
  reduced.addEventListener('change',schedule);
  new MutationObserver(schedule).observe(rail,{childList:true});
  schedule();
 }

 // Content is always present; entrance animations are a progressive enhancement only.
 if('IntersectionObserver'in window){
  const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   enter(entry.target,22);
   reveal.unobserve(entry.target);
  }),{threshold:.1});
  document.querySelectorAll('.studio-project-record,.studio-platform-panel,.studio-news-list,.company-story-block,.equipment-card').forEach(item=>reveal.observe(item));
 }

 const milestones=[...document.querySelectorAll('[data-company-year]')];
 const companyNav=document.querySelector('.company-anchor-nav');
 if(companyNav){
  const items=[...companyNav.querySelectorAll('a[href^="#"]')].map(link=>({link,target:document.querySelector(link.getAttribute('href'))})).filter(item=>item.target);
  let navFrame=0;
  const markCurrent=()=>{
   navFrame=0;
   const navStyle=getComputedStyle(companyNav);
   const edge=Math.max((parseFloat(navStyle.top)||0)+companyNav.offsetHeight+48,innerHeight*.3);
   let current=items[0];
   items.forEach(item=>{if(item.target.getBoundingClientRect().top<=edge)current=item});
   items.forEach(item=>{if(item===current)item.link.setAttribute('aria-current','location');else item.link.removeAttribute('aria-current')});
  };
  const scheduleNav=()=>{if(!navFrame)navFrame=requestAnimationFrame(markCurrent)};
  addEventListener('scroll',scheduleNav,{passive:true});addEventListener('resize',scheduleNav,{passive:true});scheduleNav();
 }
 if(milestones.length&&'IntersectionObserver'in window){
  const observer=new IntersectionObserver(entries=>{
   const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top-innerHeight*.42)-Math.abs(b.boundingClientRect.top-innerHeight*.42))[0];
   if(!visible)return;
   milestones.forEach(item=>item.classList.toggle('is-current',item===visible.target));
  },{rootMargin:'-35% 0px -45% 0px',threshold:.1});
  milestones.forEach(item=>observer.observe(item));
 }
})();
