# GeoSR 기존 작업 통합검토 기록

> **서브에이전트 조사 기록. 최종 디자인 지시서가 아니다.** 아래 제안·전체자료 인수조건·영상계획·일부 경로는 이전 상태를 기록한다. 최신 메인 설계는 [00-START.md](00-START.md)에서 시작하며, 현재 작업은 소량 샘플로 형태를 검토하는 목업이다. 정리 과정에서 폐기된 초안은 프로젝트 밖 복구본에 보관돼 있다.

작성일: 2026-09-17  
대상 작업본: C:/Users/user/Downloads/GeoSR_Homepage_v2  
현재 상태: 조사·설계 문서 완료 단계. 이번 단계에서는 홈페이지 코드, 새 디자인, 영상, Higgsfield 생성·배포를 실행하지 않는다.

이 문서는 폴더에 남아 있는 조사·기획·영상·디자인 자료를 다시 분류하고, 확인된 GeoSR 사실을 새 정보 구조에 연결하기 위한 인수 문서다. 기술·실적·첨부·영어 원문을 유지하면서 전면 개편할 때의 결정 지점과 인수 기준을 정한다.

## 1. 조사 범위와 사실의 기준

- 로컬 V2는 빌드 도구가 없는 HTML/CSS/JS 정적 작업본이다. 실행 명령은 node preview-server.cjs이고 기본 포트는 18101이다. 프리뷰는 공개 배포가 아니다.
- 공식 V1과 운영 홈페이지는 별도 보존 대상이다. 이번 작업은 C:/Users/user/Downloads/GeoSR_Homepage_v2의 로컬 프리뷰만 대상으로 한다.
- 2026-09-16 로컬 캡처에는 고정 회사 정보 7건, 사업 상세 21건, 활성 장비 80건, 게시판 6종 1,105건, 회사·사업·장비 자산과 게시판 첨부가 있다. 정확한 세부 분야와 URL은 geosr-content-map.md에 기록했다.
- 고정 데이터의 활성 장비 분류는 측량 44, 조사 21, 생물 2, 실험 10, 선박 3의 5개군이다. 예전 메뉴 주석에 보이는 수질 장비 water.asp는 활성 분류로 확인하지 않았으므로 6개군으로 단정하지 않는다.
- 인증·면허·특허·수상 이미지는 공식 페이지에 카드와 제목이 있었다는 사실만 확인했다. 발급기관의 현재 유효성, 갱신 여부, 로고·증서 공개 권한은 별도 확인한다.
- 게시판 사업·연구·학술 상세는 제목·일자·발주처 필드가 보존됐지만 본문이 없는 레코드가 많다. 빈 본문에 설명이나 성과 수치를 만들지 않고, 사용자 화면에는 자연어로 원문 상세를 안내하며 source-only·needs-review 같은 내부 값은 데이터 메타에만 둔다.
- 영어는 동일 레코드 ID로 국문과 연결한다. 공식 영문 원문, 논문·특허의 확인된 원제, 편집 번역의 출처를 내부 메타에서 분리한다. 한국어 원문을 자동 번역해 공식 영문 성과처럼 표시하지 않으며, 사용자에게 V2 translation 같은 개발 상태를 노출하지 않는다.

## 2. 기존 자료 인벤토리와 계승 판단

### 운영·콘텐츠 기준 문서

| 경로 | 이번 확인 | 기존 문서의 핵심 | 새 설계 판단 |
|---|---|---|---|
| C:/Users/user/Downloads/GeoSR_Homepage_v2/CLAUDE.md | 전문 확인 | 정적 V2 범위, V1 보존, 1,105건·21개·80건·첨부 연결, 원본·생성·번역 상태 분리, 접근성·복구 계약 | 유지. 새 구현의 운영 계약으로 삼는다 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/PRODUCTION-HANDOFF.md | 전문 확인 | 기업 영상은 조사→분석→모델→AI·위성의 정체성, AX는 기능 소개, 실제 자료·권리 검수 전 영상/Higgsfield 미실행 | 유지. 이후 영상 제작의 단일 기준 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/README-PREVIEW.md | 전문 확인 | 프리뷰 URL, 9개 로컬 페이지, 기존 EN 기본과 lang=ko, 자료실·JSON 연결, 검수·영상 미완료 | 실행 안내는 유지하되 새 시안에서는 한국어 기본 언어로 재설계 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/README-MODEL-FIRST.md | 전문 확인 | 18100의 과거 model-first 실험. 현재 V2 진입 문서가 아니며 실제 서비스·검증 통계를 만들지 않았음 | 역사 자료로 보관. 새 IA와 디자인 기준으로 사용하지 않는다 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/research-docs/README.md | 전문 확인 | 활성 핵심 문서 00, 18, 25, 27, 33과 보관 ZIP 위치 | 유지. 본 문서와 콘텐츠 맵을 다음 활성 조사 문서로 연결 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/research-docs/00_현재상태_한장요약.md | 전문 확인 | 현재 데스크톱 표현은 검토본, 기존 영상과 AX 영상 자리는 보존, 전체 검수·영문 감수·권리 확인은 미완료 | 현재 상태만 계승. 기존 시각 순서를 최종 요구사항으로 고정하지 않는다 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/research-docs/18_벤치마크_실시청과_웹전체설계_준비.md | 전문 확인 | BNT 실제 데이터 영상 관찰, All4Land 공간 정합 그래픽 관찰, GeoDAP의 짧은 가치 문장. 타사 자산·레이아웃 복제 금지 | 비교 원칙과 출처만 계승. 국내 기업형 IA와 GeoSR 사실에 맞춰 재구성 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/research-docs/25_최종구성_및_통합검증_20260916.md | 전문 확인 | 9페이지·JSON·검색·한영·키보드·모바일 등의 이전 검증과 남은 시각·권리·성능 과제 | 검증 체크를 계승. 이전 디자인 순서는 새 IA 결정 후 폐기 가능 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/research-docs/27_Refero7종_재검토_전면재구성_결정.md | 전문 확인 | 디자인은 자유롭게 교체 가능, 회사 역할·실제 근거·한영·접근성은 유지, 생성 이미지와 플랫폼 상태를 가장하지 않음 | 전면 재구성의 근거로 유지 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/research-docs/33_한영_공통콘텐츠_및_공식용어_원칙_20260916.md | 전문 확인 | 동일 ID, 기존 병기 영문, 공식 영문 페이지, 출판 원제, V2 번역 상태를 단계별로 분리 | 새 KO 기본·EN 전환의 데이터 정책으로 유지 |

### 원문 수집·데이터 문서

