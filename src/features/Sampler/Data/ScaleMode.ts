export const SCALE_MODES = [
  "ionian/major",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "aeolian/minor",
  "locrian",
  "melodic minor",
  "harmonic minor",
] as const;

export type ScaleMode = (typeof SCALE_MODES)[number];
