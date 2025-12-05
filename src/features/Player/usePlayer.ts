import { useCallback, useEffect, useState } from "react";
import * as Tone from "tone";

export function usePlayer(partCallback: () => void) {
  const [transportTime, setTransportTime] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [timeSignature, setTimeSignature] = useState<[number, number]>([4, 4]);
  const [transportPosition, setTransportPosition] =
    useState<Tone.Unit.Time>("0:0:0");

  const startPlayback = useCallback(async () => {
    Tone.Transport.timeSignature = timeSignature;

    if (Tone.Transport.state === "stopped") {
      Tone.Transport.bpm.value = bpm;
      partCallback();
    }
    Tone.Transport.start();
  }, [timeSignature, bpm, partCallback]);

  const pausePlayback = useCallback(() => {
    Tone.Transport.pause();
  }, []);

  const stopPlayback = useCallback(() => {
    Tone.Transport.cancel();
    Tone.Transport.stop();
  }, []);

  const togglePlayback = useCallback(async () => {
    if (Tone.Transport.state !== "started") {
      await startPlayback();
    } else {
      pausePlayback();
    }
  }, [startPlayback, pausePlayback]);

  const setPlaybackPosition = useCallback(
    async (pos: Tone.Unit.Time | number) => {
      if (Tone.Transport.state === "stopped") {
        await startPlayback();
        pausePlayback();
      }
      if (typeof pos === "number") {
        Tone.Transport.seconds = pos;
      } else {
        Tone.Transport.position = pos;
      }
    },
    [startPlayback, pausePlayback]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTransportTime(Tone.Transport.seconds);
      setTransportPosition(Tone.Transport.position);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return {
    bpm,
    setBpm,
    togglePlayback,
    stopPlayback,
    setPlaybackPosition,
    pausePlayback,
    startPlayback,
    timeSignature,
    setTimeSignature,
    transportTime,
    transportPosition,
  };
}
