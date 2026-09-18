# FLOW DRAFT 01 — Orbital layers

Google Flow에서 ImageGen 정지 가안을 입력 이미지로 사용해 만드는 **5초 무음·저해상도 영상 초안**이다. 입력 이미지는 시각 방향을 위한 가안이며 실제 분석 결과, 관측값, 위성 산출물 또는 검증된 지도 데이터가 아니다. 입력 기준은 기존 GeoSR [`dist/assets/satellite-layers-v3.png`](../../dist/assets/satellite-layers-v3.png)의 구도이며, 화면 좌상단에 실제 관측 위성이 분명하게 보여야 한다. 위성이 없는 새 가안은 사용하지 않는다.

## 고정 사양

- 화면비: 16:9
- 길이: 5초
- 오디오: 없음
- 품질: low quality draft / composition review only
- 장면: 한반도 주변을 포함한 구형 지구 한 개
- 레이어: 환경 데이터 레이어 **정확히 3개**, 순서대로 부드럽게 상승
- 카메라: 지구 표면을 향해 천천히 아래쪽으로 이동
- 입력 이미지 외 추가 물체·장식·텍스트 생성 금지
- 사람, 손, 선박, 항공기, 가짜 지명, 가짜 수치, 범례, 로고, UI, 네온 라인 금지
- 실제 지리와 어긋나는 해안선·국경·위치 표시는 만들지 않으며, 레이어는 검증 전 개념 표현으로만 처리
- 기존 `satellite-layers-v3.png`의 좌상단 관측 위성을 데이터 층을 관측하는 출발점으로 보존한다. 위성을 새로 발명하거나 지우지 않으며, 위성에서 과장된 빛·신호·네온 선을 추가하지 않는다.

## 한글 프롬프트

```text
`dist/assets/satellite-layers-v3.png`의 기존 GeoSR 구도와 좌상단의 실제 관측 위성을 입력 이미지로 사용한다. 위성이 화면 좌상단에 분명히 보이는 상태를 유지하고, 위성 없는 새 가안으로 대체하지 않는다. 입력 이미지는 구도와 색감의 참고용 가안으로만 사용한다. 16:9, 5초, 무음, low quality draft. 한반도 주변이 보이는 구형 지구 하나를 어두운 남색과 해무 백색의 절제된 환경 연구 장면으로 유지한다. 좌상단의 위성은 세 환경 데이터 층을 관측하는 출발점으로만 보이며, 추가 신호·빛·네온 선을 만들지 않는다. 카메라는 지구의 위쪽 궤도 시점에서 표면을 향해 아주 천천히 아래쪽으로 이동한다. 화면에는 환경 데이터 레이어를 정확히 세 개만 사용하고, 첫 번째 레이어가 부드럽게 올라온 뒤 두 번째, 세 번째 레이어가 차례로 낮은 높이에서 올라온다. 레이어는 검증 전 개념을 나타내는 얇고 불투명한 blue-gray 면 또는 절제된 안개층이며, 실제 분석 결과나 관측값으로 보이지 않아야 한다. 레이어 사이의 간격과 순서를 명확히 유지한다. 입력 이미지는 실제 분석 결과가 아닌 visual concept draft라는 전제를 유지한다.

사람, 손, 선박, 항공기, 추가 물체, 가짜 지명, 가짜 숫자, 수치 라벨, 범례, 로고, UI, 지도 핀, 화살표, 네온 파란 선, 빛나는 데이터 네트워크, 새로운 해안선이나 가짜 지형을 만들지 않는다. 실제 지리와 맞지 않는 위치 이동을 하지 않는다. 카메라 이동 외에 빠른 줌, 회전, 흔들림, 장면 전환을 사용하지 않는다. 입력 이미지의 구형 지구와 한반도 주변의 공간 관계를 보존한다.
```

## English prompt

