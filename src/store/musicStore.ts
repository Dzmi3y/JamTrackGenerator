import { create } from "zustand"
import type { MusicState, MusicStore } from "./types"
import { persist } from "zustand/middleware"


// Начальное состояние
const initialState: MusicState = {
  bpm: 120,
  parts: []
}

export const useMusicStore = create<MusicStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setBpm: (bpm) => set({ bpm }),
      
      setParts: (parts) => set({ parts }),
      
      addPart: (newPart) => {
        const id = crypto.randomUUID()
        set((state) => ({
          parts: [...state.parts, { ...newPart, id }]
        }))
      },
      
      updatePart: (id, updates) => {
        set((state) => ({
          parts: state.parts.map(part =>
            part.id === id ? { ...part, ...updates } : part
          )
        }))
      },
      
      removePart: (id) => {
        set((state) => ({
          parts: state.parts.filter(part => part.id !== id)
        }))
      },
      
      clearParts: () => set({ parts: [] })
    }),
    {
      name: 'music-storage',
      partialize: (state) => ({
        bpm: state.bpm,
        parts: state.parts
      })
    }
  )
)