| 경로 | 이번 확인 | 핵심 | 새 설계 판단 |
|---|---|---|---|
| C:/Users/user/Downloads/GeoSR_Homepage_v2/research-docs/source-capture-20260916/fixed-content/collection-report.md | 전문 확인 | 공식 GET 기반 7개 고정 페이지, 4개 사업 분류·21개 상세, 5개 장비 분류·80개 상세, 브로슈어·자산 해시와 오류 0건 | 사실·자산 근거로 유지 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/research-docs/source-capture-20260916/public-boards/REPORT.md | 전문 확인 | 6개 보드 1,105건, 상세 성공 1,105/0, 본문·inline 이미지·첨부 통계, sourceUrl/localPath 규칙 | 게시판 상세·첨부 설계와 내부 provenance 필드의 근거로 유지 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/research-docs/source-capture-20260916/corporate-inventory.md | 파일·핵심 항목 확인 | 회사 고정 콘텐츠와 기업 자산의 원본·로컬 매핑 | 실제 사진·브로슈어·인증 원본 연결에 유지 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/research-docs/sources/README.md | 전문 확인 | 브로슈어 spread는 조사 근거이며 재사용 권한이나 게시 결정과 다름 | 실제 원문·권리 확인의 참고로 유지 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/portal/local-content-20260916/fixed-data.json | 구조·필드·21개 상세 본문 확인 | 회사·6개 root 업무축·21개 기술·5개 장비군·자산·브로슈어·외부 링크 | 새 데이터 어댑터의 정본으로 유지 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/portal/local-content-20260916/board-data.json | 구조·보드·대표 레코드 확인 | 보드 6종, 1,105건, sourceUrl·sourceListUrl·fields·첨부·외부 링크 | 새 자료실 데이터의 정본으로 유지 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/portal/local-content-20260916/en-fixed-data.json, en-runtime-overlay.json | 파일·출처 필드 확인 | 검증된 회사·사업·장비 일부의 공식 영문 표시 필드 | ID와 출처를 내부 adapter에 보존하고, 화면에는 자연스러운 영문 콘텐츠만 노출 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/portal/local-content-20260916/en-board-mapping.json, en-board-translations-business-research.json | 파일·출처 필드 확인 | 보드 레코드의 영문 매칭과 편집 번역 | 공식 영문·편집 번역·국문 원문을 내부 메타에서 분리하고 사용자에게 개발 상태를 노출하지 않음 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/portal/local-content-20260916/en-credential-mapping.json, en-entity-mapping.json | 파일·상태 확인 | 증서·조직·개체의 영문 매칭 근거 | 인증·조직 영문 표시의 상태 필드로 사용 |

### 현재 디자인·레이아웃 구현

| 경로 | 이번 확인 | 기존 상태 | 새 설계 판단 |
|---|---|---|---|
| C:/Users/user/Downloads/GeoSR_Homepage_v2/portal/design-v2-20260916/README.md | 전문 확인 | home-next, ax-next, site, design, platform-data, 검색·가독성·Refero CSS가 현재 표현 계층. EN 기본, 기술 6분야와 자료·AX 연결 | 실제 데이터·검색·접근성 로직은 계승하되 시각 언어와 IA는 재설계 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/portal/design-v2-20260916/home-next.css, home-next.js | 파일·역할 확인 | 메인 기술 패널, 자동 전환, 연구·서비스 구간 | 반복 카드와 영어 중심의 계층은 재검토. 선별 화면 자산과 상태 제어는 재사용 후보 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/portal/design-v2-20260916/ax-next.css | 파일·역할 확인 | AX 소개·영상 자리·플랫폼 탐색 | 영상 자리와 플랫폼 설명 구조만 유지. 실제 화면과 상태를 먼저 보여주는 새 플랫폼 페이지로 재구성 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/portal/design-v2-20260916/site.js, design.js, search.js, science-graphics.js | 파일·역할 확인 | 공통 내비게이션, footer, 검색, 시각화·상태 제어 | 라우트·검색·접근성 동작을 새 데이터 어댑터에 맞춰 재사용 또는 재작성 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/portal/design-v2-20260916/platform-data.js | 전문 확인 | 9개 AX 항목, 8개 운영 표시와 1개 개발 중, GeoDAP 분리 | 이름·상태·외부 링크를 보존. 개발 중 항목에 실행 주소를 만들지 않는다 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/portal/design-v4/ | 파일 목록·이름 확인 | 18100 model-focus, cinema, scroll, technology-story, platform gallery/workspace 등 과거 실험 묶음 | 세부 CSS/JS를 새 디자인에 그대로 합치지 않는다. 필요한 모션 아이디어만 선별 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/portal/desktop-cinema-20260917/ | 파일 목록·역할 확인 | home, business, AX, company-research용 데스크톱 시각 계층과 영상 교차 관찰 | 사용자 전면 개편 지시로 기존 색·레이아웃은 최종 기준에서 제외. 관찰자·reduced-motion 원칙만 계승 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/portal/editorial-20260914/README.md | 전문 확인 | 연속 스크롤·지역 장면·가상 화면·생성 시안의 제한, 운영 연결 없음 | 기록·아이디어로 보관. 제품·실적처럼 보이는 표현은 제거 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/redesign.html | 생성·상위 화면 검토 | 이번 세션의 미완성 dark editorial 초안. 고객 가치보다 “기록/화면으로 확인” 같은 메타 문구가 앞섰음 | 삭제하지 않고 보관. 다음 디자인에는 포함하지 않으며, 실제 근거 자산만 선별 계승 |
| C:/Users/user/Documents/Codex/2026-09-17/c-users-user-downloads-geosr-homepage/work/backup/homepage-upgrade-20260917/index.html | 백업 존재 확인 | 첫 편집 전에 기존 index.html을 보존한 백업 | 복구용으로 유지. 프로젝트에 복사하지 않는다 |

### 영상·이미지·시안

