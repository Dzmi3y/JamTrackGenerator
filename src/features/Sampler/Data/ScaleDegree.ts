import type { ChordType } from "./Chords";

export type ChordPriority = {
  primary: ChordType[];
  secondary: ChordType[];
  alternative: ChordType[];
  all: ChordType[];
};

export type ScaleDegree = {
  degree: number;
  chords: ChordPriority;
};

export const IonianScaleDegrees: ScaleDegree[] = [
  {
    degree: 1,
    chords: {
      primary: ["M", "maj7"],
      secondary: ["6th", "maj9", "sus4"],
      alternative: ["maj13", "sus2", "7sus4"],
      all: ["M", "maj7", "6th", "maj9", "maj13", "sus2", "sus4", "7sus4"],
    },
  },
  {
    degree: 2,
    chords: {
      primary: ["m", "m7"],
      secondary: ["m9", "sus4"],
      alternative: ["m11", "m13", "m6", "sus2", "7sus4"],
      all: ["m", "m7", "m9", "m11", "m13", "m6", "sus2", "sus4", "7sus4"],
    },
  },
  {
    degree: 3,
    chords: {
      primary: ["m", "m7"],
      secondary: ["m9", "sus4"],
      alternative: ["m11", "m13", "m6", "sus2", "7sus4"],
      all: ["m", "m7", "m9", "m11", "m13", "m6", "sus2", "sus4", "7sus4"],
    },
  },
  {
    degree: 4,
    chords: {
      primary: ["M", "maj7"],
      secondary: ["6th", "maj9", "sus4"],
      alternative: ["maj13", "sus2", "7sus4"],
      all: ["M", "maj7", "6th", "maj9", "maj13", "sus2", "sus4", "7sus4"],
    },
  },
  {
    degree: 5,
    chords: {
      primary: ["M", "7th"],
      secondary: ["9th", "sus4", "7sus4"],
      alternative: ["13th", "7b9", "7#9", "sus2"],
      all: ["M", "7th", "9th", "13th", "7b9", "7#9", "sus2", "sus4", "7sus4"],
    },
  },
  {
    degree: 6,
    chords: {
      primary: ["m", "m7"],
      secondary: ["m9", "sus4"],
      alternative: ["m11", "m13", "m6", "sus2", "7sus4"],
      all: ["m", "m7", "m9", "m11", "m13", "m6", "sus2", "sus4", "7sus4"],
    },
  },
  {
    degree: 7,
    chords: {
      primary: ["dim", "m7b5"],
      secondary: ["dim7"],
      alternative: [],
      all: ["dim", "dim7", "m7b5"],
    },
  },
];
