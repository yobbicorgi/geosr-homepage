# Migration coverage report

Capture: 8239 in-scope page URLs; 513 asset references.
Source-language URL rows: `{"ko": 7329, "en": 910}`. Korean text is retained in `source_text_ko_preserved`; non-Korean visible text is stored as `source_text_original` and is not used as Korean-copy evidence.

## What the captured URL rows mean

The archive contains **8,239 fetched URL rows**, not that many unique articles. Archive normalization yields 8,120 query-order-insensitive URL forms (119 rows differ only by parameter ordering). This is not a server-declared canonical count; the capture does not include `rel=canonical` tags. The captured visible text has 2,095 unique SHA-256 body hashes; 6,144 rows repeat a prior body across 999 duplicate-body groups. Board `mode=view` appears 7,792 times, `mode=list` 279 times, and `page` appears in 8,060 URLs. There are 2,010 distinct `idx` values across 18 board/path pairs. This should be treated as a query/pagination archive rather than an article count. The capture includes exact visible-text hashes only, not hidden script content or image text.

## Public source route coverage

| Route group | Korean label | Retrieved URLs |
|---|---|---:|
| `achieve` | 실적·연구 | 2,136 |
| `business` | 사업 | 50 |
| `career` | 채용 | 2 |
| `company` | 회사 | 8 |
| `equipment` | 장비 | 194 |
| `home` | 홈 | 3 |
| `news` | 소식 | 5,844 |
| `policy` | 정책 | 2 |

Fetched page response states: `{"200": 8239}`. Error/utility-only page count: `0`. Route/filter URLs without `mode`, `bid`, `idx`, or `page` context: `118`.
Exact duplicate page-body groups: 999. Exact duplicate downloaded-asset groups: 0.

## Largest paths and board IDs

| Path | Korean label | URLs |
|---|---|---:|
| `/sub/news/notice.asp` | 공지사항 게시판 | 5,683 |
| `/sub/achieve/busines.asp` | 사업실적 게시판 | 701 |
| `/sub/achieve/academic.asp` | 학술활동 게시판 | 562 |
| `/en/sub/achieve/busines.asp` | 사업실적 게시판 (영문) | 449 |
| `/en/sub/achieve/academic.asp` | 학술활동 게시판 (영문) | 260 |
| `/sub/news/press.asp` | 보도자료 게시판 | 160 |
| `/sub/achieve/research.asp` | 연구성과 게시판 | 93 |
| `/en/sub/achieve/research.asp` | 연구성과 게시판 (영문) | 71 |
| `/sub/equipment/surveying.asp` | 측량 장비 | 51 |
| `/en/sub/equipment/surveying.asp` | 측량 장비 (영문) | 49 |

Board inventory (IDs are source-site `bid` values; counts include list and detail query variants):

