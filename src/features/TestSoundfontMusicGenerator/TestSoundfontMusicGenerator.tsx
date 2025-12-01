import React, { useEffect, useState } from "react";
import Soundfont from "soundfont-player";
import type { PartInfo } from "../../interfaces/PartInfo";
import {
  usePartBuilder,
  type PartResult,
} from "../../shared/hooks/usePartBuilder";
import { usePreloader } from "../../shared/components/PreloaderProvider";

const TestSoundfontMusicGenerator: React.FC = () => {
  const acRef = React.useRef<AudioContext | null>(null);
  const { getPart } = usePartBuilder();
  const { hidePreloader, isPreloaderVisible, setPreloaderText } =
    usePreloader();

  if (!acRef.current) {
    acRef.current = new AudioContext();
  }
  const ac = acRef.current;
  const gainNode = ac.createGain();
  gainNode.connect(ac.destination);

  const [piano, setPiano] = useState<Soundfont.Player | null>(null);

  useEffect(() => {
    const loadInstrument = async () => {
      const inst = await Soundfont.instrument(ac, "acoustic_grand_piano", {
        destination: gainNode,
      });
      setPiano(inst);
    };
    loadInstrument();
  }, [ac, gainNode]);

  useEffect(() => {
    if (piano && isPreloaderVisible) {
      hidePreloader();
    } else if (isPreloaderVisible) {
      setPreloaderText("Loading musical instruments...");
    }
  }, [piano, isPreloaderVisible]);

  const play = async () => {
    await ac.resume();
    if (!piano) {
      return;
    }

    let partInfo1: PartInfo = {
      notes: "C4 E4 G4",
      pattern: "x_x_x_x_",
      accent: "x---",
    };

    let partInfo2: PartInfo = {
      notes: "C3 G3",
      pattern: "x___x___",
      accent: "x---",
    };

    let partResult1: PartResult = getPart(partInfo1, 120);
    let partResult2: PartResult = getPart(partInfo2, 120);

    console.log("Part 1:", partResult1.part);
    console.log("Part 2:", partResult2.part);

    let startTime = ac.currentTime;

    let currentTime1 = startTime;
    partResult1.part.forEach((partItem) => {
      partItem.event.note.forEach((n) => {
        piano.play(n, currentTime1, {
          duration: partItem.event.duration,
          gain: partItem.event.velocity,
        });
      });
      currentTime1 += partItem.event.duration;
    });

    let currentTime2 = startTime;
    partResult2.part.forEach((partItem) => {
      partItem.event.note.forEach((n) => {
        piano.play(n, currentTime2, {
          duration: partItem.event.duration,
          gain: partItem.event.velocity * 0.7,
        });
      });
      currentTime2 += partItem.event.duration;
    });
  };

  return (
    <>
      {piano ? <button onClick={play}>▶ Play</button> : <div>Loading...</div>}
    </>
  );
};

export default TestSoundfontMusicGenerator;
