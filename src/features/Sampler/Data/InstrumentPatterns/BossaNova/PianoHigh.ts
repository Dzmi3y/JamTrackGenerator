import type { HarmonyTraitType } from "../../../types/harmonyTraitType";
import type { RhythmTraitType } from "../../../types/rhythmTraitType";
import type { Degree } from "../../../utils/progressionUtil";
import type { RhythmInfo } from "../../Rhythms";

export const pianoHigh: Map<HarmonyTraitType, Degree[][]> = new Map([
  [
    "simple",
    [
      [{ value: 1, octave: 4, concreteChordType: "m7" }],
      [{ value: 4, octave: 4, concreteChordType: "7th" }],
      [{ value: 5, octave: 4, concreteChordType: "m7" }],
      [{ value: 1, octave: 4, concreteChordType: "6th" }],
    ],
  ],

  [
    "calm",
    [
      [{ value: 1, octave: 4, concreteChordType: "m9" }],
      [{ value: 2, octave: 4, concreteChordType: "m7" }],
      [{ value: 4, octave: 4, concreteChordType: "maj7" }],
      [{ value: 5, octave: 4, concreteChordType: "9th" }],
    ],
  ],

  [
    "tense",
    [
      [{ value: 1, octave: 4, concreteChordType: "m7b5" }],
      [{ value: 4, octave: 4, concreteChordType: "7b9" }],
      [{ value: 5, octave: 4, concreteChordType: "7#9" }],
      [{ value: 1, octave: 4, concreteChordType: "m9" }],
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
      [{ value: 4, octave: 3, concreteChordType: "dim7" }],
      [{ value: 5, octave: 4, concreteChordType: "m7" }],
      [{ value: 1, octave: 3, concreteChordType: "mMaj7" }],
    ],
  ],

  [
    "complex",
    [
      [{ value: 1, octave: 4, concreteChordType: "m11" }],
      [{ value: 4, octave: 4, concreteChordType: "7sus4" }],
      [{ value: 5, octave: 4, concreteChordType: "13th" }],
      [{ value: 2, octave: 5, concreteChordType: "m9" }],
    ],
  ],
]);

export const pianoHighRhythm: Map<RhythmTraitType, RhythmInfo[]> = new Map([
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
      { rType: "bossanova", version: 1, noteCount: 4 },
      { rType: "basic", version: 1, noteCount: 1 },
      { rType: "bossanova", version: 1, noteCount: 4 },
      { rType: "basic", version: 1, noteCount: 1 },
    ],
  ],
  [
    "complex",
    [
      { rType: "bossanova", version: 1, noteCount: 4 },
      { rType: "bossanova", version: 2, noteCount: 3 },
      { rType: "bossanova", version: 1, noteCount: 4 },
      { rType: "bossanova", version: 2, noteCount: 3 },
    ],
  ],
]);
