import { useCallback } from "react";

/**
 * React hook for converting between ticks and seconds.
 *
 * @param bpm - tempo in beats per minute
 * @param ticksPerQuarter - number of ticks per quarter note (default: 64)
 *
 * @returns ticksToSeconds - converts ticks → seconds (rounded to 3 decimals)
 * @returns secondsToTicks - converts seconds → ticks
 */
export function useNoteTiming(bpm: number, ticksPerQuarter: number = 64) {
  const secondsPerQuarter = 60 / bpm;

  const ticksToSeconds = useCallback(
    (ticks: number): number => {
      const quarterNotes = ticks / ticksPerQuarter;
      const raw = quarterNotes * secondsPerQuarter;
      // округляем до 3 знаков после запятой
      return Math.round(raw * 1000) / 1000;
    },
    [bpm, ticksPerQuarter, secondsPerQuarter]
  );

  const secondsToTicks = useCallback(
    (seconds: number): number => {
      const quarterNotes = seconds / secondsPerQuarter;
      return Math.round(quarterNotes * ticksPerQuarter);
    },
    [bpm, ticksPerQuarter, secondsPerQuarter]
  );

  return { ticksToSeconds, secondsToTicks };
}
