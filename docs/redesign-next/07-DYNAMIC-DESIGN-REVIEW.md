# GeoSR 웹 구성과 동작 검토 — 2026-09-22

화면 리비전 `20260922-r15` / 작업 시작 커밋 `5f095c74e0167c04fd657fd4a5bf358cef28b0de`

검수 URL `http://127.0.0.1:18102/` / 내부 공유 `http://192.168.6.85:18102/`

정본은 `C:\Users\user\Documents\Codex\Projects\geosr-homepage`
다운로드의 `GeoSR_Homepage`는 같은 저장소를 가리키는 junction
공식 geosr.com 배포와 사용자 최종 디자인 승인을 뜻하는 기록이 아님

## 이번 변경

사용자가 지적한 큰 흰 여백과 단순 목록 및 모바일의 긴 나열을 실제 표현 구조에서 변경
밝은 바탕은 검색·자료 목록·문의에 사용하고 기술과 플랫폼 소개에는 대표 장면과 수행 정보를 결합

| 영역 | 현재 표현과 조작 |
| --- | --- |
| 홈 첫 화면 | 전체 화면 미디어와 Geo Data Intelligence 유지 |
| 홈 전문 분야 | 전폭 장면에 설명과4개 분야 선택을 겹침 / 장면과 설명을 함께 전환 |
| 홈 연구 사례 | 원문에 연결된 연구·사업·학술3개를 입체 스택으로 선택 / 앞면 유지 / 자동 넘김 없음 |
| 홈 플랫폼 | AX·GeoDAP 중 하나를 선택하는 남색 영역 / 대표 미디어와 기능 요약3개 및 각각의 CTA |
| 회사 전문 분야 |6개 분야 선택과 대표 장면 및 수행 정보를 동시에 표시 / 조사 대상·방법·활용을 분야별로 구분 |
| AX 실제 기능 |3분류·9서비스 탐색 / 실제16:9 화면과 기능 설명 / 원본 확대 대화상자 |
| 자격 자료 | 홈은3분류 문서 원근 갤러리 / 회사는 검색 가능한 전체 컬렉션 한 곳 |
| 연구·소식·장비·문의 | 자료를 찾고 읽는 목적에 맞춘 목록·사진 카탈로그·양식 유지 / 무의미한 자동 회전 없음 |

