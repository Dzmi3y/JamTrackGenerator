import type { NoteType } from "../Data/Notes";
import type { HarmonyTraitType } from "./harmonyTraitType";
import type { RhythmTraitType } from "./rhythmTraitType";

export interface PartGenerationParams {
  rootNote: NoteType;
  isMinor: boolean;
  chordPhrasesType: HarmonyTraitType;
  rhythmPhrasesType: RhythmTraitType;
}
