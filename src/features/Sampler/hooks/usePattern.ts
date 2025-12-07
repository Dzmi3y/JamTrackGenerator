import { useCallback } from "react";
import patternsData from "../patterns/patterns.json";
import type { RhythmPattern } from "../rhythmPattern";
import type { PartInfo } from "../../../interfaces/PartInfo";

export function usePattern() {
  const getPartInfo = useCallback(
    (
      notes: string[] | string[][],
      id: string,
      barNumber: number
    ): PartInfo | undefined => {
      const pattern = (patternsData as RhythmPattern[]).find(
        (p) => p.id === id
      );

      if (!pattern) return undefined;

      return {
        barNumber,
        notes,
        pattern: pattern.pattern,
        accent: pattern.accent,
      };
    },
    []
  );

  return { getPartInfo };
}
