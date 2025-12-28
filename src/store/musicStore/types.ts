import type { StoreApi } from "zustand";
import type { PatternBar } from "../../features/Sampler/types/patternBlock";
import type { InstrumentTrack } from "../../interfaces/InstrumentTrack";
import type { ScaleNotesInfo } from "../../features/Sampler/types/scaleNotesInfo";

export interface MusicState {
  bpm: number;
  timeSignature: [number, number];
  instrumentTracks: InstrumentTrack[];
}

export interface MusicStore extends MusicState {
  setBpm: (newBpm: number) => void;
  setTimeSignature: (newTimeSignature: [number, number]) => void;
  updateInstrumentTrackBars: (id: string, newBars: PatternBar[],scaleNotesInfo?:ScaleNotesInfo) => void;
  setInstrumentTracks: (instrumentTracks: InstrumentTrack[]) => void;
  addInstrumentTrack: (instrumentTrack: Omit<InstrumentTrack, "id">) => void;
  updateInstrumentTrack: (id: string, updates: Partial<Omit<InstrumentTrack, "id">>) => void;
  removeInstrumentTrack: (id: string) => void;
  clearInstrumentTracks: () => void;
}

export type SetState = StoreApi<MusicStore>["setState"];
export type GetState = StoreApi<MusicStore>["getState"];