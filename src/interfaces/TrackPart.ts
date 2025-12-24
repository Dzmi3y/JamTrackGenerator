import type { PartResult } from "../features/Sampler/services/partBuilderService";
import type { Instrument } from "./Instrument";
import type { PatternBar } from "../features/Sampler/types/patternBlock";
import type { ScaleNotesInfo } from "../features/Sampler/types/scaleNotesInfo";

export interface InstrumentTrack {
  instrument: Instrument;
  track: PartResult | undefined;
  bars: PatternBar[] | undefined;
  scaleNotesInfo: ScaleNotesInfo | undefined;
  
  id: string;
}
