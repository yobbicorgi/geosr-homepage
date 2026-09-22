> **역사 기록 — 현재 제작 지시 아님**
> 2026-09-22 [현재 인계 기준](../../redesign-next/00-START-HERE.md)으로 대체됨
> 아래의 완료·자체 점수·generationReady·모바일 제외·회사/AX 혼합 지시는 현재 승인으로 사용하지 않음
> 원본 근거와 실패·검수 이력만 보존

---

# Corporate film C08 — underwater observation keyframe

Status: **composition study only — rejected for final equipment fidelity**. The generated study was discarded from the repository; its SHA-256 is retained here as provenance. It is not a website or final-film asset. See [the equipment accuracy gate](../EQUIPMENT-ACCURACY-GATE.md).

## Rejected study provenance

- Artifact status: discarded from repository; hash retained in record. Not for production.
- Size: 2560 × 1440 px, 16:9 PNG (the ImageGen source was 1672 × 941; the final was cropped by one bottom pixel and high-quality resized to the requested canvas).
- Built with the built-in ImageGen tool using local equipment references, then refined for physical scale. Generated source: `C:\Users\user\.codex\generated_images\01a0b9f9-07be-79b2-bad3-cdf72bc8d560\exec-b1ca87d2-bb43-46be-9697-ad23419f279c.png`.
- SHA-256: `DAF0925A74ECFF5257E995434D201BF0EAD7F445D7821BF78C257CB0568E1650`. Intermediate candidates remain only in the generated-images cache; the generated study was discarded from the repository; its SHA-256 is retained above.
- This is a generated concept frame. It does not document or assert a real site, deployment, or equipment combination.

## Official source review

