import type { ScaleDegree } from "../../Data/ScaleDegree";

export const harmonicMinorCorrections = (
  scale: ScaleDegree[]
): ScaleDegree[] => {
  const corrected = [...scale];

  corrected[6] = {
    ...corrected[6],
    chords: {
      primary: ["M", "7th", "7b9"],
      secondary: ["dim7"],
      alternative: ["7#9"],
      all: ["M", "7th", "7b9", "7#9", "dim7", "9th", "13th"],
    },
  };

  corrected[4] = {
    ...corrected[4],
    chords: {
      primary: ["M", "7th"],
      secondary: ["7b9", "9th"],
      alternative: ["7#9", "13th"],
      all: ["M", "7th", "7b9", "7#9", "9th", "13th", "sus4", "7sus4"],
    },
  };

  corrected[0] = {
    ...corrected[0],
    chords: {
      ...corrected[0].chords,
      primary: ["m", "mMaj7", "m7"],
      all: Array.from(new Set([...corrected[0].chords.all, "mMaj7", "m6"])),
    },
  };

  return corrected;
};
