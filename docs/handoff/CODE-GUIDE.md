# 코드와 자료 유지보수

## 실행 구조

`dist/*.html`은 공통 코드와 페이지별 CSS·JavaScript를 순서대로 불러온다
`site.js`가 주소와 언어를 읽어 공통 헤더·푸터와 해당 페이지 함수를 배치한다
`corporate-navigation.js`는 메뉴 및 모바일 펼침을 제어한다
`home.js`와 `home-motion.js`는 메인 구성과 슬라이드 및 스크롤 연출을 담당한다
페이지별 코드와 공통 스타일의 로딩 순서를 임의로 바꾸지 않는다

## AX와 GeoDAP

`ax-v2.js`에는 현재 사용 중인 9개 플랫폼의 설명 데이터만 둔다
`ax-embedded-gallery.js`가 AX 페이지 구조를 제공하고 `ax-source-gallery.js`가 곡면 갤러리 및 필터·선택·확대 창을 제어한다
8개 공개 캡처의 주소는 서비스 ID를 사용해 `assets/ax-embedded/<id>.webp`로 조합한다
9번째 개발 중 서비스에는 캡처를 지어내지 않는다
이관 출처는 [AX 검토 기록](../redesign-next/11-AX-EMBED-REVIEW.md)에 있다
GeoDAP의 대표 전체 화면과 외부 서비스 주소는 메인에 별도로 둔다

## 원문과 번역

| 파일 | 역할 |
| --- | --- |
| `source-archive.json` | 게시물과 회사 정보의 원문 및 원사이트 ID·URL·hash |
| `source-media.json` | 로컬 이관 이미지와 첨부파일의 대응 및 상태 |
| `source-record-locales.json` | 언어별 원문 대응 |
| `source-translations*.json` | 원문 hash에 연결된 번역 |
| `company-translations.en.json` | 회사 정보 번역 |
| `technology-translations.en.json` | 기술 데이터 재구축용 영문 검토 입력 |
| `business-details-data.js` | 21개 기술의 한영 설명 |
| `technology-media.js` | 기술별 대표 장면과 원문 그림 및 캡션 |
| `technology-relations.json` | 원사이트의 명시적 기술별 실적 연결 |
| `business-areas.js` | 메인과 메뉴 및 사업 화면이 공유하는 8개 기술 분류 |
| `credentials-index.json` | 인증·등록·지식재산권 분류와 보호 상태 |

원문을 편집용 번역으로 덮어쓰지 않는다 같은 제목의 연차 과제와 언어별 레코드를 임의로 합치지 않는다
이미지와 첨부파일은 `assets/source-records/`에서 보존하며 제목이나 문서 나이를 기준으로 삭제하지 않는다
인증 이미지의 보호 동작은 현재 상태를 유지한다

## 미디어 재생

`film-manifest.json`은 현재 슬롯과 연결 파일 및 제작 상태를 정의한다
`film-player.js`는 승인 조건과 로컬 파일 연결 및 버튼·모션 감소·가시성·오류 대체를 제어한다
`delivery`는 미래 납품 경로일 수 있으며 현재 요청되는 `src`와 구분한다
정지 선택 기록과 영상 합격 및 실제 데이터의 정확성을 별개로 다룬다
현재 생성 프롬프트와 구간표 및 원본 위치는 [미디어 인계](../media/CURRENT-MEDIA.md)를 따른다

## 유지보수 도구

자동 재구축은 현재 파일을 덮어쓸 수 있으므로 콘텐츠 수정이 필요한 작업에서만 사용한다
실행 전 Git 상태를 확인하고 생성 차이를 검토한다

| 도구 | 입력과 목적 |
| --- | --- |
| `build_business_details.mjs` | 원문과 기술 번역에서 21개 기술 데이터 구축 |
| `build_technology_media.py` | 회사 이미지 대응 자료와 현재 이미지 출처를 이용해 기술 미디어 구축 |
| `build_business_areas.py` | 기술 미디어와 현재 이미지 출처에서 공유 분류 구축 |
| `build_technology_relations.py --capture <pages.jsonl>` | 별도 보관 수집 원문의 명시적 링크에서 기술별 실적 대응 구축 |
| `sync_page_metadata.mjs` | 공통 메타데이터를 HTML에 반영 |
| `verify_repository_package.py` | 저장소 허용 범위와 웹 기준 해시 및 에셋·문서 참조 확인 |
| `verify_redesign_routes.mjs` | 실행 중인 미리보기의 한영 경로 및 로컬 참조 확인 |
| `verify_metadata_accessibility.mjs` | 메타데이터와 접근성 관련 정적 계약 확인 |
| `verify_film_lifecycle.mjs` | 모션 감소·가시성·재생 조작·오류 대체 확인 |
| `verify_public_archive.py --capture <pages.jsonl>` | 원문 2024건과 수집 원문 충실성 대조 |
| `verify_news_translations.py` | 공지·보도 번역의 완전성과 원문 hash 및 날짜·URL 보존 확인 |

Python 3와 Node.js가 필요하다 이미지 데이터 재구축에는 Pillow를 사용한다
웹을 실행하는 데 Pillow와 원본 보관소 또는 생성 서비스 계정은 필요하지 않다
폰트의 OFL 라이선스와 원문 출처를 보존한다
검수 파일은 `tmp/`에 출력하고 필요한 최종 설명만 문서에 반영한다
