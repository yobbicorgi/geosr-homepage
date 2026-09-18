# GeoSR 콘텐츠 맵

> **보존 자료의 조사 맵이다. 현재 목업 제작 범위는 [03-MOCKUP-SCOPE.md](03-MOCKUP-SCOPE.md)가 우선한다.** 아래 전체 건수·추천 IA·양방향 전량연결 제안은 원본 조사와 후속 본구축 참고이며, 지금 모든 자료를 넣으라는 지시가 아니다. 최신 페이지·영상 디자인은 메인이 작성한00~03을 따른다.

작성일: 2026-09-17  
대상: C:/Users/user/Downloads/GeoSR_Homepage_v2  
목적: 기존 GeoSR 공개 자료와 로컬 캡처를 기반으로 전면 개편용 정보 구조를 복원한다. 새 문구를 임의로 만드는 원고가 아니라 확인된 사실과 추가 확인이 필요한 항목을 분리한 편집 기준이다.

## 근거와 판정 규칙

- 1차 근거는 로컬 읽기 전용 캡처와 고정 데이터다. 주요 파일은 portal/local-content-20260916/fixed-data.json, portal/local-content-20260916/board-data.json, research-docs/source-capture-20260916/fixed-content/html/, research-docs/source-capture-20260916/public-boards/records.json이다.
- 공식 원 URL은 각 항목에 기록했다. 로컬 캡처가 확인한 당시의 공개 내용을 정리한 것이며, 현재 페이지의 변경 여부는 배포 전에 다시 확인해야 한다.
- 인증서와 수상·실적은 원자료 이미지와 게시글 존재를 확인했지만 현재 유효기간, 발주처 표기, 공개 사용 권한은 별도 확인이 필요하다.
- 한국어 원문에 대응하는 공식 영어 본문은 확인 범위에 포함되지 않았다. 영어 페이지에서는 번역 확정 전까지 원문 제목을 임의로 공식 영문처럼 표기하지 않는다.
- 전면 개편에서도 게시판 상세, 첨부 파일, 외부 플랫폼 링크를 개별 콘텐츠와 연결해야 한다. 개요 카드만 만들면 근거 추적이 끊긴다.

## 현재 확인된 전체 체계

고정 데이터의 root 페이지에는 6개 업무 축이 있다. 세부 사업은 4개 분류 아래 21개 솔루션으로 제공된다. 장비는 실제 활성 메뉴 기준 5개 분류와 80개 항목이다. 과거 자료에서 장비를 6개군으로 세는 표현이 있을 수 있으나, 현재 확인한 고정 데이터와 활성 URL에는 Surveying, Investigation, Biological, Experiment, Ship의 5개군만 있다. water.asp는 활성 분류로 확인하지 않았다.

### 회사·신뢰 정보

- 회사 소개: 2000년 설립, 환경 보전과 지속 가능한 개발, 해양·하구·하천 통합 수환경, 관측부터 모델링까지의 과학·공학 역량, ESG와 정확하고 정직한 서비스라는 공식 설명.
  - 공식 원문: https://www.geosr.com/sub/company/aboutUs.asp
  - 로컬 연결: company.html
- 연락처·조직: 경영관리, 연구소, 예측, 환경화학·생태, 공간통합, 환경조사, 연안관리, 지리정보, 시스템개발 부서가 캡처에서 확인된다. 군포 본사, 부산·포항 사무소도 확인된다.
  - 공식 원문: https://www.geosr.com/sub/company/contact.asp
  - 로컬 연결: company.html#organization, contact.html
- 인증·면허·지식재산: ISO 9001/45001/14001, 벤처, 이노비즈, 기업부설연구소, 해양조사정보업, 해양환경측정분석 관련 증서, 소프트웨어·인터넷·데이터·시스템·빅데이터·지도 서비스 직접생산 관련 이미지가 포함되어 있다. 현행 여부와 공개 가능한 이미지 범위는 확인 필요.
  - 공식 원문: https://www.geosr.com/sub/company/license.asp
  - 로컬 연결: company.html#company-resources
