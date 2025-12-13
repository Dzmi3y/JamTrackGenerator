import { create } from "zustand";
import type { MusicState, MusicStore } from "./types";
import { persist } from "zustand/middleware";

const initialState: MusicState = {
  bpm: 120,
  parts: [],
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

      setParts: (parts) => set({ parts }),

      addPart: (newPart) => {
        const id = crypto.randomUUID();
        set((state) => ({
          parts: [...state.parts, { ...newPart, id }],
        }));
      },

      updatePart: (id, updates) => {
        set((state) => ({
          parts: state.parts.map((part) =>
            part.id === id ? { ...part, ...updates } : part
          ),
        }));
      },

      removePart: (id) => {
        set((state) => ({
          parts: state.parts.filter((part) => part.id !== id),
        }));
      },

      clearParts: () => set({ parts: [] }),
    }),
    {
      name: "music-storage",
      partialize: (state) => ({
        bpm: state.bpm,
        parts: state.parts,
      }),
    }
  )
);
