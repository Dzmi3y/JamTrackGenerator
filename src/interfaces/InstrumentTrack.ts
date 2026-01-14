import type { PartResult } from "../features/Sampler/services/partBuilderService";
import type { PatternBar } from "../features/Sampler/types/patternBlock";
import type { SampleInstrument } from "../features/Sampler/types/sampleInstrument";

export type InstrumentTrackNames = "Drums" | "Piano High" | "Piano Low";
export interface InstrumentTrack {
  instrumentName: InstrumentTrackNames;
  defaultVolume?: number;
  defaultPan?: number;
  track: PartResult | undefined;
  bars: PatternBar[] | undefined;
  instrumentType: SampleInstrument;
  id: string;
}
