export const Rhythms = {
  basic: "basic",
  backbeat: "backbeat",
  groove: "groove",
  bossanova: "bossanova",
} as const;

export type RhythmType = keyof typeof Rhythms;

export const getRhythmName = (
  rType: RhythmType,
  version: number,
  noteCount: number
): string => {
  return `${[rType]}_v${version}_n${noteCount}`;
};



export type RhythmInfo = {
  rType: RhythmType,
  version: number,
  noteCount: number
}