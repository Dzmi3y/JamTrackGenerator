import React, { useState, useEffect } from "react";
import * as Tone from "tone";

type PlayerScrollbarProps = {
  changePosition: (newPosition: number) => void;
  duration: number;
};

const PlayerScrollbar: React.FC<PlayerScrollbarProps> = ({
  changePosition,
  duration,
}) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(Tone.Transport.seconds * 100);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPos = Number(e.target.value);
    setPosition(newPos);
    changePosition(newPos / 100);
  };

  return (
    <input
      type="range"
      min={0}
      max={duration * 100}
      value={position}
      onChange={handleChange}
      style={{ width: "100%" }}
    />
  );
};

export default PlayerScrollbar;
