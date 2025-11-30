class PreloaderManager {
  private preloaderElement: HTMLElement | null;
  private preloaderTextDiv: HTMLElement | null;
  private isVisible: boolean = true;

  constructor() {
    this.preloaderElement = document.getElementById("preloader");
    this.preloaderTextDiv = document.getElementById("preloaderText");
  }

  show() {
    if (this.preloaderElement && !this.isVisible) {
      this.preloaderElement.style.display = "flex";
      this.preloaderElement.classList.remove("fade-out");
      this.isVisible = true;
    }
  }

  hide() {
    if (this.preloaderElement && this.isVisible) {
      this.preloaderElement.classList.add("fade-out");
      setTimeout(() => {
        if (this.preloaderElement) {
          this.preloaderElement.style.display = "none";
        }
        this.isVisible = false;
      }, 500);
    }
  }

  remove() {
    if (this.preloaderElement) {
      this.preloaderElement.remove();
      this.preloaderElement = null;
      this.isVisible = false;
    }
  }

  isPreloaderVisible(): boolean {
    return this.isVisible;
  }

  setPreloaderText(text: string) {
    if (this.preloaderTextDiv) {
      this.preloaderTextDiv.textContent = text;
    }
  }

  clearPreloaderText() {
    this.setPreloaderText("");
  }
}

export const preloaderManager = new PreloaderManager();
