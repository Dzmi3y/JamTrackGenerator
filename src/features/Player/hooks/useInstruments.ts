import { useCallback, useEffect, useRef, useState } from "react";
import { usePreloader } from "../../../shared/hooks/usePreloader";
import { useMusicStore } from "../../../store/musicStore";
import type { Instrument } from "../../../interfaces/Instrument";
import { createSamplerInstrument } from "../../Sampler/factories/createSamplerInstrument";

const useInstrumentTracks = () =>
  useMusicStore((state) => state.instrumentTracks);

export function useInstruments(
  setIsLoading: (isLoading: boolean) => void
): Map<string, Instrument> {
  const instrumentTracks = useInstrumentTracks();
  const { hidePreloader, setPreloaderText } = usePreloader();
  const [instruments, setInstruments] = useState<Map<string, Instrument>>(
    new Map()
  );

  const instrumentsRef = useRef<Map<string, Instrument>>(
    new Map<string, Instrument>()
  );

  const loadingInstrumentsRef = useRef<Map<string, string>>(
    new Map<string, string>()
  );

  const intervalIdRef = useRef<number>(-1);

  const handleInstrumentLoad = useCallback(
    (isLoading: boolean, id: string, name: string) => {
      setIsLoading(isLoading);
      if (isLoading) {
        if (!loadingInstrumentsRef.current.has(id)) {
          loadingInstrumentsRef.current.set(id, name);
        }
      } else {
        if (loadingInstrumentsRef.current.has(id)) {
          loadingInstrumentsRef.current.delete(id);
        }

        setInstruments(new Map(instrumentsRef.current));

        if (
          loadingInstrumentsRef.current.size === 0 &&
          intervalIdRef.current !== -1
        ) {
          hidePreloader();
          clearInterval(intervalIdRef.current);
          intervalIdRef.current = -1;
        }
      }
    },
    [hidePreloader, setIsLoading]
  );

  useEffect(() => {
    setPreloaderText("Instrument is loading...");
    instrumentTracks.forEach((instr) => {
      if (instrumentsRef.current.has(instr.id)) return;
      const newInstrument = createSamplerInstrument(
        instr.id,
        instr.instrumentType,
        instr.instrumentName,
        instr.defaultVolume,
        instr.defaultPan,
        handleInstrumentLoad
      );
      instrumentsRef.current.set(instr.id, newInstrument);
    });

    setInstruments(new Map(instrumentsRef.current));

    if (instrumentTracks.length === 0) {
      hidePreloader();
      if (intervalIdRef.current !== -1) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = -1;
      }
      return;
    }

    if (loadingInstrumentsRef.current.size === 0) {
      hidePreloader();
      if (intervalIdRef.current !== -1) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = -1;
      }
    } else {
      intervalIdRef.current = setInterval(() => {
        if (
          loadingInstrumentsRef.current.size === 0 &&
          intervalIdRef.current !== -1
        ) {
          hidePreloader();
          clearInterval(intervalIdRef.current);
          intervalIdRef.current = -1;
        }
      }, 100);
    }
  }, [instrumentTracks, setPreloaderText, hidePreloader, handleInstrumentLoad]);

  useEffect(() => {
    const intervalId = intervalIdRef.current;
    const instruments = instrumentsRef.current;

    return () => {
      if (intervalId !== -1) clearInterval(intervalId);
      instruments.forEach((i) => i.dispose?.());
      instruments.clear();
    };
  }, []);

  return instruments;
}
