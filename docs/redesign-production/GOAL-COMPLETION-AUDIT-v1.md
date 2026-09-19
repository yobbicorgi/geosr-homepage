# GeoSR 전면 재설계 목표 완료 감사

감사 기준일: 2026-09-20 (KST)<br>
대상: redesign/production-2026-09-19 브랜치의 현재 HEAD 및 로컬 dist 실행물
범위: 웹 구현, 언어·접근성, 60초 회사 필름과 30초 AX 필름의 생성 직전 준비, GitHub 동기화, Downloads junction, 미리보기 URL

## 최종 판정

**CONDITIONAL_PASS — 전체 목표는 미완료.** 공식 홈의 desktop 구현과 KO/EN 시각 QA, 메타데이터 검사, 두 영상의 타임라인·키프레임 준비는 확인된다. 핵심 미완료는 회사 필름의 기존 장면 중 27초 분량에 필요한 원본 source 또는 fallback A/B 선택, 최종 회사·AX 필름 제작, production deployment다. 장비 근거 미확인은 해당 장비가 등장하는 필름 장면의 표현만 제한하며 홈페이지 전체의 blocker가 아니다. 공개용 권리·개인정보 승인은 production 단계에서 별도 확인한다.

상태 정의: **PASS**는 검증 범위 통과, **CONDITIONAL_PASS**는 구현/준비가 있으나 조건이 남음, **FAIL**은 요구 불충족 또는 직접 검사 실패, **EXTERNAL_PENDING**은 사용자 자료·승인·공개 배포 등 저장소 밖 의존성이 남음.

## 요구별 판정

