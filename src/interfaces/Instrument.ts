import type { PartResult } from "../features/Sampler/services/partBuilderService";

export interface Instrument {
  id: string;
  getName: () => string;
  setName: (newValue: string) => void;
  getVolume: () => number;
  setVolume: (newValue: number) => void;
  getPan: () => number;
  setPan: (newValue: number) => void;
  playPart: (partResult: PartResult | undefined, isLoop?: boolean) => void;
  stopAll: () => void;
  dispose: () => void;
}
