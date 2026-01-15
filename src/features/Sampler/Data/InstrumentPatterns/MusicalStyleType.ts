export const MusicalStyles = {
  Blues: "Blues",
  BossaNova: "BossaNova",
  Rock: "Rock",
} as const;

export type MusicalStyleType = keyof typeof MusicalStyles;
export const MusicalStyleList = Object.keys(MusicalStyles) as MusicalStyleType[];
