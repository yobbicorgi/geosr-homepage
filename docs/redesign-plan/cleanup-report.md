# GeoSR 홈페이지 작업폴더 정리 검증 로그

- 실행일: 2026-09-17 (KST)
- 대상: C:\Users\user\Downloads\GeoSR_Homepage_v2
- 안전 복구본: C:\Users\user\Documents\Codex\2026-09-17\c-users-user-downloads-geosr-homepage\work\recovery-20260917
- 목적: 현재 정적 홈페이지의 실행 파일·고유 원본·조사 자료를 보존하면서 stale 디자인/실험 산출물과 중복 복구 파일을 정리
- 메인이 지정한 최신 canonical 문서(00–04 및 main-design-board)는 편집하지 않았고, 지정된 subagent draft만 recovery로 이동했다. 이 로그 파일은 새로 추가했다. 현재 HTML/CSS/JS 구현은 이 정리에서 변경하지 않았다.

## 변경 요약

복구본을 먼저 만들고 SHA-256 및 파일 수·바이트를 대조한 뒤 프로젝트 원본 위치에서 다음 항목을 이동했다. 이 정리의 기존 후보 recovery 보존분은 217개 파일, 23,518,204바이트다.

| 원본 상대경로 | 파일 수 | 바이트 | 처리 |
|---|---:|---:|---|
| redesign.html | 1 | 25,349 | recovery/redesign.html로 이동 |
| README-MODEL-FIRST.md | 1 | 2,134 | recovery/README-MODEL-FIRST.md로 이동 |
| build_single_html.py | 1 | 7,276 | recovery/build_single_html.py로 이동 |
| serve_homepage.py | 1 | 549 | recovery/serve_homepage.py로 이동 |
| _backup-before-business-ax-redesign-20260917.zip | 1 | 14,913 | recovery로 이동 |
| _backup-before-company-research-redesign-20260917.zip | 1 | 22,810 | recovery로 이동 |
| _backup-before-desktop-redesign-20260917.zip | 1 | 50,891 | recovery로 이동 |
| fields | 6 | 5,356 | recovery/fields로 이동 |
| portal/model-first | 2 | 26,920 | recovery로 이동 |
| portal/company-20260917 | 2 | 20,305 | recovery로 이동 |
| portal/research-20260917 | 1 | 5,219 | recovery로 이동 |
| portal/camera-hq | 7 | 15,482 | recovery로 이동 |
| portal/camera-study | 5 | 10,571 | recovery로 이동 |
| assets/camera-study | 183 | 23,227,590 | recovery로 이동 |
| research-docs/checks-11x/__pycache__ | 4 | 82,839 | recovery로 이동 |

추가 draft 정리에서는 다음 원본 경로 6개를 복구 검증 후 제거했다. canonical/output wireframe SVG·PNG는 서로 동일한 SHA-256이어서 recovery에는 canonical provenance의 한 copy만 보존했고, 두 blueprint는 서로 다른 SHA-256이어서 각각 보존했다.

| 원본 상대경로 | 파일 수 | 바이트 | recovery 보존 위치 |
|---|---:|---:|---|
| research-docs/20260917-redesign-plan/design-blueprint.md | 1 | 58,141 | subagent-design-drafts/canonical/design-blueprint.md |
| research-docs/20260917-redesign-plan/visuals/geosr-design-wireframe.svg | 1 | 13,643 | subagent-design-drafts/canonical/visuals/geosr-design-wireframe.svg |
| research-docs/20260917-redesign-plan/visuals/geosr-design-wireframe.png | 1 | 311,365 | subagent-design-drafts/canonical/visuals/geosr-design-wireframe.png |
| outputs/geosr-design-blueprint.md | 1 | 58,075 | subagent-design-drafts/outputs/geosr-design-blueprint.md |
| outputs/geosr-design-wireframe.svg | 1 | 13,643 | canonical wireframe recovery copy와 동일 hash |
| outputs/geosr-design-wireframe.png | 1 | 311,365 | canonical wireframe recovery copy와 동일 hash |

draft 원본 경로 제거 합계는 6개, 766,232바이트이며, draft의 unique recovery 보존분은 4개, 441,224바이트다. recovery/fields/fields에 생겼던 중복 6개 파일(5,356바이트)은 canonical recovery/fields의 같은 이름 파일과 길이·SHA-256이 모두 일치함을 확인한 뒤 중복만 제거했다. 프로젝트 경로에서 사라진 파일은 220개, 23,901,353바이트(기존 후보 217개 + canonical draft 3개)이고 outputs 경로에서 사라진 파일은 3개, 383,083바이트다. 따라서 원본/배포 경로 합계는 223개, 24,284,436바이트이며, 중복 recovery 파일까지 포함한 파일 제거 총계는 229개, 24,289,792바이트다. 제거한 디렉터리는 빈 잔여 경로 3개와 중복 recovery 디렉터리 1개이며, 광범위한 재귀 삭제는 수행하지 않았다.

