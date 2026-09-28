# Flow 다운로드 원본 보관

2026-09-28 다운로드 폴더에 남아 있던 예시 영상 13개를 `flow-downloads/`로 옮겼다. 원래 파일명과 수정 시각을 유지한다.

- 각 파일의 SHA-256을 저장소 내 대응 파일과 대조한 뒤 이동했다.
- `download-inventory.json`은 원래 이름, 보관 위치, 동일한 저장소 파일, 크기와 SHA-256을 기록한다.
- 동일한 파일이 `dist/assets/films/` 또는 `docs/redesign-production/flow-review/`에 이미 Git으로 보존되어 있어 다운로드 원본은 Git에서 제외한다. 새 기기에서 저장소를 복제하면 게시용·검토용 동일 파일은 복원되지만 이 폴더의 원래 다운로드 이름 파일은 복원되지 않는다.
- 이 폴더의 파일은 제작 이력이다. 사이트 연결 상태와 사용 제한은 `dist/film-manifest.json` 및 `docs/redesign-production/FLOW-PRODUCTION-TRACKER.md`를 따른다. 폴더에 있다는 이유로 공개 가능하거나 최종 승인된 영상으로 취급하지 않는다.

다운로드 폴더에 남아 있던 영상 파일은 이동 후 0개다. 기존 프로젝트 영상 파일은 삭제하거나 바꾸지 않았다.
