import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createActions } from "./actions";
import type { MusicState, MusicStore } from "./types";

const initialState: MusicState = {
  bpm: 120,
  timeSignature: [4, 4],
  instrumentTracks: [],
};

export const createMusicStore = () =>
  create<MusicStore>()(
    persist(
      (set) => ({
        ...initialState,
        ...createActions(set),
      }),
      {
        name: "music-storage",
        partialize: (state) => ({
          bpm: state.bpm,
          instrumentTracks: state.instrumentTracks,
          timeSignature: state.timeSignature,
        }),
      }
    )
  );
