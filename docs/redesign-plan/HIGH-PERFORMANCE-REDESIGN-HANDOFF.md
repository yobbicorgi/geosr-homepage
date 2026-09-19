# GeoSR 홈페이지·필름 재설계 핸드오프

> 이 문서는 2026-09-20 기준 실행 핸드오프다. 아래 내용을 기존의 “디자인부터 다시 시작” 지시보다 우선한다. 현재 홈페이지 구현과 검토된 제작 자료를 이어서 사용한다. 이전 분석 문서들은 보존하고 배경 참고로만 본다.

## 현재 작업 위치와 상태

- 저장소: `C:\Users\user\Documents\Codex\Projects\geosr-homepage`
- 브랜치: `redesign/production-2026-09-19`
- 최신 커밋 기준: `dec5340 Add deterministic C02 C03 orbital approach frames`
- Downloads junction: `C:\Users\user\Downloads\GeoSR_Homepage` → `C:\Users\user\Documents\Codex\Projects\geosr-homepage`
- 로컬 미리보기: [http://127.0.0.1:18102/redesign-preview.html?lang=ko](http://127.0.0.1:18102/redesign-preview.html?lang=ko). 현재 `dist`를 제공하는 `python -m http.server 18102 --directory dist`가 응답하며 KO URL은 HTTP 200이다.
- 현재 코드·문서·스틸 일부는 미커밋 변경이다. 이 기준 확인 시점에 최종 60초 회사 영상과 30초 AX 콘셉트 영상은 아직 생성·편집되지 않았고 commit/push도 하지 않았다. `ax-*-fast.mp4`는 제품 UI 원본 클립이며 완성 필름을 뜻하지 않는다.
- 이전 handoff의 “새 디자인 보드 세 개를 먼저 만들고 페이지를 다시 구현” 지시는 stale 상태다. 현재 웹 구현을 되돌리거나 초기화하지 말고, 남은 영상 제작과 검수로 이어간다.

## 확정된 디자인·브랜드 기준

- 데스크톱 우선 범위: 1440, 1920, 2560 CSS px. 모바일은 새로 확장하지 않고 기존 fallback만 유지한다.
- 한국의 해양·환경 엔지니어링 기업답고 자연스러운 한글 문장과 자신 있는 톤을 유지한다. 회사의 실제 조사·관측·분석·예측 역량을 자연 환경 사진만으로 대체하지 않는다.
- 메인 기업 필름은 정확히 60초, AX Platform 콘셉트 필름은 별도의 30초다. 두 영상의 목적과 편집은 섞지 않는다. GeoDAP도 AX와 별개의 서비스다.
- 색은 검정, 딥 네이비, 블루그레이, 아이스 블루, 흰색을 중심으로 한다. 연두색, 과한 블루 네온, HUD·격자 장식을 피한다.
- 사람·손·얼굴·다이버, 생성된 글자·로고, 가짜 UI, 가짜 수치·그래프·관측 상태, 가짜 지리와 장소 식별 표현은 금지한다. 생성형 장면은 특정 현장·설치·운용을 증명하는 자료가 아니다.
- 실제 장비는 승인된 GeoSR 원본으로 외형을 확인한다. 공개 게시 이미지의 저작권·파생 사용권은 별도 확인 전까지 미확정이다.
- 검토 지점마다 사용자가 장면, 표현, 모델, 색, 카메라, 타이밍을 수정할 수 있다. 아직 유료 영상 생성에 들어가지 않았다.

## 최신 연출 콘티 v2

[FILM-STORYBOARD-DIRECTOR-v2.md](../redesign-production/FILM-STORYBOARD-DIRECTOR-v2.md)는 60초 회사 메인 필름과 별도 30초 AX Platform 필름의 최신 연출 기준이다. 아래의 기존 C01–C10/A01–A06 표와 타이밍·숏 분할이 다르면 v2 콘티가 우선한다. 이 문서의 출처·권리·지리·실제 화면 검수 기준과 웹 구현 상태는 계속 유효하다. v2는 장비 모델을 확정하지 않고 실제 source가 확보될 때 각 `SHOT ASSET`을 교체하는 방식으로 정의한다.

## 보존된 제작 상태 자료 — 타임라인은 v2 우선

아래 C01–C10/A01–A06 표와 이후 검수 메모는 이미 확보된 자산·제약·진행 상태를 보존한다. **최종 숏 분할과 타임코드는 최신 [v2 콘티](../redesign-production/FILM-STORYBOARD-DIRECTOR-v2.md)를 따른다.** 기존 파일명에 포함된 초 단위 표기는 reference의 원래 제작 시점을 뜻하며 v2 편집 시각을 확정하지 않는다.

### 회사 메인 필름 자료 C01–C10

| 장면 | 구간 | 내용과 연결 | 현재 기준 자산 |
| --- | --- | --- | --- |
| C01 | 00–06초 | 우주에서 지구가 드러나고 동아시아와 북서태평양이 읽히도록 안정화한다. 60초 마지막 프레임은 첫 프레임과 일치한다. | [Earth 시작·루프 프레임](../../dist/assets/concepts/corporate-film/hero-earth-00s-v4.png) |
| C02 | 06–12초 | 관측 위성이 지구를 향한다. 관측 빔, 로고, 특정 임무 정체성은 만들지 않는다. | [위성 콘셉트 프레임](../../dist/assets/concepts/corporate-film/hero-earth-satellite-07s-v4.png). 위성 형상은 생성 콘셉트이며 실기체나 임무 모델로 주장하지 않는다. |
| C03 | 12–18초 | 결정적 지구·지도 텍스처를 사용해 한반도와 주변 해역으로 접근한다. | [10초](../../dist/assets/concepts/corporate-film/hero-earth-10s-v1.png), [12초](../../dist/assets/concepts/corporate-film/hero-earth-12s-v1.png), [15초](../../dist/assets/concepts/corporate-film/hero-earth-15s-v1.png), [18초](../../dist/assets/concepts/corporate-film/hero-earth-18s-v1.png). 실제 해안선은 AI로 다시 그리지 않는다. |
| C04 | 18–24초 | 검증된 과학 레이어를 한 장씩 보여주고 교차 전환한다. 동시 관측인 것처럼 적층하지 않는다. | [20초 SST 참고](../../dist/assets/concepts/corporate-film/hero-earth-20s-v2.png), [22초 SST](../../dist/assets/concepts/corporate-film/hero-earth-22s-a-sst-v1.png) → [Aquarius 염분](../../dist/assets/concepts/corporate-film/hero-earth-22s-b-salinity-v1.png) → [MODIS chlorophyll-a](../../dist/assets/concepts/corporate-film/hero-earth-22s-c-chlorophyll-v1.png), [24초 결정적 연안 프레임](../../dist/assets/concepts/corporate-film/hero-earth-24s-v1.png). |
| C05 | 24–31초 | 한국 연안 현장, 조사선과 USV를 서로 다른 관측 역할로 보여준다. 해상에서 shoreward 이동으로 C06에 잇는다. | C05 composition study는 USV 공식 source pixels와 확정 모델·탑재체를 보존하지 않았고 해누리호도 재그림해 final fidelity에서 거절됐다. 공식 USV 페이지의 복수 원본은 [source pack](../redesign-production/equipment-sources/README.md)에서 확인한다. |
| C06 | 31–38초 | 공식 FireFly6 원본을 보존한 기체 cutout과 별도 해안 배경을 합성하고 C07 수면으로 이동한다. | The C06 composition study was discarded from the repository; its SHA-256 remains in the C06 prompt record. 메쉬는 제거했지만 기체 fidelity와 LiDAR 페어링은 검증되지 않았다. 최종 사용 금지. |
| C07 | 38–44초 | 실제 장비 근거가 확보되기 전에는 일반 관측 과정으로만 표현한다. | The C07 composition study was discarded from the repository; its SHA-256 remains in the C07 prompt record. 공식 부이·계류 원본이 없고 생성된 하드웨어는 검증되지 않았다. 실제 장비 컷 금지; 일반 과정 삽화만 별도 검토. |
| C08 | 44–51초 | 확인된 수중 장비를 각기 독립된 컷으로 보여주고 실험실로 넘긴다. | The C08 composition study was discarded from the repository; its SHA-256 remains in the C08 prompt record. ROV 구성과 센서의 계류선 배치가 확인되지 않았다. 하나의 실제 설치처럼 합성하지 않는다. |
| C09 | 51–54초 | 수중 원통형 센서의 디테일을 승인된 무인 실험실 장면으로 match-cut한다. | 기존 [실험실 스틸](../../dist/assets/analysis-lab-v1.webp)을 그대로 재사용한다. 새 장면·손·시료 라벨·분석값을 만들지 않는다. |
| C10 | 54–60초 | 실제 Discover → Predict → Monitor 화면을 순서대로 보여준 뒤 승인된 지구 시작 프레임으로 회귀한다. | [Discover](../../dist/assets/films/ax-discover-fast.mp4) 54–55.5초 → [Predict](../../dist/assets/films/ax-predict-fast.mp4) 55.5–57초 → [Monitor](../../dist/assets/films/ax-monitor-fast.mp4) 57–58.5초 → [Earth 루프 프레임](../../dist/assets/concepts/corporate-film/hero-earth-00s-v4.png) 58.5–60초. 화면을 겹치거나 자르지 않는다. |

C01·C02 v4는 내부 지리·연속성 참고다. C02의 위성은 실제 우주선이 아닌 콘셉트다. C03 접근 프레임은 결정적 지리 참고이며 위성 모션은 후속 영상 제작 때 자연스럽게 다시 설계한다. 프레임 연결 시 인접 장면의 지형, 카메라 방향, 색온도, 크롭을 시작/끝 프레임으로 함께 맞춘다. C05–C08의 과거 composition-only 검토는 장비 정확성 승인이 아니며, 최신 fidelity 재검토에서 모두 거절됐다. 재제작은 [장비 정확성 gate](../redesign-production/EQUIPMENT-ACCURACY-GATE.md)를 따른다.

## C04 NASA 자료의 정확성과 한계

세 C04 판은 NASA GIBS 자료와 같은 지리 배경을 사용한 단일 레이어 참고다. 사용 요청은 2012-08-01, WMS 1.1.1, EPSG:4326, BBOX `90,15,166,57.75`, 2560×1440이다. 바탕은 NASA Blue Marble Next Generation이며, 관측 결측은 그 바탕으로 보인다. 결측을 관측값으로 채우지 않는다.

- SST와 Aquarius 해수면 염분은 월별 제품이고 MODIS Aqua chlorophyll-a는 일별 swath다. 같은 날짜로 요청했어도 동시 관측을 뜻하지 않는다.
- chlorophyll의 구름·궤도 결측은 비관측 범위로 남긴다.
- Aquarius 원자료는 거친 공간 해상도다. 색 표시의 bilinear 처리본은 시각화 처리일 뿐 측정을 보간하거나 해상도를 높이지 않는다.
- 메인 검토는 단일 plate 자료 참고와 교차 전환 방향을 승인했다. 동시에 세 판이 떠 있는 최종 이미지나 영상으로 사용하지 않는다.
- 자세한 출처·해시·결측 규칙은 [C04 단일 레이어 교차 전환 기록](../redesign-production/keyframes/corporate-film-data-layers-crossfade-v1.md)을 따른다.

## C05–C08 장비 정확성 재검토와 재제작 상태

- Generated still files were discarded from the repository; their SHA-256 provenance remains in the shot prompt records.

| 장면 | 자산 / prompt 기록 | 확인된 근거와 제한 | 검토 상태 |
| --- | --- | --- | --- |
| C05 | The C05 composition study was discarded from the repository; its SHA-256 remains in the C05 prompt record · [프롬프트 기록](../redesign-production/imagegen-prompts/corporate-film-c05-v1.md) | 공식 해누리호는 19톤으로 표기된다. USV 페이지는 usvCom, USV20S, catamaran GIF를 직접 노출하지만 각 이미지의 모델·사양은 확인되지 않는다. usv-source.jpg는 USV20S 장면의 crop/resize처럼 보이나 계보와 모델은 미확인. study는 공식 source pixels를 보존하지 않았고 해누리호도 재그림했다. | final equipment fidelity 거절. 근거는 [equipment source pack](../redesign-production/equipment-sources/README.md)과 [manifest](../redesign-production/equipment-sources/manifest.json). |
| C06 | The C06 composition study was discarded from the repository; its SHA-256 remains in the C06 prompt record · [프롬프트 기록](../redesign-production/imagegen-prompts/corporate-film-c06-v1.md) | FireFly6 VTOL과 LiDAR 제품명은 확인되지만 생성된 기체는 원본 사진을 보존하지 않은 재그림이며 정확한 기하·부품 배치는 확정할 수 없다. 특정 FireFly6/LiDAR 페어링 근거도 없다. | 거절: clean base 여부와 무관하게 최종 장비 스틸로 사용 금지. |
| C07 | The C07 composition study was discarded from the repository; its SHA-256 remains in the C07 prompt record · [프롬프트 기록](../redesign-production/imagegen-prompts/corporate-film-c07-v1.md) | 사람 없는 공식 부이·계류 사진이 없고 TPRBM도 미확인이다. 생성된 float, solar panel, mast, cable 및 sensor housings는 실제 장비 원본과 비교할 근거가 없다. | 실제 장비 장면으로 사용 금지. 명확한 일반 과정 삽화로 표시할 때만 별도 검토 가능. |
| C08 | The C08 composition study was discarded from the repository; its SHA-256 remains in the C08 prompt record · [프롬프트·출처·검수 기록](../redesign-production/imagegen-prompts/corporate-film-c08-v1.md) | BlueROV2와 RBR Solo-TU 공식 항목은 각각 확인되지만, 공식 ROV 이미지는 Heavy 8-thruster 배치를 증명하지 않으며 센서가 특정 계류선에 붙었다는 자료도 없다. 생성 그림은 이들을 한 설치처럼 배치했다. | 거절: ROV·센서 같은 실제 배치로 합성 금지. 증거 전에는 독립된 제품 컷만 허용. |

전체 공식 URL, 모델 표기, 로컬 매칭, 권리 한계는 [장비 근거 감사](../redesign-production/equipment-source-manifest.md)에 있다. 자세한 원본 보존과 재제작 조건은 [C05–C08 장비 정확성 gate](../redesign-production/EQUIPMENT-ACCURACY-GATE.md)를 따른다.
## C09·C10 및 실제 제품 화면

- C09는 `analysis-lab-v1.webp` 그대로 재사용한다. 사람이나 손, 시료 출처·라벨, 분석 결과, 생성된 숫자나 공간 필드를 넣지 않는다. ROV·센서 장면과 실험실 컷 연결은 편집상의 match-cut일 뿐 시료가 해당 센서나 현장에서 왔다는 주장이 아니다.
- C10에서는 `ax-discover-fast.mp4`, `ax-predict-fast.mp4`, `ax-monitor-fast.mp4`를 독립적인 16:9 전체 프레임 컷으로 차례대로 보여준다. 동시 화면·picture-in-picture·가짜 workflow는 금지한다. 58.5–60초 Earth frame의 지리 픽셀을 바꾸지 않고 C01과 정확히 루프한다.
- 자세한 구간·전환·검수 기준은 [C09–C10 제작 기록](../redesign-production/imagegen-prompts/corporate-film-c09-c10-v1.md)과 [keyframe production package](../redesign-production/KEYFRAME-PRODUCTION-PACKAGE.md)을 따른다.

### AX Platform 별도 30초 자료 A01–A06

이 기존 자료는 회사 메인 영상과 독립된 실제 제품 화면·출처를 기록한다. 최신 연출 순서와 timing은 v2 콘티를 따른다. Discover/Predict/Monitor 원본과 출처 제한은 계속 적용하며, 장비 자랑 장면을 반복하지 않는다.

| 샷 | 구간 | 구성 기준 |
| --- | --- | --- |
| A01 | 00–05초 | 연안·항만·하구의 실제 공간 맥락. 실제 Overview/입력 포스터를 컷으로 나눠 보여준다. |
| A02 | 05–10초 | 입력을 공간 기준으로 정돈한다. 좌표·시간 정합을 확인하지 않았다면 여러 지도를 겹치지 않고 순차 컷으로 둔다. |
| A03 | 10–15초 | 위성 영상 기반 위치 탐지. 실제 Discover 캡처와 `ax-discover-fast.mp4`만 사용한다. |
| A04 | 15–20초 | 실제 3D 지형과 Predict 화면의 수면 조건 변화. 캡처 밖의 침수 범위·수위·피해를 덧그리지 않는다. |
| A05 | 20–25초 | 실제 Monitor 지도·환경 시계열. 새 측정값·부이 상태를 만들지 않는다. |
| A06 | 25–30초 | Discover/Predict/Monitor 실제 화면을 짧게 순서대로 수렴시키고 아래 제품 시퀀스의 Discover로 match-cut한다. |

[A01–A06 ImageGen/Higgsfield 준비 문서](../redesign-production/imagegen-prompts/ax-concept-film-a01-a06-v1.md)는 이미 작성돼 있다. ImageGen은 화면 바깥의 배경·공간 분위기만 만든다. 지도, 실제 데이터, 지형, UI·문자·마커를 생성하거나 원본 UI 픽셀을 덮지 않는다. 제품 화면은 승인된 실제 16:9 포스터/녹화에서 후반 합성한다. 실제 source coordinate/time 정합이 확인되지 않으면 레이어를 겹치지 않는다.

## 현재 웹 구현과 필름 슬롯

- [메인 미리보기 HTML](../../dist/redesign-preview.html)은 transparent overlay header와 전체 화면 100vh/100svh hero를 유지한다. `geosr-hero`는 `pending`이며 KO `메인 필름 제작 준비 중` / EN `Main film in preparation` 라벨이 보인다.
- 메인 페이지의 AX 콘셉트 필름은 실제 제품 증거 영역보다 먼저 오는 16:9 full-width pending slot이다. KO `영상 제작 준비 중` 라벨과 Discover/Predict/Monitor 실제 캡처 탭이 있다.
- [AX 상세 페이지 shell](../../dist/ax-platform.html)은 콘텐츠를 [ax-v2.js](../../dist/ax-v2.js)가 렌더한다. 상단에는 100svh AX concept-film slot과 `AX CONCEPT FILM · 영상 제작 준비 중` 상태가 있고, 실제 제품 시퀀스와 아래 3열 원리 카드가 이어진다.
- AX A01 v3 이미지는 현재 웹의 임시 poster로만 연결돼 있다. 이는 final film frame이나 최종 영상 승인 상태가 아니며, 실제 data/UI 결과를 나타내지 않는다.
- 이 상태 문구는 최종 승인 영상이 연결되고 로딩 확인되기 전까지 유지한다. 이미 존재하는 포스터나 AX fast clips를 완성 콘셉트 영상으로 표시하지 않는다.
- 현재 미리보기 200 응답은 서버 연결만 확인한 것이다. 최종 업데이트 후 아래 QA를 다시 수행한다.

## 다음 제작 순서와 사용자 검토 checkpoint

**현재 키프레임 결정:** [ImageGen 키프레임 v2 기록](../redesign-production/keyframes-v2/KEYFRAME-GENERATION-LOG-v2.md)을 따른다. C02 위성 cutout 2장과 AX A01 v3 2장은 조건부 selected다. C03의 생성 지형은 거절됐으므로 결정론적 NASA frame만 사용한다. AX A01 v3는 임시 웹 poster이며 final film 승인이나 실제 data/UI 표현이 아니다.

1. v2 콘티의 각 shot에 **start frame + end frame + 카메라/피사체/조명/길이/match-cut motion prompt**를 한 세트로 고정한다. 두 필름의 프레임 세트를 섞지 않는다. 현장 장비는 `SHOT ASSET` source·권리 게이트가 통과할 때만 삽입하고, 시작/끝 프레임과 모션 프롬프트를 사용자가 유료 생성 전에 검토한다.
2. 사용자가 키프레임 세트, 장비 표현, 지리, 색감, 전환을 수정할 수 있도록 유료 생성 전에 review contact sheet와 motion plan을 제시한다. 승인 전에는 다음 장면 제작으로 넘어가지 않는다.
3. Higgsfield 유료 생성은 사용자가 결제한 뒤 진행한다. **메인이 직접 제작**하며 shot별로 start/end reference와 해당 motion prompt를 넣어 타임라인 순서대로 생성한다. 스킬이나 agent에 생성 실행을 위임하지 않는다.
4. 각 shot의 초안 영상을 사용자에게 보여주고, 인접 shot의 경계/매치컷 검토 후 수정한다. C04 과학 자료와 C05–C08 장비/현장은 원자료와 프레임 단위로 확인한다.
5. 메인 60초 rough cut을 먼저 검토하고 C10 루프를 확인한다. 별도로 AX 30초 rough cut을 검토하고 A06 → 실제 Discover 제품 화면 연결을 확인한다. 사용자는 매 checkpoint에서 장면을 바꾸거나 제작을 보류할 수 있다.
6. 실제 영상 연결 뒤 KO/EN 본문, pending label 전환, 영상 fallback, 키보드·탭, 저모션, 링크, 자산 경로를 최종 검수한다.
7. 전체 QA와 사용자 검토가 끝난 뒤에만 변경 파일을 정리해 commit한다. push는 commit과 최종 승인 후 수행한다. 현 상태에서는 commit/push하지 않는다.

## 최종 QA 체크리스트

- 1440, 1920, 2560 데스크톱 폭 및 1920×1080 FHD에서 메인/AX 상세 시각 검수. hero가 첫 viewport 전체를 차지하고 뒤 섹션이 미리 보이지 않는지 확인한다.
- C04 배경 지리·결측·층 순서 및 영상 60초 → 00초 완전 일치; C10 실제 UI 순차 컷; AX A06과 아래 Discover 연결.
- 브라우저 콘솔 오류 0, 이미지/영상 broken reference 0, 영상 로딩/정지 포스터 fallback 확인.
- `git diff --check`, 수정 JavaScript `node --check`, KO/EN 전환, keyboard tab semantics/focus, prefers-reduced-motion 확인.
- diff와 작업 파일을 main review에 보여준 뒤 승인 대기. 그 전에 commit/push하지 않는다.

## 거절된 표현 — 다시 사용하지 않음

- C05–C08의 생성 스틸은 composition study only — rejected for final equipment fidelity 상태이며 저장소에서 삭제했다. SHA-256 provenance는 각 prompt 기록에 남겼고, 최종 제작에 사용하지 않는다.

- C04의 SST·염분·chlorophyll 동시 적층 프레임. 한 장씩 교차 전환한다.
- C05 composition study는 USV 색상·선체 형태가 공식 자료와 모순이라서가 아니라, 공식 source pixels와 확인된 모델·탑재체를 보존하지 않았고 해누리호도 재그림했기 때문에 final fidelity에서 거절됐다.
- C06의 이미지에 구워 넣은(mesh/point-cloud) 삼각 스캔 오버레이. clean base에도 장비 fidelity 승인은 부여되지 않았으며 원본 기체 cutout부터 다시 제작한다.

## 보존된 참고 문서

- [최신 필름 연출 콘티 v2 — 60초 기업 + 별도 30초 AX](../redesign-production/FILM-STORYBOARD-DIRECTOR-v2.md)
- [Keyframe production package — C01–C10, A01–A06, 거절 기준](../redesign-production/KEYFRAME-PRODUCTION-PACKAGE.md)
- [ImageGen keyframe v2 — conditional selections and rejected-history summary](../redesign-production/keyframes-v2/KEYFRAME-GENERATION-LOG-v2.md)
- [C01–C02 selected orbital reference and source record](../redesign-production/imagegen-prompts/corporate-film-opening-v4.md)
- [C09 lab still prompt and main-approved candidate](../redesign-production/imagegen-prompts/homepage-lab-equipment-v1.md)
- [Film slot implementation brief](FILM-SLOT-PRODUCTION-BRIEF.md)
- [장비 출처·모델·사용권 감사](../redesign-production/equipment-source-manifest.md)
- [equipment source pack README](../redesign-production/equipment-sources/README.md) · [manifest](../redesign-production/equipment-sources/manifest.json)
- [C05–C08 장비 정확성 gate](../redesign-production/EQUIPMENT-ACCURACY-GATE.md)
- Generated still files were discarded from the repository; their SHA-256 provenance remains in the shot prompt records.
- [C04 NASA crossfade 근거와 한계](../redesign-production/keyframes/corporate-film-data-layers-crossfade-v1.md)
- [C05](../redesign-production/imagegen-prompts/corporate-film-c05-v1.md) · [C06](../redesign-production/imagegen-prompts/corporate-film-c06-v1.md) · [C07](../redesign-production/imagegen-prompts/corporate-film-c07-v1.md) · [C08](../redesign-production/imagegen-prompts/corporate-film-c08-v1.md) prompt/source/review records
- [C09–C10 sequence and loop](../redesign-production/imagegen-prompts/corporate-film-c09-c10-v1.md)
- [AX A01–A06 ImageGen/Higgsfield preparation](../redesign-production/imagegen-prompts/ax-concept-film-a01-a06-v1.md)
- Previous analysis and execution notes are preserved in [MASTER-REDESIGN-ANALYSIS.md](MASTER-REDESIGN-ANALYSIS.md) and [EXECUTION-PLAN-2026-09-19.md](EXECUTION-PLAN-2026-09-19.md). They are background only where they conflict with this current handoff.
