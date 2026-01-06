import { useEffect, useMemo, useRef } from "react";
import { instrumentPartService } from "../services/instrumentPartService";
import {
  buildDrumPatternBars,
  buildPatternBars,
} from "../utils/buildPatternBars";
import { useMusicStore } from "../../../store/musicStore";
import { MinorBossaNova } from "../Data/InstrumentPatterns/BossaNova";
import type { PartGenerationParams } from "../types/partGenerationParams";

const useBpm = () => useMusicStore((state) => state.bpm);
const useAddInstrumentTrack = () =>
  useMusicStore((state) => state.addInstrumentTrack);
const useInstrumentTracks = () =>
  useMusicStore((state) => state.instrumentTracks);

export function useInitInstruments() {
  const bpm = useBpm();
  const instrumentTracks = useInstrumentTracks();
  const addInstrumentTrack = useAddInstrumentTrack();
  const isInitializedRef = useRef<boolean>(false);

  const defaultPianoBars = useMemo(() => {
    const bossaPattern = MinorBossaNova();
    const part: PartGenerationParams = {
      isMinor: true,
      rootNote: "A",
      chordPhrasesTypes: ["simple", "calm", "tense"],
      rhythmPhrasesTypes: ["simple", "simple", "simple"],
    };
    const barsForA = bossaPattern.PianoHighResult(part);
    return buildPatternBars(barsForA);
  }, []);

  const defaultLowPianoBars = useMemo(() => {
    const bossaPattern = MinorBossaNova();
    const part: PartGenerationParams = {
      isMinor: true,
      rootNote: "A",
      chordPhrasesTypes: ["simple", "calm", "tense"],
      rhythmPhrasesTypes: ["simple", "simple", "simple"],
    };
    const barsForA = bossaPattern.PianoLowResult(part);
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

  useEffect(() => {
    if (instrumentTracks.length > 0) return;
    if (isInitializedRef.current) return;

    isInitializedRef.current = true;

    addInstrumentTrack({
      instrumentName: "Drums",
      defaultPan: 0,
      defaultVolume: 100,
      track: drumSequence,
      bars: defaultDrumBars,
      instrumentType: "drums",
    });
    addInstrumentTrack({
      instrumentName: "Piano High",
      defaultPan: 30,
      defaultVolume: 80,
      track: pianoSequence,
      bars: defaultPianoBars,
      instrumentType: "piano",
    });
    addInstrumentTrack({
      instrumentName: "Piano Low",
      defaultPan: -30,
      defaultVolume: 70,
      track: lowpianoSequence,
      bars: defaultLowPianoBars,
      instrumentType: "piano",
    });
  }, [
    addInstrumentTrack,
    instrumentTracks,
    drumSequence,
    pianoSequence,
    defaultPianoBars,
    defaultDrumBars,
    lowpianoSequence,
    defaultLowPianoBars,
  ]);
}
