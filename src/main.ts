import { DictionaryApp } from "./components/DictionaryApp.js";
import { CappelliConfig } from "./types/index.js";
import "./styles/output.css"; // Import generated Tailwind CSS

// Configuration
const config: CappelliConfig = {
  title: "A. CAPPELLI - DIZIONARIO DI ABBREVIATURE LATINE ED ITALIANE",
  baseImagePath: "Departments/Medieval/Cappelli/",
};

// Initialize the application with Tailwind CSS
document.addEventListener("DOMContentLoaded", () => {
  // Set up the body with base Tailwind classes
  document.body.className = "min-h-screen bg-gruvbox-bg-hard dark:bg-gruvbox-light-bg-hard text-gruvbox-primary font-sans transition-all duration-300 scrollbar-gruvbox overflow-x-auto";
  
  // Initialize the dictionary app
  new DictionaryApp(config);
  
  // Add global styles for better UX
  const style = document.createElement("style");
  style.textContent = `
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
  `;
  document.head.appendChild(style);
  
  // Add keyboard navigation support
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      // Close any open modals (compatible with new modal system)
      const modals = document.querySelectorAll(".modal");
      modals.forEach(modal => {
        if (modal instanceof HTMLElement && !modal.classList.contains("opacity-0")) {
          modal.classList.add("opacity-0", "pointer-events-none");
          modal.classList.remove("opacity-100");
          setTimeout(() => {
            modal.style.display = "none";
          }, 300);
        }
      });
    }
    
    if ((event.ctrlKey || event.metaKey) && event.key === "d") {
      // Toggle theme with Ctrl/Cmd + D
      event.preventDefault();
      const themeButton = document.querySelector(".btn-theme-toggle") as HTMLButtonElement;
      if (themeButton) {
        themeButton.click();
      }
    }
  });
  
  // Add performance monitoring
  if ("performance" in window) {
    window.addEventListener("load", () => {
      const perfData = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      console.log(`🚀 Cappelli Dictionary loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
    });
  }
  
  console.log("📚 Cappelli Dictionary initialized with Tailwind CSS + Gruvbox theme");
});