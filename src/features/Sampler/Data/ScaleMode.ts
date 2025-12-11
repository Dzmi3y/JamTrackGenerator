export const SCALE_MODES = [
  "ionian",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "aeolian",
  "locrian",
  "melodic minor",
  "harmonic minor",
] as const;

export type ScaleMode = (typeof SCALE_MODES)[number];