- 공식 회사소개서:
  - 국문: https://www.geosr.com/file/%EC%A7%80%EC%98%A4%EC%8B%9C%EC%8A%A4%ED%85%9C_%ED%9A%8C%EC%82%AC%EC%86%8C%EA%B0%9C%EC%84%9C_%EA%B5%AD%EB%AC%B8_2506.pdf
  - 영문: https://www.geosr.com/file/GeoSR_brochure_eng_2506.pdf
  - 로컬 첨부: assets/company-library/attachments/ec83671638d37f36_지오시스템_회사소개서_국문_2506.pdf, assets/company-library/attachments/dd54cffb61c85edc_GeoSR_brochure_eng_2506.pdf
- 외부 서비스: USV 관측 플랫폼 http://usv.co.kr, 전자해도 https://e-navigation.co.kr/. 연결 상태와 운영 주체는 배포 전 확인.

### 6개 업무 축과 대표 자산

| 업무 축 | 공식 원문/메뉴 | root에서 확인된 설명 | 로컬 대표 이미지 |
|---|---|---|---|
| USV Observation Platform | https://www.geosr.com/ | 연안·하천 실시간 수질 모니터링, 해양 관측, 수심 측량, 천해 관측·조사, 사격훈련 해상표적 | assets/company-library/images/2967130902e41a6e_USV_0.jpg |
| 수환경 보전 | https://www.geosr.com/ | 하구·하천 과정, 수환경 모델링, 해양공간계획, 해역이용협의·영향평가 | assets/company-library/images/3840fb3c53b8dae9_수환경보전.jpg |
| 수환경 건강성 회복 | https://www.geosr.com/ | 해양쓰레기·미세플라스틱, 살아 숨 쉬는 연안, 생태계·적조·비브리오균·대장균 모델링 | assets/company-library/images/8ef2dfc3ec110be1_수환경_건강성_회복_2.jpg |
| 재해예방 | https://www.geosr.com/ | 연안침식 모니터링, 연안재해 감시·취약성 평가, 재해·재난 예측 | assets/company-library/images/f487cc08885ca1db_재해예방_2.jpg |
| 스마트 기술 | https://www.geosr.com/ | 위성·CCTV·해양생물 영상, 탄성파, 빅데이터, AI, 해상풍력 입지, 무인선·UAV, 실시간 예측 | assets/company-library/images/5262f2b9a8b9bc78_스마트기술.jpg |
| 전자해도 | https://www.geosr.com/ | S-63 ENC 판매와 업데이트 유지관리 | assets/company-library/images/cf0ed1b4c517ed79_전자해도7.png |

## 세부 기술·방법·자료 연결

각 행은 기존 사업 상세 페이지의 제목과 본문에서 확인한 범위를 요약한다. 상세 페이지의 공식 URL, 로컬 원문 캡처, 대표 갤러리 자산을 함께 연결해 새 사이트의 기술 설명과 프로젝트 근거를 오갈 수 있게 한다.

### 수환경 보전

1. 하구·하천 과정 (idx 15)
   - 기술: 유체역학·수질·퇴적물·생태계 모델, 파랑 변형, 해안선 변화, 대기-유역-하천-하구 결합, 실시간 모델 운영·개발, 물리 특성·수질 관측, 위성·초분광 분석, 해조·잘피 매핑.
   - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=수환경%20보전&idx=15
   - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-15_15.html
   - 대표 자산: assets/company-library/images/9b2425355c79be81_particle_plot2d_01sec_2.gif
   - 자료 연결: business 실적, research·academic의 관련 관측·모델링 자료. 완전한 양방향 ID는 추가 확인.

2. 수환경 통합모델링 (idx 46)
   - 기술: 국가 관측망 자료 수집·처리·모델 연계 자동화, 파랑·해류·퇴적물·수질, 하천 염수침입, 온배수, 공사 부유사, 서식처 적합도, 먹이망 생태계.
   - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=수환경%20보전&idx=46
   - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-46_46.html
   - 대표 자산: assets/company-library/images/10cbdb83ac7f32f1_수환경통합모델링_main.gif
   - 자료 연결: 수질·관측·모델링 관련 research와 business 상세.

