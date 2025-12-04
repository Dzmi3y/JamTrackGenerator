import { useCallback } from "react";
import * as Tone from "tone";
import type { SampleInstrument } from "../SampleInstrument";
import { instrumentConfigs } from "../instrumentConfigs";

export function useSampler() {
  const getSampler = useCallback(
    (instrument: SampleInstrument, onLoad: () => void) => {
      const { urls, baseUrl } = instrumentConfigs[instrument];

      const sampler = new Tone.Sampler({
        urls: urls,
        baseUrl: baseUrl,
        onload: () => {
          onLoad();
        },
        release: 1,
      }).toDestination();
      return sampler;
    },
    []
  );

  return { getSampler };
}
