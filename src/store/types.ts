import type { InstrumentTrack } from "../interfaces/TrackPart";

export interface MusicState {
  bpm: number;
  timeSignature: [number, number];
  instrumentTracks: InstrumentTrack[];
}

export interface MusicActions {
  setBpm: (bpm: number) => void;
  setInstrumentTracks: (parts: InstrumentTrack[]) => void;
  addInstrumentTrack: (part: Omit<InstrumentTrack, "id">) => void;
  updateInstrumentTrack: (
    id: string,
    updates: Partial<InstrumentTrack>
  ) => void;
  removeInstrumentTrack: (id: string) => void;
  clearInstrumentTracks: () => void;
}

export type MusicStore = MusicState & MusicActions;
