# GeoSR 다음 세션 시작점

기준일 2026-09-22 · 기준 구현 커밋 `aea49aa` · 메인 직접 설계·실행·검수

## 현재 판정

**현재 사이트는 motionsites나 refero에서 선별한 우수 사례와 같은 완성도라고 판정하지 않음**

첫 화면의 방향과 실제 회사 자료는 유지할 가치가 있음
그러나 내부 페이지의 구도와 섹션 연결 및 모션의 완성도는 추가 설계·구현이 필요함
이 패키지는 다음 구현을 위한 상세 설계와 제작 지시서이며 디자인 구현 완료 증명서가 아님

회사 영상은 60초 본편 대신 8초 지구 오프닝 초안이 연결되어 있음
AX 영상은 30초 본편 대신 8초 탐지 콘셉트 초안이 연결되어 있음
문서의 프롬프트 완비와 실제 생성물의 사실성·품질 합격은 별개임

## 읽는 순서와 우선순위

1. 호스트 전역 지침과 루트 `AGENTS.md` 및 사용자의 최신 직접 지시
2. 이 문서 → [디자인 설계](01-DESIGN-SPEC.md) → [미디어 연출](02-MEDIA-DIRECTION.md)
3. [실행 계획과 완료 조건](03-EXECUTION-PLAN.md)
4. [장면 원장](production-plan.json)과 [복사용 프롬프트](PROMPT-CARDS.md)
5. [자산 원장](asset-register.json) 및 그 안에 연결된 원본·검수 기록
6. [이번 직접 검토와 한계](04-AUDIT-RECEIPT.md)

현재 제작 지시의 단일 기준은 `docs/redesign-next/`임
과거 `redesign-plan`과 `redesign-production`의 설계안은 조사 근거와 제작 이력으로 참고함
과거의 generationReady 또는 웹 완료 또는 자체 점수는 현재 품질 승인으로 승계하지 않음
원본 자료·검수 기록·사용자 마스터 지시서의 사실 근거는 폐기하지 않음

## 유지할 결정

- 첫 화면은 전체 화면 영상과 `Geo Data Intelligence`이며 한글은 자연스럽게 별도 집필
- 회사 본편 60초 / AX 콘셉트 30초 / 하단 플랫폼별 실제 기능 영상은 서로 구분
- 회사 본편에 AX 실제 UI와 AX 전용 장면을 넣지 않음
- AX 메인에는 실제 UI를 넣지 않음 실제 UI는 하단 개별 서비스 소개에서 사용
- GeoDAP은 AX 하위가 아닌 독립 서비스이며 외부 진입과 원본 화면 비율 보존
- AX 운영 서비스 직접 접속 버튼은 회사 홈페이지에 두지 않음
- FHD·QHD·UHD의 상대 배치를 맞춘 뒤 모바일도 완성
- 파란 네온과 허구 지형 대신 실제 자료와 정밀한 합성으로 기술을 표현
- 사람 없는 실험 장면 유지 / 폐기된 해안 `coastal-survey-source.png` 재사용 금지
- 장비나 수행 분야를 이 콘티에 등장하는 항목으로 제한하지 않음 21개 기술 관계와 원본 아카이브 유지
- 메인이 직접 작업하며 기존 서브에이전트를 재가동하지 않음

## 작업 위치와 재개 명령

정본 `C:\Users\user\Documents\Codex\Projects\geosr-homepage`

다운로드 `C:\Users\user\Downloads\GeoSR_Homepage`는 정본을 가리키는 junction
별도 `_v2` 또는 복사본에서 작업하지 않음

현재 브랜치 `redesign/production-2026-09-19`
원격 `https://github.com/yobbicorgi/geosr-homepage.git`
정적 사이트는 `dist`이며 빌드 단계 없음

```powershell
Set-Location 'C:\Users\user\Documents\Codex\Projects\geosr-homepage'
git status --short --branch
git log -1 --oneline
git remote -v
node scripts/verify_continuation_package.mjs
Get-NetTCPConnection -LocalPort 18102 -State Listen -ErrorAction SilentlyContinue
```

미리보기 `http://127.0.0.1:18102/index.html?lang=ko`
내부 공유 `http://192.168.6.85:18102/index.html?lang=ko`
이미 실행 중인 서버가 `dist`를 제공하는지 확인하고 중복 서버를 열지 않음
서버가 없으면 Python http.server를 `--directory <정본>\dist --bind 0.0.0.0`로 숨김 실행
내부 미리보기를 공식 geosr.com 배포로 표현하지 않음

## 다음 세션의 첫 작업

전체 사이트에 CSS를 더 덧붙이거나 영상을 먼저 생성하지 않음
`01-DESIGN-SPEC.md`에 따라 Home의 연구 흐름 장면과 AX 탐색 장면 그리고 Company의 문서 갤러리 3개를 실제 브라우저 보드로 제작
FHD 같은 프레임에서 기존 화면과 비교한 뒤 메인이 구도·가독성·내용 전달을 판정
합격한 구성만 공통 토큰과 컴포넌트에 반영하고 나머지 페이지로 확장
사용자는 이미 개선 작업을 지시했으므로 통상 구현에 별도 승인을 반복 요청하지 않음

## 이번 인계에서 완료한 것과 남긴 것

완료 — 공개 레퍼런스 관찰 / 문서 충돌 정리 / 화면별 설계 / 회사·AX 장면별 프롬프트 / 9개 서비스 시연 계획 / 기존 자산 상태 원장 / 단계별 실행·검수 조건

미완료 — 새 디자인 구현 / 최종 이미지 재제작 / 회사 60초·AX 30초 완성 / 8개 운영 플랫폼의 새 기능 녹화 / 전 콘텐츠 이관 / 공식 배포

Flow 잔액 65와 클립당 10크레딧은 2026-09-22 이전 제작 기록의 마지막 관측값일 뿐임
다음 생성 직전에 잔액과 실제 선택 모델의 비용을 UI에서 확인해야 함 매일 200크레딧 초기화를 가정하지 않음
기존 크레딧 사용은 승인되었으나 구독 구매와 Higgsfield 유료 생성은 별도 사용자 지시가 필요함

현재 중단 사유는 크레딧 소진이 아니라 디자인·원본·연속성 검수 미완료임
다음 세션은 과거 동영상을 최종본으로 재연결하거나 준비 상태만 approved로 변경해서 완료 처리하면 안 됨