| 경로 | 이번 확인 | 상태 | 새 설계 판단 |
|---|---|---|---|
| C:/Users/user/Downloads/GeoSR_Homepage_v2/PRODUCTION-HANDOFF.md | 전문 확인 | H01~H08 기업 영상, AX 기능 클립, 장면·근거·권리 안전선 | 관측→분석→모델→AI·위성의 순서는 유지하고, 실제 자산 확보 후 영상 컷을 결정 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/research-docs/video-keyframes/README.md | 전문 확인 | H01/H02/H03/H05 모두 미승인 개념. 1672×941이며 4K 원본 아님 | 공개 페이지와 Higgsfield 입력에서 제외. 참고판으로만 보관 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/research-docs/video-keyframes/01_Main_Hero/_unapproved/ | README·파일 확인 | 가상 해안 장면. 실제 조사해역 아님 | 고객 사례·측정값으로 쓰지 않는다 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/research-docs/video-keyframes/02_AX_Platform/_unapproved/ | README·파일 확인 | 선박 탐지, 위성 양식시설, 어류 탐지 개념. 실제 탐지 결과·어종·현장 미검증 | 공개 UI에 넣지 않는다. 필요한 기능 설명을 실제 캡처로 대체 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/assets/corporate-20260916/README.md | 전문 확인 | USV, 수환경, 스마트 기술의 실제 공개 이미지. AI 생성 아님. 원본 URL·크기 기록 | 계승. 이미지마다 원본 출처와 역할을 함께 표시 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/assets/concepts-20260916/ | README·파일 확인 | 분석·USV 생성 시안, 실제 실험실·장비 사진 아님 | 공개 근거에서 제외하거나 명시적 concept 라벨을 붙인다. 실제 원본이 우선 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/assets/concepts-20260917/ | README 전문 확인 | coastal-survey-reconstruction-v1은 공개 연안침식 사진 기반 ImageGen 재제작. 원본 사진·결과 아님 | 새 사이트 기본 자산에서 제외. 실제 고해상도 원본 확보 시 교체 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/assets/journey-films-20260914/README.md | 전문 확인 | 5개 연속 장면, 크롭·인코딩·스크롤 프레임 탐색·모바일·reduced-motion 계획. 일부 시각 콘셉트 | 기술적 인코딩·접근성 아이디어는 참고. 새 영상은 원본·권리 확인 후 결정 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/assets/satellite-zoom-20260914/README.md | 전문 확인 | 위성 오프닝 원본·크롭·프리뷰·성능 및 Safari 미검수 | 기존 파일은 보존. 17MB 수준의 Blob 선로딩을 새 hero 기본값으로 사용하지 않는다 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/assets/video-keyframes-20260916/ | 파일·manifest 확인 | H01, H02, H03, H05 계열 키프레임 복사본 | 미승인으로 분리 유지 |
| C:/Users/user/Downloads/GeoSR_Homepage_v2/assets/six-scene/report.svg | 파일 목록 확인 | 과거 장면 보고 시각물 | 최종 IA·콘텐츠 근거가 아니므로 재사용하지 않는다 |

문서와 ZIP은 삭제하지 않았다. research-docs/archives/research-history-20260917.zip은 이전 번호 문서의 보관본이며, 실제 내용을 복원해 구현 기준으로 되돌리는 작업은 필요할 때만 한다.

## 3. 기존 작업에서 계승할 것과 과감히 바꿀 것

### 계승

- GeoSR 공개 원문, 6개 root 업무축, 4개 사업 분류, 21개 상세기술, 활성 장비 5개군 80개, 6개 게시판 1,105건.
- localPath, sourceUrl, sourceListUrl, fields, attachments, externalLinks와 기술 ID 기반 관계.
- 실제 회사 이미지, 실제 플랫폼 캡처, 국문·영문 브로슈어, 인증·면허 원본 이미지.
- 기존 상세의 기술 ID 필터. 모든 21개 상세에서 business와 academic 버튼이 같은 idx를 s_addtext2로 전달한다. 예: solution-15는 /sub/achieve/busines.asp?s_addtext2=15와 /sub/achieve/academic.asp?s_addtext2=15를 사용한다.
- 검색·필터·상세·첨부·원문 링크, Escape와 포커스 반환, 건너뛰기 링크, reduced-motion과 영상 일시정지의 기능 계약.
- 운영 사이트와 V1을 건드리지 않는 로컬 프리뷰·백업 규칙.

### 폐기 또는 재설계

- 영어 대형 타이포와 외국 에이전시형 dark editorial을 새 기본 언어·브랜드로 사용하지 않는다. 영어는 전환 언어이며 기술명·원제·필요한 메타에 역할을 둔다.
- 이번 세션 redesign.html의 “기록으로 확인합니다”, “실제 화면/원본 기록”류의 메타 설명은 홈페이지 headline으로 사용하지 않는다. 고객이 맡길 수 있는 업무와 산출물을 먼저 말하고, 근거는 아래 프로젝트·자료에서 보여준다.
- 6개 기술 탭을 동일 카드로 반복하고 페이지 안에서 기술 목록을 장문으로 나열하는 구조를 폐기한다. 4개 사업 허브와 21개 상세, 실제 화면·실적·장비를 문제 해결 흐름으로 연결한다.
- H01/H02/H03/H05 키프레임과 분석·USV·연안 재제작 이미지는 실제 현장·장비·탐지 결과로 사용하지 않는다. 새 영상은 해당 순서와 문제의식을 살리되 원본 화면·정밀 그래픽으로 다시 구성한다.
- AX를 서비스 접속 포털이나 운영상태 보증으로 표현하지 않는다. GeoDAP, USV, 전자해도는 실제 외부 링크와 역할을 분리한다.
- 영상이 없는 FEATURE FILM planned 영역을 완성된 영상처럼 꾸미지 않는다. 정지 캡처와 짧은 텍스트로 우선 제공한다.

## 4. 국내 경쟁사 공식 사이트 비교

현재 라이브 근거와 과거 실제 관찰을 구분했다. BNT와 All4Land의 2026-09-17 현재 HTML·CSS는 공식 URL에서 확인했고, 같은 날 실제 페이지를 1440×900과 390×844로 Playwright에서 읽기 전용 캡처했다. CUA의 브라우저 표면이 비어 있어 Playwright를 대체 경로로 사용했으며, 캡처는 화면 구성 확인용이다. 영상 장면에 관한 자세한 시각 관찰은 18번 조사 문서의 브라우저 관찰 기록을 함께 사용한다. 경쟁사 자산·문구·영상은 복제하거나 저장하지 않는다.

### 비엔티 BNT

