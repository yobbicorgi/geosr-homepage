/* Small, progressive behaviours for the source-led home and company timeline. */
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const compact=matchMedia('(max-width: 700px)');
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
   if(focus){
    tab.focus({preventScroll:true});
    const strip=tab.parentElement,box=tab.getBoundingClientRect(),edge=strip.getBoundingClientRect();
    if(box.left<edge.left||box.right>edge.right)strip.scrollBy({left:box.left<edge.left?box.left-edge.left:box.right-edge.right,behavior:reduced.matches?'instant':'smooth'});
   }
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

 // Independent products share an overview stage, while retaining separate destinations.
 const products=document.querySelector('[data-product-showcase]');
 if(products){
  const choices=[...products.querySelectorAll('[data-product-tab]')];
  const selectProduct=(button,focus=false)=>{
   choices.forEach(choice=>{const selected=choice===button;choice.setAttribute('aria-selected',String(selected));choice.tabIndex=selected?0:-1});
   products.querySelectorAll('[data-product-panel]').forEach(panel=>{
    const selected=panel.dataset.productPanel===button.dataset.productTab;
    panel.hidden=!selected;
    panel.querySelectorAll('[data-film-slot]').forEach(host=>window.GeoSRFilm?.activate?.(host.dataset.filmSlot,selected));
    if(selected)enter(panel,16);
   });
   document.dispatchEvent(new CustomEvent('geosr:media-updated'));
   if(focus)button.focus({preventScroll:true});
  };
  choices.forEach((button,i)=>{
   button.addEventListener('click',()=>selectProduct(button));
   button.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();selectProduct(choices[event.key==='Home'?0:event.key==='End'?choices.length-1:(i+1)%choices.length],true)});
  });
 }

 // Mobile starts with summaries; opening a section reveals the same source-backed content.
 const credentialToggle=document.querySelector('[data-credentials-toggle]');
 let credentialsExpanded=false;
 const syncCompactContent=()=>{
  if(credentialToggle){
   const collapsed=compact.matches&&!credentialsExpanded;
   for(const id of credentialToggle.getAttribute('aria-controls').split(' '))document.getElementById(id).hidden=collapsed;
   credentialToggle.setAttribute('aria-expanded',String(!collapsed));
   credentialToggle.querySelector('span').textContent=collapsed?'+':'−';
  }
  document.querySelectorAll('[data-responsive-disclosure]').forEach(item=>{if(!item.dataset.userOpened)item.open=!compact.matches});
 };
 credentialToggle?.addEventListener('click',()=>{credentialsExpanded=!credentialsExpanded;const collapsed=!credentialsExpanded;for(const id of credentialToggle.getAttribute('aria-controls').split(' '))document.getElementById(id).hidden=collapsed;credentialToggle.setAttribute('aria-expanded',String(!collapsed));credentialToggle.querySelector('span').textContent=collapsed?'+':'−'});
 compact.addEventListener('change',syncCompactContent);
 syncCompactContent();
 document.querySelectorAll('[data-responsive-disclosure]>summary').forEach(summary=>summary.addEventListener('click',()=>{summary.parentElement.dataset.userOpened='true'}));

 const companyAtlas=document.querySelector('[data-company-atlas]');
 if(companyAtlas){
  const buttons=[...companyAtlas.querySelectorAll('[data-company-field]')],select=companyAtlas.querySelector('[data-company-field-select]');
  const showField=(index,focus=false)=>{
   buttons.forEach((button,i)=>{button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1});
   companyAtlas.querySelectorAll('[data-company-panel]').forEach((panel,i)=>{panel.hidden=i!==index;if(i===index){enter(panel.querySelector('figure'),12);enter(panel.querySelector('.company-science-copy'),10,70)}});
   select.value=String(index);if(focus)buttons[index].focus({preventScroll:true});
  };
  buttons.forEach((button,index)=>{button.addEventListener('click',()=>showField(index));button.addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;event.preventDefault();showField(event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowDown'?1:buttons.length-1))%buttons.length,true)})});
  select.addEventListener('change',()=>showField(Number(select.value)));
 }

 // A user-controlled research deck shares one stage without hiding source links in a timer.
 const deck=document.querySelector('[data-case-deck]');
 if(deck){
  const cards=[...deck.querySelectorAll('[data-case-card]')],buttons=[...deck.querySelectorAll('[data-case-tab]')];let active=0;
  const select=(index,focus=false)=>{
   active=(index+cards.length)%cards.length;
   cards.forEach((card,i)=>{card.dataset.position=String((i-active+cards.length)%cards.length);card.inert=i!==active;card.setAttribute('aria-hidden',String(i!==active))});
   buttons.forEach((button,i)=>{button.setAttribute('aria-selected',String(i===active));button.tabIndex=i===active?0:-1});
   deck.querySelector('[data-case-status]').textContent=`${String(active+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
   if(focus)buttons[active].focus({preventScroll:true});
  };
  buttons.forEach((button,i)=>{
   button.addEventListener('click',()=>select(i));
   button.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();select(event.key==='Home'?0:event.key==='End'?cards.length-1:active+(event.key==='ArrowRight'?1:-1),true)});
  });
  deck.querySelectorAll('[data-case-step]').forEach(button=>button.addEventListener('click',()=>select(active+Number(button.dataset.caseStep))));
  const surface=deck.querySelector('.research-deck-stage');let touchStart=null;
  surface.addEventListener('pointerdown',event=>{if(compact.matches&&event.pointerType==='touch')touchStart={x:event.clientX,y:event.clientY}});
  surface.addEventListener('pointercancel',()=>{touchStart=null});
  surface.addEventListener('pointerup',event=>{if(!touchStart)return;const dx=event.clientX-touchStart.x,dy=event.clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)select(active+(dx<0?1:-1))});
  select(0);
 }

 // Documents keep their front face; selection changes their angle, height and emphasis.
 const rail=document.querySelector('.credential-rail');
 if(rail){
  let frame=0,activePaper=0;
  const update=()=>{
   frame=0;
   const flat=reduced.matches||innerWidth<=820;
   const cards=[...rail.querySelectorAll('.credential-card')];
   activePaper=Math.min(activePaper,Math.max(0,cards.length-1));
   document.querySelectorAll('[data-paper-step]').forEach(button=>{
    button.disabled=Number(button.dataset.paperStep)<0?activePaper===0:activePaper===cards.length-1;
   });
   const status=document.querySelector('[data-credential-status]');
   if(status)status.textContent=`${String(activePaper+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
   cards.forEach((card,index)=>{
    const offset=index-activePaper;
    card.style.setProperty('--paper-angle',`${flat?0:Math.max(-22,Math.min(22,-offset*18))}deg`);
    card.style.setProperty('--paper-scale',String(flat||offset===0?1:.93));
    card.style.setProperty('--paper-rise',`${flat||offset===0?0:14}px`);
    card.style.setProperty('--paper-opacity',String(flat||offset===0?1:.72));
   });
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  rail.addEventListener('scroll',()=>{
   if(rail.scrollWidth<=rail.clientWidth+1)return;
   const edge=rail.getBoundingClientRect();let distance=Infinity;
   rail.querySelectorAll('.credential-card').forEach((card,index)=>{const r=card.getBoundingClientRect(),d=Math.abs(r.left+r.width/2-edge.left-edge.width/2);if(d<distance){distance=d;activePaper=index}});
   schedule();
  },{passive:true});
  rail.addEventListener('focusin',event=>{const cards=[...rail.querySelectorAll('.credential-card')],index=cards.indexOf(event.target.closest('.credential-card'));if(index>=0){activePaper=index;schedule()}});
  document.querySelectorAll('[data-paper-step]').forEach(button=>button.addEventListener('click',()=>{
   const cards=[...rail.querySelectorAll('.credential-card')];
   activePaper=Math.max(0,Math.min(cards.length-1,activePaper+Number(button.dataset.paperStep)));
   const card=cards[activePaper];if(!card)return;
   const rect=card.getBoundingClientRect(),edge=rail.getBoundingClientRect();
   rail.scrollBy({left:rect.left+rect.width/2-edge.left-edge.width/2,behavior:reduced.matches?'instant':'smooth'});schedule();
  }));
  addEventListener('resize',schedule,{passive:true});
  reduced.addEventListener('change',schedule);
  new MutationObserver(()=>{activePaper=0;rail.scrollLeft=0;schedule()}).observe(rail,{childList:true});
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
