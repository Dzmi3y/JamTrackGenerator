import type { Degree } from "../../../utils/progressionUtil";
import type { RhythmInfo } from "../../Rhythms";

export const pianoHigh: (Degree[] | undefined)[] = [
  [{ value: 1, octave: 4, concreteChordType: "m7" }],
  [{ value: 1, octave: 4, concreteChordType: "m7" }],
  [{ value: 4, octave: 4, concreteChordType: "m7" }],
  [{ value: 4, octave: 4, concreteChordType: "m7" }],

  [{ value: 2, octave: 4, concreteChordType: "m7" }],
  [{ value: 5, octave: 4, concreteChordType: "7th" }],
  [{ value: 1, octave: 4, concreteChordType: "6th" }],
  [{ value: 6, octave: 4, concreteChordType: "m7" }],

  [{ value: 4, octave: 4, concreteChordType: "6th" }],
  [{ value: 4, octave: 4, concreteChordType: "6th" }],
  [{ value: 6, octave: 4, concreteChordType: "m7" }],
  [{ value: 5, octave: 4, concreteChordType: "7th" }],
];

export const pianoHighRhythm: Array<RhythmInfo|null> = [
  { rType: "bossanova", version: 1, noteCount: 4 },
  { rType: "bossanova", version: 2, noteCount: 3 },
  { rType: "bossanova", version: 1, noteCount: 4 },
  { rType: "bossanova", version: 2, noteCount: 3 },

  { rType: "bossanova", version: 1, noteCount: 4 },
  { rType: "bossanova", version: 2, noteCount: 3 },
  { rType: "bossanova", version: 1, noteCount: 4 },
  { rType: "bossanova", version: 2, noteCount: 3 },

  { rType: "bossanova", version: 1, noteCount: 4 },
  { rType: "bossanova", version: 2, noteCount: 3 },
  { rType: "bossanova", version: 1, noteCount: 4 },
  { rType: "bossanova", version: 2, noteCount: 3 },
];
