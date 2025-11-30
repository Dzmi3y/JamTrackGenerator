import React, { useEffect } from "react";
import { PreloaderProvider } from "./shared/components/PreloaderProvider";
import TestSoundfontMusicGenerator from "./features/TestSoundfontMusicGenerator/TestSoundfontMusicGenerator";

const App: React.FC = () => {
  return (
    <div id="appContainer">
      <PreloaderProvider>
        <h1>JamTrack Generator</h1>
        <TestSoundfontMusicGenerator />
      </PreloaderProvider>
    </div>
  );
};

export default App;
