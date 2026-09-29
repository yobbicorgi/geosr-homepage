# 사용자 승인 기존 7종 영상 확보

Higgsfield 현재 video history 7건을 직접 조회하고 원본과 초당1프레임 장면을 대조함
추가 생성과 비용 없음
모두 실제 관측 자료가 아닌 기술홍보 콘셉트로 사용

| 종류 | 정확 job ID | 원본 경로 | 추천 위치 |
|---|---|---|---|
| 드론 비행 | 7128a0e7-e8a0-46b6-80c6-4085bea8f2c9 | media-source/video-production-20260929/uav-seedance20-5s.mp4 | 메인 연결컷 및 공간정보 도입 |
| 선박 단면 스캔 | be16f288-63c4-4207-9027-31f5a2673347 | media-source/video-production-20260929/seismic-seedance20-5s.mp4 | 메인 및 기술57 |
| 수치모델 격자 | 1ed7775c-dd67-41ef-97e4-1ea18c8688a6 | media-source/editorial/hero-estuary-model-attempt-seedance20-20260929.mp4 | 수환경 모델 도입 |
| 선박 CTD | 1b5e3ea6-16ba-4a9d-a588-a07fe282c7cd | media-source/editorial/hero-ctd-motionref-attempt-seedance20-20260929.mp4 | 관측 소개 짧은 컷 후반 선체 잘림 고려 |
| 확산 | 5880996e-6f0b-444b-8458-82112dd1dc3d | media-source/video-production-20260929/diffusion-recovered.mp4 | 환경모델 및 AX 콘셉트 |
| 해파리 | bc159dca-1ae7-4eb1-9ea6-66c428386796 | media-source/video-production-20260929/jellyfish-recovered.mp4 | AI 소개 보조 개념영상 |
| 바다 S자 흐름 | 4ba035ad-fb8d-4e36-a230-8e0498dd4386 | media-source/video-production-20260929/ocean-flow-recovered.mp4 | 메인 광역기술 장면 및 해양예측 도입 |

관측된 한계는 유지한다 CTD 후반 우측 선체 일부가 잘리고 해파리 박스는 실제 추적 정밀도가 아니다
수치모델 격자와 확산은 계산 결과가 아니라 설명적 효과다
동일 파일의 재다운로드 사본은 SHA256 일치 확인 후 제거하고 기존 원본 경로를 재사용했다
각 원본 URL과 파라미터는 user-seven-history.json에 저장했다
