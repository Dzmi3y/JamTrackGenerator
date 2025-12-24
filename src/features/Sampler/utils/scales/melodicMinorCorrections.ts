import type { ScaleDegree } from "../../Data/ScaleDegree";

export const melodicMinorCorrections = (
  scale: ScaleDegree[]
): ScaleDegree[] => {
  const corrected = [...scale];

  corrected[0] = {
    degree: 1,
    chords: {
      basic: "m",
      add6: "m6",
      "7th": "mMaj7",
      add9: "m9",
      add11: "m11",
      add13: "m13",
      sus2: "sus2",
      sus4: "sus4",
      "7sus4": "7sus4",
      mMaj7: "mMaj7",
    },
  };

  corrected[1] = {
    degree: 2,
    chords: {
      basic: "m",
      add6: "m6",
      "7th": "m7b5",
      add9: "m9",
      add11: "m11",
      add13: "m13",
      sus2: "sus2",
      sus4: "sus4",
      "7sus4": "7sus4",
      mMaj7: "m",
    },
  };

  corrected[2] = {
    degree: 3,
    chords: {
      basic: "M",
      add6: "6th",
      "7th": "maj7",
      add9: "maj9",
      add11: "M",
      add13: "maj13",
      sus2: "sus2",
      sus4: "sus4",
      "7sus4": "7sus4",
      mMaj7: "M",
    },
  };

  corrected[3] = {
    degree: 4,
    chords: {
      basic: "M",
      add6: "6th",
      "7th": "7th",
      add9: "9th",
      add11: "M",
      add13: "13th",
      sus2: "sus2",
      sus4: "sus4",
      "7sus4": "7sus4",
      mMaj7: "M",
    },
  };

  corrected[4] = {
    degree: 5,
    chords: {
      basic: "M",
      add6: "M",
      "7th": "7th",
      add9: "9th",
      add11: "M",
      add13: "13th",
      sus2: "sus2",
      sus4: "sus4",
      "7sus4": "7sus4",
      mMaj7: "M",
    },
  };

  corrected[5] = {
    degree: 6,
    chords: {
      basic: "dim",
      add6: "dim",
      "7th": "m7b5",
      add9: "m9",
      add11: "m11",
      add13: "m13",
      sus2: "sus2",
      sus4: "sus4",
      "7sus4": "7sus4",
      mMaj7: "dim",
    },
  };

  corrected[6] = {
    degree: 7,
    chords: {
      basic: "dim",
      add6: "dim",
      "7th": "m7b5",
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
};