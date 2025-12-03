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
import { usePattern } from "../Sampler/usePattern";
import { useDrumPart } from "../Sampler/useDrumPart";

const TestDrumMusicGenerator: React.FC = () => {
  const bpm = 180;
  const [pianoSampler, setPianoSampler] = useState<Tone.Sampler | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getSampler } = useSampler();

  const { hidePreloader, isPreloaderVisible, setPreloaderText } =
    usePreloader();

  const { getDefaultDrumPart } = useDrumPart();
  useEffect(() => {
    const loadPiano = async () => {
      setIsLoading(true);
      setPreloaderText("Instruments is loading...");
      const sampler = getSampler("drums", () => {
        console.log("Drumkit samples loaded");
        setIsLoading(false);
      });
      hidePreloader();
      setPianoSampler(sampler);
    };

    loadPiano();
  }, []);

  const play = async () => {
    if (!pianoSampler || isLoading) {
      console.error("Drumkit not loaded yet");
      return;
    }

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

    part.loop = true;
    part.loopEnd = partResult.totalDuration;

    part.start(0);
    //part.stop(`+${partResult.totalDuration}`);
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
