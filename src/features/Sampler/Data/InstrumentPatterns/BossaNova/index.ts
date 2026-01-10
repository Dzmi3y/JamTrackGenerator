import type { BarInfo } from "../../../utils/buildPatternBars";
import {
  getChordBarsFromProgression,
  type ChordBar,
} from "../../../utils/progressionUtil";
import { getInterval } from "../../../utils/chordUtils";
import type { PartGenerationParams } from "../../../types/partGenerationParams";
import { pianoHigh, pianoHighRhythm } from "./PianoHigh";
import { PianoLow, pianoLowRhythm } from "./PianoLow";
import { drums } from "./Drums";

export const MinorBossaNova = () => {
  const PianoHighResult = (
    part: PartGenerationParams
  ): Array<BarInfo | null> => {
    const degres = pianoHigh;
    const rhythms = pianoHighRhythm;

    const bars: ChordBar[] = getChordBarsFromProgression({
      note: part.rootNote,
      scaleMode: "dorian",
      degrees: degres,
    });

    return bars
      .map((b, i) => {
        const currentRhythm = rhythms[i];
        if (!currentRhythm) return null;
        return {
          note: b,
          rhythm: currentRhythm.rType,
          version: currentRhythm.version,
          noteCount: currentRhythm.noteCount,
        };
      })
      .flat();
  };

  const PianoLowResult = (
    part: PartGenerationParams
  ): Array<BarInfo | null> => {
    const partInfo = PianoLow;
    const rhythms = pianoLowRhythm;

    return partInfo.flatMap((v, i) => {
      const currentRhythm = rhythms[i];
      const note = getInterval(
        part.rootNote,
        v.value,
        v.interval,
        v.octave,
        "dorian"
      );
      if (!currentRhythm) return null;
      return {
        note: [note],
        rhythm: currentRhythm.rType,
        version: currentRhythm.version,
        noteCount: currentRhythm.noteCount,
      };
    });
  };

  const DrumsResult = (): Array<BarInfo[] | null> => {
    return drums;
  };

  return { PianoHighResult, DrumsResult, PianoLowResult };
};
