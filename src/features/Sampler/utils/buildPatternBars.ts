import type { PatternBar } from "../types/patternBlock";
import {
  getRhythmName,
  type RhythmSize,
  type RhythmType,
} from "../Data/Rhythms";

export type BarInfo = {
  note: string[] | string[][];
  rhythm: RhythmType;
  rhythmSize: RhythmSize;
};

export const buildPatternBars = (
  barArray: Array<BarInfo | null>
): PatternBar[] => {
  const res: PatternBar[] = [];

  barArray.forEach((b, i) => {
    if (b) {
      res.push({
        note: b.note,
        id: getRhythmName(b.rhythm, b.rhythmSize),
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
          id: getRhythmName(bi.rhythm, bi.rhythmSize),
          barNumber: i,
        })
      );
    }
  });
  return res;
};