| Route | Korean label | bid | URLs | List | Detail | Distinct idx |
|---|---|---:|---:|---:|---:|---:|
| `/en/sub/achieve/academic.asp` | 학술활동 (영문) | `36` | 255 | 24 | 231 | 231 |
| `/en/sub/achieve/busines.asp` | 사업실적 (영문) | `34` | 448 | 42 | 406 | 406 |
| `/en/sub/achieve/research.asp` | 연구성과 (영문) | `35` | 70 | 8 | 62 | 62 |
| `/en/sub/equipment/biological.asp` | 생물조사 장비 (영문) | `41` | 3 | 1 | 2 | 2 |
| `/en/sub/equipment/experiment.asp` | 실험 장비 (영문) | `42` | 11 | 1 | 10 | 10 |
| `/en/sub/equipment/investigation.asp` | 해양·현장조사 장비 (영문) | `39` | 25 | 4 | 21 | 21 |
| `/en/sub/equipment/ship.asp` | 조사 선박 (영문) | `43` | 4 | 1 | 3 | 3 |
| `/en/sub/equipment/surveying.asp` | 측량 장비 (영문) | `38` | 48 | 6 | 42 | 42 |
| `/sub/achieve/academic.asp` | 학술활동 | `16` | 515 | 60 | 455 | 231 |
| `/sub/achieve/busines.asp` | 사업실적 | `15` | 658 | 69 | 589 | 406 |
| `/sub/achieve/research.asp` | 연구성과 | `22` | 92 | 10 | 82 | 82 |
| `/sub/equipment/biological.asp` | 생물조사 장비 | `20` | 3 | 1 | 2 | 2 |
| `/sub/equipment/experiment.asp` | 실험 장비 | `14` | 11 | 1 | 10 | 10 |
| `/sub/equipment/investigation.asp` | 해양·현장조사 장비 | `13` | 25 | 4 | 21 | 21 |
| `/sub/equipment/ship.asp` | 조사 선박 | `21` | 4 | 1 | 3 | 3 |
| `/sub/equipment/surveying.asp` | 측량 장비 | `18` | 50 | 6 | 44 | 44 |
| `/sub/news/notice.asp` | 공지사항 | `1` | 5,682 | 34 | 5,648 | 333 |
| `/sub/news/press.asp` | 보도자료 | `2` | 159 | 6 | 153 | 51 |

## Pagination and dynamic archive

Query-driven page sequences discovered:

- `/en/sub/achieve/academic.asp` `page`: 12 values (1, 10, 11, 12, 2, 3, 4, 5, 6, 7, 8, 9)
- `/en/sub/achieve/busines.asp` `page`: 21 values (1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 2…)
- `/en/sub/achieve/research.asp` `page`: 4 values (1, 2, 3, 4)
- `/en/sub/equipment/biological.asp` `page`: 1 values (1)
- `/en/sub/equipment/experiment.asp` `page`: 1 values (1)
- `/en/sub/equipment/investigation.asp` `page`: 2 values (1, 2)
- `/en/sub/equipment/ship.asp` `page`: 1 values (1)
- `/en/sub/equipment/surveying.asp` `page`: 3 values (1, 2, 3)
- `/sub/achieve/academic.asp` `page`: 12 values (1, 10, 11, 12, 2, 3, 4, 5, 6, 7, 8, 9)
- `/sub/achieve/busines.asp` `page`: 21 values (1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 2…)
- `/sub/achieve/research.asp` `page`: 5 values (1, 2, 3, 4, 5)
- `/sub/equipment/biological.asp` `page`: 1 values (1)
- `/sub/equipment/experiment.asp` `page`: 1 values (1)
- `/sub/equipment/investigation.asp` `page`: 2 values (1, 2)
- `/sub/equipment/ship.asp` `page`: 1 values (1)
- `/sub/equipment/surveying.asp` `page`: 3 values (1, 2, 3)
- `/sub/news/notice.asp` `page`: 17 values (1, 10, 11, 12, 13, 14, 15, 16, 17, 2, 3, 4…)
- `/sub/news/press.asp` `page`: 3 values (1, 2, 3)

## Local 21-solution index comparison

Status counts: `{"represented": 21}`.

