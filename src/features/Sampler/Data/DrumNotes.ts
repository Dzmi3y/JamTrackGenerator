export type DrumName =
  | "kick"
  | "snare"
  | "rimshot"
  | "hihat"
  | "ohihat"
  | "lowTom"
  | "midTom"
  | "highTom"
  | "crash"
  | "ride";

export const drumMap: Record<DrumName, string> = {
  kick: "C1",
  snare: "D1",
  rimshot: "C#1",
  hihat: "F#1",
  ohihat: "A#1",
  lowTom: "F1",
  midTom: "B1",
  highTom: "D2",
  crash: "C#2",
  ride: "D#2",
} as const;
