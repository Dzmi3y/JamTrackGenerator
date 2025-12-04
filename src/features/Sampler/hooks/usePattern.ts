import { useCallback } from "react";
import patternsData from "../patterns/patterns.json";
import type { RhythmPattern } from "../rhythmPattern";
import type { PartInfo } from "../../../interfaces/PartInfo";

export function usePattern() {
  const getPartInfo = useCallback(
    (
      notes: string | string[] | string[][],
      id: string
    ): PartInfo | undefined => {
      const pattern = (patternsData as RhythmPattern[]).find(
        (p) => p.id === id
      );

      if (!pattern) return undefined;

      return {
        notes,
        pattern: pattern.pattern,
        accent: pattern.accent,
      };
    },
    []
  );

  return { getPartInfo };
}
