import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import * as scribble from "scribbletune";
import {
  usePartBuilder,
  type PartResult,
} from "../../shared/hooks/usePartBuilder";
import type { PartInfo } from "../../interfaces/PartInfo";
import { usePreloader } from "../../shared/components/PreloaderProvider";

const TestTSMusicGenerator: React.FC = () => {
  const bpm = 120;
  const { getPart } = usePartBuilder();
  const [pianoSampler, setPianoSampler] = useState<Tone.Sampler | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { hidePreloader, isPreloaderVisible, setPreloaderText } =
    usePreloader();

  useEffect(() => {
    const loadPiano = async () => {
      setIsLoading(true);
      const sampler = new Tone.Sampler({
        urls: {
          A0: "A0v1.wav",
          A1: "A1v1.wav",
          A2: "A2v1.wav",
          "D#3": "Ds3v1.wav",
          A4: "A4v1.wav",
          A5: "A5v1.wav",
          "D#7": "Ds7v1.wav",
        },
        baseUrl: "/Piano/",
        onload: () => {
          console.log("Piano samples loaded");
          setIsLoading(false);
        },
        release: 1,
      }).toDestination();

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
