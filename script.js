const weeks = [
 {n:1,title:"Java Fundamentals",desc:"Basic Java concepts, data types, variables and type conversion.",icon:"⌘"},
 {n:2,title:"Classes and Objects",desc:"Class fundamentals, declaring objects and object-oriented basics.",icon:"▣"},
 {n:3,title:"Methods and Constructors",desc:"Methods, constructors, the this keyword and object behavior.",icon:"⚙"},
 {n:4,title:"Object-Oriented Concepts",desc:"Experiments and practice with core Java class concepts.",icon:"◇"},
 {n:5,title:"Constructors and this",desc:"Constructor overloading, chaining and using the this keyword.",icon:"⌘"},
 {n:6,title:"Object Methods",desc:"Static members, final keyword and related Java concepts.",icon:"▤"},
 {n:7,title:"Strings and Inheritance",desc:"String handling, inheritance and the super keyword.",icon:"Aa"},
 {n:8,title:"Java Inheritance",desc:"Inheritance-related examples and object-oriented practice.",icon:"⇧"},
 {n:9,title:"Packages",desc:"User-defined packages and importing package classes.",icon:"▧"},
 {n:10,title:"Exception Handling",desc:"Try-catch, multiple exceptions, throw, throws and finally.",icon:"⚠"},
 {n:11,title:"Java I/O Streams",desc:"Reader, Writer, file reading, writing and copying.",icon:"⇄"},
 {n:12,title:"Threads and Lambda",desc:"Multithreading, thread priorities, synchronization and lambda expressions.",icon:"⌁"}
];
const grid = document.getElementById('recordsGrid');
const search = document.getElementById('searchInput');
const filter = document.getElementById('weekFilter');
const empty = document.getElementById('emptyState');
function renderRecords(){
 const q = search.value.trim().toLowerCase();
 const f = filter.value;
 const filtered = weeks.filter(w=>{
   const matchesText = (`week ${w.n} ${w.title} ${w.desc}`).toLowerCase().includes(q);
   const matchesFilter = f==='all' || (f==='1-4'&&w.n<=4) || (f==='5-8'&&w.n>=5&&w.n<=8) || (f==='9-12'&&w.n>=9);
   return matchesText&&matchesFilter;
 });
 grid.innerHTML = filtered.map((w,i)=>`<article class="record-card" style="animation-delay:${Math.min(i*35,300)}ms">
   <div class="record-top"><span class="week-chip">WEEK ${String(w.n).padStart(2,'0')}</span><span class="record-icon">${w.icon}</span></div>
   <h3>${w.title}</h3><p>${w.desc}</p>
   <div class="record-actions"><a class="view-btn" href="pdfs/week-${String(w.n).padStart(2,'0')}.pdf" target="_blank" rel="noopener">↗ View PDF</a>
   <a class="download-btn" href="pdfs/week-${String(w.n).padStart(2,'0')}.pdf" download="Dharhas_Java_Week_${String(w.n).padStart(2,'0')}.pdf" aria-label="Download week ${w.n} PDF" title="Download PDF">↓</a></div>
 </article>`).join('');
 empty.hidden = filtered.length>0;
}
function makeBars(){
 const bars = document.getElementById('bars');
 bars.innerHTML = weeks.map(w=>`<div class="bar-wrap" title="Week ${w.n}"><div class="bar" style="height:${30+(w.n%4)*14+Math.min(w.n*3,25)}%"></div><span class="bar-label">${String(w.n).padStart(2,'0')}</span></div>`).join('');
}
search.addEventListener('input',renderRecords);
filter.addEventListener('change',renderRecords);
makeBars();renderRecords();

const sidebar=document.getElementById('sidebar');
const overlay=document.getElementById('mobileOverlay');
function closeMenu(){sidebar.classList.remove('open');overlay.classList.remove('show')}
document.getElementById('menuToggle').addEventListener('click',()=>{sidebar.classList.toggle('open');overlay.classList.toggle('show')});
overlay.addEventListener('click',closeMenu);
document.querySelectorAll('.nav-link').forEach(link=>link.addEventListener('click',()=>{
 document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active'));
 link.classList.add('active');closeMenu();
}));
const themeToggle=document.getElementById('themeToggle');
if(localStorage.getItem('dharhas-theme')==='dark')document.body.classList.add('dark');
themeToggle.addEventListener('click',()=>{
 document.body.classList.toggle('dark');
 localStorage.setItem('dharhas-theme',document.body.classList.contains('dark')?'dark':'light');
});
