/* GeoSR's full published credential set as a document gallery. */
(() => {
  'use strict';
  const root=document.querySelector('.credential-gallery');
  if(!root)return;
  const en=new URLSearchParams(location.search).get('lang')==='en';
  const t=(ko,english)=>en?english:ko;
  const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const categories=[['all','전체','All'],['certification','인증','Certification'],['registration','면허·등록','Registration'],['intellectual-property','지식재산권','Intellectual property']];
  const label=category=>t(...categories.find(([key])=>key===category).slice(1));
  const results=root.querySelector('.credential-gallery-results');
  const tabs=root.querySelector('.credential-gallery-tabs');
  const input=root.querySelector('#credential-index-query');
  const dialog=root.querySelector('.credential-gallery-dialog');
  const pageSize=matchMedia('(max-width:700px)').matches?6:10;
  let records=[],category='all',query='',limit=pageSize,returnFocus=null;
  const read=async path=>{const response=await fetch(path);if(!response.ok)throw Error(String(response.status));return response.json()};
  window.GeoSRCredentialsReady=Promise.all([read('credentials-index.json'),en?read('credentials-translations.en.json'):null]).then(([data,translation])=>{
    const titles=new Map((translation?.records||[]).map(item=>[item.id,item]));
    records=data.records.map(record=>{const reviewed=titles.get(record.id);return {...record,sourceTitle:record.title,title:reviewed?.sourceTitle===record.title?reviewed.title:record.title}});
    const counts=Object.fromEntries(categories.map(([key])=>[key,key==='all'?records.length:records.filter(record=>record.category===key).length]));
    tabs.innerHTML=categories.map(([key,ko,english])=>`<button type="button" data-credential-category="${key}" aria-pressed="${key===category}">${t(ko,english)} <span>${counts[key]}</span></button>`).join('');
    render();
  }).catch(()=>{results.textContent=t('문서를 불러오지 못했습니다','Could not load documents')});
  const matches=()=>records.map((record,index)=>({...record,index})).filter(record=>(category==='all'||record.category===category)&&`${record.title} ${record.sourceTitle}`.toLocaleLowerCase().includes(query));
  function render(){
    const found=matches();
    tabs.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.credentialCategory===category)));
    root.querySelector('.credential-gallery-count').textContent=t(`${found.length}건의 문서`,` ${found.length} documents`);
    results.innerHTML=`<div class="credential-gallery-grid">${found.slice(0,limit).map(({title,category,image,previewStatus,index},order)=>{
      const frame=image?`<img src="${escape(image)}" alt="" loading="lazy" decoding="async">`:`<span class="credential-gallery-review">${t('이미지 검토 중','PREVIEW UNDER REVIEW')}</span>`;
      const content=`<span class="credential-gallery-frame">${frame}</span><span class="credential-gallery-type">${escape(label(category))} / ${String(index+1).padStart(3,'0')}</span><strong>${escape(title)}</strong>`;
      return image?`<button type="button" class="credential-gallery-card" data-credential-document="${index}" aria-label="${escape(title)} — ${t('문서 확대','enlarge document')}">${content}</button>`:`<div class="credential-gallery-card is-review" aria-label="${escape(title)} — ${t('이미지 검토 중','image under review')}">${content}</div>`;
    }).join('')}</div>${limit<found.length?`<button class="credential-gallery-more" type="button" data-credential-more>${t('문서 더 보기','Show more documents')} <span>${limit} / ${found.length}</span> ↓</button>`:''}`;
  }
  tabs.addEventListener('click',event=>{const button=event.target.closest('[data-credential-category]');if(!button)return;category=button.dataset.credentialCategory;limit=pageSize;render()});
  input.addEventListener('input',()=>{query=input.value.trim().toLocaleLowerCase();limit=pageSize;render()});
  results.addEventListener('click',event=>{
    const more=event.target.closest('[data-credential-more]');
    if(more){limit+=pageSize;render();return}
    const card=event.target.closest('[data-credential-document]');if(!card)return;
    const record=records[Number(card.dataset.credentialDocument)];if(!record?.image)return;
    returnFocus=card;
    dialog.querySelector('h2').textContent=record.title;
    const image=dialog.querySelector('img');image.src=record.image;image.alt=record.title;
    dialog.showModal();
  });
  dialog.querySelector('[data-credential-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  dialog.addEventListener('close',()=>returnFocus?.focus({preventScroll:true}));
})();
