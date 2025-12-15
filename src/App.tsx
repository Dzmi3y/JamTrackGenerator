import React from "react";
import { PreloaderProvider } from "./shared/components/PreloaderProvider";
import Player from "./features/Player/Player";

const App: React.FC = () => {
  return (
    <div id="appContainer">
      <PreloaderProvider>
        <h1>JamTrack Generator</h1>
        <Player />
      </PreloaderProvider>
    </div>
  );
};

export default App;
