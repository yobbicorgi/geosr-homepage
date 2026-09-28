# GeoSR 홈페이지 작업 시작점

2026-09-28 기준. 개발 저장소는 `C:\Users\user\Documents\Codex\Projects\geosr-homepage`이고 `C:\Users\user\Downloads\GeoSR_Homepage`는 같은 위치를 가리키는 junction입니다. 사용자 지시와 루트 `AGENTS.md`가 우선합니다.

## 현재 화면

메인은 [정보 구조 결정과 검수](13-HOME-REBUILD-20260928.md)에 따라 대표 기술과 플랫폼 및 회사 개요와 소식을 소개합니다 Selected Work와 인증 목록은 메인에서 제거했습니다. 연구개발 719건, 소식 384건, 장비 80건, 인증·등록·지식재산권 명칭 127개는 각각 해당 페이지에서 검색합니다. 사업 분야에는 21개 기술의 국·영문 상세가 있습니다.

AX 소개는 [직원 저장소의 AX 부분만 삽입](11-AX-EMBED-REVIEW.md)했습니다. GeoDAP은 별도 사이트이며 공개 메인 캡처를 메인에 사용합니다. 회사 소개 콘텐츠는 이 저장소가 관리합니다.

## 영상과 미디어

[회사 업무·연구·논문 근거 원장](16-COMPANY-FILM-EVIDENCE-20260928.md)과 [13컷 60초·24초 루프 콘티](14-1080P-FILM-STORYBOARD-20260928.md)가 현재 제작 기준입니다. [Higgsfield 제작·검수 절차](10-HIGGSFIELD-PRODUCTION.md)에 따라 원본과 시안이 준비된 컷만 생성합니다. 사용자가 Plus를 결제했고 확인 잔액은 1210크레딧이었지만 이 패키지에서는 아직 유료 영상을 제출하지 않았습니다. 회사·AX 본편과 Higgsfield 요소별 영상은 아직 없습니다 메인 수치모델 설명에는 NASA SVS 해양 순환 시각화의 24초 1080p 발췌를 연결했습니다. 현재 첫 화면의 회사소개서 연안 사진은 영상 전 임시 정지 포스터이며 장소·촬영일이 확인된 본편 원본은 아닙니다.

## 파일 책임

| 위치 | 역할 |
| :--- | :--- |
| `dist/index.html`, `home.js`, `home.css`, `home-motion.js` | 메인 구성과 반응형 스타일 |
| `dist/site.js`, `business-detail.*`, `business-details-data.js` | 공통 탐색과 사업 분야 기술 상세 |
| `dist/ax-source-gallery.js`, `ax-embedded-gallery.*` | 로컬에 삽입한 AX 소개 |
| `dist/source-archive.*`, `credentials-index.*`, `company-history.*` | 공개 기록과 회사 정보 검색 |
| `dist/film-manifest.json` | 검수된 영상만 연결하는 상태 계약 |
| `docs/screenshots/` | QHD·모바일 페이지 캡처 |
| `media-source/` | 제공·수집 원본 보관. 사이트 실행 자산과 구분 |

## 읽는 순서

1. [메인 정보 구조와 검수](13-HOME-REBUILD-20260928.md)와 [24개 디자인 레퍼런스 비교](17-DESIGN-REFERENCES-20260928.md)
2. [AX 삽입 범위](11-AX-EMBED-REVIEW.md), [공개 자료 이관 점검](12-HOME-ARCHIVE-QA-20260928.md)
3. [회사 영상의 실제 근거](16-COMPANY-FILM-EVIDENCE-20260928.md), [컷별 콘티](14-1080P-FILM-STORYBOARD-20260928.md), [제작 게이트](10-HIGGSFIELD-PRODUCTION.md)
4. 필요할 때 `docs/redesign-plan/`과 `docs/redesign-production/`의 과거 설계·검수 기록

과거 문서의 완료 표기는 현재 디자인 승인이나 영상 합격으로 사용하지 않습니다.
