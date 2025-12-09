import { useCallback } from "react";
import { useTonePart } from "./useTonePart";
import { drumMap } from "../Data/DrumNotes";
import { Rhythms } from "../Data/Rhythms";
import { getChord } from "../utils/chordUtils";
import { instrumentPartService } from "../services/instrumentPartService";
import {
  buildDrumPatternBars,
  buildPatternBars,
} from "../utils/buildPatternBars";
import { getDrumBarInfoById } from "../patterns/drumPatterns";

export function usePartCompose(bpm: number, timeSignature: [number, number]) {
  const drumPart = useTonePart("drums");
  const pianoPart = useTonePart("piano");

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
  const instrumentSequence = instrumentPartService.getInstrumentPart(
    instrumentBars,
    bpm
  );
  //scribble.getChordsByProgression("C4 melodic minor", "ii V I I")
  const drumBars = buildDrumPatternBars([
    getDrumBarInfoById("Basic_Rock_Beat"),
    null,
    getDrumBarInfoById("Skank_Beat"),
  ]);
  const drumSequence = instrumentPartService.getDrumPart(drumBars, bpm);

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
