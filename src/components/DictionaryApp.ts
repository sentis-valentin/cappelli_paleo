import { Modal } from "./Modal.js";
import { CappelliConfig } from "../types/index.js";

export class DictionaryApp {
  private modals: Map<string, Modal> = new Map();
  private config: CappelliConfig;

  constructor(config: CappelliConfig) {
    this.config = config;
    this.init();
  }

  private init(): void {
    this.setupTheme();
    this.createHeader();
    this.createDictionaryTable();
    this.bindEvents();
  }

  private setupTheme(): void {
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem("gruvbox-theme") || "dark";
    this.setTheme(savedTheme);
  }

  private setTheme(theme: string): void {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }

  private createThemeToggle(): HTMLButtonElement {
    const themeToggle = document.createElement("button");
    themeToggle.className = "btn-theme-toggle-header";
    themeToggle.setAttribute("aria-label", "Toggle theme");
    themeToggle.setAttribute("title", "Switch between light and dark theme");

    // Set initial icon
    this.updateThemeToggleIcon(themeToggle);

    themeToggle.addEventListener("click", () => this.toggleTheme(themeToggle));
    return themeToggle;
  }

  private updateThemeToggleIcon(button: HTMLButtonElement): void {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";
    if (currentTheme === "dark") {
      button.innerHTML = '<span class="mr-1">🌙</span><span class="text-xs font-hamlet">Dark</span>';
    } else {
      button.innerHTML = '<span class="mr-1">☀️</span><span class="text-xs font-hamlet">Light</span>';
    }
  }

  private toggleTheme(button: HTMLButtonElement): void {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    this.setTheme(newTheme);
    localStorage.setItem("gruvbox-theme", newTheme);
    this.updateThemeToggleIcon(button);

    // Add transition effect
    document.documentElement.style.transition = "all 0.3s ease";
    setTimeout(() => {
      document.documentElement.style.transition = "";
    }, 300);
  }

  private createHeader(): void {
    const headerBox = document.createElement("div");
    headerBox.className = "header-gruvbox relative flex items-center justify-center";

    // Create rainbow border
    const borderDiv = document.createElement("div");
    borderDiv.className =
      "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gruvbox-orange via-gruvbox-yellow via-gruvbox-green via-gruvbox-blue to-gruvbox-purple dark:from-gruvbox-light-orange dark:via-gruvbox-light-yellow dark:via-gruvbox-light-green dark:via-gruvbox-light-blue dark:to-gruvbox-light-purple";

    const title = document.createElement("h1");
    title.className = "title-gruvbox text-center";
    title.textContent = this.config.title;

    // Create theme toggle button positioned absolutely on the right
    const themeToggle = this.createThemeToggle();
    themeToggle.style.position = "absolute";
    themeToggle.style.right = "16px";
    themeToggle.style.top = "50%";
    themeToggle.style.transform = "translateY(-50%)";

    headerBox.appendChild(borderDiv);
    headerBox.appendChild(title);
    headerBox.appendChild(themeToggle);
    document.body.appendChild(headerBox);
  }

  private createDictionaryTable(): void {
    const container = document.createElement("div");
    container.className = "mx-4 my-4";

    const table = document.createElement("table");
    table.className = "table-gruvbox border-separate border-spacing-1 w-full";

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = this.createHeaderRow();
    const bodyRow = this.createTableRows();

    thead.appendChild(headerRow);
    tbody.appendChild(bodyRow);
    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
    document.body.appendChild(container);
  }

  private createHeaderRow(): HTMLTableRowElement {
    const row = document.createElement("tr");
    const letters = [
      "A",
      "B",
      "C",
      "Con",
      "D",
      "E",
      "F",
      "G,H",
      "I,K",
      "L",
      "M",
      "N,O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "V,X,Y,Z",
    ];

    letters.forEach((letter) => {
      const th = document.createElement("th");
      th.className = "text-center align-top w-20 h-12 p-2";

      const letterSpan = document.createElement("span");
      letterSpan.className =
        "text-gruvbox-orange dark:text-gruvbox-light-orange font-hamlet font-bold text-lg";
      letterSpan.innerHTML = `${letter}`;

      // Add underline decoration
      const underline = document.createElement("div");
      underline.className =
        "absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/5 h-0.5 bg-gradient-to-r from-transparent via-gruvbox-orange dark:via-gruvbox-light-orange to-transparent rounded-full";
      letterSpan.appendChild(underline);

      th.appendChild(letterSpan);
      row.appendChild(th);
    });

    return row;
  }