| 요구 | 판정 | 근거 및 직접 확인 | 제한·완료 필수성 |
|---|---|---|---|
| 데스크톱 인터랙티브 웹 | PASS | 공식 [index.html](../../dist/index.html), [홈 렌더러](../../dist/home.js), [홈 스타일](../../dist/cinematic.css)를 KO/EN으로 1920×1080 및 2560×1440에서 시각 확인했다. 두 폭 모두 hero는 100svh이고 다음 섹션 bleed와 horizontal overflow가 없다. 4개 story image load, console error 0, failed request 0을 확인했다. reduced-motion에서는 poster가 유지되고 motion이 멈춘다. | 이 판정은 현재 로컬 구현의 시각·동작 QA다. 완성 필름과 production deployment의 검증은 별도 남아 있다. |
| KO/EN | PASS | node scripts/verify_metadata_accessibility.mjs → 16개 KO/EN route 응답, 8개 metadata head, 공통 언어 metadata map 및 접근성 계약 통과. [웹 감사](WEB-COMPLETION-AUDIT-v1.md)도 8개 경로 언어 전환을 확인한다. | 공식 도메인 배포 뒤 production 경로에서 재검수 필요. |
| 전체 화면 hero·film slot | PASS | 공식 홈의 [index.html](../../dist/index.html) 및 [home renderer](../../dist/home.js)에서 KO/EN 1920×1080·2560×1440 QA를 통과했다. hero는 정확히 100svh이며 첫 viewport에서 다음 섹션은 노출되지 않는다. | [film manifest](../../dist/film-manifest.json)의 회사 60초와 AX 30초 슬롯은 approval=pending, src=null이다. poster fallback은 유지되며 최종 영상은 아직 없다. |
| 홈과 AX 분리 | PASS | [홈](../../dist/home.js)은 GeoSR 전체 정체성을 소개하고 [AX route](../../dist/ax-platform.html)·[AX 렌더러](../../dist/ax-v2.js)는 별도 30초 소개와 Discover/Predict/Monitor를 다룬다. AX 소스에는 외부 서비스 진입 URL이 없다. | AX hero의 A01 이미지는 임시 concept poster이며 최종 필름 승인과 다르다. |
| GeoDAP 구분 | CONDITIONAL_PASS | 홈은 GeoDAP를 별도 외부 서비스로 소개하고 “Earth Data Intelligence”를 GeoDAP에 한정한다. AX는 서비스 분류에 통합 데이터 GeoDAP를 표기하지만 직접 외부 링크를 내지 않는다. [웹 구현 감사](WEB-COMPLETION-AUDIT-v1.md). | 외부 GeoDAP의 현재 응답과 공식 도메인 운영 연결은 확인하지 않았다. 공개 전 외부 목적지 확인 필요. |
| 콘텐츠·목업 구조 | CONDITIONAL_PASS | [웹 구현 감사](WEB-COMPLETION-AUDIT-v1.md)는 기술 상세, 연구·소식 검색/상세, 장비 필터, 회사 인증 탐색, 문의 UI를 구현 통과로 기록한다. | 기술·연구·뉴스·회사·장비 실제 콘텐츠의 전수 이관이 남았다. 문의 폼은 저장하지 않는 UI prototype이므로 운영 backend 또는 검증된 문의 경로가 필요하다. |
| 8개 route | PASS | [metadata 감사](WEB-METADATA-ACCESSIBILITY-AUDIT-v1.md)와 실행 verifier가 index, business, research, ax-platform, company, news, equipment, contact 각 KO/EN route를 검사한다. | 로컬 route 구현 통과이며 production 게시를 뜻하지 않는다. |
| 공식 도메인 배포 | EXTERNAL_PENDING | 현재 확인된 미리보기는 로컬/LAN이고 Git remote는 production redesign branch다. | geosr.com 공개 전환·배포·최종 공개 승인이 없다. production URL과 crop-safe 공유 자산이 확인되지 않아 canonical/og:url/og:image/twitter:image는 의도적으로 생략됐다. |
| 접근성·metadata | CONDITIONAL_PASS | 자동 verifier 통과. [metadata/accessibility 감사](WEB-METADATA-ACCESSIBILITY-AUDIT-v1.md)는 skip link, main landmark, 언어별 title/description, keyboard/tab/focus 계약을 기록한다. 최신 홈 시각 QA에서 reduced-motion 시 poster 유지와 motion 중단을 확인했다. | 이 검사는 완전한 WCAG/보조기술 인증이 아니다. 운영 도메인 게시 뒤 실제 production 경로와 보조기술 사용을 재검수한다. |
| 회사 필름 콘티·타임라인 | PASS | [콘티 v2](FILM-STORYBOARD-DIRECTOR-v2.md), [readiness JSON](FILM-GENERATION-READINESS-v1.json). 직접 JSON 검사: 12개 scene, 0–60초 연속이며 gaps/overlaps 없음. | 연속 타임라인은 소스·권리·영상 승인 완료를 뜻하지 않는다. |
| 회사 필름 source/keyframes | CONDITIONAL_PASS | [readiness 문서](FILM-GENERATION-READINESS-v1.md): 00–24초와 51–60초 합계 33초는 내부 편집 진입 가능. C01–C04는 NASA/GIBS 지리·자료 reference, C02 위성은 조건부 concept overlay, C03은 deterministic NASA frame only, C04는 SST→염분→chlorophyll 순차 전환이다. | C05–C10 기존 장면의 27초 분량은 원본 source와 사용 조건이 pending이다. 이는 해당 장면만 제한하며, source가 없으면 fallback A/B 중 선택으로 해결할 수 있다. 전체 회사 필름은 아직 완성되지 않았다. |
| 회사 필름 fallback A/B | EXTERNAL_PENDING | [Fallback 문서](CORPORATE-FILM-FALLBACK-A-B-v1.md)와 [기계 판독 JSON](CORPORATE-FILM-FALLBACK-A-B-v1.json). 직접 검사에서 Plan A/B 모두 15 timeline segments, 0–60초 연속, gaps/overlaps 없음, declared continuity 통과. | JSON은 FALLBACK_ONLY_NOT_SELECTED, userChoiceRequired=true. 소스 미확보 시 A 또는 B 사용자 선택이 필요하다. A/B 선택 전 이미지 생성·코드 변경 금지. 원본 소스가 확보되면 선택은 필요하지 않다. |
| AX 30초와 실제 UI | CONDITIONAL_PASS | [readiness JSON](FILM-GENERATION-READINESS-v1.json): 6개 scene, 0–30초 연속. manifest의 실제 Discover/Detect/Predict/Monitor clip은 approved이고 네 파일이 존재한다. A06은 실제 Overview poster fallback을 명시한다. | approved는 내부 편집 기준이며 공개 권리/개인정보 승인과 다르다. A01 v3는 조건부 concept, A02는 후반 제작 empty stage, concept-film slot은 src=null이다. 최종 영상은 아직 없다. |
| ImageGen 선행 프레임 검수 | CONDITIONAL_PASS | [키프레임 생성 로그](keyframes-v2/KEYFRAME-GENERATION-LOG-v2.md)는 C02 위성 cutout 2장과 AX A01 v3 2장을 MAIN REVIEW CONDITIONALLY SELECTED로 기록한다. | 네 후보는 concept/reference이며 실제 위성·자료·UI나 최종 artwork가 아니다. 1672×941px라 요청한 4K도 아니다. C05–C10 Plan B 생성은 사용자 선택 전 금지다. |
| 사실성 및 reject gate | CONDITIONAL_PASS | [콘티 v2](FILM-STORYBOARD-DIRECTOR-v2.md), [키프레임 log](keyframes-v2/KEYFRAME-GENERATION-LOG-v2.md), [production package](KEYFRAME-PRODUCTION-PACKAGE.md), [장비 source manifest](equipment-source-manifest.md)에 부정 제약·선택·기각 이력이 있다. 생성된 C03 지형은 reject되고 deterministic NASA 지리만 허용된다. | 장비 근거 공백은 관련 필름 shot의 외형·운용 주장만 제한한다. 홈페이지 전체 완료를 막는 요건은 아니다. 공개용 최종 사실·권리는 production 전에 확인해야 한다. |
| GitHub 동기화·clean | CONDITIONAL_PASS | 감사 기준점에서 branch `redesign/production-2026-09-19`의 HEAD는 64f7a6b86650c925aead7f3584b716d193ce51e5였다. 당시 ahead/behind 0/0, ls-remote SHA 일치와 clean tree를 확인했다. | 이는 감사 시작 시점의 snapshot이다. 이후 문서 변경을 작업 브랜치에 동기화한 뒤 remote와 clean state를 다시 확인해야 한다. |
| Downloads junction | PASS | PowerShell Get-Item C:\Users\user\Downloads\GeoSR_Homepage에서 ReparsePoint, LinkType=Junction, Target=C:\Users\user\Documents\Codex\Projects\geosr-homepage 확인. | canonical repo를 직접 가리킨다. |
| Preview URL | PASS | Invoke-WebRequest로 localhost 및 LAN `192.168.6.85:18102`의 공식 [index.html](../../dist/index.html)과 [ax-platform.html](../../dist/ax-platform.html) KO/EN 8개 URL을 모두 HTTP 200으로 확인했다. verifier의 관리형 preview origin `127.0.0.1:18103`에서도 16 route 응답 통과. | HTTP 응답은 모든 breakpoint의 실제 화면/console 검수를 대신하지 않는다. |

