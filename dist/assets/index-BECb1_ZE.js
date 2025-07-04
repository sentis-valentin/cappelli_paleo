(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))o(d);new MutationObserver(d=>{for(const a of d)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function e(d){const a={};return d.integrity&&(a.integrity=d.integrity),d.referrerPolicy&&(a.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?a.credentials="include":d.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(d){if(d.ep)return;d.ep=!0;const a=e(d);fetch(d.href,a)}})();document.querySelector(".no-js")?.classList.remove("no-js");document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{document.body.classList.remove("loading-hidden"),document.body.classList.add("loading-visible");const s=document.getElementById("loading-indicator");s&&(s.style.opacity="0",setTimeout(()=>{s.remove()},300))},100)});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(s=>{console.log("SW registered: ",s)}).catch(s=>{console.log("SW registration failed: ",s)})});class r{constructor(t){this.config=t,this.modal=this.createModal(),this.bindEvents()}createModal(){const t=document.createElement("div");t.className=`
      modal fixed inset-0 z-50
      bg-black/50
      flex items-center justify-center
      p-4
      opacity-0 pointer-events-none
      transition-opacity duration-300
    `,t.id=this.config.id,t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby",`${this.config.id}-title`);const e=document.createElement("div");e.className=`
      bg-gruvbox-bg-soft dark:bg-gruvbox-light-bg-soft
      border border-gruvbox-bg3 dark:border-gruvbox-light-bg3
      rounded-lg
      shadow-xl
      w-[60vw] h-[60vh]
      relative
      transform scale-95
      transition-transform duration-300
      flex flex-col
    `;const o=document.createElement("button");o.className=`
      absolute top-3 right-3 z-10
      w-8 h-8 rounded-full
      bg-gruvbox-bg/80 dark:bg-gruvbox-light-bg/80
      hover:bg-gruvbox-red dark:hover:bg-gruvbox-light-red
      text-gruvbox-fg2 dark:text-gruvbox-light-fg2
      hover:text-gruvbox-bg-hard dark:hover:text-gruvbox-light-bg-hard
      transition-all duration-200
      flex items-center justify-center
      font-bold text-lg
      focus:outline-none focus:ring-2 focus:ring-gruvbox-orange dark:focus:ring-gruvbox-light-orange
      backdrop-blur-sm
    `,o.innerHTML="×",o.setAttribute("aria-label","Close modal"),o.addEventListener("click",()=>this.close());const d=document.createElement("div");d.className=`
      overflow-auto
      flex-1
      bg-gruvbox-bg-hard dark:bg-gruvbox-light-bg-hard
    `,d.style.cssText=`
      scrollbar-width: auto;
      scrollbar-color: rgb(254 128 25) rgb(60 56 54);
    `;const a=document.createElement("img");return a.src=this.config.imagePath,a.alt=this.config.title,a.className=`
      block
      cursor-grab active:cursor-grabbing
      transition-opacity duration-300
    `,a.style.cssText=`
      max-width: none;
      max-height: none;
      width: auto;
      height: 60em;
      display: block;
    `,a.id=`${this.config.id}-title`,d.appendChild(a),e.appendChild(o),e.appendChild(d),t.appendChild(e),document.body.appendChild(t),t}bindEvents(){this.modal.addEventListener("click",t=>{t.target===this.modal&&this.close()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&this.isOpen()&&this.close()}),this.modal.addEventListener("transitionend",()=>{this.isOpen()?document.body.style.overflow="hidden":document.body.style.overflow=""})}open(){this.modal.style.display="flex",requestAnimationFrame(()=>{this.modal.classList.remove("opacity-0","pointer-events-none"),this.modal.classList.add("opacity-100");const e=this.modal.querySelector("div:first-child");e&&(e.classList.remove("scale-95"),e.classList.add("scale-100"))});const t=this.modal.querySelector("button");t&&setTimeout(()=>t.focus(),100),document.body.style.overflow="hidden"}close(){this.modal.classList.remove("opacity-100"),this.modal.classList.add("opacity-0","pointer-events-none");const t=this.modal.querySelector("div:first-child");t&&(t.classList.remove("scale-100"),t.classList.add("scale-95")),setTimeout(()=>{this.modal.style.display="none",document.body.style.overflow=""},300)}isOpen(){return!this.modal.classList.contains("opacity-0")}destroy(){this.close(),setTimeout(()=>{this.modal.parentNode&&this.modal.parentNode.removeChild(this.modal)},300)}}class n{constructor(t){this.modals=new Map,this.config=t,this.init()}init(){this.setupTheme(),this.createHeader(),this.createDictionaryTable(),this.bindEvents()}setupTheme(){const t=localStorage.getItem("gruvbox-theme")||"dark";this.setTheme(t)}setTheme(t){t==="light"?(document.documentElement.classList.remove("dark"),document.documentElement.setAttribute("data-theme","light")):(document.documentElement.classList.add("dark"),document.documentElement.setAttribute("data-theme","dark"))}createThemeToggle(){const t=document.createElement("button");return t.className="btn-theme-toggle-header",t.setAttribute("aria-label","Toggle theme"),t.setAttribute("title","Switch between light and dark theme"),this.updateThemeToggleIcon(t),t.addEventListener("click",()=>this.toggleTheme(t)),t}updateThemeToggleIcon(t){(document.documentElement.getAttribute("data-theme")||"dark")==="dark"?t.innerHTML='<span class="mr-1">🌙</span><span class="text-xs font-hamlet">Dark</span>':t.innerHTML='<span class="mr-1">☀️</span><span class="text-xs font-hamlet">Light</span>'}toggleTheme(t){const o=(document.documentElement.getAttribute("data-theme")||"dark")==="dark"?"light":"dark";this.setTheme(o),localStorage.setItem("gruvbox-theme",o),this.updateThemeToggleIcon(t),document.documentElement.style.transition="all 0.3s ease",setTimeout(()=>{document.documentElement.style.transition=""},300)}createHeader(){const t=document.createElement("div");t.className="header-gruvbox relative flex items-center justify-center";const e=document.createElement("div");e.className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gruvbox-orange via-gruvbox-yellow via-gruvbox-green via-gruvbox-blue to-gruvbox-purple dark:from-gruvbox-light-orange dark:via-gruvbox-light-yellow dark:via-gruvbox-light-green dark:via-gruvbox-light-blue dark:to-gruvbox-light-purple";const o=document.createElement("h1");o.className="title-gruvbox text-center",o.textContent=this.config.title;const d=this.createThemeToggle();d.style.position="absolute",d.style.right="16px",d.style.top="50%",d.style.transform="translateY(-50%)",t.appendChild(e),t.appendChild(o),t.appendChild(d),document.body.appendChild(t)}createDictionaryTable(){const t=document.createElement("div");t.className="mx-4 my-4";const e=document.createElement("table");e.className="table-gruvbox border-separate border-spacing-1 w-full";const o=document.createElement("thead"),d=document.createElement("tbody"),a=this.createHeaderRow(),l=this.createTableRows();o.appendChild(a),d.appendChild(l),e.appendChild(o),e.appendChild(d),t.appendChild(e),document.body.appendChild(t)}createHeaderRow(){const t=document.createElement("tr");return["A","B","C","Con","D","E","F","G,H","I,K","L","M","N,O","P","Q","R","S","T","V,X,Y,Z"].forEach(o=>{const d=document.createElement("th");d.className="text-center align-top w-20 h-12 p-2";const a=document.createElement("span");a.className="text-gruvbox-orange dark:text-gruvbox-light-orange font-hamlet font-bold text-lg",a.innerHTML=`${o}`;const l=document.createElement("div");l.className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/5 h-0.5 bg-gradient-to-r from-transparent via-gruvbox-orange dark:via-gruvbox-light-orange to-transparent rounded-full",a.appendChild(l),d.appendChild(a),t.appendChild(d)}),t}createTableRows(){const t=document.createElement("tr");for(let e=0;e<18;e++){const o=document.createElement("td");o.className="table-gruvbox td align-top text-center",o.innerHTML=this.createColumnButtons(e),t.appendChild(o)}return t}createColumnButtons(t){const o=["A","B","C","Con","D","E","F","G,H","I,K","L","M","N,O","P","Q","R","S","T","V,X,Y,Z"][t];return this.generateEntriesForLetter(o,t).map(a=>`<div class="flex justify-center mb-2">
          <button class="${this.getButtonClass(t)} shimmer w-16 mx-1 text-center" data-modal="${a.modalId}">
            ${a.text}
          </button>
        </div>`).join("")}getButtonClass(t){const e=["btn-gruvbox","btn-gruvbox-info","btn-gruvbox-hover"];return e[t%e.length]}generateEntriesForLetter(t,e){return{A:[{text:"A",modalId:"CPLLI002"},{text:"AA<sup>ti</sup>",modalId:"CPLLI004"},{text:"AC",modalId:"CPLLI006"},{text:"ACTU",modalId:"CPLLI008"},{text:"ADUSO",modalId:"CPLLI010"},{text:"AGTOS",modalId:"CPLLI012"},{text:"ALL",modalId:"CPLLI014"},{text:"AMT",modalId:"CPLLI016"},{text:"AO<sup>o</sup>",modalId:"CPLLI018"},{text:"APPB",modalId:"CPLLI020"},{text:"ARG<sup>ta</sup>",modalId:"CPLLI022"},{text:"AR",modalId:"CPLLI024"},{text:"AT",modalId:"CPLLI026"},{text:"AUDR",modalId:"CPLLI028"}],B:[{text:"B",modalId:"CPLLI030"},{text:"BAPT",modalId:"CPLLI032"},{text:"BL",modalId:"CPLLI034"},{text:"BOI",modalId:"CPLLI036"},{text:"BTO",modalId:"CPLLI038"}],C:[{text:"C",modalId:"CPLLI040"},{text:"CA<sup>li</sup>",modalId:"CPLLI042"},{text:"CAN<sup>ro</sup>",modalId:"CPLLI044"},{text:"CAR",modalId:"CPLLI046"},{text:"CAUOE",modalId:"CPLLI048"},{text:"CDDI",modalId:"CPLLI050"},{text:"CHOR",modalId:"CPLLI052"},{text:"CLAUE",modalId:"CPLLI054"},{text:"CO<sup>b</sup>",modalId:"CPLLI056"},{text:"COITER",modalId:"CPLLI058"},{text:"CONCTOS",modalId:"CPLLI060"},{text:"COR<sup>m</sup>",modalId:"CPLLI062"},{text:"CONT",modalId:"CPLLI064"},{text:"CSSR",modalId:"CPLLI066"}],Con:[{text:"9",modalId:"CPLLI068"},{text:"<sub>9</sub>sm",modalId:"CPLLI070"},{text:"<sub>9</sub>CSIO",modalId:"CPLLI072"},{text:"<sub>9</sub>FESS",modalId:"CPLLI074"},{text:"<sub>9</sub>HT",modalId:"CPLLI076"},{text:"<sub>9</sub>NE",modalId:"CPLLI078"},{text:"<sub>9</sub>PLE<sup>a</sup>",modalId:"CPLLI080"},{text:"<sub>9</sub>SGIT",modalId:"CPLLI082"},{text:"<sub>9</sub>T<sup>i</sup>CO",modalId:"CPLLI084"}],D:[{text:"D",modalId:"CPLLI086"},{text:"D<sup>m</sup>",modalId:"CPLLI088"},{text:"DC",modalId:"CPLLI090"},{text:"DDI",modalId:"CPLLI092"},{text:"DEFQL",modalId:"CPLLI094"},{text:"DET",modalId:"CPLLI096"},{text:"DICS",modalId:"CPLLI098"},{text:"DILNT",modalId:"CPLLI100"},{text:"DISSA",modalId:"CPLLI102"},{text:"DMRO",modalId:"CPLLI104"},{text:"DNTI",modalId:"CPLLI106"},{text:"DOT",modalId:"CPLLI108"},{text:"DSC<sup>i</sup><sup>P</sup><sup>o</sup>",modalId:"CPLLI110"},{text:"DUAt",modalId:"CPLLI112"}],E:[{text:"E<sup>9</sup>a",modalId:"CPLLI114"},{text:"ECCLIIS",modalId:"CPLLI116"},{text:"EG",modalId:"CPLLI118"},{text:"ELIE",modalId:"CPLLI120"},{text:"EPH",modalId:"CPLLI122"},{text:"ER",modalId:"CPLLI124"},{text:"EVI",modalId:"CPLLI126"},{text:"E<sup>xtis</sup>",modalId:"CPLLI128"},{text:"EXMO",modalId:"CPLLI130"},{text:"EXT",modalId:"CPLLI132"}],F:[{text:"F<sup>9</sup>",modalId:"CPLLI134"},{text:"FCTO",modalId:"CPLLI136"},{text:"FI<sup>c</sup>",modalId:"CPLLI138"},{text:"FLE",modalId:"CPLLI140"},{text:"FOA<sup>n</sup>",modalId:"CPLLI142"},{text:"FRDIC",modalId:"CPLLI144"},{text:"FT<sup>m</sup>",modalId:"CPLLI146"}],"G,H":[{text:"G<sup>atir</sup>",modalId:"CPLLI148"},{text:"GEO<sup>a</sup>",modalId:"CPLLI150"},{text:"GN<sup>le</sup>",modalId:"CPLLI152"},{text:"GRAT",modalId:"CPLLI154"},{text:"H",modalId:"CPLLI156"},{text:"HAIT",modalId:"CPLLI158"},{text:"HERIUS",modalId:"CPLLI160"},{text:"HLUD",modalId:"CPLLI162"},{text:"HOMIJ",modalId:"CPLLI164"},{text:"HUAI<sup>t</sup>",modalId:"CPLLI166"}],"I,K":[{text:"I",modalId:"CPLLI168"},{text:"I<sup>ti</sup>",modalId:"CPLLI170"},{text:"ICOTIt",modalId:"CPLLI172"},{text:"IEM",modalId:"CPLLI174"},{text:"IHET",modalId:"CPLLI176"},{text:"ILLU<sup>es</sup>",modalId:"CPLLI178"},{text:"IND<sup>r</sup>",modalId:"CPLLI180"},{text:"INQ<sup>o</sup>NU",modalId:"CPLLI182"},{text:"INTELLS",modalId:"CPLLI184"},{text:"IP",modalId:"CPLLI186"},{text:"IPSSOM",modalId:"CPLLI188"},{text:"ISTA",modalId:"CPLLI190"},{text:"ITE<sup>r</sup>",modalId:"CPLLI192"},{text:"IVD",modalId:"CPLLI194"},{text:"KA",modalId:"CPLLI196"}],L:[{text:"L",modalId:"CPLLI198"},{text:"LAT",modalId:"CPLLI200"},{text:"LEGME",modalId:"CPLLI202"},{text:"LL",modalId:"CPLLI204"},{text:"LP",modalId:"CPLLI206"}],M:[{text:"M",modalId:"CPLLI208"},{text:"M<sup>i</sup>",modalId:"CPLLI210"},{text:"MAE",modalId:"CPLLI212"},{text:"MATH<sup>ca</sup>",modalId:"CPLLI214"},{text:"ME<sup>oa</sup>",modalId:"CPLLI216"},{text:"MGRAT",modalId:"CPLLI218"},{text:"MIST",modalId:"CPLLI220"},{text:"MM",modalId:"CPLLI222"},{text:"MOIO",modalId:"CPLLI224"},{text:"MRES",modalId:"CPLLI226"},{text:"M<sup>a</sup>TOR",modalId:"CPLLI228"}],"N,O":[{text:"N",modalId:"CPLLI230"},{text:"N<sup>r</sup>ALE",modalId:"CPLLI232"},{text:"NE",modalId:"CPLLI234"},{text:"NLLI",modalId:"CPLLI236"},{text:"NOA",modalId:"CPLLI238"},{text:"NOS",modalId:"CPLLI240"},{text:"NS",modalId:"CPLLI242"},{text:"O",modalId:"CPLLI244"},{text:"OBEE",modalId:"CPLLI246"},{text:"ODO",modalId:"CPLLI248"},{text:"OMA",modalId:"CPLLI250"},{text:"OP<sup>t</sup>",modalId:"CPLLI252"},{text:"ORAT",modalId:"CPLLI254"}],P:[{text:"P",modalId:"CPLLI256"},{text:"P<sup>a</sup>",modalId:"CPLLI258"},{text:"P<sup>ra</sup>",modalId:"CPLLI260"},{text:"PAN",modalId:"CPLLI262"},{text:"PBRJS",modalId:"CPLLI264"},{text:"P<sup>a</sup>CO",modalId:"CPLLI266"},{text:"PE",modalId:"CPLLI268"},{text:"PF",modalId:"CPLLI270"},{text:"PHICO",modalId:"CPLLI272"},{text:"PLAC",modalId:"CPLLI274"},{text:"PM",modalId:"CPLLI276"},{text:"PNIE",modalId:"CPLLI278"},{text:"P<sup>i</sup>O",modalId:"CPLLI280"},{text:"POR<sup>o</sup>",modalId:"CPLLI282"},{text:"PP<sup>e</sup>",modalId:"CPLLI284"},{text:"PPHE",modalId:"CPLLI286"},{text:"PPTI",modalId:"CPLLI288"},{text:"P<sup>a</sup>RI",modalId:"CPLLI290"},{text:"P<sup>a</sup>S",modalId:"CPLLI292"},{text:"PT",modalId:"CPLLI294"},{text:"PTI<sup>re</sup>",modalId:"CPLLI296"},{text:"PUEI<sup>a</sup>",modalId:"CPLLI298"}],Q:[{text:"Q",modalId:"CPLLI300"},{text:"Q",modalId:"CPLLI302"},{text:"Q<sup>e</sup>",modalId:"CPLLI304"},{text:"QBDA",modalId:"CPLLI306"},{text:"QDC",modalId:"CPLLI308"},{text:"Q<sup>a</sup>LR",modalId:"CPLLI310"},{text:"Q<sup>a</sup>NTO",modalId:"CPLLI312"},{text:"QRE<sup>s</sup>",modalId:"CPLLI314"},{text:"QTO",modalId:"CPLLI316"}],R:[{text:"R",modalId:"CPLLI318"},{text:"R<sup>oe</sup>",modalId:"CPLLI320"},{text:"RCA",modalId:"CPLLI322"},{text:"RECIPTI",modalId:"CPLLI324"},{text:"RENT",modalId:"CPLLI326"},{text:"RFI<sup>di</sup>",modalId:"CPLLI328"},{text:"RLTIA",modalId:"CPLLI330"},{text:"ROALE",modalId:"CPLLI332"},{text:"RQ<sup>ir</sup>",modalId:"CPLLI334"}],S:[{text:"S",modalId:"CPLLI336"},{text:"S<sup>coes</sup>",modalId:"CPLLI338"},{text:"SACLIT",modalId:"CPLLI340"},{text:"SB<sup>e</sup>",modalId:"CPLLI342"},{text:"SCD",modalId:"CPLLI344"},{text:"SCOS",modalId:"CPLLI346"},{text:"SEC",modalId:"CPLLI348"},{text:"SFI<sup>at</sup>",modalId:"CPLLI350"},{text:"SIGNAT",modalId:"CPLLI352"},{text:"SLE",modalId:"CPLLI354"},{text:"SO<sup>a</sup>",modalId:"CPLLI356"},{text:"SPA<sup>r</sup>",modalId:"CPLLI358"},{text:"SPM",modalId:"CPLLI360"},{text:"SRI",modalId:"CPLLI362"},{text:"SSS",modalId:"CPLLI364"},{text:"STO",modalId:"CPLLI366"},{text:"SUO",modalId:"CPLLI368"}],T:[{text:"T",modalId:"CPLLI370"},{text:"T<sup>r</sup>BA",modalId:"CPLLI372"},{text:"TEST",modalId:"CPLLI374"},{text:"TIN",modalId:"CPLLI376"},{text:"T<sup>a</sup>NS<sup>t</sup>",modalId:"CPLLI378"},{text:"TPR",modalId:"CPLLI380"},{text:"TT<sup>li</sup>",modalId:"CPLLI382"}],"V,X,Y,Z":[{text:"V",modalId:"CPLLI384"},{text:"VAR",modalId:"CPLLI386"},{text:"VEL",modalId:"CPLLI388"},{text:"VI<sup>c</sup>",modalId:"CPLLI390"},{text:"VINT<sup>o</sup>",modalId:"CPLLI392"},{text:"VMEC",modalId:"CPLLI394"},{text:"VONA",modalId:"CPLLI396"},{text:"US",modalId:"CPLLI398"},{text:"WILLS",modalId:"CPLLI400"},{text:"XANA",modalId:"CPLLI402"},{text:"YDIOt",modalId:"CPLLI404"}]}[t]||[]}bindEvents(){document.addEventListener("click",t=>{const e=t.target;if(e.classList.contains("btn-gruvbox")||e.classList.contains("btn-gruvbox-info")||e.classList.contains("btn-gruvbox-hover")){const o=e.dataset.modal;o&&this.openModal(o)}})}openModal(t){if(!this.modals.has(t)){const o=`Departments/Medieval/Cappelli/${t}.jpg`,d=new r({id:t,imagePath:o,title:`Dictionary entry ${t}`});this.modals.set(t,d)}this.modals.get(t)?.open()}destroy(){this.modals.forEach(t=>t.destroy()),this.modals.clear()}}const L={title:"A. CAPPELLI - DIZIONARIO DI ABBREVIATURE LATINE ED ITALIANE",baseImagePath:"Departments/Medieval/Cappelli/"};document.addEventListener("DOMContentLoaded",()=>{document.body.className="min-h-screen bg-gruvbox-bg-hard dark:bg-gruvbox-light-bg-hard text-gruvbox-primary font-sans transition-all duration-300 scrollbar-gruvbox overflow-x-auto",new n(L);const s=document.createElement("style");s.textContent=`
    /* Custom CSS for Tailwind enhancements */
    html {
      scroll-behavior: smooth;
    }
    
    /* Enhanced focus styles */
    button:focus-visible {
      outline: 2px solid rgb(254 128 25);
      outline-offset: 2px;
    }
    
    /* Better sup/sub rendering */
    sup, sub {
      font-size: 0.75em;
      line-height: 0;
      position: relative;
      vertical-align: baseline;
    }
    
    sup {
      top: -0.5em;
    }
    
    sub {
      bottom: -0.25em;
    }
    
    /* Improve button shimmer effect */
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    .shimmer::before {
      animation: shimmer 2s ease-in-out infinite;
    }
    
    /* Custom scrollbar for better cross-browser support */
    * {
      scrollbar-width: thin;
      scrollbar-color: rgb(146 131 116) rgb(29 32 33);
    }
    
    [data-theme="light"] * {
      scrollbar-color: rgb(146 131 116) rgb(249 245 215);
    }
    
    /* Modal specific styles */
    .modal {
      scrollbar-width: auto !important;
      scrollbar-color: rgb(254 128 25) rgb(60 56 54) !important;
    }
    
    .modal .overflow-auto {
      scrollbar-width: auto !important;
      scrollbar-color: rgb(254 128 25) rgb(60 56 54) !important;
    }
    
    /* Webkit scrollbars for modals */
    .modal .overflow-auto::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }
    
    .modal .overflow-auto::-webkit-scrollbar-track {
      background: rgb(60 56 54);
    }
    
    .modal .overflow-auto::-webkit-scrollbar-thumb {
      background: rgb(254 128 25);
      border-radius: 6px;
    }
    
    .modal .overflow-auto::-webkit-scrollbar-thumb:hover {
      background: rgb(254 128 25 / 0.8);
    }
  `,document.head.appendChild(s),document.addEventListener("keydown",t=>{if(t.key==="Escape"&&document.querySelectorAll(".modal").forEach(o=>{o instanceof HTMLElement&&!o.classList.contains("opacity-0")&&(o.classList.add("opacity-0","pointer-events-none"),o.classList.remove("opacity-100"),setTimeout(()=>{o.style.display="none"},300))}),(t.ctrlKey||t.metaKey)&&t.key==="d"){t.preventDefault();const e=document.querySelector(".btn-theme-toggle");e&&e.click()}}),"performance"in window&&window.addEventListener("load",()=>{const t=performance.getEntriesByType("navigation")[0];console.log(`🚀 Cappelli Dictionary loaded in ${Math.round(t.loadEventEnd-t.fetchStart)}ms`)}),console.log("📚 Cappelli Dictionary initialized with Tailwind CSS + Gruvbox theme")});
