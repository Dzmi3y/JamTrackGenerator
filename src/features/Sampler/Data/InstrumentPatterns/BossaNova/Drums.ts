import type { BarInfo } from "../../../utils/buildPatternBars";
import { getDrumBarInfoById } from "../../patterns/drumPatterns";

const getPart = (): Array<BarInfo[] | null> => {
  const BARS_COUNT = 12;
  const evenBar = getDrumBarInfoById("Bossanova_part1");
  const oddBar = getDrumBarInfoById("Bossanova_part2");

  return Array.from({ length: BARS_COUNT }, (_, i) =>
    i % 2 === 0 ? evenBar : oddBar
  );
};

export const drums: Array<BarInfo[] | null> = getPart();
