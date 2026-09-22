> **역사 기록 — 현재 제작 지시 아님**
> 2026-09-22 [현재 인계 기준](../redesign-next/00-START-HERE.md)으로 대체됨
> 아래의 완료·자체 점수·generationReady·모바일 제외·회사/AX 혼합 지시는 현재 승인으로 사용하지 않음
> 원본 근거와 실패·검수 이력만 보존

---

# GeoSR 영상 제작 전 인계 — R6

2026-09-17 · 영상 생성 미실행 · 디자인 검토본

이 문서는 이전 영상 길이와 AX 대표 화면 지시보다 우선한다
최신 웹 소스는 `../../site/dist`이며 루트 index.html은 이전 설계 기록이다
기존 이미지들은 최종 승인본이 아니며 지리적 사실이나 실제 분석 결과를 보증하지 않는다

## 지금 구현한 범위

- 기업 메인 루프 1개와 기술 분야 스크롤 영상 4개를 위한 재생 구조
- AX 대표 기능 3개 장면을 선택하는 소개 영역 — 메인과 AX 소개 페이지에 공통 사용
- 메인의 플랫폼 전체 화면 구성 제거 — AX 대표 영역은 검수 전 영상 제작 대기 상태
- 승인 파일만 로드하고 미납품·로딩 오류 시 이미지 또는 제작 대기 화면 유지
- 화면 밖 영상 정지와 모션 줄이기 및 데이터 절약 설정 대응
- AX 상세의 실제 화면 편집 클립은 참고 미리보기로 유지하며 실시간 동작 영상으로 설명하지 않음
- GeoDAP은 AX와 독립된 소개 및 기존 서비스 진입 유지

## 디자인 기준

풀스크린 풍경과 큰 타이포그래피를 중심으로 화면의 강약을 만든다
기술은 한 화면에서 다음 장면으로 이어지고 플랫폼은 넓은 장면으로 보여준다
장식용 지구본이나 네온 회로와 가짜 차트를 추가하지 않는다
모션은 장면 전환과 탐색 위치를 설명하는 데 사용하고 스크롤 자체를 가로채지 않는다
인증 문서는 읽을 수 있는 정면을 유지하며 좌우 이동과 얕은 Y축 회전으로 깊이를 표현한다
MotionSites는 화면 구성과 모션 참고이며 해당 시안을 복제하지 않는다 — https://motionsites.ai/

## 기업 필름과 분야별 장면

| 슬롯 | 길이 | 첫 화면 → 변화 → 마지막 화면 | 필수 자료와 검수 |
|---|---:|---|---|
| geosr-hero | 24초 | 실제 국내 하구 4초 → 현장 관측 5초 → 시료·분석 4초 → 같은 해역의 모델 변화 6초 → 위성 관측 시야 5초 | 촬영 원본의 장소와 날짜 확인 · 기술 장면 4개에서 선별해 편집 · 루프는 동일 하구 프레임으로 디졸브 |
| expertise-1 | 6초 | 실제 측량 현장 → 측선과 관측 지점 → 정합된 수심 또는 점군 | 조사선·장비·수로 형태 고정 · 멀티빔/SSS/CTD 결과 구분 · 드론 영상만으로 깊은 수심을 얻는 연출 금지 |
| expertise-2 | 6초 | 채취한 시료 → 실제 분석 절차 → 조사 지점과 연결 | 분석실 실제 장비 확인 · 피펫과 손 동작 검수 · 시약이 수질 전체를 즉시 판정하는 효과 금지 · 생태 조사는 별도 컷 |
| expertise-3 | 6초 | 실제 국내 연안 지형 → 모델 출력 한 변수 → 시간 변화 | 동일 지형·수심·좌표계 유지 · 온도/농도/수위 혼합 금지 · 격자는 실제 계산 격자 확보 시에만 표시 |
| expertise-4 | 6초 | 한반도 주변 시야 → 동일 범위의 2D 수온장 → 출처가 다른 환경 변수 비교 | 한반도·제주·일본 위치와 축척 검수 · 육지 마스크 고정 · 염분은 자료 출처에 따라 모델/관측 구분 · 모든 자료를 단일 위성 센서 산출물로 묘사하지 않음 |

