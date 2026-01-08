export const HARMONY_TRAITS = {
  SIMPLE: "simple",
  MODERATE: "moderate",
  COMPLEX: "complex",
} as const;

export type HarmonyTraitType = (typeof HARMONY_TRAITS)[keyof typeof HARMONY_TRAITS];
export const HARMONY_TRAITS_LIST = Object.values(HARMONY_TRAITS);