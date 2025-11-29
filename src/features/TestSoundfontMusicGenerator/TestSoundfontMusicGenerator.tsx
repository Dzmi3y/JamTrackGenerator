import React from "react";
import Soundfont from "soundfont-player";
import type { PartInfo } from "../../interfaces/PartInfo";
import {
  usePartBuilder,
  type PartResult,
} from "../../shared/hooks/usePartBuilder";

const TestSoundfontMusicGenerator: React.FC = () => {
  const acRef = React.useRef<AudioContext | null>(null);
  const { getPart } = usePartBuilder();

  if (!acRef.current) {
    acRef.current = new AudioContext();
  }
  const ac = acRef.current;
  const gainNode = ac.createGain();
  gainNode.connect(ac.destination);

  const [piano, setPiano] = React.useState<Soundfont.Player | null>(null);

  React.useEffect(() => {
    const loadInstrument = async () => {
      const inst = await Soundfont.instrument(ac, "acoustic_grand_piano", {
        destination: gainNode,
      });
      setPiano(inst);
    };
    loadInstrument();
  }, [ac, gainNode]);

  const play = async () => {
    await ac.resume();
    if (!piano) {
      return;
    }

    let partInfo: PartInfo = {
      notes: "C4 FM GM CM",
      pattern: "x_x_x_x_",
      accent: "x---",
    };

    let partResult: PartResult = getPart(partInfo, 120);

    console.log(partResult.part);

    let currentTime = ac.currentTime;

    partResult.part.forEach((partItem) => {
      partItem.event.note.forEach((n) => {
        piano.play(n, currentTime, {
          duration: partItem.event.duration,
          gain: partItem.event.velocity,
        });
      });
      currentTime += partItem.event.duration;
    });
  };

  return (
    <>
      {piano ? <button onClick={play}>▶ Play</button> : <div>Loading...</div>}
    </>
  );
};

export default TestSoundfontMusicGenerator;
