import React from "react";
import * as Tone from "tone";
import * as scribble from "scribbletune";
import { usePartBuilder, type PartResult } from "../hooks/usePartBuilder";
import type { PartInfo } from "../../interfaces/PartInfo";

const TestMusicGenerator: React.FC = () => {
  const bpm = 120;
  const { getPart } = usePartBuilder();

  const play = async () => {
    Tone.Transport.cancel();
    Tone.Transport.stop();

    await Tone.start();
    Tone.Transport.bpm.value = bpm;

    console.log(scribble.scale("C4 major"));

    let partInfo: PartInfo = {
      notes: "CM FM GM CM",
      pattern: "x_x_x_x_",
      accent: "x---",
    };

    let partResult: PartResult = getPart(partInfo, bpm);

    console.log("resultArray");
    console.log(partResult.part);

    const synth = new Tone.Synth().toDestination();

    const part = new Tone.Part((time, event) => {
      synth.triggerAttackRelease(
        event.event.note,
        event.event.duration,
        time,
        event.event.velocity
      );
    }, partResult.part);

    part.start(0);
    part.stop(`+${partResult.totalDuration}`);
    Tone.Transport.start();
  };

  return <button onClick={play}>▶ Play</button>;
};

export default TestMusicGenerator;
