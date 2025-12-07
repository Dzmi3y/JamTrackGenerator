import { useCallback } from "react";
import { usePattern } from "./usePattern";
import { usePartBuilder, type PartResult } from "./usePartBuilder";
import type { PatternBlock } from "../patternBlock";

export function useDrumPart() {
  const { getPart } = usePartBuilder();
  const { getPartInfo } = usePattern();

  const getDrumPart = useCallback(
    (instruments: PatternBlock[], bpm: number): PartResult | undefined => {
      const infos = instruments
        .map(({ note, id, barNumber }) => getPartInfo(note, id, barNumber))
        .filter((r) => r !== undefined);

      if (infos.length !== instruments.length) {
        return undefined;
      }

      const parts = infos.map((info) => getPart([info], bpm));
      const totalDuration = parts[parts.length - 1].totalDuration;

      return {
        totalDuration,
        part: parts.flatMap((p) => p.part),
      };
    },
    [getPart, getPartInfo]
  );

  return { getDrumPart };
}
