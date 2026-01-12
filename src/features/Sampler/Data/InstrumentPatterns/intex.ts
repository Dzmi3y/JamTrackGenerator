import type { PartGenerationParams } from "../../types/partGenerationParams";
import type { BarInfo } from "../../utils/buildPatternBars";
import { getInterval } from "../../utils/chordUtils";
import {
  getChordBarsFromProgression,
  type ChordBar,
} from "../../utils/progressionUtil";
import type { MusicalStyleType } from "./MusicalStyleType";
import { Rock } from "./Rock";
import { StyleInstrumentMap } from "./StyleInstrumentMap";

export const InstrumentPatterns = (musicalStyle: MusicalStyleType) => {
  const pattern = StyleInstrumentMap.get(musicalStyle) ?? Rock;

  const PianoHigh = (part: PartGenerationParams): Array<BarInfo | null> => {
    const degres = pattern.pianoHigh;
    const rhythms = pattern.pianoHighRhythm;

    const bars: ChordBar[] = getChordBarsFromProgression({
      note: part.rootNote,
      scaleMode: pattern.scaleMode,
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

  const PianoLow = (part: PartGenerationParams): Array<BarInfo | null> => {
    const partInfo = pattern.pianoLow;
    const rhythms = pattern.pianoLowRhythm;

    return partInfo.flatMap((v, i) => {
      const currentRhythm = rhythms[i];
      const note = getInterval(
        part.rootNote,
        v.value,
        v.interval,
        v.octave,
        pattern.scaleMode
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

  const Drums = (): Array<BarInfo[] | null> => {
    return pattern.drums;
  };

  return { PianoHigh, Drums, PianoLow };
};
