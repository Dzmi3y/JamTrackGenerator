import type { ScaleDegree } from "../../Data/ScaleDegree";
import type { ScaleMode } from "../../Data/ScaleMode";
import { createMode } from "./createMode";

export function getChordsForDegree(
  modeName: ScaleMode,
  degree: number
): ScaleDegree["chords"] {
  const mode = createMode(modeName);
  const degreeIndex = degree - 1;

  if (degreeIndex < 0 || degreeIndex >= mode.length) {
    throw new Error(`Step ${degree} is not exist in ${modeName}`);
  }

  return mode[degreeIndex].chords;
}
