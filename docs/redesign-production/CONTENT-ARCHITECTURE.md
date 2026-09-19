# Phase 1 — content architecture for boards and vertical slice

This structure keeps the original eight top-level destinations and the eight Home story stages from `docs/redesign-plan/MASTER-REDESIGN-ANALYSIS.md`. It is a content contract for design boards; page layouts and visual rhythm remain for the main designer to decide.

## Eight top-level pages

| Page | Primary job | Required content/data | Important state or link rule |
|---|---|---|---|
| Home | State GeoSR’s full environmental and engineering scope and guide visitors into evidence | Eight stages below; concise company-wide value; selected field/technology/evidence modules | AX is introduced as a GeoSR platform; GeoDAP is separately named and linked to its external service. No unsupported counts/results. |
| Business / Technology | Let a client find a relevant problem area, method and supporting evidence | Four original categories; 21 exact technology IDs/titles; business details and verified cross-links | Search/filter preserve category and source ID. Detail template shows source and related records only when verified. |
| Research / Results | Search business records, research projects and academic publications | Board type, original ID, title, date, source/client/author/publisher where present, body, attachment, DOI, related technology | Search/filter by board, year, technology and source only with populated metadata. Empty/loading/error states stay distinct. |
| Platform | Explain GeoSR platform products and actual capture evidence | AX principle groups and named applications; GeoDAP external service entry kept separate | AX is an introduction, not a service login/catalog link. Product screen slots use actual captures or clear preparation state. |
| Observation / Equipment | Show field and lab capability by task | Five equipment classes (historical 80-item inventory); verified model, purpose and source visual | Do not treat the historical inventory count as live or imply equipment ownership without source. USV is one observation tool among several. |
| Company | Establish identity, governance, credentials and contact context | Approved company description/history, offices/organization, certifications, registrations/licenses, IP, brochures and careers | Certificates/registrations/IP are three separate groups. Verify validity and rights before showing scans. |
| News | Provide official announcements, press and newsletters | Three board groups, original ID/title/date/body/attachments | Never use invented posts, sample dates or inflated counts. Keep mock entries labelled as mock. |
| Contact | Make office and inquiry routes easy to verify and use | Current office addresses, contact details, inquiry and careers links | Do not show a successful submission unless network delivery exists; mock forms state that data was not sent. |

## Home story — eight stages

| # | Stage | Content payload | Evidence / guardrail |
|---:|---|---|---|
| 1 | Hero Film | GeoSR-wide identity and short value statement; 16:9 film slot/poster | Manifest `geosr-hero` is pending. Fallback is a designed preparation state, not a blank/error, fake map or fictitious output. |
| 2 | Field / Observation | Korean coastal, river, harbor, land survey, sample and instrument context | Prefer rights-cleared, source-backed, people-free assets. USV may appear, but not as the only method. |
| 3 | From Data to Understanding | Show how observations become interpretable environmental evidence | Use a single source-backed example with source and status. Do not add synthetic numbers or unlabeled data layers. |
| 4 | Technology / Capability | Introduce four research/service flows and link to all 21 records through the hub | Keep detailed catalog off the hero. Preserve exact names, IDs, categories and source URLs. |
| 5 | AX Platform | Explain Discover / Predict / Monitor and the actual platform applications | Actual preview or `ax-*` captured media only; don’t imply distinct products form one deployed end-to-end workflow. |
| 6 | GeoDAP | Introduce GeoDAP as an independent Earth Data Intelligence service | Current screenshot/version is unverified; use a source-approved capture and external link only. Never fold GeoDAP into AX. |
| 7 | Evidence | Selected business/research/academic posts and three credential groupings | Use rechecked records, original IDs and rights-cleared scans; label any design-only sample as a mock. |
| 8 | Company / Contact | Company scope, offices and direct inquiry path | Use approved company-wide copy (not GeoDAP’s tagline). Verify contacts and privacy/form behavior. |

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
