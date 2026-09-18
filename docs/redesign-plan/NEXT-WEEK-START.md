# 다음주 GeoSR 재설계 시작 체크리스트

이 문서는 `MASTER-REDESIGN-ANALYSIS.md`를 실행하기 위한 첫 작업 순서다

## 시작 전 고정

- [ ] 최신 사용자 지시와 마스터 기준을 확인
- [ ] 현재 기준 커밋과 작업 트리 확인
- [ ] 현재 구현은 참고본으로만 열기
- [ ] 기존 HTML·CSS를 먼저 수정하지 않기
- [ ] 영상 생성과 유료 제작을 먼저 실행하지 않기

## 1차 조사 산출물

- [ ] 기존 GeoSR 홈페이지의 사업·기술·연구·게시판 구조
- [ ] 21개 기술 상세의 원본 자료와 상위 그룹
- [ ] 장비 전체 목록과 실제 사진·영상 위치
- [ ] 조사선·USV·UAV·LiDAR·부이·ROV·센서·실험 장비
- [ ] 위성·원격탐사·수치모델·AI·공간정보 자료
- [ ] AX 실제 화면 녹화 후보
- [ ] GeoDAP 확정 화면과 외부 연결 정보
- [ ] 인증·면허·특허·학술·대표 연구 자료

조사 결과는 자산명, 원본 경로, 상태, 사용 후보, 사실 검수 메모를 가진 표로 남긴다

## 2차 설계 산출물

- [ ] Direction A Cinematic Scientific
- [ ] Direction B Spatial Editorial
- [ ] Direction C Interactive Technical
- [ ] 각 방향의 데스크톱 전체 Home 보드
- [ ] 각 방향의 모바일 적응 보드
- [ ] Hero, Field, Technology Story, AX, GeoDAP, Evidence, Contact 화면
- [ ] 색상·타입·그리드·미디어 비율·모션 메모

세 보드를 사용자에게 먼저 비교 제시하고 하나를 선택받는다

## 3차 제작 준비

- [ ] 선택 방향의 Home layout과 page rhythm
- [ ] 메인 기업 영상 10장면 keyframe
- [ ] AX 영상 Detect·Predict·Monitor 구조
- [ ] 실제 플랫폼 16:9 클립 연결표
- [ ] ImageGen용 장면별 프롬프트와 금지 요소
- [ ] Flow 저해상도 테스트 목록
- [ ] Higgsfield 고해상도 제작 후보

## 구현 시작 게이트

다음 항목이 모두 준비되기 전에는 전체 구현을 시작하지 않는다

- [ ] 사용자 선택 방향
- [ ] Home layout
- [ ] navigation
- [ ] design tokens
- [ ] motion map
- [ ] asset provenance
- [ ] film slots
- [ ] AX와 GeoDAP 분리 규칙
- [ ] 모바일·접근성·성능 계획

구현 후에는 로컬 미리보기와 GitHub 커밋·푸시를 한 묶음으로 검수한다
