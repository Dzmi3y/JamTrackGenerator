import React, { useEffect } from "react";
import { PreloaderProvider } from "./shared/components/PreloaderProvider";
import TestTSMusicGenerator from "./features/TestTSMusicGenerator/TestTSMusicGenerator";
import TestDrumMusicGenerator from "./features/TestDrumMusicGenerator/TestDrumMusicGenerator";

const App: React.FC = () => {
  return (
    <div id="appContainer">
      <PreloaderProvider>
        <h1>JamTrack Generator</h1>
        <TestTSMusicGenerator />
      </PreloaderProvider>
    </div>
  );
};

export default App;
