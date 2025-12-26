import type { BarInfo } from "../../utils/buildPatternBars";
import {
  getChordBarsFromProgression,
  type ChordBar,
} from "../../utils/progressionUtil";
import type { NoteType } from "../Notes";
import { Rhythms, type RhythmSize, type RhythmType } from "../Rhythms";
import { getDrumBarInfoById } from "../../patterns/drumPatterns";
import { getInterval } from "../../utils/chordUtils";

export const MinorBossaNova = () => {
  const PianoHigh = (rootNote: NoteType): Array<BarInfo> => {
    const bars: ChordBar[] = getChordBarsFromProgression({
      note: rootNote,
      scaleMode: "dorian",
      degrees: [
        [{ value: 1, octave: 4, concreteChordType: "m7" }],
        [{ value: 1, octave: 4, concreteChordType: "m7" }],
        [{ value: 4, octave: 4, concreteChordType: "m7" }],
        [{ value: 5, octave: 4, concreteChordType: "7th" }],

        [{ value: 1, octave: 4, concreteChordType: "m7" }],
        [{ value: 1, octave: 4, concreteChordType: "m7" }],
        [{ value: 2, octave: 4, concreteChordType: "m7b5" }],
        [{ value: 5, octave: 4, concreteChordType: "7b9" }],

        [{ value: 4, octave: 4, concreteChordType: "m7" }],
        [{ value: 2, octave: 4, concreteChordType: "m7b5" }],
        [{ value: 5, octave: 4, concreteChordType: "7b9" }],
        [{ value: 5, octave: 4, concreteChordType: "7th" }],
      ],
    });

    return bars
      .map((b, i) => {
        const rhythm: RhythmType =
          i % 2 === 0 ? Rhythms.bossanovaRH1 : Rhythms.bossanovaRH2;
        const rhythmSize: RhythmSize = 4;
        return {
          note: b,
          rhythm: rhythm,
          rhythmSize: rhythmSize,
        };
      })
      .flat();
  };

  const PianoLow = (rootNote: NoteType): Array<BarInfo> => {
    return [
      {
        note: [getInterval(rootNote, 1, 8, 2, "dorian")],
        rhythm: "bossanovaLH2",
        rhythmSize: 4,
      },
      {
        note: [getInterval(rootNote, 1, 8, 2, "dorian")],
        rhythm: "basic",
        rhythmSize: 1,
      },
      {
        note: [getInterval(rootNote, 4, 8, 2, "dorian")],
        rhythm: "bossanovaLH2",
        rhythmSize: 4,
      },
      {
        note: [getInterval(rootNote, 5, 8, 2, "dorian")],
        rhythm: "basic",
        rhythmSize: 1,
      },

      {
        note: [getInterval(rootNote, 1, 8, 2, "dorian")],
        rhythm: "bossanovaLH2",
        rhythmSize: 4,
      },
      {
        note: [getInterval(rootNote, 1, 8, 2, "dorian")],
        rhythm: "basic",
        rhythmSize: 1,
      },
      {
        note: [getInterval(rootNote, 2, 8, 2, "dorian")],
        rhythm: "bossanovaLH2",
        rhythmSize: 4,
      },
      {
        note: [getInterval(rootNote, 5, 8, 2, "dorian")],
        rhythm: "basic",
        rhythmSize: 1,
      },

      {
        note: [getInterval(rootNote, 4, 8, 2, "dorian")],
        rhythm: "bossanovaLH2",
        rhythmSize: 4,
      },
      {
        note: [getInterval(rootNote, 2, 8, 2, "dorian")],
        rhythm: "basic",
        rhythmSize: 1,
      },
      {
        note: [getInterval(rootNote, 5, 8, 2, "dorian")],
        rhythm: "bossanovaLH2",
        rhythmSize: 4,
      },
      {
        note: [getInterval(rootNote, 5, 8, 2, "dorian")],
        rhythm: "basic",
        rhythmSize: 1,
      },
    ];
  };

  const Drums = (): Array<BarInfo[] | null> => {
    const BARS_COUNT = 12;
    const evenBar = getDrumBarInfoById("Bossanova_part1");
    const oddBar = getDrumBarInfoById("Bossanova_part2");

    return Array.from({ length: BARS_COUNT }, (_, i) =>
      i % 2 === 0 ? evenBar : oddBar
    );
  };

  return { PianoHigh, Drums, PianoLow };
};
