import { useCallback } from "react";
import { usePattern } from "./usePattern";
import { usePartBuilder, type PartResult } from "./usePartBuilder";
import type { PatternBlock } from "../patternBlock";

export function useInstrumentPart() {
  const { getPart } = usePartBuilder();
  const { getPartInfo } = usePattern();

  const getInstrumentPart = useCallback(
    (patternBlock: PatternBlock[], bpm: number): PartResult | undefined => {
      const partInfoArray = patternBlock.flatMap((p) => {
        const info = getPartInfo(p.note, p.id);
        return info ? [info] : [];
      });

      const part = getPart(partInfoArray, bpm);

      return {
        totalDuration: part.totalDuration,
        part: part.part,
      };
    },
    [getPart, getPartInfo]
  );

  return { getInstrumentPart };
}
