import { IonianScaleDegrees, type ScaleDegree } from "../../Data/ScaleDegree";
import type { ScaleMode } from "../../Data/ScaleMode";
import { harmonicMinorCorrections } from "./harmonicMinorCorrections";
import { melodicMinorCorrections } from "./melodicMinorCorrections";
import { modeCorrections } from "./modeCorrections";
import { rotateScale } from "./rotateScale";

export const MODE_ROTATIONS: Record<ScaleMode, number> = {
  "ionian/major": 1,
  dorian: 2,
  phrygian: 3,
  lydian: 4,
  mixolydian: 5,
  "aeolian/minor": 6,
  locrian: 7,
  "melodic minor": 9,
  "harmonic minor": 8,
} as const;

export function createMode(modeName: ScaleMode): ScaleDegree[] {
  const modeNumber = MODE_ROTATIONS[modeName];

  if (!modeNumber) {
    throw new Error(
      `Unknown scale: ${modeName}. Use: ${Object.keys(MODE_ROTATIONS).join(
        ", "
      )}`
    );
  }

  if (modeNumber >= 1 && modeNumber <= 7) {
    let rotated = rotateScale(IonianScaleDegrees, modeNumber - 1);

    if (modeCorrections[modeNumber]) {
      rotated = modeCorrections[modeNumber](rotated);
    }

    return rotated;
  }

  if (modeNumber === 8) {
    const aeolian = rotateScale(IonianScaleDegrees, 5);
    return harmonicMinorCorrections(aeolian);
  }

  if (modeNumber === 9) {
    const aeolian = rotateScale(IonianScaleDegrees, 5);
    return melodicMinorCorrections(aeolian);
  }

  throw new Error(
    `Unknown scale rotation code: ${modeNumber} for scale: ${modeName}`
  );
}