## 직접 실행한 검증 기록

- node scripts/verify_metadata_accessibility.mjs — PASS: 16 KO/EN route responses, 8 static metadata heads, shared KO/EN metadata map and accessibility contracts.
- JSON continuity — readiness: 회사 12 scene/60초, AX 6 scene/30초 gapless; fallback A/B 각각 15개 fullTimeline segment/60초, gaps·overlaps 없음, continuityCheck.passed=true.
- Manifest — geosr-hero duration=60, src=null, approval=pending; ax-concept-film duration=30, src=null, approval=pending. 실제 AX Discover/Detect/Predict/Monitor 네 source file이 존재한다.
- GitHub — 감사 전 HEAD와 origin branch SHA 일치, ahead/behind 0/0, working tree clean.
- Preview — localhost와 LAN의 공식 index/AX KO/EN 8 URL HTTP 200.
- Visual QA — 공식 index KO/EN을 1920×1080 및 2560×1440에서 통과: hero 100svh, section bleed 0, horizontal overflow 0, 4개 story image load, console errors 0, failed requests 0. reduced-motion에서 poster 유지 및 motion 중단.
- Junction — Downloads 경로의 target이 canonical repository와 일치.
- `git diff --check` — 이번 문서 갱신 후 실행 결과를 아래에 반영한다.

## 완료에 필요한 게이트

1. 회사 필름 기존 C05–C10의 27초 분량에 필요한 source와 사용 조건을 확보하거나, 확보되지 않으면 fallback A/B 중 하나를 선택한다. 개별 장비 근거가 미확인인 경우에는 해당 장면의 표현만 제한한다.
2. B를 선택할 때만 비식별 concept image를 생성한다. 이를 실제 GeoSR 장비·현장으로 주장하지 않는다.
3. C01–C04의 deterministic remap, NASA/GIBS attribution, 합성·모션 검수를 완료한다.
4. 회사 60초와 AX 30초 rough cut을 별도로 만들고 source, 개인정보, UI pixels, crop, timecode, loop와 사실성을 검수한다.
5. 최종 필름 연결과 production deployment 뒤, 해당 운영 URL에서 console/network/accessibility를 재검수한다. 현재 공식 index의 1920/2560 KO/EN QA는 통과했다.
6. 운영 URL과 crop-safe 공유 자산을 확정한 뒤 canonical/social metadata를 설정하고 geosr.com 공개 승인을 받는다.
7. 필수 QA 통과 후 작업 브랜치에 commit/push하고 branch sync 및 clean state를 재검증한다.

**Readiness에 대한 엄격한 결론:** AX는 실제 source clips와 Overview poster fallback으로 내부 30초 편집을 시작할 수 있으나, 최종 영상·공개 승인·A01 concept 검토는 남아 있다. 회사 필름은 기존 33초 분량이 내부 편집에 들어갈 수 있고, 나머지 27초는 원본 source 또는 fallback A/B 선택이 필요하다. 이 source gap은 해당 영화 장면에 한정된다. 두 최종 필름은 아직 완성되지 않았고 production deployment도 남아 있으므로 전면 재설계 목표는 계속 미완료다.
