# C05–C06 ImageGen Log

- 생성일: 2026-09-20
- 제작 방식: built-in ImageGen, local reference edit for C06 end only
- 사용 기준: [FILM-STORYBOARD-DIRECTOR-v3.md](../FILM-STORYBOARD-DIRECTOR-v3.md), C05/C06
- 용도: 특정 GeoSR 현장이나 실제 운용을 주장하지 않는 배경 concept plate. 실제 장비·지도·데이터·UI는 생성하지 않았다. 웹 코드에는 연결하지 않았다.
- 공통 검수: 16:9 wide, 사람·장비·읽을 수 있는 글자·지도·그리드·네온 효과 없음. concept background로만 사용하고 실제 현장 증거로 표기하지 않는다.

## 채택 결과

| 장면 | 저장소 결과 | 크기 / 비율 | ImageGen output provenance | 상태와 시각 검수 |
|---|---|---:|---|---|
| C05 coast end | dist/assets/concepts/corporate-film-v3/c05-coast-end-v1.png | 1672×941 / 1.77683 | C:\Users\user\.codex\generated_images\01a0b9f9-07be-79b2-bad3-cdf72bc8d560\exec-f683cb12-3f3e-4b75-9d10-c992fc91c114.png | 채택. 흐린 낮의 절제된 온대 연안, 멀리 방파제와 작업 해안이 보인다. 사람·선박·장비·문자·식별 가능한 랜드마크와 뚜렷한 생성 artifact가 보이지 않는다. |
| C06 waterline start | dist/assets/concepts/corporate-film-v3/c06-waterline-start-v1.png | 1672×941 / 1.77683 | C:\Users\user\.codex\generated_images\01a0b9f9-07be-79b2-bad3-cdf72bc8d560\exec-b76214db-f94f-4b0f-868a-a1c19cd75088.png | 채택. 수면 높이의 안정된 수평선과 멀리 흐린 해안이 보인다. 사람·선박·장비·문자·식별 가능한 랜드마크가 보이지 않는다. |
| C06 underwater end | dist/assets/concepts/corporate-film-v3/c06-underwater-end-v1.png | 1672×941 / 1.77683 | C:\Users\user\.codex\generated_images\01a0b9f9-07be-79b2-bad3-cdf72bc8d560\exec-08643df0-7dfb-47a6-9ffe-625976de4484.png | 채택. 수면 아래 녹청색 물기둥과 상단 수면광, 미세한 자연 부유물이 보인다. 동물·산호·다이버·ROV·센서·케이블·문자·발광 효과가 보이지 않는다. C06 start와 색감 및 수면광 방향이 이어진다. |

세 결과 모두 원본 생성 PNG를 그대로 복사했다. 생성물은 배경 plate이며 실제 장비나 특정 촬영 장소의 증거가 아니다. 이 장면들로 GeoSR의 실제 연안 조사·수중 설치·운용을 주장하지 않는다.

## 생성 프롬프트 기록

### C05 coast end

~~~text
Use case: photorealistic-natural. Create a restrained documentary background plate in a wide 16:9 composition: a plausible temperate East Asian coast and harbor edge in late-morning overcast light, calm sea with natural surface texture, a breakwater and working shoreline only far in the distance. Stable low aerial camera looking from offshore. Keep the place non-identifiable and do not imply a particular real site. Korean engineering corporate-film tone, quiet and natural, no dramatic spectacle. No people, vessel, equipment, text, signage, map, grid, neon, fantasy elements, dramatic sunset, or tropical water.
~~~

### C06 waterline start

~~~text
Use case: photorealistic-natural. Create a wide 16:9 documentary background plate in the same visual world as the C05 temperate East Asian coast: a realistic camera at the waterline, calm natural surface, distant muted coast and low breakwater on the horizon, late-morning overcast light, restrained neutral grade. Keep the location non-identifiable. No people, vessel, equipment, animals, text, signage, map, grid, neon, dramatic sunset, or tropical water.
~~~

### C06 underwater end

The C06 waterline start image was supplied as the edit reference. Keep its horizon/world, subdued light direction, and neutral muted grade continuous while moving the camera just below the same water surface.

~~~text
Use case: precise-object-edit. Edit the supplied C06 waterline frame into its immediate underwater continuation. The camera has moved just below the same surface; retain the same calm temperate coastal world, subdued daylight direction, and muted grade. Show a realistic green-blue water column with only fine natural suspended particles and the water surface softly visible above. Keep the location unidentifiable. No animals, coral, diver, ROV, sensor, cable, vessel, laser, grid, text, neon, glowing effects, or invented equipment.
~~~

## Reject / retry record

- C05: 채택 결과 외에 해당 생성 호출에서 거절한 변형 없음.
- C06 start: 채택 결과 외에 해당 생성 호출에서 거절한 변형 없음.
- C06 end: 채택 결과 외에 해당 편집 호출에서 거절한 변형 없음.
- 명백한 실패가 없어 targeted regeneration은 수행하지 않았다.

## 사용 경계

이 concept plate는 storyboard timing·색감·컷 연결을 검토하는 용도다. 실제 한국 현장, GeoSR의 관측/조사 이력, 수중 장비 배치 또는 실제 환경 상태를 입증하지 않는다. 실제 장비를 넣을 경우 별도 권리 확인과 원본 픽셀 보존 절차를 따른다.
