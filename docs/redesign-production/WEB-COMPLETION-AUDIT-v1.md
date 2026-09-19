# GeoSR 웹 전면 교체 경로·화면 완성도 감사

감사일: 2026-09-20
브랜치: `redesign/production-2026-09-19`
로컬 미리보기: `http://127.0.0.1:18102/`

## 판정 기준과 범위

`IMPLEMENTATION_PASS`는 페이지 경로, 탐색 구조, 언어 처리, 인터랙션과 시각 구조가 동작함을 뜻합니다. 승인된 목업·빈 게시글·자료 자리표시는 이 구조의 실패로 판정하지 않습니다. `CONTENT_PENDING`은 최종 실제 콘텐츠나 승인된 미디어가 아직 들어오지 않은 상태, `EXTERNAL_PENDING`은 접수 backend 또는 외부 서비스 상태처럼 사이트 코드 밖의 연동이 남은 상태입니다. 깨진 route나 핵심 동작이 발견되면 `FAIL`로 기록합니다.

데스크톱 1440×900에서 홈, 기술, 연구, 회사, 소식, 장비, 문의, AX 페이지를 한국어와 영어로 열고 브라우저 언어 전환도 시험했습니다. 로컬 미리보기에서 16개 URL 요청과 브라우저 렌더링을 확인했습니다. 홈/AX 외부 진입은 공유 렌더러인 `dist/site.js`의 경로 분기와 공용 header/footer를 함께 확인했습니다.

## 페이지별 결과

