import React, {type ReactNode } from "react";
import { preloaderManager } from "../../Utility/PreloaderManager";
import { PreloaderContext } from "./PreloaderContext";

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
