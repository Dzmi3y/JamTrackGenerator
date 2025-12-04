import { useCallback } from "react";
import { usePattern } from "./usePattern";
import { usePartBuilder, type PartResult } from "./usePartBuilder";

export function useInstrumentPart() {
  const { getPart } = usePartBuilder();
  const { getPartInfo } = usePattern();

  const getInstrumentPart = useCallback(
    (
      note: string | string[] | string[][],
      id: string,
      bpm: number
    ): PartResult | undefined => {
      const partInfo = getPartInfo(note, id);

      if (!partInfo) {
        return undefined;
      }

      const part = getPart(partInfo!, bpm);

      return {
        totalDuration: part.totalDuration,
        part: part.part,
      };
    },
    [getPart, getPartInfo]
  );

  return { getInstrumentPart };
}
