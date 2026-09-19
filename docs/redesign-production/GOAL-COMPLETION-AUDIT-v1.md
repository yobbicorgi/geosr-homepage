# GeoSR 전면 재설계 목표 완료 감사

감사 기준일: 2026-09-20 (KST)<br>
대상: redesign/production-2026-09-19 브랜치의 현재 HEAD 및 로컬 dist 실행물
범위: 웹 구현, 언어·접근성, 60초 회사 필름과 30초 AX 필름의 생성 직전 준비, GitHub 동기화, Downloads junction, 미리보기 URL

## 최종 판정

**CONDITIONAL_PASS — 전체 목표는 미완료.** 공식 홈의 desktop 구현과 KO/EN 시각 QA, 메타데이터 검사 및 두 필름의 콘티·source 준비는 확인된다. 현재 story authority는 [v3 콘티](FILM-STORYBOARD-DIRECTOR-v3.md)다. 실제 미완료는 C05–C07의 source 권리 확인 또는 concept plate QA, 최종 회사·AX 필름 생성과 편집, production deployment다. A/B 사용자 선택은 기본 경로 blocker가 아니며, 장비 근거 공백은 해당 shot의 표현만 제한한다. 공개용 권리·개인정보 승인은 production 단계에서 별도 확인한다.

상태 정의: **PASS**는 검증 범위 통과, **CONDITIONAL_PASS**는 구현/준비가 있으나 조건이 남음, **FAIL**은 요구 불충족 또는 직접 검사 실패, **EXTERNAL_PENDING**은 사용자 자료·승인·공개 배포 등 저장소 밖 의존성이 남음.

## 요구별 판정

