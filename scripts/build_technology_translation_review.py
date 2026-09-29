"""Source-bound corrections to the legacy English technology copy

The Korean record is canonical and is not modified
Only reviewed fields below replace the legacy English presentation
"""
import copy
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
records = json.loads((ROOT / 'dist/source-archive.json').read_text(encoding='utf8'))['records']
data = json.loads((ROOT / 'dist/business-details-data.js').read_text(encoding='utf8').split('=', 1)[1].rstrip(';\n'))
# Always derive edits from the immutable legacy source so regeneration is repeatable
for item in data.values():
    source = next(r for r in records if r['id'] == item['en']['sourceId'])
    introduction, rest = source['text'].split('Business Introduction', 1)[1].split('Our Technology', 1)
    skills, uses = rest.split('Applications', 1)
    for marker in ['\nTel.', '\nE-mail.', '\nBusiness PerformanceAcademic Performance', '\nBusiness Areas']:
        uses = uses.split(marker, 1)[0]
    item['en'].update(title=source['title'], lead=introduction.strip(), skills=[x.strip() for x in skills.splitlines() if x.strip()], uses=[x.strip() for x in uses.splitlines() if x.strip()])
updates = {}

def set_field(tech, field, value, reason):
    record = next(r for r in records if r['id'] == data[tech]['ko']['sourceId'])
    review = updates.setdefault(tech, {'sourceId': record['id'], 'sourceHash': record['sourceTextSha256'], 'fields': {}, 'reasons': []})
    review['fields'][field] = value
    review['reasons'].append(reason)

def replace(tech, field, old, new, reason):
    value = copy.deepcopy(updates.get(tech, {}).get('fields', {}).get(field, data[tech]['en'][field]))
    if isinstance(value, list):
        assert any(old in line for line in value), (tech, field, old)
        value = [line.replace(old, new) for line in value]
    else:
        assert old in value, (tech, field, old)
        value = value.replace(old, new)
    set_field(tech, field, value, reason)

