import type { NoteType } from "../Data/Notes";
import type { HarmonyTraitType } from "./harmonyTraitType";
import type { RhythmTraitType } from "./rhythmTraitType";


export interface PartGenerationParams {
  rootNote: NoteType;
  isMinor: boolean;
  chordPhrasesTypes: [HarmonyTraitType, HarmonyTraitType, HarmonyTraitType];
  rhythmPhrasesTypes: [RhythmTraitType, RhythmTraitType, RhythmTraitType];
}
