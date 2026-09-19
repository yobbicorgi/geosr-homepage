# AX Platform 콘셉트 필름 A01–A06 준비 문서

**버전:** v1 · **러닝타임:** 30초 · **화면 비율:** 16:9
**상태:** ImageGen·Higgsfield 제작 전 준비안. 새 이미지, 영상, UI, 코드나 film-manifest 연결은 만들지 않았다.

## 이야기와 제작 원칙

AX Platform 콘셉트 필름은 GeoSR 회사 메인 필름과 분리한다. 장비를 나열하는 대신 해양·환경 자료가 **Discover → Predict → Monitor**로 이어져 현장 의사결정에 쓰이는 제품 흐름을 설명한다. 6개 장면은 각 5초로 구성한다.

ImageGen은 배경과 공간 분위기만 만든다. 지도 형상, 지형, 관측 데이터, 실제 AX 화면은 생성하지 않는다. 실제 UI를 보여주는 장면은 아래에 지정한 16:9 포스터나 승인된 화면 녹화를 후반 합성에 그대로 사용한다. 자막·UI 글자·값·범례·커서·마커는 실제 원본에 있는 것만 보이며, 재구성하거나 새로 그리지 않는다.

여러 출처 화면을 같은 위치·시간·좌표계 자료처럼 겹치지 않는다. 실제 출처 메타데이터로 정합을 확인하지 못했다면 서로 다른 화면은 순차 컷으로 보여준다. 화면 녹화의 날짜·값·상태는 해당 캡처 시점의 표시일 뿐 실시간 상태를 뜻하지 않는다. 실제 UI 캡처는 16:9 전체 비율을 보존하고 늘리거나 자르지 않는다.

### 실제 근거 자산

| 용도 | 확인한 실제 자산 | 활용 범위 |
|---|---|---|
| AX 공간 개요 | [`ax-overview-poster.webp`](../../../dist/assets/platforms/ax-overview-poster.webp) · 1280×720 | 제품의 실제 연안·지형 화면을 확인하는 기준. 표시된 장소명을 추정하지 않는다. |
| 위성 자료 / Discover | [`satellite-poster.webp`](../../../dist/assets/platforms/satellite-poster.webp) · 1280×720 · [`ax-discover-fast.mp4`](../../../dist/assets/films/ax-discover-fast.mp4) · 1280×720, 30fps, 약 3.03초 | 위성 화면과 실제 Discover 상호작용. 현재 화면에 없는 대상·분류·탐지 표시를 더하지 않는다. |
| 3D 지형 / Predict | [`flood3d-poster.webp`](../../../dist/assets/platforms/flood3d-poster.webp) · 1280×720 · [`ax-predict-fast.mp4`](../../../dist/assets/films/ax-predict-fast.mp4) · 1280×720, 30fps, 약 3.03초 | 실제 3D 지형과 현재 Predict 화면에 표시된 시나리오만 사용한다. |
| 부이·환경 관측 / Monitor | [`buoy-poster.webp`](../../../dist/assets/platforms/buoy-poster.webp), [`env-poster.webp`](../../../dist/assets/platforms/env-poster.webp) · 각각 1280×720 · [`ax-monitor-fast.mp4`](../../../dist/assets/films/ax-monitor-fast.mp4) · 1280×720, 30fps, 약 3.03초 | 실제 지도·관측 시계열·Monitor 상호작용. 별도 부이 하드웨어 컷이나 새 측정값은 만들지 않는다. |
| 승인 기준 | [`film-manifest.json`](../../../dist/film-manifest.json) | Discover, Predict, Monitor fast 클립의 승인·납품 경로를 확인한다. |

`ax-detect-fast.mp4`는 `ax-discover-fast.mp4`와 SHA-256 `7F16C6DA77A910D7F970B5D73B68E37278E0F210723602689976CB8F1C2FEF20`이 같아 바이트 단위로 동일한 파일이다. 이 문서에서 `Detect`를 Discover와 별개 기능이나 장면으로 취급하지 않는다.

