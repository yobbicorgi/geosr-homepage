# 실제 미디어 후보 v1

검토일: 2026-09-20

## 결과

`docs/source-migration/inventory.json` 스냅샷에는 8,239개 source page, 513개 asset reference, 허용 다운로드 32개, robots 차단 471개가 기록되어 있다. 32개 로컬 자산에는 회사 브로셔와 소개·조직 이미지가 포함되지만, 현장·실험용 단독 사진은 브로셔에 삽입된 사진과 기존 GeoSR 무인선 이미지 아카이브에서만 확인했다. 이 조사에서는 외부 URL을 열거나 새 자산을 내려받지 않았다.

검수 연락처 시트에는 출처 페이지가 확인되는 사진 후보 6장을 넣었다. `USV20S.png`로 보존된 무인선 사진 1장(1771×1068)만 원본 해상도 기준 1280×720을 넘는다. 나머지 5장은 1280×720 미만이므로 소형 미디어 후보로만 본다. 브로셔 삽입 사진에는 개별 캡션이 없어 아래 표에는 인접 페이지 제목·본문을 출처 문맥으로 표시했다. 이는 촬영 장소·촬영자·장비 종류를 입증하지 않는다.

연락처 시트 경로: `C:\Users\user\AppData\Local\Temp\geosr-real-media-search\contact-sheet.png`

## 사진 후보

