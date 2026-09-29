/* Complete published chronology, grouped by period without illustrative scenery. */
(() => {
  const root=document.querySelector('[data-company-history]');if(!root)return;
  const en=new URLSearchParams(location.search).get('lang')==='en';
  const t=(ko,english)=>en?english:ko;
  const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const read=url=>fetch(url).then(response=>{if(!response.ok)throw Error(String(response.status));return response.json()});
  window.GeoSRCompanyHistoryReady=Promise.all([read('source-archive.json'),en?read('company-translations.en.json').catch(()=>null):null]).then(([{records},review])=>{
    const source=records.find(record=>record.id==='ko-company-aboutUs-page-e590a22c61');if(!source)throw Error('Company history record unavailable');
    const translations=review?.sourceTextSha256===source.sourceTextSha256?review.history:[];
    let untranslated=false;
    const history=source.text.split('\n2026\n')[1]?.split('\n목표 및 사명')[0];if(!history)throw Error('Company history text unavailable');
    const years=[{year:'2026',events:[]}];let month='';
    for(const line of history.split('\n').map(value=>value.trim()).filter(Boolean)){
      if(/^(?:19|20)\d{2}$/.test(line)){years.push({year:line,events:[]});month='';continue}
      const match=line.match(/^(0[1-9]|1[0-2])(.+)$/);if(match)month=match[1];
      const title=match?match[2].trim():line;if(title)years.at(-1).events.push({month,title});
    }
    const populated=years.filter(entry=>entry.events.length);
    if(en)populated.forEach(entry=>entry.events.forEach(event=>{
      const translated=translations.find(item=>item.year===entry.year&&item.month===event.month&&item.sourceTitle===event.title);
      if(translated)event.title=translated.title;else untranslated=true;
    }));
    const eras=[
      {start:2016,end:Infinity,ko:'2016 — 현재',en:'2016 — present'},
      {start:2011,end:2015,ko:'2011 — 2015',en:'2011 — 2015'},
      {start:2006,end:2010,ko:'2006 — 2010',en:'2006 — 2010'},
      {start:2000,end:2005,ko:'2000 — 2005',en:'2000 — 2005'}
    ];
    const eraFor=year=>eras.findIndex(period=>Number(year)>=period.start&&Number(year)<=period.end);
    let era=0;
    root.innerHTML=`<div class="company-history-explorer"><header class="company-history-cover"><div><span>GEOSR / HISTORY</span><h2>${t('연혁','History')}</h2><p>${t('2000년 설립 이후의 주요 기록','Key milestones since 2000')}</p></div></header><div class="company-history-tools"><div class="history-era-controls" role="group" aria-label="${t('연혁 기간','History period')}">${eras.map((period,index)=>`<button type="button" data-history-era="${index}" aria-pressed="${index===era}">${en?period.en:period.ko}</button>`).join('')}</div></div><div class="company-history-years">${populated.map(entry=>`<section id="history-panel-${entry.year}" data-history-panel data-history-era="${eraFor(entry.year)}" ${eraFor(entry.year)===era?'':'hidden'}><div class="company-history-year"><h3>${entry.year}</h3></div><ol>${entry.events.map(event=>`<li><time ${event.month?`datetime="${entry.year}-${event.month}"`:''}>${escape(event.month)}</time><span>${escape(event.title)}</span></li>`).join('')}</ol></section>`).join('')}</div>${untranslated?'<p class="company-history-language">Some historical entries are available in Korean</p>':''}</div>`;
    const panels=[...root.querySelectorAll('[data-history-panel]')];
    root.querySelector('.company-history-cover h2').id='company-history-title';
    function showEra(index){
      era=index;
      root.querySelectorAll('.history-era-controls [data-history-era]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.historyEra)===era)));
      panels.forEach(panel=>{panel.hidden=Number(panel.dataset.historyEra)!==era});
      root.querySelector('.company-history-years').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
    }
    root.addEventListener('click',event=>{const period=event.target.closest('.history-era-controls [data-history-era]');if(period)showEra(Number(period.dataset.historyEra))});
  }).catch(()=>{root.textContent=t('연혁을 불러오지 못했습니다','Could not load company history')});
})();
