import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import * as scribble from "scribbletune";
import {
  usePartBuilder,
  type PartResult,
} from "../../shared/hooks/usePartBuilder";
import type { PartInfo } from "../../interfaces/PartInfo";
import { usePreloader } from "../../shared/components/PreloaderProvider";

const TestDrumMusicGenerator: React.FC = () => {
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
          C1: "kick.wav",
          D1: "snare.wav",
          "C#1": "rimshot.wav",
          "F#1": "hihat.wav",
          "A#1": "ohihat.wav",
          F1: "lowTom.wav",
          B1: "midTom.wav",
          D2: "highTom.wav",
          "C#2": "crash.wav",
          "D#2": "ride.wav",
        },
        baseUrl: "/Samples/Drumkit/",
        onload: () => {
          console.log("Drumkit samples loaded");
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

    let kickInfo: PartInfo = {
      notes: "C1",
      pattern: "x___x___",
      accent: "xxxxxxxx",
    };

    let snareInfo: PartInfo = {
      notes: "D1",
      pattern: "--x_--x_",
      accent: "x---",
    };

    let hihatInfo: PartInfo = {
      notes: "F#1",
      pattern: "xxxxxxxx",
      accent: "x---",
    };

    let partKick: PartResult = getPart(kickInfo, bpm);
    let partSnare: PartResult = getPart(snareInfo, bpm);
    let partHihat: PartResult = getPart(hihatInfo, bpm);

    let partResult: PartResult = {
      totalDuration: partHihat.totalDuration,
      part: [...partKick.part, ...partSnare.part, ...partHihat.part],
    };

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
