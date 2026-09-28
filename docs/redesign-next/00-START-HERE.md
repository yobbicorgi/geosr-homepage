# GeoSR 다음 세션 시작점

2026-09-22 화면 리비전의 당시 웹 검수는 [07-DYNAMIC-DESIGN-REVIEW.md](07-DYNAMIC-DESIGN-REVIEW.md)에 보존한다. 2026-09-28 변경 사항은 아래가 우선이다.

2026-09-28의 회사 자료 연결과 과거 영상 정리 기록은 [08-20260928-REVIEW.md](08-20260928-REVIEW.md)를 먼저 확인한다. 회사 자료는 국·영문 조직도와 소개서 PDF가 연결되어 있다.

2026-09-28 최신 결정: 회사 홈페이지 메인 영상은 [광역 현실 환경 중심의 새 연출안](09-20260928-HOME-FILM-REVISION.md)을 우선한다. 신규 영상은 Higgsfield로 제작하며 이전 생성 도구의 자료와 제작 지시는 폐기한다. [제공된 AX 저장소](https://github.com/123choigem-tech/geosr-homepage-ax-platforms)에서는 AX 관련 부분만 로컬에 삽입한다. 회사 관련 페이지는 현 저장소에서 구축한다.

## 현재 상태

영상 제작을 제외한 이번 웹 개선을 실제 페이지에 반영하고 검수한 상태
이 문서의 완료는 외부 디자인 심사나 사용자의 최종 디자인 승인을 뜻하지 않음
"완벽" 같은 자체 점수로 남은 제작 조건을 덮지 않음

- 홈 전문 분야는 전폭 장면 위에 설명과 네 분야 선택을 배치
- 연구 사례 세 건은 하나의 입체 스택에서 선택해 열람하며 키보드와 모션 감소 지원
- 기술 페이지는 다섯 분야 탐색과 21개 원본 기술 항목 유지
- AX 페이지에는 제공 저장소의 AX 화면 8장과 서비스 9개의 필터·이전/다음 탐색을 로컬 삽입했다. 정적 화면이며 실시간 서비스 연결은 없다
- 홈 인증 갤러리는 세 분류와 앞면을 유지하는 좌우 이동·회전 및 확대
- 회사 전문 분야는 남색 배경의 6분야 탐색 / 대표 장면 / 분야별 조사 대상·방법·활용을 함께 표시
- AX·GeoDAP 소개는 하나의 선택 영역에 별도 기능 요약과 각 서비스 링크 제공
- 모바일은 한 분야·한 플랫폼씩 탐색하고 연혁·세부 정보는 펼침 / 문서 목록은 4건부터 더 보기
- 회사 페이지는 중복 갤러리를 없애고 검색 가능한 한 문서 컬렉션으로 통합
- 회사·자료·장비·문의와 footer를 역할에 맞게 정리
- 대표 자료 다섯 건은 보존한 원문의 사실과 출처로 상세 정보를 채움
- 메인 첫 화면은 광역 연안·하구 콘셉트 정지 이미지로 교체하고 비실제 지역·영상 준비 상태를 표시
- 이번 변경은 KO 데스크톱과 390×844 모바일, EN 모바일, AX 필터의 포인터·키보드 동작을 확인했다. 과거의 FHD·QHD·UHD 검수 기록을 이번 새 화면의 검수로 승계하지 않는다

회사 60초 본편과 AX 30초 본편은 아직 미완성
과거 생성 영상 연결은 제거하고 새 Higgsfield 결과를 검수한 뒤 연결한다
실제 플랫폼 동영상은 기존 세 항목이며 나머지는 검수한 실제 캡처 또는 개발 상태
Higgsfield CF01 5초 초안 요청은 Basic 이상 요금제 요구로 거절되어 생성 파일이 없다. 새 운영 플랫폼 녹화는 이번 작업에서 실행하지 않음
이전 영상 바이너리와 일시적 소스 검토 폴더의 로컬 삭제는 자동 승인 검토에서 차단되어 잔존한다. 사이트 연결과 텍스트 제작 지시는 정리했다

## 읽는 순서

1. 호스트 전역 지침과 루트 `AGENTS.md` 및 사용자의 최신 직접 지시
2. 이 문서와 [2026-09-28 메인 영상 방향](09-20260928-HOME-FILM-REVISION.md), [Higgsfield 제작 카드](10-HIGGSFIELD-PRODUCTION.md), [AX 삽입 검토](11-AX-EMBED-REVIEW.md)
3. [화면 설계](01-DESIGN-SPEC.md)와 [미디어 연출](02-MEDIA-DIRECTION.md)
4. [실행 계획과 통과 조건](03-EXECUTION-PLAN.md)
5. [장면 원장](production-plan.json)과 [복사용 프롬프트](PROMPT-CARDS.md)
6. [자산 원장](asset-register.json)과 [이미지 검수](05-IMAGE-REBUILD.md) 및 [실제 생성 프롬프트](IMAGE-REBUILD-REGISTER.json)
7. [이전 레퍼런스 검토와 한계](04-AUDIT-RECEIPT.md)

현재 제작 지시의 단일 기준은 `docs/redesign-next/`
과거 문서와 원본 아카이브는 사실 근거와 제작 이력으로 보존
과거 generationReady나 자체 디자인 점수를 현재 승인으로 승계하지 않음

## 유지할 결정

- 첫 화면은 전체 화면 연안 콘셉트 정지 이미지와 `Geo Data Intelligence`를 표시한다. 검수된 영상이 준비되면 같은 슬롯에 연결한다
- 회사 60초 / AX 콘셉트 30초 / 하단 플랫폼별 실제 기능은 서로 구분
- 회사 본편에는 AX 실제 UI와 AX 전용 콘셉트 장면을 넣지 않음
- AX 소개에는 제공 저장소의 실제 플랫폼 정적 캡처를 사용하되 실시간 UI나 운영 연결로 소개하지 않음
- GeoDAP은 독립 서비스이며 원본 비율을 보존하고 외부 진입 유지
- AX 운영 서비스에 직접 접속하는 버튼은 두지 않음
- 한글은 영문의 직역이 아니라 자연스러운 기업 문장으로 별도 검토
- 회사 푸른 계열과 남색 및 밝은 중성색 유지
- 허구 해안과 방파제 및 네온 선으로 기술을 대신하지 않음
- 회사 원본과 생성 개념 및 실제 계산 결과를 혼동하지 않음
- 실험 장면에 사람을 넣지 않음
- 폐기된 `coastal-survey-source.png` 등 삭제 원장의 탈락 이미지를 재사용하지 않음
- 무인선이나 특정 장비로 회사의 수행 분야를 제한하지 않음

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
2. 새 광역 환경 컷 CF01–03의 Higgsfield 후보를 소량 생성하고 시작·중간·끝 및 전체 재생 검수
3. CF04–07 현장·수중 컷의 원본 장비와 물리 구조를 확인하고 광역 환경과 시각 연결
4. CF08–09 실제 지형·관측 자료와 CF12 모델 경로의 출처·정합을 확인
5. 실험·현미경 CF10–11은 보조 분량으로 제한하고 실제 시설·결과라는 표현을 금지
6. 60초 전체 재생·루프·제목 가독성·모바일 대체 화면을 검수
7. 검수한 결과만 `film-manifest.json`에 연결하고 표시·재생 수명주기를 확인

현재 generationReady와 releaseReady는 false 유지
여섯 장의 선택 이미지는 작업용 시안이지 모든 연속 프레임이나 최종 영상의 승인 자료가 아님
2026-09-28 Higgsfield free 요금제·10 크레딧 확인. CF01 5초 초안 요청은 Basic 이상 요금제 요구로 거절되어 생성되지 않았다. [제작 카드와 차단 기록](10-HIGGSFIELD-PRODUCTION.md)을 확인한다. 요금제 변경과 구매는 현재 작업에서 실행하지 않는다.
