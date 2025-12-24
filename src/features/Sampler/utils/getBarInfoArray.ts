import type { NoteType } from "../Data/Notes";
import { Rhythms, type RhythmSize, type RhythmType } from "../Data/Rhythms";
import type { ScaleMode } from "../Data/ScaleMode";
import type { BarInfo } from "./buildPatternBars";
import { getChordBarsFromProgression, type ChordBar } from "./progressionUtil";

export const getBarInfoFromScaleDegrees = (
  rootNote: NoteType,
  scaleMode: ScaleMode
): Array<BarInfo> => {
  const rhythm: RhythmType = Rhythms.basic;
  const rhythmSize: RhythmSize = 1;

  //TODO: ADD PROGRESSION AND RHYTHM LIBRARY
  const bars: ChordBar[] = getChordBarsFromProgression({
    note: rootNote,
    scaleMode: scaleMode,
    degrees: [
      [{ value: 1, octave: 4 }],
      [{ value: 6, octave: 4, chordType:"7th"}],
      [{ value: 4, octave: 4 }],
      [{ value: 5, octave: 4 }],
      [{ value: 1, octave: 4 }],
      [{ value: 5, octave: 4 }],
      [{ value: 6, octave: 4 }],
      [{ value: 4, octave: 4 }],
      [{ value: 2, octave: 4 }],
      [{ value: 5, octave: 4 }],
      [{ value: 1, octave: 4 }],
      [{ value: 5, octave: 4, chordType:"7th" }],
    ],
  });

  return bars
    .map((b) => {
      return {
        note: b,
        rhythm: rhythm,
        rhythmSize: rhythmSize,
      };
    })
    .flat();
};
