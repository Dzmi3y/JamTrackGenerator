import type { BarInfo } from "../../../utils/buildPatternBars";
import { getDrumBarInfoById } from "../../patterns/drumPatterns";

const getPart = (): Array<BarInfo[] | null> => {
  const basic = getDrumBarInfoById("Basic_Blues_Beat");
  const grove = getDrumBarInfoById("Grove_Basic_Blues_Beat");

  return [
    basic,
    basic,
    basic,
    grove,

    basic,
    grove,
    basic,
    grove,

    grove,
    grove,
    basic,
    grove,
  ];
};

export const drums: Array<BarInfo[] | null> = getPart();
