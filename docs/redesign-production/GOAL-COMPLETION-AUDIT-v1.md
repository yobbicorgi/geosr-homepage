> **역사 기록 — 현재 제작 지시 아님**
> 2026-09-22 [현재 인계 기준](../redesign-next/00-START-HERE.md)으로 대체됨
> 아래의 완료·자체 점수·generationReady·모바일 제외·회사/AX 혼합 지시는 현재 승인으로 사용하지 않음
> 원본 근거와 실패·검수 이력만 보존

---

# GeoSR 전면 재설계 목표 완료 감사

감사 기준일: 2026-09-20 (KST)<br>
대상: `redesign/production-2026-09-19` 브랜치, baseline `7b259a6489d5fd172e8014e93a95833936291c3b`, 공식 로컬/LAN preview와 콘텐츠 이관 자료
목표 범위: 데스크톱 중심 8개 KO/EN route의 공개 준비도 개선, 검증된 출처·placeholder 구분, 카피·접근성·metadata 및 제작 준비 상태 보존, 최종 QA 뒤 commit/push. 영상 최종 산출물은 이번 작업에서 생성하지 않는다.

## 현재 판정

**WEB IMPLEMENTATION COMPLETE / EXTERNAL MEDIA PENDING.** 8개 KO/EN route의 사이트 구조와 인터랙션, 반응형 화면, 자료 상태 표기를 구현하고 검증했다. Detect/위성 시설물에는 검증된 16:9 캡처가 없어 준비 상태를 쓴다. GeoDAP은 AX와 분리했고 검증되지 않은 화면이나 수치는 사용하지 않는다. 메인·AX 60/30초 film slot과 generation-ready metadata는 보존한다.

구현 결과는 `redesign/production-2026-09-19` 브랜치에 commit/push했고 Downloads junction과 origin 동기화를 확인했다. 최종 영상과 실제 플랫폼 캡처, 문의 backend는 별도 제작·검증 범위다.

## 구현·검수 상태

| 요구 | 현재 상태 | 근거 및 미완료 |
|---|---|---|
| 8개 공식 KO/EN route | IMPLEMENTATION_PASS | index, business, research, ax-platform, company, news, equipment, contact에 언어 전환과 route별 화면이 있다. 1920/2560 수평 overflow와 asset 실패를 검사했다. 최종 회귀 검증은 마무리 단계다. |
| Home·AX 100svh film slot | IMPLEMENTATION_PASS | Home은 승인된 Earth poster, AX는 승인된 추상 data-planes poster와 제작 준비 상태를 제공한다. 첫 fold에서 다음 section bleed가 없다. 실제 영상은 `src:null` 준비 상태다. |
| AX/GeoDAP 사실 구분 | IMPLEMENTATION_PASS | AX 미리보기의 Discover는 16:9 준비 slate다. Predict/Monitor는 출처·버전·권리를 검토 중인 대표 미리보기다. GeoDAP은 독립 외부 서비스이며 브랜드 링크 패널만 사용한다. |
| Home 5단계 업무 흐름 | IMPLEMENTATION_PASS | OBSERVE → ANALYZE → MODEL → PREDICT → DELIVER로 구현했다. AX의 Detect/Predict/Monitor와 의미를 섞지 않는다. |
| 한국어 카피와 줄바꿈 | IMPLEMENTATION_PASS | [한국어 카피 검토](KOREAN-COPY-AUDIT-v1.md)에 1920/2560 KO 제목 줄바꿈과 변경 예시를 기록했다. 이관 후 새로 드러나는 원문 카피는 source audit와 함께 확인한다. |
| Metadata·접근성 | IMPLEMENTATION_PASS | [metadata/accessibility audit](WEB-METADATA-ACCESSIBILITY-AUDIT-v1.md) 및 verifier가 KO/EN language, title, description, landmark, focus, tab·dialog와 reduced-motion 계약을 검사한다. 공용 renderer는 공식 도메인을 canonical/`og:url`로 설정하며 production에서 route·언어 매핑을 확인해야 한다. crop·rights 검토를 마친 공유 이미지가 없어 `og:image`/`twitter:image`는 생략한다. |
| 공용 콘텐츠와 기록 이관 | STRUCTURE_PASS / FULL ARCHIVE DEFERRED | 공개 페이지 inventory와 coverage를 보존했고 대표 기록, 명시적 예시, 검색·상세 틀을 제공한다. 전체 게시물은 목업 단계에서 대량 노출하지 않는다. 원문이 없는 placeholder는 그대로 표시한다. |
| 회사 자료·자격문서 | CONTENT_PENDING | 회사 연혁·조직·소개서·채용·주소 상세와 자격 문서의 현재 유효성 및 공개 권리를 원문으로 재확인해야 한다. 현재 확인한 연락처는 원문에서 옮긴 정보로 출처 안내를 붙였다. |
| 문의 처리 | EXTERNAL_PENDING | 화면 확인용 form은 자료를 전송하지 않는다. 공개 전 수신 backend, 개인정보 안내, 오류/완료 상태가 필요하다. |
| Final films·production deploy | EXTERNAL_PENDING | 기존 film preparation 문서와 manifest를 보존한다. 60초 회사 영상·30초 AX 영상은 생성/편집하지 않았고 운영 site에도 배포하지 않았다. |
| GitHub·Downloads | PASS | commit `fad8bc0`을 origin의 `redesign/production-2026-09-19`에 push했고 Downloads junction이 canonical repo를 가리키는 것을 확인했다. |

