# Screen review

Reviewed local rendered captures on 2026-09-29

## Required corrections

- `company-history-mobile-live.png`: single-column mobile history retains alternating year alignment from desktop; align all years to the left of their content column
- `business-detail-live.png`: AI introduction shows a coastal camera scene without an analysis result; use the approved fish detection and segmentation representative instead
- `home-expertise-live.png`: narrow satellite column crops out the subject and numerical-model column reads as landscape alone; preserve the important region in the collapsed composition and expose the complete context on hover and keyboard focus

Corrections sent to the site design owner; resolution requires new rendered captures

## Observed improvements

- QHD history uses a central axis and paired year columns with compact record rows
- Redundant record counts and repeated decade heading are absent in the inspected history capture
- Main expertise uses a shared heading band and consistent five-column media treatment

These observations do not establish final design acceptance or site-wide completion

## Reference interaction recheck

Hanwha Ocean `/whoweare/history/` was scrolled again in the browser at a verified CSS viewport of 1920 by 1080

- Full-width introductory cover carries the page title
- Era navigation remains visible as the visitor moves down
- An era title and initially narrow centered image precede the year records
- Continued scrolling expands that image to the full content viewport before the records
- GeoSR currently substitutes a static narrow banner and two navigation rows; that is a structural mismatch rather than a typography-only defect

Design owner instructed to implement the era image expansion and simplify the navigation while retaining all source records

## News comparison

Hanwha Ocean `/media/news/` was opened and visually reviewed alongside the complete GeoSR news capture

- Reference uses three columns of landscape article images with category and date below followed by a two-line title
- Search is right-aligned with an underline rather than a boxed control
- GeoSR currently renders both notices and press articles as the same table
- Keep the requested table for notices and large factual registers; implement the press category as the reference gallery using actual article images when available
- Do not manufacture article photographs to fill missing thumbnails
- Remove instructional introductory copy that merely says the visitor can search

This change is assigned to the design owner and still requires rendered verification

## Equipment and careers full-page review

The captured pages are 1920 CSS pixels wide; equipment is 3683 pixels tall and careers is 4429 pixels tall

- Both pages leave excessive separation between the introductory image and the working content
- Careers benefits occupy a very narrow single text column with fragmented line breaks, producing unnecessary vertical length
- Preserve all benefit wording but group complete semantic items in a responsive multi-column layout
- Careers should use a direct page title instead of the introductory phrase about fields and application methods
- Equipment should retain actual device images with contained framing; the full gallery is an appropriate structure and should not be replaced by invented device imagery
- `company-information.js` currently renders benefits with the same generic original-text function as other paragraphs; correcting only font size will not fix the grouping defect

Implementation assigned to the design owner; these captures are pre-fix evidence

## Business introduction interaction

Observed `/whatwedo/pf/` in the reference browser by successive scrolls

1. White introduction: left title and right short description with action
2. Initially inset image grows into an almost viewport-filling scene
3. Title and description appear in white over that image on the same alignment lines
4. Following content uses a simple three-column image-and-title product selection

GeoSR should adopt the introduction-to-image transition using its own media and concise technical descriptions. Technical records retain their full source material after the introduction. Do not add blank spacer sections as a substitute for the transition. A static title followed by an unrelated banner does not satisfy this structure

## Follow-up: mobile history

Reviewed `docs/screenshots/20260929-design-review/company-history-mobile-ko.jpg`

- Year headings now share a left alignment, resolving the earlier alternating alignment defect
- The capture shows 2015 and 2014 while the sticky era still highlights 2016 to present
- Current-era tracking requires correction and a new scroll-state check; zero horizontal overflow does not prove this behavior

## Follow-up media and introduction review

- Viewed `tmp/design-qa/tech61-reveal-end.png` at its saved FHD dimensions The image expansion and lower-left title are legible and do not cover the primary fish subjects This is evidence for this state only
- Viewed `docs/screenshots/20260929-design-review/home-expertise-qhd-ko.jpg` Laboratory imagery appears both in the preceding large panel and adjacent fifth card The transition needs a less repetitive media sequence The pale right-hand description in the title band needs stronger contrast
- Viewed `docs/screenshots/20260929-design-review/technology-water-model-mobile-ko.jpg` The saved state contains a separate model-flow diagram and a concept-image badge These contradict the requested media presentation if still present in runtime Assigned removal or refreshed evidence to the design owner
- Screenshot README still reports 19 captures while the folder has additional images Its list and evidence count need reconciliation after final capture

The seven existing Higgsfield clips have a separate verified inventory at `media-source/video-production-20260929/user-seven-verified.json` All are recorded as 1920 by 1080 Their recovery does not itself prove page placement or playback

## Runtime check 2026-09-29

- Recovered local preview server and confirmed company.html HTTP 200
- Opened company.html?lang=ko#company-records in the in-app browser
- Confirmed chronology has no decorative image in its rendered content
- Selected 2000—2005 and confirmed records from 2005 through company founding and research institute establishment in July 2000
- This check covers Korean period navigation only and does not certify typography at FHD/QHD or English parity