- 공식 홈페이지: [bntsolution.com](https://www.bntsolution.com/)
- 현재 공식 HTML의 GNB는 홈, 회사 소개, OceanWatchAI, 포트폴리오, 프로젝트, 고객사, 오시는 길이다. 홈페이지는 “Massive Data Visualization”을 전면에 두고 3D WebGIS, Scientific Visualization, AI 기반 데이터 가시화·분석을 설명한다.
- OceanWatchAI는 대용량 데이터의 AI 분석·시각화, GPU 기반 웹 렌더링, 별도 소프트웨어 설치 없이 브라우저에서 처리한다는 가치 설명과 외부 링크를 제공한다.
- 포트폴리오 항목에는 북서태평양 해류, 황해 수심, 동해 해류, 태풍 이동경로가 있고, 각 자료에 Copernicus·GEBCO·JMA 출처와 영상 설명을 붙인다. 18번 실제 관찰에서는 검은 지구 배경 위의 주황색 해류, 태풍 장기 궤적, 청록색 수심 점군 등 분석 결과의 공간 형태가 화면 주인공이었다.
- 현재 공개 HTML에서 프로젝트·고객사 섹션의 제목은 확인되지만, 이번 읽기에서 상세 실적 목록을 복원하지 않았다. 비엔티의 3D 시각화 설명 구조는 참고하되 GeoSR의 공개 사업·연구 게시판을 BNT 내용으로 채우지 않는다.
- 현재 공식 CSS에는 viewport가 있고 992px에서 client/project grid가 2열, 480px에서 1열로 줄어든다. 768px 이하에서는 오른쪽에서 모바일 메뉴 drawer가 열리는 규칙이 있다. 이는 소스 기반 반응형 확인이며 모든 모바일 화면을 실제 캡처한 것은 아니다.
- 실제 캡처: [BNT 데스크톱](visuals/competitor-bnt-desktop.png), [BNT 모바일](visuals/competitor-bnt-mobile.png). 데스크톱은 검은 화면 위 지구 해류 영상, 중앙의 흰색·청색 메시지, 상단 수평 메뉴와 하단 선택 인디케이터가 한 화면에 겹친다. 모바일은 로고·햄버거만 남고 콘텐츠가 세로 중앙에 작게 압축되며 위·아래 검은 여백과 하단 영상/YouTube 조작부가 크게 보인다. GeoSR은 모바일에서 실제 이미지·문구의 유효 면적을 먼저 확보하고 영상 비율과 컨트롤을 별도로 설계한다.
- 활용 원칙: 분석 결과를 화면 중심에 두고 데이터 출처·대상·의미를 바로 옆에 표기한다. GeoSR에서는 동일 원칙을 실제 USV·위성·수치모델·AI 화면과 사업·학술 근거에 적용한다.

### 올포랜드 All4Land

- 현재 공식 홈페이지: [all4land.com/main.do](https://all4land.com/main.do)
- 현재 GNB는 About Us, Business, Platform & Service, ESG, Notice이며 하위에 Digital Twin, Territory, Marine, Administration, Survey & Database, R&D, Maritime R&D, Global Business, Satellite, AI, MapPrime Solution, LiveBus & D’ooh, ESG 세부, Press Release, Video Clips가 있다. KR 전환 버튼과 Alliance 링크도 있다.
- 현재 메인은 “spatial information can be connected, shared, and viewed”를 가치 문장으로 두고, 측량·DB·3D·cloud·big data를 전 국토 공간정보 사업과 연결한다. 사업과 solution, Overview, 사무실 정보가 순서대로 배치된다. Sales Figure 670, Specialists 358, Project 361이라는 숫자도 보이지만 GeoSR에 이 수치를 이식하지 않는다.
- 공식 구형·대안 도메인 [all4landglobal.com/business/map-prime.php](https://www.all4landglobal.com/business/map-prime.php)는 Company, Business, Client, ESG, Recruit 구조와 Mapprime Solutions 상세를 보인다. Mapprime Cloud는 조회·시각화·분석·공유·게시·배포·웹·모바일을 설명하고, Mapprime 3D는 BIM·GIS, WebGL, 센서·BIM 매시업, 대시보드·시나리오 모니터링과 Web/VR/AR 제품군을 소개한다.
- 18번 실제 브라우저 관찰에서는 해상 선박·섬·도시·교차로·건물에 점군·윤곽·리더선을 정합한 메인 영상을 확인했다. 현재 공식 main.js는 영상을 pin하고 step 전환을 사용한다. 이 점은 공간 대상과 분석 레이어를 같이 보여주는 원리로만 사용하고, 도시·영상 길이·ScrollTrigger를 복사하지 않는다.
- 현재 공식 CSS의 viewport에는 다중 breakpoint가 있고 1000px 이하에서 desktop breadcrumb의 보조 요소를 숨기고 menu dropdown을 사용한다. 소스에는 800, 1000, 1200, 1440px 이상 구간이 다수 존재한다. 실제 모바일 이미지 캡처는 이번 환경에서 확보하지 않았으므로 레이아웃 품질을 보증하지 않는다.
- 실제 캡처: [All4Land 데스크톱](visuals/competitor-all4land-desktop.png), [All4Land 모바일](visuals/competitor-all4land-mobile.png). 데스크톱은 호수·댐 항공 영상이 거의 전 화면을 차지하고 좌상단 로고와 우상단 햄버거가 얹힌다. 모바일은 같은 장면을 세로로 과감하게 크롭해 물·댐의 관계와 오버레이가 화면 안에 남는다. GeoSR도 대표 화면을 크게 보여주되, 한국어 headline과 CTA가 배경 위에서 읽히는 안전 영역을 별도 확보한다.
- 활용 원칙: 국내 발주처가 익숙한 회사·사업·고객·ESG·소식·채용 분류, 전문 솔루션의 깊은 하위 페이지, 데이터 기반 가치 문장을 참고한다. GeoSR은 여기에 21개 기술 상세와 게시판·첨부의 양방향 근거를 더한다.

### BNT·All4Land와 GeoSR의 차별화 결론

| 항목 | 경쟁사에서 확인 | GeoSR 새 설계 |
|---|---|---|
| 첫 화면 | BNT는 데이터 가시화 결과, All4Land는 공간정보 시장·사업 가치 | 관측·분석·예측을 고객 문제와 산출물로 설명하고 실제 GeoSR 화면·현장 자산을 배치 |
| 메뉴 | BNT는 7개 단순 앵커, All4Land는 사업·플랫폼·ESG의 넓은 기업형 IA | 6개 이내 상위 메뉴로 회사 / 사업분야 / 연구·성과 / 관측·장비 / 플랫폼 / 소식·문의 구성 |
| 근거 | BNT 포트폴리오 영상에 Copernicus·GEBCO·JMA 출처 | 21개 기술 상세, sourceUrl, s_addtext2 필터, business/research/academic 게시판, 첨부를 연결 |
| 신뢰 | All4Land는 고객·프로젝트·ESG·사무실을 별도 노출 | 인증·면허·특허·수상은 현행성 상태를 명시하고 실제 발주처·연구·현장 장비와 묶음 |
| 모바일 | BNT drawer와 1열 grid, All4Land 다중 breakpoint/dropdown | 한국어 긴 기술명과 영어 전환까지 고려한 유동 폭·가로 넘침 없는 목록·상세 |
| 시각 언어 | BNT의 데이터 영상, All4Land의 공간 정합 그래픽 | 실제 데이터·사진 중심의 편집형 레이아웃, 한국어 정보 명료성, 한 가지 신호색과 절제된 모션 |

캡처의 구조화된 관찰과 viewport는 [competitor-observations.json](visuals/competitor-observations.json)에 함께 저장했다. 해당 JSON은 BNT 페이지의 문자 인코딩 문제로 일부 한국어 텍스트가 깨질 수 있으므로, 시각 판단은 PNG와 위 공식 HTML·18번 기록을 우선한다.

## 5. Refero 확인 범위와 차용 원칙

Refero 공개 홈 [refero.design](https://refero.design/)과 공개 스타일 페이지를 확인했다. Refero는 Page Types, Flows, UX Patterns, UI Elements를 검색하는 공개 디자인 연구 라이브러리다. 로그인이나 유료 벽을 우회하지 않았고, 공개 색인·스타일 설명만 사용했다. 기존 폴더에는 Refero 스타일 분석 문서가 있으나 실제 GeoSR 템플릿으로 고정하지 않는다. Refero는 경쟁사처럼 결과 화면을 복제하는 출처가 아니라 초점·여백·탐색 패턴을 비교하는 참고 라이브러리로 사용한다.

### 추천 참고 사례

1. [Apple (España) style reference](https://styles.refero.design/style/569ba4c0-0431-44fb-92df-0dbea7f3e63d)
   - 차용할 원칙: 제품·사진을 큰 여백에 하나의 초점으로 놓고, 표면·테두리·색을 줄여 설명과 이미지에 집중한다.
   - GeoSR 적용: 실제 USV나 위성·모델 화면을 한 화면의 주인공으로 놓고, 기술명·고객 산출물·원문 링크는 짧고 명확하게 옆에 둔다.
   - 차용하지 않을 것: 제품 구매 흐름, 거대한 영어 headline, 기업 사실과 무관한 흰색 갤러리 문법.
2. [SpaceX style reference](https://styles.refero.design/style/13b74e34-b824-4d1d-bd2c-bb9bfbc2d6e1)
   - 차용할 원칙: 한 화면에 하나의 큰 이미지, 얇은 기술 라벨, 목적이 분명한 outline control, 사진 중심의 서사.
   - GeoSR 적용: 수심·입자·해일·위성 결과의 의미를 큰 정지 화면으로 보여주되, 실제 자료 출처와 상태를 항상 붙인다.
   - 차용하지 않을 것: 우주·군사 톤, 전면 흑색, 영문 대문자 중심, 무근거 화면을 실적처럼 보이는 연출.
3. [Linear style reference](https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1)
   - 차용할 원칙: 실제 product screenshot 우선, 얇은 구분선, 작은 기술 metadata, 넓은 단일 focal point, 기능 중심의 정보 밀도.
   - GeoSR 적용: 플랫폼 캡처와 게시글·실적의 필터/상세를 하나의 검색 가능한 자료실 흐름으로 구성한다.
   - 차용하지 않을 것: SaaS issue board, acid-lime 색, 영문 개발자 용어 중심의 제품 정체성.

Refero에서 확인한 핵심은 색과 폰트의 복제가 아니라 실제 화면·작품·정보 위계를 먼저 연구하는 방식이다. GeoSR의 기본 시각 언어는 한국어 읽기성과 국내 발주처 신뢰를 기준으로 정하고, Refero 원칙은 여백·초점·상태 표시·검색 동선에만 제한적으로 사용한다.

## 6. 권고 IA와 기존 URL 호환

GNB는 기술·성과를 먼저 찾도록 다음 6개 순서를 사용한다. 문의는 소식 메뉴에 섞지 않고 오른쪽 독립 CTA로 둔다. 상위 메뉴는 단순화하되, 기존 4개 사업 분류와 21개 원문 ID는 하위 탐색과 URL 호환에서 그대로 보존한다.

| 순서 | 새 상위 메뉴 | 하위 구조 | 데이터·기존 경로 |
|---|---|---|---|
| 1 | 사업·기술 | 업무별 보기: 수환경 보전 / 수환경 건강성 회복 / 재해예방 / 스마트 기술; 핵심기술로 찾기: 관측·측량 / 환경·생태 / 수치모델·예측 / 위성·영상 / AI·데이터 / 공간정보; USV·전자해도 바로가기 | conserve.asp idx 10~13, 21개 conserve_view.asp, usv.co.kr, e-navigation.co.kr |
| 2 | 연구·성과 | 사업실적 / 연구성과 / 학술자료 / 기술별 성과 | board-data business, research, academic; s_addtext2 기술 필터 |
| 3 | 플랫폼 | AX 화면 / 실제 플랫폼 캡처 / GeoDAP 외부 연결 | platform-data.js 9개, screenshots-20260907, geo-dap.com |
| 4 | 관측·장비 | 측량 / 조사 / 생물 / 실험 / 선박 | equipment categories 5개, 80개 detail |
| 5 | 회사소개 | 회사 개요 / 조직·거점 / 인증·면허·지식재산 / 회사소개서 / 채용 | fixed-data fixedPages, contactUs.asp, license.asp, recruit.asp, brochure attachments |
| 6 | 소식 | 공지 / 보도 / 뉴스레터 | board-data notice, press, newsletter. 문의는 독립 CTA와 contactUs.asp로 연결 |

‘핵심기술로 찾기’의 6개 항목은 원 사이트의 새 사업 실적이나 추가 기술을 주장하는 분류가 아니라, 21개 기술에 여러 개를 붙이는 편집상 교차 태그다. 예를 들어 무인선 이용 관측은 관측·측량과 공간정보를 함께 가질 수 있고, 인공지능 활용기술은 AI·데이터와 위성·영상에 걸칠 수 있다. 원문 제목·ID·사업실적/학술실적 관계가 우선한다.

### 페이지별 구성

| 페이지 | 주요 섹션 | 주 데이터 |
|---|---|---|
| 홈 | 고객 가치 headline, 관측→분석→예측 서사, 실제 화면·대표 기술, 대표 실적, 연구·학술, 신뢰 문서, 플랫폼 진입, 문의 CTA | fixed-data root, solution highlights, board-data, corporate images, platform screenshots |
| 사업분야 허브 | 4개 문제·업무 축, 산출물 예시, 대표 기술·실적·장비 연결 | business.categories, root images, solution metadata |
| 기술 상세 | 고객 문제, 기술 설명, 실제 방법, 대표 이미지/그래픽, 산출물, 사업실적·학술실적 필터, 원문 상세·첨부, 관련 기술 | fixed-data solution, local source HTML, s_addtext2 business/academic routes |
| 연구·성과 목록 | 보드 전환, 검색, 기술·연도·발주처·자료 유형 필터, 원문/번역 상태 | board-data records, en board maps |
| 게시글 상세 | 제목·분류·일자, 발주처/저자/매체, 본문, inline 이미지, 첨부, DOI·언론·원문, 관련 기술·사업 | board-data fields/bodyText/images/attachments/externalLinks |
| 관측·장비 | 현장 문제별 장비 묶음, 5개 장비군, 모델·용도·이미지·상세, 연결 실적 | equipment categories/items, asset manifest |
| 플랫폼 | 실제 화면 우선, 대상·기능·상태, 캡처, planned 표시, GeoDAP·USV·ENC 외부 링크 | platform-data.js, screenshots, fixed related links |
| 회사소개 | 회사 역할, 설립·연혁, 조직·거점, 인증·면허·IP, 브로슈어, 채용 | fixedPages, company-library, brochure PDFs |
| 소식 | 공지·보도·뉴스레터 탭, 상세·첨부 | board-data notice/press/newsletter |
| 독립 CTA 문의 | 사무소·담당 부서·문의 경로, 채용 링크 | contactUs.asp, recruit.asp |

### URL 호환 매핑

기존 URL은 삭제하지 않고 로컬 정적 라우트에 매핑한다. 새 상세 화면의 canonical은 로컬 route를 사용하더라도 sourceUrl을 metadata와 원문 링크로 보존한다.

| 기존 공식 URL 패턴 | 새 로컬 경로 예시 | 호환 규칙 |
|---|---|---|
| / | index.html | 언어 쿼리 없이 한국어 기본, legacy lang=ko와 lang=en을 정규화 |
| /sub/company/aboutUs.asp | company.html#about | about.asp가 아니라 aboutUs.asp가 현재 fixed-data sourceUrl |
| /sub/company/contactUs.asp | company.html#organization 또는 contact.html | 조직·사무소·문의 anchor 유지 |
| /sub/company/ci.asp, license.asp | company.html#resources | CI와 인증·면허·IP 필터를 동일 section으로 연결 |
| /sub/business/conserve.asp?idx=10&s_cate=수환경 보전 | business.html?category=water-conservation | idx 10~13을 category key로 매핑 |
| /sub/business/conserve_view.asp?s_cate=...&idx=15 | directory.html?section=business&category=10&detail=solution-15 | solution ID와 category를 보존 |
| /sub/achieve/busines.asp, research.asp, academic.asp | archive.html?board=business/research/academic | 오탈자 포함 busines.asp source path를 숨기지 않고 metadata에 유지 |
| /sub/achieve/busines.asp?s_addtext2=15 | archive.html?board=business&tech=15 | 21개 기술 ID 필터를 직접 매핑 |
| /sub/news/notice.asp, press.asp, letter.asp | archive.html?board=notice/press/newsletter | newsletter는 비노출 상태를 표시하되 route는 유지 |
| /sub/equipment/surveying.asp 등 | directory.html?section=equipment&category=surveying | 5개 활성 장비군과 mode=view idx 상세를 유지 |
| /sub/career/recruit.asp | careers.html | 채용·복리후생·지원 문구 원문 상태 유지 |
| /sub/policy/privacy.asp | company.html#privacy 또는 별도 privacy.html | 한국어 원문과 V2 번역 상태 표시 |
| http://usv.co.kr, https://e-navigation.co.kr/, https://www.geo-dap.com/ | external link | 새 탭·noopener noreferrer·현재 링크 확인 상태 표시 |

현재 V2의 기존 query route 동작을 깨지 않도록 첫 구현에서는 query를 파싱해 새 section을 열고, 이후 canonical과 title/meta를 언어별로 정리한다.

## 7. 홈 hero와 모션 스토리보드

### 제안 headline

다음 문구는 공식 슬로건을 바꾸는 확정 원고가 아니라 고객 가치 중심의 검토용 초안이다.

한국어 제안: 해양과 수환경의 변화를 관측하고, 예측 가능한 판단으로 연결합니다.  
보조 문구 제안: 현장 조사부터 수치모델·AI 분석까지, 문제에 필요한 데이터와 해석을 함께 설계합니다.

확정 전 확인: 공식 root 슬로건 Sustainable Geosystems for a better Life와의 병기 위치, 실제 제공 범위, 수치·발주처·성과 문구를 담당자가 감수한다.

### 6단계 화면 흐름

| 단계 | 실제로 보여줄 것 | 근거 자산/연결 | 모션 |
|---|---|---|---|
| 1 관측 | USV·연안·하천 조사 이미지와 관측 대상 | root USV image, solution-63, surveying/investigation equipment | 정지 hero, 이미지 안의 미세한 pan만 선택 |
| 2 측정 | 수심·파랑·수질·퇴적·UAV 점군·DEM의 한 가지 대표 출력 | solution-64/63, actual screenshots, solution gallery source | 스크롤 진입 시 데이터 레이어 한 번 fade |
| 3 해석 | 화학·생태 조사와 위성·CCTV·생물 영상 분석 | solution-48/56/58/59, equipment experiment/biological | 두 자료를 겹치지 않고 분리된 caption과 함께 전환 |
| 4 모델 | 유동·수질·퇴적·생태·해양예측의 시간 변화 | solution-15/46/52/65, local GIF/image, research IDs | 짧은 loop 또는 poster. 데이터 값·단위가 확인된 경우만 재생 |
| 5 AI | DNN/RNN, ConvLSTM, GAN 복원·초해상도, 탐지·알림 | solution-59/61, research-3059/3057, academic-3065 | 모델 입력→출력 2단계 wipe. 실제 결과와 콘셉트 구분 |
| 6 판단·실행 | 연안침식·재해·공간계획·풍력 입지·전자해도 등 고객 산출물 | solution-47/53/54/55/62, business-1994/1972/1978 | 대표 실적·원문 링크로 종료. 큰 숫자 통계 대신 맥락 표시 |

모션 원칙은 한 장면에 하나의 현상·출력·출처를 두는 것이다. 자동재생 영상은 기본으로 내려받지 않고 poster를 먼저 보인다. video가 있더라도 재생·일시정지·소리 없음·reduced-motion·saveData·hidden 상태를 제공한다. 기존 문서의 “스크롤이 영상 시간축을 직접 탐색하지 않는다”는 All4Land 관찰을 반영해, GeoSR의 새 화면은 스크롤과 프레임 탐색을 무조건 결합하지 않는다.

## 8. 한글·영문 UX 정책

- 새 로컬 시안의 기본 언어는 한국어다. 현재 프리뷰가 영어 기본인 사실은 README에 남기되, 새 IA에서는 주소에 언어가 없으면 한국어를 보여준다.
- legacy ?lang=ko는 한국어, 새 ?lang=en은 영어로 정규화한다. 기존 /en 또는 영문 source path가 들어오면 같은 레코드의 English view를 연다.
- 메뉴, 버튼, 필터, 페이지 title, description, og 메타, breadcrumb, empty state, 첨부 label, 키보드 안내까지 번역 필드를 함께 둔다.
- 회사 고정 페이지와 21개 사업 상세는 영어 공개본 매칭이 있는 항목을 우선 사용한다. README-PREVIEW와 en overlay에 기록된 검증 범위인 고정 5건, 사업 21건, 장비 72건, 실적 224건, 증서 117건은 official 또는 확인된 상태 필드로 표시한다. 나머지는 V2 번역·검토 중·한국어 원문으로 구분한다.
- 논문은 출판된 원제, 특허는 확인된 등록 영문명이 있을 때만 영어 원제로 표시한다. 원제 미확인 게시물은 제목 뒤에 Korean original 또는 V2 translation 상태를 둔다.
- 국문·영문 브로슈어 PDF는 각각의 공식 파일로 연결한다. 게시판 첨부는 파일명과 원문 언어를 그대로 표시한다.
- 기술명은 영어 전환 시 폭을 확보한다. solution-52처럼 긴 제목은 카드 높이 제한으로 잘라내지 않고 2줄 이상 허용한다.
- language switch는 현재 페이지의 board, tech ID, record ID, detail state를 유지한다. 영어 본문이 없으면 같은 record의 한국어 원문과 상태를 표시하고 첫 화면에서 누락을 숨기지 않는다.

## 9. 게시판·검색·첨부 요구

### 목록

- 기본 탭: 사업실적 406, 연구성과 82, 학술자료 231, 공지 333, 보도자료 51, 뉴스레터 2.
- 검색어: 제목, 발주처, 저자, 학회지, 본문이 실제 존재하는 경우 본문, 첨부 파일명.
- 필터: 기술 ID 15·46·47·48·84·50·51·52·53·54·55·56·57·58·59·60·61·62·63·64·65, 연도, 발주처/기관, 지역 또는 대상 해역이 원문 fields에 있을 때, 자료 유형, 언어·번역 상태.
- 정렬: 최신, 관련도, 기술 ID 연결, 원문 상태. 총건수는 계약 수나 고유 프로젝트 수로 바꾸어 말하지 않는다.
- 목록 카드에는 제목·일자·보드·발주처/저자·원문/번역 상태·첨부 유무·관련 기술을 표시한다.

### 상세

- title, date, collection, listedNo, client/authors, fields, bodyText, images, attachments, externalLinks, sourceUrl, rawHtmlPath를 한 레코드 구조로 렌더한다.
- 사업·연구·학술 본문이 비어 있으면 “상세 본문은 원문 페이지에서 확인”과 sourceUrl을 제공한다. 이를 회사가 본문을 보유하거나 프로젝트를 완성했다는 뜻으로 해석하지 않는다.
- inline 이미지와 첨부는 localPath 존재 여부를 확인하고 alt/filename을 제공한다. 첨부가 없는 레코드에는 빈 다운로드 패널을 만들지 않는다.
- DOI·출판사·언론 URL은 externalLinks로 분리하고 새 탭·noopener noreferrer를 사용한다. 외부 사이트의 전체 자산을 GeoSR 자료처럼 복사하지 않는다.
- 기술 상세와 게시글 상세는 서로 연결한다. 기술 15의 사업/학술 버튼은 s_addtext2=15를 사용하고, 새 UI의 tech=15 필터와 원본 URL을 함께 유지한다.

### 첨부와 상태

- 현재 공지·보도·뉴스레터의 실제 로컬 첨부·이미지 예: notice-3091 해양수산 신기술 인증 PDF, notice-3069 장관 표창 이미지, notice-2980 KOEM 감사패 이미지, notice-1692 해양역학 PDF, newsletter 1542/1539 PDF와 이미지.
- status 값은 confirmed-local, official-english, v2-translation, source-only, needs-review를 구분한다.
- 다운로드 전 content type·로컬 파일 존재·해시를 점검한다. 권리·유효성 확인 전 “공식 인증”이나 “현재 수상”이라는 문구로 확정하지 않는다.

## 10. 현장·플랫폼 데이터 표현

- 장비 페이지는 5개 활성 장비군을 업무별로 보여준다. “80개 보유”를 현재 재고·가동 대수로 해석하지 않고 공개 항목 수로 표시한다.
- 대표 장비는 BlueROV2, GNSS GS10, 멀티빔·Side Scan Sonar·SVP·LiDAR·UAV, CTD·AWAC·유속계, 방형구·Grab, ICP-MS·GC-MSD·PAM·TOC, 해누리·뉴명랑·Challenger 등 실제 목록에서 선택한다.
- AX 플랫폼은 platform-data.js의 9개 레코드를 유지하되 8개 운영 표시와 1개 개발 중 상태를 명시한다. 개발 중 항목에 실행 URL을 만들지 않는다.
- 실제 캡처는 flood3d.png, surge.png, satellite.png, buoy.png, geo-dap.png가 확인됐다. 플랫폼 캡처 옆에 대상·입력·출력·상태를 적고, 라이브 데이터나 운영 서비스를 보증하지 않는다.
- GeoDAP은 https://www.geo-dap.com/ 외부 서비스로 분리한다. USV와 전자해도 외부 링크도 회사 내부 플랫폼 카드에 섞지 않는다.

## 11. 반응형·접근성·성능 수용 기준

### 반응형

- 320, 375, 414, 768, 1024, 1280, 1440px에서 홈·사업 허브·기술 상세·자료실 목록·게시글 상세·장비·플랫폼·회사·문의의 가로 넘침이 없어야 한다.
- 한국어 긴 제목과 영어 전환으로 높이가 늘어도 카드·탭·버튼이 겹치지 않는다. 목록은 모바일에서 단일 열 또는 표의 수평 스크롤을 명시적으로 사용한다.
- 모바일 메뉴는 열림·닫힘·현재 위치·Escape·포커스 반환을 지원한다. BNT의 drawer나 All4Land의 dropdown은 참고만 하고 GeoSR 콘텐츠에 맞게 단순화한다.

### 접근성

- skip link, landmark, heading hierarchy, visible focus, 키보드로 모든 링크·탭·필터·모달·다운로드를 조작할 수 있어야 한다.
- 이미지 alt는 실제 대상과 역할을 쓰고, 생성 시안은 concept/recreated label을 추가한다. 장식 이미지는 빈 alt를 사용한다.
- 자동 전환에는 pause/previous/next와 현재 위치를 제공한다. motion-reduce 환경에서는 영상 다운로드·재생과 transform을 줄이고 poster·정적 결과를 사용한다.
- 색만으로 인증 상태·번역 상태·개발 중을 구분하지 않는다. 본문·링크·disabled 상태의 명도 대비를 한국어·영어 각각 확인한다.

### 성능

- 초기 화면은 실제 필요한 poster·hero 이미지부터 로드하고, 아래 화면의 큰 영상·갤러리는 지연 로드한다.
- 기존 약 67MB hero Blob 선로딩을 그대로 새 기본 구현으로 채택하지 않는다. 영상을 쓰려면 적절한 인코딩·poster·단일 rendition·실패 fallback을 먼저 마련한다.
- GIF·대형 PNG는 실제 브라우저 크기와 역할을 검토해 poster/WebP/MP4 대체를 결정한다. 원본 파일은 보존하고 파생 파일을 별도 관리한다.
- 로컬 JSON·asset URL 오류가 나도 홈·자료실이 빈 화면이 되지 않고 오류 상태와 대체 링크를 표시한다.

### 인수 기준

1. 사실: 기술 21개, 장비 5개군·80개, 보드 6종·1,105건, 첨부·외부 링크·회사 브로슈어가 데이터 손실 없이 연결된다.
2. 관계: 21개 기술의 business/academic s_addtext2 필터가 기술 상세와 자료실 양쪽에서 작동한다.
3. 언어: 한국어 기본, 영어 전환, title/meta/메뉴/필터/상세/첨부 상태가 같은 ID를 유지한다. 공식 영문과 V2 번역 상태가 숨겨지지 않는다.
4. 신뢰: 생성 이미지·미승인 영상·개발 중 AX·현재 유효성 미확인 인증을 실제 사실처럼 표시하지 않는다.
5. 탐색: 기존 공식 URL과 로컬 query route가 열리고, 상세→관련자료→원문→뒤로가기 동선이 끊기지 않는다.
6. 접근성: keyboard, focus, Escape, reduced-motion, mobile menu, alt, contrast를 KO/EN에서 확인한다.
7. 성능: 초기 hero가 지나치게 큰 Blob·외부 영상·불필요한 GIF를 선로딩하지 않고, 이미지·JSON 실패 fallback을 제공한다.
8. 시각: 한국어 기업 홈페이지로서 사업분야·발주처·실적·조직·장비를 빠르게 찾고, 실제 화면·현장 자료가 한 화면의 초점이 되며, 반복 카드·장문 나열이 주인공이 되지 않는다.

## 12. 구현 순서와 남은 미확인

### 구현 순서

1. 부모 검토: 이 문서와 geosr-content-map.md를 승인하고 headline·6개 GNB·언어 기본값·신뢰 상태 표시를 확정한다.
2. 데이터 adapter: fixed-data, board-data, English overlay, platform-data를 ID 기반으로 읽고 s_addtext2·sourceUrl·attachments·status를 통합한다.
3. 라우트 compatibility: 기존 공식 query와 현재 local route를 모두 열고 record/detail state와 language switch를 보존한다.
4. 공통 shell: 한국어 기본 header/footer, 6개 GNB, EN 전환, 검색, skip link, mobile drawer, metadata를 만든다.
5. 홈·사업: 고객 가치 headline, 6단계 서사, 4개 사업 허브, 21개 기술 상세 진입과 대표 실적을 구현한다.
6. 자료·장비·플랫폼: 게시판 필터·검색·상세·첨부, 5개 장비군, 실제 캡처 기반 AX를 연결한다.
7. 회사·소식·문의: fixedPages, 인증·면허·IP, 브로슈어, 공지·보도·채용·문의 원문을 연결한다.
8. 모션·자산: 실제 화면과 원본 이미지만 먼저 적용하고, 필요 시 user approval 이후 영상/Higgsfield 파생을 별도 작업으로 진행한다.
9. 검증: 정적 문법·로컬 참조·URL·검색·키보드·반응형·reduced-motion·성능을 확인하고, KO/EN 데스크톱·모바일 스크린샷을 출력 폴더에 저장한다.

### 남은 미확인

- 공식 인증·면허·특허·수상의 현재 유효성, 발주처·고객사·로고의 공개 승인.
- 21개 기술별 실제 필터 결과 건수와 각 record의 완전한 양방향 관계. 현재 상세 HTML 버튼 관계는 모두 확인했지만, 게시판 목록을 필터별로 다시 수집한 결과는 아직 만들지 않았다.
- 각 게시판 상세의 본문·첨부 공개 범위와 공란 레코드의 최신성.
- 공식 영문 본문과 V2 번역을 담당자가 감수·승인할 일정.
- 플랫폼 캡처가 현재 운영 화면인지 소개용 과거 화면인지, 실제 접속 상태와 데이터 갱신 주기.
- 실제 고해상도 현장·장비 사진의 원본 권리와 생성 시안의 공개 사용 여부.
- BNT·All4Land의 실제 모바일 스크린샷. 이번 환경에서는 CUA 브라우저 surface가 비어 있어 소스의 viewport/media-query 확인까지만 수행했다.
- Refero의 로그인 뒤 동작·개별 프로젝트 전체 스크롤·모바일 결과. 공개 홈·스타일 페이지 확인 범위만 사용했다.

## 13. Higgsfield 사용 판단

현재 구독·결제 전에는 Higgsfield 생성·편집·웹사이트 클라우드 배포를 호출하지 않는다. 이번 로컬 프로젝트는 기존 정적 소스를 우선 보존하는 범위이며, website-builder skill의 live Higgsfield site build 범위와도 다르다.

구독이 확정되고 사용자가 별도로 승인한 뒤에도 다음 순서로 제한한다.

- 먼저 실제 원본 사진·화면·산출물·권리·한영 캡션을 확보한다.
- 실제 USV, 연안 조사, 위성·수치모델 캡처를 reference로 사용해 카메라 이동·연속성·질감·짧은 전환만 시험한다.
- 생성물은 concept/recreated asset으로 저장하고 실제 조사 기록·측정값·보유 장비·운영 플랫폼으로 표기하지 않는다.
- 기술 데이터의 숫자·지도·탐지 마스크·예측 결과는 원본 또는 정밀한 코드/편집 그래픽으로만 만들고 Higgsfield에 새로 만들어 달라고 하지 않는다.
- 필요 자산은 원본 4K 또는 고해상도 사진·실제 화면 캡처·6~8초 승인 클립·poster·KO/EN captions·alt/source metadata·reduced-motion 정지 대체본이다.
- 결제 전후 모두 새 공개 사이트 배포, 기존 공개 사이트 덮어쓰기, 외부 계정 로그인, 유료 생성은 부모·사용자 승인 없이는 실행하지 않는다.

이 문서와 콘텐츠 맵은 구현 시작 직전의 검토본이다. 다음 단계는 부모의 핵심 검수와 headline·IA 승인 후에만 코드 편집으로 넘어간다.
