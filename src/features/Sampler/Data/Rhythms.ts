export const Rhythms = {
  basic: "basic",
  backbeat: "backbeat",
} as const;

export type RhythmType = keyof typeof Rhythms;
export type RhythmSize = 1 | 2 | 4 | 8 | 16 | 32;

export const getRhythmName = (rType: RhythmType, size: RhythmSize): string => {
  return `${[rType]}_${size}`;
};