| 페이지 | 구현 상태 | 콘텐츠·외부 대기 | 확인 결과 및 남은 작업 |
|---|---|---|---|
| 홈 — [index.html](../../dist/index.html) | IMPLEMENTATION_PASS | CONTENT_PENDING | KO/EN, 첫 화면 영상 stage와 텍스트 계층이 동작합니다. 60초 영상은 이미 generation-ready 슬롯에 있으며 매니페스트 `src`가 `null`인 것이 현재 승인 대기 상태입니다. 영상 전달 뒤 연결·검수만 남았습니다. |
| 기술·솔루션 — [business.html](../../dist/business.html) | IMPLEMENTATION_PASS | CONTENT_PENDING | 페이지·기술 상세 route와 KO/EN 전환이 작동합니다. 대표 상세 3개와 목업 상세 자리는 허용된 front-end structure입니다. 최종 기술 설명과 전체 자료 이관이 남았습니다. 근거: [site.js](../../dist/site.js#L19). |
| 연구·성과 — [research.html](../../dist/research.html) | IMPLEMENTATION_PASS | CONTENT_PENDING | 분류, 검색, 상세 route 및 언어가 작동합니다. 대표 기록 외의 실제 게시글 본문·첨부 이관이 남았습니다. 목업 항목 자체는 구현 실패가 아닙니다. 근거: [site.js](../../dist/site.js#L20). |
| AX Platform — [ax-platform.html](../../dist/ax-platform.html) | IMPLEMENTATION_PASS | CONTENT_PENDING | KO/EN, 900px 높이 히어로, 실제 Discover/Predict/Monitor 탭, 방향키와 제품 클립 경로가 동작합니다. 별도 30초 콘셉트 영상은 generation-ready 슬롯이고 최종 media만 대기 중입니다. 근거: [ax-v2.js](../../dist/ax-v2.js#L29), [film-manifest.json](../../dist/film-manifest.json). |
| GeoSR 소개 — [company.html](../../dist/company.html) | IMPLEMENTATION_PASS | CONTENT_PENDING | 페이지 앵커, 전문 분야 링크, 인증 자료 탐색과 거점 정보가 동작합니다. 실제 기업 연혁·조직·소개서·채용 및 인증 원본의 최종 확인·이관이 남았습니다. 목업 자료 자리표시는 허용된 상태입니다. 근거: [company-v2.js](../../dist/company-v2.js#L1), [interactions.js](../../dist/interactions.js#L30). |
| 소식 — [news.html](../../dist/news.html) | IMPLEMENTATION_PASS | CONTENT_PENDING | 카테고리, 제목 검색, 상세 route와 KO/EN이 동작합니다. 최종 게시글·본문·첨부 전체 이관이 남았습니다. 근거: [site.js](../../dist/site.js#L20). |
| 관측·장비 — [equipment.html](../../dist/equipment.html) | IMPLEMENTATION_PASS | CONTENT_PENDING | 조사·실험·선박 필터, 대표 장비 3개와 KO/EN이 동작하며 로컬 이미지 응답도 정상입니다. 실제 장비 범위와 검증된 제원 추가가 남았습니다. 근거: [site.js](../../dist/site.js#L21), [site.js](../../dist/site.js#L22). |
| 문의 — [contact.html](../../dist/contact.html) | IMPLEMENTATION_PASS | EXTERNAL_PENDING | KO/EN, 전화·이메일 링크와 양식 UI가 동작합니다. 현재 양식은 제출 내용을 저장하지 않는 UI prototype입니다. 운영 접수 backend 또는 검증된 외부 문의 경로 연결이 남았습니다. 근거: [site.js](../../dist/site.js#L23). |
| GeoDAP 외부 진입 | IMPLEMENTATION_PASS | EXTERNAL_PENDING | 상단·본문·footer에서 `https://www.geo-dap.com/`로 이동하며 새 창 링크에 `rel="noopener"`가 설정되어 있습니다. 외부 서비스 상태와 운영 도메인에서의 목적지는 이번 로컬 감사 범위 밖입니다. |

이 감사 범위의 로컬 페이지에서 404는 없었습니다. 홈에서 노출하는 `research`, `contact`, `equipment` 및 명시된 주요 route도 존재합니다. 따라서 front-end route 구현은 모두 `IMPLEMENTATION_PASS`이며, 콘텐츠·외부 연동 대기는 그 상태와 별도로 표기했습니다. 정적 스캔에서 37개 로컬 script/style/data/media 파일이 모두 2xx로 응답했습니다.

## 공통 화면·언어·링크 점검

- 공용 header/footer는 모든 페이지에서 `site.js`가 렌더링합니다. 1440×900에서 같은 `Noto Sans KR, Arial, sans-serif` 글꼴 체계를 확인했고, 어두운 홈·AX 영역과 밝은 내부 페이지가 같은 탐색 구조를 유지합니다. 초기 HTML에 적힌 로딩 문구는 실행 후 모든 페이지에서 사라졌으며, 이전 디자인 셸은 보이지 않았습니다.
- 8개 route를 KO와 EN으로 각각 열었고, 각 페이지의 언어 버튼을 왕복 조작했습니다. 경로와 `lang`이 보존됩니다. `business.html?id=15&lang=ko`에서 영어로 전환할 때 `id=15`도 보존되는 것을 확인했습니다.
- 1440×900에서 가로 넘침과 로드 완료 이미지의 `naturalWidth=0`은 없었습니다. AX hero는 900px 높이였고, 탭은 `aria-selected`와 roving `tabindex`를 갱신했습니다.
- 공용 arrow는 실제 내부 경로, 문서 열기, 메일/전화 동작, 외부 GeoDAP 진입에 붙어 있습니다. 다만 인증 문서 카드의 `자료 보기 ↗`는 버튼을 눌렀을 때 바로 새 페이지로 이동하지 않고 확대 모달을 엽니다. 같은 표식이 실제 이동인지 확대 동작인지 혼동될 수 있으므로 해당 버튼 표식을 확대 아이콘이나 동작 문구로 정리할 필요가 있습니다. 원문을 여는 모달 안의 외부 링크는 별도 `target="_blank" rel="noopener"`입니다. 근거: [interactions.js](../../dist/interactions.js#L45), [interactions.js](../../dist/interactions.js#L58).
- 고유 document title은 [site.js](../../dist/site.js#L24)에서 KO/EN 페이지별로 설정합니다. `business`, `research`, `news` 상세 항목과 장비 카테고리 제목도 별도 처리하며, 로컬 1440×900 확인에서 `equipment`·`contact`의 일반 회사 제목 문제를 바로잡았습니다. 9개 route HTML의 `site.js` query도 새 key로 갱신해 이전 브라우저 캐시를 무효화했습니다.
- [index.html](../../dist/index.html)은 GSAP, ScrollTrigger, Three.js를 jsDelivr CDN에서 불러옵니다. 콘솔 경고 source는 `dist/index.html`의 `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js`입니다. 저장소에 Three.js 로컬 배포본이나 package manifest가 없고, [motion-lab.js](../../dist/motion-lab.js#L1)는 `window.THREE` 전역 UMD build를 쓰는 선택적 hero 효과와 GSAP reveal을 같은 classic script에서 초기화합니다. 지원되는 ESM 전환은 Three.js 로컬 의존성 도입 및 초기화 순서 변경을 요구합니다. 기존 효과를 깨뜨리거나 새 CDN 의존을 만들 위험이 있어 이번 범위에서는 코드를 변경하지 않았습니다. `motion-lab.js`는 Three 전역이 없을 때 3D 효과를 건너뛰는 fallback이 있으므로, 후속 검토는 선택적 Three 효과 제거 또는 프로젝트 차원의 로컬 ESM bundle 적용입니다.
- `site.js`는 9개 진입 HTML에서 `?v=20260920-r1`로 갱신했습니다. 공통 CSS/다른 JS의 query 값은 entry별로 아직 다르므로, 운영 배포를 확정할 때 실제 적용 파일과 cache-busting 값을 함께 정렬합니다. 근거: [business.html](../../dist/business.html#L1), [index.html](../../dist/index.html#L1).

## 재현 가능한 검사

```powershell
node --check scripts/verify_redesign_routes.mjs
node --check dist/site.js
node scripts/verify_redesign_routes.mjs
```

`REDESIGN_PREVIEW_URL` 환경 변수로 미리보기 주소를 바꿀 수 있습니다. 스크립트는 8개 route의 KO/EN 응답, HTML에서 참조한 local CSS/JS, 코드에 명시된 media 경로, runtime `content.json`과 `film-manifest.json`의 실제 `src` 경로를 HTTP로 확인합니다. `delivery` 필드는 미래 납품 위치이므로 요청 대상으로 취급하지 않습니다. 브라우저에서 KO/EN 페이지 및 상세 제목, 언어 전환, 콘텐츠 렌더링, AX 탭·키보드 동작, overflow와 console/network 상태를 1440×900에서 확인했습니다.
