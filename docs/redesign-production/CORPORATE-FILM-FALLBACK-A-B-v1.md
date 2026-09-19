# Corporate film source-gap fallback plans A/B v1

**선택 전 검토안:** 이 문서는 회사 필름의 C05–C10, 24.0–51.0초(총 27초)가 실제 촬영 소스 부족으로 SOURCE_PENDING인 경우에만 쓰는 대체 편집안이다. [FILM-GENERATION-READINESS-v1](FILM-GENERATION-READINESS-v1.md)와 [v2 콘티](FILM-STORYBOARD-DIRECTOR-v2.md)의 source priority를 바꾸지 않는다. 사용자가 A 또는 B를 선택하기 전에는 이미지 생성, 코드 변경, 외부 제작을 시작하지 않는다.

두 안은 공통으로 00.0–24.0초 C01–C04와 51.0–60.0초 C11–C12를 유지한다. C03은 결정론적 NASA 지리 프레임만 쓰고, C02 위성 cutout은 고정된 NASA Earth 위 별도 합성으로 제한한다. Discover/Predict/Monitor는 승인된 실제 클립만 순서대로 쓰며 UI를 생성하거나 자르지 않는다. C12 마지막 프레임은 C01 첫 프레임과 정확히 맞춘다.

## Plan A — 기존 자료로 편집

24–51초를 새 현장·장비 이미지 생성 없이 채운다. 이미 승인된 NASA 지리 reference, 같은 2012년 8월 C04 데이터 plate, 실제 AX 화면 캡처를 다시 편집한다. 실제 선박·USV·현장 조사·드론·부이·ROV·실험실 장면은 이 구간에 없다. 이 사실을 화면에서 명시하고 현장 촬영인 것처럼 표현하지 않는다.

| 장면 / 시간 | 화면 자산과 편집 | 카메라·크롭·전환 | 사실 캡션과 제한 |
|---|---|---|---|
| C05 · 24.0–30.0 | 승인된 24초 해안 reference 한 장을 6초 연장한다. | 전체 16:9 frame. 0–1.5% 이내 중앙 push만 허용하고 중요한 해안은 중앙 90% 안에 둔다. C04d와 짧게 dissolve. | 24.0–25.5초 별도 자막: “현장 촬영 자료 없음 · NASA 지리자료·공식 환경자료·실제 AX 화면 재편집”. NASA 자료는 역사적 지리 reference로만 표기한다. |
| C06 · 30.0–35.0 | 결정론적 15초, 18초 한반도·북서태평양 approach frame을 각각 2.5초 보여준다. | 각 2560×1440 원본을 16:9로 전부 표시하고 hard-cut. 생성형 중간 지형은 금지한다. | “NASA 기반 결정론적 지리·카메라 reference”. 실제 드론·연안 현장이나 새 관측이라고 부르지 않는다. |
| C07 · 35.0–40.0 | 승인된 MODIS Aqua SST monthly plate를 5초 full-frame으로 재제시한다. | BBOX와 plate 위치를 유지한다. 짧은 whole-frame opacity dissolve만 사용하고 자료 픽셀은 이동시키지 않는다. | 별도 후반 caption: “MODIS Aqua SST · monthly · 2012-08 · °C”. 새 값·범례·결과를 추가하지 않는다. |
| C08 · 40.0–44.0 | 승인된 Aquarius monthly salinity plate를 4초 보여준다. | 16:9 full-frame, no crop. 다른 layer가 겹치지 않게 crossfade한다. | “Aquarius salinity · monthly · 2012-08 · psu”. 거친 공간 특성과 문서화된 color visualization을 숨기지 않는다. |
| C09 · 44.0–48.0 | 승인된 MODIS Aqua L2 chlorophyll-a daily swath를 4초 보여준다. | 원본 coverage와 투명 no-data를 유지한다. plate 전체만 fade-in/out; mask를 그리거나 채우지 않는다. | “MODIS Aqua L2 chlorophyll-a · daily swath · 2012-08-01 · mg/m³”. 공백은 미관측 coverage라고 밝힌다. |
| C10 · 48.0–51.0 | Discover, Predict, Monitor 실제 클립의 서로 다른 첫 1초씩 순서대로 쓴다. | 각각 full 1280×720 source frame, native speed. 51–55.5초 C11은 각 원본의 1.0–2.5초를 이어 써 같은 frame을 반복하지 않는다. | UI 위에 자막을 놓지 않는다. 별도 slate/내레이션: “실제 AX 화면 캡처 · 표시 상태는 촬영 당시”. 이 구간에는 실험실 촬영이 없다. |

이 편집은 지리와 환경 데이터를 다시 설명하고 실제 AX 캡처로 마무리하는 **자료 reference interlude**다. C04와 같은 plate를 재제시하므로 새 관측, 동시 관측, 새 분석 결과가 아니다. C05–C09에는 현장 장면을 암시하는 선박·드론·바람·현장음도 넣지 않는다.

## Plan B — 명시적 콘셉트 장면

