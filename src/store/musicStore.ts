import { create } from "zustand";
import type { MusicState, MusicStore } from "./types";
import { persist } from "zustand/middleware";

const initialState: MusicState = {
  bpm: 120,
  timeSignature: [4, 4],
  instrumentTracks: [],
};

export const useMusicStore = create<MusicStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setBpm: (newBpm) => {
        const currentBpm = get().bpm;
        if (newBpm !== currentBpm) {
          const clampedBpm = Math.max(Math.min(newBpm, 300), 0);
          set({ bpm: clampedBpm });
        }
      },
      setTimeSignature: (newTimeSignature: [number, number]) => {
        const currentTimeSignature = get().timeSignature;
        if (newTimeSignature !== currentTimeSignature) {
          set({ timeSignature: newTimeSignature });
        }
      },

      setInstrumentTracks: (instrumentTracks) => set({ instrumentTracks }),

      addInstrumentTrack: (instrumentTrack) => {
        const id = crypto.randomUUID();
        set((state) => ({
          instrumentTracks: [
            ...state.instrumentTracks,
            { ...instrumentTrack, id },
          ],
        }));
      },

      updateInstrumentTrack: (id, updates) => {
        set((state) => ({
          instrumentTracks: state.instrumentTracks.map((instrumentTrack) =>
            instrumentTrack.id === id
              ? { ...instrumentTrack, ...updates }
              : instrumentTrack
          ),
        }));
      },

      removeInstrumentTrack: (id) => {
        set((state) => ({
          instrumentTracks: state.instrumentTracks.filter(
            (instrumentTrack) => instrumentTrack.id !== id
          ),
        }));
      },

      clearInstrumentTracks: () => set({ instrumentTracks: [] }),
    }),
    {
      name: "music-storage",
      partialize: (state) => ({
        bpm: state.bpm,
        parts: state.instrumentTracks,
      }),
    }
  )
);
