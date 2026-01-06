import type { PartResult } from "../features/Sampler/services/partBuilderService";
import type { PatternBar } from "../features/Sampler/types/patternBlock";
import type { SampleInstrument } from "../features/Sampler/types/sampleInstrument";

export interface InstrumentTrack {
  instrumentName: string;
  defaultVolume?: number;
  defaultPan?: number;
  track: PartResult | undefined;
  bars: PatternBar[] | undefined;
  instrumentType: SampleInstrument;
  id: string;
}
