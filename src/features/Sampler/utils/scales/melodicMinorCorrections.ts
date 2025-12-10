import type { ScaleDegree } from "../../Data/ScaleDegree";

export const melodicMinorCorrections = (
  scale: ScaleDegree[]
): ScaleDegree[] => {
  const corrected = [...scale];

  corrected[6] = {
    ...corrected[6],
    chords: {
      primary: ["M", "7th"],
      secondary: ["9th", "13th"],
      alternative: ["7b9", "7#9"],
      all: ["M", "7th", "9th", "13th", "7b9", "7#9", "sus4", "7sus4"],
    },
  };

  corrected[5] = {
    ...corrected[5],
    chords: {
      primary: ["dim", "m7b5"],
      secondary: ["dim7"],
      alternative: [],
      all: ["dim", "dim7", "m7b5"],
    },
  };

  corrected[0] = {
    ...corrected[0],
    chords: {
      ...corrected[0].chords,
      primary: ["m", "mMaj7", "m6"],
      all: Array.from(
        new Set([...corrected[0].chords.all, "mMaj7", "m6", "m9"])
      ),
    },
  };

  corrected[3] = {
    ...corrected[3],
    chords: {
      primary: ["M", "7th"],
      secondary: ["maj7", "9th"],
      alternative: ["13th", "sus4"],
      all: ["M", "maj7", "7th", "9th", "13th", "sus4", "7sus4"],
    },
  };

  return corrected;
};