자료가 없고 사용자가 B를 선택하면 C05–C10을 일반 환경공학 장면의 콘셉트로 만든다. 특정 GeoSR 장비와 모델은 재현하지 않고 익명 실루엣·부분 detail 또는 비식별 환경 전환만 쓴다. 각 씬은 16:9 start/end still을 ImageGen으로 제안하고 후속 motion은 별도 Higgsfield prompt에 따른다. 이미지에는 텍스트를 생성하지 않는다. “콘셉트 장면 · 실제 GeoSR 현장/장비 아님” 표시는 편집 단계에서 별도로 붙인다.

| 장면 / 시간 | Start / end 장면안 | Higgsfield motion 및 전환 | 외부 표시와 금지 |
|---|---|---|---|
| C05 · 24.0–30.0 | Start: 비식별 temperate open-water의 익명 연구선 실루엣. End: 별도 컷의 작은 익명 무인 수상정. 두 craft를 한 화면에 함께 두지 않는다. | 24–27초 느린 lateral drift, 27초 hard-cut, 27–30초 수상정 단독 컷. 기체 morph나 공동 운용 암시는 금지. | “콘셉트 장면 · 실제 GeoSR 현장/장비 아님”. 특정 선박/USV 모델, 한국 항만, 센서, 사람, 번호판 금지. |
| C06 · 30.0–35.0 | Start: 무표기 시료병과 일반 측정기구가 놓인 중립 tray macro. End: 같은 물체 수/배치의 조금 넓은 view, 장소는 식별되지 않는다. | 동일한 물체 수와 배치를 유지한 느린 macro slider. 물·시료가 어디서 왔는지 연결하지 않는다. | “콘셉트 장면 · 실제 GeoSR 채수/현장 아님”. 라벨·수치·결과·손·하천명 금지. |
| C07 · 35.0–40.0 | Start: 비식별 물·콘크리트 경계의 높은 시점. End: 같은 추상 표면에 가까운 high-angle view. UAV/scan은 보이지 않는다. | 카메라만 천천히 낮춘다. 새 지형, 기체, mesh나 점군을 만들지 않는다. | “콘셉트 장면 · 특정 항만/측량 결과 아님”. 지도형 해안, 한국 지명, UAV 모델, scan result 금지. |
| C08 · 40.0–44.0 | Start: 일반형 소형 float와 물 표면. End: 같은 float와 일부 tether의 절제된 split-level view. 구체 구성·센서 수는 특정하지 않는다. | 약한 surface bob 뒤 기존 tether 방향으로 tilt-down. 케이블을 늘리거나 sensor/anchor를 발명하지 않는다. | “콘셉트 장면 · 실제 부이/계류 구성 아님”. TPRBM, 모델, 센서 수, 위치, 측정값 금지. |
| C09 · 44.0–48.0 | Start: generic cylinder sensor macro. End: 별도 컷의 원거리 익명 ROV 실루엣. 같은 deployment로 보이지 않는다. | 44–46초 센서, 46초 hard-cut, 46–48초 ROV. Morph/연결 없음. | “콘셉트 장면 · 실제 GeoSR ROV/센서 아님”. BlueROV2/RBR 형태 복제, 추진기 수, payload, sonar 금지. |
| C10 · 48.0–51.0 | Start: 무표기 병과 일반 현미경 케이스가 있는 익명 lab bench. End: 같은 무대의 약간 가까운 instrument detail. 화면은 꺼져 있거나 프레임 밖이다. | 물체는 정지, 얕은 focus shift만. 51초 실제 Discover에 hard-cut한다. | “콘셉트 장면 · 실제 GeoSR 실험실/분석 아님”. ICP-MS 모델, 결과, 그래프 금지. |

JSON companion에는 Plan B 여섯 장면의 완전한 start/end ImageGen prompt, 정확한 Higgsfield motion draft, 장면별 negative prompt, crop, caption 및 transition이 들어 있다. 모든 프레임은 16:9 내부 콘셉트이며 사람·얼굴·손, 생성 텍스트·로고, 실제 지명/지도, fake data/UI, 특정 GeoSR 장비 모델은 금지한다. 사용자가 B를 선택하기 전에는 이미지를 생성하지 않는다.

## 60초 연결과 선택

두 안 모두 공통 시작 C01–C04(00.0–24.0), 대체 구간 C05–C10(24.0–51.0), 공통 끝 C11–C12(51.0–60.0)로 이어진다. JSON은 두 plan 각각의 00.0–60.0 전체 타임라인, gap/overlap 검사 및 C12→C01 loop match를 기록한다. Plan A의 C10은 각 UI clip의 첫 1초, C11은 같은 원본의 다음 1.5초를 써 중복 프레임을 피한다.

| 선택 | 의미 |
|---|---|
| A | 현장 촬영 없이 기존 지리자료·공식 환경자료·실제 AX 캡처만으로 60초를 편집하고 자료 구성임을 공개. |
| B | 콘셉트 장면 6개를 만들되 실제 GeoSR 장비·현장·운용 사례가 아니라는 표시를 유지. |
| 미선택 | 기본 상태. 현재 readiness와 source priority를 유지하고 생성/코드 변경을 시작하지 않음. |

사용자에게 필요한 선택은 A 또는 B 하나다. 어느 안도 실제 source 권리·사실 검증, 최종 영상 승인, website poster 승인, 공개 배포 승인을 대신하지 않는다.