3. 해양공간계획 (idx 47)
   - 기술: 해양공간 특성평가, 해양용도구역 설정, GICOMS 해상교통 분석, V-Pass 선박 통행, 해양·수산 빅데이터.
   - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=수환경%20보전&idx=47
   - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-47_47.html
   - 대표 자산: assets/company-library/images/38244088e2aec541_해양공간게획_4_0.png
   - 자료 연결: business-1979 해양공간정보 구축, business-1972 해상풍력 디지털 입지정보도.

4. 해역이용협의 및 해역이용영향평가 (idx 48)
   - 기술·자격: 해역이용영향평가 대행자 등록 제평-003호, 해양수질 영양염·미량금속 19항목, 해저퇴적물 중금속 13항목 정밀 분석 관련 증서, 수질·퇴적물 정밀 분석, 조류·파랑·퇴적·온배수·해안선·부유사 수치실험.
   - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=수환경%20보전&idx=48
   - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-48_48.html
   - 대표 자산: assets/company-library/images/6d832698db30fc40_크기변환_수환경보전.png
   - 자료 연결: business 영향평가·환경조사 실적과 company-license 증서. 등록번호·증서 유효성은 게시 전 재확인.

5. 해양생태계 보전 및 모니터링 (idx 84)
   - 기술: 저서 규조류 군집, 기초생산력, 대형·소형 저서생물, 해양 서식처 매핑, 생태계 건강성 조사.
   - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=수환경%20보전&idx=84
   - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-84_84.html
   - 대표 자산: assets/company-library/images/19b924e62ecd502e_방형구_조사_2.png
   - 자료 연결: business-1984 2024 연안 생태계 조사, academic 생태·모니터링 논문.

### 수환경 건강성 회복

6. 해양쓰레기 및 미세플라스틱 (idx 50)
   - 기술: 3D 유동장, 자체 개발 입자 추적 소스, 확률 기반 이동·분포 예측.
   - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=수환경%20건강성%20회복&idx=50
   - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-50_50.html
   - 대표 자산: assets/company-library/images/d15357b075a84e49_동영상_01-3_0.gif
   - 자료 연결: business-1981 무인도서 해양쓰레기, academic-3087 부유물 이동·잔류.

7. 살아 숨 쉬는 연안 (idx 51)
   - 기술: 자연 회복 평가, 해양 식생 묘포·식재, 연안 탄소 흡수량, 탄소계수.
   - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=수환경%20건강성%20회복&idx=51
   - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-51_51.html
   - 대표 자산: assets/company-library/images/9563b5a21b2503a8_염습지_조사_2_0.jpg
   - 자료 연결: business-1987 낙동강 하구 기수생태계 복원 모니터링, business-1984 연안 생태계 조사.

8. 생태계·적조·비브리오균·대장균 모델링 (idx 52)
   - 기술: 3D 먹이망 생태, 적조 성장계수, 3D 입자추적, Conv2D-LSTM 적조 예측, 다변량 로지스틱 회귀, 분변성 대장균 이동.
   - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=수환경%20건강성%20회복&idx=52
   - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-52_52.html
   - 대표 자산: assets/company-library/images/3e55cba40d678b44_비브리오패혈증균예측시스템PC_3.png
   - 자료 연결: business-1983 3D 생태·자원 예측, academic 적조·생태·수질 연구.

### 재해예방

9. 연안침식 모니터링 (idx 53)
   - 기술: 해안선·해빈 단면, 해저 지형, 항공·위성 분석, UAV, 영상 모니터링.
   - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=재해예방&idx=53
   - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-53_53.html
   - 대표 자산: assets/company-library/images/509051c0785eaf00_연안침식실태조사_re_0.gif
   - 자료 연결: business-1994 연안침식 정밀조사, business-1993 경북 연안침식, academic-3093 장기 해빈조사 기반 침식관리선.

10. 연안재해 감시 및 취약성 평가 (idx 54)
    - 기술: 지표 개발·타당성 검토, GIS 공간분석, 파랑·폭풍해일·조위 재현, GIS 평가 시스템.
    - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=재해예방&idx=54
    - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-54_54.html
    - 대표 자산: assets/company-library/images/73168c2e8c67707b_재해예방_연안재해_감시_및_취약성_평가_4_2_0.jpg
    - 자료 연결: business-1978 연안재해 위험성 평가, business-1969 연안침식 적응, research-3059 연안재해 요인 예측.

