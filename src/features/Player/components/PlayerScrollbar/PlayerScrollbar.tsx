import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import styles from "./PlayerScrollbar.module.css";

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    const msDisplay = Math.floor(ms / 10);

    return `${mins}:${secs < 10 ? "0" : ""}${secs}.${msDisplay < 10 ? "0" : ""}${msDisplay}`;
  };

  useEffect(() => {
    if (isDragging) return;

    const interval = setInterval(() => {
      setPosition(Tone.Transport.seconds * 100);
    }, 200);

    return () => clearInterval(interval);
  }, [isDragging]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPos = Number(e.target.value);
    setPosition(newPos);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    changePosition(position / 100);
    setIsDragging(false);
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sliderRef.current && !isDragging) {
      const rect = sliderRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newPosition = Math.max(percentage * (duration * 100), 0);
      setPosition(newPosition);
      changePosition(newPosition / 100);
    }
  };

  const fillPercentage = duration > 0 ? (position / (duration * 100)) * 100 : 0;
  const clampedPercentage = Math.min(100, Math.max(0, fillPercentage));

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
    </div>
  );
};

export default PlayerScrollbar;
