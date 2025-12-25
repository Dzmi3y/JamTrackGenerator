import type { PartResult } from "../features/Sampler/services/partBuilderService";
import type { Instrument } from "./Instrument";
import type { PatternBar } from "../features/Sampler/types/patternBlock";
import type { ScaleNotesInfo } from "../features/Sampler/types/scaleNotesInfo";
import type { SampleInstrument } from "../features/Sampler/types/SampleInstrument";

export interface InstrumentTrack {
  instrument: Instrument;
  track: PartResult | undefined;
  bars: PatternBar[] | undefined;
  scaleNotesInfo: ScaleNotesInfo | undefined;
  instrumentType: SampleInstrument;
  id: string;
}
