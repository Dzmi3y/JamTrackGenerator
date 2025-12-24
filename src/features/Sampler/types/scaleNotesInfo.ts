import type { NoteType } from "../Data/Notes";
import type { ScaleMode } from "../Data/ScaleMode";
import type { Degree } from "../utils/progressionUtil";

export interface ScaleNotesInfo {
  note: NoteType;
  scaleMode: ScaleMode;
  degrees: (Degree[] | undefined)[];
}
