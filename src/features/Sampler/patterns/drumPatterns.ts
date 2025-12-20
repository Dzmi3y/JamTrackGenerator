import { drumMap } from "../Data/DrumNotes";
import { Rhythms } from "../Data/Rhythms";
import type { BarInfo } from "../utils/buildPatternBars";

export interface DrumRhythm {
  id: DrumRhythmId;
  patterns: BarInfo[];
}

export const DrumRhythmIds = {
  Basic_Rock_Beat: "Basic Rock Beat",
  Grove_Basic_Rock_Beat:"Grove Basic Rock Beat",
  Skank_Beat: "Skank Beat",
  Funk_Disco_Beat: "Funk_Disco_Beat",
  Half_Time_Shuffle: "Half_Time_Shuffle",
  Simple_Hip_Hop: "Simple_Hip_Hop",
  Double_Bass_Metal: "Double_Bass_Metal",
  Reggaeton_Dembow: "Reggaeton_Dembow",
  Blues_Shuffle: "Blues_Shuffle",
  DnB_Jungle: "DnB_Jungle",
  Trap_Boom_Bap: "Trap_Boom_Bap",
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
    id: "Grove_Basic_Rock_Beat",
    patterns: [
      { note: [drumMap.kick], rhythm: Rhythms.basicGrouve, rhythmSize: 2 },
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
  {
    id: "Funk_Disco_Beat",
    patterns: [
      { note: [drumMap.kick], rhythm: Rhythms.basic, rhythmSize: 4 },
      { note: [drumMap.snare], rhythm: Rhythms.backbeat, rhythmSize: 4 },
      { note: [drumMap.hihat], rhythm: Rhythms.basic, rhythmSize: 8 },
      {
        note: [drumMap.midTom],
        rhythm: Rhythms.basic,
        rhythmSize: 16,
      },
    ],
  },
  {
    id: "Half_Time_Shuffle",
    patterns: [
      { note: [drumMap.kick], rhythm: Rhythms.basic, rhythmSize: 2 },
      { note: [drumMap.snare], rhythm: Rhythms.backbeat, rhythmSize: 1 },
      { note: [drumMap.hihat], rhythm: Rhythms.basic, rhythmSize: 8 },
      {
        note: [drumMap.ride],
        rhythm: Rhythms.basic,
        rhythmSize: 4,
      },
    ],
  },
  {
    id: "Simple_Hip_Hop",
    patterns: [
      { note: [drumMap.kick], rhythm: Rhythms.basic, rhythmSize: 4 },
      { note: [drumMap.snare], rhythm: Rhythms.backbeat, rhythmSize: 4 },
      { note: [drumMap.hihat], rhythm: Rhythms.basic, rhythmSize: 8 },
    ],
  },
  {
    id: "Double_Bass_Metal",
    patterns: [
      { note: [drumMap.kick], rhythm: Rhythms.basic, rhythmSize: 16 },
      { note: [drumMap.snare], rhythm: Rhythms.backbeat, rhythmSize: 2 },
      { note: [drumMap.crash], rhythm: Rhythms.basic, rhythmSize: 1 },
    ],
  },
  {
  id: "Trap_Boom_Bap",
  patterns: [
    { note: [drumMap.kick], rhythm: Rhythms.basic, rhythmSize: 16 },
    { note: [drumMap.rimshot], rhythm: Rhythms.backbeat, rhythmSize: 8 },
    { note: [drumMap.snare], rhythm: Rhythms.backbeat, rhythmSize: 4 },
    { note: [drumMap.hihat], rhythm: Rhythms.basic, rhythmSize: 16 },
    { note: [drumMap.highTom], rhythm: Rhythms.basic, rhythmSize: 32 },    
  ],
},
  {
    id: "DnB_Jungle",
    patterns: [
      { note: [drumMap.kick], rhythm: Rhythms.basic, rhythmSize: 8 },
      { note: [drumMap.snare], rhythm: Rhythms.basic, rhythmSize: 16 },
      { note: [drumMap.hihat], rhythm: Rhythms.backbeat, rhythmSize: 32 },
      {
        note: [drumMap.midTom],
        rhythm: Rhythms.basic,
        rhythmSize: 16,
      },
      { note: [drumMap.crash], rhythm: Rhythms.basic, rhythmSize: 1 },
    ],
  },
  {
    id: "Blues_Shuffle",
    patterns: [
      { note: [drumMap.kick], rhythm: Rhythms.basic, rhythmSize: 4 },
      { note: [drumMap.snare], rhythm: Rhythms.backbeat, rhythmSize: 4 },
      { note: [drumMap.hihat], rhythm: Rhythms.basic, rhythmSize: 8 },
      { note: [drumMap.ride], rhythm: Rhythms.backbeat, rhythmSize: 8 },
    ],
  },
  {
    id: "Reggaeton_Dembow",
    patterns: [
      { note: [drumMap.kick], rhythm: Rhythms.basic, rhythmSize: 4 },
      { note: [drumMap.snare], rhythm: Rhythms.backbeat, rhythmSize: 8 },
      { note: [drumMap.hihat], rhythm: Rhythms.basic, rhythmSize: 16 },
      {
        note: [drumMap.ride ],
        rhythm: Rhythms.backbeat,
        rhythmSize: 8,
      },
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