| 요구 | 판정 | 근거 및 직접 확인 | 제한·완료 필수성 |
|---|---|---|---|
| 데스크톱 인터랙티브 웹 | PASS | 공식 [index.html](../../dist/index.html), [홈 렌더러](../../dist/home.js), [홈 스타일](../../dist/cinematic.css)를 KO/EN 1920×1080 및 2560×1440에서 확인했다. field-story pacing anchor는 1920에서 2214→1728 px, 2560에서 2952→2304 px다. 홈 첫 AX 실제 화면 anchor는 KO 657→509 px, EN 725→578 px이며, AX overview는 1920 KO 1595→1159 px, EN 1587→1151 px다. 실제 AX 16:9 stage의 pacing span은 viewport 1.15–1.20배다. 두 해상도에서 hero 100svh, 수평 overflow 0, console error 0, 수동 탭·poster 및 reduced-motion fallback 동작을 확인했다. | 이 결과는 웹 pacing/인터랙션 구현의 QA 근거이며 최종 회사·AX 필름의 제작 완료를 뜻하지 않는다. 최종 영상과 production deployment는 별도 남아 있다. |
| KO/EN | PASS | node scripts/verify_metadata_accessibility.mjs → 16개 KO/EN route 응답, 8개 metadata head, 공통 언어 metadata map 및 접근성 계약 통과. [웹 감사](WEB-COMPLETION-AUDIT-v1.md)도 8개 경로 언어 전환을 확인한다. | 공식 도메인 배포 뒤 production 경로에서 재검수 필요. |
| 전체 화면 hero·film slot | PASS | 공식 홈의 [index.html](../../dist/index.html) 및 [home renderer](../../dist/home.js)에서 KO/EN 1920×1080·2560×1440 QA를 통과했다. hero는 정확히 100svh이며 첫 viewport에서 다음 섹션은 노출되지 않는다. | [film manifest](../../dist/film-manifest.json)의 회사 60초와 AX 30초 슬롯은 approval=pending, src=null이다. poster fallback은 유지되며 최종 영상은 아직 없다. |
| 홈과 AX 분리 | PASS | [홈](../../dist/home.js)은 GeoSR 전체 정체성을 소개하고 [AX route](../../dist/ax-platform.html)·[AX 렌더러](../../dist/ax-v2.js)는 별도 30초 소개와 Discover/Predict/Monitor를 다룬다. AX 소스에는 외부 서비스 진입 URL이 없다. | AX hero의 A01 이미지는 임시 concept poster이며 최종 필름 승인과 다르다. |
| GeoDAP 구분 | CONDITIONAL_PASS | 홈은 GeoDAP를 별도 외부 서비스로 소개하고 “Earth Data Intelligence”를 GeoDAP에 한정한다. AX는 서비스 분류에 통합 데이터 GeoDAP를 표기하지만 직접 외부 링크를 내지 않는다. [웹 구현 감사](WEB-COMPLETION-AUDIT-v1.md). | 외부 GeoDAP의 현재 응답과 공식 도메인 운영 연결은 확인하지 않았다. 공개 전 외부 목적지 확인 필요. |
| 콘텐츠·목업 구조 | CONDITIONAL_PASS | [웹 구현 감사](WEB-COMPLETION-AUDIT-v1.md)는 기술 상세, 연구·소식 검색/상세, 장비 필터, 회사 인증 탐색, 문의 UI를 구현 통과로 기록한다. | 기술·연구·뉴스·회사·장비 실제 콘텐츠의 전수 이관이 남았다. 문의 폼은 저장하지 않는 UI prototype이므로 운영 backend 또는 검증된 문의 경로가 필요하다. |
| 8개 route | PASS | [metadata 감사](WEB-METADATA-ACCESSIBILITY-AUDIT-v1.md)와 실행 verifier가 index, business, research, ax-platform, company, news, equipment, contact 각 KO/EN route를 검사한다. | 로컬 route 구현 통과이며 production 게시를 뜻하지 않는다. |
| 공식 도메인 배포 | EXTERNAL_PENDING | 현재 확인된 미리보기는 로컬/LAN이고 Git remote는 production redesign branch다. | geosr.com 공개 전환·배포·최종 공개 승인이 없다. production URL과 crop-safe 공유 자산이 확인되지 않아 canonical/og:url/og:image/twitter:image는 의도적으로 생략됐다. |
| 접근성·metadata | CONDITIONAL_PASS | 자동 verifier 통과. [metadata/accessibility 감사](WEB-METADATA-ACCESSIBILITY-AUDIT-v1.md)는 skip link, main landmark, 언어별 title/description, keyboard/tab/focus 계약을 기록한다. 최신 홈 시각 QA에서 reduced-motion 시 poster 유지와 motion 중단을 확인했다. | 이 검사는 완전한 WCAG/보조기술 인증이 아니다. 운영 도메인 게시 뒤 실제 production 경로와 보조기술 사용을 재검수한다. |
| 회사 필름 콘티·타임라인 | PASS | [v3 콘티](FILM-STORYBOARD-DIRECTOR-v3.md)가 story/timecode authority다. 직접 문서 검사에서 회사 10개 shot이 00:00–01:00 연속, AX 5개 shot이 00:00–00:30 연속이며 gap/overlap이 없다. [v1 readiness JSON](FILM-GENERATION-READINESS-v1.json)은 이전 12/6 scene 기록으로 보존한다. | 연속 타임라인은 소스·권리·영상 승인 완료를 뜻하지 않는다. |
| 회사 필름 source/keyframes | CONDITIONAL_PASS | [v3 readiness](FILM-GENERATION-READINESS-v1.md): C01–C04의 검증된 지구·관측 레이어, C05–C06의 장비 원본 후보, C07의 lab concept, C08 타이포그래피 bridge, C09 실제 UI, C10 Earth loop를 정의했다. C05는 해누리호 이미지 또는 공식 USV 원본 중 하나, C06은 BlueROV2 원본을 작은 과정 근거로만 쓴다. ImageGen은 배경 plate만 만든다. | C05–C06의 사용권/픽셀 보존 검수와 C07 concept plate QA 또는 권리 확보가 남았다. A/B 선택은 필요하지 않다. 최종 회사 필름은 아직 생성·편집되지 않았다. |
| 회사 필름 fallback A/B | PASS | [Fallback 문서](CORPORATE-FILM-FALLBACK-A-B-v1.md)와 [기계 판독 JSON](CORPORATE-FILM-FALLBACK-A-B-v1.json)은 과거 선택형 대안 기록으로 보존한다. | v3가 기본 제작 경로다. A/B 중 사용자 선택은 착수 조건이나 현재 blocker가 아니다. |
| AX 30초와 실제 UI | CONDITIONAL_PASS | [v3 콘티](FILM-STORYBOARD-DIRECTOR-v3.md)는 A01–A05를 입력 → Detect → Predict → Monitor → 실제 Overview handoff로 구성한다. A02–A04는 실제 Discover/Predict/Monitor 캡처를 각 약 3초씩 순차·16:9 원본 픽셀로 사용한다. | 실제 source clips의 공개 권리·개인정보 검수, concept film 생성·편집, 최종 export와 production deployment가 남았다. film manifest의 concept slot은 src=null이다. |
| ImageGen 선행 프레임 검수 | CONDITIONAL_PASS | [키프레임 생성 로그](keyframes-v2/KEYFRAME-GENERATION-LOG-v2.md)는 C02 위성 cutout과 AX A01 concept reference 상태를 기록한다. v3에서 ImageGen은 concept/background plate만 만든다. | 생성 reference는 실제 위성·자료·UI나 최종 artwork가 아니다. 장비 원본을 생성·재그림·변형하지 않는다. |
| 사실성 및 reject gate | CONDITIONAL_PASS | [v3 콘티](FILM-STORYBOARD-DIRECTOR-v3.md), [키프레임 log](keyframes-v2/KEYFRAME-GENERATION-LOG-v2.md), [production package](KEYFRAME-PRODUCTION-PACKAGE.md), [장비 source manifest](equipment-source-manifest.md)에 부정 제약·선택·기각 이력이 있다. 생성된 C03 지형은 reject되고 deterministic NASA 지리만 허용된다. | 장비 근거 공백은 관련 필름 shot의 외형·운용 주장만 제한한다. 홈페이지 전체 완료를 막는 요건은 아니다. 공개용 최종 사실·권리는 production 전에 확인해야 한다. |
| GitHub 동기화·clean | CONDITIONAL_PASS | 감사 기준점에서 branch `redesign/production-2026-09-19`의 HEAD는 64f7a6b86650c925aead7f3584b716d193ce51e5였다. 당시 ahead/behind 0/0, ls-remote SHA 일치와 clean tree를 확인했다. | 이는 감사 시작 시점의 snapshot이다. 이후 문서 변경을 작업 브랜치에 동기화한 뒤 remote와 clean state를 다시 확인해야 한다. |
| Downloads junction | PASS | PowerShell Get-Item C:\Users\user\Downloads\GeoSR_Homepage에서 ReparsePoint, LinkType=Junction, Target=C:\Users\user\Documents\Codex\Projects\geosr-homepage 확인. | canonical repo를 직접 가리킨다. |
| Preview URL | PASS | Invoke-WebRequest로 localhost 및 LAN `192.168.6.85:18102`의 공식 [index.html](../../dist/index.html)과 [ax-platform.html](../../dist/ax-platform.html) KO/EN 8개 URL을 모두 HTTP 200으로 확인했다. verifier의 관리형 preview origin `127.0.0.1:18103`에서도 16 route 응답 통과. | HTTP 응답은 모든 breakpoint의 실제 화면/console 검수를 대신하지 않는다. |

