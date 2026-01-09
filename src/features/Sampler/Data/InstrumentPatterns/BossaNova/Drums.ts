import type { RhythmTraitType } from "../../../types/rhythmTraitType";
import type { BarInfo } from "../../../utils/buildPatternBars";
import { getDrumBarInfoById } from "../../patterns/drumPatterns";

const simple = (): Array<BarInfo[] | null> => {
  const BARS_COUNT = 12;
  const evenBar = getDrumBarInfoById("Basic_Rock_Beat");
  const oddBar = getDrumBarInfoById("Grove_Basic_Rock_Beat");

  return Array.from({ length: BARS_COUNT }, (_, i) =>
    i % 2 === 0 ? evenBar : oddBar
  );
};

const moderate = (): Array<BarInfo[] | null> => {
  const BARS_COUNT = 12;
  const bar = getDrumBarInfoById("Half_Time_Shuffle");

  return Array.from({ length: BARS_COUNT }, () => bar);
};

const complex = (): Array<BarInfo[] | null> => {
  const BARS_COUNT = 12;
  const evenBar = getDrumBarInfoById("Bossanova_part1");
  const oddBar = getDrumBarInfoById("Bossanova_part2");

  return Array.from({ length: BARS_COUNT }, (_, i) =>
    i % 2 === 0 ? evenBar : oddBar
  );
};

export const drums: Map<
  RhythmTraitType,
  Array<BarInfo[] | null>
> = new Map([
  ["simple", simple()],
  ["moderate", moderate()],
  ["complex", complex()],
]);
