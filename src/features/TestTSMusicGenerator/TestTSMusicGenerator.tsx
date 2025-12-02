import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import * as scribble from "scribbletune";
import {
  usePartBuilder,
  type PartResult,
} from "../../shared/hooks/usePartBuilder";
import type { PartInfo } from "../../interfaces/PartInfo";
import { usePreloader } from "../../shared/components/PreloaderProvider";
import { useSampler } from "../Sampler/useSampler";

const TestTSMusicGenerator: React.FC = () => {
  const bpm = 120;
  const { getPart } = usePartBuilder();
  const [pianoSampler, setPianoSampler] = useState<Tone.Sampler | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getSampler } = useSampler();
  const { hidePreloader, isPreloaderVisible, setPreloaderText } =
    usePreloader();

  useEffect(() => {
    const loadPiano = async () => {
      setIsLoading(true);
      setPreloaderText("Instruments is loading...");
      const sampler = getSampler("piano", () => {
        console.log("Piano samples loaded");
        setIsLoading(false);
      });
      hidePreloader();
      setPianoSampler(sampler);
    };

    loadPiano();
  }, []);

  const play = async () => {
    if (!pianoSampler || isLoading) {
      console.error("Piano not loaded yet");
      return;
    }

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

    const part = new Tone.Part((time, event) => {
      if (pianoSampler) {
        pianoSampler.triggerAttackRelease(
          event.event.note,
          event.event.duration,
          time,
          event.event.velocity / 100
        );
      }
    }, partResult.part);

    part.start(0);
    part.stop(`+${partResult.totalDuration}`);
    Tone.Transport.start();
  };

  return (
    <div>
      <button onClick={play} disabled={isLoading}>
        {isLoading ? "Loading piano..." : "▶ Play with Piano"}
      </button>
    </div>
  );
};

export default TestTSMusicGenerator;