11. 재해·재난 예측 (idx 55)
    - 기술: 폭풍해일고·침수, 가상 태풍 시나리오, 빈도 지도, 개발 영향 검토, 폭풍해일 적응·지도, 파랑+해일+강우 복합침수와 다중재해 위험.
    - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=재해예방&idx=55
    - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-55_55.html
    - 대표 자산: assets/company-library/images/a1027f9ee36aac37_5__2_0.png
    - 자료 연결: research-3059, academic-3076 SCHISM+EurOtop 연안침수, business 재해예측 실적.

### 스마트 기술

12. 인공위성 영상 처리 및 분석 (idx 56)
    - 기술: 적조·녹조·갈조 모니터링·이동 모델, 초분광 알고리즘, 저수온·고수온·불법투기·산불·화산 모니터링, 불법 선박 탐지, 해색 보정(Chl-a·TSM·CDOM·복사계), 연안 DSM, 다중위성 SST.
    - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=스마트%20기술&idx=56
    - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-56_56.html
    - 대표 자산: assets/company-library/images/d745a172533fb70d_4_2_0.jpg
    - 자료 연결: business-1970 위성 분석, platform Satellite AI, 위성·AI research·academic 자료.

13. 탄성파탐사 자료처리 자동화 기술 (idx 57)
    - 기술: 주파수 필터링, 이득 보정, 디컨볼루션, 중합, 마이그레이션, 역산, 자체 자동화, 고해상도 수치탐사, 속성·층서·기반암 단층·이상대 해석.
    - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=스마트%20기술&idx=57
    - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-57_57.html
    - 대표 자산: assets/company-library/images/c874f0538e5babea_자동화로_처리된_가공자료_main_2.png
    - 자료 연결: 해저·지질 조사 실적과 academic 자료. 직접 연결 ID는 추가 확인.

14. CCTV 영상 처리 및 분석 (idx 58)
    - 기술: 영상 시스템 설계·구축, 평균·분산 영상, 영상 보정, 기준점 측량, 추출계수, 정사영상, 해빈 폭·해안선·면적 산출.
    - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=스마트%20기술&idx=58
    - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-58_58.html
    - 대표 자산: assets/company-library/images/36f62c402174fefa_해운대-이안류발생_CCTV영상분석및처리_re.gif
    - 자료 연결: CCTV·연안 관측 자료, platform Rip Current.

15. 영상기반 해양생물 탐지 (idx 59)
    - 기술: AI 실시간 생물 탐지·분류, 개체 크기·수량 속성화, 알림 시스템, RGBD 색 보정.
    - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=스마트%20기술&idx=59
    - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-59_59.html
    - 대표 자산: assets/company-library/images/b8b2e5bdf08b08df_동영상1-2.gif
    - 자료 연결: 생물·수산 AI 관련 business·research. 직접 연결 ID는 추가 확인.

16. 빅데이터 구축 (idx 60)
    - 기술: 구조화 분산 저장·처리, 디스크·메모리 기반 빅데이터, RDBMS 연계, 비정형 분산 처리, 실시간 스트림, ML 기반 실시간 해양자료 품질관리.
    - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=스마트%20기술&idx=60
    - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-60_60.html
    - 대표 자산: assets/company-library/images/dbc160139c60f07b_2_맞춤형_수산정보_서비스_시스템_개념도_2_0.png
    - 자료 연결: research-3057 준실시간 해양 격자자료 서비스, 수산정보·데이터 구축 실적.

17. 인공지능 활용기술 (idx 61)
    - 기술: DNN·RNN(LSTM) 시계열, ConvLSTM·PredRNN++ 2D 공간 예측, GAN-Resolution 초해상도, GAN-Inpainting 결측자료 복원.
    - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=스마트%20기술&idx=61
    - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-61_61.html
    - 대표 자산: assets/company-library/images/512135fa0db45104_ConvLST2D_6hr_UV-2.gif
    - 자료 연결: research-3059, research-3057, academic-3065 RTD-YOLO 부유쓰레기, platform Satellite AI·Flood XAI.

