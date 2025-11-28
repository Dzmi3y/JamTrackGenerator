import { useState } from "react";
import "./App.css";
import TestMusicGenerator from "./features/TestMusicGenerator/TestMusicGenerator";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>JamTrack Generator</h1>
      <TestMusicGenerator />
    </>
  );
}

export default App;
