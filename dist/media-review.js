'use strict';
const frames=[
  {
    "id": "CF05_WIDE",
    "shot": "CF05",
    "title": "무인선 관측",
    "src": "assets/concepts/reviewed-20260922/cf05-usv-wide-v2.png",
    "review": "원본의 황색 쌍동선·회색 프레임·장비 배치를 육안 대조 / 전체 선체가 보이는 넓은 프레임 / 배경은 생성형이며 실제 출항지·운용사진으로 주장하지 않음 / 정밀 부속과 로고는 최종 출력 전 원본 대조",
    "motion": "4초 완만한 평행 추적 / 선체·상부 장비를 강체로 유지 / 관측 장비가 새로 생기거나 항적이 선수 앞에 나타나면 탈락 / 무인선은 CF05 하나의 선택지"
  },
  {
    "id": "CF07",
    "shot": "CF07",
    "title": "수중 조사",
    "src": "assets/concepts/reviewed-20260922/cf07-rov-v1.png",
    "review": "회사 원본의 정면 형상과 부력재·카메라·프레임을 대조 / 테더는 뒤쪽으로 이어짐 / 후면 연결부는 가려져 정확한 결선 미확인 / 실제 운용사진이나 사양 증거로 사용 금지",
    "motion": "4초 정지 관찰에 가까운 완만한 이동 / 테더가 카메라에 붙거나 프레임을 관통하면 탈락 / 배경과 조명의 작은 변화만 허용"
  },
  {
    "id": "CF10",
    "shot": "CF10",
    "title": "해수 시료와 화학 분석",
    "src": "assets/concepts/reviewed-20260922/cf10-chemistry-wide-v1.png",
    "review": "사람 없음 / 닫힌 용기와 분석기 / 분석 전 시료 준비 장면으로 사용 / 장비 작동이나 실제 GeoSR 시설로 주장하지 않음",
    "motion": "4초의 3–5% 카메라 접근 또는 초점 이동만 허용 / 병 개수와 액면 및 뚜껑 상태 고정 / 소품 변경 시 재작업"
  },
  {
    "id": "CF10_END",
    "shot": "CF10",
    "title": "화학 분석 디테일",
    "src": "assets/concepts/reviewed-20260922/cf10-chemistry-close-v1.png",
    "review": "별도 클로즈업 컷으로 보존 / 확대하면서 주변 소품·프레이밍이 변하므로 wide의 확정 끝 프레임으로 사용하지 않음",
    "motion": "wide→close 생성 보간 금지 / 별도 인서트 컷 또는 wide 자체의 소폭 접근을 사용"
  },
  {
    "id": "CF11_FIX",
    "shot": "CF11",
    "title": "생물 시료 관찰",
    "src": "assets/concepts/reviewed-20260922/cf11-microscope-v2.png",
    "review": "대물렌즈 간격과 하부 조명을 수정 / 슬라이드 지지·수직 광축·하부 콘덴서 육안 확인 / 현미경 배율이나 실제 생물 종을 주장하지 않음 / 작은 렌즈 각인은 최종 확대본에서 다시 확인",
    "motion": "4초 미세한 카메라 접근 / 렌즈와 스테이지를 독립적으로 변형하지 않음 / 생물 확대 영상은 실제 원본을 별도 합성하며 생성 생물로 종을 단정하지 않음"
  }
];
let selected=0;
const byId=id=>document.getElementById(id);
const nav=byId('frames');
frames.forEach((frame,index)=>{const button=document.createElement('button');button.type='button';button.textContent=frame.title;button.addEventListener('click',()=>select(index));nav.append(button)});
function select(index){selected=(index+frames.length)%frames.length;const frame=frames[selected];byId('frame').src=frame.src;byId('frame').alt=frame.title+' 영상 기반 생성 시안';byId('counter').textContent=String(selected+1).padStart(2,'0')+' / '+String(frames.length).padStart(2,'0');byId('shot').textContent=frame.shot+' / GENERATED CONCEPT';byId('title').textContent=frame.title;byId('review').textContent=frame.review;byId('motion').textContent='다음 영상 · '+frame.motion;byId('original').href=frame.src;[...nav.children].forEach((button,i)=>button.setAttribute('aria-pressed',String(i===selected)))}
byId('previous').addEventListener('click',()=>select(selected-1));byId('next').addEventListener('click',()=>select(selected+1));
byId('text-toggle').addEventListener('change',event=>{byId('overlay').hidden=!event.target.checked});
select(0);
