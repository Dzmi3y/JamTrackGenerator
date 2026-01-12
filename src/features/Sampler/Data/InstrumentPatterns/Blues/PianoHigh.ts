import type { Degree } from "../../../utils/progressionUtil";
import type { RhythmInfo } from "../../Rhythms";

export const pianoHigh: (Degree[] | undefined)[] = [
  [{ value: 1, octave: 4, concreteChordType: "7th" }],
  [{ value: 1, octave: 4, concreteChordType: "7th" }],
  [{ value: 1, octave: 4, concreteChordType: "7th" }],
  [{ value: 1, octave: 4, concreteChordType: "7th" }],

  [{ value: 4, octave: 4, concreteChordType: "7th" }],
  [{ value: 4, octave: 4, concreteChordType: "7th" }],
  [{ value: 1, octave: 4, concreteChordType: "7th" }],
  [{ value: 1, octave: 4, concreteChordType: "7th" }],

  [{ value: 5, octave: 4, concreteChordType: "7th" }],
  [{ value: 4, octave: 4, concreteChordType: "7th" }],
  [{ value: 1, octave: 4, concreteChordType: "7th" }],
  [{ value: 1, octave: 4, concreteChordType: "7th" }],
];

export const pianoHighRhythm: Array<RhythmInfo | null> = [
  { rType: "basic", version: 1, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 2 },

  { rType: "basic", version: 1, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 2 },

  { rType: "basic", version: 1, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 2 },
];
