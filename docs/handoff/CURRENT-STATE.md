# 현재 버전 인계

갱신 2026-09-30

## 이어받는 기준

이 문서를 먼저 읽고 [저장소 관리 기준](REPOSITORY-POLICY.md)과 [현재 설계 방향](../redesign-next/CURRENT-DIRECTION.md)을 확인한다
이번 변경은 저장소 정리다 디자인과 콘텐츠 및 재생 파일을 새 버전으로 교체하지 않았다
정리 전 기준 커밋은 `d223d6e`이며 현재 브랜치는 `redesign/production-2026-09-19`다

## 작업 위치와 미리보기

- 실제 저장소 `C:\Users\user\Documents\Codex\Projects\geosr-homepage`
- Downloads의 `GeoSR_Homepage`는 실제 저장소에 연결된 junction
- 로컬 주소 http://127.0.0.1:18102/
- 2026-09-30 확인한 임시 공개 주소 https://sea-truth-hopes-barbara.trycloudflare.com/
- 공식 geosr.com 배포는 아님
- 사용자가 종료를 요청할 때까지 18102 서버와 터널을 유지

주소와 프로세스 상태는 Git에서 제외한 `.openai/local/preview/preview-state.json` 및 실제 실행 상태를 확인한다
Quick Tunnel 주소는 영구 주소가 아니며 재시작 후 바뀔 수 있다 이전 주소를 문서만 보고 재사용하지 않는다
현재 서버가 이미 실행 중이면 같은 포트에 추가 서버를 실행하지 않는다 Windows 자동 시작은 설정하지 않았다

## 보존한 웹 버전

`dist/`가 실행·배포 대상이다 HTML과 CSS 및 JavaScript를 직접 제공하는 정적 사이트이며 별도 npm 빌드는 없다
한영 전환과 회사 정보 및 원문 게시판·기술 상세·장비·채용·문의를 제공한다

AX Platform은 직원 저장소에서 이관한 로컬 갤러리와 캡처를 소개하며 실제 운영 서비스로 연결하지 않는다
GeoDAP은 별도 외부 서비스다 두 플랫폼은 서로의 하위 서비스가 아니다
AX 이미지 주소는 서비스 ID로 조합하므로 정적 문자열 검색만으로 미사용이라고 판정하면 안 된다

현재 메인 재생 파일은 `dist/assets/films/geosr-hero-20260929-v4.mp4`다
편집 구간표 기준 27.5초이며 위성 → 드론 → CTD → 탄성파 → 모델 격자 → 확산 → 해양 흐름의 7장면을 사용한다
과거 인계문에 남아 있던 23.25초와 6장면 설명은 현 파일 기준이 아니다
실제 연결과 대체 예정 상태는 `dist/film-manifest.json`이 기준이다
장면별 현재 기록은 [미디어 인계](../media/CURRENT-MEDIA.md)에서 확인한다

## 자료 유지보수

원문과 번역 및 연결된 이미지·첨부파일을 `dist/`에 함께 보존했다
`source-archive.json`에는 언어별 원문 2024건이 있으며 고유 사업 수나 현재 실적 수치가 아니다
원문 제목과 ID 및 hash 연결을 유지하고 번역을 별도 파일에서 관리한다
기술 번역 JSON은 브라우저에서 직접 읽지 않지만 기술 데이터 재구축 입력이므로 보존했다
인증·등록 문서의 보호 상태와 실험·관측 자료의 출처를 변경하지 않았다
폰트 라이선스와 AX 이관 출처도 유지한다

## 확인 명령

저장소 루트에서 실행한다

```powershell
python -X utf8 scripts/verify_repository_package.py
node scripts/verify_redesign_routes.mjs
node scripts/verify_metadata_accessibility.mjs
node scripts/verify_film_lifecycle.mjs
python -X utf8 scripts/verify_news_translations.py
```

원문 충실성 대조에는 Git 외부의 수집 원본이 필요하다

```powershell
python -X utf8 scripts/verify_public_archive.py --capture C:/Users/user/Documents/Codex/Archives/geosr-homepage-20260930-pre-cleanup/docs/source-migration/pages.jsonl
```

## 이어서 할 일과 완료 경계

사용자의 다음 수정 지시가 있기 전에는 이 버전을 유지한다
자료 정리를 디자인 최종 승인이나 영상의 과학적 검증으로 표현하지 않는다
현재 생성 장면은 설명용 콘셉트이며 회사 실적이나 실제 관측 결과를 보증하지 않는다
9월 29일 설계·미디어 문서에는 현행 화면보다 이전의 제작 대기 상태와 장기 계획이 함께 남아 있다
파일 배치·길이·실행 상태는 이 인계문 및 현재 `dist/`를 우선하고 디자인 의도와 장면 확장 계획은 설계서를 참조한다
유료 생성은 현재 입력 파일과 프롬프트 및 비용을 새로 검토한 후 진행한다 과거 업로드 URL과 잔액을 재사용하지 않는다
문의는 mailto 방식이며 서버 전송 기능이 아니다

정리와 검증 결과는 [저장소 정리 기록](CLEANUP-20260930.md)에 기록한다
추가 로컬 정리로 임시 파일 4523개와 빈 폴더 63개를 삭제했다 현재 웹 파일과 외부 원본 보관소는 유지한다
`tmp/`는 보존 자료가 없는 임시 출력 경로이며 이후 검사에서 필요하면 새로 생성할 수 있다
