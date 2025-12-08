import { useCallback, useState } from "react";
import type { PartResult } from "./usePartBuilder";
import { useTonePart } from "./useTonePart";
import { useChord } from "./useChord";
import { useDrumPart } from "./useDrumPart";
import { useInstrumentPart } from "./useInstrumentPart";
import scribble from "scribbletune";
import type { PatternBar } from "../patternBlock";
import { drumMap } from "../Data/DrumNotes";
import {
  buildDrumPatternBars,
  buildPatternBars,
  type BarInfo,
} from "../services/buildPatternBars";
import { Rhythms } from "../Data/Rhythms";

export function usePartCompose(bpm: number, timeSignature: [number, number]) {
  const { getChord } = useChord();
  //const [totalDuration, setTotalDuration] = useState<number>(60);

  const drumPart = useTonePart("drums");
  const pianoPart = useTonePart("piano");

  const { getDrumPart } = useDrumPart();
  const piano = useInstrumentPart();

  const dMinor7 = getChord("D", "m7", 3);
  const gDominant7 = getChord("G", "7th", 3);
  const cMajor7 = getChord("C", "maj7", 3);
  const fMajor7 = getChord("F", "maj7", 3);

  const instrumentBars = buildPatternBars([
    {
      note: [dMinor7, gDominant7, cMajor7, fMajor7],
      rhythm: Rhythms.basic,
      rhythmSize: 4,
    },
    null,
    {
      note: [dMinor7, gDominant7, cMajor7, cMajor7],
      rhythm: Rhythms.basic,
      rhythmSize: 4,
    },
  ]);
  const instrumentSequence = piano.getInstrumentPart(instrumentBars, bpm);
  //scribble.getChordsByProgression("C4 melodic minor", "ii V I I")

  const drumBars = buildDrumPatternBars([
    [
      { note: [drumMap.kick], rhythm: Rhythms.basic, rhythmSize: 4 },
      { note: [drumMap.snare], rhythm: Rhythms.backbeat, rhythmSize: 4 },
      { note: [drumMap.hihat], rhythm: Rhythms.basic, rhythmSize: 8 },
    ],
    null,
    [
      { note: [drumMap.kick], rhythm: Rhythms.basic, rhythmSize: 8 },
      { note: [drumMap.snare], rhythm: Rhythms.backbeat, rhythmSize: 4 },
      { note: [drumMap.hihat], rhythm: Rhythms.basic, rhythmSize: 8 },
    ],
  ]);
  const drumSequence = getDrumPart(drumBars, bpm);

  let totalDuration = Math.max(
    instrumentSequence?.totalDuration ?? 0,
    drumSequence?.totalDuration ?? 0
  );

  const playParts = useCallback(() => {
    if (!instrumentSequence || !drumSequence) return;

    pianoPart.playPart(instrumentSequence);
    drumPart.playPart(drumSequence);

    return {};
  }, [totalDuration, pianoPart, drumPart, instrumentSequence, drumSequence]);

  return {
    playParts,
    totalDuration,
    isLoading: drumPart.isLoading && pianoPart.isLoading,
  };
}
