# R7 asset direction

Scope: the four active homepage expertise scenes in `site/dist/home.js`, plus the recent generated-image set. No site code or image files were changed.

Hard gate: every expertise visual must contain no people, hands, faces, silhouettes, or crew. Use equipment, samples, terrain, water, maps, and data overlays as the subjects.

| Current expertise scene | Decision | Why | Implementation-ready direction and fact constraints |
|---|---|---|---|
| `assets/coastal-survey-source.png` — Observation & survey | **Retain** | Real source coastline with no people; clear land–water boundary, beach, road, and breakwater anchor field observation | Keep as the field reference. For a future replacement or companion, use an unmanned survey vessel, shore profile, or survey instrument with no operator. Do not imply measured bathymetry, survey date, or named location without the source record. |
| `assets/analysis-concept.png` — Environment & ecology | **Replace** | Visible blue-gloved hand violates the no-people rule; pipette scene is generic and does not communicate seawater, plankton, or biological sampling | Use an object-only laboratory or sampling still: sealed seawater bottles, CTD/Niskin sampler, plankton net, filters, sample tray, or microscope slides. Keep the experimental lab lighting and shallow depth of field. Do not show species, concentrations, test results, or an analysis method unless verified. |
| `assets/coastal-model-v3.png` — Modelling & prediction | **Retain as concept, with caution** | No people and a readable model transition, but the mesh/flow overlay is synthetic and repeats the coastal motif | Extend the same visual language to a verified land–river–estuary base scene: fixed terrain and water masks, one clearly named variable layer, restrained mesh or flow marks. Treat it as a modelling concept only; no real result, location, resolution, or forecast claim. Water must not cross land or structures. |
| `assets/satellite-layers-v3.png` — AI & remote sensing | **Retain as concept, with caution** | No people and communicates multi-layer remote sensing at a glance | Keep layers aligned to one verified footprint when implemented. Label temperature, surface salinity, chlorophyll, or another variable only when the sensor/product is confirmed. This image is symbolic: do not present its satellite, coastline, colors, dates, or layers as actual observations. |

## Recent generated-image gate

- Reject `exec-75b68517-a568-4ff1-93d8-fbdae18785b8.png`, `exec-a0ef5a7e-14e3-4381-8063-13b6b14ff45c.png`, and `exec-3c3a64a1-3729-4668-b8f6-71d4cf222d27.png`: visible people or hands
- `exec-2298ee63-9ba2-43f1-9230-11d0c87064b6.png` is the strongest land/river composition reference, but its generated geography is unverified and must not ship as a map or project result
- `exec-160efecb-69f0-45a3-b437-1c71f17ac57e.png` is a useful no-people seawater/vessel composition reference; its contour overlay remains concept-only
- The remaining generated coast, mesh, and satellite variants are style references only. Avoid turning glowing lines into a universal visual language or treating generated coastlines and numeric-looking overlays as data

Source constraints: follow `MEDIA-QUALITY.md` for geography, equipment, physical quantities, observation-versus-interpretation labeling, and identical-coordinate map layers. Generated imagery remains `연출 가안` until source, geography, and claims are verified.
