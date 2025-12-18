import type { MusicStore, SetState } from "../types";
import type { PatternBar } from "../../../features/Sampler/types/patternBlock";
import { instrumentPartService } from "../../../features/Sampler/services/instrumentPartService";
import type { ScaleNotesInfo } from "../../../features/Sampler/types/scaleNotesInfo";

export const createTrackActions = (
  set: SetState
): Pick<
  MusicStore,
  | "updateInstrumentTrackBars"
  | "setInstrumentTracks"
  | "addInstrumentTrack"
  | "updateInstrumentTrack"
  | "removeInstrumentTrack"
  | "clearInstrumentTracks"
> => ({
  updateInstrumentTrackBars: (
    id: string,
    newBars: PatternBar[],
    scaleNotesInfo?: ScaleNotesInfo
  ) => {
    set((state) => {
      if (!id) return state;

      const instrumentTracks = state.instrumentTracks.map((it) => {
        if (it.id !== id) return it;

        return {
          ...it,
          bars: newBars,
          scaleNotesInfo: scaleNotesInfo,
          track: instrumentPartService.getPart(
            it.instrumentName,
            newBars,
            state.bpm
          ),
        };
      });

      return { instrumentTracks };
    });
  },

  setInstrumentTracks: (instrumentTracks) => set({ instrumentTracks }),

  addInstrumentTrack: (instrumentTrack) => {
    set((state) => {
      const id = crypto.randomUUID();
      return {
        instrumentTracks: [
          ...state.instrumentTracks,
          { ...instrumentTrack, id },
        ],
      };
    });
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
});
