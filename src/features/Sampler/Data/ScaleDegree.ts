import type { ChordType } from "./Chords";

export type FixedChordType =
  | "basic"
  | "add6"
  | "7th"
  | "add9"
  | "add11"
  | "add13"
  | "sus2"
  | "sus4"
  | "7sus4";

export type ScaleDegree = {
  degree: number;
  chords: Record<FixedChordType, ChordType>;
};

export const IonianScaleDegrees: ScaleDegree[] = [
  {
    degree: 1,
    chords: {
      basic: "M",
      add6: "6th",
      "7th": "maj7",
      add9: "maj9",
      add11: "M",
      add13: "maj13",
      sus2: "sus2",
      sus4: "sus4",
      "7sus4": "7sus4",
    },
  },
  {
    degree: 2,
    chords: {
      basic: "m",
      add6: "m6",
      "7th": "m7",
      add9: "m9",
      add11: "m11",
      add13: "m13",
      sus2: "sus2",
      sus4: "sus4",
      "7sus4": "7sus4",
    },
  },
  {
    degree: 3,
    chords: {
      basic: "m",
      add6: "m6",
      "7th": "m7",
      add9: "m9",
      add11: "m11",
      add13: "m13",
      sus2: "sus2",
      sus4: "sus4",
      "7sus4": "7sus4",
    },
  },
  {
    degree: 4,
    chords: {
      basic: "M",
      add6: "6th",
      "7th": "maj7",
      add9: "maj9",
      add11: "M",
      add13: "maj13",
      sus2: "sus2",
      sus4: "sus4",
      "7sus4": "7sus4",
    },
  },
  {
    degree: 5,
    chords: {
      basic: "M",
      add6: "M",
      "7th": "7th",
      add9: "9th",
      add11: "M",
      add13: "13th",
      sus2: "sus2",
      sus4: "sus4",
      "7sus4": "7sus4",
    },
  },
  {
    degree: 6,
    chords: {
      basic: "m",
      add6: "m6",
      "7th": "m7",
      add9: "m9",
      add11: "m11",
      add13: "m13",
      sus2: "sus2",
      sus4: "sus4",
      "7sus4": "7sus4",
    },
  },
  {
    degree: 7,
    chords: {
      basic: "dim",
      add6: "dim",
      "7th": "dim7",
      add9: "dim",
      add11: "dim",
      add13: "dim",
      sus2: "dim",
      sus4: "dim",
      "7sus4": "dim",
    },
  },
];
