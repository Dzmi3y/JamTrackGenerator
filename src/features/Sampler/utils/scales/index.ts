import type { ChordPriority } from "../../Data/ScaleDegree";
import type { ScaleMode } from "../../Data/ScaleMode";
import { createMode } from "./createMode";

export function getChordForDegree(
  modeName: ScaleMode,
  degree: 1 | 2 | 3 | 4 | 5 | 6 | 7
):ChordPriority {
  const mode = createMode(modeName);
  const degreeIndex = degree - 1;

  if (degreeIndex < 0 || degreeIndex >= mode.length) {
    throw new Error(`Step ${degree} is not exist in ${modeName}`);
  }

  return mode[degreeIndex].chords;
}
