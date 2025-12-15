import type { SampleInstrument } from "../features/Sampler/types/SampleInstrument";
import type { PartResult } from "../features/Sampler/services/partBuilderService";
import type { Instrument } from "./Instrument";

export interface InstrumentTrack {
  instrumentName: SampleInstrument;
  instrument: Instrument;
  track: PartResult | undefined;
  id: string;
}