메인 영상은 각 분야를 동등한 길이로 나열할 의무가 없다
무인선이나 드론을 회사 전체의 정체성으로 고정하지 않는다
분야별 영상은 스크롤 진행률 0–100%가 해당 영상 시간 0–끝으로 연결되며 역스크롤도 역방향 탐색한다

## AX 대표 세 장면

| 슬롯 | 구성 | 실제 기능 연결 | 생성 전 부족한 입력 |
|---|---|---|---|
| ax-detect | 0–2초 실제 완도 양식 해역 원영상 · 2–4초 검증된 시설물 윤곽만 등장 · 4–6초 선정 영역과 탐지 결과를 함께 보여줌 | Satellite AI | 원영상과 같은 좌표계의 탐지 마스크 · 영상 날짜/이용 범위 · 클래스와 탐지 범위 |
| ax-predict | 0–2초 실제 마산만 지형 · 2–4초 같은 사례의 태풍 경로와 해수면 변화 · 4–6초 해당 시나리오 침수 범위 | Flood 3D / Storm Surge / Sea Level | 확인된 침수 출력이 현재 캡처 묶음에 없음 · 지형과 깊이 결과 원본 필요 · 서로 다른 과거 태풍 자료를 한 사건으로 연결하지 않음 |
| ax-monitor | 0–2초 실제 관측 부이 또는 지점 · 2–4초 해당 관측 항목 변화 · 4–6초 별도 해양환경 분포장 또는 해안 안전 장면 | Ocean Buoy / Ocean Environment / Coastal Safety | 관측소·시간·항목 대응 · 환경장 출처·단위 · CCTV 영상 사용 범위와 시점 |

세 장면은 각각 독립된 플랫폼을 소개한다
한 플랫폼의 출력이 다른 플랫폼으로 자동 전달되는 것처럼 연결하지 않는다
출처가 다른 센서/모델/위성 장면 사이에는 컷과 짧은 HTML 명칭으로 구분한다
수치와 지리 정보를 AI가 그리게 하지 않고 검증된 데이터 레이어를 후반 합성한다

## AX 개별 장면과 현재 자료

캡처 원본 기준 폴더는 작업 폴더 `work/captures`이며 편집 기준은 `work/platform-clip-shots.json`에 보존한다
작업 폴더 절대 경로: `C:/Users/user/Documents/Codex/2026-09-17/c-users-user-downloads-geosr-homepage`
웹용 기존 미리보기: `site/dist/assets/platforms/{id}-poster.webp` 및 `{id}-preview.mp4`

| ID | 현재 참조 캡처 | 이후 개별 영상의 핵심 |
|---|---|---|
| flood3d | flood3d-fhd-full.png | 실제 지형 위 검증된 침수 범위의 시간 변화 · 현재는 기상장 참조만 확보 |
| satellite | satellite-fhd-full.png | 양식시설 원영상과 탐지 윤곽의 대응 |
| surge | surge-fhd-full.png | Shanshan 2024 사례의 경로와 관측소 예측 · 현재 기상으로 표시 금지 |
| sealevel | sealevel-fhd-full.png | Maemi 2003 검증 사례의 관측과 모델 비교 |
| rip | rip-fhd-full.png / rip-cctv-fhd.png | 해운대 해안 감시와 실제 위험 정보 · 임의 이안류 생성 금지 |
| buoy | buoy-fhd-full.png | 남해111 관측 항목과 시간 변화 · 관측값 확인 필요 |
| env | env-fhd-full.png / env-salinity-fhd.png / env-chlorophyll-fhd.png | 동일 영역의 변수별 분포 · 날짜/단위/출처를 각각 구분 |
| news | news-fhd-full.png / news-stats-fhd.png | 실제 공개 가능한 기사와 지역/주제 분류 · 재난 뉴스 창작 금지 |
| flood-xai | 없음 | 개발 중 목업 유지 · 완료된 분석 시연 생성 금지 |