18. 해상풍력 디지털 입지정보도 구축 (idx 62)
    - 기술: 법정구역 정보 구축·분석, 고해상도 해양환경 정보, GICOMS·V-Pass, 해양·수산 빅데이터.
    - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=스마트%20기술&idx=62
    - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-62_62.html
    - 대표 자산: assets/company-library/images/0adbc217caaef8ec_스마트_기술_해상풍력_정보도_구축_1_2.png
    - 자료 연결: business-1972 해상풍력 디지털 입지정보도, 공간정보 자료.

19. 무인선 이용 관측 (idx 63)
    - 기술: USV 선체·추진·원격제어, GPS 경로, 정점 유지, 수질센서 윈치, 시나리오 제어, 무선 데이터, 수집·분석·표출 소프트웨어.
    - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=스마트%20기술&idx=63
    - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-63_63.html
    - 대표 자산: assets/company-library/images/5b7231f0c1f206ee_usvCom.png
    - 자료 연결: business-1967 하천 수량·수질 센서 모니터링, root USV 축, http://usv.co.kr.

20. 무인항공 사진측량 및 무인항공 LiDAR측량 (idx 64)
    - 기술: 3D 점군, 정사사진, DEM, 기본도 제작.
    - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=스마트%20기술&idx=64
    - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-64_64.html
    - 대표 자산: assets/company-library/images/43a75b2005a5c2c1_FireFly6_2_2.png
    - 자료 연결: business-1994·1993 연안침식 조사, business-1979 해양공간정보, Surveying 장비군.

21. 실시간 해양예측시스템 (idx 65)
    - 기술: 수위·해류·수온·염분·파랑·폭풍해일·확산 예측, 북서태평양·동북아·한반도·연안 시스템, SAR·재해 지원, 온배수, 시각화·검증, OpenMP/MPI, OI·EnOI·EnKF·LETKF 자료동화.
    - 공식 상세: https://www.geosr.com/sub/business/conserve_view.asp?s_cate=스마트%20기술&idx=65
    - 로컬 원문: research-docs/source-capture-20260916/fixed-content/html/solution-65_65.html
    - 대표 자산: assets/company-library/images/5ec3c2a5ef5b4399_04.스마트기술_10.실시간해양예측-2-2.gif
    - 자료 연결: business-1982 해양예측 분석, 예측·자료동화 research·academic, platform Flood 3D·Storm Surge·Sea Level·Environment.

### 원 사이트의 기술-실적 필터 관계

각 한국어 solution 상세 HTML에는 사업실적과 학술실적 버튼이 있고, 두 버튼 모두 같은 기술 ID를 s_addtext2 값으로 전달한다. 이는 단순히 제목을 보고 추정한 관계가 아니라 21개 로컬 상세 캡처에서 확인한 원래 탐색 규칙이다. 새 런타임은 이 관계를 solution ID로 보존하고, 실제 게시글의 본문·첨부가 비어 있으면 빈 결과를 사실처럼 채우지 않는다.

| 기술 ID | 사업실적 필터 | 학술실적 필터 |
|---:|---|---|
| 15 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=15 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=15 |
| 46 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=46 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=46 |
| 47 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=47 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=47 |
| 48 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=48 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=48 |
| 84 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=84 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=84 |
| 50 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=50 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=50 |
| 51 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=51 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=51 |
| 52 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=52 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=52 |
| 53 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=53 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=53 |
| 54 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=54 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=54 |
| 55 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=55 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=55 |
| 56 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=56 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=56 |
| 57 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=57 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=57 |
| 58 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=58 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=58 |
| 59 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=59 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=59 |
| 60 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=60 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=60 |
| 61 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=61 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=61 |
| 62 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=62 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=62 |
| 63 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=63 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=63 |
| 64 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=64 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=64 |
| 65 | https://www.geosr.com/sub/achieve/busines.asp?s_addtext2=65 | https://www.geosr.com/sub/achieve/academic.asp?s_addtext2=65 |

로컬 증거 파일은 research-docs/source-capture-20260916/fixed-content/html/solution-15_15.html부터 solution-65_65.html까지의 21개 파일이다. 원 사이트의 실제 필터 결과를 다시 수집할 때는 각 URL을 기준으로 목록·상세·첨부를 결합하고, 결과가 0건이어도 기술 관계 자체는 유지한다.

## 장비·현장 역량