## recovery 무결성

기존 cleanup 후보 recovery 디렉터리의 파일 수·바이트·tree SHA-256은 다음과 같다. tree SHA-256은 recovery 기준 상대경로, 파일 길이, 파일 SHA-256을 정렬해 줄바꿈으로 연결한 값이다.

| recovery 상대경로 | 파일 수 | 바이트 | tree SHA-256 |
|---|---:|---:|---|
| fields | 6 | 5,356 | FA587B06DBBAA6943B611C4B0D57FAA5FFA0D070910A65220CE60DCFEAF3AD29 |
| portal/model-first | 2 | 26,920 | 2F8310BE664E0B23D485D958737032F02F101F606222A4FF1F8CAC17BB0EDF65 |
| portal/company-20260917 | 2 | 20,305 | 989366E2BD0ADAF051B47477D76295ECBC5C85F3309B8B0358EF9209DD163A93 |
| portal/research-20260917 | 1 | 5,219 | DA872E4ADBBA680C86DEFF50526CDA6C48B5AF7041872050B2BDC5EC88DF84A7 |
| portal/camera-hq | 7 | 15,482 | E8F21ED09CD292C47FCBB44C049EA8A5E817EEF094C0195C89E91C1CB042EA67 |
| portal/camera-study | 5 | 10,571 | 418FE450E5DCFF4279BD08D925CDF7B1733CB4B062AFAFC3374FB377D0C095FA |
| assets/camera-study | 183 | 23,227,590 | 3D066FD0C51AA85765F9E411F25437F7BE1A1B7F8096D4EFE7421A1040D605A4 |
| research-docs/checks-11x/__pycache__ | 4 | 82,839 | 5A74934C0E419A5FD044B6025CA56586CBFBD1032D81D94720338C56B2CAB50A |

추가 draft recovery는 다음 4개 파일, 441,224바이트이며 각 원본 대비 hash 일치다.

| recovery 상대경로 | 바이트 | SHA-256 |
|---|---:|---|
| subagent-design-drafts/canonical/design-blueprint.md | 58,141 | 6E2932CA5E2FED748871608F01342530B00C3AC08087962E8679E735B51F8CE4 |
| subagent-design-drafts/canonical/visuals/geosr-design-wireframe.svg | 13,643 | AEA0FE463B40C85E42FBBE7729274CE4D80BA975229A07BDC7966873F775CD56 |
| subagent-design-drafts/canonical/visuals/geosr-design-wireframe.png | 311,365 | 4335D1E22842AAFF8F075E73D312A27A2C449D3F3603200B4534E2C46F1A1548 |
| subagent-design-drafts/outputs/geosr-design-blueprint.md | 58,075 | 2F3E3FF5E4160013D5903BCED5BF59DD04BF93A0D6E6C4DCBACBB0B427887F8F |

recovery에는 이 작업과 별도로 부모 작업에서 이미 보존한 entry-docs 3개, 21,787바이트도 함께 존재한다. 저는 생성·수정·이동하지 않았다. 따라서 최종 recovery 전체는 224개 파일, 23,981,215바이트이며, entry-docs/CLAUDE.md·entry-docs/PRODUCTION-HANDOFF.md·entry-docs/research-README.md는 별도 baseline 보존분으로 취급한다.

## 제거한 빈 디렉터리

각 경로를 Resolve-Path로 확인하고 intended root 아래인지 검증한 뒤, 0파일·0하위폴더 상태의 정확한 경로만 제거했다.

- C:\Users\user\Downloads\GeoSR_Homepage_v2\assets\camera-study\frames
- C:\Users\user\Downloads\GeoSR_Homepage_v2\research-docs\checks-11x\__pycache__
- C:\Users\user\Downloads\GeoSR_Homepage_v2\assets\camera-study
- C:\Users\user\Documents\Codex\2026-09-17\c-users-user-downloads-geosr-homepage\work\recovery-20260917\fields\fields

다음 빈 디렉터리 3개는 source-capture/계획 자료의 보존 대상이므로 유지했다.

- C:\Users\user\Downloads\GeoSR_Homepage_v2\assets\video-keyframes-20260916\02_AX_Platform
- C:\Users\user\Downloads\GeoSR_Homepage_v2\research-docs\source-capture-20260916\en-fixed-content\pages
- C:\Users\user\Downloads\GeoSR_Homepage_v2\research-docs\source-capture-20260916\fixed-content\pages

