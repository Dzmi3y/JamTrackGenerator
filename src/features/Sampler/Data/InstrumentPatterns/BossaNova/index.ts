import type { BarInfo } from "../../../utils/buildPatternBars";
import {
  getChordBarsFromProgression,
  type ChordBar,
} from "../../../utils/progressionUtil";
import { getInterval } from "../../../utils/chordUtils";
import type { PartGenerationParams } from "../../../types/partGenerationParams";
import { pianoHigh, pianoHighRhythm } from "./PianoHigh";
import { PianoLow } from "./PianoLow";
import type { RhythmInfo } from "../../Rhythms";
import type { RhythmTraitType } from "../../../types/rhythmTraitType";
import { drums } from "./Drums";

export const MinorBossaNova = () => {
  const defaultRhythm: RhythmInfo = {
    noteCount: 1,
    rType: "basic",
    version: 1,
  };

  const PianoHighResult = (part: PartGenerationParams): Array<BarInfo> => {
    const degres = pianoHigh.get(part.chordPhrasesType) ?? [];
    const rhythms = pianoHighRhythm.get(part.rhythmPhrasesType) ?? [];

    const bars: ChordBar[] = getChordBarsFromProgression({
      note: part.rootNote,
      scaleMode: "dorian",
      degrees: degres,
    });

    return bars
      .map((b, i) => {
        const currentRhythm = rhythms[i];
        if (currentRhythm) {
          return {
            note: b,
            rhythm: currentRhythm.rType,
            version: currentRhythm.version,
            noteCount: currentRhythm.noteCount,
          };
        } else {
          return {
            note: b,
            rhythm: defaultRhythm.rType,
            version: defaultRhythm.version,
            noteCount: defaultRhythm.noteCount,
          };
        }
      })
      .flat();
  };

  const PianoLowResult = (part: PartGenerationParams): Array<BarInfo> => {
    const partInfo = PianoLow.get(part.chordPhrasesType) ?? [];
    const rhythms = pianoHighRhythm.get(part.rhythmPhrasesType) ?? [];

    return partInfo.flatMap((v, i) => {
      const currentRhythm = rhythms[i];
      const note = getInterval(
        part.rootNote,
        v.value,
        v.interval,
        v.octave,
        "dorian"
      );
      if (currentRhythm) {
        return {
          note: [note],
          rhythm: currentRhythm.rType,
          version: currentRhythm.version,
          noteCount: currentRhythm.noteCount,
        };
      } else {
        return {
          note: [note],
          rhythm: defaultRhythm.rType,
          version: defaultRhythm.version,
          noteCount: defaultRhythm.noteCount,
        };
      }
    });
  };

  const DrumsResult = (
    rhythmPhraseType: RhythmTraitType
  ): Array<BarInfo[] | null> => {
    return drums.get(rhythmPhraseType) ?? [];
  };

  return { PianoHighResult, DrumsResult, PianoLowResult };
};
