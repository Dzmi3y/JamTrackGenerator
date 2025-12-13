import { useCallback, useMemo } from "react";
import { useTonePart } from "./useTonePart";
import { Rhythms } from "../Data/Rhythms";
import { instrumentPartService } from "../services/instrumentPartService";
import {
  buildDrumPatternBars,
  buildPatternBars,
} from "../utils/buildPatternBars";
import { getDrumBarInfoById } from "../patterns/drumPatterns";
import { getChordsByProgression } from "../utils/progressionUtil";
import { useMusicStore } from "../../../store/musicStore";

export const useBpm = () => useMusicStore((state) => state.bpm);

export interface Parts {
  playParts: (() => void) | undefined;
  totalDuration: number;
  isLoading: boolean;
}

export function usePartCompose(): Parts {
  const drumPart = useTonePart("drums");
  const pianoPart = useTonePart("piano");
  const bpm = useBpm();

  const notes2 = useMemo(
    () =>
      getChordsByProgression("C", "ionian", [
        { val: 2, oct: 4 },
        { val: 5, oct: 4 },
        { val: 1, oct: 4 },
        { val: 4, oct: 4 },
      ]),
    []
  );

  const instrumentBars = useMemo(
    () =>
      buildPatternBars([
        {
          note: notes2,
          rhythm: Rhythms.basic,
          rhythmSize: 4,
        },
      ]),
    [notes2]
  );

  const instrumentSequence = useMemo(
    () => instrumentPartService.getInstrumentPart(instrumentBars, bpm),

    [instrumentBars, bpm]
  );

  const drumBars = useMemo(
    () => buildDrumPatternBars([getDrumBarInfoById("Basic_Rock_Beat")]),
    []
  );

  const drumSequence = useMemo(
    () => instrumentPartService.getDrumPart(drumBars, bpm),
    [drumBars, bpm]
  );

  const totalDuration = useMemo(
    () =>
      Math.max(
        instrumentSequence?.totalDuration ?? 0,
        drumSequence?.totalDuration ?? 0
      ),
    [instrumentSequence, drumSequence]
  );

  const playParts = useCallback(() => {
    if (!instrumentSequence || !drumSequence) return;
    pianoPart.setVolume(20);
    pianoPart.playPart(instrumentSequence);
    drumPart.setPan(100);
    drumPart.playPart(drumSequence);
  }, [pianoPart, drumPart, instrumentSequence, drumSequence]);

  const isLoading = useMemo(
    () => drumPart.isLoading && pianoPart.isLoading,
    [drumPart.isLoading, pianoPart.isLoading]
  );

  return {
    playParts,
    totalDuration,
    isLoading,
  };
}
