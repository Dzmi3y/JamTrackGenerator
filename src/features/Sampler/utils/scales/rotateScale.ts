import type { ScaleDegree } from "../../Data/ScaleDegree";

export function rotateScale(
  scale: ScaleDegree[],
  steps: number
): ScaleDegree[] {
  const rotated = [...scale];

  for (let i = 0; i < steps; i++) {
    const first = rotated.shift();
    if (first) rotated.push(first);
  }

  return rotated.map((item, index) => ({
    degree: index + 1,
    chords: { ...item.chords },
  }));
}
