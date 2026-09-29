/* Company information is read from the preserved bilingual public records */
(() => {
  'use strict';
  const en=new URLSearchParams(location.search).get('lang')==='en';
  const language=en?'en':'ko';
  const route=location.pathname.split('/').pop().replace('.html','');
  const t=(ko,english)=>en?english:ko;
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const lines=value=>value.split('\n').map(line=>line.trim()).filter(Boolean);
  const between=(text,start,end)=>text.includes(start)?text.split(start)[1].split(end)[0].trim():'';
  const original=text=>`<div class="company-original-prose">${esc(text)}</div>`;
  // The captured Korean policy joins two published bullet labels without a
  // line break. Separate them for reading while preserving the stored text.
  const policyProse=text=>original(text.replace(/([^\n])(ο\s*개인정보 수집방법)/g,'$1\n$2'));
  const disclosure=(title,text,open=false)=>`<details class="company-information-disclosure"${open?' open':''}><summary>${esc(title)}<span aria-hidden="true">+</span></summary>${original(text)}</details>`;
  const stripFooter=text=>text.split('\nAbout usPrivacy policy')[0].split('\n회사소개개인정보 처리방침')[0].trim();
  window.GeoSRCompanyInformationPage=()=>`<section class="company-information-page"><header class="company-information-heading"><p>${route==='careers'?'CAREERS':'PRIVACY POLICY'}</p><div><h1>${route==='careers'?t('채용안내','Careers'):t('개인정보 처리방침','Privacy policy')}</h1></div></header><div data-company-information-page><p>${t('자료를 불러오는 중','Loading information')}</p></div></section>`;

  async function init(){
    const hosts=[...document.querySelectorAll('[data-company-source]')];
    const page=document.querySelector('[data-company-information-page]');
    if(!hosts.length&&!page)return;
    try{
      const read=async url=>{const response=await fetch(url);if(!response.ok)throw Error(String(response.status));return response.json()};
      const [{records},review,translations]=await Promise.all([read('source-archive.json'),en?read('company-translations.en.json').catch(()=>null):null,en&&route==='privacy'?read('source-translations.en.json').catch(()=>null):null]);
      const find=(section,kind)=>records.find(record=>record.lang===language&&record.section===section&&record.kind===kind);
      const reviewedPrinciples=review?.sourceTextSha256===records.find(record=>record.id===review?.sourceId)?.sourceTextSha256?review?.principles:null;
      const company=stripFooter(find('company','aboutUs').text);
      const contact=stripFooter(find('company','contactUs').text);
      for(const host of hosts){
        switch(host.dataset.companySource){
          case 'greeting':{
            const greeting=between(company,en?'\nGreetings from the CEO\n':'\nGreeting from the Ceo\n','\n'+(en?'History':'연혁'));
            const paragraphs=lines(greeting);
            const signature=paragraphs.pop()||'';
            const lead=en?paragraphs.splice(0,2).join(' '):paragraphs.shift();
            host.innerHTML=`<div class="company-greeting-layout"><h3>${esc(lead)}</h3><div>${original(paragraphs.join('\n'))}<p class="company-signature">${esc(signature)}</p></div></div>`;
            break;
          }
          case 'principles':{
            const heading=en?'\nMission & Vision\n':'\n목표 및 사명\n';
            let text=company.includes(heading)?company.split(heading)[1]:company.split('\nMission\n')[1];
            if(!text)throw Error('Mission source not found');
            if(en&&!company.includes(heading))text='Mission\n'+text;
            const mission=reviewedPrinciples?.mission||between(text,'\n사명\n','\nVision')||between('\n'+text,'\nMission\n','\nVision');
            const vision=reviewedPrinciples?.vision||between(text,'\n비전\n','\nCore values')||between('\n'+text,'\nVision\n','\nCore values');
            const values=text.split('\nCore values\n').slice(1).join('\nCore values\n').replace(/^Core values\n/,'');
            const clean=value=>value.replace(/^(?:Mission|Vision)\n/,'').trim();
            const valueLines=lines(values),valueItems=[];
            for(let i=0;i<valueLines.length;i+=2)valueItems.push({title:valueLines[i],text:valueLines[i+1]||''});
            if(reviewedPrinciples)valueItems.splice(0,valueItems.length,...reviewedPrinciples.values);
            host.innerHTML=`<div class="company-principle-pair"><article><span>${t('사명','Mission')}</span><p>${esc(clean(mission))}</p></article><article><span>${t('비전','Vision')}</span><p>${esc(clean(vision))}</p></article></div><details class="company-information-disclosure company-values"><summary>${t('핵심 가치','Core values')}<span aria-hidden="true">+</span></summary><div class="company-value-grid">${valueItems.map((value,i)=>`<article><span>0${i+1}</span><h3>${esc(value.title)}</h3><p>${esc(value.text)}</p></article>`).join('')}</div></details>`;
            break;
          }
          case 'departments':{
            const body=between(contact,en?'\nE-mail\n':'\n이메일\n',en?'\nLocation':'\n오시는 길');
            const rows=lines(body),items=[];
            for(let i=0;i+2<rows.length;i+=3)items.push(rows.slice(i,i+3));
            host.innerHTML=`<details class="company-information-disclosure"><summary>${t('부서별 연락처','Department contacts')}<span aria-hidden="true">+</span></summary><div class="company-department-contacts">${items.map(([name,person,email])=>`<div><h3>${esc(name)}</h3><span>${esc(person)}</span><a href="mailto:${esc(email)}">${esc(email)}</a></div>`).join('')}</div></details>`;
            break;
          }
          case 'directions':{
            const title=en?'Directions for visiting our HQ':'교통안내(본사)';
            const body=contact.split('\n'+title+'\n')[1]||'';
            const parts=body.split('\n'+(en?'Parking Information':'주차안내')+'\n');
            host.innerHTML=`<div class="company-visit"><div><h3>${t('본사 교통 안내','Getting to our head office')}</h3>${original(parts[0])}</div><div>${disclosure(t('주차 안내','Parking information'),parts[1]||'')}</div></div>`;
            break;
          }
        }
      }
      if(page&&route==='privacy'){
        const canonical=records.find(record=>record.lang==='ko'&&record.section==='policy'&&record.kind==='privacy');
        const translated=translations?.records?.[canonical.id];
        const englishReady=en&&translated?.sourceTextSha256===canonical.sourceTextSha256;
        const source=stripFooter(englishReady?translated.text:canonical.text);
        const text=source.slice(source.indexOf('1. '));
        const sections=text.split(/\n(?=[123]\. )/);
        page.innerHTML=`${en&&!englishReady?'<p class="company-information-language">The published policy is available in Korean</p>':''}<div class="company-policy-sections">${sections.map(section=>{const match=(englishReady?/^([^\n]+)\n([\s\S]*)$/:/^([123]\. (?:수집하는 개인정보 항목|개인정보의 수집 및 이용목적|개인정보의 보유 및 이용기간))\s*([\s\S]*)$/).exec(section);return `<section><h2>${esc(match?.[1]||'')}</h2>${policyProse(match?.[2]||section)}</section>`}).join('')}</div>`;
      }
      if(page&&route==='careers'){
        const source=stripFooter(find('career','recruit').text);
        const body=source.slice(source.indexOf(en?'Area of Recruitment':'모집분야'));
        const categories=en?['Field survey and data analysis','IoT system development','Marine convergence information\nanalysis and service development','On-site operation of marine\nobservation equipment','Numerical modeling','Calibration and data processing\nof marine satellites','Operation and analysis\nof hyperspectral sensors','Java developer','Front-end web development','Web designer','Software development PM/PL']:['현장조사 및 자료분석','IoT 시스템 개발','해양융합정보분석 및 서비스개발','해양관측장비 현장운영','수치모델링','해양위성 검보정 연구 및 자료처리','초분광센서 운영 및 분석','JAVA 개발자','프론트엔드 웹개발자','웹디자이너','소프트웨어 개발 PM/PL'];
        const area=body.split('\n'+(en?'Notes':'유의사항'))[0];
        let position=0;
        const offsets=categories.map(label=>{const offset=area.indexOf('\n'+label+'\n',position);position=Math.max(position,offset+label.length+2);return offset;});
        const duties=categories.map((label,index)=>({label:label.replace(/\n/g,' '),text:area.slice(offsets[index]+label.length+2,index+1<offsets.length?offsets[index+1]:area.length).trim()}));
        const conditions=between(body,'\n'+(en?'Working Condition':'근무조건')+'\n','\n'+(en?'Application submission':'접수처'));
        const application=between(body,'\n'+(en?'Application submission':'접수처')+'\n','\n'+(en?'Employee Benefits':'복리후생')).replace(/\n이력서$/,'');
        const benefits=body.split('\n'+(en?'Employee Benefits':'복리후생')+'\n')[1]||'';
        const benefitItems=[];
        for(const item of lines(benefits)){
          if((/^\(.+\)$/.test(item)||/(?:및|and)$/.test(benefitItems.at(-1)||'')||item==='휴가·선물 지급')&&benefitItems.length)benefitItems[benefitItems.length-1]+=' '+item;
          else benefitItems.push(item);
        }
        const benefitGrid=`<ul class="company-benefit-grid">${benefitItems.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`;
        const notes=between(body,'\n'+(en?'Notes':'유의사항')+'\n','\n'+(en?'Working Condition':'근무조건'));
        page.innerHTML=`<section class="company-career-section"><h2>${t('모집 분야','Recruitment areas')}</h2><div>${duties.map(item=>disclosure(item.label,item.text)).join('')}</div></section><section class="company-career-section"><h2>${t('근무 조건','Working conditions')}</h2>${original(conditions)}</section><section class="company-career-section"><h2>${t('지원 안내','How to apply')}</h2><div>${original(application)}<a class="company-download-link" href="assets/source-records/4ecf84ef608231644f51.hwp" download>${t('입사지원서 양식 다운로드','Download application form in Korean')}<span aria-hidden="true">↓</span></a></div></section><section class="company-career-section"><h2>${t('복리후생','Employee benefits')}</h2>${benefitGrid}</section>${disclosure(t('지원 유의사항','Application notes'),notes)}`;
      }
    }catch(error){
      console.error('Company source information could not be loaded',error);
      [...hosts,...(page?[page]:[])].forEach(host=>{if(!host.innerHTML.trim()||host===page)host.innerHTML=`<p>${t('자료를 불러오지 못했습니다','Could not load company information')}</p>`});
    }
  }
  window.GeoSRCompanyInformationReady=new Promise(resolve=>document.addEventListener('DOMContentLoaded',()=>init().finally(resolve),{once:true}));
})();
