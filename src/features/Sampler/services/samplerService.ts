import * as Tone from "tone";
import type { SampleInstrument } from "../SampleInstrument";
import { instrumentConfigs } from "../instrumentConfigs";

export const samplerService = {
  getSampler(instrument: SampleInstrument, onLoad: () => void): Tone.Sampler {
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
};