### 공통 negative prompt

`people, hands, faces, silhouettes, crews, generated text, letters, numbers, labels, logos, watermark, readable UI, mock dashboard, HUD, reticles, coordinate grids, invented markers, fake charts, fabricated measurements, station IDs, alerts, confidence scores, live status, excessive electric-blue neon, science-fiction glow, decorative data lattice, invented coastline, warped map, duplicated island, changed terrain, false flood extent, disaster damage, unverified equipment or sensor payload`

공통 금지 조건에 각 샷별 negative prompt를 더한다. 실제 화면에 있는 문자는 ImageGen 결과가 아니라 원본 UI 캡처에서만 허용한다.

## 샷별 준비안

### A01 · 00–05초 · 실제 공간과 관측 입력

- **대표 still 목적:** AX가 다루는 연안·항만·하구 공간을 실제 제품 화면으로 소개하고, 관측 자료의 종류가 이어질 무대를 연다.
- **실제 reference:** `ax-overview-poster.webp`를 공간 기준으로 사용한다. 입력 자료의 성격을 보여줄 때 `satellite-poster.webp`, `flood3d-poster.webp`, `buoy-poster.webp`를 각각 별도 컷으로 참고한다. 서로 다른 화면을 한 지도에 합성하지 않는다.
- **16:9 구성:** Overview 실제 캡처가 전체 화면을 차지한다. 이어지는 입력 자료도 각각 동일한 16:9 원본 프레임으로 잠시 보여준다. 불필요한 새 패널, 테두리, 제목 카드를 만들지 않는다.
- **카메라와 피사체:** 실제 Overview 화면에서 연안·수역을 향해 천천히 접근한다. 지도 형상과 지형은 캡처에 고정한다. 화면 안에 없는 선박·부이·센서를 새 피사체로 추가하지 않는다.
- **5초 motion plan:** 0–1.5초 Overview 프레임에 정착 → 1.5–2.4초 위성 포스터로 컷 → 2.4–3.3초 3D 지형 포스터 → 3.3–4.2초 부이·환경 관측 포스터 → 4.2–5초 Overview의 같은 시각 앵커로 복귀한다. 입력은 컷으로 구분해 보여준다.
- **이전/다음 match-cut:** 시작은 AX 콘셉트 필름의 첫 화면이므로 이전 장면이 없다. 마지막에 Overview에서 확인한 해안선 방향을 고정해 A02 공간 기준으로 넘긴다.
- **ImageGen prompt core:** `Create only a restrained 16:9 deep navy and blue-gray atmospheric surround for the exact supplied AX Overview screen capture. Keep the source map, coast, terrain and water pixels untouched and unobscured. Leave all product imagery and observation inputs to exact post-composited captures. Natural light, quiet documentary mood, no device hero shot.`
- **Negative prompt:** 공통 조건 + `invented Korean port, guessed estuary, new road or breakwater, moving ship, new buoy, location name, map-only crop that changes the source geography`.
- **사실 검수:** Overview의 지리 위치·해안선을 임의로 명명하거나 바꾸지 않는다. 입력 자료별 시각·위치가 일치하는지 확인되지 않았으므로 동시 관측처럼 겹치지 않는다.

### A02 · 05–10초 · 공간 layer로 정돈

