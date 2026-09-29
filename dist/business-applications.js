/* Application imagery distinguishes new explanatory concepts from original GeoSR material. */
(() => {
  const applications = [
    {
      id: 'water',
      ko: '하천·호수·댐',
      en: 'Rivers · lakes · dams',
      bodyKo: '관측과 수질 분석 및 통합모델링을 바탕으로 수환경 변화를 파악하고 물관리와 디지털트윈 구축을 지원합니다',
      bodyEn: 'Field observations and water-quality analysis inform integrated models for water management and digital-twin development.',
      methodsKo: ['수질·유량 관측', '유역·하구 연계 모델', '통합 물관리 시스템'],
      methodsEn: ['Water-quality and flow monitoring', 'Linked watershed and estuary models', 'Integrated water-management systems'],
      ids: [15, 46, 63, 60],
      visual: {
        kind: 'concept', src: 'assets/editorial/inland-reservoir.webp', width: 1672, height: 941,
        altKo: '하천과 호수 및 댐이 이어지는 수환경 콘셉트 이미지',
        altEn: 'Concept image of rivers lakes and a dam within an inland water environment',
        captionKo: '하천·호수·댐 수환경 콘셉트', captionEn: 'Concept of rivers lakes and dam environments'
      }
    },
    {
      id: 'development',
      ko: '연안·항만 개발',
      en: 'Coastal and port development',
      bodyKo: '개발 전후의 해양환경을 조사하고 유동·파랑·퇴적 변화와 환경영향을 분석해 계획 수립과 저감 대책을 지원합니다',
      bodyEn: 'We assess coastal and port projects by studying currents, waves and sediment movement to guide planning and environmental mitigation.',
      methodsKo: ['해역이용협의·영향평가', '해양물리·지형 조사', '공사 중 부유사·온배수 확산'],
      methodsEn: ['Sea-area consultation and impact assessment', 'Physical oceanography and seabed surveys', 'Suspended sediment and thermal-effluent dispersion during construction'],
      ids: [48, 46, 57],
      visual: {
        kind: 'source', src: 'assets/source-records/d97801a609636bca2e0b.png', width: 999, height: 610,
        altKo: '항만과 연안 개발 환경 GeoSR 기술 자료', altEn: 'GeoSR technical material showing a port and coastal development environment',
        captionKo: '항만과 연안 개발 환경', captionEn: 'Port and coastal development environment',
        sourceLabelKo: 'GeoSR 기술 자료', sourceLabelEn: 'GEOSR TECHNICAL MATERIAL',
        sourceHref: 'business.html?id=48&lang=', sourceLinkKo: '기술 자료 보기', sourceLinkEn: 'View technical material'
      }
    },
    {
      id: 'climate',
      ko: '기후변화·연안재해',
      en: 'Climate change and coastal hazards',
      bodyKo: '장기 침식 관측과 재해 취약성 평가 및 침수 예측을 통해 연안 관리와 재해 대응에 필요한 근거를 제공합니다',
      bodyEn: 'We combine erosion monitoring and flood-risk modelling to support vulnerability assessments, coastal management and disaster response.',
      methodsKo: ['연안침식 모니터링', '복합원인 침수 예측', '연안재해 취약성 평가'],
      methodsEn: ['Coastal-erosion monitoring', 'Compound-flood prediction', 'Coastal-hazard vulnerability assessment'],
      ids: [53, 54, 55, 58],
      visual: {
        kind: 'concept', src: 'assets/editorial/coastal-overtopping.webp', width: 1860, height: 845,
        altKo: '높은 파도가 해안 방호시설의 바다 쪽 면에 부딪히는 콘셉트 이미지',
        altEn: 'Concept image of high waves striking the seaward face of coastal protection',
        captionKo: '해안 방호시설에 작용하는 고파랑 콘셉트', captionEn: 'Concept of high-wave impact on coastal protection'
      }
    },
    {
      id: 'energy',
      ko: '해상풍력·해양공간계획',
      en: 'Offshore wind and marine spatial planning',
      bodyKo: '해양환경과 선박 통항 및 어업활동 정보를 분석해 환경성과 수용성을 고려한 입지 검토와 해양공간 이용계획을 지원합니다',
      bodyEn: 'We analyse marine conditions alongside vessel traffic and fishing activity to assess offshore wind sites and support marine spatial planning.',
      methodsKo: ['디지털 입지정보도', '해상교통·어업활동 분석', '해양용도구역 검토'],
      methodsEn: ['Digital site-information maps', 'Vessel traffic and fishing-activity analysis', 'Marine-use zone assessment'],
      ids: [62, 47, 56],
      visual: {
        kind: 'concept', src: 'assets/editorial/marine-wind-siting.webp', width: 1860, height: 846,
        altKo: '연안 풍력단지와 해양 공간의 관계를 보여주는 콘셉트 이미지',
        altEn: 'Concept image showing an offshore wind farm in its marine setting',
        captionKo: '해상풍력 입지 검토 환경 콘셉트', captionEn: 'Concept of an offshore wind site-assessment environment'
      }
    },
    {
      id: 'restoration',
      ko: '생태계 보전·복원',
      en: 'Ecosystem conservation and restoration',
      bodyKo: '서식지와 생물 군집 및 퇴적물을 조사하고 생태계 건강성 평가와 복원 계획 및 블루카본 연구에 활용합니다',
      bodyEn: 'Habitat and sediment surveys inform ecosystem-health assessments and restoration planning while supporting blue-carbon research.',
      methodsKo: ['해양서식지 맵핑', '생태·탄소흡수 분석', '염생식물 육묘·식재'],
      methodsEn: ['Marine-habitat mapping', 'Ecology and carbon-uptake analysis', 'Saltmarsh plant propagation and planting'],
      ids: [84, 51, 52],
      visual: {
        kind: 'source', src: 'assets/source-records/60222a77f825075ed4c6.jpg', width: 1000, height: 608,
        altKo: '방형구를 이용한 염생식물 현장 조사 GeoSR 기술 자료',
        altEn: 'GeoSR technical material showing a quadrat survey of saltmarsh vegetation',
        captionKo: '방형구를 이용한 식생 조사', captionEn: 'Vegetation survey using a quadrat',
        sourceLabelKo: 'GeoSR 기술 자료', sourceLabelEn: 'GEOSR TECHNICAL MATERIAL',
        sourceHref: 'business.html?id=51&lang=', sourceLinkKo: '기술 자료 보기', sourceLinkEn: 'View technical material'
      }
    },
    {
      id: 'infrastructure',
      ko: '관측 인프라·수중시설',
      en: 'Observation infrastructure and underwater facilities',
      bodyKo: '관측망과 부이 및 항로표지의 설계·제작·설치와 유지관리를 수행하며 현장 관측자료를 수집하고 운영 시스템을 구축합니다',
      bodyEn: 'We design marine observation networks with buoys and navigation aids, then support their installation, maintenance and operation with field data.',
      methodsKo: ['관측부이·관측망 구축', '항로표지·수중시설 유지관리', '실시간 수집·품질관리'],
      methodsEn: ['Observation buoy and network installation', 'Aids-to-navigation and underwater-facility maintenance', 'Real-time collection and quality control'],
      ids: [63, 60, 65], equipment: true,
      visual: {
        kind: 'source', src: 'assets/company/observation-vessel-deployment.webp', width: 750, height: 389,
        altKo: '해양 관측 장비를 설치하는 작업선 GeoSR 회사 자료',
        altEn: 'GeoSR company material showing a work vessel installing marine observation equipment',
        captionKo: '해양 관측 장비 설치 작업', captionEn: 'Marine observation equipment installation',
        sourceLabelKo: '회사 자료', sourceLabelEn: 'COMPANY MATERIAL',
        sourceHref: 'assets/company/geosr-profile-ko-2025.pdf#page=18', sourceLinkKo: '원문 보기', sourceLinkEn: 'View source'
      }
    }
  ];

  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const visualMarkup = (app, language) => {
    const en = language === 'en';
    const visual = app.visual;
    const concept = visual.kind === 'concept';
    const label = concept ? (en ? 'CONCEPT IMAGE' : '콘셉트 이미지') : (en ? visual.sourceLabelEn : visual.sourceLabelKo);
    const caption = en ? visual.captionEn : visual.captionKo;
    const link = visual.sourceHref ? '<a href="' + escape(visual.sourceHref.replace('lang=', 'lang=' + language)) + '"' + (visual.sourceHref.endsWith('.pdf#page=18') ? ' target="_blank" rel="noopener"' : '') + '>' + (en ? visual.sourceLinkEn : visual.sourceLinkKo) + '<span aria-hidden="true">↗</span></a>' : '';
    return '<figure class="application-visual" data-application-visual data-visual-kind="' + visual.kind + '" aria-live="polite"><div class="application-visual-media"><img src="' + escape(visual.src) + '" width="' + visual.width + '" height="' + visual.height + '" alt="' + escape(en ? visual.altEn : visual.altKo) + '" loading="lazy" decoding="async" class="application-visual-image-enter"></div><figcaption><span class="application-visual-label">' + escape(label) + '</span><span class="application-visual-caption">' + escape(caption) + '</span>' + link + '</figcaption></figure>';
  };

  window.GeoSRBusinessApplications = language => {
    const en = language === 'en';
    const sources = window.GeoSRBusinessDetails || {};
    const technologyNames = en ? window.GeoSRTechnologyEnglish : null;
    const title = en ? 'Applications' : '사업 적용 분야';
    const items = applications.map((app, index) => '<details class="application-item" name="geosr-applications" data-application-id="' + app.id + '" id="application-' + app.id + '"' + (index === 0 ? ' open' : '') + '><summary><span>' + String(index + 1).padStart(2, '0') + '</span><h3>' + (en ? app.en : app.ko) + '</h3><i aria-hidden="true"></i></summary><div class="application-body"><p>' + (en ? app.bodyEn : app.bodyKo) + '</p><ul>' + (en ? app.methodsEn : app.methodsKo).map(method => '<li>' + escape(method) + '</li>').join('') + '</ul><nav aria-label="' + (en ? 'Related technologies' : '관련 기술') + '">' + app.ids.map(id => '<a href="business.html?id=' + id + '&lang=' + language + '">' + escape(en ? (sources[id]?.en?.title || technologyNames?.[id] || String(id)) : (sources[id]?.ko?.title || String(id))) + '</a>').join('') + (app.equipment ? '<a href="equipment.html?lang=' + language + '">' + (en ? 'Equipment' : '보유 장비') + '</a>' : '') + '</nav></div></details>').join('');
    return '<section class="business-applications" id="applications" aria-labelledby="applications-heading"><div class="application-intro"><p class="eyebrow">' + (en ? 'WHERE WE WORK' : '주요 적용 분야') + '</p><h2 id="applications-heading">' + title + '</h2><p>' + (en ? 'We investigate coastal waters, rivers, lakes and dams, and analyse how they change.' : '바다와 하천·호수·댐 등 다양한 수환경을<br>조사하고 변화를 분석·예측합니다') + '</p>' + visualMarkup(applications[0], language) + '</div><div class="application-list">' + items + '</div></section>';
  };

  document.addEventListener('toggle', event => {
    const item = event.target;
    if (!item?.matches?.('.application-item[data-application-id]') || !item.open) return;
    const app = applications.find(value => value.id === item.dataset.applicationId);
    const visual = item.closest('.business-applications')?.querySelector('[data-application-visual]');
    if (!app || !visual) return;
    visual.outerHTML = visualMarkup(app, document.documentElement.lang === 'en' ? 'en' : 'ko');
  }, true);
})();
