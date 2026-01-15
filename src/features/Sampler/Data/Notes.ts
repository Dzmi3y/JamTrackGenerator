export const Notes = {
  C: "C",
  "C#": "C#",
  Db: "Db",
  D: "D",
  "D#": "D#",
  Eb: "Eb",
  E: "E",
  F: "F",
  "F#": "F#",
  Gb: "Gb",
  G: "G",
  "G#": "G#",
  Ab: "Ab",
  A: "A",
  "A#": "A#",
  Bb: "Bb",
  B: "B",
} as const;

export type NoteType = keyof typeof Notes;
export const NoteList = Object.keys(Notes) as NoteType[];