```text
Use the existing GeoSR composition in `dist/assets/satellite-layers-v3.png` as the input image. The real observation satellite must remain clearly visible in the upper-left of the frame; do not replace it with a new satellite-free concept. Use the satellite only as the observation starting point for the three layers, with no added signal effects, glow or neon lines. Use the input image only as a visual concept reference for composition and tone. 16:9, 5 seconds, silent, low quality draft for composition review. Keep one restrained spherical Earth with the area around the Korean Peninsula visible, using deep navy, mist white and limited blue-gray. The camera starts above the globe and moves very slowly downward toward the surface. Use exactly three environmental data layers, no more and no fewer. Let layer one rise gently, then layer two, then layer three, each from a low height and with clear spacing and order. The layers are unverified conceptual environmental layers, shown as thin opaque blue-gray surfaces or restrained mist-like planes. They must never look like verified analysis results, measurements, satellite products or live observations. Preserve the input image's globe and the spatial relationship around the Korean Peninsula.

Do not generate people, hands, ships, aircraft, extra objects, invented place names, invented numbers, numeric labels, legends, logos, UI, map pins, arrows, neon blue lines, glowing data networks, new coastlines or fabricated terrain. Do not shift geography or imply geographic accuracy beyond the concept reference. Use no fast zoom, rotation, shake or scene cuts. Keep the camera movement as the only primary motion. The input image must remain clearly a visual concept draft, not an actual analysis result.
```

## 검수 체크리스트

- [ ] 16:9, 5초, 무음, low quality draft로 출력되었는가
- [ ] 구형 지구가 하나만 남아 있고 한반도 주변의 공간 관계가 프레임마다 흔들리지 않는가
- [ ] 입력 이미지가 기존 `dist/assets/satellite-layers-v3.png` 구도를 따르고, 실제 관측 위성이 화면 좌상단에 분명히 보이는가
- [ ] 위성 없는 새 가안으로 바뀌지 않았고, 위성이 데이터 층의 관측 출발점으로만 읽히는가
- [ ] 환경 레이어가 정확히 3개이며 1→2→3 순서로만 상승하는가
- [ ] 카메라가 천천히 아래쪽으로 이동하고 회전·흔들림·빠른 줌이 없는가
- [ ] 입력 이미지를 실제 분석 결과로 오인하게 하는 수치, 범례, UI, 지명이 없는가
- [ ] 사람·손·선박·항공기·추가 물체가 생기지 않았는가
- [ ] 가짜 해안선·지형·지리 이동이 없고, 실제 위치를 주장하는 표현이 없는가
- [ ] 네온 파란 선이나 과도한 glow가 없고 navy·mist-white·blue-gray 계층이 유지되는가
- [ ] 레이어 수가 프레임 중간에 늘거나 합쳐지지 않는가
- [ ] 마지막 프레임에서도 입력 가안이 실제 데이터 제품처럼 보이지 않는가

## 도구 사용 구분

- **ImageGen:** 기존 `dist/assets/satellite-layers-v3.png`의 좌상단 관측 위성과 구형 지구 구도를 보존한 상태에서 세 레이어의 형태와 색조를 정지 이미지 가안으로 조정한다. 위성 없는 새 가안을 만들지 않으며, 실제 위성·환경 데이터나 정확한 분석 지도를 생성하지 않는다.
- **Google Flow:** 승인된 ImageGen 정지 가안을 입력으로 받아 위 프롬프트의 카메라 하강과 3개 레이어의 순차 상승만 5초 초안으로 시험한다. 결과는 무음 low quality composition draft로만 검토한다.
- **Higgsfield:** Flow 초안에서 승인된 움직임을 후속 모션 제작으로 다듬을 때 사용한다. 카메라 속도와 레이어 easing을 정리하되, 새 물체·지명·수치·데이터 의미를 추가하지 않는다.

최종 영상이나 실제 데이터 레이어를 연결하기 전에는 출처, 지리 일치, 취득일, 처리 이력, 사용 권한을 별도로 확인하고 이 초안의 개념 레이어를 검증된 분석 결과로 승격하지 않는다.
