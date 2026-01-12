import type { BarInfo } from "../../utils/buildPatternBars";
import type { Degree } from "../../utils/progressionUtil";
import type { RhythmInfo } from "../Rhythms";
import type { ScaleMode } from "../ScaleMode";

export interface InstrumentPatternsProps {
  pianoHigh: (Degree[] | undefined)[];
  pianoHighRhythm: (RhythmInfo | null)[];
  pianoLow: {
    value: number;
    octave: number;
    interval: number;
  }[];
  pianoLowRhythm: (RhythmInfo | null)[];
  drums: (BarInfo[] | null)[];
  scaleMode: ScaleMode;
}