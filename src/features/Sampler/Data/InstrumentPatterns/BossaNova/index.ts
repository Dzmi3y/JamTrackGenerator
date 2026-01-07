import type { BarInfo } from "../../../utils/buildPatternBars";
import {
  getChordBarsFromProgression,
  type ChordBar,
} from "../../../utils/progressionUtil";
import { getDrumBarInfoById } from "../../patterns/drumPatterns";
import { getInterval } from "../../../utils/chordUtils";
import type { PartGenerationParams } from "../../../types/partGenerationParams";
import { pianoHigh, pianoHighRhythm } from "./PianoHigh";
import { PianoLow } from "./PianoLow";
import type { RhythmInfo } from "../../Rhythms";

export const MinorBossaNova = () => {

  const defaultRhythm: RhythmInfo = {
    noteCount: 1,
    rType: "basic",
    version: 1,
  };

  const PianoHighResult = (part: PartGenerationParams): Array<BarInfo> => {
    const degres = part.chordPhrasesTypes
      .map((t) => pianoHigh.get(t) ?? [undefined, undefined, undefined])
      .flat();

    const rhythms = part.rhythmPhrasesTypes
      .map((t) => pianoHighRhythm.get(t))
      .flat();

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
    const partInfo = [
      ...(PianoLow.get(part.chordPhrasesTypes[0]) ?? []),
      ...(PianoLow.get(part.chordPhrasesTypes[1]) ?? []),
      ...(PianoLow.get(part.chordPhrasesTypes[2]) ?? []),
    ];

     const rhythms = part.rhythmPhrasesTypes
      .map((t) => pianoHighRhythm.get(t))
      .flat();

    return partInfo.flatMap((v, i) => {
      const currentRhythm = rhythms[i];
      const note = getInterval(part.rootNote, v.value, v.interval, v.octave, "dorian");
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

  const Drums = (): Array<BarInfo[] | null> => {
    const BARS_COUNT = 12;
    const evenBar = getDrumBarInfoById("Bossanova_part1");
    const oddBar = getDrumBarInfoById("Bossanova_part2");

    return Array.from({ length: BARS_COUNT }, (_, i) =>
      i % 2 === 0 ? evenBar : oddBar
    );
  };

  return { PianoHighResult, Drums, PianoLowResult };
};
