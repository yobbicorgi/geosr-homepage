(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const visuals = {
    63:['equipment-usv-original.png','GeoSR 무인선 관측 사진','GeoSR uncrewed survey vessel photograph'],
    46:['concepts/reviewed-20260922/cf12-wave-model-v1.png','수치모델 개념 이미지 · 실제 연구 결과 아님','Numerical model concept · not a research result'],
    52:['concepts/reviewed-20260922/cf10-chemistry-wide-v1.png','실험실 콘셉트 이미지 · 실제 시설 아님','Laboratory concept · not an actual facility'],
    56:['concepts/corporate-film/hero-earth-satellite-07s-v4.png','원격탐사 콘셉트 이미지 · 실제 관측 장면 아님','Remote sensing concept · not an observation'],
    61:['concepts/corporate-film/hero-earth-satellite-07s-v4.png','AI·원격탐사 콘셉트 이미지','AI and remote sensing concept image']
  };
  window.GeoSRBusinessDetailPage = (id, item, lang, link) => {
    const en = lang === 'en';
    const data = window.GeoSRBusinessDetails?.[id]?.[lang];
    if (!data) return `<section class="tech-story"><a href="${link('business')}">${en?'Back to business areas':'사업 분야로 돌아가기'}</a><h1>${en?'Technology record not found':'기술 자료를 찾을 수 없습니다'}</h1></section>`;
    const media = visuals[id] || ['geosr-brochure-coast-2025.jpg','2025년 회사 소개서 수록 연안 사진','Coastal photograph from the 2025 company brochure'];
    const lead = data.lead.split(/\n+/).filter(Boolean).map(paragraph => `<p>${esc(paragraph)}</p>`).join('');
    const list = values => values.map(value=>`<li>${esc(value)}</li>`).join('');
    const summary = item ? (en ? item.de : item.dk) : '';
    return `<article class="tech-story" aria-labelledby="tech-story-title">
      <div class="tech-story-top"><a class="tech-story-back" href="${link('business')}">← ${en?'Business areas':'사업 분야'}</a><span>GEOSR / TECHNOLOGY</span></div>
      <header class="tech-story-header"><div><p class="eyebrow">${en?'BUSINESS & TECHNOLOGY':'사업 및 기술 분야'}</p><h1 id="tech-story-title">${esc(data.title)}</h1><p>${esc(summary)}</p><a href="#tech-story-content">${en?'Read technology details':'기술 내용 보기'} <span aria-hidden="true">↓</span></a></div><figure><img src="assets/${media[0]}" alt="${esc(en?media[2]:media[1])}" fetchpriority="high"><figcaption>${esc(en?media[2]:media[1])}</figcaption></figure></header>
      <div class="tech-story-body" id="tech-story-content"><section class="tech-story-intro"><div><span>01 / OVERVIEW</span><h2>${en?'Business overview':'기술 개요'}</h2></div><div>${lead}</div></section><div class="tech-story-columns"><section><span>02 / TECHNOLOGY</span><h2>${en?'Our technology':'보유기술'}</h2><ul>${list(data.skills)}</ul></section><section><span>03 / APPLICATIONS</span><h2>${en?'Applications':'활용분야'}</h2><ul>${list(data.uses)}</ul></section></div></div>
      <nav class="tech-story-next" aria-label="${en?'Related pages':'관련 페이지'}"><a href="${link('research')}">${en?'Research and project records':'연구개발 및 수행 실적'} <span aria-hidden="true">↗</span></a><a href="${link('contact')}">${en?'Business and technical enquiries':'사업·기술 문의'} <span aria-hidden="true">↗</span></a></nav>
    </article>`;
  };
})();
