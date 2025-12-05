import React, { useState, useEffect } from "react";
import * as Tone from "tone";

type PlayerScrollbarProps = {
  changePosition: (newPosition: number) => void;
};

const PlayerScrollbar: React.FC<PlayerScrollbarProps> = ({
  changePosition,
}) => {
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(Tone.Transport.seconds);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPos = Number(e.target.value);
    setPosition(newPos);
    changePosition(newPos);
  };

  return (
    <input
      type="range"
      min={0}
      max={duration}
      value={position}
      onChange={handleChange}
      style={{ width: "100%" }}
    />
  );
};

export default PlayerScrollbar;
