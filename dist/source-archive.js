/* Browse the preserved public GeoSR text capture without loading the old site. */
(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  const lang = params.get('lang') === 'en' ? 'en' : 'ko';
  const pageRoute = location.pathname.split('/').pop().replace('.html','');
  const scoped = ['research','news','equipment'].includes(pageRoute);
  const labels = {
    all: ['전체', 'All'], company: ['회사', 'Company'], business: ['사업·기술', 'Business & technology'],
    research: ['사업·연구·학술', 'Projects & research'], equipment: ['장비', 'Equipment'],
    news: ['공지·보도', 'News'], career: ['채용', 'Careers'], policy: ['정책', 'Policy']
  };
  const kindLabels = {
    conserve: ['사업 분야','Business area'], conserve_view: ['기술 상세','Technology detail'],
    projects: ['사업실적','Project record'], research: ['연구실적','Research record'], publications: ['학술실적','Publication'],
    notices: ['공지사항','Notice'], press: ['보도자료','Press'], surveying: ['측량 장비','Surveying equipment'],
    investigation: ['물리조사 장비','Geophysical equipment'], biological: ['생물조사 장비','Biological equipment'],
    experiment: ['실험 장비','Laboratory equipment'], ship: ['조사선박','Survey vessels'],
    aboutUs: ['인사말·연혁','Greeting and history'], contactUs: ['조직·위치','Organization and location'],
    license: ['인증·면허','Certifications and licenses'], ci: ['CI','Corporate identity'],
    recruit: ['채용','Careers'], privacy: ['개인정보 처리방침','Privacy policy']
  };
  const tr = (ko, en) => lang === 'en' ? en : ko;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const order = pageRoute === 'research' ? ['all','projects','research','publications'] :
    pageRoute === 'news' ? ['all','notices','press'] :
    pageRoute === 'equipment' ? ['all','surveying','investigation','biological','experiment','ship'] :
    ['all','company','business','research','equipment','news','career','policy'];
  const groupOf = record => scoped ? record.kind : record.section;
  const categoryLabel = key => key === 'all' ? labels.all : (kindLabels[key] || labels[key] || [key,key]);
  const heading = pageRoute === 'research' ? ['연구개발 및 수행 실적','Research and project records'] :
    pageRoute === 'news' ? ['소식','News'] : pageRoute === 'equipment' ? ['관측·분석 장비','Observation and analysis equipment'] : ['자료실','Records'];
  const introduction = pageRoute === 'research'
    ? ['사업 실적·연구 실적·학술 자료를 분야별로 검색할 수 있습니다','Search project, research and publication records by category']
    : pageRoute === 'news'
    ? ['공지사항과 보도자료를 검색할 수 있습니다','Search notices and media records']
    : pageRoute === 'equipment'
    ? ['현장 조사 장비와 조사선 및 실험 장비를 검색할 수 있습니다','Search field equipment, survey vessels and laboratory instruments']
    : ['사업·연구·학술·회사 자료를 검색할 수 있습니다','Search project, research, publication and company records'];
  window.GeoSRSourceArchivePage = () => `<section class="source-archive" id="source-archive">
    <div class="source-archive-head"><p class="eyebrow">GEOSR / ${pageRoute === 'research' ? 'RESEARCH' : pageRoute === 'news' ? 'NEWS' : pageRoute === 'equipment' ? 'EQUIPMENT' : 'RECORDS'}</p><div><h1>${tr(...heading)}</h1><p>${tr(...introduction)}</p></div></div>
    <div class="source-archive-tools"><label for="archive-query">${tr('자료 검색','Search records')}</label><input id="archive-query" type="search" placeholder="${tr('제목 또는 본문 검색','Search titles or text')}" autocomplete="off"><span class="source-archive-count" aria-live="polite"></span></div>
    <nav class="source-archive-filters" aria-label="${tr('자료 분류','Record categories')}"></nav>
    <div class="source-archive-results" aria-live="polite"><p>${tr('자료를 불러오는 중입니다','Loading records')}</p></div>
    <div class="source-archive-paging"></div>
    <p class="source-archive-note">${tr('공개 자료에 기재된 내용을 기준으로 정리했습니다','Based on published GeoSR records')}</p>
  </section>`;

  async function init() {
    const root = document.querySelector('#source-archive');
    if (!root) return;
    const list = root.querySelector('.source-archive-results');
    let records, allRecords;
    const recordDate = record => (record.text.slice(0,300).match(/\b(?:19|20)\d{2}[-./]\d{1,2}[-./]\d{1,2}\b/) || [''])[0].replace(/[./]/g,'-');
    try {
      const response = await fetch('source-archive.json');
      if (!response.ok) throw new Error(String(response.status));
      const all = (await response.json()).records;
      allRecords = all;
      const candidates = all.filter(record => {
        if (pageRoute === 'research') return record.lang === lang && ['projects','research','publications'].includes(record.kind);
        if (pageRoute === 'news') return record.lang === 'ko' && ['notices','press'].includes(record.kind);
        if (pageRoute === 'equipment') return record.lang === lang && record.section === 'equipment';
        return record.lang === lang && record.section !== 'home';
      });
      const unique=new Map();
      candidates.forEach(record=>{
        const key=`${record.section}:${record.kind}:${record.sourceTextSha256||record.text}`;
        const prior=unique.get(key);
        if(!prior||Number(record.id.match(/-(\d+)-[^-]+$/)?.[1]||0)>Number(prior.id.match(/-(\d+)-[^-]+$/)?.[1]||0))unique.set(key,record);
      });
      records=[...unique.values()];
      records.sort((a,b) => recordDate(b).localeCompare(recordDate(a)) || order.indexOf(groupOf(a)) - order.indexOf(groupOf(b)) || a.title.localeCompare(b.title,lang));
    } catch {
      list.textContent = tr('자료를 불러오지 못했습니다','Could not load records');
      return;
    }
    const legacy = /^(business|research|academic|notice|press)-(\d+)$/.exec(params.get('id') || '');
    const legacyKind = legacy && ({business:'projects',research:'research',academic:'publications',notice:'notices',press:'press'})[legacy[1]];
    const selectedId = params.get('record') || (legacyKind && allRecords.find(record => record.kind === legacyKind && record.id.includes(`-${legacy[2]}-`))?.id);
    if (selectedId) {
      const record = records.find(item => item.id === selectedId) || allRecords.find(item => item.id === selectedId && (pageRoute === 'research' ? item.section === 'research' : pageRoute === 'news' ? item.section === 'news' : pageRoute === 'equipment' ? item.section === 'equipment' : true));
      if (record) { renderDetail(record); return; }
    }
    const requestedCategory = pageRoute === 'equipment' ? ({survey:'surveying',lab:'experiment',vessel:'ship'})[params.get('category')] || params.get('category') : null;
    let category = order.includes(requestedCategory) ? requestedCategory : 'all', page = 0, query = '';
    const input = root.querySelector('#archive-query');
    const filters = root.querySelector('.source-archive-filters');
    const paging = root.querySelector('.source-archive-paging');
    const counts = Object.fromEntries(order.map(key => [key, key === 'all' ? records.length : records.filter(item => groupOf(item) === key).length]));
    filters.innerHTML = order.filter(key => counts[key]).map(key => `<button type="button" data-section="${key}" aria-pressed="${key === category}">${tr(...categoryLabel(key))}<span>${counts[key].toLocaleString()}</span></button>`).join('');
    const state = () => records.filter(record => (category === 'all' || groupOf(record) === category) && (!query || `${record.title} ${record.text}`.toLocaleLowerCase().includes(query)));
    function render() {
      const matching = state();
      const totalPages = Math.max(1, Math.ceil(matching.length / 24));
      page = Math.max(0, Math.min(page, totalPages - 1));
      root.querySelector('.source-archive-count').textContent = `${matching.length.toLocaleString()} ${tr('건','records')}`;
      filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.section === category)));
      const slice = matching.slice(page * 24, page * 24 + 24);
      const dated=pageRoute==='research'||pageRoute==='news';
      const header=`<div class="source-archive-board-head"><span>${tr('번호','No.')}</span><span>${tr('분류','Category')}</span><span>${tr('제목','Title')}</span>${dated?`<span>${tr('등록일','Date')}</span>`:''}</div>`;
      list.classList.toggle('source-archive-results--dated',dated);
      list.innerHTML=slice.length?header+slice.map((record,index)=>`<a class="source-archive-row" href="${location.pathname.split('/').pop()}?lang=${lang}&record=${encodeURIComponent(record.id)}"><span class="source-archive-number">${String(matching.length-page*24-index).padStart(3,'0')}</span><span class="source-archive-kind">${tr(...(kindLabels[record.kind]||[record.kind,record.kind]))}</span><strong class="source-archive-title">${esc(record.title)}</strong>${dated?`<time datetime="${recordDate(record)}">${esc(recordDate(record))}</time>`:''}</a>`).join(''):`<p class="source-archive-empty">${tr('검색 결과가 없습니다','No matching records')}</p>`;
      const windowStart=Math.max(0,Math.min(page-2,totalPages-5));
      const windowEnd=Math.min(totalPages,windowStart+5);
      const numbers=Array.from({length:windowEnd-windowStart},(_,offset)=>windowStart+offset);
      paging.innerHTML=totalPages>1?`<button type="button" data-page="prev" ${page===0?'disabled':''} aria-label="${tr('이전 페이지','Previous page')}">←</button>${windowStart>0?`<button type="button" data-page="0">1</button>${windowStart>1?'<span aria-hidden="true">…</span>':''}`:''}${numbers.map(number=>`<button type="button" data-page="${number}" ${page===number?'aria-current="page"':''}>${number+1}</button>`).join('')}${windowEnd<totalPages?`${windowEnd<totalPages-1?'<span aria-hidden="true">…</span>':''}<button type="button" data-page="${totalPages-1}">${totalPages}</button>`:''}<button type="button" data-page="next" ${page===totalPages-1?'disabled':''} aria-label="${tr('다음 페이지','Next page')}">→</button>`:'';
    }
    filters.addEventListener('click', event => {
      const button = event.target.closest('[data-section]'); if (!button) return;
      category = button.dataset.section; page = 0; render();
    });
    input.addEventListener('input', () => { query = input.value.trim().toLocaleLowerCase(); page = 0; render(); });
    paging.addEventListener('click', event => {
      const button = event.target.closest('[data-page]'); if (!button) return;
      page = button.dataset.page === 'next' ? page+1 : button.dataset.page === 'prev' ? page-1 : Number(button.dataset.page); render();
      root.querySelector('.source-archive-results').scrollIntoView({block:'start',behavior:'smooth'});
    });
    render();

    function renderDetail(record) {
      root.classList.add('source-archive--detail');
      root.querySelector('.source-archive-head').remove();
      root.querySelector('.source-archive-tools').remove();
      root.querySelector('.source-archive-filters').remove();
      root.querySelector('.source-archive-paging').remove();
      const lines = record.text.replace(/\r/g,'').split('\n');
      if (lines[0]?.trim() === record.title.trim()) lines.shift();
      const date = /^\s*((?:19|20)\d{2}[-./]\d{1,2}[-./]\d{1,2})\s*$/.exec(lines[0] || '')?.[1] || '';
      if (date) lines.shift();
      list.innerHTML = `<article class="source-detail"><a class="source-detail-back" href="${location.pathname.split('/').pop()}?lang=${lang}">← ${tr(...heading)}</a><p class="eyebrow">${tr(...(kindLabels[record.kind] || [record.kind,record.kind]))}</p><h1>${esc(record.title)}</h1><div class="source-detail-meta">${date ? `<time datetime="${date.replace(/[./]/g,'-')}">${esc(date)}</time>` : ''}<span>${lang === 'en' && record.lang === 'ko' ? 'Korean original' : tr('공개 자료','PUBLISHED RECORD')}</span></div><div class="source-detail-body"></div></article>`;
      list.querySelector('.source-detail-body').textContent = lines.join('\n').trim();
    }
  }
  document.addEventListener('DOMContentLoaded', init, {once:true});
})();
