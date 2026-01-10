import type { RhythmInfo } from "../../Rhythms";

export const PianoLow: { value: number; octave: number; interval: number }[] = [
  { value: 1, octave: 2, interval: 8 },
  { value: 1, octave: 2, interval: 8 },
  { value: 4, octave: 2, interval: 8 },
  { value: 4, octave: 2, interval: 8 },

  { value: 2, octave: 2, interval: 8 },
  { value: 5, octave: 2, interval: 8 },
  { value: 1, octave: 2, interval: 8 },
  { value: 1, octave: 2, interval: 8 },

  { value: 4, octave: 2, interval: 8 },
  { value: 4, octave: 2, interval: 8 },
  { value: 6, octave: 2, interval: 8 },
  { value: 5, octave: 2, interval: 8 },
];

export const pianoLowRhythm: Array<RhythmInfo | null> = [
  { rType: "bossanova", version: 4, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 1 },
  { rType: "bossanova", version: 4, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 1 },

  { rType: "bossanova", version: 4, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 1 },
  { rType: "bossanova", version: 4, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 1 },

  { rType: "bossanova", version: 4, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 1 },
  { rType: "bossanova", version: 4, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 1 },
];
