import { pianoHigh, pianoHighRhythm } from "./PianoHigh";
import { PianoLow, pianoLowRhythm } from "./PianoLow";
import { drums } from "./Drums";
import type { InstrumentPatternsProps } from "../InstrumentPatternsProps";

export const Blues: InstrumentPatternsProps = {
  scaleMode: "ionian",
  drums: drums,
  pianoHigh: pianoHigh,
  pianoHighRhythm: pianoHighRhythm,
  pianoLow: PianoLow,
  pianoLowRhythm: pianoLowRhythm,
};
