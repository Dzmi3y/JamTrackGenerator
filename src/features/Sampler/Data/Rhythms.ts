export const Rhythms = {
  basic: "basic",
  backbeat: "backbeat",
  basicGrouve: "basicGrouve",
  bossanovaRH1: "bossanovaRH1",
  bossanovaRH2: "bossanovaRH2",
  bossanovaLH1: "bossanovaLH1",
} as const;

export type RhythmType = keyof typeof Rhythms;
export type RhythmSize = 1 | 2 | 4 | 8 | 16 | 32;

export const getRhythmName = (rType: RhythmType, size: RhythmSize): string => {
  return `${[rType]}_${size}`;
};