  private createTableRows(): HTMLTableRowElement {
    const row = document.createElement("tr");

    for (let i = 0; i < 18; i++) {
      const td = document.createElement("td");
      td.className = "table-gruvbox td align-top text-center";
      td.innerHTML = this.createColumnButtons(i);
      row.appendChild(td);
    }

    return row;
  }

  private createColumnButtons(columnIndex: number): string {
    const letters = [
      "A",
      "B",
      "C",
      "Con",
      "D",
      "E",
      "F",
      "G,H",
      "I,K",
      "L",
      "M",
      "N,O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "V,X,Y,Z",
    ];

    const baseLetter = letters[columnIndex];
    const sampleEntries = this.generateEntriesForLetter(
      baseLetter,
      columnIndex,
    );

    return sampleEntries
      .map((entry) => {
        const buttonClass = this.getButtonClass(columnIndex);
        return `<div class="flex justify-center mb-2">
          <button class="${buttonClass} shimmer w-16 mx-1 text-center" data-modal="${entry.modalId}">
            ${entry.text}
          </button>
        </div>`;
      })
      .join("");
  }

  private getButtonClass(columnIndex: number): string {
    // Alternate between different button styles for visual variety
    const styles = ["btn-gruvbox", "btn-gruvbox-info", "btn-gruvbox-hover"];
    return styles[columnIndex % styles.length];
  }


