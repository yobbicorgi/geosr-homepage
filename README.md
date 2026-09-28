# GeoSR 홈페이지

GeoSR의 국·영문 정적 홈페이지입니다. 개발 기준 위치는 `C:\Users\user\Documents\Codex\Projects\geosr-homepage`이며 `C:\Users\user\Downloads\GeoSR_Homepage`는 같은 저장소의 junction입니다.

## 실행과 주요 경로

- 미리보기: `http://127.0.0.1:18102/` (`node preview-server.cjs`)
- 메인: `dist/index.html`, `dist/home.js`, `dist/home.css`, `dist/home-motion.js`
- 공통 탐색·내부 페이지: `dist/site.js`
- AX 소개: `dist/ax-platform.html`, `dist/ax-source-gallery.js`, `dist/ax-embedded-gallery.js`, `dist/ax-embedded-gallery.css`
- 기존 공개 글 자료실: `dist/source-archive.html`, `dist/source-archive.js`, `dist/source-archive.json`
- 영상 연결 상태: `dist/film-manifest.json`; 미제작 영상은 정지 이미지와 준비 상태로 표시

AX 소개는 [직원 제작 저장소](https://github.com/123choigem-tech/geosr-homepage-ax-platforms)의 AX 관련 화면과 자료를 로컬에 삽입했습니다. 회사 소개는 이 저장소에서 관리하며 GeoDAP은 별도 외부 서비스입니다.

## 문서

현재 작업 기준과 미완료 조건은 [시작 문서](docs/redesign-next/00-START-HERE.md)를 봅니다. 이번 메인 재구성과 정리 내역은 [메인 재구성 검수](docs/redesign-next/13-HOME-REBUILD-20260928.md)에 있습니다.

- [메인 영상 연출](docs/redesign-next/09-20260928-HOME-FILM-REVISION.md) · [Higgsfield 제작 카드와 차단 기록](docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md)
- [AX 삽입 출처와 범위](docs/redesign-next/11-AX-EMBED-REVIEW.md)
- `docs/source-migration/`: 기존 공개 사이트의 수집 원문과 출처
- `docs/redesign-plan/`, `docs/redesign-production/`: 과거 설계·검수 기록
- `media-source/`: 보관 원본과 다운로드 원장. 현재 사이트에서 자동 사용하지 않음

## 확인

```powershell
node scripts/verify_redesign_routes.mjs
node scripts/verify_metadata_accessibility.mjs
node scripts/verify_film_lifecycle.mjs
python scripts/verify_public_archive.py
node scripts/verify_continuation_package.mjs
```

내부 미리보기와 Git 브랜치는 공식 도메인 배포가 아닙니다. 메인 및 AX 신규 본편은 제작 전이며, 기존 공개 글의 텍스트와 이미지·첨부파일은 이관 상태가 다릅니다.
