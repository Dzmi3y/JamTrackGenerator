import React, { useState } from "react";
import type { InstrumentTrack } from "../../../../interfaces/TrackPart";
import PlayerTrackStyles from "./PlayerTrack.module.css"

const PlayerTrack: React.FC<{ prop: InstrumentTrack }> = ({ prop }) => {
  const [volume, setVolume] = useState<number>(prop.instrument.getVolume());
  const [pan, setPan] = useState<number>(prop.instrument.getPan());

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.currentTarget.value;
    setVolume(newValue);
    prop.instrument.setVolume(newValue);
  };

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.currentTarget.value;
    setPan(newValue);
    prop.instrument.setPan(newValue);
  };

  return (
    <div>
      <div>{prop.instrumentName}</div>
      <div>Volume: {volume}%</div>
      <input
        type="range"
        min={0}
        max={100}
        className={PlayerTrackStyles.volume}
        value={volume}
        onChange={handleVolumeChange}
      />
      <div>Pan: {pan}%</div>
      <input
        type="range"
        min={-100}
        max={100}
        className={PlayerTrackStyles.pan}
        value={pan}
        onChange={handlePanChange}
      />
    </div>
  );
};

export default PlayerTrack;