| 용도 | 출처 페이지 및 문맥 캡션 | 로컬 경로 | 크기 | 검수 메모 |
|---|---|---|---:|---|
| 홈 관측 흐름 / hero 후보 | [무인선 이용 관측](https://www.geosr.com/sub/business/conserve_view.asp?idx=63&s_cate=%EC%8A%A4%EB%A7%88%ED%8A%B8%20%EA%B8%B0%EC%88%A0) — 페이지 제목. 이미지 파일명 `USV20S.png`는 모델 증거가 아니며, 페이지가 특정 모델·사양을 사진과 연결하지 않음. | `docs/redesign-production/equipment-sources/originals/usv-usv20s-page-original.png` | 1771×1068 | 고해상도 후보. GeoSR 표시가 이미지에 보인다. 모델명 대신 페이지 제목을 사용하고, 게시 전 사용권을 확인할 것. |
| 홈 관측 흐름 / 소형 미디어 | [무인선 이용 관측](https://www.geosr.com/sub/business/conserve_view.asp?idx=63&s_cate=%EC%8A%A4%EB%A7%88%ED%8A%B8%20%EA%B8%B0%EC%88%A0) — 페이지 제목. 이미지 파일명 `usvCom.png`; 사진별 모델 연결은 없음. | `docs/redesign-production/equipment-sources/originals/usv-usvcom-page-original.png` | 1001×601 | 소형 미디어만. GeoSR 표시·문구가 보이며 모델명을 부여하지 말 것. |
| 홈 관측 흐름 / 소형 미디어 | [영문 브로셔 PDF p.9](https://www.geosr.com/file/GeoSR_brochure_eng_2506.pdf#page=9) — `Consulting for Sea Area Utilization and Marine Environmental Impact Assessment`; 인접 본문에 `Water and sediment sampling`. 사진 개별 캡션 없음. | `docs/source-migration/assets/GeoSR_brochure_eng_2506.pdf` (PDF p.9, 인쇄 p.17, 이미지 xref 1084) | 662×366 | 소형 미디어만. 장비 종류는 원문에서 확인되지 않아 이름을 붙이지 않음. |
| Business / 분석 역량 소형 미디어 | [영문 브로셔 PDF p.9](https://www.geosr.com/file/GeoSR_brochure_eng_2506.pdf#page=9) — 같은 제목 아래 본문에서 수질·퇴적물 분석 시설을 설명. 사진 개별 캡션·시설명 없음. | `docs/source-migration/assets/GeoSR_brochure_eng_2506.pdf` (PDF p.9, 인쇄 p.17, 이미지 xref 1076) | 750×366 | 소형 미디어만. 회사 실험실인지·촬영 시점인지는 페이지 문맥만으로 확정하지 않음. |
| 생태·수환경 Business media | [영문 브로셔 PDF p.10](https://www.geosr.com/file/GeoSR_brochure_eng_2506.pdf#page=10) — `Conservation and Monitoring of Ecosystems`. 사진 개별 캡션 없음. | `docs/source-migration/assets/GeoSR_brochure_eng_2506.pdf` (PDF p.10, 인쇄 p.19, 이미지 xref 1090) | 830×405 | 소형 미디어만. 수중 이미지로 보이나 장비 종류나 실제 조사 위치를 추정하지 않음. |
| 미세플라스틱 Business media | [영문 브로셔 PDF p.11](https://www.geosr.com/file/GeoSR_brochure_eng_2506.pdf#page=11) — `Marine Debris and Microplastics Solution`; 본문에 하천·호소 미세플라스틱 현장조사 언급. 사진 개별 캡션·조사지명 없음. | `docs/source-migration/assets/GeoSR_brochure_eng_2506.pdf` (PDF p.11, 인쇄 p.21, 이미지 xref 1107) | 829×460 | 소형 미디어만. 페이지 내용이 사진의 촬영 장소나 조사 건을 특정한다고 보지 않음. |

영문 브로셔는 [GeoSR 홈페이지](https://www.geosr.com/)의 `BROCHURE - ENG` 링크에서 제공되며, 로컬 원본은 `docs/source-migration/assets/GeoSR_brochure_eng_2506.pdf`이다. 표의 브로셔 이미지는 해당 회사 자료에 실린 후보이며, 원 촬영자·촬영일·개별 사진 사용권은 확인되지 않았다. 공개 게시 사실만으로 재사용 권한이 생기지 않으므로 게시 전에 GeoSR 확인이 필요하다.

## 제외 및 제한

- `dist/assets/generated/`의 관측·실험 concept와 `analysis-lab-v1.webp`는 생성 이미지이므로 실제 사진 후보에서 제외했다. `analysis-concept.png`는 장갑 낀 손이 보여 제외했다.
- `dist/assets/coastal-survey-source.png`는 1000×608이고 원 촬영지·촬영일·출처 URL이 기록되지 않아 회사 사진으로 연결하지 않았다. `dist/assets/usv-source.jpg`는 원출처 계보가 확인되지 않아 후보로 쓰지 않았다.
- `dist/assets/equipment-vessel.jpg`(440×251), `equipment-icp.png`(440×267), `equipment-rov.png`(440×267)는 공식 장비 페이지와 연결된 작은 카탈로그 이미지다. 각각 조사선·ICP-MS·수중 드론 카탈로그 카드에는 참고할 수 있지만, 현장·실험 사진이나 hero 대체 자료로 분류하지 않았다. 정확한 공식 페이지 및 권리 근거는 `docs/redesign-production/equipment-source-manifest.md`와 `docs/redesign-production/equipment-sources/manifest.json`에 있다.
- 채용 인물 사진과 조직도처럼 얼굴·개인정보가 포함될 수 있는 자료는 검토 후보에서 제외했다. 브로셔의 인물 포함 현장 사진도 연락처 시트에서 제외했다.
- source-migration 자산 인덱스의 관련 이미지 URL은 `not_fetched / robots_disallowed`로 기록되어 있다. 예: [무인선 이미지](https://www.geosr.com/upload/USV20S.png), [ICP-MS](https://www.geosr.com/upload/thumb/ICP-MS.png), [BlueROV](https://www.geosr.com/upload/thumb/BlueRov.png), [LiDAR](https://www.geosr.com/upload/thumb/03_LiDAR.jpg), [해누리호](https://www.geosr.com/upload/thumb/20240711_131757824.jpg). 이번 작업에서는 이 URL을 가져오지 않았고, 필요한 경우에만 기존 로컬 사본을 확인했다. 외부 이미지 참조 7건도 열지 않았다.

`docs/source-migration` 원문, 코드, `dist` 자산은 수정하지 않았다. 새로 만든 저장소 파일은 이 보고서뿐이다.
