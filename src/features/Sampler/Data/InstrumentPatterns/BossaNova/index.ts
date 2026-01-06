import type { BarInfo } from "../../../utils/buildPatternBars";
import {
  getChordBarsFromProgression,
  type ChordBar,
} from "../../../utils/progressionUtil";
import { getDrumBarInfoById } from "../../patterns/drumPatterns";
import { getInterval } from "../../../utils/chordUtils";
import { Rhythms } from "../../Rhythms";
import type { PartGenerationParams } from "../../../types/partGenerationParams";
import { pianoHigh } from "./PianoHigh";
import { PianoLow } from "./PianoLow";

export const MinorBossaNova = () => {
  const PianoHighResult = (part: PartGenerationParams): Array<BarInfo> => {
    const bars: ChordBar[] = getChordBarsFromProgression({
      note: part.rootNote,
      scaleMode: "dorian",
      degrees: [
        ...(pianoHigh.get(part.chordPhrasesTypes[0]) ?? [
          undefined,
          undefined,
          undefined,
        ]),
        ...(pianoHigh.get(part.chordPhrasesTypes[1]) ?? [
          undefined,
          undefined,
          undefined,
        ]),
        ...(pianoHigh.get(part.chordPhrasesTypes[2]) ?? [
          undefined,
          undefined,
          undefined,
        ]),
      ],
    });

    return bars
      .map((b, i) => {
        if (i % 2 === 0) {
          return {
            note: b,
            rhythm: Rhythms.bossanova,
            version: 1,
            noteCount: 4,
          };
        } else {
          return {
            note: b,
            rhythm: Rhythms.bossanova,
            version: 2,
            noteCount: 3,
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

    return partInfo.flatMap((v, i) => {
      return {
        note: [
          getInterval(part.rootNote, v.value, v.interval, v.octave, "dorian"),
        ],
        rhythm: i % 2 === 0 ? "bossanova" : "basic",
        version: i % 2 === 0 ? 4 : 1,
        noteCount: i % 2 === 0 ? 2 : 1,
      };
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
