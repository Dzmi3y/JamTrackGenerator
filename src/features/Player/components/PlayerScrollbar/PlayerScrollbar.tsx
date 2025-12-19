import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import * as Tone from "tone";
import styles from "./PlayerScrollbar.module.css";
import { useInstrumentTracks } from "../../../../store/musicStore";

type PlayerScrollbarProps = {
  changePosition: (newPosition: number) => void;
  duration: number;
};

const PlayerScrollbar: React.FC<PlayerScrollbarProps> = ({
  changePosition,
  duration,
}) => {
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const instrumentTracks = useInstrumentTracks();

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    if (isDragging) return;

    const interval = setInterval(() => {
      const newPos = Tone.Transport.seconds * 100;
      if (Math.abs(newPos - position) > 1) {
        setPosition(newPos);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isDragging, position]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newPos = Number(e.target.value);
    setPosition(newPos);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    changePosition(position / 100);
    setIsDragging(false);
  }, [position, changePosition]);

  const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (sliderRef.current && !isDragging) {
      const rect = sliderRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newPosition = Math.max(percentage * (duration * 100), 0);
      setPosition(newPosition);
      changePosition(newPosition / 100);
    }
  }, [isDragging, duration, changePosition]);

  const fillPercentage = duration > 0 ? (position / (duration * 100)) * 100 : 0;
  const clampedPercentage = Math.min(100, Math.max(0, fillPercentage));

  const GetNotesTime = useMemo(() => {
    if (!instrumentTracks[1]) return undefined;
    const track = instrumentTracks[1].track;
    if (!track) return undefined;
    return track.part.map((p, i) => {
      const finish =
        track.part.length - 1 === i
          ? track.totalDuration
          : track.part[i + 1].time;
      return { note: p.event.note, timeStart: +p.time, timeFinish: +finish };
    });
  }, [instrumentTracks]);

  const GetCurrentNote = useMemo(() => {
    const pos = position / 100;
    const notes = GetNotesTime;
    if (!notes?.length) return "";
    
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (note.timeStart <= pos && pos < note.timeFinish) {
        return note.note ? note.note.join(" ") : "";
      }
    }
    return "";
  }, [GetNotesTime, position]);

  return (
    <div className={styles.container}>
      <div className={styles.timeDisplay}>
        <span className={styles.currentTime}>{formatTime(position / 100)}</span>
        <span className={styles.totalTime}>{formatTime(duration)}</span>
      </div>

      <div
        className={styles.sliderContainer}
        ref={sliderRef}
        onClick={handleTrackClick}
      >
        <input
          type="range"
          min={0}
          max={duration * 100}
          step={0.1}
          value={position}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className={styles.sliderInput}
        />
        <div className={styles.sliderTrack}>
          <div
            className={styles.sliderProgress}
            style={{ width: `${clampedPercentage}%` }}
          ></div>
        </div>
        <div
          className={styles.sliderThumb}
          style={{ left: `${clampedPercentage}%` }}
        ></div>
      </div>
      <div className={styles.notes}>{GetCurrentNote}</div>
    </div>
  );
};

export default PlayerScrollbar;