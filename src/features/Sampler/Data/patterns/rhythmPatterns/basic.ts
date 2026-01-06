import type { RhythmPattern } from "../../../types/rhythmPattern";

export const basicMap = new Map<string, RhythmPattern>([
  ["basic_v1_n1", { pattern: "x_______" }],
  ["basic_v1_n2", { pattern: "x___x___" }],
  ["basic_v1_n4", { pattern: "x_x_x_x_" }],
  ["basic_v1_n8", { pattern: "xxxxxxxx" }],
  ["basic_v1_n16", { pattern: "[xx][xx][xx][xx][xx][xx][xx][xx]" }],
  [
    "basic_v1_n32",
    {
      pattern:
        "[[xx][xx]][[xx][xx]][[xx][xx]][[xx][xx]][[xx][xx]][[xx][xx]][[xx][xx]][[xx][xx]]",
    },
  ],
]);
