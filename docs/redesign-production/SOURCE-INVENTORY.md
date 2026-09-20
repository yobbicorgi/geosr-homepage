# Phase 1 — GeoSR source and asset inventory

As of 2026-09-19. This is an evidence register for design-board work, not permission to publish every listed file. Statuses describe the evidence checked here; they do not confer image, document, or product-screen rights.

## Evidence rules

| Status | Meaning |
|---|---|
| `VERIFIED SOURCE` | A named GeoSR source or local source-backed record is present; current validity, rights, and contextual fit may still need approval. |
| `VERIFIED OUTPUT` | A captured/produced output whose provenance is documented in the repo; recheck version and usage rights before public use. |
| `CONCEPT` / `GENERATED CONCEPT` | A visual direction only. Never describe its geography, values, layers, equipment, or result as an observation or GeoSR output. |
| `PLACEHOLDER` | Explicitly pending content/media; retain a designed preparation state instead of showing an error or fictional result. |
| `UNVERIFIED` | Source, status, rights, title, or currentness not established. Do not assert as fact. |

Priority order for resolving conflict: current user direction → original master brief → primary GeoSR source checked for the specific claim → preserved local source capture → current project data → prior analysis/visual concepts. A missing source file stays missing; do not reconstruct its contents from a summary.

## Source register

