export const HARMONY_TRAITS = {
  CALM: "calm",
  TENSE: "tense",
  BRIGHT: "bright", 
  DARK: "dark",
  COMPLEX: "complex",
  SIMPLE: "simple",
} as const;

export type HarmonyTraitType = (typeof HARMONY_TRAITS)[keyof typeof HARMONY_TRAITS];
export const HARMONY_TRAITS_LIST = Object.values(HARMONY_TRAITS);