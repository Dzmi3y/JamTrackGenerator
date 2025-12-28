import { createContext } from "react";
import type { PreloaderContextType } from "./PreloaderContextType";

export const PreloaderContext = createContext<PreloaderContextType | undefined>(
  undefined
);
