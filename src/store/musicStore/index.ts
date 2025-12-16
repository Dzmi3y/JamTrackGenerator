import { createMusicStore } from "./store";

export const useMusicStore = createMusicStore();

export const useBpm = () => useMusicStore((state) => state.bpm);
export const useTimeSignature = () => useMusicStore((state) => state.timeSignature);
export const useInstrumentTracks = () => useMusicStore((state) => state.instrumentTracks);
export const useInstrumentTrack = (id: string) =>
  useMusicStore((state) => 
    state.instrumentTracks.find((it) => it.id === id)
  );