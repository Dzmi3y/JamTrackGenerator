import { useCallback } from "react";
import { usePattern } from "./usePattern";
import { usePartBuilder, type PartResult } from "./usePartBuilder";
import type { PatternBlock } from "../patternBlock";

export function useInstrumentPart() {
  const { getPart } = usePartBuilder();
  const { getPartInfo } = usePattern();

  const getInstrumentPart = useCallback(
    (patternBlocks: PatternBlock[], bpm: number): PartResult | undefined => {
      const validPartInfo = patternBlocks
        .map((patternBlock) =>
          getPartInfo(
            patternBlock.note,
            patternBlock.id,
            patternBlock.barNumber
          )
        )
        .filter(
          (partInfo): partInfo is NonNullable<typeof partInfo> =>
            partInfo !== undefined
        );

      if (validPartInfo.length === 0) {
        return undefined;
      }

      const partResult = getPart(validPartInfo, bpm);

      return partResult;
    },
    [getPart, getPartInfo]
  );

  return { getInstrumentPart };
}
