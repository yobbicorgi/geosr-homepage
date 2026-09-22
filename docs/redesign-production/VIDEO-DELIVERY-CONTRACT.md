# 영상 교체 계약

이 문서는 홈페이지 구현과 별도로 진행할 영상 제작·교체 기준이다
2026-09-22 사용자 승인으로 기존 Flow 크레딧을 사용한 720p 초안 생성·편집·반영을 진행한다 유료 업그레이드와 Higgsfield 결제는 포함하지 않는다
검수한 초안은 approval을 draft-reviewed로 표시하고 웹에 720p 영상 초안 배지를 유지한다 최종본 승인과 구분한다
현재 생산 및 이월 현황은 FLOW-PRODUCTION-TRACKER.md를 기준으로 확인한다

## 교체 위치

설정 파일은 `dist/film-manifest.json` 하나를 사용한다
완성된 파일을 아래 delivery 위치에 저장한 뒤 같은 항목의 src에 경로를 넣고 approval을 approved로 바꾼다
미완성 항목은 src null과 approval pending을 유지한다
기존 초안 파일의 이름이나 과거 승인 문구만으로 새로운 최종 영상을 승인하지 않는다

| 슬롯 ID | 용도 | 길이 기준 | 최종 파일 |
| --- | --- | --- | --- |
| geosr-hero | 회사 첫 화면 전체 | 약 60초 | assets/films/geosr-hero.mp4 |
| ax-concept-film | AX 별도 콘셉트 필름 | 약 30초 | assets/films/ax-concept-film.mp4 |
| expertise-1 | 관측·조사 | 약 6초 루프 | assets/films/expertise-observation.mp4 |
| expertise-2 | 환경·생태 분석 | 약 6초 루프 | assets/films/expertise-environment.mp4 |
| expertise-3 | 수치모델·예측 | 약 6초 루프 | assets/films/expertise-modelling.mp4 |
| expertise-4 | AI·원격탐사 | 약 6초 루프 | assets/films/expertise-satellite.mp4 |
| company-overview | 회사 소개 | 약 60초 | assets/films/company-overview.mp4 |

개별 AX 플랫폼은 실제 UI 정지 화면을 먼저 연결한다
추후 실제 기능 녹화를 넣을 때도 해당 플랫폼과 기능에 맞는 파일을 연결한다
기존 탐지·예측·모니터링 통합 클립을 임의의 개별 플랫폼 화면으로 사용하지 않는다

## 화면과 재생

- 원본 16:9 비율 권장 1920×1080 이상
- 회사 첫 화면은 화면 전체를 채우므로 제목 위치와 화면비 변화에 맞춘 안전 영역을 확보
- 플랫폼 기능 화면은 전체 프레임을 보존하며 메뉴만 세로로 잘라 넣지 않음
- UI 확대 컷은 별도 승인된 동일 16:9 구도로 제작
- 짧은 제품 루프에 읽어야 할 작은 글자를 빽빽하게 넣지 않음
- 영상 안에 홈페이지 제목·재생 버튼·준비 중 배지를 굽지 않음
- 기본 무음 재생과 inline 재생 사용
- viewport 밖이나 백그라운드 탭에서는 정지
- 움직임 줄이기·데이터 절약 환경에서는 자동 재생하지 않음
- 사용자가 직접 재생·정지 가능
- 오류가 나면 포스터로 돌아가고 실패 상태를 표시
- 탭 전환으로 미디어 요소가 바뀌면 `GeoSRFilm.refresh()` 또는 `geosr:media-updated` 이벤트로 재연결

## 제작 내용 경계

회사 영상은 지구 → 위성 관측 → 한반도와 주변 해역의 자료 분석 → 해상·연안 관측 → 수중 관측으로 이어지는 기존 종합 콘티를 따른다
위성과 선박·무인선·드론·부이·수중 장비는 특정 장비에 편중하지 않고 조사와 분석의 연결을 보여준다
AX 영상은 자료의 탐지·예측·모니터링 활용을 표현하며 별개 플랫폼이 실제로 하나의 통합 운영 화면을 이루는 것처럼 꾸미지 않는다
회사 60초 영상에는 AX 실제 기능 화면이나 AX 전용 콘셉트 컷을 넣지 않는다 AX 메인도 콘셉트 영상으로 구성하고 실제 UI 영상은 하단 플랫폼별 소개에만 사용한다 이 기준이 과거 C09의 AX 화면 삽입 계획보다 우선한다
실제 플랫폼 UI는 생성형 도구로 만들지 않는다
지형·해안선·장비·케이블·계류·수중 거동은 장면별로 검수한다

## 확인

`node scripts/verify_film_lifecycle.mjs`는 실제 재생 코드의 상태 전환을 검증한다
최종 파일 교체 후에는 브라우저에서 시작·반복·정지·탭 이탈·재진입·오류 복귀를 실제 파일로 다시 확인한다
2026-09-22 Flow 720p 초안을 생성하고 편집했다 현재 파일은 최종 품질 합격본이 아니다 생성·검수·반영 상태는 FLOW-PRODUCTION-TRACKER.md에 기록하고 과학적 한계와 재작업 항목은 FILM-SCIENTIFIC-REVIEW-20260922.md를 따른다

같은 날 재검수에서 회사 60초와 AX 30초 편집본은 연결을 해제했다 메인은 8초 오프닝 초안만 사용한다 위치와 방파제 형태가 확인되지 않은 coastal-survey-source.png는 공개 폴더에서 제외했으며 영상 참조로도 재사용하지 않는다
