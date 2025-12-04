import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import { useDrumPart } from "../Sampler/useDrumPart";
import { useTonePart } from "../../shared/hooks/useTonePart";
import { useInstrumentPart } from "../Sampler/useInstrumentPart";

const TestDrumMusicGenerator: React.FC = () => {
  const bpm = 180;

  const drumsPart = useTonePart("drums");
  const pianoPart = useTonePart("piano");

  const { getDefaultDrumPart } = useDrumPart();
  const { getInstrumentPart } = useInstrumentPart();

  const play = async () => {
    Tone.Transport.cancel();
    Tone.Transport.stop();

    await Tone.start();
    Tone.Transport.bpm.value = bpm;

    const partResultInst = getInstrumentPart("D3 G3 C3 F3", "1", bpm);
    const partResult = getDefaultDrumPart(bpm);
    if (!partResult) {
      return;
    }
    console.log("resultArray");
    console.log(partResult.part);

    pianoPart.playPart(partResultInst, true);
    drumsPart.playPart(partResult, true);
    Tone.Transport.start();
  };

  return (
    <div>
      <button onClick={play} disabled={pianoPart.isLoading}>
        {pianoPart.isLoading ? "Loading Drumkit..." : "▶ Play with Drumkit"}
      </button>
    </div>
  );
};

export default TestDrumMusicGenerator;
