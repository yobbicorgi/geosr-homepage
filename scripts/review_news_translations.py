#!/usr/bin/env python3
"""Apply source-checked editorial corrections to the separate news overlay."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
def source_urls(text):
    # Korean particles and closing parentheses belong to the sentence not URL
    return [re.split(r'[가-힣]', value)[0].rstrip(').,]') for value in re.findall(r'https?://[^\s<>"\']+', text)]
PREFIX = "[Jae-hak Lee's Ocean Stories] "
COLUMNS = {
    2953: (11, "Salt as a gift from the sea — Sustaining human civilization ecosystems and the global climate"),
    3072: (19, "The Drake Passage as a graveyard for ships and an ideal laboratory for scientists"),
    1954: (None, "Dark oxygen challenges scientific understanding — The deep sea still holds many mysteries"),
    3071: (18, "Tuvalu faces the threat of disappearing — Sea level rise as an old future"),
    2968: (15, "The ocean is losing its green — A warning from phytoplankton as a shield against warming"),
    3070: (17, "Tides that move the sea — The cosmic order shaped by the Earth Sun and Moon"),
    2955: (13, "Marine heatwaves are the ocean's SOS — A factor behind extreme heat"),
    2969: (16, "Those who control the paths of information and science beneath the sea control the world"),
    3082: (21, "El Nino can reshape societies — Expected to strike worldwide later this year"),
    2954: (12, "Economic opportunities and a climate warning — The two sides of Arctic shipping routes"),
    1959: (2, "Ocean currents and the discovery of new sea routes at turning points in world history"),
    2967: (14, "The immense barrier of pressure that stands in the way of deep-sea exploration"),
    2015: (6, "Dynamic ocean motion paints an ever-changing picture on the sea surface"),
    3083: (22, "Forget the Jaws of the movies — Marine animals as partners in science"),
    1998: (3, "Global warming weakens Earth's thermohaline circulation conveyor belt"),
    1961: (3, "The ocean as a climate regulator behind this summer's record heatwave"),
    2020: (7, "Upwelling and downwelling — Ocean rhythms created by Earth's rotation and the wind"),
    2938: (8, "A force that can immobilize submarines — Internal waves as the ocean's hidden helpers"),
    3073: (20, "Even shells are dissolving — Ocean acidification threatens a safe planet"),
    3084: (23, "Waves remember the wind — A turbulent life is the swell left by time"),
    2939: (9, "Satellites and autonomous floats transform ocean observation"),
    2004: (5, "Research vessels are the starting point for maritime powers — Private foundations in advanced nations are joining in"),
    2952: (10, "The deep sea remains less explored than outer space — Now a stage for international competition"),
}

NAMES = {"심정은":"Jeong-eun Sim","김수민":"Su-min Kim","배태일":"Tae-il Bae","정기준":"Gi-jun Jeong","최한얼":"Han-eol Choi","김귀남":"Gwi-nam Kim","구정본":"Jeong-bon Gu","박종집":"Jong-jib Park","장인권":"In-gwon Jang","이호영":"Ho-young Lee","김태하":"Tae-ha Kim","김무건":"Mu-geon Kim","박철규":"Cheol-gyu Park","황소연":"So-yeon Hwang","장경일":"Kyung-il Jang","이정현":"Jeong-hyeon Lee","이효진":"Hyo-jin Lee","박종규":"Jong-gyu Park","오형민":"Hyeong-min Oh","최정길":"Jeong-gil Choi","강태순":"Tae-soon Kang","송용식":"Yong-sik Song","유호준":"Ho-jun Yoo","황순미":"Soon-mi Hwang","이원호":"Won-ho Lee","우준식":"Jun-sik Woo","손영태":"Yeong-tae Son","최민범":"Min-beom Choi","김태인":"Tae-in Kim","전형석":"Hyeong-seok Jeon","전찬웅":"Chan-woong Jeon"}
ROLES = {"선임":"Senior Researcher","전임":"Associate Researcher","책임":"Principal Researcher","수석":"Chief Researcher","부장":"General Manager","차장":"Deputy General Manager","이사":"Director","부회장":"Vice Chairman","대표이사":"CEO","고문":"Advisor"}
TITLE_OVERRIDES = {
    219: 'Korea produces and distributes its first portable nautical charts',
    226: 'Research cooperation for the deep ocean water industry',
    218: 'KHOA identifies the need to improve marine information services',
    254: 'GeoSR featured in Future Competitiveness of Korea Inc',
    258: 'Supreme Court allows Saemangeum project to continue in government victory',
    248: 'Saemangeum seawall closure to be completed in April',
    266: 'Reclamation for the New Port South Container Terminal gets back on track',
    262: 'New Port South Container Terminal construction faces prolonged delays',
    437: 'GeoSR selected for the Gyeonggi Small and Medium Enterprise Awards',
    1885: 'GeoSR leads marine services and expands its research and development achievements',
    1964: 'GeoSR selected in the inaugural Work-Life Balance Outstanding Company program',
    1965: 'GeoSR selected in the inaugural Work-Life Balance Outstanding Company program',
    1692: 'Understanding Ocean Dynamics through Q&A published and shared as a file',
    382: 'KHOA supports marine disaster prevention in developing countries',
    350: 'GeoSR receives Inno-Biz certification with an Aa rating',
    325: 'GeoSR obtains ISO 9001 certification',
    324: 'GeoSR CEO Hong-seon Kim receives an award from the Minister of Oceans and Fisheries',
    316: 'Mainland China struggles with water shortages',
    336: "Documentary on global warming based on Al Gore's lectures",
    296: 'Tensions grow between fishermen and the fisheries ministry over the South Sea aggregate extraction complex',
    302: 'Environment Minister Lee opposes further tidal flat reclamation',
    340: 'Tributaries of Sihwa Lake turn black — Fears over human damage',
}
MOF = "a commendation from the Minister of Oceans and Fisheries"
AWARDS = {
    3069: MOF, 2978: MOF, 2977: MOF, 2951: MOF, 2001: MOF, 2000: MOF, 1944: MOF, 1943: MOF, 1945: MOF, 493: MOF, 484: MOF, 1583: MOF, 477: MOF, 475: MOF,
    1941: "a commendation from the President of the National Institute of Fisheries Science",
    1581: "a commendation from the Director General of the Korea Hydrographic and Oceanographic Agency",
    1586: "a commendation from the Director General of the Korea Hydrographic and Oceanographic Agency",
    465: "a commendation from the Director of the Mokpo Regional Office of Oceans and Fisheries",
    450: "an award from the Minister of Employment and Labor",
    486: "a commendation from the Minister of Science and ICT",
    491: "the Outstanding Reviewer Award from the Korean Society on Water Environment",
    1582: "the Outstanding Paper Award from the Korean Society of Coastal Disaster Prevention",
    1587: "the Outstanding Paper Award from the Korean Society of Coastal Disaster Prevention",
    487: "the Outstanding Paper Award from the Korean Society of Coastal Disaster Prevention",
    1589: "a paper award at the Korean Society of Coastal Disaster Prevention conference",
    474: "the Academic Award from the Korean Society of Coastal Disaster Prevention",
    1590: "the Achievement Award from the Korean Society of Protistologists",
    1960: "the Technology Award from the Korean Society of Ocean Engineers",
    1585: "the Outstanding Paper Presentation Award from the Korean Society of Ocean Engineers",
    488: "the Marine Civil Engineering Academic Award from the Korean Society of Ocean Engineers",
    489: "the Seobung Technology Award from the Korean Society of Oceanography",
    1584: "an Encouragement Award from the Korean Society for Marine Environment and Energy",
    1588: "a certificate of appreciation from Hanyang University",
    2980: "a plaque of appreciation from Korea Marine Environment Management Corporation",
    481: "a plaque of appreciation from the President of Korea Marine Environment Management Corporation",
    478: "a commendation from the President of Korea Marine Environment Management Corporation",
    490: "a commendation from the President of Korea Marine Environment Management Corporation",
    479: "a commendation from the President of Korea Marine Environment Management Corporation",
    485: "a commendation from the Minister of Environment",
    482: "a commendation from the Minister of Environment",
}

COMPLETE_OVERRIDES = {
    219: ('Korea produces and distributes its first portable nautical charts', '''Korea's first pocket charts that individuals can carry with them are being produced.
The Korea Hydrographic and Oceanographic Agency (Director General Jong-rok Park) announced on the 3rd that it would produce portable charts for five major ports with heavy vessel traffic: Incheon Busan Ulsan Gwangyang and Pohang. Distribution would begin free of charge early that month.
The front of each chart lists important port information including operating rules emergency call numbers coastal distance tables and tidal forecasts. The reverse carries a chart of the port. Printed on A3 paper the charts can be folded for easy carrying and consulted during navigation.
An agency representative said the charts would give navigators and maritime and fisheries personnel convenient access to port information anywhere and at any time. Following user feedback the program would expand to Korea's 28 trade ports and 23 coastal ports.
The charts will be distributed free to navigators and maritime and fisheries personnel through regional maritime and fisheries offices shipping associations fisheries cooperatives pilots' associations and shipping companies.
Reporter Beom-jin Baek (blog) bjpaik'''),
    241: ('Ministry develops an integrated port construction information system', '''Port construction information system to improve transparency
Online planning design construction and supervision
The integrated Port Construction Information System (PortCIS) is expected to improve transparency and fairness throughout port construction by digitizing project information.
The Ministry of Oceans and Fisheries announced on the 17th that development would begin that year. Clients designers contractors and other project participants would exchange and share all documents and drawings generated throughout the project life cycle from planning and design through construction supervision and maintenance.
Its main functions include project management for port master plans budgets contracts and completion of construction and consulting services; construction management for schedules and progress payments; and preparation and management of documents and drawings transmitted online.
It also provides status reports and statistics on project implementation using search criteria and a document search for design documents associated with port construction and consulting services.
Digitizing information previously exchanged by hand or post will allow it to be shared online. This will help prevent damage to or loss of valuable drawings and make storage and retrieval easier.
Sharing and reusing information and reducing transmission and storage costs are expected to improve productivity. Disclosure of information will also support fairness and transparency in construction.
The ministry plans to establish or revise relevant rules including operating regulations and provide training and publicity to encourage efficient operation and early adoption.'''),
    190: ('Recruitment notice for new employees', '''1. Marine numerical modeling positions for entry-level and experienced applicants
Responsibilities
- Numerical modeling of circulation waves water quality ecosystems sedimentation and dispersion in rivers lakes estuaries coastal waters and the ocean
Relevant disciplines
- Oceanography meteorology ocean engineering civil engineering environmental engineering and other fields related to these responsibilities
- A master's degree or higher an engineer qualification or proficiency in foreign languages is preferred
Required documents
- One copy each of a resume with a photograph a personal statement and academic transcripts
- Submit by post or email
Submission details
- Contact: Manager Mu-rak Song Business Administration Department
- Address: Room 306 Hallym Human Tower 1-40 Geumjeong-dong Gunpo-si Gyeonggi-do 435-824
- Telephone: 031) 423 - 8088
- Email: mrsong@geosr.com
Selection procedure
- First stage document screening second stage interview third stage medical examination
Application period
- No deadline — applications accepted on an ongoing basis
Salary
- Annual salary to be negotiated'''),
    198: ('Cultured pearl production using thermal discharge from a nuclear power plant', '''Busan Regional Office of Oceans and Fisheries conducts Korea's first pearl nucleus insertion trial using this approach
A pilot project to produce cultured pearls using warm water discharged from a nuclear power plant is moving forward.
The Busan Regional Office of Oceans and Fisheries announced on the 21st that it had carried out nucleus insertion in cultivated pearl oysters after Korea's first successful pearl oyster cultivation trial using thermal discharge from a nuclear power plant.
The procedure involved 5000 pearl oysters about 7 cm long that had undergone grow-out and overwintering trials in 2003 using thermal discharge in the Daebyeon waters of Gijang-eup and the Wolnae waters of Jangan-eup in Gijang-gun Busan.
The procedure was carried out at a farm in Tongyeong Gyeongsangnam-do in July after conditioning including induced spawning through temperature stimulation and water depth adjustment.
The oysters with inserted nuclei will return to Wolnae waters the following month for overwintering. Pearl formation takes about one year and harvest is expected around October of the following year.
The office plans to disseminate the cultivation technology to provide an additional income source for farmers who mainly cultivate sea mustard kelp and other seaweeds.
Busan — Reporter Gi-hyeon Kim'''),
    209: ('Real-time maps of seawater circulation around Yeosu become available online', '''Real-time seawater current observations provided online for the first time
The Korea Hydrographic and Oceanographic Agency (Director General Jong-rok Park) announced that seawater circulation around Yeosu would be available online at http://www.nori.go.kr from October 19.
The many islands around Yeosu Bay create complex geography. Currents vary greatly over time and space with typhoons and river inflow. Increasing cargo volumes at coastal industrial complexes such as Gwangyang Steel Works also produce frequent vessel traffic making real-time current information essential.
Four coastal HF radars observe circulation over the broad area from Yeosu Bay to the waters around Namhae Island.
HF radar transmits high-frequency radio waves from land stations and observes surface currents using the phase difference in the reflected signal. It enables continuous observation even during adverse weather such as typhoons.
An agency representative expected the service to improve port traffic control and contribute to the safety of navigating and fishing vessels oil spill response and measures to address the spread of red tides.'''),
    251: ('Korean coastal disaster prevention policy introduced overseas', '''Coastal surge warning system selected as an exemplary February policy and featured in an English-language magazine
The Korea Hydrographic and Oceanographic Agency's project to establish a warning system to reduce coastal surge damage was a priority task in 2005. It was featured internationally in the February issue of Korea Policy Review an English-language government policy magazine.
The article covers the agency's coastal disaster prevention policy including comprehensive and systematic monitoring of ocean-related natural hazards such as storm surges and tsunamis sharing observational information and promptly assessing and communicating developing situations.
Korea Policy Review (KPR) is published monthly by the Korean Overseas Information Service of the Government Information Agency. It introduces major Korean government policies and developments to specialists worldwide to strengthen international confidence in Korea. The article is available under Multimedia and Magazines at http://www.korea.net.
An agency representative said it would use the coverage as an opportunity to communicate its activities more actively abroad in line with the government's broader international policy outreach.'''),
    256: ('Real-time coastal environmental monitoring system established', '''The National Institute of Fisheries Science will hold a meeting at the South Sea Fisheries Research Institute on March 15. About 40 experts representatives of relevant institutions and fishermen will discuss the development and use of a real-time coastal information service.
The system automatically measures water quality in coastal waters and around fishing grounds and sends the observations to a server through a wireless communication network. The resulting database is provided through the institute's Korea Oceanographic Data Center website (http://kodc.nfrdi.re.kr). The institute's ocean research team began the project in 2003 and has installed and operated the system at 22 observation stations.
At locations selected for effective coastal monitoring the system automatically observes water temperature salinity dissolved oxygen and other variables every 30 minutes. Observations are provided online in real time and sent by email to registered users.
By observing multiple waters simultaneously at the desired interval the system provides information on coastal environments that vary greatly in time and space. Real-time information on fishing-ground conditions also enables an effective response on site.
Rapid detection is necessary to respond to sudden changes such as cold-related fish deaths at South Sea coastal farms and hypoxic water masses during high summer temperatures. Interest in the service is increasing along with demand to expand installation and operation beyond the limited waters and fish farms currently covered.
The meeting will gather opinions from relevant institutions and local fishermen and facilitate expert discussion on ways to make the best use of the system. It is expected to contribute to coastal ecosystem protection and improved productivity in coastal fishing grounds.'''),
    274: ('Tidal benchmark survey results for the northern West Coast', '''54 benchmarks at 19 locations along the coast from Seongmun-myeon Dangjin-gun to Ganghwa Bridge in Ganghwa-eup
The West Sea Hydrographic and Oceanographic Office of the Korea Hydrographic and Oceanographic Agency (Director Chang-seop Choi) announced the results of its tidal benchmark survey along this coast. These benchmarks provide reference elevations for sea level.
The survey covered 54 benchmarks at 19 locations including Incheon Daebu Island and Jebu Island. Fifteen missing benchmarks including those at Songdo in Incheon Sanggarido in Siheung and Jebu Island were replaced. Where soft ground had subsided by less than about 1–2 cm the reference elevations were measured accurately and corrected.
Tidal benchmarks (TBMs) are installed and managed by the agency. After tidal observations establish local mean sea level the benchmark elevation is marked. The information is important for port and coastal development and coastal flood prevention.
The results are available through the agency's tidal data service at http://oceandata.nori.go.kr/.
The office is checking the presence loss and subsidence of benchmarks in the northern West Sea to manage them effectively. The coastal survey ran from March 15 to April 15. A further survey of 54 benchmarks at 19 island locations is planned for two months beginning in September.'''),
    439: ('GeoSR accredited for marine environmental measurement and analysis', '''GeoSR has been designated by the Ministry of Land, Transport and Maritime Affairs as an accredited institution for marine environmental measurement and analysis.
Attachment: Ministry of Land, Transport and Maritime Affairs press release'''),
    470: ('GeoSR employees receive an Excellence Award in the KSCE infrastructure drone filming competition', '''GeoSR employees Senior Researcher Hyeong-seok Jeon Principal Researcher Mu-geon Kim Chief Researcher Yong-sik Song Senior Researcher Chan-woong Jeon and Senior Researcher Ho-young Lee received an Excellence Award in the infrastructure drone filming competition organized by the Korean Society of Civil Engineers.'''),
    451: ('Vice President Su-yong Nam receives a presidential medal', '''GeoSR Vice President Su-yong Nam received a presidential medal on Ocean Day.'''),
    463: ('Manager Jeong-hyeon Lee receives an Outstanding Paper Presentation Award', '''GeoSR Manager Jeong-hyeon Lee received an Outstanding Paper Presentation Award at the 2017 joint conference of the Korean Society of Water and Wastewater and the Korean Society on Water Environment.'''),
    476: ('Vice President Su-yong Nam receives the Seobung Technology Award', '''GeoSR Vice President Su-yong Nam received the Seobung Technology Award at the 2020 fall conference of the Korean Society of Oceanography.'''),
    461: ('Managing Director Tae-soon Kang receives an Outstanding Presentation Award', '''GeoSR Managing Director Tae-soon Kang received an Outstanding Presentation Award at the 2017 fall conference of the Korean Society of Marine Environment and Safety.'''),
    464: ('Managing Director Tae-soon Kang receives an award from the Minister of Oceans and Fisheries', '''GeoSR Managing Director Tae-soon Kang received the Minister of Oceans and Fisheries Award for an outstanding paper.'''),
    1963: ('Jong-gyu Park receives an Outstanding Paper Award from Korea Marine Environment Management Corporation', '''GeoSR Senior Researcher Jong-gyu Park received an Outstanding Paper Award from Korea Marine Environment Management Corporation.'''),
    2979: ('Vice President Yong-sik Song receives a commendation from the Korea Water Resources Association', '''GeoSR Vice President Yong-sik Song received a commendation from the Korea Water Resources Association.'''),
    2976: ('Executive Managing Director Tae-soon Kang receives an Academic Award', '''GeoSR Executive Managing Director Tae-soon Kang received the Academic Award from the Korean Society of Coastal Disaster Prevention.'''),
    1694: ('Managing Director Jun-sik Woo receives the Ministry of Oceans and Fisheries Best Paper Award', '''GeoSR Managing Director Jun-sik Woo received the Ministry of Oceans and Fisheries Best Paper Award.'''),
    2002: ('Managing Director Heung-bae Choi receives a commendation from the Minister of Oceans and Fisheries', '''GeoSR Managing Director Heung-bae Choi received an award from the Minister of Oceans and Fisheries.'''),
    462: ('Manager Yong-ho Choi receives a commendation from the Minister of Oceans and Fisheries', '''GeoSR Manager Yong-ho Choi received a commendation from the Minister of Oceans and Fisheries.'''),
    1942: ('Managing Director Chang-woo Cho receives a commendation from the Minister of Oceans and Fisheries', '''GeoSR Managing Director Chang-woo Cho received an award from the Minister of Oceans and Fisheries.'''),
    2940: ('Vice President Yong-sik Song receives a commendation from the Minister of Environment', '''GeoSR Vice President Yong-sik Song received a commendation from the Minister of Environment.'''),
    444: ('General Manager Seong-jin Park to receive a doctorate and Senior Staff Member Sang-cheol Yoo a master\'s degree', '''General Manager Seong-jin Park is scheduled to receive a PhD in Engineering from the Department of Ocean Engineering at Chonnam National University in February 2012.
Dissertation title: Relationship between sedimentary environmental characteristics and sediment contamination in Gamak Bay using numerical modeling
Senior Staff Member Sang-cheol Yoo is scheduled to receive a master's degree in Engineering from the Department of Ocean Science and Engineering at Kunsan National University in February 2012.
Thesis title: Simulation of changes in hydraulics and water quality due to development within Saemangeum'''),
    257: ('Tidal benchmark survey begins along the coast from Pyeongtaek to Baengnyeong Island', '''A detailed survey will check whether tidal benchmarks along the coast from Pyeongtaek to Baengnyeong Island remain in place have been lost or have subsided. These benchmarks provide sea level reference heights and require effective management.
The West Sea Hydrographic and Oceanographic Office of the Korea Hydrographic and Oceanographic Agency (Director Chang-seop Choi) announced that it would survey 105 benchmarks at 37 coastal and island locations in two phases: March 15 to April 15 2006 and September 1 to October 30 2006. Missing or damaged benchmarks will be restored and digital levels and GPS instruments will be used to determine their precise elevations and locations.
Tidal benchmarks (TBMs) are important national marine vertical reference points. Following short-term tidal observations in each area benchmarks are installed and their elevations above mean sea level are determined and officially announced. They support decisions on breakwater height and port dredging depth coastal development and sea level monitoring the determination of chart depth reference levels and estimation of inundation levels during coastal surges.
An office representative said that regular surveys of the national marine vertical reference network would continue to manage and maintain these benchmarks effectively. This would help establish reference levels for port and coastal development and improve responses to coastal flooding along the West Coast.'''),
    271: ('Spring tidal-current observations begin in the Gunsan navigation channel', '''The West Sea Hydrographic and Oceanographic Office of the Korea Hydrographic and Oceanographic Agency (Director Chang-seop Choi) announced that spring tidal-current observations would be conducted at the entrance to the Gunsan navigation channel for one month starting on April 29.
The hydrographic survey vessel Hwanghaero will observe spring circulation near channel Light Buoy No. 2 following winter observations in February to improve the accuracy of tidal-current forecasts.
An office representative said the observations would support safe navigation and efficient route planning for vessels entering and leaving Gunsan Port. They would also help explain changes in water circulation and sedimentation caused by changes in seabed topography. Seasonal observations would continue to characterize tidal currents in both the Gunsan channel and the Saemangeum waters.
Port construction at Gunsan and Janghang and seawall construction have rapidly changed hydrodynamics and sedimentation in the Gunsan Port and Saemangeum waters. The final Saemangeum seawall closure was completed on April 21 2006. Changes to the wider marine environment could affect safe navigation for both small and large vessels making continued marine monitoring necessary.'''),
    330: ('GeoSR holds its 2007 annual awards ceremony on February 16', '''GeoSR held its 2007 annual awards ceremony at 1 pm on February 16 ahead of the Lunar New Year holiday in the main conference room. All executives and employees including the CEO attended.
The recipients were as follows
Outstanding Employee Award: General Manager Tae-soon Kang Deputy General Manager Yong-sik Song Manager Ho-sik Eom Manager Gi-young Bang and Senior Staff Member Seong-o Lee
Effort Award: Deputy General Manager Mu-rak Song and Deputy General Manager Hyo-jin Lee
Meritorious Service Award: Manager Jong-beom Kim
Fighting Spirit Award: Assistant Manager Ho-young Lee'''),
    333: ('2007 West Coast hydrographic survey program announced', '''Five projects including tidal-current observations between Gunsan and Imja Island
The West Sea Hydrographic and Oceanographic Office of the Korea Hydrographic and Oceanographic Agency (Director Chang-seop Choi) announced its 2007 survey program for the West Coast.
The program covers five areas: tidal benchmark and coastal navigation route surveys in the southern West Sea hydrographic surveying northwest of Wido Island tidal-current observations between Gunsan and Imja Island marine characteristic surveys around the Sibidongpa Islands and tidal observations at 15 locations including Janghang Port.
The 77-ton hydrographic survey vessel Hwanghaero built last year will support this year's surveys and is expected to produce high-quality marine information promptly and accurately.
An agency representative said that the results would be systematically analyzed and organized and provided on the agency's website (www.nori.go.kr). The information would support chart production hydrographic publications safe navigation understanding of the marine environment and the comprehensive use and conservation of the ocean.'''),
    329: ('Seasonal tidal-current observations planned for the Janghang navigation channel', '''Hydrographic survey to investigate tidal-current circulation at the entrance to the Janghang navigation channel
The West Sea Hydrographic and Oceanographic Office of the Korea Hydrographic and Oceanographic Agency (Director Chang-seop Choi) announced plans to observe tidal currents in all four seasons at the channel entrance to Janghang Port in Seocheon-gun Chungcheongnam-do.
The hydrographic survey vessel Hwanghaero will observe seasonal tidal currents near Gunsan Port Light Buoy No. 16 to improve tidal-current forecast accuracy.
Gunsan and Janghang are typical estuarine ports at the Geum River estuary on the central West Coast. Large national development projects including construction at the two ports are being implemented over successive years. Estuarine hydrodynamics and sedimentation are changing rapidly and changes to the wider marine environment could affect safe navigation for vessels of all sizes.
The office said that the observations would support safe navigation and efficient route planning for vessels entering and leaving both ports while clarifying changes in water circulation and sedimentation associated with changes in seabed topography.'''),
    282: ('New tide stations in Yeomha Channel and the Han River estuary', '''Tidal forecasts for the Han River estuary to begin in 2008
The Korea Hydrographic and Oceanographic Agency (Director General Yu-seop Jeong) announced that tidal observations would begin in August at Jeollyu in the Han River estuary and at Ganghwa Bridge. The Han River estuary is a major tidal river influenced by freshwater discharged from the Han River and strong tides in the surrounding waters.
An agreement with the Han River Flood Control Office to share facilities enabled two new tide stations to be established. Long-term tidal observations would allow accurate tidal forecasts for the Han River estuary and waters around Ganghwa Island from 2008.
Strong tides in the estuary are known to influence the Han River as far upstream as Jamsu Bridge in Seoul. Accurate estuarine tidal forecasts are therefore essential to prevent flood damage and plan countermeasures during heavy rainfall in Seoul and Gyeonggi-do.
Strong currents and extensive tidal flats had previously made long-term observation difficult preventing the provision of accurate sea level prediction data.
An agency representative said that the new stations would improve public services by providing accurate information for coastal disaster prevention and for increasingly popular leisure activities such as tidal flat visits around Ganghwa Island.
The Han River estuary observations will be provided in real time from August on the agency's website (http://www.nori.go.kr).'''),
    353: ('KHOA and UNSW develop a tidal prediction model for the Yellow Sea', '''The Korea Hydrographic and Oceanographic Agency (Director General Young-jin Yeon) announced joint research with the University of New South Wales (UNSW) in Australia to develop a numerical model capable of forecasting tides in the Yellow Sea and East China Sea.
The collaboration was proposed by UNSW. Dr Do-seong Byun of the agency's research laboratory visited UNSW from February 15 to March 30 and worked with the team led by Professor H. X. Wang identified in the original article as a leading sediment transport modeling scientist.
The two institutions first developed a numerical model that forecasts tides and tidal currents in the offshore Yellow Sea. Building on this work they plan to add functionality that accurately represents the repeated exposure and inundation of intertidal areas with the tides.
A successful model would improve prediction of tidal sea level changes in the Yellow Sea where shallow water and a large tidal range produce extensive intertidal flats.
Byun said that the team planned to improve the model using offshore Yellow Sea level observations that the agency would collect for the first time that year. He expected the model to enable offshore tide and tidal-current forecasts not previously available and to support high-accuracy bathymetric surveys.'''),
    438: ("Port design handbook published with a chapter by GeoSR Vice President Tae-in Kim", '''Title: Publication of the Easy-to-Understand Handbook of Port Design Standards
The Ministry of Land, Transport and Maritime Affairs published the Easy-to-Understand Handbook of Port Design Standards in December 2010 as an introductory guide to port design standards.
GeoSR Vice President Tae-in Kim participated as an author and wrote Chapter 1: Waves which introduces wave theory and numerical modeling techniques for coastal and estuarine waters.
Attachments
1. Publication of the Easy-to-Understand Handbook of Port Design Standards (Port Development Division)
2. List of contributors'''),
    355: ("Joint government and university current observations around Ganghwa Island and Gyeonggi Bay", '''The Korea Hydrographic and Oceanographic Agency (Director General Young-jin Yeon) and Inha University announced that they would jointly observe tidal currents for one month beginning on the 25th to investigate circulation around Ganghwa Island and in Gyeonggi Bay.
The survey forms part of the exchange agreement signed by the two institutions in 2003 covering hydrographic research technology development and shared use of equipment.
Current meters and other instruments will be installed in Yeomha Channel and Seokmo Channel around Ganghwa Island and at the entrance to the lower Han River. These waters adjoin the Han River estuary where seawater and freshwater mix actively and the large tidal range produces strong tidal currents. The survey will investigate circulation characteristics saltwater and freshwater mixing and sediment transport.
An agency representative said that the joint survey would comprehensively analyze physical oceanographic and geological processes as well as produce accurate tidal-current forecast data for the broad area from the Han River estuary to northern Gyeonggi Bay. This would help clarify water circulation and sedimentation for safe navigation and marine environmental conservation and management.'''),
    398: ("Ye-jong Woo inaugurated as Director General of the Korea Hydrographic and Oceanographic Agency", '''Ye-jong Woo inaugurated as Director General of the Korea Hydrographic and Oceanographic Agency
On March 21 Ye-jong Woo aged 48 took office as the 32nd Director General of the Korea Hydrographic and Oceanographic Agency.
Woo graduated from Dankook University and passed the 28th Higher Civil Service Examination. He began his public service career in 1985 as an administrative officer in the Port Affairs Bureau of the Korea Maritime and Port Administration. He subsequently served as Head of the Resources Management Division in the Fisheries Resources Bureau of the Ministry of Oceans and Fisheries Head of the International Cooperation Division Planning and Budget Officer and Deputy Head of the Northeast Asian Logistics Hub Planning Task Force. He was also assigned to the Korea National Defense University for national security studies before being appointed Director General of the Korea Hydrographic and Oceanographic Agency under the Ministry of Land, Transport and Maritime Affairs.
In his inaugural address Woo said he would improve the efficiency of the agency's work and strengthen its international competitiveness by actively participating in international activities that produce information meeting global standards.
He also said that growing international concern over global warming and the increasing importance of hydrographic surveying and ocean observation in responding to abnormal weather typhoons earthquakes and other natural disasters made it essential for the agency to do its utmost to support the country's development through the ocean.'''),
    352: ("Online 3D seafloor topography exhibition opens to the public", '''The Korea Hydrographic and Oceanographic Agency (Director General Young-jin Yeon) announced that it would operate a 3D Seafloor Topography Exhibition on its website (www.nori.go.kr) allowing anyone to view three-dimensional images of the seabed around Korea.
The exhibition presents for the first time a 3D gallery and videos of seafloor topography in the East Sea including Ulleungdo and Dokdo as well as the Yellow Sea and waters around Jeju Island. In the East Sea presentation a view of Korea and the East Sea gradually appears while the water level drops and rises revealing detailed features such as Wangdolcho. The presentation of the seabed southwest of Jeju begins above Seoul travels through Chungcheong-do and Busan Port and moves toward Marado near Jeju before examining the seabed in detail. It also shows the location and underwater terrain of Ieodo and the Ieodo Ocean Research Station.
The three-dimensional imagery was produced from hydrographic survey data collected since the agency was established in 1949 and seafloor data acquired with multibeam echo sounders.
An agency representative said that giving the public an opportunity to explore the underwater landscape in realistic and accessible 3D detail would help improve public awareness of the ocean. The agency expected to extend the coverage gradually to all Korean waters.
The exhibition is available on the agency's website (http://www.nori.go.kr).'''),
    3091: ("Marine and fisheries new technology certification", '''The Systems Development Department of GeoSR received new technology certification from the Ministry of Oceans and Fisheries in the first half of 2026 for its single-cable buoy system that simultaneously measures water temperature at multiple depths.
Attachment
(Ministry of Oceans and Fisheries Notice No. 2026-1227) Notice of certified new marine and fisheries technologies and confirmation of products and facilities using new technologies.pdf'''),
    1417: ("GeoSR — Global environmental conservation and marine survey expertise", '''[Growth companies in the spotlight] GeoSR — Global environmental conservation and marine survey expertise (2004-05-27)
As global warming pollution water contamination and declining fisheries resources threaten the environment in various ways an engineering services company working in fisheries and aquaculture is attracting attention for its contribution to environmental conservation and development.
GeoSR Co Ltd (CEO Hong-seon Kim www.GeoSR.com) conducts engineering research services related to the global environment and fisheries and aquaculture. Its staff include many specialists with doctoral and master's degrees. Around 40 employees graduated in related fields and divide their work through in-depth research and analysis in their respective specialties.
The company also undertakes marine and aquatic environment surveys numerical modeling water quality analysis marine structure design domestic and overseas marine projects coastal development environmental software development and the construction of monitoring systems.
GeoSR is recognized for world-class expertise in three-dimensional numerical modeling of marine water quality.
Last year the company worked with the Marine Environment Research Center on a survey and research project for Saemangeum marine environmental conservation measures and successfully led the prediction of marine water quality inside and outside the seawall.
Since last year it has also been working with Daeyoung Engineering to establish a coastal erosion monitoring system. It successfully installed economical video camera systems capable of continuous observation at Haeundae and Daecheon beaches.
The video-based wave observation method developed in this project with Professor Tae-rim Kim of Kunsan National University is attracting attention as a world first.
The company has also invested actively in expensive advanced observation equipment. It is the only domestic company to own an acoustic Doppler current profiler (ADCP) as well as ADCP bottom moorings acoustic underwater releases and related equipment.
A company representative said that GeoSR recorded sales of approximately KRW 2.5 billion last year expects sales growth of more than 100% this year and spends approximately 12% of annual sales on research and development.
031-423-8088'''),
    1871: ("GeoSR opens its East Sea regional office in Samcheok", '''Articles covering the opening ceremony of GeoSR's East Sea regional office have been published.
Article links:https://www.shinailbo.co.kr/news/articleView.html?idxno=1820988
https://www.ajunews.com/view/20240129105337341'''),
}


def main():
    path = ROOT / "dist/source-translations-news.en.json"
    overlay = json.loads(path.read_text(encoding="utf-8"))
    audit_path = ROOT / "docs/source-migration/news-translation-review-20260928.json"
    audit = json.loads(audit_path.read_text(encoding="utf-8"))
    source = json.loads((ROOT / "dist/source-archive.json").read_text(encoding="utf-8"))["records"]
    changes = []
    for row in source:
        key = row["id"]
        if key not in overlay["records"]:
            continue
        n = int(key.split("-")[-2])
        date = row["text"].splitlines()[1]
        title = body = None
        if n in COLUMNS:
            ordinal, headline = COLUMNS[n]
            title = PREFIX + headline
            body = f"Article {ordinal} in GeoSR Advisor Jae-hak Lee's monthly column in Kookmin Ilbo has been published." if ordinal else "GeoSR Advisor Jae-hak Lee will write a regular column in Kookmin Ilbo once per month on a Tuesday."
            body += "\n" + title + " — Kookmin Ilbo" + (" (kmib.co.kr)" if n == 1954 else "")
        elif n in COMPLETE_OVERRIDES:
            title, body = COMPLETE_OVERRIDES[n]
        elif n in AWARDS:
            match = re.search(r"\(([가-힣]{2,4}) (대표이사|부회장|선임|전임|책임|수석|부장|차장|이사|고문)\)", row["title"])
            assert match, key
            name, role = NAMES[match[1]], ROLES[match[2]]
            award = AWARDS[n]
            subject = role + " " + name
            title = subject + " receives " + award
            division = " of GeoSR's Research Institute" if "부설연구소" in row["text"] else " of GeoSR's Systems Development Department" if "시스템개발부" in row["text"] else " of GeoSR"
            body = subject + division + " received " + award
            if n == 450:
                body += " as part of the Labor Day awards"
            body += "."
        if title is not None:
            assert all(url in body for url in source_urls(row["text"])), "An explicit source URL is missing from an editorial override"
            overlay["records"][key] = {"sourceTextSha256": row["sourceTextSha256"], "title": title, "text": title + "\n" + date + "\n" + body}
            audit["records"][key]["status"] = "source_checked_editorial_translation"
            audit["records"][key]["editorialNotes"] = "Title, body, date, individual rank, institution, subject and source column ordinal checked against Korean record; duplicate column ordinal 3 retained as published"
            changes.append(key)
        if n in TITLE_OVERRIDES:
            translated = overlay["records"][key]
            old = translated["title"]
            translated["title"] = TITLE_OVERRIDES[n]
            translated["text"] = translated["text"].replace(old, translated["title"], 1)
            audit["records"][key]["titleReview"] = "source_checked_editorial_title"
        if "국립해양조사원" in row["text"] and "해양연구원" not in row["text"]:
            translated = overlay["records"][key]
            for field in ("title", "text"):
                translated[field] = translated[field].replace("Korea Ocean Research and Development Institute", "Korea Hydrographic and Oceanographic Agency").replace("Korea Ocean Research Institute", "Korea Hydrographic and Oceanographic Agency").replace("Marine Research Institute", "Korea Hydrographic and Oceanographic Agency").replace("Ocean Research Institute", "Korea Hydrographic and Oceanographic Agency")
            audit["records"][key]["institutionReview"] = "National hydrographic agency distinguished from the separate ocean research institute using Korean source names"
        if n == 313:
            translated = overlay["records"][key]
            translated["text"] = translated["text"].replace("From December to the rearing port within the year", "Relocation to the landing wharf by December").replace("Yangyeong Pier", "the landing wharf").replace("has been producing tidal waves and various marine information", "has been recording tidal waves arriving from offshore and other marine information")
        if n == 242:
            translated = overlay["records"][key]
            translated["text"] = translated["text"].replace('tide observation near Sokcho Port', 'tidal-current observation near Sokcho Port')
        if n == 273:
            translated = overlay["records"][key]
            lines = translated['text'].splitlines()
            translated['text'] = '\n'.join('The Ministry of Environment announced that its Environmental Impact Assessment Information Support System (http://eiass.go.kr) opened to the public on the 1st. It contains original environmental impact assessment reports consultation opinions environmental conditions at project sites environmental quality measurements and geographic information.' if 'http://eiass.go.kr' in line else line for line in lines)
        if n == 200:
            translated = overlay["records"][key]
            old = translated['title']
            translated['title'] = 'Study finds thermal-discharge impact extends 20.2 km south of Yeonggwang Nuclear Power Plant'
            translated['text'] = translated['text'].replace(old, translated['title'], 1)
            for incorrect in ('heated drainage', 'warm waste water', 'warm drainage', 'hot water discharge', 'heated wastewater'):
                translated['text'] = translated['text'].replace(incorrect, 'thermal discharge')
            translated['text'] = translated['text'].replace('damage rate in hot water', 'damage rate associated with thermal discharge').replace('maximum spread range at the moment of 1°C water temperature due to thermal discharge', 'maximum instantaneous extent of the 1°C temperature increase caused by thermal discharge')
        elif n in (1430, 1436, 1440, 458, 376, 393, 468):
            translated = overlay["records"][key]
            if n == 1430:
                old = translated["title"]
                translated["title"] = "The East Coast's shrinking beaches — Solutions remain out of reach"
                translated["text"] = translated["text"].replace(old, translated["title"], 1)
            elif n == 1436:
                old = translated["title"]
                translated["title"] = "Damage in Geoje from Nakdong River marine debris estimated at KRW 15 billion"
                translated["text"] = translated["text"].replace(old, translated["title"], 1)
                translated["text"] = translated["text"].replace("East Asia Marine Community Ocean", "Our Sea of East Asia Network (OSEAN)")
            elif n == 1440:
                translated["text"] = translated["text"].replace("Sturgeon-Grow up", "Sturgeon and soft-shelled turtles").replace("automated wet farming system", "automated laver cultivation system")
            elif n == 458:
                translated["text"] = translated["text"].replace("amount of oxygen needed to treat sediment per day in the Yeoju Weir", "daily oxygen demand of sediment in an area of 1 m² at the Yeoju Weir").replace("the corpses later accumulate", "the dead phytoplankton later accumulate")
            elif n == 376:
                old = translated["title"]
                translated["title"] = "Gore says ExxonMobil and other energy companies fund research disputing global warming"
                translated["text"] = translated["text"].replace(old, translated["title"], 1).replace("former President Gore", "former Vice President Gore").replace("detoxification of smoking", "harmful effects of smoking")
            elif n == 393:
                lines = translated["text"].splitlines()
                lines = ["The domestic expert group assembled around the Korea Ocean Research and Development Institute planned to begin fieldwork as soon as possible to assess the environmental impact of the Taean oil spill and prepare a long-term ecosystem restoration plan. It would work closely with three pollution-response specialists from the United States Coast Guard (USCG) and one marine ecosystem specialist from the National Oceanic and Atmospheric Administration (NOAA) who arrived on the 13th. Eight additional specialists in pollution crisis management pollution assessment emergency response and medium- to long-term environmental impact assessment from the European Union (EU) the United Nations Development Programme (UNDP) and the United Nations Environment Programme (UNEP) were scheduled to arrive on the 15th." if "해양연구원을 중심" in line else line for line in lines]
                translated["text"] = "\n".join(lines).replace("International Oil Compensation Fund", "International Oil Pollution Compensation Funds")
            elif n == 468:
                translated["text"] = translated["text"].replace("(http://goodcompany.korcham.net)를 You can check it through.", "(http://goodcompany.korcham.net).")
            audit["records"][key]["status"] = "key_facts_and_targeted_terms_checked"
            audit["records"][key]["editorialNotes"] = "Company role and attribution, published event year, figures and monetary conversions checked; source measurements and historical claims retained without treating them as current company claims"
            changes.append(key)
    for row in source:
        key = row["id"]
        if key not in overlay["records"]:
            continue
        entry = overlay["records"][key]
        assert entry["sourceTextSha256"] == row["sourceTextSha256"], key
        assert all(url in entry["text"] for url in source_urls(row["text"])), key
        review = audit["records"][key]
        review["remainingHangul"] = len(re.findall(r"[가-힣]", entry["text"]))
        review["translatedCharacters"] = len(entry["text"])
        review["numbersAbsentFromTranslation"] = sorted(set(re.findall(r"\d+(?:[.,]\d+)*", row["text"])) - set(re.findall(r"\d+(?:[.,]\d+)*", entry["text"])))
    overlay_text = json.dumps(overlay, ensure_ascii=False, indent=2) + "\n"
    path.write_text(overlay_text, encoding="utf-8")
    audit_path.write_text(json.dumps(audit, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"editoriallyCorrected": len(changes), "ids": changes}, ensure_ascii=False))


if __name__ == "__main__":
    main()
