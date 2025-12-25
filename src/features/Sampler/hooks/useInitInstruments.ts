import { useEffect, useMemo, useRef } from "react";
import { instrumentPartService } from "../services/instrumentPartService";
import {
  buildDrumPatternBars,
  buildPatternBars,
} from "../utils/buildPatternBars";
import { getDrumBarInfoById } from "../patterns/drumPatterns";
import { useMusicStore } from "../../../store/musicStore";
import { useInstrument } from "./useInstrument";
//import { getBarInfoFromScaleDegrees } from "../utils/getBarInfoArray";
import { MinorBossaNova } from "../Data/InstrumentPatterns/BossaNova";

const useBpm = () => useMusicStore((state) => state.bpm);
const useAddInstrumentTrack = () =>
  useMusicStore((state) => state.addInstrumentTrack);
const useInstrumentTracks = () =>
  useMusicStore((state) => state.instrumentTracks);

export function useInitInstruments(): { isLoading: boolean } {
  const drumPart = useInstrument("drums", "Drums");
  const pianoPart = useInstrument("piano", "Piano1");
  const pianoPart2 = useInstrument("piano", "Piano2");
  const bpm = useBpm();
  const instrumentTracks = useInstrumentTracks();
  const addInstrumentTrack = useAddInstrumentTrack();
  const isInitializedRef = useRef<boolean>(false);

  const defaultPianoBars = useMemo(() => {
     const bossaPattern = MinorBossaNova();
     const barsForA = bossaPattern.PianoHigh("A");
     return buildPatternBars(barsForA);
    //return buildPatternBars(getBarInfoFromScaleDegrees("C", "ionian"));
  }, []);

  const pianoSequence = useMemo(
    () => instrumentPartService.getPart("piano", defaultPianoBars, bpm),
    [defaultPianoBars, bpm]
  );

  const defaultDrumBars = useMemo(
    () =>
      buildDrumPatternBars([
        getDrumBarInfoById("Basic_Rock_Beat"),
        getDrumBarInfoById("Grove_Basic_Rock_Beat"),
        getDrumBarInfoById("Basic_Rock_Beat"),
        getDrumBarInfoById("Grove_Basic_Rock_Beat"),
        getDrumBarInfoById("Basic_Rock_Beat"),
        getDrumBarInfoById("Grove_Basic_Rock_Beat"),
        getDrumBarInfoById("Basic_Rock_Beat"),
        getDrumBarInfoById("Grove_Basic_Rock_Beat"),
        getDrumBarInfoById("Basic_Rock_Beat"),
        getDrumBarInfoById("Grove_Basic_Rock_Beat"),
        getDrumBarInfoById("Basic_Rock_Beat"),
        getDrumBarInfoById("Grove_Basic_Rock_Beat"),
      ]),
    []
  );

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
    });
    addInstrumentTrack({
      instrument: pianoPart,
      track: pianoSequence,
      bars: defaultPianoBars,
      scaleNotesInfo: undefined, // TODO: REMOVE
    });
    addInstrumentTrack({
      instrument: pianoPart2,
      track: pianoSequence,
      bars: defaultPianoBars,
      scaleNotesInfo: undefined,
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
  ]);

  return {
    isLoading,
  };
}
