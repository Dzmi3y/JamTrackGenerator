import type { TrackPart } from "../interfaces/TrackPart";

export interface MusicState {
  bpm: number;
  parts: TrackPart[];
}

export interface MusicActions {
  setBpm: (bpm: number) => void;
  setParts: (parts: TrackPart[]) => void;
  addPart: (part: Omit<TrackPart, "id">) => void;
  updatePart: (id: string, updates: Partial<TrackPart>) => void;
  removePart: (id: string) => void;
  clearParts: () => void;
}

export type MusicStore = MusicState & MusicActions;
