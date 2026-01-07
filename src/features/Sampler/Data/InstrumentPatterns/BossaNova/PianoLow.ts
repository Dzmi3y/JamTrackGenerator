import type { HarmonyTraitType } from "../../../types/harmonyTraitType";
import type { RhythmTraitType } from "../../../types/rhythmTraitType";
import type { RhythmInfo } from "../../Rhythms";

export const PianoLow: Map<
  HarmonyTraitType,
  { value: number; octave: number; interval: number }[]
> = new Map([
  [
    "simple",
    [
      { value: 1, octave: 2, interval: 8 },
      { value: 4, octave: 2, interval: 8 },
      { value: 5, octave: 2, interval: 8 },
      { value: 1, octave: 2, interval: 8 },
    ],
  ],

  [
    "calm",
    [
      { value: 1, octave: 2, interval: 8 },
      { value: 2, octave: 2, interval: 8 },
      { value: 4, octave: 2, interval: 8 },
      { value: 5, octave: 2, interval: 8 },
    ],
  ],

  [
    "tense",
    [
      { value: 1, octave: 2, interval: 8 },
      { value: 4, octave: 2, interval: 8 },
      { value: 5, octave: 2, interval: 8 },
      { value: 1, octave: 2, interval: 8 },
    ],
  ],

  [
    "bright",
    [
      { value: 1, octave: 2, interval: 8 },
      { value: 4, octave: 2, interval: 8 },
      { value: 5, octave: 2, interval: 8 },
      { value: 1, octave: 3, interval: 8 },
    ],
  ],

  [
    "dark",
    [
      { value: 1, octave: 2, interval: 8 },
      { value: 4, octave: 2, interval: 8 },
      { value: 5, octave: 2, interval: 8 },
      { value: 1, octave: 2, interval: 8 },
    ],
  ],

  [
    "complex",
    [
      { value: 1, octave: 2, interval: 8 },
      { value: 4, octave: 2, interval: 8 },
      { value: 5, octave: 2, interval: 8 },
      { value: 2, octave: 3, interval: 8 },
    ],
  ],
]);



export const pianoLowRhythm: Map<RhythmTraitType, RhythmInfo[]> = new Map([
 [
    "simple",
    [
      { rType: "basic", version: 1, noteCount: 1 },
      { rType: "basic", version: 1, noteCount: 1 },
      { rType: "basic", version: 1, noteCount: 1 },
      { rType: "basic", version: 1, noteCount: 1 },
    ],
  ],
  [
    "moderate",
    [
      { rType: "bossanova", version: 4, noteCount: 2 },
      { rType: "basic", version: 1, noteCount: 1 },
      { rType: "bossanova", version: 4, noteCount: 2 },
      { rType: "basic", version: 1, noteCount: 1 },
    ],
  ],
  [
    "complex",
    [
      { rType: "bossanova", version: 3, noteCount: 4 },
      { rType: "bossanova", version: 3, noteCount: 4 },
      { rType: "bossanova", version: 3, noteCount: 4 },
      { rType: "bossanova", version: 3, noteCount: 4 },
    ],
  ],
])