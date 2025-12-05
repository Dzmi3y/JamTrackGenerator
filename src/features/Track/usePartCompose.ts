import { useCallback, useState } from "react";
import type { PartResult } from "../Sampler/hooks/usePartBuilder";
import { useTonePart } from "../Sampler/hooks/useTonePart";
import { useChord } from "../Sampler/hooks/useChord";
import { useDrumPart } from "../Sampler/hooks/useDrumPart";
import { useInstrumentPart } from "../Sampler/hooks/useInstrumentPart";
import scribble from "scribbletune";

export function usePartCompose(bpm: number, timeSignature: [number, number]) {
  const { getChord } = useChord();
  //const [totalDuration, setTotalDuration] = useState<number>(60);

  const drumPart = useTonePart("drums");
  const pianoPart = useTonePart("piano");

  const { getDefaultDrumPart } = useDrumPart();
  const piano = useInstrumentPart();

  const dMinor7 = getChord("D", "m7", 3);
  const gDominant7 = getChord("G", "7th", 3);
  const cMajor7 = getChord("C", "maj7", 3);
  const fMajor7 = getChord("F", "maj7", 3);

  const instrumentSequence = piano.getInstrumentPart(
    [
      { note: [dMinor7, gDominant7, cMajor7, fMajor7], id: "1" },
      { note: [dMinor7, gDominant7, cMajor7, cMajor7], id: "2" },
    ],
    bpm
  );
  //scribble.getChordsByProgression("C4 melodic minor", "ii V I I")

  const drumSequence = getDefaultDrumPart(bpm);

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
