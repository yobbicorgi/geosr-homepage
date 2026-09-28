/* Browse the preserved public GeoSR text capture without loading the old site. */
(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  const lang = params.get('lang') === 'en' ? 'en' : 'ko';
  const labels = {
    all: ['전체', 'All'], company: ['회사', 'Company'], business: ['사업·기술', 'Business & technology'],
    research: ['사업·연구·학술', 'Projects & research'], equipment: ['장비', 'Equipment'],
    news: ['공지·보도', 'News'], career: ['채용', 'Careers'], policy: ['정책', 'Policy'], home: ['기존 대문', 'Original home']
  };
  const kindLabels = {
    conserve: ['사업 분야','Business area'], conserve_view: ['기술 상세','Technology detail'],
    projects: ['사업실적','Project record'], research: ['연구실적','Research record'], publications: ['학술실적','Publication'],
    notices: ['공지사항','Notice'], press: ['보도자료','Press'], surveying: ['측량 장비','Surveying equipment'],
    investigation: ['물리조사 장비','Geophysical equipment'], biological: ['생물조사 장비','Biological equipment'],
    experiment: ['실험 장비','Laboratory equipment'], ship: ['조사선박','Survey vessels'],
    aboutUs: ['인사말·연혁','Greeting and history'], contactUs: ['조직·위치','Organization and location'],
    license: ['인증·면허','Certifications and licenses'], ci: ['CI','Corporate identity'],
    recruit: ['채용','Careers'], privacy: ['개인정보 처리방침','Privacy policy'], home: ['기존 대문','Original home']
  };
  const tr = (ko, en) => lang === 'en' ? en : ko;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const order = ['all','company','business','research','equipment','news','career','policy','home'];
  window.GeoSRSourceArchivePage = () => `<section class="source-archive" id="source-archive">
    <div class="source-archive-head"><p class="eyebrow">GEOSR / SOURCE ARCHIVE</p><div><h1>${tr('원문 자료실','Source archive')}</h1><p>${tr('기존 홈페이지의 사업·연구·학술·공지·장비·회사 자료를 원문 기준으로 찾아봅니다','Browse the company, project, research, publication, news and equipment records from the original site')}</p></div></div>
    <div class="source-archive-tools"><label for="archive-query">${tr('자료 검색','Search records')}</label><input id="archive-query" type="search" placeholder="${tr('제목 또는 본문 검색','Search titles or text')}" autocomplete="off"><span class="source-archive-count" aria-live="polite"></span></div>
    <nav class="source-archive-filters" aria-label="${tr('자료 분류','Record categories')}"></nav>
    <div class="source-archive-results" aria-live="polite"><p>${tr('원문 자료를 불러오는 중입니다','Loading source records')}</p></div>
    <div class="source-archive-paging"></div>
    <p class="source-archive-note">${tr('2026년 9월 20일 공개 홈페이지에서 수집한 원문 텍스트입니다. 이미지와 첨부는 원본 페이지에서 확인해 주세요.','Visible text captured from the public site on 20 September 2026. Open the source page for images and attachments.')}</p>
  </section>`;

  async function init() {
    const root = document.querySelector('#source-archive');
    if (!root) return;
    const list = root.querySelector('.source-archive-results');
    let records;
    try {
      const response = await fetch('source-archive.json');
      if (!response.ok) throw new Error(String(response.status));
      records = (await response.json()).records.filter(record => record.lang === lang);
      records.sort((a,b) => order.indexOf(a.section) - order.indexOf(b.section) || a.title.localeCompare(b.title,lang));
    } catch {
      list.textContent = tr('원문 자료를 불러오지 못했습니다','Could not load source records');
      return;
    }
    const selectedId = params.get('record');
    if (selectedId) {
      const record = records.find(item => item.id === selectedId);
      if (record) { renderDetail(record); return; }
    }
    let category = 'all', page = 0, query = '';
    const input = root.querySelector('#archive-query');
    const filters = root.querySelector('.source-archive-filters');
    const paging = root.querySelector('.source-archive-paging');
    const counts = Object.fromEntries(order.map(key => [key, key === 'all' ? records.length : records.filter(item => item.section === key).length]));
    filters.innerHTML = order.filter(key => counts[key]).map(key => `<button type="button" data-section="${key}" aria-pressed="${key === category}">${tr(...labels[key])}<span>${counts[key].toLocaleString()}</span></button>`).join('');
    const state = () => records.filter(record => (category === 'all' || record.section === category) && (!query || `${record.title} ${record.text}`.toLocaleLowerCase().includes(query)));
    function render() {
      const matching = state();
      const totalPages = Math.max(1, Math.ceil(matching.length / 24));
      page = Math.max(0, Math.min(page, totalPages - 1));
      root.querySelector('.source-archive-count').textContent = `${matching.length.toLocaleString()} ${tr('건','records')}`;
      filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.section === category)));
      const slice = matching.slice(page * 24, page * 24 + 24);
      list.innerHTML = slice.length ? slice.map((record, index) => `<a class="source-archive-row" href="source-archive.html?lang=${lang}&record=${encodeURIComponent(record.id)}"><span>${String(page * 24 + index + 1).padStart(3, '0')}</span><div><small>${tr(...(labels[record.section] || [record.section,record.section]))} / ${tr(...(kindLabels[record.kind] || [record.kind,record.kind]))}</small><h2>${esc(record.title)}</h2></div><span aria-hidden="true">↗</span></a>`).join('') : `<p class="source-archive-empty">${tr('검색 결과가 없습니다','No matching records')}</p>`;
      paging.innerHTML = totalPages > 1 ? `<button type="button" data-page="prev" ${page === 0 ? 'disabled' : ''}>${tr('이전','Previous')}</button><span>${page + 1} / ${totalPages}</span><button type="button" data-page="next" ${page === totalPages - 1 ? 'disabled' : ''}>${tr('다음','Next')}</button>` : '';
    }
    filters.addEventListener('click', event => {
      const button = event.target.closest('[data-section]'); if (!button) return;
      category = button.dataset.section; page = 0; render();
    });
    input.addEventListener('input', () => { query = input.value.trim().toLocaleLowerCase(); page = 0; render(); });
    paging.addEventListener('click', event => {
      const button = event.target.closest('[data-page]'); if (!button) return;
      page += button.dataset.page === 'next' ? 1 : -1; render();
      root.querySelector('.source-archive-results').scrollIntoView({block:'start',behavior:'smooth'});
    });
    render();

    function renderDetail(record) {
      root.classList.add('source-archive--detail');
      root.querySelector('.source-archive-tools').remove();
      root.querySelector('.source-archive-filters').remove();
      root.querySelector('.source-archive-paging').remove();
      list.innerHTML = `<article class="source-detail"><a class="source-detail-back" href="source-archive.html?lang=${lang}">← ${tr('원문 자료실','Source archive')}</a><p class="eyebrow">${tr(...(labels[record.section] || [record.section,record.section]))} / ${tr(...(kindLabels[record.kind] || [record.kind,record.kind]))}</p><h1>${esc(record.title)}</h1><div class="source-detail-meta"><span>${tr('원문 보존','SOURCE TEXT')}</span><span>${esc(record.retrievedAt.slice(0,10))}</span></div><div class="source-detail-body"></div><div class="source-detail-source"><a href="${esc(record.sourceUrl)}" target="_blank" rel="noopener noreferrer">${tr('기존 홈페이지 원문 열기','Open original page')} ↗</a><span>${tr('이미지','Image references')} ${record.imageReferences.length} · ${tr('첨부','Attachments')} ${record.attachments.length}</span></div></article>`;
      list.querySelector('.source-detail-body').textContent = record.text;
    }
  }
  document.addEventListener('DOMContentLoaded', init, {once:true});
})();
