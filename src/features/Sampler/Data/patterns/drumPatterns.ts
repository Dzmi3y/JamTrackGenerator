import { drumMap } from "..//../Data/DrumNotes";
import { Rhythms } from "..//../Data/Rhythms";
import type { BarInfo } from "..//../utils/buildPatternBars";

export interface DrumRhythm {
  id: DrumRhythmId;
  patterns: BarInfo[];
}

export const DrumRhythmIds = {
  Basic_Rock_Beat: "Basic Rock Beat",
  Grove_Basic_Rock_Beat: "Grove Basic Rock Beat",
  Bossanova_part1: "Bossanova_part1",
  Bossanova_part2: "Bossanova_part2",
} as const;

export type DrumRhythmId = keyof typeof DrumRhythmIds;

export const drumRhythmsMap = new Map<DrumRhythmId, DrumRhythm>([
  [
    "Basic_Rock_Beat",
    {
      id: "Basic_Rock_Beat",
      patterns: [
        {
          note: [drumMap.kick],
          rhythm: Rhythms.basic,
          version: 1,
          noteCount: 2,
        },
        {
          note: [drumMap.snare],
          rhythm: Rhythms.backbeat,
          version: 1,
          noteCount: 2,
        },
        {
          note: [drumMap.hihat],
          rhythm: Rhythms.basic,
          version: 1,
          noteCount: 8,
        },
      ],
    },
  ],
  [
    "Grove_Basic_Rock_Beat",
    {
      id: "Grove_Basic_Rock_Beat",
      patterns: [
        {
          note: [drumMap.kick],
          rhythm: Rhythms.groove,
          version: 1,
          noteCount: 2,
        },
        {
          note: [drumMap.snare],
          rhythm: Rhythms.backbeat,
          version: 1,
          noteCount: 2,
        },
        {
          note: [drumMap.hihat],
          rhythm: Rhythms.basic,
          version: 1,
          noteCount: 8,
        },
      ],
    },
  ],
  [
    "Bossanova_part1",
    {
      id: "Bossanova_part1",
      patterns: [
        {
          note: [drumMap.kick],
          rhythm: Rhythms.bossanova,
          version: 4,
          noteCount: 2,
        },
        {
          note: [drumMap.rimshot],
          rhythm: Rhythms.bossanova,
          version: 1,
          noteCount: 4,
        },
        {
          note: [drumMap.hihat],
          rhythm: Rhythms.basic,
          version: 1,
          noteCount: 8,
        },
      ],
    },
  ],
  [
    "Bossanova_part2",
    {
      id: "Bossanova_part2",
      patterns: [
        {
          note: [drumMap.kick],
          rhythm: Rhythms.bossanova,
          version: 4,
          noteCount: 2,
        },
        {
          note: [drumMap.rimshot],
          rhythm: Rhythms.bossanova,
          version: 2,
          noteCount: 3,
        },
        {
          note: [drumMap.hihat],
          rhythm: Rhythms.basic,
          version: 1,
          noteCount: 8,
        },
      ],
    },
  ],
]);

export function getDrumRhythmDisplayName(id: DrumRhythmId): string {
  return DrumRhythmIds[id];
}

export function getDrumBarInfoById(id: DrumRhythmId): BarInfo[] | null {
  const rhythm = drumRhythmsMap.get(id);
  return rhythm ? rhythm.patterns : null;
}

export function getAllDrumRhythmIdsWithNames(): Array<{
  id: DrumRhythmId;
  name: string;
}> {
  return Array.from(drumRhythmsMap.keys()).map((id) => ({
    id,
    name: DrumRhythmIds[id],
  }));
}