## 직접 실행한 검증 기록

- node scripts/verify_metadata_accessibility.mjs — PASS: 16 KO/EN route responses, 8 static metadata heads, shared KO/EN metadata map and accessibility contracts.
- JSON continuity — legacy readiness JSON: 회사 12 scene/60초, AX 6 scene/30초 gapless; fallback A/B 각각 15개 fullTimeline segment/60초, gaps·overlaps 없음, continuityCheck.passed=true. Current v3 storyboard: 회사 10 shot/60초, AX 5 shot/30초 gapless.
- Manifest — geosr-hero duration=60, src=null, approval=pending; ax-concept-film duration=30, src=null, approval=pending. 실제 AX Discover/Detect/Predict/Monitor 네 source file이 존재한다.
- GitHub — 감사 전 HEAD와 origin branch SHA 일치, ahead/behind 0/0, working tree clean.
- Preview — localhost와 LAN의 공식 index/AX KO/EN 8 URL HTTP 200.
- Visual QA — 공식 index KO/EN을 1920×1080 및 2560×1440에서 통과: hero 100svh, section bleed 0, horizontal overflow 0, 4개 story image load, console errors 0, failed requests 0. reduced-motion에서 poster 유지 및 motion 중단.
- Junction — Downloads 경로의 target이 canonical repository와 일치.
- diff check — 문서 정합성 갱신 후 실행: PASS.

## 완료에 필요한 게이트

1. C05에서는 해누리호 로컬 원본 또는 공식 USV 원본 중 하나를 선택하고 사용권과 원본 픽셀·비율 보존을 확인한다. C06 BlueROV2 원본은 짧은 보조 insert 후보로만 검토한다. 권리 미확보 시 장비를 생략하고 background-only concept plate를 QA한다.
2. C07의 lab concept plate를 QA하거나 권리 확인된 실제 lab source를 확보한다. 특정 GeoSR 현장·모델·결과를 근거 없이 주장하지 않는다.
3. C01–C04의 deterministic remap, NASA/GIBS attribution, 합성·모션 검수를 완료하고 C08–C10의 slate, 실제 UI 컷, loop를 편집한다.
4. 회사 60초와 AX 30초 rough cut을 별도로 만들고 source, 공개 권리, 개인정보, UI pixels, crop, timecode, loop와 사실성을 검수한다.
5. 두 최종 필름을 생성·편집한 뒤 production media를 배포하고, 운영 URL에서 console/network/accessibility를 재검수한다. 현재 공식 index의 1920/2560 KO/EN QA는 통과했다.
6. 운영 URL과 crop-safe 공유 자산을 확정한 뒤 canonical/social metadata를 설정하고 geosr.com 공개 승인을 받는다.
7. 필수 QA 통과 후 작업 브랜치에 commit/push하고 branch sync 및 clean state를 재검증한다.

**Readiness에 대한 엄격한 결론:** v3는 회사 60초와 AX 30초의 기본 story path를 확정했지만, 어느 영상도 아직 최종 생성·편집되지 않았다. 회사 필름에서 C05–C06의 장비 원본 사용권/픽셀 보존 확인과 C07 concept plate QA 또는 권리 확보가 남아 있다. 이 shot 단위의 제한은 전체 필름을 위한 A/B 선택 blocker가 아니다. 최종 회사·AX 영상 제작과 production deployment가 남아 있어 전체 목표는 미완료다.
