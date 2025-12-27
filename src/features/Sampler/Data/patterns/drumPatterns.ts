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
  Skank_Beat: "Skank Beat",
  Funk_Disco_Beat: "Funk_Disco_Beat",
  Half_Time_Shuffle: "Half_Time_Shuffle",
  Simple_Hip_Hop: "Simple_Hip_Hop",
  Double_Bass_Metal: "Double_Bass_Metal",
  Reggaeton_Dembow: "Reggaeton_Dembow",
  Blues_Shuffle: "Blues_Shuffle",
  DnB_Jungle: "DnB_Jungle",
  Trap_Boom_Bap: "Trap_Boom_Bap",
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
        { note: [drumMap.kick], rhythm: Rhythms.basic, version: 1, noteCount: 2 },
        { note: [drumMap.snare], rhythm: Rhythms.backbeat, version: 1, noteCount: 2 },
        { note: [drumMap.hihat], rhythm: Rhythms.basic, version: 1, noteCount: 8 },
      ],
    },
  ],
  [
    "Grove_Basic_Rock_Beat",
    {
      id: "Grove_Basic_Rock_Beat",
      patterns: [
        { note: [drumMap.kick], rhythm: Rhythms.groove, version: 1, noteCount: 2 },
        { note: [drumMap.snare], rhythm: Rhythms.backbeat, version: 1, noteCount: 2 },
        { note: [drumMap.hihat], rhythm: Rhythms.basic, version: 1, noteCount: 8 },
      ],
    },
  ],
  [
    "Skank_Beat",
    {
      id: "Skank_Beat",
      patterns: [
        { note: [drumMap.kick], rhythm: Rhythms.basic, version: 1, noteCount: 8 },
        { note: [drumMap.snare], rhythm: Rhythms.backbeat, version: 1, noteCount: 2 },
        { note: [drumMap.hihat], rhythm: Rhythms.basic, version: 1, noteCount: 16 },
      ],
    },
  ],
  [
    "Funk_Disco_Beat",
    {
      id: "Funk_Disco_Beat",
      patterns: [
        { note: [drumMap.kick], rhythm: Rhythms.basic, version: 1, noteCount: 4 },
        { note: [drumMap.snare], rhythm: Rhythms.backbeat, version: 1, noteCount: 4 },
        { note: [drumMap.hihat], rhythm: Rhythms.basic, version: 1, noteCount: 8 },
        { note: [drumMap.midTom], rhythm: Rhythms.basic, version: 1, noteCount: 16 },
      ],
    },
  ],
  [
    "Half_Time_Shuffle",
    {
      id: "Half_Time_Shuffle",
      patterns: [
        { note: [drumMap.kick], rhythm: Rhythms.basic, version: 1, noteCount: 2 },
        { note: [drumMap.snare], rhythm: Rhythms.backbeat, version: 1, noteCount: 1 },
        { note: [drumMap.hihat], rhythm: Rhythms.basic, version: 1, noteCount: 8 },
        { note: [drumMap.ride], rhythm: Rhythms.basic, version: 1, noteCount: 4 },
      ],
    },
  ],
  [
    "Simple_Hip_Hop",
    {
      id: "Simple_Hip_Hop",
      patterns: [
        { note: [drumMap.kick], rhythm: Rhythms.basic, version: 1, noteCount: 4 },
        { note: [drumMap.snare], rhythm: Rhythms.backbeat, version: 1, noteCount: 4 },
        { note: [drumMap.hihat], rhythm: Rhythms.basic, version: 1, noteCount: 8 },
      ],
    },
  ],
  [
    "Double_Bass_Metal",
    {
      id: "Double_Bass_Metal",
      patterns: [
        { note: [drumMap.kick], rhythm: Rhythms.basic, version: 1, noteCount: 16 },
        { note: [drumMap.snare], rhythm: Rhythms.backbeat, version: 1, noteCount: 2 },
        { note: [drumMap.crash], rhythm: Rhythms.basic, version: 1, noteCount: 1 },
      ],
    },
  ],
  [
    "Trap_Boom_Bap",
    {
      id: "Trap_Boom_Bap",
      patterns: [
        { note: [drumMap.kick], rhythm: Rhythms.basic, version: 1, noteCount: 16 },
        { note: [drumMap.rimshot], rhythm: Rhythms.backbeat, version: 1, noteCount: 8 },
        { note: [drumMap.snare], rhythm: Rhythms.backbeat, version: 1, noteCount: 4 },
        { note: [drumMap.hihat], rhythm: Rhythms.basic, version: 1, noteCount: 16 },
        { note: [drumMap.highTom], rhythm: Rhythms.basic, version: 1, noteCount: 32 },
      ],
    },
  ],
  [
    "DnB_Jungle",
    {
      id: "DnB_Jungle",
      patterns: [
        { note: [drumMap.kick], rhythm: Rhythms.basic, version: 1, noteCount: 8 },
        { note: [drumMap.snare], rhythm: Rhythms.basic, version: 1, noteCount: 16 },
        { note: [drumMap.hihat], rhythm: Rhythms.backbeat, version: 1, noteCount: 32 },
        { note: [drumMap.midTom], rhythm: Rhythms.basic, version: 1, noteCount: 16 },
        { note: [drumMap.crash], rhythm: Rhythms.basic, version: 1, noteCount: 1 },
      ],
    },
  ],
  [
    "Blues_Shuffle",
    {
      id: "Blues_Shuffle",
      patterns: [
        { note: [drumMap.kick], rhythm: Rhythms.basic, version: 1, noteCount: 4 },
        { note: [drumMap.snare], rhythm: Rhythms.backbeat, version: 1, noteCount: 4 },
        { note: [drumMap.hihat], rhythm: Rhythms.basic, version: 1, noteCount: 8 },
        { note: [drumMap.ride], rhythm: Rhythms.backbeat, version: 1, noteCount: 8 },
      ],
    },
  ],
  [
    "Reggaeton_Dembow",
    {
      id: "Reggaeton_Dembow",
      patterns: [
        { note: [drumMap.kick], rhythm: Rhythms.basic, version: 1, noteCount: 4 },
        { note: [drumMap.snare], rhythm: Rhythms.backbeat, version: 1, noteCount: 8 },
        { note: [drumMap.hihat], rhythm: Rhythms.basic, version: 1, noteCount: 16 },
        { note: [drumMap.ride], rhythm: Rhythms.backbeat, version: 1, noteCount: 8 },
      ],
    },
  ],
  [
    "Bossanova_part1",
    {
      id: "Bossanova_part1",
      patterns: [
        { note: [drumMap.kick], rhythm: Rhythms.bossanova, version: 4, noteCount: 2 },
        { note: [drumMap.rimshot], rhythm: Rhythms.bossanova, version: 1, noteCount: 4 },
        { note: [drumMap.hihat], rhythm: Rhythms.basic, version: 1, noteCount: 8 },
      ],
    },
  ],
  [
    "Bossanova_part2",
    {
      id: "Bossanova_part2",
      patterns: [
        { note: [drumMap.kick], rhythm: Rhythms.bossanova, version: 4, noteCount: 2 },
        { note: [drumMap.rimshot], rhythm: Rhythms.bossanova, version: 2, noteCount: 3 },
        { note: [drumMap.hihat], rhythm: Rhythms.basic, version: 1, noteCount: 8 },
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