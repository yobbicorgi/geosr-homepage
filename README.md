# GeoSR 홈페이지

현재 작업 시작점은 [다음 세션 인계](docs/redesign-next/00-START-HERE.md)

홈 전문 분야와 연구 사례 및 AX 실제 화면 탐색을 재구성했고 한영 50개 렌더 조건을 검수함
최신 변경과 남은 범위는 [동적 디자인 검토서](docs/redesign-next/07-DYNAMIC-DESIGN-REVIEW.md)에 기록
회사60초·AX30초 영상은 완성본이 아니며 최종 디자인 승인은 대기 상태
기능 검사 성공과 디자인·미디어 품질 합격을 구분함

- 정적 사이트 `dist` / 별도 빌드 없음 / HTTP로 실행
- 로컬 `http://127.0.0.1:18102/` / 내부 공유 `http://192.168.6.85:18102/`
- 정본 `C:\Users\user\Documents\Codex\Projects\geosr-homepage`
- 다운로드 `C:\Users\user\Downloads\GeoSR_Homepage`는 정본 junction / 별도 복사본 없음
- 브랜치 `redesign/production-2026-09-19` / 원격 `yobbicorgi/geosr-homepage`
- AX는 소개용 / GeoDAP은 독립 외부 서비스 / 문의는 mailto 작성 방식
- 현재 요청은 내부 미리보기와 Git 동기화 / 공식 도메인 배포는 별도

## 설계·미디어·실행

- [화면별 디자인과 모션](docs/redesign-next/01-DESIGN-SPEC.md)
- [회사와 AX 영상 구성](docs/redesign-next/02-MEDIA-DIRECTION.md)
- [구체적인 후속 작업](docs/redesign-next/03-EXECUTION-PLAN.md)
- [18개 장면 프롬프트와9개 플랫폼 캡처](docs/redesign-next/PROMPT-CARDS.md)
- [제작 원장](docs/redesign-next/production-plan.json)
- [사이트 자산 상태와 hash](docs/redesign-next/asset-register.json)

현재 코드 책임과 CSS 로딩 충돌 주의사항은 실행 계획 G2에 기록
실제 연결 영상의 기준은 `dist/film-manifest.json`
원본 수집 자료는 `docs/source-migration`에 보존
이전 설계·생성 시도·검수 기록은 `docs/redesign-plan`과 `docs/redesign-production`에 보존
과거 완료·generationReady 표시는 현재 승인으로 사용하지 않음

```powershell
node scripts/verify_continuation_package.mjs
node scripts/verify_redesign_routes.mjs
node scripts/verify_metadata_accessibility.mjs
node scripts/verify_film_lifecycle.mjs
```

프롬프트 수정 후 `node scripts/render_continuation_prompts.mjs`
자산이나 영상 연결 변경 후 `node scripts/build_continuation_inventory.mjs`
이 두 명령은 문서·원장을 갱신할 뿐 결과물의 품질을 승인하지 않음