replace('15', 'skills', 'green algae, red algae, and zooplankton', 'algal blooms and seagrass', '잘피 is seagrass and not zooplankton')
replace('15', 'uses', 'rivers and estuaries', 'rivers and lakes', '하천 호소 refers to rivers and lakes')
set_field('46', 'skills', [
    'Collection and processing of national observation network data and automated coupling between models',
    'Wave and hydrodynamic modelling together with sediment transport and water quality modelling',
    'Modelling river saltwater intrusion and the dispersion of thermal effluent and suspended sediment during construction',
    'Habitat suitability assessment and food-web-based ecosystem modelling'
], '국가관측망 does not name a groundwater information centre and construction context is retained')
replace('46', 'lead', 'meteorological, watershed, river, marine, ecological, and ecological models', 'meteorological, watershed, river, marine and ecological models', 'Remove duplicated ecological model category')
replace('46', 'lead', 'lakes and swamps', 'lakes', '호소 does not add a separate swamp category')
replace('46', 'uses', 'harmful algae', 'harmful cyanobacteria', '유해남조류 specifically refers to cyanobacteria')
replace('46', 'uses', 'tides, pollutant', 'tides and tidal currents, pollutant', 'Restore 조류 alongside 조석')
replace('48', 'lead', 'social conflicts with shareholders', 'social conflicts including those involving fishers', '어업인을 포함한 사회적 갈등 is not conflict with shareholders')
replace('48', 'skills', 'Authorized sea area utilization impact assessment agent', 'Registered sea area utilization impact assessment agent (No. 제평-003)', 'Retain registration number in Korean source without asserting current validity')
replace('50', 'lead', 'floating and settling marine debris', 'floating and deposited and shoreline-attached marine debris', 'Restore 수변부착 alongside floating and deposited debris')
replace('51', 'lead', 'saltwater plants', 'halophytes', '염생식물 are halophytes')
replace('53', 'lead', 'Coastal Erosion Monitoring\n', '', 'Repeated page title was included in the extracted introduction')
set_field('57', 'skills', [
    'Data processing including frequency filtering and gain correction and deconvolution and stacking and migration and inversion',
    'In-house automated data processing software',
    'High-resolution numerical modelling for surveys',
    'Attribute analysis',
    'Data interpretation including stratigraphy and seabed faults and anomalies'
], '중합 is stacking in seismic processing and not polymerization and all five Korean bullets are retained')
replace('57', 'lead', 'explores the geological features of deposits or bedrock by structure of a rock formation or bedrock by sending sound waves', 'investigates the structure of mineral deposits or bedrock by generating seismic waves', 'Repair duplicated clause and retain the geological target')
set_field('58', 'title', 'CCTV Image Processing and Analysis', 'Remove repeated CCTV suffix')
set_field('59', 'lead', 'The Ministry of Oceans and Fisheries has set six strategic priorities including stronger safety and the digital transformation of maritime and fisheries industries with a focus on shipping and ports and fisheries. Growing demand for aquaculture products is driving smart fisheries and the convergence of technologies. Big data and the Internet of Things and artificial intelligence are being applied to develop core technologies.\nGeoSR applies computer vision to footage captured underwater and from land near the water surface to detect marine organisms such as fish and jellyfish and harmful species. We support automatic warning systems for the Ministry and power plants and local governments as well as smart aquaculture monitoring and underwater ecosystem surveys and warnings for harmful organisms such as jellyfish and salps.\nWe continue to update image-based detection and tracking and attribute analysis to support prompt responses when urgent action is required.', 'Full translation from Korean restores six priorities and both camera settings and intended users omitted in legacy English')
set_field('59', 'uses', [
    'Support stable power plant operation through timely responses to harmful marine organisms',
    'Detect harmful marine organisms around water intakes to support preventive action',
    'Monitor stock status and commercial value in smart aquaculture facilities',
    'Support underwater ecosystem surveys of fish stocks around artificial reefs and harmful species and estimate biological resources',
    'Support jellyfish advisories and prevention of jellyfish stings at beaches'
], 'Retain all five Korean application statements without substituting ownership or invasive-species claims')
set_field('62', 'lead', 'GeoSR provides scientific information on environmental suitability and stakeholder acceptance for offshore wind development. Site information maps and assessment guidelines support decisions and help address conflicts between developers and local residents and the difficulties faced by local governments in mediating when objective information is lacking.\nWe produce site information maps using nine categories of marine use zones: fisheries protection zones and aggregate and mineral resource development zones and energy development zones and marine tourism zones and environmental and ecological management zones and research and education conservation zones and port and navigation zones and military activity zones and safety management zones. These are combined with marine environmental information including currents and waves and temperature and salinity and wind.', 'Full Korean translation restores nine categories and local-government mediation and corrects salinity mistranslated as conductivity')
set_field('62', 'uses', [
    'Combine environmental suitability and stakeholder acceptance information to identify offshore wind sites with fewer conflicts',
    'Provide baseline information and guidelines for offshore wind farm development',
    'Assess potential impacts of offshore wind development on the marine environment',
    'Support site selection that limits unplanned development and conserves marine ecosystems'
], 'Retain the four Korean applications separately')
set_field('64', 'lead', 'Conventional beach profile and topographic surveys require staff to work directly on site and can take considerable time and personnel. Surveys of cliffs and exposed or intertidal rocks also pose safety risks. GeoSR combines unmanned aerial vehicles with current sensors to build precise geospatial information while improving survey efficiency and staff safety.\nThe resulting geospatial data supports models for assessing compound coastal disaster risks and tailored disaster prevention measures. It is also used to document current coastal conditions and changes and to survey exposed and intertidal rocks and establish shoreline datasets.', 'Translate full Korean description without unsupported national-project claim and restore exposed and intertidal rock surveys')
replace('64', 'skills', 'Orthogonal imagery creation', 'Orthophoto production', '정사영상 is orthophotography and not orthogonal imagery')
replace('64', 'skills', 'National base map creation', 'Base map production', 'No national qualifier appears in Korean 기본도')
replace('65', 'lead', 'conductivity', 'salinity', '염분 is salinity')
replace('65', 'lead', 'Pacific Northwest', 'northwestern Pacific Ocean', '북서태평양 is the ocean region and not the Pacific Northwest of North America')
replace('65', 'skills', 'Pacific Northwest', 'northwestern Pacific Ocean', 'Correct regional name in capability list')

(ROOT / 'dist/technology-translations.en.json').write_text(json.dumps({'reviewedOn':'2026-09-28', 'scope':'Targeted semantic corrections against full Korean technology records', 'records': updates}, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
print(f'{len(updates)} source-bound technology corrections')
