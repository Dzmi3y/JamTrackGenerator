import { useCallback, useEffect, useState } from "react";
import * as Tone from "tone";
import { useMusicStore } from "../../store/musicStore";

const useBpm = () => useMusicStore((state) => state.bpm);
const useTimeSignature = () => useMusicStore((state) => state.timeSignature);
const useInstrumentTracks = () =>
  useMusicStore((state) => state.instrumentTracks);

export function usePlayer() {
  const [transportTime, setTransportTime] = useState(0);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [transportPosition, setTransportPosition] =
    useState<Tone.Unit.Time>("0:0:0");
  const bpm = useBpm();
  const instrumentTracks = useInstrumentTracks();
  const timeSignature: [number, number] = useTimeSignature();

  const playParts = useCallback(() => {
    instrumentTracks.forEach((t) => {
      if (t.instrument && t.track) {
        if (t.track.part.length > 0) {
          t.instrument.playPart(t.track);
        }
      }
    });
  }, [instrumentTracks]);

  const getDuration = useCallback((): number => {
    const durationArray = instrumentTracks.map(
      (i) => i.track?.totalDuration ?? 0
    );

    return Math.max(...durationArray);
  }, [instrumentTracks]);

  const startPlayback = useCallback(async () => {
    Tone.Transport.timeSignature = timeSignature;

    if (Tone.Transport.state === "stopped") {
      Tone.Transport.position = "0:1:0"; // Fixes a bug in Tone.js when a -0 value is available
      Tone.Transport.position = "0:0:0";
      Tone.Transport.bpm.value = bpm;
      playParts();
    }
    Tone.Transport.start();
  }, [timeSignature, bpm, playParts]);

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
      if (Tone.Transport.seconds >= getDuration()) {
        if (isLoop) {
          Tone.Transport.position = "0:1:0"; // Fixes a bug in Tone.js when a -0 value is available
          Tone.Transport.position = "0:0:0";
        } else {
          stopPlayback();
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [getDuration, isLoop, stopPlayback]);

  useEffect(() => {
    stopPlayback();
  }, [bpm, stopPlayback]);

  return {
    togglePlayback,
    stopPlayback,
    setPlaybackPosition,
    transportTime,
    transportPosition,
    isLoop,
    setIsLoop,
    getDuration,
  };
}