| Source / location | What is available | Status and use boundary |
|---|---|---|
| `dist/content.json` | 21 solution records with IDs, Korean titles, and four categories | `VERIFIED SOURCE` for this local index only. Reconcile exact titles with current official detail before release; no complete technical body or approved English is included here. |
| `docs/redesign-plan/content-map.md` | Historical 2026-09-16 mapping of 21 solution details, official URLs, old capture paths, summaries, related posts/assets | `VERIFIED SOURCE` as a research note. Referenced `research-docs/source-capture-20260916/fixed-content/html/` files are absent in this checkout, so the quoted body summaries are not a locally re-openable source. Refetch details before copying prose. |
| `dist/credentials.json` and `dist/assets/credentials/` | Seven copied records: two certifications, two registrations, three patents; each row names a GeoSR source URL | `VERIFIED SOURCE` for title/image association in this local prototype; `UNVERIFIED` for current validity, renewal, public-display permission, issuing-body wording, and English translation. Official page may have more records. |
| Historical equipment mapping in `content-map.md` | Five active groups and 80 items: Surveying 44, Investigation 21, Biological 2, Experiment 10, Ship 3 | `VERIFIED SOURCE` as the dated inventory count. The complete source dataset is not in this checkout. Do not imply all 80 are rendered or currently available. `water.asp` was not verified as an active sixth group. |
| Historical board capture described by `content-map.md` / `existing-work-synthesis.md` | Six board types, 1,105 records and 90 attachments at capture time; representative IDs below | `VERIFIED SOURCE` as historical capture metadata only. The original `portal/local-content-20260916/` and source-capture record files are absent here. Counts and statuses are not live counts. |
| `dist/film-manifest.json` | Editorial/company slots remain pending; AX sequence clips have local MP4 files | `PLACEHOLDER` for pending slots. Manifest approval only means the local media passes its package gate; it does not establish a live capture URL, capture date, product version, or usage rights. Do not describe local AX media as newly recaptured in this audit. |
| `dist/assets/films/` and `dist/assets/platforms/` | Local AX sequence MP4s and a set of 16:9 poster/preview files | Existing candidate media only. Capture provenance, interface version and public-use rights are not verified. Byte-identical files occur under several product labels; do not infer distinct products from duplicate paths. Current site labels Predict and Monitor images as representative previews under review. Satellite facility Detect is excluded from the preview stage and shown as a 16:9 preparation state until a verified capture is available. |
| `dist/assets/coastal-survey-source.png` | R7 identifies a real, people-free coastline reference | `VERIFIED SOURCE` for visual reference per `R7-ASSET-DIRECTION.md`; exact place, capture date, source record, and usage rights are not recorded in the current image metadata. Suitable for board exploration with a neutral caption; no bathymetry/survey claim. |
| `dist/assets/analysis-concept.png` | R7 identifies a visible blue-gloved hand and generic lab scene | Do not use in public expertise visuals. The user’s no-people rule includes hands. Keep the file untouched; no reference in a board. |
| `dist/assets/coastal-model-v3.png`, `dist/assets/satellite-layers-v3.png`, `dist/assets/estuary-hero-v4.png` | Synthetic model/coast/satellite concepts | `GENERATED CONCEPT`. Style reference only; geography, coastlines, layers and outputs are not verified. Never imply measured or forecast data. |
| `dist/assets/platform-geodap.png` | Existing GeoDAP screenshot candidate | `UNVERIFIED` capture/version and rights; it is not used as a current interface screenshot or factual live-dataset count. Home uses a typographic service identity panel linked to the separate GeoDAP service. Never fold GeoDAP into AX. |
| `dist/assets/usv-source.jpg`, `usv.png`, `equipment-icp.png`, `equipment-rov.png`, `equipment-vessel.jpg` | Small local equipment visual candidates | `UNVERIFIED` model, deployment, capture provenance, human-free framing, and rights. Match every device to the official equipment record before using a product/model label. USV is one capability among several, not the whole observation story. |
| `dist/assets/notice.pdf` | One PDF in the current assets directory | `UNVERIFIED` title, issuer, currentness, and rights until opened and compared with its source post. Do not label from filename alone. |
| `dist/assets/logo.png`, `dist/assets/InterVariable.woff2` | Logo and font files | Brand/font use candidate; logo source/clear-space approval and font license are not documented here. |
| `docs/redesign-plan/visuals/` | 15 internal design/reference images, including competitor captures | Research only. Do not place competitor images or copied visual compositions in public artwork. |
| `C:\Users\user\.codex\generated_images\01a0ada2-01b2-79a2-bf1e-36176720ccfc\` | 14 generated PNGs described in `R7-ASSET-DIRECTION.md` | `GENERATED CONCEPT`. Three named variants with people/hands are rejected; the generated land/river image has unverified geography; remaining images are style references. None is a verified GeoSR output. No files were created or edited for this inventory. |

### Local asset snapshot

`dist/assets/` has 47 files, 23,271,984 bytes across its current subdirectories. The inventory is a snapshot of this checkout; the count is not a media budget or a release-ready asset count. The image and platform candidates above are the only assets proposed for initial board exploration. Keep all source files intact.

## Small real-content candidates for the mockup

These are candidates recorded in `docs/redesign-plan/03-MOCKUP-SCOPE.md`; the original captured records are not present in this checkout, so reload their official record before transcribing copy or date:

| Type | Candidate | Required recheck |
|---|---|---|
| Business | `business-1994` — 연안침식 정밀조사 용역, dated 2024-12-09 in the historical capture | Title, date, client attribution, attachment, and rights |
| Research | `research-3059` — 한국형 연안재해 발생요인 예측기술 개발, dated 2026-04-08 in the historical capture | Current record text, dates, participating parties, and status |
| Academic | `academic-3093` — long English journal title in the historical capture | Publication metadata and exact publisher title/DOI |
| Notice | `notice-3091` — 해양수산 신기술 인증, dated 2026-08-20 in the historical capture | Notice status/date and PDF source |
| Press | `press-1440` — press item dated 2022-03-25 in the historical capture | Exact headline/date/image rights |
| Newsletter | `newsletter-1542` — GeoSR 샘터 특별판 vol.2, dated 2023-05-19 in the historical capture | Exact title, date, PDF/image rights |
| Equipment | `equipment-1937` BlueROV2, `equipment-1176` ICP-MS, `equipment-1938` 해누리 in the historical capture | Model/name, ownership or availability, current asset and publication rights |

For the design prototype, use only a small source-checked subset plus visibly marked placeholders. Never make a placeholder resemble a live project, measured value, achievement count, client, or service status. The current AX platform posters are existing unverified representative previews, not new live captures; Detect remains in a designed 16:9 preparation state until the official service yields a valid, rights-cleared capture.

## Primary source links to recheck

- [GeoSR company introduction](https://www.geosr.com/sub/company/aboutUs.asp) — company scope, history and approved wording.
- [GeoSR business directory](https://www.geosr.com/sub/business/conserve.asp) and the detail URLs in `TECHNOLOGY-MAP.md` — current titles, categories and detail copy.
- [GeoSR equipment: surveying](https://www.geosr.com/sub/equipment/surveying.asp), [investigation](https://www.geosr.com/sub/equipment/investigation.asp), [biological](https://www.geosr.com/sub/equipment/biological.asp), [experiment](https://www.geosr.com/sub/equipment/experiment.asp), [ship](https://www.geosr.com/sub/equipment/ship.asp) — current catalog and model facts.
- [GeoSR certifications, registrations and IP](https://www.geosr.com/sub/company/license.asp) — live grouping and records; check every item and display permission.
- [GeoSR research](https://www.geosr.com/sub/achieve/research.asp), [academic](https://www.geosr.com/sub/achieve/academic.asp), [business records](https://www.geosr.com/sub/achieve/busines.asp), [notices](https://www.geosr.com/sub/news/notice.asp), [press](https://www.geosr.com/sub/news/press.asp) — refetch exact records; list totals are dynamic and must not be presented as mockup counts.
- [GeoDAP](https://www.geo-dap.com/) — separate service; check current availability and obtain an approved capture.

Last checked from the project notes: 2026-09-19. Anything described as a live-source check should be rechecked at implementation/publish time.
