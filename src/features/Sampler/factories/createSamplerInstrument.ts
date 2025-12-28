import * as Tone from "tone";
import type { SampleInstrument } from "../types/SampleInstrument";
import { samplerService } from "../services/samplerService";
import type { PartResult } from "../services/partBuilderService";
import type { Instrument } from "../../../interfaces/Instrument";

const gainNormalization = (value: number): number => {
  const normalizedGain = Math.min(Math.max(value, 0), 100) / 100;
  return +normalizedGain.toFixed(2);
};

const panNormalization = (value: number): number => {
  const normalizedPan = Math.min(Math.max(value, -100), 100) / 100;
  return +normalizedPan.toFixed(2);
};

export function createSamplerInstrument(
  id: string,
  instrumentType: SampleInstrument,
  name: string,
  defaultVolume?: number,
  defaultPan?: number,
  isLoadingHandler?: (isLoading: boolean, id: string, name: string) => void
): Instrument {
  const gain = defaultVolume ? gainNormalization(defaultVolume) : 1;
  const pan = defaultPan ? panNormalization(defaultPan) : 0;
  let instrumentName: string = name;

  let sampler: Tone.Sampler | null = null;
  const samplerGain: Tone.Gain = new Tone.Gain(gain);
  const samplerPanner: Tone.Panner = new Tone.Panner(pan);
  let activeParts: Tone.Part[] = [];

  const loadSampler = async () => {
    if (isLoadingHandler) isLoadingHandler(true, id, name);

    sampler = samplerService.getSampler(instrumentType, () => {
      if (isLoadingHandler) isLoadingHandler(false, id, name);
    });

    if (sampler) {
      sampler.disconnect();
      sampler.connect(samplerGain);
      samplerGain.connect(samplerPanner);
      samplerPanner.toDestination();
    }
  };

  loadSampler().catch((error) => {
    console.error("Failed to load sampler:", error);
    if (isLoadingHandler) isLoadingHandler(false, id, name);
  });

  const cleanupParts = () => {
    activeParts.forEach((part) => {
      part.stop();
      part.dispose();
    });
    activeParts = [];
  };

  const setName = (newValue: string) => {
    instrumentName = newValue;
  };

  const getName = () => {
    return instrumentName;
  };

  const playPart = (
    partResult: PartResult | undefined,
    isLoop: boolean = false
  ) => {
    if (!sampler || !partResult) return;

    const part = new Tone.Part((time, event) => {
      sampler?.triggerAttackRelease(
        event.event.note,
        event.event.duration,
        time,
        event.event.velocity / 100
      );
    }, partResult.part);

    activeParts.push(part);

    if (isLoop) {
      part.loop = true;
      part.loopStart = 0;
      part.loopEnd = partResult.totalDuration;
    }

    part.start(0);

    if (!isLoop) {
      part.stop(`+${partResult.totalDuration}`);
      Tone.getTransport().scheduleOnce(() => {
        const index = activeParts.indexOf(part);
        if (index > -1) {
          activeParts.splice(index, 1);
        }
      }, `+${partResult.totalDuration}`);
    }
  };

  const stopAll = () => {
    cleanupParts();
  };

  const getVolume = (): number => {
    return (samplerGain.gain.value ?? 0) * 100;
  };

  const getPan = (): number => {
    return (samplerPanner?.pan.value ?? 0) * 100;
  };

  const setVolume = (value: number) => {
    samplerGain.gain.value = gainNormalization(value);
  };

  const setPan = (value: number) => {
    samplerPanner.pan.value = panNormalization(value);
  };

  const dispose = () => {
    cleanupParts();
    sampler?.dispose();
    samplerGain.dispose();
    samplerPanner.dispose();
  };

  return {
    get id() {
      return id;
    },
    getName,
    setName,
    getVolume,
    setVolume,
    getPan,
    setPan,
    playPart,
    stopAll,
    dispose,
  };
}
