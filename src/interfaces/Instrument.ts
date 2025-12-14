import type { PartResult } from "../features/Sampler/services/partBuilderService";

export interface Instrument {
  playPart: (partResult: PartResult | undefined, isLoop?: boolean) => void;
  getIsLoading: () => boolean;
  getVolume: () => number;
  getPan: () => number;
  setVolume: (value: number) => void;
  setPan: (value: number) => void;
}
