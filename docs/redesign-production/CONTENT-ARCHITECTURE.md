# Phase 1 — content architecture for boards and vertical slice

This content contract preserves the eight top-level destinations. Its Home structure follows the approved five-stage research story in [FILM-STORYBOARD-DIRECTOR-v3.md](FILM-STORYBOARD-DIRECTOR-v3.md) and the current official route; older eight-stage plans are historical only. Visual rhythm is implemented in the current desktop site.

## Eight top-level pages

| Page | Primary job | Required content/data | Important state or link rule |
|---|---|---|---|
| Home | State GeoSR’s marine and environmental engineering scope and guide visitors into relevant records | 100svh film slot; five-stage research story; separate AX and GeoDAP sections; credentials, research/news and contact | AX is introduced as a GeoSR platform; GeoDAP is separately named and linked to its external service. No unsupported counts/results. |
| Business / Technology | Let a client find a relevant problem area, method and supporting evidence | Four original categories; 21 exact technology IDs/titles; business details and verified cross-links | Search/filter preserve category and source ID. Detail template shows source and related records only when verified. |
| Research / Results | Search business records, research projects and academic publications | Board type, original ID, title, date, source/client/author/publisher where present, body, attachment, DOI, related technology | Search/filter by board, year, technology and source only with populated metadata. Empty/loading/error states stay distinct. |
| Platform | Explain GeoSR platform products and distinguish verified evidence from pending previews | AX principle groups and named applications; GeoDAP external service entry kept separate | AX is an introduction, not a service login/catalog link. Use a verified capture or a clear preparation state; until poster provenance, version and rights are confirmed, label existing images only as representative previews. |
| Observation / Equipment | Show equipment-led work through three clear groups | Survey, laboratory and vessel records; verified name, role and source image | Show only source-verified equipment images. Do not imply ownership or let one USV stand for all field capability. |
| Company | Establish identity, governance, credentials and contact context | Approved company description/history, offices/organization, certifications, registrations/licenses, IP, brochures and careers | Certificates/registrations/IP are three separate groups. Verify validity and rights before showing scans. |
| News | Provide official announcements, press and newsletters | Three board groups, original ID/title/date/body/attachments | Never use invented posts, sample dates or inflated counts. Keep mock entries labelled as mock. |
| Contact | Make office and inquiry routes easy to verify and use | Current office addresses, contact details, inquiry and careers links | Do not show a successful submission unless network delivery exists; mock forms state that data was not sent. |

## Home story — current structure

| Order | Section | Content payload | Evidence / guardrail |
|---:|---|---|---|
| 1 | Hero | Geo Data Intelligence identity, short Korean-first copy and full viewport film slot | `geosr-hero` manifest source remains pending. Use the approved Earth poster as a temporary fallback with a small production status; it is not a finished film. |
| 2 | Company introduction | Explain GeoSR’s field, research and analysis work in concrete language | Avoid a second slogan or unsupported company claims. |
| 3 | Research flow | 관측 수집 → 분석 해석 → 수치모델 → 예측 판단 → 현장 적용; five stages show how observations inform work in the field | Use distinct visual and copy purposes. Never present concept imagery as measured results, real geography, model output, or operational UI. Label each reference or concept by scene. |
| 4 | Digital platforms | Separate AX Platform from GeoDAP as sibling services | AX Detect has no verified 16:9 capture and shows a preparation state. Existing Predict/Monitor posters are representative previews pending source, version and rights review. The GeoDAP brand panel is a link to the separate service, not a captured interface or live data count. |
| 5 | Credentials | Three groups: certifications, licences/registrations, intellectual property | Seven representative scans are available in the local prototype; active validity and display rights remain under review. Dialog actions enlarge or open the copied source document. |
| 6 | Research and news | Selected business, research, academic and newsroom records | Distinguish source records from explicitly marked placeholders. Keep exact IDs/dates only where the source record is present. |
| 7 | Contact and footer | Company contact details, inquiry form preview and route links | Contact details came from the existing public page. The form does not transmit or save data; company source migration and inquiry backend remain pending. |

The 5-stage sequence supersedes the earlier four-stage “Observation / Interpretation / Prediction / Action” and original eight Home-stage outline. The AX subpage’s Detect / Predict / Monitor language is a separate product-capability taxonomy and does not replace the Home sequence.

## Query, detail and mockup behavior

- **Technology:** all 21 title/ID/category rows remain searchable; use three detailed mock pages only if their current source text is refetched (candidate IDs 46, 63 and 61 in `03-MOCKUP-SCOPE.md`). Other titles lead to a uniform “상세 콘텐츠 목업 / Detail preview” state, not fabricated prose. Preserve `s_cate` and `idx` in source metadata.
- **Archive:** keep Business, Research and Academic as distinct types; search/filter may use technology, year and organization only when those fields exist on the record. Candidate real samples: business-1994, research-3059, academic-3093. Load a small fixture, not the historical 1,105-record total. Detail retains original ID, author/client, source link, body, attachment and DOI/press link when available.
- **News:** Notice, Press and Newsletter remain separate filters. Candidate source records: notice-3091, press-1440 and newsletter-1542. Their title/date/attachment must be rechecked before displaying. Never fake “latest” order or post counts.
- **Equipment:** show five classes and current records only after restoring/rechecking the source dataset. A mock entry must say “자료 배치 목업 / Content preview” and not claim availability, ownership or specifications.
- **Platform and film:** known/pending states come from the film manifest. Pending means no `src`: show localized “영상/콘텐츠 제작 준비 중” within the correct aspect-ratio frame. Network failure is a separate temporary failure state and must never be a permanent “media cannot play” message. Do not substitute invented data imagery.
- **Company records:** keep certification, registration/license, and IP categories explicit. Each copied scan remains unverified for active validity and public-use rights until checked against the live official source.
- **Search states:** provide loading, results, zero results, recoverable fetch error and mock/placeholder states separately. Only report the number of currently loaded fixture records. Search reset is always available. Language switch preserves current query/filter when possible.
- **Bilingual:** Korean and English content share the stable source ID. An English value must carry provenance as official source text, reviewed editorial translation, or unverified; no silent promotion of prototype strings.

## Cross-link contract

Use verified source IDs and direct record relationships to link Business ↔ Research/Academic and technology ↔ equipment. `content-map.md` describes historical relationships but the source capture files are missing. Add a relation only after checking both current records. GeoDAP and AX remain separate; service access URLs do not appear on the AX introduction page. All external links identify their destination and open behavior accessibly.
