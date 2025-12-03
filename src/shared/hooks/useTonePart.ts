import { useCallback, useEffect, useState } from "react";
import * as Tone from "tone";
import type { PartResult } from "../../shared/hooks/usePartBuilder";
import { useSampler } from "../../features/Sampler/useSampler";
import { usePreloader } from "../components/PreloaderProvider";
import type { SampleInstrument } from "../../features/Sampler/SampleInstrument";

export function useTonePart(instrument: SampleInstrument) {
  const [sampler, setSampler] = useState<Tone.Sampler | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getSampler } = useSampler();

  const { hidePreloader, setPreloaderText } = usePreloader();

  const playPart = useCallback(
    (partResult: PartResult | undefined, isLoop: Boolean = true) => {
      if (!sampler || !partResult) return;

      const part = new Tone.Part((time, event) => {
        sampler.triggerAttackRelease(
          event.event.note,
          event.event.duration,
          time,
          event.event.velocity / 100
        );
      }, partResult.part);

      if (isLoop) {
        part.loop = true;
        part.loopEnd = partResult.totalDuration;
      }
      part.start(0);

      if (!isLoop) {
        part.stop(`+${partResult.totalDuration}`);
      }
    },
    [sampler]
  );

  useEffect(() => {
    const loadSampler = async () => {
      setIsLoading(true);
      setPreloaderText("Instrument is loading...");
      const sampler = getSampler(instrument, () => {
        setIsLoading(false);
      });
      hidePreloader();
      setSampler(sampler);
    };

    loadSampler();
  }, [instrument]);
  return { playPart, isLoading };
}
