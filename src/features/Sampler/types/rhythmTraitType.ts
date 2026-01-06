export const RHYTHM_TRAITS = {
  SIMPLE: "simple",
  MODERATE: "moderate",
  COMPLEX: "complex",
} as const;

export type RhythmTraitType = (typeof RHYTHM_TRAITS)[keyof typeof RHYTHM_TRAITS];
export const RHYTHM_TRAITS_LIST = Object.values(RHYTHM_TRAITS);