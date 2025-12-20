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
import type { ScaleNotesInfo } from "../types/scaleNotesInfo";

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

  const pianoScaleNotesInfo = useMemo((): ScaleNotesInfo => {
    return {
      note: "C",
      scaleMode: "ionian",
      degrees: [
        { val: 2, oct: 4 },
        { val: 5, oct: 4 },
        { val: 1, oct: 4 },
        { val: 4, oct: 4 },
      ],
    };
  }, []);

  // const defaultPianoNotes = useMemo(
  //   () => getChordsByProgression(pianoScaleNotesInfo),
  //   [pianoScaleNotesInfo]
  // );

  const defaultPianoBars = useMemo(
    () =>
      buildPatternBars([
        {
          note: getChordsByProgression({
            note: "C",
            scaleMode: "ionian",
            degrees: [{ val: 1, oct: 4 }],
            
          }),
          rhythm: Rhythms.basic,
          rhythmSize: 1,
          
        },
        {
          note: getChordsByProgression({
            note: "C",
            scaleMode: "ionian",
            degrees: [{ val: 6, oct: 4 }],
          }),
          rhythm: Rhythms.basic,
          rhythmSize: 1,
        },
        {
          note: getChordsByProgression({
            note: "C",
            scaleMode: "ionian",
            degrees: [{ val: 4, oct: 4 }],
          }),
          rhythm: Rhythms.basic,
          rhythmSize: 1,
        },
        {
          note: getChordsByProgression({
            note: "C",
            scaleMode: "ionian",
            degrees: [{ val: 5, oct: 4 }],
          }),
          rhythm: Rhythms.basic,
          rhythmSize: 1,
        },
        {
          note: getChordsByProgression({
            note: "C",
            scaleMode: "ionian",
            degrees: [{ val: 1, oct: 4 }],
          }),
          rhythm: Rhythms.basic,
          rhythmSize: 1,
        },
        {
          note: getChordsByProgression({
            note: "C",
            scaleMode: "ionian",
            degrees: [{ val: 5, oct: 4 }],
          }),
          rhythm: Rhythms.basic,
          rhythmSize: 1,
        },
        {
          note: getChordsByProgression({
            note: "C",
            scaleMode: "ionian",
            degrees: [{ val: 6, oct: 4 }],
          }),
          rhythm: Rhythms.basic,
          rhythmSize: 1,
        },
        {
          note: getChordsByProgression({
            note: "C",
            scaleMode: "ionian",
            degrees: [{ val: 4, oct: 4 }],
          }),
          rhythm: Rhythms.basic,
          rhythmSize: 1,
        },
        {
          note: getChordsByProgression({
            note: "C",
            scaleMode: "ionian",
            degrees: [{ val: 2, oct: 4 }],
          }),
          rhythm: Rhythms.basic,
          rhythmSize: 1,
        },
        {
          note: getChordsByProgression({
            note: "C",
            scaleMode: "ionian",
            degrees: [{ val: 5, oct: 4 }],
          }),
          rhythm: Rhythms.basic,
          rhythmSize: 1,
        },
        {
          note: getChordsByProgression({
            note: "C",
            scaleMode: "ionian",
            degrees: [{ val: 1, oct: 4 }],
          }),
          rhythm: Rhythms.basic,
          rhythmSize: 1,
        },
        {
          note: getChordsByProgression({
            note: "C",
            scaleMode: "ionian",
            degrees: [{ val: 5, oct: 4 }],
          }),
          rhythm: Rhythms.basic,
          rhythmSize: 1,
        },
      ]),
    []
  );

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
    () => drumPart.getIsLoading() && pianoPart.getIsLoading(),
    [drumPart, pianoPart]
  );

  useEffect(() => {
    if (instrumentTracks.length > 0) return;
    if (isInitializedRef.current) return;

    isInitializedRef.current = true;

    addInstrumentTrack({
      instrument: drumPart,
      instrumentName: "drums",
      track: drumSequence,
      bars: defaultDrumBars,
      scaleNotesInfo: undefined,
    });
    addInstrumentTrack({
      instrument: pianoPart,
      instrumentName: "piano",
      track: pianoSequence,
      bars: defaultPianoBars,
      scaleNotesInfo: pianoScaleNotesInfo,
    });
  }, [
    addInstrumentTrack,
    drumPart,
    pianoPart,
    instrumentTracks,
    drumSequence,
    pianoSequence,
    defaultPianoBars,
    defaultDrumBars,
    pianoScaleNotesInfo,
  ]);

  return {
    isLoading,
  };
}
