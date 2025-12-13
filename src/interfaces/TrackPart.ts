import type { SampleInstrument } from "../features/Sampler/SampleInstrument";
import type { PartResult } from "../features/Sampler/services/partBuilderService";

export interface TrackPart {
  instrument: SampleInstrument;
  part: PartResult | undefined;
  gain: number;
  pan: number;
  isHidden: boolean;
  id: string;
}
