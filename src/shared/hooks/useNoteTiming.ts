import { useCallback } from "react";

export function useNoteTiming(ticksPerQuarter: number = 64) {
  const ticksToSeconds = useCallback(
    (ticks: number, bpm: number = 120): number => {
      const secondsPerQuarter = 60 / bpm;
      const quarterNotes = ticks / ticksPerQuarter;
      const raw = quarterNotes * secondsPerQuarter;
      return Math.round(raw * 1000) / 1000;
    },
    [ticksPerQuarter]
  );

  const secondsToTicks = useCallback(
    (seconds: number, bpm: number = 120): number => {
      const secondsPerQuarter = 60 / bpm;
      const quarterNotes = seconds / secondsPerQuarter;
      return Math.round(quarterNotes * ticksPerQuarter);
    },
    [ticksPerQuarter]
  );

  return { ticksToSeconds, secondsToTicks };
}