  private generateEntriesForLetter(
    letter: string,
    _columnIndex: number,
  ): Array<{ text: string; modalId: string }> {
    // Same data structure as before, but returning the real Cappelli entries
    const letterData: {
      [key: string]: Array<{ text: string; modalId: string }>;
    } = {
      A: [
        { text: "A", modalId: "CPLLI002" },
        { text: "AA<sup>ti</sup>", modalId: "CPLLI004" },
        { text: "AC", modalId: "CPLLI006" },
        { text: "ACTU", modalId: "CPLLI008" },
        { text: "ADUSO", modalId: "CPLLI010" },
        { text: "AGTOS", modalId: "CPLLI012" },
        { text: "ALL", modalId: "CPLLI014" },
        { text: "AMT", modalId: "CPLLI016" },
        { text: "AO<sup>o</sup>", modalId: "CPLLI018" },
        { text: "APPB", modalId: "CPLLI020" },
        { text: "ARG<sup>ta</sup>", modalId: "CPLLI022" },
        { text: "AR", modalId: "CPLLI024" },
        { text: "AT", modalId: "CPLLI026" },
        { text: "AUDR", modalId: "CPLLI028" },
      ],
      B: [
        { text: "B", modalId: "CPLLI030" },
        { text: "BAPT", modalId: "CPLLI032" },
        { text: "BL", modalId: "CPLLI034" },
        { text: "BOI", modalId: "CPLLI036" },
        { text: "BTO", modalId: "CPLLI038" },
      ],
      C: [
        { text: "C", modalId: "CPLLI040" },
        { text: "CA<sup>li</sup>", modalId: "CPLLI042" },
        { text: "CAN<sup>ro</sup>", modalId: "CPLLI044" },
        { text: "CAR", modalId: "CPLLI046" },
        { text: "CAUOE", modalId: "CPLLI048" },
        { text: "CDDI", modalId: "CPLLI050" },
        { text: "CHOR", modalId: "CPLLI052" },
        { text: "CLAUE", modalId: "CPLLI054" },
        { text: "CO<sup>b</sup>", modalId: "CPLLI056" },
        { text: "COITER", modalId: "CPLLI058" },
        { text: "CONCTOS", modalId: "CPLLI060" },
        { text: "COR<sup>m</sup>", modalId: "CPLLI062" },
        { text: "CONT", modalId: "CPLLI064" },
        { text: "CSSR", modalId: "CPLLI066" },
      ],
      Con: [
        { text: "9", modalId: "CPLLI068" },
        { text: "<sub>9</sub>sm", modalId: "CPLLI070" },
        { text: "<sub>9</sub>CSIO", modalId: "CPLLI072" },
        { text: "<sub>9</sub>FESS", modalId: "CPLLI074" },
        { text: "<sub>9</sub>HT", modalId: "CPLLI076" },
        { text: "<sub>9</sub>NE", modalId: "CPLLI078" },
        { text: "<sub>9</sub>PLE<sup>a</sup>", modalId: "CPLLI080" },
        { text: "<sub>9</sub>SGIT", modalId: "CPLLI082" },
        { text: "<sub>9</sub>T<sup>i</sup>CO", modalId: "CPLLI084" },
      ],
      D: [
        { text: "D", modalId: "CPLLI086" },
        { text: "D<sup>m</sup>", modalId: "CPLLI088" },
        { text: "DC", modalId: "CPLLI090" },
        { text: "DDI", modalId: "CPLLI092" },
        { text: "DEFQL", modalId: "CPLLI094" },
        { text: "DET", modalId: "CPLLI096" },
        { text: "DICS", modalId: "CPLLI098" },
        { text: "DILNT", modalId: "CPLLI100" },
        { text: "DISSA", modalId: "CPLLI102" },
        { text: "DMRO", modalId: "CPLLI104" },
        { text: "DNTI", modalId: "CPLLI106" },
        { text: "DOT", modalId: "CPLLI108" },
        {
          text: "DSC<sup>i</sup><sup>P</sup><sup>o</sup>",
          modalId: "CPLLI110",
        },
        { text: "DUAt", modalId: "CPLLI112" },
      ],
      E: [
        { text: "E<sup>9</sup>a", modalId: "CPLLI114" },
        { text: "ECCLIIS", modalId: "CPLLI116" },
        { text: "EG", modalId: "CPLLI118" },
        { text: "ELIE", modalId: "CPLLI120" },
        { text: "EPH", modalId: "CPLLI122" },
        { text: "ER", modalId: "CPLLI124" },
        { text: "EVI", modalId: "CPLLI126" },
        { text: "E<sup>xtis</sup>", modalId: "CPLLI128" },
        { text: "EXMO", modalId: "CPLLI130" },
        { text: "EXT", modalId: "CPLLI132" },
      ],
      F: [
        { text: "F<sup>9</sup>", modalId: "CPLLI134" },
        { text: "FCTO", modalId: "CPLLI136" },
        { text: "FI<sup>c</sup>", modalId: "CPLLI138" },
        { text: "FLE", modalId: "CPLLI140" },
        { text: "FOA<sup>n</sup>", modalId: "CPLLI142" },
        { text: "FRDIC", modalId: "CPLLI144" },
        { text: "FT<sup>m</sup>", modalId: "CPLLI146" },
      ],
      "G,H": [
        { text: "G<sup>atir</sup>", modalId: "CPLLI148" },
        { text: "GEO<sup>a</sup>", modalId: "CPLLI150" },
        { text: "GN<sup>le</sup>", modalId: "CPLLI152" },
        { text: "GRAT", modalId: "CPLLI154" },
        { text: "H", modalId: "CPLLI156" },
        { text: "HAIT", modalId: "CPLLI158" },
        { text: "HERIUS", modalId: "CPLLI160" },
        { text: "HLUD", modalId: "CPLLI162" },
        { text: "HOMIJ", modalId: "CPLLI164" },
        { text: "HUAI<sup>t</sup>", modalId: "CPLLI166" },
      ],
      "I,K": [
        { text: "I", modalId: "CPLLI168" },
        { text: "I<sup>ti</sup>", modalId: "CPLLI170" },
        { text: "ICOTIt", modalId: "CPLLI172" },
        { text: "IEM", modalId: "CPLLI174" },
        { text: "IHET", modalId: "CPLLI176" },
        { text: "ILLU<sup>es</sup>", modalId: "CPLLI178" },
        { text: "IND<sup>r</sup>", modalId: "CPLLI180" },
        { text: "INQ<sup>o</sup>NU", modalId: "CPLLI182" },
        { text: "INTELLS", modalId: "CPLLI184" },
        { text: "IP", modalId: "CPLLI186" },
        { text: "IPSSOM", modalId: "CPLLI188" },
        { text: "ISTA", modalId: "CPLLI190" },
        { text: "ITE<sup>r</sup>", modalId: "CPLLI192" },
        { text: "IVD", modalId: "CPLLI194" },
        { text: "KA", modalId: "CPLLI196" },
      ],
      L: [
        { text: "L", modalId: "CPLLI198" },
        { text: "LAT", modalId: "CPLLI200" },
        { text: "LEGME", modalId: "CPLLI202" },
        { text: "LL", modalId: "CPLLI204" },
        { text: "LP", modalId: "CPLLI206" },
      ],
      M: [
        { text: "M", modalId: "CPLLI208" },
        { text: "M<sup>i</sup>", modalId: "CPLLI210" },
        { text: "MAE", modalId: "CPLLI212" },
        { text: "MATH<sup>ca</sup>", modalId: "CPLLI214" },
        { text: "ME<sup>oa</sup>", modalId: "CPLLI216" },
        { text: "MGRAT", modalId: "CPLLI218" },
        { text: "MIST", modalId: "CPLLI220" },
        { text: "MM", modalId: "CPLLI222" },
        { text: "MOIO", modalId: "CPLLI224" },
        { text: "MRES", modalId: "CPLLI226" },
        { text: "M<sup>a</sup>TOR", modalId: "CPLLI228" },
      ],
      "N,O": [
        { text: "N", modalId: "CPLLI230" },
        { text: "N<sup>r</sup>ALE", modalId: "CPLLI232" },
        { text: "NE", modalId: "CPLLI234" },
        { text: "NLLI", modalId: "CPLLI236" },
        { text: "NOA", modalId: "CPLLI238" },
        { text: "NOS", modalId: "CPLLI240" },
        { text: "NS", modalId: "CPLLI242" },
        { text: "O", modalId: "CPLLI244" },
        { text: "OBEE", modalId: "CPLLI246" },
        { text: "ODO", modalId: "CPLLI248" },
        { text: "OMA", modalId: "CPLLI250" },
        { text: "OP<sup>t</sup>", modalId: "CPLLI252" },
        { text: "ORAT", modalId: "CPLLI254" },
      ],
      P: [
        { text: "P", modalId: "CPLLI256" },
        { text: "P<sup>a</sup>", modalId: "CPLLI258" },
        { text: "P<sup>ra</sup>", modalId: "CPLLI260" },
        { text: "PAN", modalId: "CPLLI262" },
        { text: "PBRJS", modalId: "CPLLI264" },
        { text: "P<sup>a</sup>CO", modalId: "CPLLI266" },
        { text: "PE", modalId: "CPLLI268" },
        { text: "PF", modalId: "CPLLI270" },
        { text: "PHICO", modalId: "CPLLI272" },
        { text: "PLAC", modalId: "CPLLI274" },
        { text: "PM", modalId: "CPLLI276" },
        { text: "PNIE", modalId: "CPLLI278" },
        { text: "P<sup>i</sup>O", modalId: "CPLLI280" },
        { text: "POR<sup>o</sup>", modalId: "CPLLI282" },
        { text: "PP<sup>e</sup>", modalId: "CPLLI284" },
        { text: "PPHE", modalId: "CPLLI286" },
        { text: "PPTI", modalId: "CPLLI288" },
        { text: "P<sup>a</sup>RI", modalId: "CPLLI290" },
        { text: "P<sup>a</sup>S", modalId: "CPLLI292" },
        { text: "PT", modalId: "CPLLI294" },
        { text: "PTI<sup>re</sup>", modalId: "CPLLI296" },
        { text: "PUEI<sup>a</sup>", modalId: "CPLLI298" },
      ],
      Q: [
        { text: "Q", modalId: "CPLLI300" },
        { text: "Q", modalId: "CPLLI302" },
        { text: "Q<sup>e</sup>", modalId: "CPLLI304" },
        { text: "QBDA", modalId: "CPLLI306" },
        { text: "QDC", modalId: "CPLLI308" },
        { text: "Q<sup>a</sup>LR", modalId: "CPLLI310" },
        { text: "Q<sup>a</sup>NTO", modalId: "CPLLI312" },
        { text: "QRE<sup>s</sup>", modalId: "CPLLI314" },
        { text: "QTO", modalId: "CPLLI316" },
      ],
      R: [
        { text: "R", modalId: "CPLLI318" },
        { text: "R<sup>oe</sup>", modalId: "CPLLI320" },
        { text: "RCA", modalId: "CPLLI322" },
        { text: "RECIPTI", modalId: "CPLLI324" },
        { text: "RENT", modalId: "CPLLI326" },
        { text: "RFI<sup>di</sup>", modalId: "CPLLI328" },
        { text: "RLTIA", modalId: "CPLLI330" },
        { text: "ROALE", modalId: "CPLLI332" },
        { text: "RQ<sup>ir</sup>", modalId: "CPLLI334" },
      ],
      S: [
        { text: "S", modalId: "CPLLI336" },
        { text: "S<sup>coes</sup>", modalId: "CPLLI338" },
        { text: "SACLIT", modalId: "CPLLI340" },
        { text: "SB<sup>e</sup>", modalId: "CPLLI342" },
        { text: "SCD", modalId: "CPLLI344" },
        { text: "SCOS", modalId: "CPLLI346" },
        { text: "SEC", modalId: "CPLLI348" },
        { text: "SFI<sup>at</sup>", modalId: "CPLLI350" },
        { text: "SIGNAT", modalId: "CPLLI352" },
        { text: "SLE", modalId: "CPLLI354" },
        { text: "SO<sup>a</sup>", modalId: "CPLLI356" },
        { text: "SPA<sup>r</sup>", modalId: "CPLLI358" },
        { text: "SPM", modalId: "CPLLI360" },
        { text: "SRI", modalId: "CPLLI362" },
        { text: "SSS", modalId: "CPLLI364" },
        { text: "STO", modalId: "CPLLI366" },
        { text: "SUO", modalId: "CPLLI368" },
      ],
      T: [
        { text: "T", modalId: "CPLLI370" },
        { text: "T<sup>r</sup>BA", modalId: "CPLLI372" },
        { text: "TEST", modalId: "CPLLI374" },
        { text: "TIN", modalId: "CPLLI376" },
        { text: "T<sup>a</sup>NS<sup>t</sup>", modalId: "CPLLI378" },
        { text: "TPR", modalId: "CPLLI380" },
        { text: "TT<sup>li</sup>", modalId: "CPLLI382" },
      ],
      "V,X,Y,Z": [
        { text: "V", modalId: "CPLLI384" },
        { text: "VAR", modalId: "CPLLI386" },
        { text: "VEL", modalId: "CPLLI388" },
        { text: "VI<sup>c</sup>", modalId: "CPLLI390" },
        { text: "VINT<sup>o</sup>", modalId: "CPLLI392" },
        { text: "VMEC", modalId: "CPLLI394" },
        { text: "VONA", modalId: "CPLLI396" },
        { text: "US", modalId: "CPLLI398" },
        { text: "WILLS", modalId: "CPLLI400" },
        { text: "XANA", modalId: "CPLLI402" },
        { text: "YDIOt", modalId: "CPLLI404" },
      ],
    };

    return letterData[letter] || [];
  }

  private bindEvents(): void {
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (
        target.classList.contains("btn-gruvbox") ||
        target.classList.contains("btn-gruvbox-info") ||
        target.classList.contains("btn-gruvbox-hover")
      ) {
        const modalId = target.dataset.modal;
        if (modalId) {
          this.openModal(modalId);
        }
      }
    });
  }

  private openModal(modalId: string): void {
    if (!this.modals.has(modalId)) {
      const imagePath = `Departments/Medieval/Cappelli/${modalId}.jpg`;
      const modal = new Modal({
        id: modalId,
        imagePath: imagePath,
        title: `Dictionary entry ${modalId}`,
      });
      this.modals.set(modalId, modal);
    }

    const modal = this.modals.get(modalId);
    modal?.open();
  }

  public destroy(): void {
    this.modals.forEach((modal) => modal.destroy());
    this.modals.clear();
  }
}
