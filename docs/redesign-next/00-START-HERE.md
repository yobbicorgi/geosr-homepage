# GeoSR 작업 시작점

2026-09-28 기준. 사용자 최신 지시와 루트 `AGENTS.md`를 먼저 적용합니다. 개발 위치는 `C:\Users\user\Documents\Codex\Projects\geosr-homepage`이고 다운로드의 `GeoSR_Homepage`는 같은 저장소를 가리킵니다.

## 현재 구현

- 메인은 [재구성 및 검수 기록](13-HOME-REBUILD-20260928.md)의 순서로 다시 설계했습니다. 광역 연안 히어로, 현장·분석·모델·원격탐사의 스크롤 장면, 원문 기반 연구 목록, AX·GeoDAP 각각의 전체 화면 미리보기, 자격 자료, 기존 공개 글 검색, 소식으로 이어집니다.
- 핵심 정보를 탭과 겹친 연구 카드에 숨기지 않습니다. 마우스 휠은 페이지 기본 스크롤로 작동하고 자격 문서와 AX 갤러리에는 각각 별도 조작이 있습니다.
- AX 페이지는 [직원 제작 저장소의 AX 부분만 삽입](11-AX-EMBED-REVIEW.md)했습니다. 회사 소개 콘텐츠는 가져오지 않았습니다.
- 기존 공개 사이트 글은 텍스트 기준 2,024건을 검색 가능한 자료실에 보존했습니다. 원본 이미지·첨부파일·일부 자격 자료의 완전한 이관은 별도 확인이 필요합니다.
- 브라우저 제목은 `GeoSR`, favicon은 회사 로고입니다. 국·영문 경로를 함께 유지합니다.

## 영상과 미디어 상태

- 회사 메인 영상은 [광역 현실 환경 중심 연출안](09-20260928-HOME-FILM-REVISION.md)에 따라 제작할 계획입니다. 현재 히어로는 실제 지역이 아닌 콘셉트 정지 이미지이며 영상은 연결되지 않았습니다.
- 신규 제작은 [Higgsfield 제작 카드](10-HIGGSFIELD-PRODUCTION.md)를 기준으로 합니다. CF01 생성 요청은 Basic 이상 요금제 요구로 거절돼 신규 파일이 없습니다. 계정 업그레이드와 구매는 실행하지 않았습니다.
- AX 전체 소개 영상과 요소별 신규 영상도 미완료입니다. 플랫폼의 정적 캡처를 실시간 데이터나 운영 화면으로 주장하지 않습니다.
- 이전 도구의 제작 프롬프트와 연결은 현재 작업 지시에서 사용하지 않습니다. 보관 원본은 현재 페이지에서 자동 연결하지 않습니다.

## 파일 책임

| 위치 | 역할 |
| --- | --- |
| `dist/index.html`·`home.js`·`home.css`·`home-motion.js` | 메인 구성, 반응형 스타일, 절제된 진입 모션 |
| `dist/site.js` | 공통 탐색, 회사·기술·연구 등 내부 페이지 |
| `dist/ax-source-gallery.js`·`ax-embedded-gallery.js` | 삽입된 AX 서비스 자료와 조작 |
| `dist/source-archive.*` | 수집한 기존 공개 글 탐색 |
| `dist/film-manifest.json` | 검수된 로컬 영상만 연결하는 상태 계약 |
| `docs/source-migration/` | 수집 원문, 출처, 이관 한계 |
| `media-source/` | 보관 원본과 수집 원장. 사이트 실행 자산과 구분 |

공개 `dist`에서 미사용 이전 시안과 중복 AX 탐색 구현은 제거했습니다. 이미지 검수 페이지는 `scripts/render_image_review.mjs`로 생성하는 작업 도구라 유지합니다. 과거 설계와 검수 근거는 `docs/redesign-plan/`, `docs/redesign-production/` 및 이 디렉터리의 이전 번호 문서에 보존합니다.

## 읽는 순서

1. [이번 메인 변경과 QA](13-HOME-REBUILD-20260928.md)
2. [영상 방향](09-20260928-HOME-FILM-REVISION.md), [Higgsfield 제작 상태](10-HIGGSFIELD-PRODUCTION.md)
3. [AX 출처·삽입 범위](11-AX-EMBED-REVIEW.md), [원문 자료 이관 검수](12-HOME-ARCHIVE-QA-20260928.md)
4. 필요할 때 [초기 화면 설계](01-DESIGN-SPEC.md), [미디어 연출](02-MEDIA-DIRECTION.md), [과거 실행 계획](03-EXECUTION-PLAN.md)
5. 장면·자산 작업 시 `production-plan.json`, `PROMPT-CARDS.md`, `asset-register.json`, `IMAGE-REBUILD-REGISTER.json`

과거 문서의 완료 문구와 제작 준비 점수는 현재 디자인 승인이나 영상 합격으로 사용하지 않습니다.