- **대표 still 목적:** 흩어진 관측 입력이 공간 자료 구조로 정돈되는 전환을 보여준다. 공통 좌표계라는 개념은 편집 의도로 표현하고, 서로 다른 원본을 검증 없이 같은 시공간 자료로 만들지 않는다.
- **실제 reference:** `satellite-poster.webp`, `flood3d-poster.webp`, `buoy-poster.webp`, `env-poster.webp`. 지형의 기준은 `ax-overview-poster.webp`로 고정한다.
- **16:9 구성:** 화면 중앙에는 원본의 연안 기준을 유지하고, 자료 입력은 얇고 반투명한 평면의 추상적 움직임으로 구분한다. 지도 문자·축·격자·범례를 추가하지 않는다. 실제 데이터 표면은 정합 확인 후에만 원본 캡처로 합성한다.
- **카메라와 피사체:** 고정된 해안 기준을 향한 느린 top-down 전환. 물리적인 장비가 아니라 위성·지형·관측 자료 화면만 피사체로 둔다.
- **5초 motion plan:** 5–6초 입력별로 분리된 면을 보여준다 → 6–8초 면들이 같은 화면 중심을 향해 천천히 이동한다 → 8–9초 불필요한 깊이를 걷어내고 하나의 정돈된 공간 프레임으로 수렴한다 → 9–10초 실제 위성 화면의 색·구도로 이어진다. 실제 자료층 정합이 확인되지 않으면 화면을 겹치지 않고 각 원본 컷을 순차 연결한다.
- **이전/다음 match-cut:** A01 Overview의 해안선 방향과 화면 중심을 이어받는다. 마지막의 위성 영상 색감·확대 방향을 A03 Discover 포스터와 맞춘다.
- **ImageGen prompt core:** `Create a minimal 16:9 spatial transition stage in deep ocean navy and restrained blue-gray. Use only soft, translucent depth planes with no map content, data marks or text. Keep the center clear for exact source-backed map and interface layers to be composited later. Calm, precise, scientific, not futuristic.`
- **Negative prompt:** 공통 조건 + `grid, latitude-longitude lines, legend, axis, fake point cloud, invented shoreline, duplicated source panel, falsely aligned locations, multi-source map mosaic`.
- **사실 검수:** 서로 다른 원본을 같은 좌표·시간으로 정합했는지 확인한다. 확인 전에는 정돈된 흐름만 상징적으로 보이고 실제 레이어의 위치·값을 겹쳐 표시하지 않는다.

### A03 · 10–15초 · Discover에서 위치 탐지

- **대표 still 목적:** 실제 위성 화면으로 시설물이나 현상의 위치를 찾아보는 Discover 기능을 보여준다.
- **실제 reference:** `satellite-poster.webp`와 승인된 `ax-discover-fast.mp4`. `ax-detect-fast.mp4`는 동일 파일이므로 대체 경로로만 기록한다.
- **16:9 구성:** 실제 위성 포스터 또는 3초 화면 녹화가 화면 전체에 들어간다. 화면 녹화의 UI·지도·대상 표시는 그대로 보존한다. ImageGen 배경은 화면 바깥에 만들지 않고, 필요 시 원본 뒤의 저대비 무채색 여백만 제공한다.
- **카메라와 피사체:** 원본 Discover 화면에 이미 보이는 위성 장면과 강조된 위치에 시선을 둔다. 실제 화면 녹화가 가진 줌·탐색 움직임만 사용한다.
- **5초 motion plan:** 10–11초 A02의 위성 화면 면을 실제 Discover 포스터로 match-cut → 11–14초 `ax-discover-fast.mp4`의 실제 탐지 흐름을 재생 → 14–15초 화면 끝을 유지하며 A04의 3D 지형 포스터로 컷한다. 클립 속도를 추가로 올리지 않는다.
- **이전/다음 match-cut:** A02 마지막 위성 색조에서 같은 실제 Discover 캡처로 진입한다. A04는 확대·시점 이동 방향만 닮게 전환하며, 동일 위치로 추정하지 않는다.
- **ImageGen prompt core:** `Create only a subtle 16:9 dark blue-gray surround for the exact supplied satellite-interface capture. Preserve every source pixel and leave the actual satellite image, target emphasis and all interface elements to the original screen recording composited in post. No added geography or effects.`
- **Negative prompt:** 공통 조건 + `new bounding box, new detection point, new class name, invented change area, false feature highlight, fake satellite sensor, satellite beam, laser scan`.
- **사실 검수:** 원본 UI에 표시된 대상·표현만 사용한다. 분류명, 변화 유형, 탐지 확률이나 정확도를 새로 주장하지 않는다.

