import type { ScaleDegree } from "../../Data/ScaleDegree";

export const modeCorrections: Record<
  number,
  (scale: ScaleDegree[]) => ScaleDegree[]
> = {
  2: (scale) => {
    const corrected = [...scale];

    corrected[0] = {
      ...corrected[0],
      chords: {
        ...corrected[0].chords,
        primary: ["m", "m7", "m6"],
        all: Array.from(new Set([...corrected[0].chords.all, "m6", "mMaj7"])),
      },
    };

    return corrected;
  },

  3: (scale) => {
    const corrected = [...scale];
    corrected[0] = {
      ...corrected[0],
      chords: {
        ...corrected[0].chords,
        secondary: [...corrected[0].chords.secondary, "sus4"],
      },
    };

    return corrected;
  },

  6: (scale) => {
    const corrected = [...scale];

    corrected[6] = {
      ...corrected[6],
      chords: {
        primary: ["M", "7th"],
        secondary: ["9th", "sus4"],
        alternative: ["13th", "7b9"],
        all: ["M", "7th", "9th", "13th", "7b9", "sus4", "7sus4"],
      },
    };

    return corrected;
  },

  7: (scale) => {
    const corrected = [...scale];

    corrected[0] = {
      ...corrected[0],
      chords: {
        primary: ["dim", "m7b5"],
        secondary: ["dim7"],
        alternative: [],
        all: ["dim", "dim7", "m7b5"],
      },
    };

    return corrected;
  },
};