회사 전문 분야의 흰 아코디언과 이전의 밝은 플랫폼 배치는 최종안에서 제거
색만 변경한 것이 아니라 분야별 수행 정보와 플랫폼별 기능 설명을 보강하고 선택 상태에 맞춰 내용을 교체
GeoDAP 기능 설명은2026-09-22 [공개 홈페이지](https://www.geo-dap.com/)에서 확인한 자료 탐색·지도·OpenAPI·NetCDF·CSV를 근거로 작성
지도 탐색은 로그인으로 이어졌으며 운영 화면을 새로 캡처하거나 기능을 녹화하지 않음

## 모바일

- 첫 화면 뒤 주요 경로 바로가기 / 전문 분야는 가로 탐색과 선택한 장면 하나
- 연구 사례는 평면 카드 한 장과3개 분류 탭 / 데스크톱 원근 레이어와 이전·다음 버튼은 숨김
- 플랫폼은 분할 선택 버튼과16:9 미디어 / 한 서비스만 표시
- 회사 전문 분야는 네이티브 선택 메뉴 / 세부 연구 내용과 연혁은 펼침
- 홈 자격 갤러리는 기본 접힘 / 회사 문서는4개부터 더 보기 / 홈 소식은2건
- 검색·분류·전체 보기 경로를 유지하므로 축약된 정보에 다시 접근 가능

모바일을 단순한 데스크톱 축소판으로 처리하지 않음
터치 스와이프 코드가 연구 카드에 있으나 실제 휴대전화 터치 검수는 아직 하지 않음

## 시각 증거

모든 이미지는 실제 로컬 페이지를 렌더한 캡처
부분 캡처는 전체 캡처의 문서 좌표를 기준으로 잘랐으며 화면을 합성하거나 재설계 이미지로 대체하지 않음
스크린샷 가독성을 위해 모션 감소 상태를 기본으로 사용
QHD·UHD는 원본 크기의 WebP로 저장
이전 중간안과 중복 전체 캡처는 이번 작업에서 생성한 파일에 한해 정리

- [회사 전문 분야 FHD](qa/design-review-r15/company-atlas-fhd.png) / [QHD](qa/design-review-r15/company-atlas-qhd.webp) / [UHD](qa/design-review-r15/company-atlas-uhd.webp)
- [플랫폼 소개 FHD](qa/design-review-r15/platforms-fhd.png) / [QHD](qa/design-review-r15/platforms-qhd.webp) / [UHD](qa/design-review-r15/platforms-uhd.webp)
- [모바일 회사 전문 분야](qa/design-review-r15/company-mobile.png) / [모바일 플랫폼](qa/design-review-r15/platforms-mobile.png)
- [홈 전문 분야](qa/design-review-r15/expertise-fhd.png) / [연구 스택](qa/design-review-r15/research-deck-fhd.png) / [AX 실제 기능](qa/design-review-r15/ax-explorer-fhd.png)
- [홈 전체](qa/design-review-r15/home-fhd.webp) / [회사 전체](qa/design-review-r15/company-fhd.webp)
- [모바일 홈 전체](qa/design-review-r15/home-mobile.webp) / [모바일 회사 전체](qa/design-review-r15/company-mobile-full.webp)

회사·플랫폼의 FHD→QHD→UHD에서3열·2열 관계와 정렬 및 글자 크기의 상대 비중을 비교
회사 분야 높이는825 /1091 /1631 CSSpx이며 플랫폼 영역은974 /1297 /1942 CSSpx
홈 제목은88 /117.333 /176px이며 왼쪽 기준5% 유지
GeoDAP 이미지의 표시 비율은 약1.778이며 contain으로 전체 화면 보존
AX 콘셉트 배경의 cover와 실제 UI의16:9 전체 프레임은 구분

## 기능 검수

[렌더 조건 원장](qa/design-review-r15/render-matrix.json)은 다음50조건

| CSS viewport / DPR1 | 경로·언어 | 조건 수 |
| --- | --- | --- |
|1920×1080 | 홈·AX·회사·기술·연구·장비·소식·문의 × KO·EN |16 |
|2560×1440 /3840×2160 | 홈·AX·회사 × KO·EN |12 |
|390×844 |8개 주요 경로 × KO·EN |16 |
|768×1024 | 홈·AX·회사 × KO·EN |6 |

50조건에서 가로 넘침0 / h1 각1개 / 로딩이 완료된 이미지의 실패0 / 수집된 브라우저 콘솔 오류0
아직 요청되지 않은 lazy 이미지까지 전부 다운로드했다고 해석하지 않음

[선택 상태 원장](qa/design-review-r15/selected-states.json)은 회사6분야의 모바일·FHD·한영24조건과 플랫폼2개의4해상도·한영16조건을 별도로 기록
한 번에 하나의 패널만 표시되고 가로 넘침 없음
일부 첫 선택의 complete=false는 읽은 순간의 지연 로딩 상태이며 실패 판정이 아님

직접 조작으로 확인한 항목

- 전문 분야와 연구 카드의 방향키·Home·End 선택 / 비활성 연구 카드 inert
- 회사 분야 위·아래키와 초점 이동 / 모바일 네이티브 선택과 연구 내용 펼침
- 플랫폼 AX·GeoDAP 선택 / 숨긴 AX 영상 활성 상태 해제 / GeoDAP 전체 비율
- 회사 문서4→7 더 보기와 새 항목 초점 / 검색·분류 초기화 / ISO 문서 확대와 Escape 복귀
- 개인정보 검토 대상 면허2건의 이미지 src 미노출
- AX 실제 캡처 확대·Escape·초점 복귀 / 개발 중 항목 확대 비활성 / 실패 이미지 대체
- 모바일 메뉴 닫힘과 데스크톱 복귀 시 스크롤 복원 / 짧은 가로 화면 메뉴 스크롤
- 일반 모션과 모션 감소 상태 / 모바일 첫 분야 탭 잘림 수정
- 회사 사업장 안내의 밝은 배경 위 제목 대비 수정 / 최종 계산 글자색 #183448

실제 모바일 기기와 Safari는 미검수이며 FPS 측정은 수행하지 않음
새 의존성은 추가하지 않고 CSS perspective·transform 및 WAAPI 사용
자동 검사 결과와 시각적 판단은 별개이며 Refero나 MotionSites와 동급이라는 외부 판정을 주장하지 않음

최종 CLI 검사

- `verify_redesign_routes.mjs` — 한영16경로와52개 로컬 참조2xx 통과
- `verify_metadata_accessibility.mjs` — 한영16응답과8개 메타데이터·공통 접근성 계약 통과
- `verify_film_lifecycle.mjs` — 화면 밖 정지·모션 감소·명시적 재생·영역 교체·오류 대체 통과
- `verify_continuation_package.mjs` —18장면·회사60초·AX30초·9서비스·15영상 자리·84자산 hash 통과
- 변경한5개 JavaScript의 구문 검사와 `git diff --check` 통과

## 정리와 남은 제작

AGENTS.md에서 역할·위임 관련 지시를 제거하고 화면·콘텐츠·검수 기준만 유지
현재 호스트의 `C:\Users\user\.codex\AGENTS.md`가 없음을 확인했으며 오래된 백업을 현재 정책으로 사용하지 않음
README와 시작점 및 디자인·실행·인계 문서를 현재 구조에 맞춤
폐기한 흰 회사 아코디언의 JS 동작을 제거
기존 누적 CSS 전체 통합을 완료했다는 의미는 아님

회사60초·AX30초 본편은 여전히 미완성
이번 작업에서 새 영상 생성·유료 제작·새 운영 플랫폼 녹화는 하지 않음
연결된 기존 부분 영상과 실제 플랫폼 영상3개 및 검수된 정지 화면을 사용
생성 이미지의 시안 표시와 장면별 과학·지리·물리 검수 조건을 유지

다음 제작은 `production-plan.json`의18개 장면과9개 플랫폼 캡처 지시에서 이어감
CF06 센서 식별 / CF08 실제 지형 / CF12 모델 결과 또는 개념 경로 등 원본 대기 조건을 먼저 해결
현재 generationReady와 releaseReady는 false 유지
문의는 mailto 작성 방식이며 공식 도메인 배포는 별도 범위