현재 활성 고정 데이터 기준 5개군, 80개 항목이다. 장비 상세는 제조사·모델·용도·이미지·첨부를 확인한 뒤 같은 현장 문제의 사업 실적과 연결한다. 장비를 기술 카드와 같은 비중으로 반복 노출하지 않고, 현장 수행 가능성을 입증하는 근거 섹션으로 배치한다.

| 장비군 | 수량 | 공식 목록 | 대표 항목 |
|---|---:|---|---|
| Surveying 측량 | 44 | https://www.geosr.com/sub/equipment/surveying.asp | G-882TVG 2966, UHR 48ch Geo-Sense 2965, Sonic 2024V 멀티빔 2963, BlueROV2 1937, GNSS GS10 1935, Side Scan Sonar, SVP, LiDAR, UAV |
| Investigation 조사 | 21 | https://www.geosr.com/sub/equipment/investigation.asp | Geneinno T1 1264, WHS·Signature·Aquadopp 유속계, AWAC 파랑계, 압력식 조위계, CTD, YODA, LISST-200X, VMP 250 |
| Biological 생물 | 2 | https://www.geosr.com/sub/equipment/biological.asp | 방형구 1185, Grab 1184 |
| Experiment 실험 | 10 | https://www.geosr.com/sub/equipment/experiment.asp | IMAGING-PAM 1182, BX53 1181, mesocosm 1177, ICP-MS 1176, SeaFAST 1174, GC-MSD 1172, 영양염 분석기 834, TOC 832, Mastersizer 831 |
| Ship 선박 | 3 | https://www.geosr.com/sub/equipment/ship.asp | 해누리 1938, 뉴명랑 1369, Challenger 1368 |

대표 장비 상세 URL:

- BlueROV2: https://www.geosr.com/sub/equipment/surveying.asp?mode=view&bid=18&s_type=&s_keyword=&s_cate=&s_addtext2=&idx=1937&page=1
- 조사 장비 대표 항목: https://www.geosr.com/sub/equipment/investigation.asp?mode=view&bid=13&s_type=&s_keyword=&s_cate=&s_addtext2=&idx=1241&page=1
- 방형구: https://www.geosr.com/sub/equipment/biological.asp?mode=view&bid=20&s_type=&s_keyword=&s_cate=&s_addtext2=&idx=1185&page=1
- ICP-MS: https://www.geosr.com/sub/equipment/experiment.asp?mode=view&bid=14&s_type=&s_keyword=&s_cate=&s_addtext2=&idx=1176&page=1
- 해누리: https://www.geosr.com/sub/equipment/ship.asp?mode=view&bid=21&s_type=&s_keyword=&s_cate=&s_addtext2=&idx=1938&page=1

## 실적·연구·게시판 연계

로컬 board-data.json의 읽기 전용 캡처에는 총 1,105건과 첨부 자산 90개가 있다. 새 IA에서는 게시판을 날짜순 아카이브로만 보여주지 않고 기술 분야·지역·발주기관·수행연도·자료 유형을 필터로 제공한다. 각 기술 상세에 관련 실적·논문·보도·첨부를 역으로 연결한다.

| 보드 | 건수 | 공식 목록 | 로컬 용도 |
|---|---:|---|---|
| 사업실적 business | 406 | https://www.geosr.com/sub/achieve/busines.asp | archive.html?board=business; 고객·연도·기술별 대표 실적 |
| 연구성과 research | 82 | https://www.geosr.com/sub/achieve/research.asp | archive.html?board=research; 연구과제·기술개발 |
| 학술자료 academic | 231 | https://www.geosr.com/sub/achieve/academic.asp | archive.html?board=academic; 논문·학술 발표 |
| 공지 notice | 333 | https://www.geosr.com/sub/news/notice.asp | archive.html?board=notice; 인증·수상·채용·운영 공지 |
| 보도자료 press | 51 | https://www.geosr.com/sub/news/press.asp | archive.html?board=press; 외부 보도·이미지 |
| 뉴스레터 newsletter | 2 | https://www.geosr.com/sub/news/letter.asp | 현재 GNB 노출 여부 확인 필요; 뉴스레터·PDF |

### 대표 사업 실적

