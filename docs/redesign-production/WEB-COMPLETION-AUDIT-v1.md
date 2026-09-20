# GeoSR 웹 구현·콘텐츠 이관 상태

기준일: 2026-09-20<br>
브랜치: `redesign/production-2026-09-19`<br>
공식 진입점: [dist/index.html](../../dist/index.html) · AX: [dist/ax-platform.html](../../dist/ax-platform.html)<br>
미리보기: `http://127.0.0.1:18102/`

## 페이지 구현 상태

`IMPLEMENTATION_PASS`는 경로·탐색·언어 전환·화면 구조가 동작함을 뜻한다. 사용자가 허용한 목업, 빈 게시물, 출처 검토 중인 자료 자리표시는 구현 실패가 아니다. 최종 회사 자료·게시물·미디어는 `CONTENT_PENDING`, 외부 서비스와 문의 접수 연동은 `EXTERNAL_PENDING`으로 별도 기록한다.

| 경로 | 구현 | 별도 대기 | 현재 상태와 남은 일 |
| --- | --- | --- | --- |
| 홈 — [index.html](../../dist/index.html) | IMPLEMENTATION_PASS | CONTENT_PENDING | 100svh Earth poster hero, 다섯 단계 연구 흐름, AX/GeoDAP 독립 진입, 자격 자료·기록·문의 연결이 동작한다. 메인 60초 영상은 generation-ready이며 manifest `src:null`, `approval:pending` 상태다. 최종 영상 생성·편집·연결은 남아 있다. |
| 기술 — [business.html](../../dist/business.html) | IMPLEMENTATION_PASS | CONTENT_PENDING | 분야별 랜딩과 기술 상세 URL·KO/EN 전환이 동작한다. 일부 상세 내용과 전체 기술 자료 이관을 기다린다. |
| 연구 — [research.html](../../dist/research.html) | IMPLEMENTATION_PASS | CONTENT_PENDING | 자료 분류·검색·상세 route가 동작한다. 화면의 예시와 게시물 자리표시는 실제 자료와 구분하며, 전체 본문·첨부 이관을 기다린다. |
| AX Platform — [ax-platform.html](../../dist/ax-platform.html) | IMPLEMENTATION_PASS | CONTENT_PENDING | 100svh 콘셉트 필름 stage와 수동 기능 탭이 동작한다. Discover는 검증된 화면 확보 전 16:9 준비 slate, Predict/Monitor는 출처·버전·권리 검토 중인 대표 미리보기다. 기존 포스터를 새로 캡처한 실제 화면으로 부르지 않는다. AX 30초 film은 `src:null`, `approval:pending`이다. |
| GeoSR 소개 — [company.html](../../dist/company.html) | IMPLEMENTATION_PASS | CONTENT_PENDING | 회사 정보 구조, 자격 자료 분류·검색·확대, 사업장 안내가 동작한다. 연혁·조직·소개서·채용 자료와 자격 문서의 유효성·공개 권리 확인 및 이관을 기다린다. |
| 소식 — [news.html](../../dist/news.html) | IMPLEMENTATION_PASS | CONTENT_PENDING | 공지·보도·뉴스레터 분류, 검색, 상세 화면이 동작한다. 기존 원문과 첨부를 확인해 전체 게시물을 옮긴다. |
| 관측·장비 — [equipment.html](../../dist/equipment.html) | IMPLEMENTATION_PASS | CONTENT_PENDING | 분류·검색과 대표 항목 화면이 동작한다. 항목별 실물명·제원·사진 provenance·사용 권리를 확인한 뒤 자료를 보완한다. 장비 카탈로그 확장보다 회사·AX 콘티와 웹 디자인을 우선한다. |
| 문의 — [contact.html](../../dist/contact.html) | IMPLEMENTATION_PASS | EXTERNAL_PENDING | 전화·이메일 링크와 미리보기 양식이 동작한다. 현재 양식은 입력을 저장·전송하지 않으므로 운영 접수 backend 또는 검증된 대체 경로가 필요하다. |