## 이동된 단일 파일 SHA-256

- redesign.html — C19E9F91A68300640C2C0B15C9F79B7A5F7763B54D0224657D1378750674F718
- README-MODEL-FIRST.md — 2CCA9E8B09303FF7683DA9EFB51CC4C2922C29893735FE86AED32ED8892A9D56
- build_single_html.py — 496E392604B53E76EE8A9786AA459E8D40C175665507728ACD2FD61ECF0A5145
- serve_homepage.py — 9B0005AC3BAB2EBE8E633ADBF459A4075788FF7B5BC108C23ABC852932ED44E2
- _backup-before-business-ax-redesign-20260917.zip — 544B8CAB18D59DA01816A22E4F21F83D9CB98B88502F617799566E8B33C87DA7
- _backup-before-company-research-redesign-20260917.zip — 8C6424D630248E2F1530463D62A2F777A6F2463F0E247EA68E8EE59AE007EBFF
- _backup-before-desktop-redesign-20260917.zip — 54503EFBED6BF76E888AD1BC2EBA2D0F826B19CF9B277590CBDAE0EB135D2B5A

fields/fields 중복 비교에서 canonical과 duplicate는 다음 6개 파일 모두 길이·SHA-256이 동일했다.

- ai.html — 884바이트 — F217264CCC5115B919A020BEE1CAEFD06F0B57EC292A2E7AC1EC31706539D1FC
- environment.html — 902바이트 — B5DAC8AC49144B5E873FC2F653BF8A73E95B04C6E2CBD3A365DAF0F4234E1B41
- ocean.html — 890바이트 — 7E4648C7F844BA4B1E57109CED97192150F17225403B8EE715D6559CCCA0799B
- spatial.html — 894바이트 — 212553FD524E81D82279E9D0BF4032C7412F2303A5A79B7CF3A527E9F5F95EFE
- survey.html — 892바이트 — 739067B2B07B9A7FCA3CB44BD4D16BC40408CC392F0BA2685CDE223A9056B1DF
- systems.html — 894바이트 — 7734E01213A8EEDA51AA9DBC901B88177B19138E5841BC0FA474D1E5317B33F6

## 핵심 runtime SHA-256

정리 전 확보한 값과 최종 값이 10개 모두 일치한다.

| 파일 | 바이트 | SHA-256 |
|---|---:|---|
| index.html | 35,730 | 5CA42BE94C842992055ED834E7771DC6B6F70739CE69B6BEF79375647C7B90E3 |
| company.html | 9,218 | CFBEF50DD16B8D861F1F9B06243D88D6A40736A2D09450F52EF79D95CA6854D7 |
| business.html | 8,076 | 243196C14766E7818BC94AF8D6B7A7B5F43910173944E94654DA48E916D53939 |
| platforms.html | 5,838 | 7A0DA6DD9EAB5727B14B2FFB4159986F4F71F5DD00DE351E0480DAFAAD632512 |
| research.html | 10,078 | B801819F2CAFA401A510D9D498F6DD776AF715A37B09D604F9439F27102B2448 |
| contact.html | 4,505 | 23C88A1EF288161F1D4F3B565BA5A4D1DE3346728A3D9716D1D5BDF0E1CDC734 |
| careers.html | 5,221 | 59F617420B3D09BB174E01F252DA1504929EEFCCAC47126F62F576A23C79BCEB |
| directory.html | 3,422 | 598480138516563350423A2EE9E4A9DFDE455E8137F23655D8190ED916D936BB |
| archive.html | 5,259 | 01DDF49AC0400E0D896101BC30249E6DDB134062C995B462841815C44D50E6C5 |
| preview-server.cjs | 2,954 | D86F27B63055BB4E7B121AD560CA04A06EE4C7256755001D59D93C4E6E09D64F |

## runtime smoke