## 검증 현황

- 이전 구현 점검은 KO/EN 16 route 응답과 로컬 script/style/data/media 참조를 확인했다. 이번 CSS·copy 변경 후 route와 metadata verifier, 모든 수정 JavaScript의 `node --check`, film-readiness verifier, `git diff --check`를 최종 실행한다.
- 브라우저에서 1920×1080과 2560×1440을 사용했다. 각 route의 현재 KO/EN 페이지를 다시 열어 screenshot/asset, horizontal overflow, console/network error를 확인하고 reduced-motion 및 keyboard tab을 재검증한다.
- Home headline은 두 데스크톱 뷰포트에서 2줄, 다섯 story chapter title은 각각 1줄이다. 각 route headline의 줄 수와 추가 문구 판단은 [카피 검토](KOREAN-COPY-AUDIT-v1.md)에 기록했다.
- `dist/film-manifest.json`의 Home 60초와 AX 30초 slot은 `src:null`, `approval:pending`으로 유지한다. 로컬 AX clip/poster는 verified live capture로 설명하지 않는다.

## 공개 전 release gate

1. 공개 페이지 inventory를 받아 전체 누락/이전 coverage를 확인하고, 정확한 원문 ID·제목·날짜·첨부만 이관한다.
2. 회사 자료와 인증·등록·특허의 currentness·public display rights를 확인하고, 권리가 불명확한 스캔·이미지·AX poster를 사용하지 않는다.
3. AX의 Detect 16:9 screen capture는 정당한 공식 URL/계정과 화면 출처·버전·권리를 확인한 뒤에만 대표 화면으로 교체한다. TLS 검증 실패한 satellite facility 주소에 우회 접근하지 않는다.
4. 문의 backend, 개인정보 고지와 전송 결과 상태를 준비한다.
5. production 배포에서 공식 도메인의 canonical/`og:url` route·언어 매핑을 확인한다. crop·rights 검토를 마친 공유용 OG/Twitter artwork가 확보되면 메타데이터에 연결한다.
6. 전체 회귀 QA와 `git diff --check`를 통과한 뒤 branch commit/push와 Downloads junction 동기화를 확인한다.
7. Final 60/30초 영상 생성·편집과 운영 배포는 별도 승인된 제작·release 작업에서 수행한다.

## 2026-09-20 구현 상태

8개 KO/EN route 구현 및 반응형 UI 검수를 완료했다. 44개 viewport 상태와 route/metadata verifier, local asset, keyboard drawer, reduced-motion 검사가 통과했고 수평 overflow·console·이미지·내부 링크 오류는 0건이다. KO UI 캡처 16장(1920×1080 desktop 8, 390×844 mobile 8)은 C:\Users\user\AppData\Local\Temp\geosr-fullsite-final에 저장했다.

영상 drop-in 경로(dist 기준): assets/films/geosr-hero.mp4, expertise-observation.mp4, expertise-environment.mp4, expertise-modelling.mp4, expertise-satellite.mp4, business-environment.mp4, company-overview.mp4, ax-discover.mp4, ax-detect.mp4, ax-predict.mp4, ax-monitor.mp4, ax-concept-film.mp4. 회사 60초·AX 30초 최종 영상과 business/company insert는 미제작이며, 실제 플랫폼 화면의 출처·버전·사용권 및 문서 이미지의 공개 권리/인증 현행성은 검증이 남아 있다.

캡처는 UI 검수 자료이며 verified product/field capture를 의미하지 않는다. 구현은 commit `fad8bc0`으로 push했고 최종 검증 뒤 작업 트리가 깨끗한 상태임을 확인했다.
