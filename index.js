'use strict';

// Navbar scroll
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), { passive: true });

// Mobile menu
document.getElementById('mobileToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// Scroll reveal
(function(){
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

// Calendar
(function(){
  const EVENTS = {
    '2026-2-5':  [{title:'Team Strategy Meeting',desc:'Quarterly planning session with all department heads.',time:'9:00 am'}],
    '2026-2-12': [{title:'Client Onboarding Workshop',desc:'Orientation for new enterprise clients joining Q1.',time:'10:00 am'}],
    '2026-2-19': [{title:'Data Security Briefing',desc:'Mandatory security update and policy review for all staff.',time:'2:00 pm'}],
    '2026-3-3':  [{title:'Web Development Bootcamp',desc:'Intensive 8-week program covering HTML, CSS, JavaScript, React.',time:'10:00 am'}],
    '2026-3-10': [{title:'Customer Support Summit',desc:'Annual review of support KPIs and team recognition ceremony.',time:'9:00 am'},{title:'Tech Infrastructure Review',desc:'Assessment of current IT systems and upgrade roadmap.',time:'3:00 pm'}],
    '2026-3-17': [{title:'HR Policy Update',desc:'New employee handbook rollout and Q&A session.',time:'11:00 am'}],
    '2026-3-24': [{title:'BPO Industry Webinar',desc:'Guest speakers from top global outsourcing firms.',time:'1:00 pm'}],
    '2026-4-2':  [{title:'Q1 Performance Review',desc:'Department heads present Q1 results and Q2 targets.',time:'9:00 am'}],
    '2026-4-8':  [{title:'Leadership Training Day',desc:'Full-day workshop on management and communication skills.',time:'8:00 am'}],
    '2026-4-15': [{title:'Client Satisfaction Survey',desc:'Launch of bi-annual NPS survey across all accounts.',time:'10:00 am'}],
    '2026-4-22': [{title:'Earth Day Green Initiative',desc:'Company sustainability drive and tree-planting event.',time:'9:00 am'}],
    '2026-5-1':  [{title:'Labor Day Celebration',desc:'Company-wide appreciation event and team activities.',time:'All day'}],
    '2026-5-14': [{title:'Mid-Year Planning Sprint',desc:'Cross-department alignment meeting for H2 roadmap.',time:'9:00 am'}],
    '2026-5-21': [{title:'Data Analytics Workshop',desc:'Hands-on training with Power BI and visualization tools.',time:'10:00 am'}],
    '2026-5-28': [{title:'New Hire Orientation',desc:'Onboarding session for Q2 batch of new employees.',time:'8:30 am'}],
    '2026-6-4':  [{title:'Compliance & Audit Review',desc:'Annual audit preparation and regulatory compliance check.',time:'9:00 am'}],
    '2026-6-12': [{title:'Independence Day Briefing',desc:'Company observance and voluntary community outreach.',time:'10:00 am'}],
    '2026-6-19': [{title:'Customer Support Training',desc:'Advanced de-escalation and empathy training modules.',time:'9:00 am'}],
    '2026-6-25': [{title:'H1 Financial Review',desc:'Finance team presents first-half revenue and expense report.',time:'2:00 pm'}],
    '2026-7-2':  [{title:'Operations Process Audit',desc:'Internal review of all active BPO processes for efficiency.',time:'9:00 am'}],
    '2026-7-9':  [{title:'AI Tools Integration Demo',desc:'Showcase of new AI-assisted workflow automation tools.',time:'11:00 am'}],
    '2026-7-16': [{title:'Team Building Day',desc:'Off-site activities to foster collaboration and morale.',time:'8:00 am'}],
    '2026-7-23': [{title:'Client Portfolio Review',desc:'Account managers present client health scores and renewals.',time:'10:00 am'}],
    '2026-8-6':  [{title:'Back Office Efficiency Drive',desc:'Process improvement ideation workshop for back office teams.',time:'9:00 am'}],
    '2026-8-13': [{title:'National Heroes Day Program',desc:'Company-wide observance with talks by industry veterans.',time:'10:00 am'}],
    '2026-8-20': [{title:'Product Roadmap Presentation',desc:'Leadership presents updated 2027 service offerings roadmap.',time:'1:00 pm'}],
    '2026-8-27': [{title:'Staff Wellness Day',desc:'Mental health awareness activities and free health screenings.',time:'9:00 am'}],
    '2026-9-3':  [{title:'Q3 Business Review',desc:'Cross-functional review of Q3 milestones and challenges.',time:'9:00 am'}],
    '2026-9-10': [{title:'New Client Welcome Event',desc:'Reception and briefing for onboarding enterprise clients.',time:'4:00 pm'}],
    '2026-9-17': [{title:'Data Privacy Seminar',desc:'Refresher on GDPR, data handling, and local privacy laws.',time:'10:00 am'}],
    '2026-9-24': [{title:'Annual Company Outing',desc:'Full-day team trip and recreational activities.',time:'7:00 am'}],
    '2026-10-1': [{title:'October Kickoff Meeting',desc:'All-hands meeting to align on Q4 priorities and goals.',time:'9:00 am'}],
    '2026-10-8': [{title:'Leadership Summit 2026',desc:'Two-day executive forum on growth and innovation strategy.',time:'8:00 am'}],
    '2026-10-15':[{title:'Client Appreciation Night',desc:'Annual gala dinner celebrating client partnerships.',time:'6:00 pm'}],
    '2026-10-22':[{title:'ISO Readiness Assessment',desc:'Internal audit ahead of annual ISO certification review.',time:'9:00 am'}],
    '2026-10-29':[{title:'Halloween Team Social',desc:'Fun office celebration with costume contest and games.',time:'3:00 pm'}],
    '2026-11-5': [{title:'Q4 Planning Session',desc:'Final quarter strategy meeting for all business units.',time:'9:00 am'}],
    '2026-11-12':[{title:'Veterans Appreciation Event',desc:'Recognition ceremony for employees with long service.',time:'10:00 am'}],
    '2026-11-19':[{title:'Year-End Budget Review',desc:'Finance and department heads finalize 2027 budget proposals.',time:'9:00 am'}],
    '2026-11-26':[{title:'Thanksgiving Employee Feast',desc:'Company-sponsored lunch to thank all staff for the year.',time:'12:00 pm'}],
    '2026-12-3': [{title:'Year-End Operations Wrap-up',desc:'Final review of all active contracts and SLA compliance.',time:'9:00 am'}],
    '2026-12-10':[{title:'Christmas Party 2026',desc:'Annual company Christmas celebration with awards night.',time:'5:00 pm'}],
    '2026-12-15':[{title:'Last Day Town Hall',desc:'CEO year-in-review address and 2027 outlook presentation.',time:'10:00 am'}],
    '2026-12-18':[{title:'Holiday Office Closure',desc:'Office closes for the holiday season. Resumes Jan 4, 2027.',time:'All day'}],
    '2026-12-25':[{title:'Christmas Day',desc:'Public holiday — office closed.',time:'All day'}],
    '2026-12-31':[{title:"New Year's Eve",desc:'Office closed. Wishing all clients and staff a Happy 2027!',time:'All day'}],
  };

  const MN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const today = new Date();
  const MIN_Y=2026, MIN_M=1, MAX_Y=2026, MAX_M=11;
  let cy=today.getFullYear(), cm=today.getMonth();
  if(cy<MIN_Y||(cy===MIN_Y&&cm<MIN_M)){cy=MIN_Y;cm=MIN_M;}
  if(cy>MAX_Y||(cy===MAX_Y&&cm>MAX_M)){cy=MAX_Y;cm=MAX_M;}

  const lbl=document.getElementById('calLbl'), grid=document.getElementById('calGrid'),
        btnP=document.getElementById('calP'), btnN=document.getElementById('calN'),
        evLbl=document.getElementById('evLbl'), evCnt=document.getElementById('evCnt'),
        evList=document.getElementById('evList');

  const key=(y,m,d)=>y+'-'+(m+1)+'-'+d;

  function render(){
    lbl.textContent=MN[cm]+' '+cy;
    btnP.disabled=(cy===MIN_Y&&cm===MIN_M);
    btnN.disabled=(cy===MAX_Y&&cm===MAX_M);
    const first=new Date(cy,cm,1).getDay(), days=new Date(cy,cm+1,0).getDate();
    grid.innerHTML='';
    for(let i=0;i<first;i++){const e=document.createElement('div');e.className='cal-d empty';grid.appendChild(e);}
    for(let d=1;d<=days;d++){
      const e=document.createElement('div');
      const isT=d===today.getDate()&&cm===today.getMonth()&&cy===today.getFullYear();
      const hasE=!!EVENTS[key(cy,cm,d)];
      e.className='cal-d'+(isT?' today':'')+(hasE?' has-event':'');
      e.textContent=d;
      e.addEventListener('click',()=>showDay(d));
      grid.appendChild(e);
    }
    showMonth();
  }

  function showMonth(){
    evLbl.textContent=MN[cm]+' '+cy;
    const evs=[];
    const days=new Date(cy,cm+1,0).getDate();
    for(let d=1;d<=days;d++){const k=key(cy,cm,d);if(EVENTS[k])EVENTS[k].forEach(ev=>evs.push({day:d,...ev}));}
    renderList(evs);
  }

  function showDay(d){
    grid.querySelectorAll('.cal-d:not(.empty)').forEach((el,i)=>el.classList.toggle('selected',i+1===d));
    evLbl.textContent=MN[cm]+' '+d+', '+cy;
    const evs=(EVENTS[key(cy,cm,d)]||[]).map(ev=>({day:d,...ev}));
    renderList(evs);
  }

  const calI=`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`;
  const clkI=`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;

  function renderList(evs){
    evCnt.textContent=evs.length+(evs.length===1?' event':' events');
    if(!evs.length){evList.innerHTML='<div class="ev-empty">No events scheduled</div>';return;}
    evList.innerHTML=evs.map(ev=>`
      <div class="ev-item">
        <div class="ev-item-title">${ev.title}</div>
        <div class="ev-item-desc">${ev.desc}</div>
        <div class="ev-item-meta"><span>${calI} ${MN[cm]} ${ev.day}</span><span>${clkI} ${ev.time}</span></div>
      </div>`).join('');
  }

  btnP.addEventListener('click',()=>{if(cm===0){cy--;cm=11;}else cm--;render();});
  btnN.addEventListener('click',()=>{if(cm===11){cy++;cm=0;}else cm++;render();});
  render();
})();