- preview-server.cjs listener: 0.0.0.0:18101, PID 29928.
- 9개 현재 페이지 GET 결과: 전부 HTTP 200.
- 페이지별 응답 바이트: index 35,730; company 9,218; business 8,076; platforms 5,838; research 10,078; contact 4,505; careers 5,221; directory 3,422; archive 5,259.
- 9개 HTML에서 수집한 고유 local 직접참조 52개를 HEAD 검사했다. assets/ 16개, portal/ 28개, local HTML 8개이며 52개 전부 HTTP 200, 404/실패 0건이다. assets/portal 정적 참조만 세면 44개다.
- 현재 runtime JS/CJS 22개에 node --check를 실행했으며 실패 0건이다.
- C:\\Users\\user\\miniconda3\\python.exe의 playwright.sync_api로 index.html, business.html, platforms.html 3개를 DOMContentLoaded까지 실제 로드했다. 세 route 모두 navigation HTTP 200이며 local 404 0, local HTTP/request failure 0, console error 0, pageerror 0, 외부 media/network/HTTP failure 0이다. index에서 생성된 local blob media의 net::ERR_ABORTED 4건만 관찰했으며 외부 네트워크 실패가 아닌 media lifecycle 이벤트로 별도 집계했다.
- 9개 HTML 본문에서 이번에 이동한 후보명(redesign.html, portal/model-first, portal/company-20260917, portal/research-20260917, portal/camera-hq, portal/camera-study, assets/camera-study, fields/) 직접참조는 0건이다.

## 보존 및 후속 주의

- 9개 현재 페이지, preview-server.cjs, 현재 연결된 portal/coastal-journey, portal/autoplay-gallery-20260915, portal/editorial-20260914, portal/company-20260914, portal/design-v2-20260916, portal/desktop-cinema-20260917, portal/local-content-20260916와 그 fixed/board/en 데이터는 보존했다.
- 회사 원본 자산·첨부, board/corporate 자산, research source captures 및 기존 조사 원자료는 보존했다. assets/camera-study 실험 묶음은 recovery로 이동해 복구 가능하게 했다.
- 메인이 작성한 00-START.md, 01-PAGE-DESIGN.md, 02-FILM-MOTION.md, 03-MOCKUP-SCOPE.md, 04-RESEARCH-INDEX.md, main-design-board.svg/png, content-map.md, existing-work-synthesis.md는 수정·삭제하지 않았다.
- portal/design-v4의 역사적 JS에는 fields/ 문자열이 남아 있으나 현재 9개 페이지에서 로드되지 않는다. 이 기록 자료는 삭제하지 않았다.
- CLAUDE.md와 canonical synthesis 일부 문장은 이동된 역사 파일명을 계속 언급한다. 이는 runtime 참조가 아니며 이 작업에서 해당 문서를 수정하지 않았으므로, 메인 agent가 superseded/복구 위치를 관리한다.
- 유료 Higgsfield/ImageGen 생성·배포와 현재 HTML/CSS/JS 구현은 이 정리 범위에서 시작하지 않았다.

~~~json
{
  "existing_candidate_recovery": {
    "files": 217,
    "bytes": 23518204
  },
  "design_draft_source_paths_removed": {
    "files": 6,
    "bytes": 766232,
    "unique_recovery_files": 4,
    "unique_recovery_bytes": 441224
  },
  "project_source_paths_removed": {
    "files": 220,
    "bytes": 23901353
  },
  "outputs_paths_removed": {
    "files": 3,
    "bytes": 383083
  },
  "source_and_deployment_paths_removed": {
    "files": 223,
    "bytes": 24284436
  },
  "preexisting_recovery_baseline_not_changed": {
    "path": "entry-docs",
    "files": 3,
    "bytes": 21787
  },
  "redundant_recovery_files_removed": {
    "files": 6,
    "bytes": 5356
  },
  "filesystem_file_removal_total": {
    "files": 229,
    "bytes": 24289792
  },
  "empty_directories_removed": 4,
  "protected_empty_directories": 3,
  "final_recovery_total": {
    "files": 224,
    "bytes": 23981215
  },
  "critical_runtime_hashes_match_before": true,
  "http_smoke": {
    "listener": "0.0.0.0:18101",
    "routes": 9,
    "all_status_200": true,
    "unique_local_direct_refs": 52,
    "assets_or_portal_refs": 44,
    "html_refs": 8,
    "all_direct_refs_status_200": true,
    "failures": 0
  },
  "node_syntax_check": {
    "files": 22,
    "all_ok": true
  },
  "browser_console": {
    "status": "checked",
    "python": "C:\\Users\\user\\miniconda3\\python.exe",
    "routes": 3,
    "domcontentloaded": 3,
    "local404": 0,
    "localHttpErrors": 0,
    "localRequestFailures": 0,
    "consoleErrors": 0,
    "pageErrors": 0,
    "externalMediaFailures": 0,
    "externalNetworkFailures": 0,
    "externalHttpErrors": 0,
    "localBlobMediaAborts": 4,
    "note": "index.html emitted four local blob media net::ERR_ABORTED events during this run; no external request failure"
  },
  "runtime_candidate_reference_hits": 0
}
~~~