| Local ID | Korean title | Status | Official page evidence |
|---|---|---|---|
| `solution-15` | 하구·하천 과정 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-46` | 수환경 통합모델링 | `represented` | [1](https://www.geosr.com/sub/achieve/academic.asp), [2](https://www.geosr.com/sub/achieve/academic.asp?bid=16&s_type=&s_keyword=&s_cate=&s_addtext2=&mode=list&page=1) |
| `solution-47` | 해양공간계획 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-48` | 해역이용협의 및 해역이용영향평가 | `represented` | [1](https://www.geosr.com/sub/achieve/academic.asp), [2](https://www.geosr.com/sub/achieve/academic.asp?bid=16&s_type=&s_keyword=&s_cate=&s_addtext2=&mode=list&page=1) |
| `solution-84` | 해양생태계 보전 및 모니터링 | `represented` | [1](https://www.geosr.com/sub/achieve/academic.asp), [2](https://www.geosr.com/sub/achieve/academic.asp?bid=16&s_type=&s_keyword=&s_cate=&s_addtext2=&mode=list&page=1) |
| `solution-50` | 해양쓰레기 및 미세플라스틱 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-51` | 살아 숨 쉬는 연안 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-52` | 생태계・적조・비브리오균・대장균 모델링 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-53` | 연안침식 모니터링 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-54` | 연안재해 감시 및 취약성 평가 | `represented` | [1](https://www.geosr.com/sub/achieve/academic.asp), [2](https://www.geosr.com/sub/achieve/academic.asp?bid=16&s_type=&s_keyword=&s_cate=&s_addtext2=&mode=list&page=1) |
| `solution-55` | 재해·재난 예측 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-56` | 인공위성 영상 처리 및 분석 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-57` | 탄성파탐사 자료처리 자동화 기술 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-58` | CCTV 영상 처리 및 분석 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-59` | 영상기반 해양생물 탐지 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-60` | 빅데이터 구축 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-61` | 인공지능 활용기술 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-62` | 해상풍력 디지털 입지정보도 구축 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-63` | 무인선 이용 관측 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-64` | 무인항공 사진측량 및 무인항공 LiDAR측량 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |
| `solution-65` | 실시간 해양예측시스템 | `represented` | [1](https://www.geosr.com/), [2](https://www.geosr.com/sub/achieve/academic.asp) |

`represented` means the exact local Korean title was found in captured official visible text; it does not approve copied body text or translation. `missing` means no exact title and no same numeric query ID was found. Candidate ID matches without an exact title require verification.

## Asset and publication review

Asset status counts: `{"not_fetched": 478, "requires_human_privacy_review": 1, "downloaded": 32, "404": 2}`.
Robots-disallowed asset references: 471. They were recorded but not fetched.
Personal/contact-review page flags: 8239. This conservative phone/email scan matched the shared site contact footer on all page rows. Captured visible text contains 86 distinct email strings and 44 distinct phone strings; their business/personal status is unverified, so the exact-source archive is not approved as direct publication copy. Three ID-shaped matches were DOI suffixes, with no such match outside DOI context. Credential scans and people-specific media are not approved for reuse by this archive.
First-party broken internal page links with fetched error responses: 0.

## Korean source text versus current UI copy

The copy provenance inventory contains 292 current Korean UI strings: 29 exact source matches and 263 newly authored or translation-unverified strings. See `ui-copy-provenance.csv` and `.json`; the original source text in `pages.jsonl` is not rewritten.

## Prior inventory comparison and limitations

The local `dist/content.json` index contains 21 official-title candidates and is compared item by item above. The 2026-09-19 `SOURCE-INVENTORY.md` records 5 equipment groups from a historical source capture; the current official route inventory is authoritative for this crawl. Any category-count disagreement is a re-verification item, not an assumption that historical values are current. Do not publish credential images, personal/contact details, generated concepts, or source copy without the documented currentness, rights, and privacy checks.

## Access boundaries

The crawler follows robots.txt, uses TLS verification, and limits sequential request rate. `/upload/` and `/site/` are disallowed and are not fetched. External domains are recorded as references only. Any 404, certificate error, dynamic-only interaction, or cap reached is recorded in `pages.jsonl`, `assets.jsonl`, and `request-log.jsonl`.


## Non-page request outcomes

The 2 HTTP 404 responses were sitemap discovery probes (`sitemap.xml` and `sitemap_index.xml`), not page-route failures. The 2 initial non-ASCII asset request attempts failed before URL encoding was fixed; the Korean company brochure was later downloaded successfully, while the public CV/resume HWP template remains inventoried but intentionally not downloaded because it can collect personal data. These do not affect the drained first-party HTML frontier.