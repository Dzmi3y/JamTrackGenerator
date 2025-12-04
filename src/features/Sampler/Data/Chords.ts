export const Chords = {
  M: "M",
  maj7: "maj7",
  "6th": "6th",
  maj9: "maj9",
  maj13: "maj13",

  m: "m",
  m7: "m7",
  m6: "m6",
  m9: "m9",
  m11: "m11",
  m13: "m13",

  "7th": "7th",
  "7b9": "7b9",
  "7#9": "7#9",
  "9th": "9th",
  "13th": "13th",

  dim: "dim",
  dim7: "dim7",

  m7b5: "m7b5",
  mMaj7: "mMaj7",

  sus2: "sus2",
  sus4: "sus4",
  "7sus4": "7sus4",
} as const;

export type ChordType = keyof typeof Chords;
