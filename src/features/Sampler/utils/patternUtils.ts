import type { PartInfo } from "../../../interfaces/PartInfo";
import { rhythmPatterns } from "../Data/patterns/rhythmPatterns";

export function getPartInfo(
  notes: string[] | string[][],
  id: string,
  barNumber: number
): PartInfo | undefined {
  const pattern = rhythmPatterns.get(id);
  if (!pattern) return undefined;

  return {
    barNumber,
    notes,
    pattern: pattern.pattern,
    accent: pattern.accent ?? "x---",
  };
}
