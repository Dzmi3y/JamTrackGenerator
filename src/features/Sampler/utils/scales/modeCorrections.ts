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
        basic: "m",
        "7th": "m7",
        add6: "m6",
        mMaj7: "mMaj7",
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
        sus4: "sus4",
      },
    };

    return corrected;
  },

  6: (scale) => {
    const corrected = [...scale];

    corrected[6] = {
      ...corrected[6],
      chords: {
        basic: "M",
        "7th": "7th",
        add9: "9th",
        sus4: "sus4",
        add13: "13th",
        "7sus4": "7sus4",
        add11: "M",
        add6: "M",
        mMaj7: "mMaj7",
        sus2: "sus2",
      },
    };

    return corrected;
  },

  7: (scale) => {
    const corrected = [...scale];

    corrected[0] = {
      ...corrected[0],
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
        mMaj7: "dim",
      },
    };

    return corrected;
  },
};
