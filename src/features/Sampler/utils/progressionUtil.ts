import * as scribble from "scribbletune";
import type { NoteType } from "../Data/Notes";
import type { ScaleMode } from "../Data/ScaleMode";

export type Step = {
  val: Number;
  oct: Number | undefined;
};

export const getChordsByProgression = (
  note: NoteType,
  oct: number,
  scaleMode: ScaleMode,
  steps: Step[]
) => {
  // todo add getChordByScaleStep function
  const scale: string = `${note}${oct} ${scaleMode}`;
  scribble.scale(scale);
  steps.forEach((s) => {});
};