### A04 · 15–20초 · Predict의 3D 지형과 수면 조건

- **대표 still 목적:** 실제 3D 지형 화면과 Predict 화면에서 확인할 수 있는 조건 변화 시뮬레이션을 보여준다.
- **실제 reference:** `flood3d-poster.webp`와 승인된 `ax-predict-fast.mp4`. 보조로 `surge-poster.webp`, `sealevel-poster.webp`를 검토할 수 있으나 해당 영상에서 실제로 선택된 장면만 사용한다.
- **16:9 구성:** 실제 3D 지형·수면 화면을 전체 비율로 유지한다. 구역을 잘라 새 침수 경계처럼 보이게 하거나, 원본에 없는 물·지형을 덧그리지 않는다.
- **카메라와 피사체:** 실제 Predict 녹화의 시점과 지형만 사용한다. ImageGen이 지형·해안선·수위를 움직이지 않는다. 배경 연출은 화면 주변의 절제된 명암뿐이다.
- **5초 motion plan:** 15–16초 A03의 화면을 실제 Flood3D 프레임으로 match-cut → 16–19초 `ax-predict-fast.mp4` 원본을 재생 → 19–20초 실제 종료 프레임을 잠시 유지하고 A05의 모니터링 지도 색조로 연결한다.
- **이전/다음 match-cut:** A03의 지도 확대 방향만 시각적으로 잇고 동일 장소라고 단정하지 않는다. A05로는 실제 수면/지도 영역의 색조와 중앙 기준점으로 전환한다.
- **ImageGen prompt core:** `Create only a quiet 16:9 blue-gray atmospheric backing plate around the exact supplied Predict capture. Keep the captured 3D terrain, water surface and all interface pixels unchanged; add no landform, water motion or flood extent. Maintain natural light and restrained contrast.`
- **Negative prompt:** 공통 조건 + `flood wave, rising water animation, inundation boundary, damaged buildings, submerged roads, fabricated scenario, changing terrain, extra contour, storm effects`.
- **사실 검수:** 시뮬레이션 조건·범위·값은 원본 화면에서만 가져온다. 현재 화면이 보이지 않는 침수·재난 결과를 예측했다고 서술하지 않는다.

### A05 · 20–25초 · Monitor의 관측 시계열과 지도

- **대표 still 목적:** 지도 위치와 시계열을 함께 살펴 환경 관측을 지속 모니터링하는 Monitor 기능을 보여준다.
- **실제 reference:** `buoy-poster.webp`, `env-poster.webp`, 승인된 `ax-monitor-fast.mp4`.
- **16:9 구성:** 실제 Monitor 화면을 전체 프레임으로 둔다. 원본의 지도·시계열·설정 패널을 확대해 자르거나 다른 자료의 범례·값을 가져오지 않는다. 물리 부이 장면은 사용하지 않는다.
- **카메라와 피사체:** 실제 지도상의 관측 위치와 화면에 표시된 시계열을 차례로 주목하게 한다. 그래프 선과 측정 값은 실제 녹화 안에서만 움직인다.
- **5초 motion plan:** 20–21초 A04 종료 프레임에서 실제 Monitor 지도로 match-cut → 21–24초 `ax-monitor-fast.mp4` 원본 재생 → 24–25초 실제 시간축과 지도 위치를 유지해 A06에서 이어받을 기준점을 남긴다.
- **이전/다음 match-cut:** A04의 수면 영역에서 지도 면으로 부드럽게 전환한다. A06은 이 실제 Monitor 화면에서 시작하며, 최종 Discover 첫 프레임과 같은 전체 프레임 규격을 유지한다.
- **ImageGen prompt core:** `Create only a soft 16:9 deep navy and blue-gray background outside the exact supplied monitoring screen. Preserve the original station map and time-series interface as source footage in post. No generated buoy, sensor, marker, chart or data.`
- **Negative prompt:** 공통 조건 + `physical buoy close-up, sensor hardware, station ID, new monitoring point, altered graph, new data value, warning, live badge, moving time-series line outside the source clip`.
- **사실 검수:** 지도 위치와 시간축이 원본과 같은지 확인한다. 녹화에 표시된 값을 현재 실시간 관측이나 일반적인 결과로 표현하지 않는다.

