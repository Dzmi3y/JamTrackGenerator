import React, { createContext, useContext, type ReactNode } from "react";
import { preloaderManager } from "../Utility/PreloaderManager";

interface PreloaderContextType {
  showPreloader: () => void;
  hidePreloader: () => void;
  removePreloader: () => void;
  setPreloaderText: (text: string) => void;
  clearPreloaderText: () => void;

  isPreloaderVisible: boolean;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(
  undefined
);

export const PreloaderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const showPreloader = () => {
    preloaderManager.show();
  };

  const hidePreloader = () => {
    preloaderManager.hide();
  };

  const removePreloader = () => {
    preloaderManager.remove();
  };

  const clearPreloaderText = () => {
    preloaderManager.clearPreloaderText();
  };

  const setPreloaderText = (text: string) => {
    preloaderManager.setPreloaderText(text);
  };

  const isPreloaderVisible = preloaderManager.isPreloaderVisible();

  return (
    <PreloaderContext.Provider
      value={{
        showPreloader,
        hidePreloader,
        removePreloader,
        setPreloaderText,
        clearPreloaderText,
        isPreloaderVisible,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = (): PreloaderContextType => {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};
