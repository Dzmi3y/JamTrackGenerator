import { useCallback } from "react";
import type { ClipEvent } from "../../../interfaces/ClipEvent";
import * as scribble from "scribbletune";
import type { PartItem } from "../../../interfaces/Part";
import { useNoteTiming } from "./useNoteTiming";
import type { PartInfo } from "../../../interfaces/PartInfo";
import type { ClipEventBlock } from "../../../interfaces/СlipEventBlock";

export interface PartResult {
  part: Array<PartItem>;
  totalDuration: number;
}

const DEFAULT_BPM = 120;
const DEFAULT_TIME_SIGNATURE = 4; // 4/4
const DEFAULT_AMP = 100;
const DEFAULT_ACCENT_LOW = 70;
const DEFAULT_SUBDIVISION = "16n";

export function usePartBuilder() {
  const { ticksToSeconds } = useNoteTiming();

  const getBarStartTime = useCallback(
    (
      barNumber: number,
      bpm: number,
      numerator: number = DEFAULT_TIME_SIGNATURE
    ): number => {
      const beatDuration = 60 / bpm;
      const barDuration = beatDuration * numerator;
      return barNumber * barDuration;
    },
    []
  );

  const createClipEventBlock = useCallback((part: PartInfo): ClipEventBlock => {
    return {
      clipEvents: scribble.clip({
        notes: part.notes,
        pattern: part.pattern,
        accent: part.accent,
        amp: DEFAULT_AMP,
        accentLow: DEFAULT_ACCENT_LOW,
        subdiv: DEFAULT_SUBDIVISION,
      }),
      barNumber: part.barNumber,
    };
  }, []);

  const createPartItem = useCallback(
    (event: ClipEvent, offset: number, duration: number): PartItem | null => {
      if (!event.note || event.note.length === 0) {
        return null;
      }

      return {
        time: `+${offset.toFixed(3)}`,
        event: {
          note: event.note,
          duration,
          velocity: event.level || 100,
        },
      };
    },
    []
  );

  const getPart = useCallback(
    (partInfo: PartInfo[], bpm: number = DEFAULT_BPM): PartResult => {
      const clipResult: ClipEventBlock[] = partInfo.map(createClipEventBlock);
      const partItems: PartItem[] = [];
      let totalDuration = 0;

      clipResult.forEach((clipBlock) => {
        let currentOffset = Number(
          getBarStartTime(clipBlock.barNumber, bpm).toFixed(3)
        );

        clipBlock.clipEvents.forEach((event) => {
          const eventDuration = ticksToSeconds(event.length, bpm);

          const partItem = createPartItem(event, currentOffset, eventDuration);
          if (partItem) {
            partItems.push(partItem);
          }

          currentOffset += eventDuration;
          totalDuration = Math.max(totalDuration, currentOffset);
        });
      });

      return {
        part: partItems,
        totalDuration: Number(totalDuration.toFixed(3)),
      };
    },
    [createClipEventBlock, createPartItem, getBarStartTime, ticksToSeconds]
  );

  return { getPart };
}