| Equipment | Official source | Local ImageGen reference | Visual check and limit |
|---|---|---|---|
| BlueROV2 | [GeoSR equipment detail](https://www.geosr.com/en/sub/equipment/surveying.asp?bid=38&idx=2895&mode=view&page=1&s_addtext2=&s_cate=&s_keyword=&s_type=); [GeoSR image](https://www.geosr.com/upload/thumb/BlueRov.png) | `dist/assets/equipment-rov.png` | Visually checked; manifest records that its SHA-256 matches the official image. Official detail names BlueROV2. The GeoSR evidence does not establish that a Heavy / eight-thruster unit was deployed in this scene. |
| RBR Solo-TU | [GeoSR equipment detail](https://www.geosr.com/sub/equipment/investigation.asp?mode=view&bid=13&s_type=&s_keyword=&s_cate=&s_addtext2=&idx=1246&page=1); [GeoSR image](https://www.geosr.com/upload/thumb/10.%20%EC%88%98%EC%98%A8%EA%B3%84%28RBR%20Solo-T%29.png) | Temporary local reference used: `C:\Users\user\AppData\Local\Temp\geosr-redesign-qa\official-rbr-solo-tu.png` | Visually checked as an independent yellow/red cylindrical logger. The official evidence confirms equipment and purpose, not its placement on a particular mooring line. |
| Eight-thruster configuration reference | [BlueROV2 assembly guide — Heavy layout](https://bluerobotics.com/learn/bluerov2-assembly/) | Text reference only | The official guide distinguishes Heavy configuration. The generated keyframe uses this layout because the shot brief requires eight thrusters; it does not claim GeoSR’s deployed configuration. |

Official product image reuse and derivative rights remain unconfirmed. The prompt used the provided local copies only as geometry references; the generated frame omits brand text and logos.

## Prompt record

### Base scene prompt (English, submitted to ImageGen)

> Create one highly realistic underwater documentary photograph as a Korean environmental-observation film concept keyframe at 48 seconds (C08). This is a generative concept only; it does not depict or claim a specific real deployment location.
>
> Use the two inputs strictly as separate equipment references:
> - Reference 1: the GeoSR-official BlueROV2 product image. Render the BlueROV2 Heavy eight-thruster configuration, preserving the actual compact black square frame, blue flotation panels, cylindrical electronics housings, one centered front camera dome and two front lights. Do not copy the frontal catalog view; show the vehicle from a front-left three-quarter view, slightly above eye level, so the square frame has visible depth and does not look like a long flat rectangle.
> - Reference 2: the GeoSR-official RBR Solo-TU sensor. Use only the small yellow cylindrical body and red end-cap form. It is a separate instrument attached only to the mooring rope by a small independent clamp.
>
> Underwater scene: natural, nearshore Korean coastal water in muted green-blue hues, a modest amount of fine suspended particles, gentle ambient daylight filtering from the surface. No identifiable land, structures, or location-specific features. A taut dark mooring rope descends vertically through the right third from the top edge. The independent small yellow/red cylindrical logger is clamped to this rope around mid-height. A BlueROV2 Heavy inspects alongside the rope at a believable distance, filling about one third of the frame left of center. Keep visible open water between ROV and rope/logger so they are clearly independent. The entire ROV is in frame, with the camera dome and two neutral-white lights facing slightly toward the viewer. No tether is visible.
>
> Exact BlueROV2 Heavy geometry is essential: a near-square open aluminum frame, four vectored horizontal T200 thrusters at the four corners of the frame, and four additional vertical T200 thrusters installed upright for the Heavy configuration. Show exactly eight distinct thruster units, each visibly attached in a plausible position; use the official Heavy arrangement rather than a generic submarine layout. In this elevated three-quarter view, all eight should be individually readable as separate propeller/duct assemblies. The single front camera is centered; the only two front lights are neutral-white. No other cameras, no lights on the mooring sensor, no extra payloads, no manipulator arms, sonar, or invented hardware.
>
> Keep physically believable dimensions and relative scale: BlueROV2 about 45 cm wide, Solo-TU about 24 cm long. The sensor remains clamped only to the mooring rope and is never connected to or touching the ROV. If the seabed appears, keep it distant and plain with sand, small gravel, and only sparse low seaweed.
>
> Lighting is natural water light plus soft neutral light from the two ROV front lamps. Realistic underwater color attenuation and subdued backscatter; restrained, calm, observational mood; natural equipment materials, no stylization. Wide landscape 16:9 film frame, suitable for 2560x1440, with enough right-side breathing room around the line-mounted cylinder for a later C09 close-up match cut. No title or blank graphic panel.
>
> Exclude people, hands, divers, silhouettes, fish, coral, tropical life, shipwrecks, deep-sea creatures, seabed structures, fictional instruments, wrong ROV model, six-thruster vehicle, fewer or more than eight thrusters, hidden/duplicated/floating thrusters, extra cameras, extra payloads, sensor mounted to the ROV, fused equipment, bright electric-blue neon, laser effects, grids, HUD, data lines, charts, interface graphics, letters, labels, numbers, logos, watermark, or generated text.

### Final scale refinement prompt (English)

> Refine the generated underwater scene while preserving its water, rope position, seabed, lighting, and BlueROV2 Heavy design. Keep the logger independently clamped to the rope and the ROV separate. Preserve the open square frame, blue flotation, one centered forward camera, two neutral-white front lamps, and exactly eight distinct thrusters in the Heavy layout (four vectored horizontal around the frame corners and four upright vertical). Do not add or remove equipment. Make only a modest perspective-scale adjustment: the ROV is in the midground and slightly farther away/smaller; the line-mounted logger is somewhat nearer and larger, giving an image-size ratio near one-half consistent with a 45 cm vehicle width and 24 cm sensor length at different distances. Keep both fully in frame and leave breathing room around the logger for a later C09 close-up match cut. Exclude humans, text, logos, extra equipment, fish, coral, wrecks, HUD, grids, data lines, and neon.

## Historical visual review (does not override the equipment-fidelity rejection)

- Final canvas is 2560 × 1440 and 16:9; key subjects remain inside frame.
- Water is muted green-blue with modest suspended particles and natural ambient light; neutral ROV lamps are the only artificial light.
- Mooring line enters from the top at right; the yellow/red cylinder is visibly clamped to the line and separated by open water from the ROV.
- The image shows a compact square-cage BlueROV2 Heavy-style concept with a centered front camera, two front lamps, and eight visually represented thruster units. Generated geometry remains illustrative and is not technical proof of a specific deployed configuration.
- Visible seabed is limited to ordinary sand/gravel and low seaweed; no person, hand, diver, fish, coral, wreck, text, logo, watermark, HUD, or neon effect was seen.
- The line-mounted sensor has clear surrounding space for the C09 lab close-up match cut.