GeoDAP은 AX와 별개의 외부 서비스다. 홈과 공용 탐색에서는 독립 링크만 제공하며 검증되지 않은 GeoDAP 화면이나 `33 LIVE DATASETS` 수치를 사용하지 않는다. 외부 서비스의 현재 상태는 이 로컬 front-end 검사로 판단하지 않는다.

## 데스크톱·접근성·기술 확인

- 8개 경로의 KO/EN을 1920×1080과 2560×1440에서 렌더해 32개 route/viewport/language 조합을 확인했다. 홈·AX hero는 각각 100svh이며 첫 화면에 뒤 섹션이 드러나지 않는다. 홈 hero의 `h1`은 두 줄로 유지되고 Earth frame과 겹치지 않는다.
- 두 viewport에서 가로 넘침, 로드 완료 이미지의 broken reference, 브라우저 console error가 없었다. 16:9 AX media slot은 원본 비율을 보존한다. Detect는 준비 slate이고 기존 Predict/Monitor 자료는 대표 미리보기로만 설명한다.
- reduced-motion 설정에서 poster는 유지되고 자동 모션이 정지된다. 공용 메뉴·언어 버튼, AX/연구 흐름/자격 자료의 키보드 상태와 focus-visible 표시를 확인했다.
- `verify_redesign_routes.mjs`는 16개 KO/EN route 응답과 31개 local script/style/data/media 요청의 2xx 응답을 확인했다. 모든 `dist/*.js`에 `node --check`를 실행했고 `verify_metadata_accessibility.mjs`, `verify_film_readiness_v3.mjs`, `git diff --check`가 통과했다.
- 현재 `dist/index.html`에는 외부 GSAP·Three CDN이나 `motion-lab.js`가 포함되지 않는다. 새 콘솔 경고·외부 런타임 의존을 만들지 않도록 페이지 효과는 현지 CSS/JS로 처리한다. 새로고침한 현재 로컬 홈에서 console/network 오류를 재현하지 못했다.
- 공용 renderer는 공식 도메인 `https://www.geosr.com`을 기준으로 canonical과 `og:url`을 런타임에 생성한다. 배포 시 경로·언어 URL이 올바른 문서를 제공하는지 확인한다. 공개 권리와 crop-safe 비율을 확인한 공유 artwork가 없어 `og:image`와 `twitter:image`는 생략한다.

## 남은 콘텐츠·출시 관문

- 회사 필름 60초와 AX 콘셉트 필름 30초는 키프레임·생성 준비 상태다. 최종 영상은 아직 생성·편집되지 않았고, `film-manifest.json`의 두 필름 slot은 `src:null`, `approval:pending`이다.
- AX Predict/Monitor 자료와 로컬 AX clip의 캡처 URL·촬영 시점·제품 버전·공개 사용 권리를 검토한다. Satellite Facility Detect는 검증된 capture를 확보하기 전 16:9 준비 상태로 유지한다.
- 회사 연혁·조직·회사 소개서·채용 자료, 자격 문서의 유효성·사용 권리, 연구·소식의 본문·첨부, 기술 설명 전체 이관을 완료한다. 현재까지 확인하지 못한 사실을 채우거나 실시간 상태로 표현하지 않는다.
- 문의 backend를 연결하고 production 배포 후 route·언어·canonical 매핑, 실제 접수, 권한과 공개 자료를 최종 확인한다.
- [공개 자료 이관 목록](../source-migration/README.md)은 별도 수집 작업에서 갱신 중이다. 수집 결과를 검토해 누락 자료와 route 분류를 통합한 뒤 최종 배포 QA를 수행한다.

## 재현 명령

```powershell
node --check dist/site.js
node --check dist/home.js
node --check dist/ax-v2.js
$env:REDESIGN_PREVIEW_URL='http://127.0.0.1:18102/'
node scripts/verify_redesign_routes.mjs
$env:REDESIGN_PREVIEW_URL='http://127.0.0.1:18103/'
node scripts/verify_metadata_accessibility.mjs
node scripts/verify_film_readiness_v3.mjs
git diff --check
```
