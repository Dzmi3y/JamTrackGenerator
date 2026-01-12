import type { Degree } from "../../../utils/progressionUtil";
import type { RhythmInfo } from "../../Rhythms";

export const pianoHigh: (Degree[] | undefined)[] = [
  [{ value: 1, octave: 4, generalChordType: "basic" }],
  [{ value: 1, octave: 4, generalChordType: "basic" }],
  [{ value: 6, octave: 3, generalChordType: "basic" }],
  [{ value: 4, octave: 4, generalChordType: "basic" }],

  [{ value: 1, octave: 4, generalChordType: "basic" }],
  [{ value: 5, octave: 4, generalChordType: "basic" }],
  [{ value: 4, octave: 4, generalChordType: "basic" }],
  [{ value: 2, octave: 4, generalChordType: "basic" }],

  [{ value: 5, octave: 4, generalChordType: "basic" }],
  [{ value: 3, octave: 4, generalChordType: "basic" }],
  [
    { value: 6, octave: 3, generalChordType: "basic" },
    { value: 4, octave: 4, generalChordType: "basic" },
  ],
  [
    { value: 5, octave: 4, generalChordType: "basic" },
    { value: 1, octave: 4, generalChordType: "7th" },
  ],
];

export const pianoHighRhythm: Array<RhythmInfo | null> = [
  { rType: "basic", version: 1, noteCount: 1 },
  { rType: "basic", version: 1, noteCount: 1 },
  { rType: "basic", version: 1, noteCount: 1 },
  { rType: "basic", version: 1, noteCount: 1 },

  { rType: "basic", version: 1, noteCount: 1 },
  { rType: "basic", version: 1, noteCount: 1 },
  { rType: "basic", version: 1, noteCount: 1 },
  { rType: "basic", version: 1, noteCount: 1 },

  { rType: "basic", version: 1, noteCount: 1 },
  { rType: "basic", version: 1, noteCount: 1 },
  { rType: "basic", version: 1, noteCount: 2 },
  { rType: "basic", version: 1, noteCount: 2 },
];
