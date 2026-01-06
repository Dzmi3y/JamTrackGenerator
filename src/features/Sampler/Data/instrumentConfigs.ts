import type { SampleInstrument } from "../types/sampleInstrument";

export const instrumentConfigs: Record<
  SampleInstrument,
  { urls: Record<string, string>; baseUrl: string }
> = {
  piano: {
    urls: {
      A0: "A0v1.wav",
      A1: "A1v1.wav",
      A2: "A2v1.wav",
      "D#3": "Ds3v1.wav",
      A4: "A4v1.wav",
      A5: "A5v1.wav",
      "D#7": "Ds7v1.wav",
    },
    baseUrl: "/Samples/Piano/",
  },
  drums: {
    urls: {
      C1: "kick.wav",
      D1: "snare.wav",
      "C#1": "rimshot.wav",
      "F#1": "hihat.wav",
      "A#1": "ohihat.wav",
      F1: "lowTom.wav",
      B1: "midTom.wav",
      D2: "highTom.wav",
      "C#2": "crash.wav",
      "D#2": "ride.wav",
    },
    baseUrl: "/Samples/Drumkit/",
  },
};
