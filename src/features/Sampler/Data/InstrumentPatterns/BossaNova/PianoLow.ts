import type { HarmonyTraitType } from "../../../types/harmonyTraitType";

export const PianoLow: Map<
  HarmonyTraitType,
  { value: number; octave: number; interval: number }[]
> = new Map([
  [
    "simple",
    [
      { value: 1, octave: 2, interval: 8 },
      { value: 1, octave: 2, interval: 8 },
      { value: 4, octave: 2, interval: 8 },
      { value: 5, octave: 2, interval: 8 },
    ],
  ],

  [
    "calm",
    [
      { value: 1, octave: 2, interval: 8 },
      { value: 4, octave: 2, interval: 8 },
      { value: 2, octave: 2, interval: 8 },
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
      { value: 3, octave: 2, interval: 8 },
      { value: 6, octave: 2, interval: 8 },
      { value: 5, octave: 2, interval: 8 },
    ],
  ],
]);
