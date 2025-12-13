import { drumMap } from "../Data/DrumNotes";
import { Rhythms } from "../Data/Rhythms";
import type { BarInfo } from "../utils/buildPatternBars";

export interface DrumRhythm {
  id: DrumRhythmId;
  patterns: BarInfo[];
}

export const DrumRhythmIds = {
  Basic_Rock_Beat: "Basic Rock Beat",
  Skank_Beat: "Skank Beat",
} as const;

export type DrumRhythmId = keyof typeof DrumRhythmIds;

export const DrumRhythms: DrumRhythm[] = [
  {
    id: "Basic_Rock_Beat",
    patterns: [
      { note: [drumMap.kick], rhythm: Rhythms.basic, rhythmSize: 2 },
      { note: [drumMap.snare], rhythm: Rhythms.backbeat, rhythmSize: 2 },
      { note: [drumMap.hihat], rhythm: Rhythms.basic, rhythmSize: 8 },
    ],
  },
  {
    id: "Skank_Beat",
    patterns: [
      { note: [drumMap.kick], rhythm: Rhythms.basic, rhythmSize: 8 },
      { note: [drumMap.snare], rhythm: Rhythms.backbeat, rhythmSize: 2 },
      { note: [drumMap.hihat], rhythm: Rhythms.basic, rhythmSize: 16 },
    ],
  },
];

export function getDrumRhythmDisplayName(id: DrumRhythmId): string {
  return DrumRhythmIds[id];
}

export function getDrumBarInfoById(id: DrumRhythmId): BarInfo[] | null {
  const rhythm = DrumRhythms.find((rhythm) => rhythm.id === id);

  return rhythm ? rhythm.patterns : null;
}

export function getAllDrumRhythmIdsWithNames(): Array<{
  id: DrumRhythmId;
  name: string;
}> {
  return Object.entries(DrumRhythmIds).map(([id, name]) => ({
    id: id as DrumRhythmId,
    name,
  }));
}
