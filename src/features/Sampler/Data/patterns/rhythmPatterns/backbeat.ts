import type { RhythmPattern } from "../../../types/rhythmPattern";

export const backbeatMap = new Map<string, RhythmPattern>([
  ["backbeat_v1_n1", { id: "backbeat_v1_n1", pattern: "----x---" }],
  ["backbeat_v1_n2", { id: "backbeat_v1_n2", pattern: "--x---x-" }],
  ["backbeat_v1_n4", { id: "backbeat_v1_n4", pattern: "-x-x-x-x" }],
  [
    "backbeat_v1_n8",
    { id: "backbeat_v1_n8", pattern: "[-x][-x][-x][-x][-x][-x][-x][-x]" },
  ],
  [
    "backbeat_v1_n16",
    {
      id: "backbeat_v1_n16",
      pattern: "[-x-x][-x-x][-x-x][-x-x][-x-x][-x-x][-x-x][-x-x]",
    },
  ],
  [
    "backbeat_v1_n32",
    {
      id: "backbeat_v1_n32",
      pattern:
        "[[-x-x][-x-x]][[-x-x][-x-x]][[-x-x][-x-x]][[-x-x][-x-x]][[-x-x][-x-x]][[-x-x][-x-x]][[-x-x][-x-x]][[-x-x][-x-x]]",
    },
  ],
]);
