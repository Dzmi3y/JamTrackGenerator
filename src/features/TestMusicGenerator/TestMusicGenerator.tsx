import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import { useDrumPart } from "../Sampler/hooks/useDrumPart";
import { useTonePart } from "../Sampler/hooks/useTonePart";
import { useInstrumentPart } from "../Sampler/hooks/useInstrumentPart";
import * as scribble from "scribbletune";
import { useChord } from "../Sampler/hooks/useChord";

const TestMusicGenerator: React.FC = () => {
  const bpm = 180;
  const { getChord } = useChord();

  const drumsPart = useTonePart("drums");
  const pianoPart = useTonePart("piano");

  const { getDefaultDrumPart } = useDrumPart();
  const { getInstrumentPart } = useInstrumentPart();

  const dm7 = getChord("D", "m7", 3);
  const g7 = getChord("G", "7th", 3);
  const cmaj7 = getChord("C", "maj7", 3);
  const fmaj7 = getChord("F", "maj7", 3);

  //scribble.getChordsByProgression("C4 melodic minor", "ii V I I")

  const partResultInst = getInstrumentPart([dm7, g7, cmaj7, fmaj7], "1", bpm);
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

export default TestMusicGenerator;
