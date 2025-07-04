export interface ModalConfig {
  id: string;
  imagePath: string;
  title: string;
}

export class Modal {
  private modal: HTMLDivElement;
  private config: ModalConfig;

  constructor(config: ModalConfig) {
    this.config = config;
    this.modal = this.createModal();
    this.bindEvents();
  }

  private createModal(): HTMLDivElement {
    const modal = document.createElement("div");
    modal.className = `
      modal fixed inset-0 z-50
      bg-black/50
      flex items-center justify-center
      p-4
      opacity-0 pointer-events-none
      transition-opacity duration-300
    `;
    modal.id = this.config.id;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", `${this.config.id}-title`);

    const modalContent = document.createElement("div");
    modalContent.className = `
      bg-gruvbox-bg-soft dark:bg-gruvbox-light-bg-soft
      border border-gruvbox-bg3 dark:border-gruvbox-light-bg3
      rounded-lg
      shadow-xl
      w-[60vw] h-[60vh]
      relative
      transform scale-95
      transition-transform duration-300
      flex flex-col
    `;

    // Close button
    const closeButton = document.createElement("button");
    closeButton.className = `
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
    `;
    closeButton.innerHTML = "×";
    closeButton.setAttribute("aria-label", "Close modal");
    closeButton.addEventListener("click", () => this.close());

    // Container pour l'image avec taille fixe
    const imageContainer = document.createElement("div");
    imageContainer.className = `
      overflow-auto
      flex-1
      bg-gruvbox-bg-hard dark:bg-gruvbox-light-bg-hard
    `;
    imageContainer.style.cssText = `
      scrollbar-width: auto;
      scrollbar-color: rgb(254 128 25) rgb(60 56 54);
    `;

    const image = document.createElement("img");
    image.src = this.config.imagePath;
    image.alt = this.config.title;
    image.className = `
      block
      cursor-grab active:cursor-grabbing
      transition-opacity duration-300
    `;
    image.style.cssText = `
      max-width: none;
      max-height: none;
      width: auto;
      height: 60em;
      display: block;
    `;
    image.id = `${this.config.id}-title`;

    // Variables pour le zoom supprimées

    // Mettre l'image dans le container
    imageContainer.appendChild(image);

    // Fonction de zoom supprimée

    // Assemble modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(imageContainer);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
    return modal;
  }

  private bindEvents(): void {
    // Close on overlay click
    this.modal.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });

    // Prevent body scroll when modal is open
    this.modal.addEventListener("transitionend", () => {
      if (this.isOpen()) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
  }

  public open(): void {
    // Show modal
    this.modal.style.display = "flex";
    
    // Force reflow then animate
    requestAnimationFrame(() => {
      this.modal.classList.remove("opacity-0", "pointer-events-none");
      this.modal.classList.add("opacity-100");

      const content = this.modal.querySelector("div:first-child") as HTMLElement;
      if (content) {
        content.classList.remove("scale-95");
        content.classList.add("scale-100");
      }
    });

    // Focus management
    const closeButton = this.modal.querySelector("button");
    if (closeButton) {
      setTimeout(() => closeButton.focus(), 100);
    }

    // Prevent background scroll
    document.body.style.overflow = "hidden";
  }

  public close(): void {
    // Animate out
    this.modal.classList.remove("opacity-100");
    this.modal.classList.add("opacity-0", "pointer-events-none");

    const content = this.modal.querySelector("div:first-child") as HTMLElement;
    if (content) {
      content.classList.remove("scale-100");
      content.classList.add("scale-95");
    }

    // Hide after animation
    setTimeout(() => {
      this.modal.style.display = "none";
      document.body.style.overflow = "";
    }, 300);
  }

  public isOpen(): boolean {
    return !this.modal.classList.contains("opacity-0");
  }

  public destroy(): void {
    this.close();
    setTimeout(() => {
      if (this.modal.parentNode) {
        this.modal.parentNode.removeChild(this.modal);
      }
    }, 300);
  }
}
