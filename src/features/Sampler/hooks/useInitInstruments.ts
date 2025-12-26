import { useEffect, useMemo, useRef } from "react";
import { instrumentPartService } from "../services/instrumentPartService";
import {
  buildDrumPatternBars,
  buildPatternBars,
} from "../utils/buildPatternBars";
import { useMusicStore } from "../../../store/musicStore";
import { useInstrument } from "./useInstrument";
import { MinorBossaNova } from "../Data/InstrumentPatterns/BossaNova";

const useBpm = () => useMusicStore((state) => state.bpm);
const useAddInstrumentTrack = () =>
  useMusicStore((state) => state.addInstrumentTrack);
const useInstrumentTracks = () =>
  useMusicStore((state) => state.instrumentTracks);

export function useInitInstruments(): { isLoading: boolean } {
  const drumPart = useInstrument("drums", "Drums");
  const pianoPart = useInstrument("piano", "Piano High", 80, 30);
  const pianoPart2 = useInstrument("piano", "Piano Low", 70, -30);
  const bpm = useBpm();
  const instrumentTracks = useInstrumentTracks();
  const addInstrumentTrack = useAddInstrumentTrack();
  const isInitializedRef = useRef<boolean>(false);

  const defaultPianoBars = useMemo(() => {
    const bossaPattern = MinorBossaNova();
    const barsForA = bossaPattern.PianoHigh("A");
    return buildPatternBars(barsForA);
  }, []);

  const defaultLowPianoBars = useMemo(() => {
    const bossaPattern = MinorBossaNova();
    const barsForA = bossaPattern.PianoLow("A");
    return buildPatternBars(barsForA);
  }, []);

  const pianoSequence = useMemo(
    () => instrumentPartService.getPart("piano", defaultPianoBars, bpm),
    [defaultPianoBars, bpm]
  );

  const lowpianoSequence = useMemo(
    () => instrumentPartService.getPart("piano", defaultLowPianoBars, bpm),
    [defaultLowPianoBars, bpm]
  );

  const defaultDrumBars = useMemo(() => {
    const bossaPattern = MinorBossaNova();
    const bars = bossaPattern.Drums();
    return buildDrumPatternBars(bars);
  }, []);

  const drumSequence = useMemo(
    () => instrumentPartService.getPart("drums", defaultDrumBars, bpm),
    [defaultDrumBars, bpm]
  );

  const isLoading = useMemo(
    () =>
      drumPart.getIsLoading() &&
      pianoPart.getIsLoading() &&
      pianoPart2.getIsLoading(),
    [drumPart, pianoPart, pianoPart2]
  );

  useEffect(() => {
    if (instrumentTracks.length > 0) return;
    if (isInitializedRef.current) return;

    isInitializedRef.current = true;

    addInstrumentTrack({
      instrument: drumPart,
      track: drumSequence,
      bars: defaultDrumBars,
      scaleNotesInfo: undefined,
      instrumentType: "drums",
    });
    addInstrumentTrack({
      instrument: pianoPart,
      track: pianoSequence,
      bars: defaultPianoBars,
      scaleNotesInfo: undefined, // TODO: REMOVE
      instrumentType: "piano",
    });
    addInstrumentTrack({
      instrument: pianoPart2,
      track: lowpianoSequence,
      bars: defaultLowPianoBars,
      scaleNotesInfo: undefined,
      instrumentType: "piano",
    });
  }, [
    addInstrumentTrack,
    drumPart,
    pianoPart,
    pianoPart2,
    instrumentTracks,
    drumSequence,
    pianoSequence,
    defaultPianoBars,
    defaultDrumBars,
    lowpianoSequence,
    defaultLowPianoBars,
  ]);

  return {
    isLoading,
  };
}