### A06 · 25–30초 · AX 기능 수렴과 실제 화면으로 연결

- **대표 still 목적:** Discover·Predict·Monitor가 하나의 AX Platform 흐름에 놓인다는 점을 실제 화면 전환으로 보여주고, 바로 아래의 실제 플랫폼 화면 시퀀스로 이어준다.
- **실제 reference:** A03–A05에서 사용한 `ax-discover-fast.mp4`, `ax-predict-fast.mp4`, `ax-monitor-fast.mp4`와 각 포스터. AX 개요 포스터는 마지막 공간 기준으로만 사용할 수 있다.
- **16:9 구성:** 세 기능 화면은 차례로 전체 프레임에 나타난다. 동시에 겹치는 대시보드, 새 탭 바, 라벨, 카드 테두리는 만들지 않는다. 각 화면은 원본 비율·UI를 보존한다.
- **카메라와 피사체:** 동일한 16:9 프레임 안에서 세 기능의 실제 화면 구도와 캡처 크기를 일관되게 맞춘다. 데이터 화면 자체를 변형하지 않고 편집 컷으로 하나의 제품 경험을 표현한다.
- **5초 motion plan:** 25–26초 실제 Monitor 종료 상태 → 26–27초 실제 Predict 프레임 → 27–28초 실제 Discover 프레임을 각각 짧게 전환 → 28–30초 Discover 클립의 첫 화면에 정착한다. 웹페이지 아래 실제 제품 시퀀스의 첫 Discover 화면과 이 마지막 프레임을 직접 match-cut한다.
- **이전/다음 match-cut:** A05의 Monitor 마지막 프레임에서 이어받는다. 필름 종료 후 웹페이지의 수동 탭·실제 16:9 제품 캡처가 곧바로 시작한다. `Discover` 첫 화면을 다음 시퀀스의 시작으로 맞춘다.
- **ImageGen prompt core:** `Create only a clean, nearly black navy-to-blue-gray 16:9 transition background with a very subtle natural depth gradient. Leave the entire frame clear for exact Discover, Predict and Monitor screen captures to appear one at a time in post. No typography, logo or interface.`
- **Negative prompt:** 공통 조건 + `three-panel collage, composite dashboard, merged maps, fabricated AX logo, generated feature labels, simultaneous live data, HUD frame, animated values, new transition icon`.
- **사실 검수:** 세 기능은 서로 다른 실제 캡처로 차례로 보여준다. 단일 시점의 결합 데이터·실시간 동시 상태라고 주장하지 않는다. 다음 화면과 첫 Discover 프레임의 비율·위치·진입 방향을 확인한다.

## 최종 제작 검수

- 모든 화면은 16:9이며, 실제 UI 녹화는 1280×720 원본 비율과 픽셀 구성을 보존한다. 가독성이 부족하면 확대·크롭 대신 해당 원본 길이와 배치로 해결한다.
- 시각 효과는 navy, blue-gray, ice-blue, white 중심의 저대비 공간 전환으로 제한한다. 푸른 네온, HUD, 격자, 과장된 공간 깊이를 쓰지 않는다.
- 생성 배경과 실제 UI 레이어의 경계가 분명하고, 생성 텍스트·지도·수치가 최종 프레임에 남지 않았는지 확인한다.
- 실제 지도·시계열·시뮬레이션이 각 지정 포스터와 fast clip에 보이는 상태와 일치하는지 검수한다. 새로운 값·날짜·상태·위치·지형·관측 장비를 추가하지 않는다.
- A06 마지막 프레임과 이어지는 실제 플랫폼 영상은 원본 16:9 비율과 실제 캡처를 보존하고, Discover 시작 프레임과 match-cut한다.
