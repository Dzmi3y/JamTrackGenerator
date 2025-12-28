import { useCallback, useEffect, useState, useRef } from "react";
import * as Tone from "tone";
import { useMusicStore } from "../../../store/musicStore";
import type { Instrument } from "../../../interfaces/Instrument";

const useBpm = () => useMusicStore((state) => state.bpm);
const useTimeSignature = () => useMusicStore((state) => state.timeSignature);
const useInstrumentTracks = () =>
  useMusicStore((state) => state.instrumentTracks);

export function usePlayer(
  instruments: Map<string, Instrument>,
  setPlaybackState: (isPlaying: boolean) => void
) {
  const [transportTime, setTransportTime] = useState(0);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [transportPosition, setTransportPosition] =
    useState<Tone.Unit.Time>("0:0:0");

  const bpm = useBpm();
  const instrumentTracks = useInstrumentTracks();
  const timeSignature: [number, number] = useTimeSignature();

  const playbackStateRef = useRef(setPlaybackState);
  const isLoopRef = useRef(isLoop);

  useEffect(() => {
    playbackStateRef.current = setPlaybackState;
  }, [setPlaybackState]);

  useEffect(() => {
    isLoopRef.current = isLoop;
  }, [isLoop]);

  const playParts = useCallback(() => {
    instrumentTracks.forEach((t) => {
      if (instruments.has(t.id) && t.track?.part.length) {
        instruments.get(t.id)?.playPart(t.track);
      }
    });
  }, [instrumentTracks, instruments]);

  const getDuration = useCallback((): number => {
    let maxDuration = 0;
    for (let i = 0; i < instrumentTracks.length; i++) {
      const duration = instrumentTracks[i].track?.totalDuration ?? 0;
      if (duration > maxDuration) maxDuration = duration;
    }
    return maxDuration;
  }, [instrumentTracks]);

  const startPlayback = useCallback(async () => {
    Tone.Transport.timeSignature = timeSignature;
    playbackStateRef.current(true);

    if (Tone.Transport.state === "stopped") {
      Tone.Transport.position = "0:0:0";
      Tone.Transport.bpm.value = bpm;
      playParts();
    }

    if (Tone.Transport.state !== "started") {
      Tone.Transport.start();
    }
  }, [timeSignature, bpm, playParts]);

  const pausePlayback = useCallback(() => {
    playbackStateRef.current(false);
    if (Tone.Transport.state === "started") {
      Tone.Transport.pause();
    }
  }, []);

  const stopPlayback = useCallback(() => {
    playbackStateRef.current(false);
    if (Tone.Transport.state !== "stopped") {
      Tone.Transport.cancel();
      Tone.Transport.stop();
      Tone.Transport.position = "0:0:0";
    }
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
      const wasStopped = Tone.Transport.state === "stopped";

      if (wasStopped) {
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
    let animationFrameId: number;
    let lastUpdate = 0;
    const UPDATE_INTERVAL = 100;

    const updateTransport = (timestamp: number) => {
      if (timestamp - lastUpdate >= UPDATE_INTERVAL) {
        setTransportTime(Tone.Transport.seconds);
        setTransportPosition(Tone.Transport.position);

        const duration = getDuration();
        if (Tone.Transport.seconds >= duration - 0.01) {
          if (isLoopRef.current) {
            Tone.Transport.position = "0:0:0";
          } else {
            stopPlayback();
          }
        }
        lastUpdate = timestamp;
      }
      animationFrameId = requestAnimationFrame(updateTransport);
    };

    animationFrameId = requestAnimationFrame(updateTransport);
    return () => cancelAnimationFrame(animationFrameId);
  }, [getDuration, stopPlayback]);

  useEffect(() => {
    return () => {
      if (Tone.Transport.state !== "stopped") {
        stopPlayback();
      }
    };
  }, [stopPlayback]);

  useEffect(() => {
    if (Tone.Transport.state !== "stopped") {
      Tone.Transport.bpm.value = bpm;
    }
  }, [bpm]);

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
