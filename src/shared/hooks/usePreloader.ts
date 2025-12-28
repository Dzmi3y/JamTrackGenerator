import { useContext } from "react";
import type { PreloaderContextType } from "../components/PreloaderProvider/PreloaderContextType";
import { PreloaderContext } from "../components/PreloaderProvider/PreloaderContext";

export const usePreloader = (): PreloaderContextType => {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};