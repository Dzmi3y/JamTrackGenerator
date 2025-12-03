import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import { useDrumPart } from "../Sampler/useDrumPart";
import { useTonePart } from "../../shared/hooks/useTonePart";

const TestDrumMusicGenerator: React.FC = () => {
  const bpm = 180;

  const { playPart, isLoading } = useTonePart("drums");

  const { getDefaultDrumPart } = useDrumPart();

  const play = async () => {
    Tone.Transport.cancel();
    Tone.Transport.stop();

    await Tone.start();
    Tone.Transport.bpm.value = bpm;

    const partResult = getDefaultDrumPart(bpm);
    if (!partResult) {
      return;
    }
    console.log("resultArray");
    console.log(partResult.part);
    playPart(partResult, true);
    Tone.Transport.start();
  };

  return (
    <div>
      <button onClick={play} disabled={isLoading}>
        {isLoading ? "Loading Drumkit..." : "▶ Play with Drumkit"}
      </button>
    </div>
  );
};

export default TestDrumMusicGenerator;
