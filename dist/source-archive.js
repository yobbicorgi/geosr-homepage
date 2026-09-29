/* Browse the preserved public GeoSR text capture without loading the old site. */
(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  const URLBuilder = globalThis.URL;
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
    projects: ['사업실적','Projects'], research: ['연구실적','Research'], publications: ['학술실적','Publications'],
    notices: ['공지사항','Notice'], press: ['보도자료','Press'], surveying: ['측량 장비','Surveying equipment'],
    investigation: ['물리조사 장비','Geophysical equipment'], biological: ['생물조사 장비','Biological equipment'],
    experiment: ['실험 장비','Laboratory equipment'], ship: ['조사선박','Survey vessels'],
    aboutUs: ['인사말·연혁','Greeting and history'], contactUs: ['조직·위치','Organization and location'],
    license: ['인증·면허','Certifications and licenses'], ci: ['CI','Corporate identity'],
    recruit: ['채용','Careers'], privacy: ['개인정보 처리방침','Privacy policy']
  };
  const tr = (ko, en) => lang === 'en' ? en : ko;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  // Use a longer title already present in the original publication field
  // Keep the archived database title and body unchanged and never infer missing text
  const displayTitle = record => {
    if (record.kind !== 'publications') return record.title;
    const field = record.text.match(/(?:^|\n)(?:논문|Thesis)\s*\n([\s\S]+?)(?=\n(?:저자|authors?|학회지|an academic journal|Journal|주소|Address)\s*(?:\n|$))/i)?.[1]?.trim();
    if (!field) return record.title;
    const prefix = record.title.match(/^\[[^\]]+\]\s*/)?.[0] || '';
    const original = record.title.slice(prefix.length).trim();
    const compact = value => value.replace(/\s+/g, ' ').trim();
    return compact(field).length > compact(original).length && compact(field).startsWith(compact(original)) ? prefix + field : record.title;
  };
  const order = pageRoute === 'research' ? ['all','projects','research','publications'] :
    pageRoute === 'news' ? ['all','notices','press'] :
    pageRoute === 'equipment' ? ['all','surveying','investigation','biological','experiment','ship'] :
    ['all','company','business','research','equipment','news','career','policy'];
  const groupOf = record => scoped ? record.kind : record.section;
  const categoryLabel = key => key === 'all' ? labels.all : (kindLabels[key] || labels[key] || [key,key]);
  const heading = pageRoute === 'research' ? ['사업·연구·학술 실적','Projects, research and publications'] :
    pageRoute === 'news' ? ['소식','News'] : pageRoute === 'equipment' ? ['관측·분석 장비','Observation and analysis equipment'] : ['자료실','Records'];
  const introduction = pageRoute === 'research'
    ? ['사업·연구·학술 자료를 분야별로 찾을 수 있습니다','Browse project, research and publication records by category']
    : pageRoute === 'news'
    ? ['', '']
    : pageRoute === 'equipment'
    ? ['현장 조사 장비와 조사선 및 실험 장비를 검색할 수 있습니다','Search field equipment, survey vessels and laboratory instruments']
    : ['사업·연구·학술·회사 자료를 검색할 수 있습니다','Search project, research, publication and company records'];
  window.GeoSRSourceArchivePage = () => `<section class="source-archive" id="source-archive">
    <div class="source-archive-head"><p class="eyebrow">GEOSR / ${pageRoute === 'research' ? 'RESEARCH' : pageRoute === 'news' ? 'NEWS' : pageRoute === 'equipment' ? 'EQUIPMENT' : 'RECORDS'}</p><div><h1>${tr(...heading)}</h1>${tr(...introduction) ? `<p>${tr(...introduction)}</p>` : ''}</div></div>
    <div class="source-archive-tools"><label for="archive-query">${tr('자료 검색','Search records')}</label><input id="archive-query" type="search" placeholder="${tr('제목 또는 본문 검색','Search titles or text')}" autocomplete="off"><span class="source-archive-count" aria-live="polite"></span></div>
    <nav class="source-archive-filters" aria-label="${tr('자료 분류','Record categories')}"></nav>
    <div class="source-archive-results" aria-live="polite"><p>${tr('자료를 불러오는 중입니다','Loading records')}</p></div>
    <div class="source-archive-paging"></div>
  </section>`;

  async function init() {
    const root = document.querySelector('#source-archive');
    if (!root) return;
    const list = root.querySelector('.source-archive-results');
    let recordMedia = {};
    let records, allRecords, canonicalId = value => value, technology;
    const recordDate = record => ((record.originalText || record.text).slice(0,300).match(/\b(?:19|20)\d{2}[-./]\d{1,2}[-./]\d{1,2}\b/) || [''])[0].replace(/[./]/g,'-');
    try {
      const response = await fetch('source-archive.json');
      if (!response.ok) throw new Error(String(response.status));
      const all = (await response.json()).records;
      const loadJson = async url => { const result = await fetch(url); if (!result.ok) throw new Error(url); return result.json(); };
      if (pageRoute === 'equipment' || pageRoute === 'news') recordMedia = (await loadJson('source-media.json')).records || {};
      const localeMap = (await loadJson('source-record-locales.json')).koToEn;
      const reverseMap = Object.fromEntries(Object.entries(localeMap).map(([ko, english]) => [english, ko]));
      canonicalId = value => reverseMap[value] || value;
      const englishById = new Map(all.filter(record => record.lang === 'en').map(record => [record.id, record]));
      const translations = lang === 'en' ? await Promise.all([
        loadJson('source-translations.en.json'),
        ...(pageRoute === 'news' || !scoped ? [loadJson('source-translations-news.en.json')] : [])
      ]) : [];
      const translated = Object.assign({}, ...translations.map(file => file.records));
      allRecords = all.filter(record => record.lang === 'ko').map(record => {
        if (lang !== 'en') return record;
        const overlay = translated[record.id];
        const reviewed = overlay?.sourceTextSha256 === record.sourceTextSha256 ? overlay : null;
        const textSource = reviewed || englishById.get(localeMap[record.id]);
        return textSource ? {...record, title:textSource.title, text:textSource.text, lang:'en', originalText:record.text, originalTitle:record.title} : record;
      });
      // Distinct source posts retain their own identity even when their text matches
      records = allRecords.filter(record => {
        if (pageRoute === 'research') return ['projects','research','publications'].includes(record.kind);
        if (pageRoute === 'news') return ['notices','press'].includes(record.kind);
        if (pageRoute === 'equipment') return record.section === 'equipment';
        return record.section !== 'home';
      });
      if (pageRoute === 'research' && params.has('technology')) {
        technology = (await loadJson('technology-relations.json')).technologies[params.get('technology')];
        if (technology) {
          const relatedIds = new Set(technology.recordIds);
          records = records.filter(record => relatedIds.has(record.id));
          const intro = root.querySelector('.source-archive-head>div>p');
          intro.textContent = tr(technology.titleKo, technology.titleEn);
          intro.insertAdjacentHTML('afterend', `<a class="source-technology-back" href="business.html?lang=${lang}&id=${encodeURIComponent(params.get('technology'))}">${tr('기술 소개로 돌아가기','Back to technology overview')}</a>`);
        }
      }
      records.sort((a,b) => recordDate(b).localeCompare(recordDate(a)) || order.indexOf(groupOf(a)) - order.indexOf(groupOf(b)) || a.title.localeCompare(b.title,lang));
    } catch {
      list.textContent = tr('자료를 불러오지 못했습니다','Could not load records');
      return;
    }
    const legacy = /^(business|research|academic|notice|press)-(\d+)$/.exec(params.get('id') || '');
    const legacyKind = legacy && ({business:'projects',research:'research',academic:'publications',notice:'notices',press:'press'})[legacy[1]];
    const selectedId = canonicalId(params.get('record')) || (legacyKind && allRecords.find(record => record.kind === legacyKind && record.id.includes(`-${legacy[2]}-`))?.id);
    if (selectedId) {
      const record = records.find(item => item.id === selectedId) || allRecords.find(item => item.id === selectedId && (pageRoute === 'research' ? item.section === 'research' : pageRoute === 'news' ? item.section === 'news' : pageRoute === 'equipment' ? item.section === 'equipment' : true));
      if (record) { renderDetail(record); return; }
    }
    const requestedCategory = pageRoute === 'equipment' ? ({survey:'surveying',lab:'experiment',vessel:'ship'})[params.get('category')] || params.get('category') : ({notice:'notices',business:'projects',academic:'publications'})[params.get('board')] || params.get('board') || params.get('section');
    let category = order.includes(requestedCategory) ? requestedCategory : 'all', page = Math.max(0, Number(params.get('page')) || 0), query = (params.get('q')||'').trim().toLocaleLowerCase();
    const input = root.querySelector('#archive-query');
    input.value=params.get('q')||'';
    const filters = root.querySelector('.source-archive-filters');
    const paging = root.querySelector('.source-archive-paging');
    const counts = Object.fromEntries(order.map(key => [key, key === 'all' ? records.length : records.filter(item => groupOf(item) === key).length]));
    filters.innerHTML = order.filter(key => counts[key]).map(key => `<button type="button" data-section="${key}" aria-pressed="${key === category}">${tr(...categoryLabel(key))}<span>${counts[key].toLocaleString()}</span></button>`).join('');
    const state = () => records.filter(record => (category === 'all' || groupOf(record) === category) && (!query || `${record.title} ${record.text}`.toLocaleLowerCase().includes(query)));
    const pageSize = 12;
    const listingAddress = () => {
      const url = new URLBuilder(location.href);
      url.searchParams.delete('record');
      url.searchParams.delete('id');
      url.searchParams.delete('section');
      url.searchParams.delete('board');
      url.searchParams.delete('category');
      url.searchParams.delete('page');
      url.searchParams.delete('q');
      if (category !== 'all') url.searchParams.set(pageRoute === 'equipment' ? 'category' : 'board', category);
      if (query) url.searchParams.set('q', input.value.trim());
      if (page > 0) url.searchParams.set('page', String(page));
      return url.pathname + url.search;
    };
    const syncLocation = () => history.replaceState(null, '', listingAddress());
    const detailHref = record => {
      const url = new URLBuilder(listingAddress(), location.origin);
      url.searchParams.set('record', record.id);
      return url.pathname + url.search;
    };
    function render() {
      const matching = state();
      const totalPages = Math.max(1, Math.ceil(matching.length / pageSize));
      page = Math.max(0, Math.min(page, totalPages - 1));
      root.querySelector('.source-archive-count').textContent = `${matching.length.toLocaleString()} ${tr('건','records')}`;
      filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.section === category)));
      const slice = matching.slice(page * pageSize, page * pageSize + pageSize);
      const dated=pageRoute==='research'||pageRoute==='news';
      const header=`<div class="source-archive-board-head"><span>${tr('번호','No.')}</span><span>${tr('분류','Category')}</span><span>${tr('제목','Title')}</span>${dated?`<span>${tr('등록일','Date')}</span>`:''}</div>`;
      list.classList.toggle('source-archive-results--dated',dated);
      list.classList.toggle('source-press-grid',pageRoute==='news'&&category==='press');
      list.innerHTML=slice.length?header+slice.map((record,index)=>`<a class="source-archive-row" href="${esc(detailHref(record))}"><span class="source-archive-number">${String(matching.length-page*pageSize-index).padStart(3,'0')}</span><span class="source-archive-kind">${tr(...(kindLabels[record.kind]||[record.kind,record.kind]))}</span><strong class="source-archive-title">${esc(displayTitle(record))}</strong>${dated?`<time datetime="${recordDate(record)}">${esc(recordDate(record))}</time>`:''}</a>`).join(''):`<p class="source-archive-empty">${tr('검색 결과가 없습니다','No matching records')}</p>`;
      if (pageRoute === 'news' && category === 'press') {
        list.innerHTML = slice.length ? slice.map(record => {
          const image=(recordMedia[record.id]||[]).find(item=>/^image\//.test(item.mime||'')&&/^assets\/source-records\/[a-f0-9]{20}\.(?:jpg|png|webp)$/.test(item.src));
          return `<a class="source-press-card${image?'':' source-press-card--text'}" href="${esc(detailHref(record))}">${image?`<figure><img src="${esc(image.src)}" alt="" loading="lazy" decoding="async"></figure>`:''}<div class="source-press-meta"><span>${tr('보도자료','Press')}</span><time datetime="${esc(recordDate(record))}">${esc(recordDate(record))}</time></div><strong>${esc(displayTitle(record))}</strong></a>`;
        }).join('') : `<p class="source-archive-empty">${tr('검색 결과가 없습니다','No matching records')}</p>`;
      }
      if (pageRoute === 'equipment') {
        list.classList.add('source-equipment-grid');
        list.innerHTML = slice.length ? slice.map(record => {
          const media = (recordMedia[record.id] || []).find(item => /^assets\/source-records\/[a-f0-9]{20}\.(?:jpg|png|gif|webp)$/.test(item.src));
          return `<a class="source-equipment-card" href="${esc(detailHref(record))}"><figure>${media ? `<img src="${esc(media.src)}" alt="${esc(record.title)}" loading="lazy">` : `<span>${tr('장비 자료','Equipment record')}</span>`}</figure><small>${tr(...(kindLabels[record.kind]||[record.kind,record.kind]))}</small><strong>${esc(displayTitle(record))}</strong></a>`;
        }).join('') : `<p class="source-archive-empty">${tr('검색 결과가 없습니다','No matching records')}</p>`;
      }
      const windowStart=Math.max(0,Math.min(page-2,totalPages-5));
      const windowEnd=Math.min(totalPages,windowStart+5);
      const numbers=Array.from({length:windowEnd-windowStart},(_,offset)=>windowStart+offset);
      paging.innerHTML=totalPages>1?`<button type="button" data-page="prev" ${page===0?'disabled':''} aria-label="${tr('이전 페이지','Previous page')}">←</button>${windowStart>0?`<button type="button" data-page="0">1</button>${windowStart>1?'<span aria-hidden="true">…</span>':''}`:''}${numbers.map(number=>`<button type="button" data-page="${number}" ${page===number?'aria-current="page"':''}>${number+1}</button>`).join('')}${windowEnd<totalPages?`${windowEnd<totalPages-1?'<span aria-hidden="true">…</span>':''}<button type="button" data-page="${totalPages-1}">${totalPages}</button>`:''}<button type="button" data-page="next" ${page===totalPages-1?'disabled':''} aria-label="${tr('다음 페이지','Next page')}">→</button>`:'';
    }
    filters.addEventListener('click', event => {
      const button = event.target.closest('[data-section]'); if (!button) return;
      category = button.dataset.section; page = 0; render(); syncLocation();
    });
    input.addEventListener('input', () => { query = input.value.trim().toLocaleLowerCase(); page = 0; render(); syncLocation(); });
    paging.addEventListener('click', event => {
      const button = event.target.closest('[data-page]'); if (!button) return;
      page = button.dataset.page === 'next' ? page+1 : button.dataset.page === 'prev' ? page-1 : Number(button.dataset.page); render(); syncLocation();
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
      const back = new URLBuilder(location.href);
      back.searchParams.delete('record');
      back.searchParams.delete('id');
      list.innerHTML = `<article class="source-detail"><a class="source-detail-back" href="${esc(back.pathname + back.search)}">← ${tr(...heading)}</a><p class="eyebrow">${tr(...(kindLabels[record.kind] || [record.kind,record.kind]))}</p><h1>${esc(displayTitle(record))}</h1><div class="source-detail-meta">${date ? `<time datetime="${date.replace(/[./]/g,'-')}">${esc(date)}</time>` : ''}<span>${lang === 'en' && record.lang === 'ko' ? 'Korean original' : tr('공개 자료','PUBLISHED RECORD')}</span></div><div class="source-detail-body"></div></article>`;
      const body=list.querySelector('.source-detail-body');
      // Preserve the article text while restoring usable links to cited publications
      const text=lines.join('\n').trim();let offset=0;
      for(const match of text.matchAll(/https?:\/\/[^\s<>"']+/g)){
        const href=match[0].replace(/[),.;]+$/,'');
        body.append(document.createTextNode(text.slice(offset,match.index)));
        const anchor=document.createElement('a');anchor.href=href;anchor.textContent=href;anchor.target='_blank';anchor.rel='noopener';body.append(anchor);
        offset=match.index+href.length;
      }
      body.append(document.createTextNode(text.slice(offset)));
      const citedLinks=[...new Map((record.externalLinks||[]).filter(link=>/^https?:\/\//.test(link.url)&&!text.includes(link.url)).map(link=>[link.url,link])).values()];
      if(citedLinks.length)list.querySelector('.source-detail').insertAdjacentHTML('beforeend',`<nav class="source-detail-citations" aria-label="${tr('관련 링크','Related links')}">${citedLinks.map(link=>`<a href="${esc(link.url)}" target="_blank" rel="noopener">${esc(link.label)}</a>`).join('')}</nav>`);
      // Only explicitly reviewed local public assets are linked here
      // Credential scans remain in their separate reviewed gallery
      const downloads=[
        {test:/\/file\/ci\.zip$/i,href:'assets/company/geosr-ci.zip',label:tr('GeoSR 로고','GeoSR logo')},
        {test:/\/file\/GeoSR_brochure_eng_2506\.pdf$/i,href:'assets/company/geosr-profile-en-2025.pdf',label:tr('영문 회사 소개서','English company profile')},
        {test:/\/file\/지오시스템_회사소개서_국문_2506\.pdf$/i,href:'assets/company/geosr-profile-ko-2025.pdf',label:tr('국문 회사 소개서','Korean company profile')}
      ].filter(item=>(record.attachments||[]).some(url=>item.test.test(decodeURIComponent(url))));
      if(downloads.length)list.querySelector('.source-detail').insertAdjacentHTML('beforeend',`<div class="source-detail-downloads"><h2>${tr('첨부 자료','Downloads')}</h2>${downloads.map(item=>`<a href="${item.href}" download>${item.label}<span aria-hidden="true">↓</span></a>`).join('')}</div>`);
      renderLocalMedia(record).finally(() => {
        const article=list.querySelector('.source-detail');
        if(article && /^https?:\/\//.test(record.sourceUrl || '')) article.insertAdjacentHTML('beforeend',`<div class="source-detail-source"><span>${tr('지오시스템리서치 공개 원문','Original GeoSR publication')}</span><a href="${esc(record.sourceUrl)}" target="_blank" rel="noopener">${tr('원문 페이지 보기','View original page')} <span aria-hidden="true">↗</span></a></div>`);
      });
    }
    async function renderLocalMedia(record){
      // The reviewed credential gallery is the only renderer for credential scans
      if(record.kind==='license')return;
      try{
        const response=await fetch('source-media.json');if(!response.ok)return;
        const manifest=await response.json();
        const media=(manifest.records?.[record.id]||[]).filter(item=>/^assets\/(?:source-records\/[a-f0-9]{20}\.(?:jpg|png|gif|webp|pdf|zip|hwp)|company\/geosr-(?:ci\.(?:zip|png)|profile-(?:ko|en)-2025\.pdf))$/.test(item.src));
        const article=list.querySelector('.source-detail');if(!article)return;
        const picture=item=>(item.kind==='image'||record.kind==='press'&&item.kind==='attachment')&&item.mime.startsWith('image/')&&(!item.width||item.width>=80)&&(record.kind!=='conserve_view'||item.width>=800);
        const pictures=media.filter(picture);
        const files=media.filter(item=>item.kind==='attachment'&&!picture(item)&&![...article.querySelectorAll('a[download]')].some(link=>link.getAttribute('href')===item.src));
        if(pictures.length)article.insertAdjacentHTML('beforeend',`<div class="source-detail-images">${pictures.map(item=>`<figure><a href="${esc(item.src)}" target="_blank" rel="noopener" aria-label="${esc(tr('이미지 원본 보기','View full image'))}"><img src="${esc(item.src)}" alt="${esc(item.label||record.title)}" ${item.width?`width="${Number(item.width)}" height="${Number(item.height)}"`:''} loading="lazy" decoding="async"></a></figure>`).join('')}</div>`);
        if(files.length)article.insertAdjacentHTML('beforeend',`<div class="source-detail-downloads"><h2>${tr('첨부 자료','Downloads')}</h2>${files.map(item=>`<a href="${esc(item.src)}" download>${esc(item.label||tr('첨부 파일','Attachment'))}<span aria-hidden="true">↓</span></a>`).join('')}</div>`);
      }catch(error){console.warn('Local record media is unavailable',error)}
    }
  }
  document.addEventListener('DOMContentLoaded', init, {once:true});
})();
