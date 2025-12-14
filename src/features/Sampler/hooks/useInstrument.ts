import { useCallback, useEffect, useState, useRef } from "react";
import * as Tone from "tone";

import { usePreloader } from "../../../shared/components/PreloaderProvider";
import type { SampleInstrument } from "../SampleInstrument";
import { samplerService } from "../services/samplerService";
import type { PartResult } from "../services/partBuilderService";
import type { Instrument } from "../../../interfaces/Instrument";

export function useInstrument(instrument: SampleInstrument): Instrument {
  const [isLoading, setIsLoading] = useState(false);
  const samplerRef = useRef<Tone.Sampler | null>(null);
  const samplerGainRef = useRef<Tone.Gain | null>(null);
  const samplerPannerRef = useRef<Tone.Panner | null>(null);

  const { hidePreloader, setPreloaderText } = usePreloader();

  useEffect(() => {
    samplerGainRef.current = new Tone.Gain(1);
    samplerPannerRef.current = new Tone.Panner(0);

    return () => {
      samplerGainRef.current?.dispose();
      samplerPannerRef.current?.dispose();
    };
  }, []);

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

  const setVolume = useCallback((value: number) => {
    if (!samplerGainRef.current) return;

    const normalizedGain = Math.min(Math.max(value, 0), 100) / 100;
    samplerGainRef.current.gain.value = +normalizedGain.toFixed(2);
  }, []);

  const setPan = useCallback((value: number) => {
    if (!samplerPannerRef.current) return;

    const normalizedPan = Math.min(Math.max(value, -100), 100) / 100;
    samplerPannerRef.current.pan.value = +normalizedPan.toFixed(2);
  }, []);

  useEffect(() => {
    const loadSampler = async () => {
      setIsLoading(true);
      setPreloaderText("Instrument is loading...");

      const sampler = samplerService.getSampler(instrument, () => {
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
  }, [instrument, hidePreloader, setPreloaderText]);

  return {
    playPart,
    getIsLoading,
    getVolume,
    getPan,
    setVolume,
    setPan,
  };
}
