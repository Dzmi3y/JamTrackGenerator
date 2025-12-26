import { useCallback, useEffect, useState, useRef } from "react";
import * as Tone from "tone";

import { usePreloader } from "../../../shared/components/PreloaderProvider";
import type { SampleInstrument } from "../types/SampleInstrument";
import { samplerService } from "../services/samplerService";
import type { PartResult } from "../services/partBuilderService";
import type { Instrument } from "../../../interfaces/Instrument";

export function useInstrument(
  instrumentType: SampleInstrument,
  instrumentName: string,
  defaultVolume?: number,
  defaultPan?: number
): Instrument {
  const [isLoading, setIsLoading] = useState(false);
  const samplerRef = useRef<Tone.Sampler | null>(null);
  const samplerGainRef = useRef<Tone.Gain | null>(null);
  const samplerPannerRef = useRef<Tone.Panner | null>(null);
  const instrumentNameRef = useRef<string>(instrumentName);

  const { hidePreloader, setPreloaderText } = usePreloader();

  const getInstrumentName = useCallback(
    (): string => instrumentNameRef.current,
    []
  );
  const setInstrumentName = useCallback((newName: string) => {
    instrumentNameRef.current = newName;
  }, []);

  const gainNormalization = useCallback((value: number) => {
    const normalizedGain = Math.min(Math.max(value, 0), 100) / 100;
    return +normalizedGain.toFixed(2);
  }, []);

  const panNormalization = useCallback((value: number) => {
    const normalizedPan = Math.min(Math.max(value, -100), 100) / 100;
    return +normalizedPan.toFixed(2);
  }, []);

  useEffect(() => {
    const gain = defaultVolume ? gainNormalization(defaultVolume) : 1;
    const pan = defaultPan ? panNormalization(defaultPan) : 0;
    samplerGainRef.current = new Tone.Gain(gain);
    samplerPannerRef.current = new Tone.Panner(pan);

    return () => {
      samplerGainRef.current?.dispose();
      samplerPannerRef.current?.dispose();
    };
  }, [gainNormalization, panNormalization, defaultPan, defaultVolume]);

  const playPart = useCallback(
    (partResult: PartResult | undefined, isLoop: boolean = false) => {
      if (!samplerRef.current || !partResult) return;

      const part = new Tone.Part((time, event) => {
        samplerRef.current?.triggerAttackRelease(
          event.event.note,
          event.event.duration,
          time,
          event.event.velocity / 100
        );
      }, partResult.part);

      if (isLoop) {
        part.loop = true;
        part.loopStart = 0;
        part.loopEnd = partResult.totalDuration;
      }
      part.start(0);

      if (!isLoop) {
        part.stop(`+${partResult.totalDuration}`);
      }
    },
    []
  );

  const getIsLoading = useCallback((): boolean => {
    return isLoading;
  }, [isLoading]);

  const getVolume = useCallback((): number => {
    const res = samplerGainRef.current?.gain.value ?? 0;
    return res * 100;
  }, [samplerGainRef]);

  const getPan = useCallback((): number => {
    const res = samplerPannerRef.current?.pan.value ?? 0;
    return res * 100;
  }, [samplerPannerRef]);

  const setVolume = useCallback(
    (value: number) => {
      if (!samplerGainRef.current) return;

      samplerGainRef.current.gain.value = panNormalization(value);
    },
    [panNormalization]
  );

  const setPan = useCallback(
    (value: number) => {
      if (!samplerPannerRef.current) return;

      samplerPannerRef.current.pan.value = gainNormalization(value);
    },
    [gainNormalization]
  );

  useEffect(() => {
    const loadSampler = async () => {
      setIsLoading(true);
      setPreloaderText("Instrument is loading...");

      const sampler = samplerService.getSampler(instrumentType, () => {
        setIsLoading(false);
      });

      hidePreloader();

      sampler.disconnect();

      if (samplerGainRef.current && samplerPannerRef.current) {
        sampler.connect(samplerGainRef.current);
        samplerGainRef.current.connect(samplerPannerRef.current);
        samplerPannerRef.current.toDestination();
      }

      samplerRef.current = sampler;
    };

    loadSampler();
  }, [instrumentType, hidePreloader, setPreloaderText]);

  return {
    playPart,
    getIsLoading,
    getVolume,
    getPan,
    setVolume,
    setPan,
    setInstrumentName,
    getInstrumentName,
  };
}
