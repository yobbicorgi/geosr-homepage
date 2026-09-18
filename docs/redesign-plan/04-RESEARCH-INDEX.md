# 조사 근거 — 필요한 때만 열기

2026-09-17. 서브에이전트 조사와 메인의 핵심 검토 결과를 구분해 정리했다. 이 파일은 디자인 지시서가 아니다. 구현 기준은00~03이다.

## GeoSR 자료

- [기존 공식 홈페이지](https://www.geosr.com/): 6개 상위 업무, 4개 사업분류 아래21개 상세, 활성 장비5군80항목, 게시판6종1,105건의 로컬 수집자료 확인. 현재 화면에 모두 넣으라는 뜻은 아니다.
- [콘텐츠 맵](content-map.md): 기술·공식URL·원본파일·게시판·첨부 관계. 이전 권장IA와 전량연결 문장은 이번 목업 설계에 의해 대체된다.
- [기존 자료 검토 기록](existing-work-synthesis.md): 조사·영상·디자인 문서의 유지/폐기 판단. 과거 상태를 기술하는 기록이며 정리 후 사라진 파일도 있을 수 있다.
- `portal/local-content-20260916/fixed-data.json`, `board-data.json`: 실제 샘플을 뽑는 원본. 전체를 컨텍스트나 브라우저에 한 번에 로드하지 않는다.
- 기존18번 벤치마크,27번 전면재구성,33번 한영용어 문서는 과거 결정의 출처다. 필요 항목만 확인한다.

## 홈페이지·모션 참고

| 대상 | 확인한 것 | 적용할 점 | 한계 |
|---|---|---|---|
|[BNT](https://www.bntsolution.com/)|현재1440×900·390×844 화면, HTML/CSS, 데이터영상 설명|결과를 크게 보여주는 힘, 자료 의미와 출처|특정 모바일 캡처에서 여백·본문·YouTube 조작부 혼재. 전체 품질을 일반화하지 않음 |
|[올포랜드](https://all4land.com/main.do)|현재 데스크톱·모바일 화면, 실사+공간 그래픽, 약53초 오프닝 존재|실사와 데이터 레이어의 공간적 연결|영상/레이아웃 복제하지 않음 |
|[Refero](https://refero.design/)|공개 사이트와 Apple/SpaceX/Linear 스타일 참고페이지|큰 미디어, 정보 위계, 정밀한 간격과 기능화면|로그인 후 전체 사례·모바일 흐름 미검토 |
|[MotionSites](https://motionsites.ai/), [Backgrounds](https://motionsites.ai/backgrounds)|공개 화면·카테고리·다양한 미디어 비율의 갤러리|배경미디어와 정적문구 분리, 다양한 프레임 구성|개별 유료효과·영상프레임·재생곡선을 직접 검증한 것은 아님 |

Refero 공개 참고: [Apple](https://styles.refero.design/style/569ba4c0-0431-44fb-92df-0dbea7f3e63d), [SpaceX](https://styles.refero.design/style/13b74e34-b824-4d1d-bd2c-bb9bfbc2d6e1), [Linear](https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1). 이 브랜드의 영문 중심 정체성은 가져오지 않는다. 해당 공개 참고의 설명을 참고한 것이며 모든 모션을 재생해 검증했다는 뜻은 아니다.

실제 참고 캡처는 `visuals/competitor-*.png`, MotionSites는 `visuals/motionsites-public-backgrounds.png`에 있다. 메인은 경쟁사4개 캡처를 직접 검토했다.

## 회사 소개 영상 참고

- **실제 장면 근거 있음:** 올포랜드 메인 오프닝과 기존18번 영상관찰 기록, 현재 GeoSR50초 영상의7개 키프레임. ‘실사에서 데이터로 전환’ 설계에 직접 반영.
- **추가 실제 영상 확인:** [KONGSBERG — EEZ does it, Cayman Islands seafloor](https://www.kongsberg.com/news/stories/2025/2/saildrone-cayman-islands/)의 공식 HTML5 클립 `brian-connon.mp4`(15.5155초,1920×1080). 00.2초 운영자와 모니터,07.76초 색상 측량자료와 해저지형의 클로즈업,15.32초 운영자·측량결과 전체 장면을 확인했다. 실제영상3구간 확인이며 전체 나레이션 분석은 아니다. 메인 설계는 이 근거를 기술클립의 ‘현장 맥락→결과 확대→판단’ 구도에 반영한다.
- **본문만 확인한 후보:** [Fugro About](https://www.fugro.com/about-us), [KONGSBERG — Discovering the secrets of the sea](https://www.kongsberg.com/news/news-archive/2025/discovering-the-secrets-of-the-sea/). 소개본문·사진·링크만 확인했으며 본편 시청 근거로 사용하지 않는다.
- 공식 KONGSBERG YouTube 채용영상은 재생 불가라 분석하지 않았다. 이번 조사를 ‘여러 회사소개 영상 전체 시청 완료’로 확대해 표현하지 않는다. 홈페이지 영상·기술클립의 실제 관찰과 본문 참고를 구분했다.

## 현재 영상·캡처 판정

현재영상 프레임은 `visuals/video-keyframes-current/`에 있다. 기존 장면은 분위기 참고용이며 새 메인 영상의 실제 기술근거가 아니다. 메인이45초 프레임을 직접 확인했으며, 선형 그래픽만으로 변수나 결과 의미를 알 수 없는 문제가 있다.

`assets/screenshots-20260907/flood3d.png`도 메인이 직접 확인했다. 파일명과 달리 주 화면에는 바람·태풍 글로브가 보인다. 침수범위·깊이의 실제 결과처럼 소개하지 않는다. 새 설계에서는 원본 캡처의 보이는 기능만 설명하고 다른 결과는 목업으로 남긴다.

## 이후 본구축에서 필요한 확인

전체 게시글의 기술관계·전수번역·인증 최신성·고해상도 원본·영상제작 권한·서비스 운영상태는 실제 공개본 단계에서 처리한다. 작은 목업을 만드는 선행조건으로 확장하지 않는다. 샘플 자료의 사실과 표시만 먼저 확인한다.
