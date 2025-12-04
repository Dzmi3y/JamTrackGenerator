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
  const partResultInst = getInstrumentPart("D3 G3 C3 F3", "1", bpm);
  const partResult = getDefaultDrumPart(bpm);

  const [transportTime, setTransportTime] = useState(0);
  const [transportPosition, setTransportPosition] =
    useState<Tone.Unit.Time>("0:0:0");

  const play = async () => {
    Tone.Transport.timeSignature = [4, 4];
    Tone.Transport.cancel();
    Tone.Transport.stop();

    await Tone.start();
    Tone.Transport.bpm.value = bpm;

    if (!partResult || !partResultInst) {
      return;
    }

    pianoPart.playPart(partResultInst, false);
    drumsPart.playPart(partResult, false);

    Tone.Transport.start();
  };

  const stop = () => {
    Tone.Transport.stop();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTransportTime(Tone.Transport.seconds);
      setTransportPosition(Tone.Transport.position);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <button onClick={play} disabled={pianoPart.isLoading}>
        {pianoPart.isLoading
          ? "Loading Instruments..."
          : "▶ Play with Instruments"}
      </button>
      <button onClick={stop} disabled={pianoPart.isLoading}>
        {pianoPart.isLoading ? "Loading Instruments..." : "Stop"}
      </button>

      <div style={{ marginTop: "1rem" }}>
        <p>Transport time: {transportTime.toFixed(2)}s</p>
        <p>Position: {transportPosition.toString()}</p>
      </div>
    </div>
  );
};

export default TestDrumMusicGenerator;
