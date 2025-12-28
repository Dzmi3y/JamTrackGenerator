import type { PartResult } from "../features/Sampler/services/partBuilderService";
import type { Instrument } from "./Instrument";
import type { PatternBar } from "../features/Sampler/types/patternBlock";
import type { SampleInstrument } from "../features/Sampler/types/SampleInstrument";

export interface InstrumentTrack {
  instrument: Instrument;
  track: PartResult | undefined;
  bars: PatternBar[] | undefined;
  instrumentType: SampleInstrument;
  id: string;
}
