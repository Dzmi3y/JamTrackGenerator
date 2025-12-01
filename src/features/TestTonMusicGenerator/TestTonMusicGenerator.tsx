import React, { useEffect } from "react";
import * as Tone from "tone";
import * as scribble from "scribbletune";
import {
  usePartBuilder,
  type PartResult,
} from "../../shared/hooks/usePartBuilder";
import type { PartInfo } from "../../interfaces/PartInfo";
import { usePreloader } from "../../shared/components/PreloaderProvider";

const TestTonMusicGenerator: React.FC = () => {
  const bpm = 120;
  const { getPart } = usePartBuilder();
  const { hidePreloader, isPreloaderVisible, setPreloaderText } =
    usePreloader();

  useEffect(() => {
    hidePreloader();
  }, []);

  function isStringArray(value: unknown): value is string[] {
    return (
      Array.isArray(value) && value.every((item) => typeof item === "string")
    );
  }

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
      const bpm = 120;
      const { getPart } = usePartBuilder();
      synth.triggerAttackRelease(
        event.event.note.join(" "),
        event.event.duration,
        time,
        event.event.velocity / 100
      );
    }, partResult.part);

    part.start(0);
    part.stop(`+${partResult.totalDuration}`);
    Tone.Transport.start();
  };

  return <button onClick={play}>▶ Play</button>;
};

export default TestTonMusicGenerator;
