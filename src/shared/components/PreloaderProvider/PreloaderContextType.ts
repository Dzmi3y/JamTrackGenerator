export interface PreloaderContextType {
  showPreloader: () => void;
  hidePreloader: () => void;
  removePreloader: () => void;
  setPreloaderText: (text: string) => void;
  clearPreloaderText: () => void;

  isPreloaderVisible: boolean;
}
