# 최신 작업 기준 — R6 영상 제작 전 단계

[영상 제작 전 인계](research-docs/20260917-redesign-plan/VIDEO-PREPRODUCTION-06.md)를 먼저 읽는다
이 문서가 아래 과거 영상 길이와 AX 대표 화면 지시보다 우선한다
메인과 AX 소개 상단은 기능별 영상 자리로 구성하며 상세의 기존 클립은 실제 화면 편집 참고본이다
현재 생성 영상은 없고 모든 신규 영상 슬롯은 pending 상태다
웹 소스는 site/dist · 로컬 검토는 http://127.0.0.1:18102/index.html?lang=ko
비공개 배포는 별도 검증 기록이 있을 때만 최신으로 간주한다

---
# 2026-09-17 메인 재구성 업데이트

기존 디자인 반려에 따른 메인 재구성 · 상세 기록은 research-docs/20260917-redesign-plan/REVISION-04.md
새 키프레임과 스크롤 기술 장면 및 독립 플랫폼 소개 반영 · 하위 페이지의 시각 통일은 후속 작업

# GeoSR 홈페이지 — 여기서 시작

최신 비공개 검토본: https://geosr-design-preview.yobbi.chatgpt.site
화면과 동작의 메인 검수 기록: [REVIEW-QA.md](REVIEW-QA.md)
2026-09-17 검토용 목업 배포 완료 · 최종 영상과 전체 자료 이관은 다음 단계

> **2026-09-17 현행 구현 인계** — 배포 대상은 [`site/dist`](site/dist)이며, 로컬 검토는 `http://localhost:18102/`에서 진행한다. 새 AX 9개 플랫폼 소개는 실제 플랫폼 화면을 편집한 짧은 클립으로 구성하고, 서비스 진입 CTA는 두지 않는다. 회사 자료실은 공개 원본을 바탕으로 한 대표 7건을 제공한다.
>
> 검수 기준은 [MEDIA-QUALITY.md](MEDIA-QUALITY.md), 정적 경로·AX 계약 검수는 `C:\Users\user\Documents\Codex\2026-09-17\c-users-user-downloads-geosr-homepage\work\static-check-v2.md`, 클립 산출 검수는 `C:\Users\user\Documents\Codex\2026-09-17\c-users-user-downloads-geosr-homepage\work\platform-clips-validation.md`를 본다. Higgsfield는 결제·생성 전이다. 현재는 검수된 이미지 가안과 실제 플랫폼 캡처 편집 클립을 사용하며, 전체 자료 이관과 공식 공개 전 검토는 남아 있다.

아래는 제작 시작 당시의 조사·설계 기준과 역사 기록이다.

최신 제작 기준은 [research-docs/20260917-redesign-plan/00-START.md](research-docs/20260917-redesign-plan/00-START.md) 하나에서 시작한다.

- [페이지 형태·국영문](research-docs/20260917-redesign-plan/01-PAGE-DESIGN.md)
- [영상 콘셉트·스크롤·모션](research-docs/20260917-redesign-plan/02-FILM-MOTION.md)
- [소량 콘텐츠 목업 범위](research-docs/20260917-redesign-plan/03-MOCKUP-SCOPE.md)
- [메인 작성 설계 보드](research-docs/20260917-redesign-plan/visuals/main-design-board.svg)

이번 목업은 전체 자료 이관이 아니다. 실제 대표 글과 ‘목업’으로 표시한 빈 콘텐츠로 틀과 동작을 확인한다. 전체 원본은 보존하되 필요할 때만 읽는다. Higgsfield 미결제 상태이며 생성·배포는 하지 않았다.

디자인·영상·중요 동작과 품질 판단은 메인이 맡는다. 조사·반복 검사·파일 정리는 서브에이전트에 위임할 수 있다.

현재 프리뷰 실행은 [README-PREVIEW.md](README-PREVIEW.md)를 참고한다. 구형 실험·중복 백업은 프로젝트 밖 복구 폴더로 정리했다. 정리 내역은 [cleanup-report.md](research-docs/20260917-redesign-plan/cleanup-report.md)에 기록한다.
