import type { MusicStore, SetState } from "../types";
import { instrumentPartService } from "../../../features/Sampler/services/instrumentPartService";

export const createBpmActions = (set: SetState): Pick<MusicStore, "setBpm"> => ({
  setBpm: (newBpm) => {
    set((state) => {
      const clampedBpm = Math.max(Math.min(newBpm, 300), 1);
      if (clampedBpm === state.bpm) return state;

      const instrumentTracks = state.instrumentTracks.map((it) => ({
        ...it,
        track: instrumentPartService.getPart(
          it.instrumentType,
          it.bars,
          clampedBpm
        ),
      }));

      return { 
        bpm: clampedBpm, 
        instrumentTracks 
      };
    });
  },
});