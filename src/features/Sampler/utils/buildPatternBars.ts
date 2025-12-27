import type { PatternBar } from "../types/patternBlock";
import { getRhythmName, type RhythmType } from "../Data/Rhythms";

export type BarInfo = {
  note: string[] | string[][];
  rhythm: RhythmType;
  version: number;
  noteCount: number;
};

export const buildPatternBars = (
  barArray: Array<BarInfo | null>
): PatternBar[] => {
  const res: PatternBar[] = [];

  barArray.forEach((b, i) => {
    if (b) {
      res.push({
        note: b.note,
        id: getRhythmName(b.rhythm, b.version, b.noteCount),
        barNumber: i,
      });
    }
  });

  return res;
};

export const buildDrumPatternBars = (
  barArray: Array<BarInfo[] | null>
): PatternBar[] => {
  const res: PatternBar[] = [];

  barArray.forEach((b, i) => {
    if (b) {
      b.forEach((bi) =>
        res.push({
          note: bi.note,
          id: getRhythmName(bi.rhythm, bi.version, bi.noteCount),
          barNumber: i,
        })
      );
    }
  });
  return res;
};
