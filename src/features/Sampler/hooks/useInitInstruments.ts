import { useEffect, useMemo, useRef } from "react";
import { Rhythms } from "../Data/Rhythms";
import { instrumentPartService } from "../services/instrumentPartService";
import {
  buildDrumPatternBars,
  buildPatternBars,
} from "../utils/buildPatternBars";
import { getDrumBarInfoById } from "../patterns/drumPatterns";
import { getChordsByProgression } from "../utils/progressionUtil";
import { useMusicStore } from "../../../store/musicStore";
import { useInstrument } from "./useInstrument";

const useBpm = () => useMusicStore((state) => state.bpm);
const useAddInstrumentTrack = () =>
  useMusicStore((state) => state.addInstrumentTrack);
const useInstrumentTracks = () =>
  useMusicStore((state) => state.instrumentTracks);

export function useInitInstruments(): { isLoading: boolean } {
  const drumPart = useInstrument("drums");
  const pianoPart = useInstrument("piano");
  const bpm = useBpm();
  const instrumentTracks = useInstrumentTracks();
  const addInstrumentTrack = useAddInstrumentTrack();
  const isInitializedRef = useRef<boolean>(false);

  const defaultPianoNotes = useMemo(
    () =>
      getChordsByProgression("C", "ionian", [
        { val: 2, oct: 4 },
        { val: 5, oct: 4 },
        { val: 1, oct: 4 },
        { val: 4, oct: 4 },
      ]),
    []
  );

  const defaultPianoBars = useMemo(
    () =>
      buildPatternBars([
        {
          note: defaultPianoNotes,
          rhythm: Rhythms.basic,
          rhythmSize: 4,
        },
      ]),
    [defaultPianoNotes]
  );

  const pianoSequence = useMemo(
    () => instrumentPartService.getInstrumentPart(defaultPianoBars, bpm),

    [defaultPianoBars, bpm]
  );

  const defaultDrumBars = useMemo(
    () => buildDrumPatternBars([getDrumBarInfoById("Basic_Rock_Beat")]),
    []
  );

  const drumSequence = useMemo(
    () => instrumentPartService.getDrumPart(defaultDrumBars, bpm),
    [defaultDrumBars, bpm]
  );

  const isLoading = useMemo(
    () => drumPart.isLoading && pianoPart.isLoading,
    [drumPart.isLoading, pianoPart.isLoading]
  );

  useEffect(() => {
    if (isInitializedRef.current) return;

    isInitializedRef.current = true;
    
    addInstrumentTrack({
      instrument: drumPart,
      instrumentName: "drums",
      track: drumSequence,
    });
    addInstrumentTrack({
      instrument: pianoPart,
      instrumentName: "piano",
      track: pianoSequence,
    });

   
  }, [
    addInstrumentTrack,
    drumPart,
    pianoPart,
    instrumentTracks,
    drumSequence,
    pianoSequence,
  ]);

  return {
    isLoading,
  };
}
