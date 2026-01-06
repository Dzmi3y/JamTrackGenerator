import type { HarmonyTraitType } from "../../../types/harmonyTraitType";
import type { Degree } from "../../../utils/progressionUtil";

export const pianoHigh: Map<HarmonyTraitType, Degree[][]> = new Map([
  [
    "simple",
    [
      [{ value: 1, octave: 4, concreteChordType: "m7" }],
      [{ value: 1, octave: 4, concreteChordType: "m7" }],
      [{ value: 4, octave: 4, concreteChordType: "m7" }],
      [{ value: 5, octave: 4, concreteChordType: "7th" }],
    ],
  ],

  [
    "calm",
    [
      [{ value: 1, octave: 4, concreteChordType: "m9" }],
      [{ value: 4, octave: 4, concreteChordType: "maj7" }],
      [{ value: 2, octave: 4, concreteChordType: "m7" }],
      [{ value: 5, octave: 4, concreteChordType: "7th" }],
    ],
  ],

  [
    "tense",
    [
      [{ value: 1, octave: 4, concreteChordType: "m7b5" }],
      [{ value: 4, octave: 4, concreteChordType: "7b9" }],
      [{ value: 5, octave: 4, concreteChordType: "7#9" }],
      [{ value: 1, octave: 4, concreteChordType: "m7" }],
    ],
  ],

  [
    "bright",
    [
      [{ value: 1, octave: 4, concreteChordType: "6th" }],
      [{ value: 4, octave: 4, concreteChordType: "maj9" }],
      [{ value: 5, octave: 4, concreteChordType: "9th" }],
      [{ value: 1, octave: 5, concreteChordType: "maj7" }],
    ],
  ],

  [
    "dark",
    [
      [{ value: 1, octave: 3, concreteChordType: "m" }],
      [{ value: 4, octave: 3, concreteChordType: "dim" }],
      [{ value: 5, octave: 4, concreteChordType: "m7" }],
      [{ value: 1, octave: 3, concreteChordType: "mMaj7" }],
    ],
  ],

  [
    "complex",
    [
      [{ value: 1, octave: 4, concreteChordType: "m11" }],
      [{ value: 3, octave: 4, concreteChordType: "maj13" }],
      [{ value: 6, octave: 4, concreteChordType: "7sus4" }],
      [{ value: 5, octave: 4, concreteChordType: "13th" }],
    ],
  ],
]);
