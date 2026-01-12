import { pianoHigh, pianoHighRhythm } from "./PianoHigh";
import { pianoLow, pianoLowRhythm } from "./PianoLow";
import { drums } from "./Drums";
import type { InstrumentPatternsProps } from "../InstrumentPatternsProps";

export const Rock: InstrumentPatternsProps = {
  scaleMode: "aeolian",
  drums: drums,
  pianoHigh: pianoHigh,
  pianoHighRhythm: pianoHighRhythm,
  pianoLow: pianoLow,
  pianoLowRhythm: pianoLowRhythm,
};
