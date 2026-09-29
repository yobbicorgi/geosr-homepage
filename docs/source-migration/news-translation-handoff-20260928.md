# 뉴스 영문 번역 인계

## 결과

- `dist/source-translations-news.en.json`에 국문 공지 333건과 보도 51건 전체의 제목 및 본문 영문 overlay를 저장
- 원문 총 261745자와 번역 694424자
- 국문 record ID를 그대로 키로 사용하며 원본 `sourceTextSha256`에 연결
- 원문 2024건은 수정하지 않음 이미지 및 첨부는 기존 canonical record 매핑을 사용
- 공유 UI 및 renderer는 메인 에이전트 소유이며 이번 번역 단계에서 수정하지 않음

## 제작과 검수 방법

공개 원문만 Google 공개 번역 endpoint로 초벌 번역한 뒤 직접 교정한 별도 파일이다 전문 번역 감수나 모든 문장의 수작업 검증이 완료됐다는 의미는 아니다

- 101건은 국문 전체를 대조한 직접 번역 및 교정 — 23개 이재학 고문 개인 칼럼 안내와 40개 개인 수상 소식 및 주요 기술 기사 등
- 7건은 주요 사실과 특정 용어를 대조해 교정
- 추가 22건 제목을 원문 대조하여 교정
- 64건은 국립해양조사원과 한국해양연구원을 혼동하지 않도록 기관명을 대조
- 나머지 276건은 기계 초벌 기반이며 일부 제목과 기관명 교정 및 전체 구조 검사를 적용한 상태

개인 수상을 회사 인증으로 바꾸지 않았으며 타 기관 사업 및 개인 칼럼을 GeoSR 수행 실적으로 옮기지 않는다 과거 기사에 실린 인원 매출 평가와 기업 소개는 해당 날짜의 원문 기록으로만 취급한다

주요 직접 교정 사례는 조류 관측과 새 관찰 혼동 파랑과 blue 혼동 대통령 포장과 packaging 혼동 전임 직급과 former 혼동 해양조사원과 해양연구원 혼동 TBM 기준점과 점수 혼동 열배수와 방사성 폐수 혼동이다 기존 본문의 원문 수치 및 역사적 주장은 임의로 현재 정보로 갱신하지 않았다

## 검증

`python -X utf8 scripts/verify_news_translations.py`

- 384/384건 존재 및 추가 잘못된 ID 없음
- canonical 원문 hash 필드 일치
- 등록일 그대로 보존
- 명시된 원문 HTTP URL과 이메일 보존
- 한글 잔존 0건 및 URL placeholder 0건
- 연도 숫자 보존 검사 통과
- 오류 0건

`python -X utf8 scripts/verify_public_archive.py`

- 원문 2024건 KO 1215 EN 809 보존 검사 통과

기존 원문 hash는 수집 당시 원문에 대한 값이다 footer 등 정규화된 display text를 새로 hash한 값과 혼동하지 않는다 일부 원문 URL 뒤의 한국어 조사와 닫는 괄호는 URL에 포함하지 않는다 원문에서 공백으로 나뉜 `http://www. korea.net` 및 `http://www. nori.go.kr`는 번역에 각각 정상 주소로 연결했다

## 남은 품질 경계

- 모든 384건의 문장별 전문 감수 완료는 아님 긴 과거 언론기사의 수사 표현 및 세부 숫자 단위 변환은 추가 편집 검토 여지가 있음
- `numbersAbsentFromTranslation`은 단순 숫자 토큰 차이 진단값으로 영어 월 이름과 숫자 단어 및 억/만의 단위 변환 때문에 정상 번역도 다수 포함함 이를 숫자 오류 건수로 해석하지 않음
- 외부 원문 링크의 현재 생존 여부나 링크된 신문 기사 전문은 이번 영문 파일 검증 범위가 아님
- 새 번역을 재생성할 때 직접 교정을 잃지 않도록 `review_news_translations.py`를 적용하고 검증 스크립트를 다시 실행

## 파일

- 번역: `dist/source-translations-news.en.json`
- 초벌 생성: `scripts/translate_news_archive.py`
- 직접 교정: `scripts/review_news_translations.py`
- 검증: `scripts/verify_news_translations.py`
- 글별 제작·교정 상태: `docs/source-migration/news-translation-review-20260928.json`
- 최종 구조 검증: `docs/source-migration/news-translation-verification-20260928.json`

## 기관 영문명 확인 근거

- [한국수자원학회](https://www.kwra.or.kr/)
- [대한상하수도학회 정관](https://www.ksww.or.kr/html/regulation.asp)
- [한국원생생물학회 정관](https://kosp.kr/about/rule.php)
- [한국해양환경에너지학회](https://kosmee.or.kr/homepage/boardMedia/191235)
- [한국연안방재학회 학술지](https://www.jcdp.or.kr/upload/pdf/10557975.pdf)