- business-1994: 연안침식 정밀조사 용역, 2024-12-09, 해양수산부. 공식 상세: https://www.geosr.com/sub/achieve/busines.asp?mode=view&bid=15&s_type=&s_keyword=&s_cate=&s_addtext2=&idx=1994&page=1
- business-1993: 2024 경북 연안침식 실태조사.
- business-1992: 침몰선박 관련 조사.
- business-1978: 2024 연안재해 위험성 평가.
- business-1969: 연안침식 적응·관리 관련 사업.
- business-1987: 낙동강 하구 기수생태계 복원 모니터링.
- business-1981: 무인도서 해양쓰레기.
- business-1984: 2024 연안 생태계 조사.
- business-1967: 하천 수량·수질 센서 모니터링.
- business-1979: 해양공간정보 구축.
- business-1970: 위성영상 분석.
- business-1636: 항만 수로측량.
- business-1618: 해저면 변화 모니터링.
- business-1975: 해양관측 분석.
- business-1973: 해양·기상 장비 유지관리.
- business-1972: 해상풍력 디지털 입지정보도.
- business-1982: 해양예측 분석.

위 항목은 board-data.json에서 제목·ID·목록 위치를 확인했다. 상세 ID가 없는 항목은 제목과 연결 방향은 확인했지만, 공개 상세 본문·첨부의 재사용 범위는 추가 확인 대상이다.

### 대표 연구·학술 성과

- research-3059: 한국 연안재해 요인 예측, 발주처 KIMST.
- research-3057: 준실시간 해양 격자자료 서비스, 발주처 KIMST.
- research-3056: 초음파·광학 기반 하천 부유사 자동 측정, 발주처 KEITI.
- research-3055: 하천 수량·수질 센서 모니터링, 발주처 KEITI.
- research-3052: 해상풍력 디지털 입지정보도, 발주처 KETEP.
- academic-3093: 장기 해빈조사 기반 침식관리선.
- academic-3087: 대체연료 선박 사고 뒤 부유 잔해 이동·잔류.
- academic-3086: 북서태평양 확률론적 유류오염 위험.
- academic-3085: OpenDrift 해상 수색·구조 궤적.
- academic-3080: CCTV 해빈 폭과 파랑 처오름.
- academic-3076: SCHISM+EurOtop 연안침수.
- academic-3065: RTD-YOLO 부유쓰레기 모니터링.

연구·학술 상세의 DOI, 원문 PDF, 저작권·외부 링크는 각 레코드의 첨부·링크 필드를 확인한 뒤 노출한다. 제목만으로 성과 수치나 국가사업 성과를 추가하지 않는다.

### 공지·보도·첨부

- notice-3091: 해양수산 신기술 인증 공고. 첨부: assets/board-library/a8f9619b64c1_(해양수산부_공고_제2026-1227호)_해양수산신기술_인증기술_및_신기술_적용제품·시설_확인_공고.pdf
- notice-3069: 장관 표창. 이미지: assets/board-library/f9916dab4b51_102814_247364434.jpg
- notice-2980: KOEM 표창. 이미지: assets/board-library/e2312e652114_mailplug-inline.png
- notice-1692: Q&A로 배우는 알기 쉬운 해양역학. 첨부: assets/board-library/672f9802ff61_승영호_Q&A로_배우는_알기쉬운_해양역학_1판(비매품,_PDF출판_GeoSR).pdf
- press-1440: ICT 기반 양식 관련 보도 이미지.
- press-1437, press-1435: KOICA·MBC 관련 보도 이미지.
- newsletter 1542, 1539: PDF와 이미지.

게시글 상세는 제목·일자·분류·발주처 또는 매체·본문·첨부 목록·원문 링크·관련 기술·관련 실적을 같은 구조로 사용한다. 첨부가 없는 글에는 빈 다운로드 영역을 만들지 않는다.

## 플랫폼·실제 화면 자산

로컬 V2의 portal/design-v2-20260916/platform-data.js에는 Flood 3D, Satellite AI, Storm Surge, Sea Level, Rip Current, Ocean Buoy, Environment, News AI, Flood XAI 등 9개 항목이 있다. 확인된 화면 캡처:

- assets/screenshots-20260907/flood3d.png
- assets/screenshots-20260907/surge.png
- assets/screenshots-20260907/satellite.png
- assets/screenshots-20260907/buoy.png
- assets/screenshots-20260907/geo-dap.png

