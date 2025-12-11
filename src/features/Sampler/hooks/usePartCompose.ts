import { useCallback } from "react";
import { useTonePart } from "./useTonePart";
import { Rhythms } from "../Data/Rhythms";
import { instrumentPartService } from "../services/instrumentPartService";
import {
  buildDrumPatternBars,
  buildPatternBars,
} from "../utils/buildPatternBars";
import { getDrumBarInfoById } from "../patterns/drumPatterns";
import { getChordsByProgression } from "../utils/progressionUtil";

export function usePartCompose(bpm: number) {
  const drumPart = useTonePart("drums");
  const pianoPart = useTonePart("piano");

  const notes1 = getChordsByProgression("C", "ionian", [
    { val: 2, oct: 4 },
    { val: 5, oct: 4 },
    { val: 1, oct: 4 },
    { val: 4, oct: 4 },
  ]);
  const notes2 = getChordsByProgression("C", "ionian", [
    { val: 2, oct: 4 },
    { val: 5, oct: 4 },
    { val: 1, oct: 4 },
    { val: 4, oct: 4 },
  ]);

  const instrumentBars = buildPatternBars([
    {
      note: notes1,
      rhythm: Rhythms.backbeat,
      rhythmSize: 4,
    },
    null,
    {
      note: notes2,
      rhythm: Rhythms.basic,
      rhythmSize: 4,
    },
  ]);
  const instrumentSequence = instrumentPartService.getInstrumentPart(
    instrumentBars,
    bpm
  );
  try {
    console.log(

    );
    // console.log("C4 ionian/major: " + scribble.scale("C4 major"));
  } catch (error) {
    console.error(error);
  }

  const drumBars = buildDrumPatternBars([
    getDrumBarInfoById("Basic_Rock_Beat"),
    null,
    getDrumBarInfoById("Skank_Beat"),
  ]);
  const drumSequence = instrumentPartService.getDrumPart(drumBars, bpm);

  const totalDuration = Math.max(
    instrumentSequence?.totalDuration ?? 0,
    drumSequence?.totalDuration ?? 0
  );

  const playParts = useCallback(() => {
    if (!instrumentSequence || !drumSequence) return;

    pianoPart.playPart(instrumentSequence);
    drumPart.playPart(drumSequence);

    return {};
  }, [pianoPart, drumPart, instrumentSequence, drumSequence]);

  return {
    playParts,
    totalDuration,
    isLoading: drumPart.isLoading && pianoPart.isLoading,
  };
}
