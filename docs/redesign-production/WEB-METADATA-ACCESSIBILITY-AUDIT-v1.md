# 웹 메타데이터·접근성 점검 v1

점검 기준: 현재 로컬 `dist`를 127.0.0.1:18103에서 제공하고 Chrome 브라우저 1440×900에서 KO/EN을 확인했습니다. 기준일은 2026-09-20입니다. 본 문서는 현재 구현 상태를 기록하며 운영 도메인이나 배포 상태를 가정하지 않습니다.

## 경로별 메타데이터

| 경로 | KO/EN 결과 | 내용 확인 |
| --- | --- | --- |
| `index.html` | PASS | 지구 데이터 인텔리전스 / Geo Data Intelligence |
| `business.html` | PASS | 기술과 솔루션 / Expertise |
| `research.html` | PASS | 연구개발 및 주요 수행실적 / Research and projects |
| `ax-platform.html` | PASS | AX Platform |
| `company.html` | PASS | GeoSR 소개 / About GeoSR |
| `news.html` | PASS | GeoSR 소식 / GeoSR News |
| `equipment.html` | PASS | 관측·분석 장비 및 조사선 / Survey and analysis equipment |
| `contact.html` | PASS | 사업 및 기술 문의 / Business and technical enquiries |

16개 KO/EN 페이지 응답에서 `<html lang>`, 문서 제목, 설명, Open Graph 제목·설명·유형·locale, Twitter 카드·제목·설명을 확인했습니다. 각 페이지의 런타임 제목과 OG/Twitter 제목이 일치하고, 언어 버튼은 현재 언어와 반대 언어로 전환하도록 안내합니다. 사업 상세, 연구·소식 상세와 장비 분류는 각 상세 항목이나 필터에 맞는 메타데이터로 갱신됩니다.

공용 renderer는 기존 공식 도메인 `https://www.geosr.com`을 기준으로 현재 경로와 언어를 반영해 canonical과 `og:url`을 런타임에 설정합니다. 배포 시 이 도메인에서 각 경로와 KO/EN URL이 올바른 문서를 여는지 확인해야 합니다. 안전한 crop과 공개 권리를 확인한 공유 자산은 없어 `og:image`와 `twitter:image`는 생략했습니다. 포스터는 16:9 미디어 슬롯용이므로 소셜 미리보기 이미지로 임의 지정하지 않습니다. HTML 정적 초기값은 KO이며 공용 JavaScript가 URL 언어에 맞춰 EN 메타데이터로 갱신합니다.

## 접근성 확인

- 8개 경로 모두 화면 제목 하나와 `main#main`을 갖고, 건너뛰기 링크는 본문으로 이동합니다. `main`은 건너뛰기 링크에서 포커스를 받을 수 있습니다.
- 1440×900에서 첫 Tab 포커스는 skip link에 도달했고, `:focus-visible`과 3px 외곽선이 확인됐습니다.
- 공용 메뉴에는 navigation label, `aria-controls`, 확장 상태와 Escape 닫기가 있습니다. 언어 전환 버튼의 KO/EN 안내 문구가 맞습니다.
- 홈 credential 선택과 AX 제품 시퀀스는 `tablist`/`tab`/`tabpanel`, `aria-selected`, roving tabindex를 사용합니다. ArrowRight로 다음 탭이 선택되고 패널 연결이 갱신되는 것을 확인했습니다. 회사 문서 분류는 별도 토글 그룹으로 `aria-pressed`를 유지합니다.
- 공용 `:focus-visible` 스타일과 `prefers-reduced-motion` 예외를 확인했습니다. 브라우저의 reduced-motion 설정에서 smooth scroll이 `auto`, 모션 지속시간이 최소값으로 바뀌며 AX도 reduced-motion 분기를 사용합니다.
- KO/EN 공통 네비게이션과 본문 구조에서 1개씩의 H1, main/header/navigation landmark를 확인했습니다. 브라우저 콘솔 오류는 없었습니다.

## 변경·재현

- 동적 메타데이터와 공용 건너뛰기/언어/메뉴 동작: `dist/site.js`
- KO 기본 head 메타데이터: `dist/index.html`, `dist/business.html`, `dist/research.html`, `dist/ax-platform.html`, `dist/company.html`, `dist/news.html`, `dist/equipment.html`, `dist/contact.html`, `dist/platforms.html`
- focus-visible/reduced-motion 규칙: `dist/design.css`
- 홈 문서 탭의 ARIA와 키보드 동작: `dist/home.js`, `dist/interactions.js`
- 자동 검사: `scripts/verify_metadata_accessibility.mjs`

로컬 preview를 제공한 상태에서 아래 검사가 통과했습니다.

```powershell
$env:REDESIGN_PREVIEW_URL='http://127.0.0.1:18103/'
node scripts/verify_metadata_accessibility.mjs
node scripts/verify_redesign_routes.mjs
git diff --check
```

메타데이터 검사는 KO/EN 16개 HTTP 응답, 8개 HTML 초기 head, 공유 KO/EN 설정, 언어·메뉴·탭·포커스·reduced-motion 구현 표식을 확인합니다. route 검사에서는 16개 KO/EN 응답과 35개 로컬 script/style/data/media 참조가 2xx였습니다. 브라우저 런타임 확인은 별도로 1440×900에서 수행했습니다.
