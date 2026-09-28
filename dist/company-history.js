/* Expand the company chronology from the preserved public company record. */
(() => {
  const root = document.querySelector('[data-company-history]');
  if (!root) return;
  const en = new URLSearchParams(location.search).get('lang') === 'en';
  const t = (ko, english) => en ? english : ko;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  fetch('source-archive.json').then(response => {
    if (!response.ok) throw new Error(String(response.status));
    return response.json();
  }).then(({records}) => {
    const source = records.find(record => record.id === 'ko-company-aboutUs-page-e590a22c61');
    if (!source) return;
    const history = source.text.split('\n2026\n')[1]?.split('\n목표 및 사명')[0];
    if (!history) return;
    const years = [{year:'2026',events:[]}];
    let month = '';
    for (const line of history.split('\n').map(value => value.trim()).filter(Boolean)) {
      if (/^(?:19|20)\d{2}$/.test(line)) { years.push({year:line,events:[]}); month=''; continue; }
      const match = line.match(/^(0[1-9]|1[0-2])(.+)$/);
      if (match) month = match[1];
      const title = match ? match[2].trim() : line;
      if (title) years.at(-1).events.push({month,title});
    }
    const populated = years.filter(entry => entry.events.length);
    const total = populated.reduce((sum, entry) => sum + entry.events.length, 0);
    root.innerHTML = `<details class="company-full-history"><summary>${t('전체 연혁 보기','Browse full company history')} <span>${populated.length} ${t('개 연도','years')} / ${total} ${t('개 기록','records')}</span><i aria-hidden="true">+</i></summary><div class="company-history-years">${populated.map(entry => `<section><h3>${escape(entry.year)}</h3><ol>${entry.events.map(event => `<li><time>${escape(event.month)}</time><span>${escape(event.title)}</span></li>`).join('')}</ol></section>`).join('')}</div><p>${t('공개된 회사 연혁을 정리했습니다 최신 내용은 문의처에서 확인해 주세요','Published company history. Contact GeoSR to confirm recent changes.')}</p></details>`;
  }).catch(() => {root.textContent=t('연혁을 불러오지 못했습니다','Could not load company history');});
})();
