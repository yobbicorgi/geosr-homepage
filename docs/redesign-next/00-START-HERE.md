# GeoSR 다음 세션 시작점

2026-09-22 · 메인 직접 설계·구현·검수 · 최신 웹 검수는 [06-WEB-REVIEW.md](06-WEB-REVIEW.md)

## 현재 상태

영상 제작을 제외한 이번 웹 개선을 실제 페이지에 반영하고 검수한 상태
이 문서의 완료는 외부 디자인 심사나 사용자의 최종 디자인 승인을 뜻하지 않음
"완벽" 같은 자체 점수로 남은 제작 조건을 덮지 않음

- 홈 연구 영역은 큰 장면 위에 설명을 배치하고 분야별로 전환
- 기술 페이지는 다섯 분야 탐색과 21개 원본 기술 항목 유지
- AX는 별도 콘셉트 첫 화면과 세 분류·아홉 플랫폼의 실제 화면 탐색
- 인증 갤러리는 세 분류와 앞면을 유지하는 좌우 이동·회전 및 확대
- 회사·자료·장비·문의와 footer를 역할에 맞게 정리
- 대표 자료 다섯 건은 보존한 원문의 사실과 출처로 상세 정보를 채움
- 새 ImageGen 파랑 개념 시안을 포함해 작업용 생성 이미지 여섯 장 보존
- FHD·QHD·UHD 및 모바일의 한영 렌더 조건과 조작 검수 기록 저장

회사 60초 본편과 AX 30초 본편은 아직 미완성
현재 첫 화면에는 각각 기존 8초 초안이 연결되어 있고 초안 상태를 표시
실제 플랫폼 동영상은 기존 세 항목이며 나머지는 검수한 실제 캡처 또는 개발 상태
새 영상 생성과 새 운영 플랫폼 녹화는 이번 작업에서 실행하지 않음

## 읽는 순서

1. 호스트 전역 지침과 루트 `AGENTS.md` 및 사용자의 최신 직접 지시
2. 이 문서와 [현재 웹 검토서](06-WEB-REVIEW.md)
3. [화면 설계](01-DESIGN-SPEC.md)와 [미디어 연출](02-MEDIA-DIRECTION.md)
4. [실행 계획과 통과 조건](03-EXECUTION-PLAN.md)
5. [장면 원장](production-plan.json)과 [복사용 프롬프트](PROMPT-CARDS.md)
6. [자산 원장](asset-register.json)과 [이미지 검수](05-IMAGE-REBUILD.md) 및 [실제 생성 프롬프트](IMAGE-REBUILD-REGISTER.json)
7. [이전 레퍼런스 검토와 한계](04-AUDIT-RECEIPT.md)

현재 제작 지시의 단일 기준은 `docs/redesign-next/`
과거 문서와 원본 아카이브는 사실 근거와 제작 이력으로 보존
과거 generationReady나 자체 디자인 점수를 현재 승인으로 승계하지 않음

## 유지할 결정

- 첫 화면은 전체 화면 영상과 `Geo Data Intelligence`
- 회사 60초 / AX 콘셉트 30초 / 하단 플랫폼별 실제 기능은 서로 구분
- 회사 본편에는 AX 실제 UI와 AX 전용 콘셉트 장면을 넣지 않음
- AX 메인에는 실제 UI를 넣지 않으며 개별 실제 UI는 하단에서 보여줌
- GeoDAP은 독립 서비스이며 원본 비율을 보존하고 외부 진입 유지
- AX 운영 서비스에 직접 접속하는 버튼은 두지 않음
- 한글은 영문의 직역이 아니라 자연스러운 기업 문장으로 별도 검토
- 회사 푸른 계열과 남색 및 밝은 중성색 유지
- 허구 해안과 방파제 및 네온 선으로 기술을 대신하지 않음
- 회사 원본과 생성 개념 및 실제 계산 결과를 혼동하지 않음
- 실험 장면에 사람을 넣지 않음
- 폐기된 `coastal-survey-source.png` 등 삭제 원장의 탈락 이미지를 재사용하지 않음
- 무인선이나 특정 장비로 회사의 수행 분야를 제한하지 않음
- 메인이 직접 작업하며 기존 서브에이전트를 재가동하지 않음

## 작업 위치

정본 `C:\Users\user\Documents\Codex\Projects\geosr-homepage`

다운로드 `C:\Users\user\Downloads\GeoSR_Homepage`는 위 저장소의 junction
별도 `_v2` 복사본을 만들지 않음

브랜치 `redesign/production-2026-09-19`
원격 `https://github.com/yobbicorgi/geosr-homepage.git`
정적 사이트 `dist` / 별도 빌드 없음

미리보기 [회사 홈페이지](http://192.168.6.85:18102/index.html?lang=ko)

```powershell
git status --short --branch
git log -1 --oneline
node scripts/verify_redesign_routes.mjs
node scripts/verify_metadata_accessibility.mjs
node scripts/verify_film_lifecycle.mjs
node scripts/verify_continuation_package.mjs
```

이미 실행 중인 18102 서버를 중복 실행하지 않음
공식 geosr.com 도메인에 배포된 상태가 아님

## 영상 제작을 시작할 때

1. 현재 화면을 열고 최신 사용자 변경부터 확인
2. 18개 카드의 sourceRequirements와 실제 선택 프레임 확인
3. CF06의 센서 모델 식별과 CF08 실제 지형·항공 자료 확인
4. CF12는 검증된 실제 모델 결과 경로와 현재 파랑 개념 경로 중 하나를 선택
5. 시작·중간·끝 및 인접 장면을 검수한 뒤 해당 장면만 생성
6. 전체 재생과 물리·지리·과학 표현을 검수하고 타임라인에 편집
7. `film-manifest.json`에 결과를 연결한 뒤 화면 표시와 재생 수명주기 확인

현재 generationReady와 releaseReady는 false 유지
여섯 장의 선택 이미지는 작업용 시안이지 모든 연속 프레임이나 최종 영상의 승인 자료가 아님
Flow의 이전 잔액 65와 클립당 10크레딧은 과거 관측값이며 다시 확인해야 함
매일 200크레딧 초기화를 가정하지 않음
구독 구매나 Higgsfield 유료 생성은 별도 사용자 지시가 필요함
