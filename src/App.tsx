import React, { useEffect } from "react";
import { PreloaderProvider } from "./shared/components/PreloaderProvider";
import TestMusicGenerator from "./features/TestMusicGenerator/TestMusicGenerator";

const App: React.FC = () => {
  return (
    <div id="appContainer">
      <PreloaderProvider>
        <h1>JamTrack Generator</h1>
        <TestMusicGenerator />
      </PreloaderProvider>
    </div>
  );
};

export default App;
