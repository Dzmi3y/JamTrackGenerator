import React, { useState } from "react";
import type { InstrumentTrack } from "../../../../interfaces/TrackPart";
import styles from "./PlayerTrack.module.css";

const PlayerTrack: React.FC<{ prop: InstrumentTrack }> = ({ prop }) => {
  const [volume, setVolume] = useState<number>(prop.instrument.getVolume());
  const [pan, setPan] = useState<number>(prop.instrument.getPan());

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.currentTarget.value;
    setVolume(newValue);
    prop.instrument.setVolume(newValue);
  };

  const handlePanDoubleClick = () => {
    changePanValue(0);
  };

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.currentTarget.value;
    changePanValue(newValue);
  };

  const changePanValue = (newValue: number) => {
    setPan(newValue);
    prop.instrument.setPan(newValue);
  };

  const handleVolumeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    if (isNaN(newValue)) newValue = 50;
    newValue = Math.min(100, Math.max(0, newValue));
    setVolume(newValue);
    prop.instrument.setVolume(newValue);
  };

  const handlePanInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    if (isNaN(newValue)) newValue = 0;
    newValue = Math.min(100, Math.max(-100, newValue));
    setPan(newValue);
    prop.instrument.setPan(newValue);
  };

  const panPosition = ((pan + 100) / 200) * 100;

  return (
    <div className={styles.track}>
      <div className={styles.trackName}>{prop.instrumentName}</div>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>
          <span className={styles.labelText}>Volume</span>
          <div className={styles.inputContainer}>
            <input
              type="number"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeInputChange}
              className={styles.numberInput}
            />
            <span className={styles.percentSign}>%</span>
          </div>
        </div>

        <div className={`${styles.sliderContainer} ${styles.volumeSlider}`}>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            className={styles.sliderInput}
            value={volume}
            onChange={handleVolumeChange}
          />
          <div className={styles.sliderTrack}>
            <div
              className={styles.sliderProgress}
              style={{ width: `${volume}%` }}
            ></div>
          </div>
          <div
            className={styles.sliderThumb}
            style={{ left: `${volume}%` }}
          ></div>
        </div>
      </div>

      <div className={styles.controlGroup} onDoubleClick={handlePanDoubleClick}>
        <div className={styles.controlLabel}>
          <span className={styles.labelText}>Pan</span>
          <div className={styles.inputContainer}>
            <input
              type="number"
              min="-100"
              max="100"
              value={pan}
              onChange={handlePanInputChange}
              className={styles.numberInput}
            />
            <span className={styles.percentSign}>%</span>
          </div>
        </div>

        <div className={`${styles.sliderContainer} ${styles.panSlider}`}>
          <input
            type="range"
            min={-100}
            max={100}
            step={1}
            className={styles.sliderInput}
            value={pan}
            onChange={handlePanChange}
          />
          <div className={styles.sliderTrack}>
            <div className={styles.sliderProgress}></div>
          </div>
          <div
            className={styles.sliderThumb}
            style={{ left: `${panPosition}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PlayerTrack;