기존 8개 상세 미리보기는 캡처 편집본이다
실제 클릭과 분석 실행을 녹화한 영상이 아니다

## 이미지와 영상 프롬프트 작성 기준

각 장면은 아래 항목을 채우고 시작·중간·끝 세 키프레임을 함께 검수한다
자료가 없는 항목을 생성 모델의 추정으로 채우지 않는다

```text
장면 ID와 실제 기능
근거 원본 경로와 촬영/산출 날짜
보존 대상 — 해안선과 항만 구조물 / 장비 형상 / 관측 위치
첫 프레임 — 실제 원본에서 선정한 구도
중간 프레임 — 단일 변화만 표현
끝 프레임 — 다음 컷으로 연결할 지점
카메라 — 느린 이동 1개와 동일 초점거리
별도 합성 — 검증된 마스크 / 모델장 / 수치 / 한영 라벨
금지 — 네온 바다 / 가짜 항만 / 임의 격자 / 장비 변형 / 화면 안 가짜 글자
검수 — 원본 대조 / 공학적 의미 / 프레임 연속성 / 화면 가독성
```

원격탐사 프롬프트 초안

```text
Use the supplied verified Korean-peninsula map and registered ocean-product rasters
Keep coastlines, islands, north orientation, land masks and raster extents unchanged
Begin with the geographic context, then introduce one planar raster at a time
Use a restrained camera move with natural lighting and no glowing ocean lines
Do not redraw geography or invent measurements, labels, satellites or sensor hardware
The data planes are a conceptual presentation, not objects physically floating in orbit
Composite the exact supplied rasters after image-to-video generation if geometry cannot be preserved
```

AX 탐지 프롬프트 초안

```text
Use the supplied orthorectified aquaculture image and matching verified facility polygons
Preserve every island, breakwater and facility position
Start on the source image, hold the camera, then reveal the supplied polygons in small groups
No fabricated facilities, cyan scan beams, holographic panels or generated interface text
Generate only subtle photographic motion where it does not distort the source geography
Render polygon overlays separately from the generative footage
```

두 초안은 실제 참조 파일을 지정하기 전 실행용 확정 프롬프트가 아니다
생성 결과는 메인이 원본과 대조하고 오류나 낮은 시각 품질이 있으면 수정 또는 재제작한다

## 웹 납품과 연결

- 무음 H264 MP4 · 1920×1080 · 24 또는 30fps · moov 앞배치
- 원본이 FHD보다 작으면 확대본을 고해상도 원본으로 기록하지 않음
- 스크롤 클립은 키프레임 간격 0.25–0.5초 권장 후 실제 브라우저 탐색 테스트
- 루프 컷의 시작·끝 노출과 구도 차이 검수 · 플래시와 과도한 패닝 금지
- 메인 텍스트는 좌측 안전영역 확보 · 모바일은 별도 크롭 확인
- 영상에 한글/영문 메뉴와 가짜 수치를 생성하지 않음 · 라벨은 HTML 또는 정확한 후반 합성
- 파일 납품 경로는 `site/dist/film-manifest.json`의 delivery 항목
- 실제 파일 배치 후 해당 src 입력 · 사실/시각 검수 통과 후에만 approval을 approved로 변경
- 현재 모든 src는 null이며 approval은 pending — 미생성 파일을 요청하지 않음
- 다운로드/형식 오류 시 기존 이미지나 제작 대기 화면으로 복귀
- 최종 영상 검수에는 저사양 기기와 Safari 확인도 포함 · 현재 PC Chromium 테스트와 구분

## 아직 완료되지 않은 것

- 새 메인 디자인에 대한 사용자 최종 검토
- 반려된 이미지의 최종 대체 키프레임 승인
- 회사 원본과 지리/모델 출력 및 일부 영상 공개 범위 확인
- Higgsfield 모델 선택과 비용 확인 및 영상 생성
- 최종 영상의 프레임 단위 사실 검수와 브라우저 성능 검수
- 기존 회사 전체 콘텐츠 이관 및 정식 도메인 전환
