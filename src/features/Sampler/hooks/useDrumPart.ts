import { useCallback } from "react";
import { usePattern } from "./usePattern";
import { usePartBuilder, type PartResult } from "./usePartBuilder";

export function useDrumPart() {
  const { getPart } = usePartBuilder();
  const { getPartInfo } = usePattern();

  const getDefaultDrumPart = useCallback(
    (bpm: number): PartResult | undefined => {
      const instruments = [
        { note: "C1", id: "1" },
        { note: "D1", id: "2" },
        { note: "F#1", id: "3" },
      ];

      const infos = instruments
        .map(({ note, id }) => getPartInfo(note, id))
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

  return { getDefaultDrumPart };
}