플랫폼 페이지의 FEATURE FILM은 currently planned/no video로 표시되어 있다. 영상 제작 전까지 운영 중인 영상이나 기술 증거처럼 표현하지 않는다. 화면 캡처는 기술·실적·플랫폼 설명 옆에 크게 배치하되, 캡처만으로 고객·운영 범위를 추정하지 않는다. GeoDAP는 https://www.geo-dap.com/ 외부 링크의 연결 상태와 서비스 범위를 배포 전 재확인한다.

## 권장 새 IA

한국어 기본 정보 구조는 고객이 업무를 찾는 순서로 설계한다.

1. 홈: 고객 문제와 제공 가치인 관측·분석·예측·현장 실행을 한 문장으로 제시하고 실제 화면·현장 자산·대표 실적을 이어 붙인다.
2. 사업분야: 수환경 보전 / 수환경 건강성 회복 / 재해예방 / 스마트 기술을 4개 허브로 두고 21개 세부 기술을 문제·산출물·근거 실적과 함께 탐색한다. USV와 전자해도는 별도 제품·플랫폼 축으로 유지한다.
3. 연구·성과: 연구과제, 학술자료, 사업실적을 통합 검색하되 보드 원문은 유지한다. 기술 상세에서 관련 성과로 진입하고 성과 상세에서 사용 기술로 돌아온다.
4. 관측·장비: 5개 활성 장비군을 현장 업무별로 필터링하고 대표 장비와 조사·실험·선박 역량을 확인한다.
5. 플랫폼: 실제 운영 화면이 확인된 플랫폼만 화면 중심으로 제시하고 외부 USV·전자해도·GeoDAP 링크를 분리한다.
6. 회사: 회사 개요, 조직·거점, 인증·면허·지식재산, 회사소개서, 채용·문의.
7. 소식: 공지·보도·뉴스레터를 별도 보드로 유지하되 기술·실적 태그를 연결한다.

전면 개편에서도 기존 business.html, research.html, directory.html, archive.html, company.html, careers.html, contact.html, platforms.html의 진입점을 유지한다. 홈과 허브의 탐색만 재구성하고, 새 상세 화면은 같은 정적 라우트 패턴으로 추가한다.

## 한글·영문 운영 원칙

- 기본 언어는 한국어다. 메뉴, 버튼, 필터, 기술 허브, 게시판 분류, 페이지 제목, meta description을 모두 한국어로 먼저 완성한다.
- 영어 전환은 동일 정보 구조와 동일 레코드 ID를 사용한다. 길이가 늘어나는 기술명·게시판 제목을 고려해 버튼 폭·카드 높이·표 머리글이 늘어나도 깨지지 않게 한다.
- data-ko와 data-en이 이미 있는 항목은 그 값을 사용한다. 영어 값이 없는 한국어 원문을 기계 번역해 공식 영문 성과처럼 표시하지 않고 승인된 번역 또는 한국어 원문 병기를 둔다.
- 국문·영문 회사소개서는 언어별 파일로 연결한다. 게시글 첨부는 원문 언어와 파일명을 그대로 표시한다.
- 페이지 title·description·og 메타·언어 속성·canonical은 언어 전환 시 함께 갱신한다. 상세 URL은 레코드 ID를 유지하고 누락 번역은 제목 옆에 원문 언어를 명시한다.
- 키보드 포커스, 건너뛰기 링크, 명확한 현 위치, prefers-reduced-motion, 모바일 세로 화면에서 동일하게 동작하는지 국문·영문 각각 확인한다.

## 미확인·다음 확인

- 현재 홈페이지의 최신 변경일과 각 사업·장비·게시글의 공개 권한.
- 인증·면허·수상·발주처의 현재 유효성 및 로고 사용 승인.
- 21개 기술 각각에 연결되는 사업실적·연구·학술의 완전한 양방향 ID 관계.
- 영어 상세 본문이 공식 승인 번역인지 여부.
- 플랫폼 캡처가 현재 운영 화면인지 소개용 과거 화면인지.
- All4Land와 BNT의 최신 메뉴·모바일·게시판 구조는 별도 비교 문서에서 확인한다.
