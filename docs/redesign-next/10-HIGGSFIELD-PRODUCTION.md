# Higgsfield 영상 제작·검수 절차 · 2026-09-28

> **유료 생성 보류** — 사용자가 Plus를 결제했고 2026-09-28 잔액 1210크레딧을 확인했다. 집행 상한은 약 1200크레딧이다. 화면에서 확인한 Seedance 2.5 무음 5초 16:9 1080p 견적은 60크레딧이다. 이 값은 사전 견적이며 실제 비용·품질·완성을 보장하지 않는다.

## 먼저 확정할 것

- [회사 기술·실적·논문 근거](16-COMPANY-FILM-EVIDENCE-20260928.md)와 [60초 콘티](14-1080P-FILM-STORYBOARD-20260928.md)의 CF01–CF13을 대조한다.
- 컷별로 실제 장소 또는 자료의 원본 ID, 촬영·관측 시각, 센서·장비 형상, 이용권, 첫·중간·마지막 프레임을 `production-plan.json`에 채운다.
- 실제 자료를 화면 어디까지 쓰고 Higgsfield가 무엇을 보완할지 그려서 한 장의 시안으로 만든다. 서로 다른 장소와 시기를 한 번의 연속 촬영처럼 합치지 않는다.
- 원본이 없는 모델 결과·AI 탐지 마스크·측선·장비 조작은 생성 금지다. 컷을 연출로 바꾸거나 출처 있는 자료를 확보할 때까지 대기한다.
- CF01용 가상 하구·도시 이미지와 이전 생성 프롬프트는 철회했다. 현재 회사소개서 사진은 임시 웹 포스터이며 영상의 확정 시작 프레임이 아니다.

## 한 컷의 제출 카드

`PROMPT-CARDS.md`는 계획에서 자동 생성된다. 각 카드의 공통 틀은 아래와 같고 컷별 실제 입력 파일과 권리가 채워지기 전에는 제출하지 않는다.

1. **근거**: 회사 사업·논문 ID와 원본 파일 SHA-256
2. **장면**: 실제 위치 또는 비자료 배경의 정체, 카메라 높이·방향, 빛·날씨
3. **프레임**: 시작·중간·끝의 같은 지형·장비 형상·물리 연속성
4. **한 가지 동작**: 전진, 측면 이동, 완만한 회전 중 하나
5. **합성 경계**: 원본으로 보존할 지도·자료·UI·수치·표기
6. **금지**: 가상 도시·해안, 빛나는 스캔 광선, 허구 탐지·예측, 뒤틀린 선체·부이·실험실 장비
7. **비용**: 선택 모델과 1080p 설정에서 생성 버튼 전 표시되는 크레딧
8. **검수**: 전체 재생과 시작·중간·끝 프레임, 정확도와 웹 배치

## 생성 프롬프트의 공통 문장

> Create a silent 16:9 cinematic transition at native 1920x1080 for the supplied GeoSR company-film shot card. Use the supplied documented real-world source frames for geography, equipment shape, scale and light. Perform only the single specified camera motion. Preserve the source coastline, islands, structures and water physics. Leave clean space for separately composited real scientific data and HTML text. Do not create a city, beach, harbor, satellite raster, sonar bathymetry, ADCP current, AI mask, bounding box, laboratory reading, forecast map, UI, number, Korean text or logo. No morphing landforms, floating cables, implausible wakes or watermarks.

이 문장은 **템플릿**이다. 컷별 입력·동작·합성 경계가 비어 있으므로 생성 버튼에 바로 붙여넣을 최종 프롬프트가 아니다.

## 단계별 크레딧 예산

| 용도 | 최대 크레딧 |
| --- | ---: |
| 회사 본편의 실제 자료로 해결되지 않는 전환·배경 6컷 | 360 |
| AX·GeoDAP의 전환 3컷 | 180 |
| 탈락 사유를 기록한 재시도 3컷 | 180 |
| 예비분 | 480 |
| 총 상한 | **1200** |

한 장면의 시안이 통과하기 전에 다음 장면을 일괄 제출하지 않는다. 이미 가진 16:9 실사·지도·영상·UI를 편집해 해결되는 컷에는 크레딧을 쓰지 않는다. **생성 컷 수와 60초 본편 컷 수는 다르다.**

## 최종 1080p 검수

- 원본 출력의 실제 해상도·프레임률·길이·오디오 트랙·코덱과 SHA-256을 기록한다. 720p를 확대해 1080p 납품이라 부르지 않는다.
- 시작·중간·끝 스틸을 100% 크기로 확인하고 전체 영상을 재생한다. 지형·그림자·물결·장비·부이 계류·실험 동작과 과학적 의미를 검수한다.
- 실제 자료를 합성한 뒤 CF01→CF13의 빛·색·화면 방향과 24초 루프 접합을 확인한다. QHD 및 모바일에서 제목과 영상의 크롭을 별도로 확인한다.
- 최종 인코딩은 웹 무음 자동재생용 H.264 MP4, 포스터 정지 이미지, 자동재생 실패 시 정지 화면을 마련한다. 재생 속도와 로딩은 실제 빌드에서 측정한다.
- `docs/redesign-next/reviews/<ID>-takeNN.json`에 모델·설정·프롬프트 전문·크레딧 전후·원본 파일·프레임 검수·판정을 남긴다. 합격 컷만 `dist/film-manifest.json`에 연결한다.

AX는 제공된 직원 저장소에서 삽입한 실제 제품 화면을 FHD 이상으로 다시 녹화하고 UI 픽셀을 유지한다. GeoDAP은 실제 공개 메인 화면을 먼저 보여준다. 제품별 영상은 회사 60초 본편과 별도의 편집물이다.
