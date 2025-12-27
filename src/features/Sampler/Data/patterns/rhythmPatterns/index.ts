import type { RhythmPattern } from "../../../types/rhythmPattern";
import { backbeatMap } from "./backbeat";
import { basicMap } from "./basic";
import { bossanovaMap } from "./bossanova";
import { grooveMap } from "./groove";

export const rhythmPatterns: Map<string, RhythmPattern> = new Map([
  ...backbeatMap,
  ...basicMap,
  ...bossanovaMap,
  ...grooveMap
]);