import { useCallback } from "react";
import type { ClipEvent } from "../../interfaces/ClipEvent";
import * as scribble from "scribbletune";
import type { PartItem } from "../../interfaces/Part";
import { useNoteTiming } from "./useNoteTiming";
import type { PartInfo } from "../../interfaces/PartInfo";

export interface PartResult {
  part: Array<PartItem>;
  totalDuration: number;
}
export function usePartBuilder() {
  const { ticksToSeconds } = useNoteTiming();
  const getPart = useCallback(
    (partInfo: PartInfo, bpm: number = 120): PartResult => {
      const clip: Array<ClipEvent> = scribble.clip({
        notes: partInfo.notes,
        pattern: partInfo.pattern,
        accent: partInfo.accent,
        amp: 100,
        accentLow: 70,
        subdiv: "16n",
      });

      let currentOffSet = 0;
      const resultArray: Array<PartItem> = [];

      for (let i = 0; i < clip.length; i++) {
        const currentEvent = clip[i];
        const currentDurationSec = ticksToSeconds(currentEvent.length, bpm);

        if (currentEvent.note && currentEvent.note.length > 0) {
          resultArray.push({
            time: "+" + currentOffSet,
            event: {
              note: currentEvent.note,
              duration: currentDurationSec,
              velocity: currentEvent.level,
            },
          });
        }

        currentOffSet =
          Math.round((currentOffSet + currentDurationSec) * 1000) / 1000;
      }
      return { part: resultArray, totalDuration: currentOffSet };
    },
    []
  );

  return { getPart };
}
