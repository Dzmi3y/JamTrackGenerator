import React from "react";
import { useDrumPart } from "../Sampler/hooks/useDrumPart";
import { useTonePart } from "../Sampler/hooks/useTonePart";
import { useInstrumentPart } from "../Sampler/hooks/useInstrumentPart";
import * as scribble from "scribbletune";
import { useChord } from "../Sampler/hooks/useChord";
import { usePlayer } from "../Player/usePlayer";
import PlayerScrollbar from "../Player/PlayerScrollbar";

const TestMusicGenerator: React.FC = () => {
  const bpm = 180;
  const { getChord } = useChord();

  const drumPart = useTonePart("drums");
  const pianoPart = useTonePart("piano");

  const { getDefaultDrumPart } = useDrumPart();
  const { getInstrumentPart } = useInstrumentPart();

  const dMinor7 = getChord("D", "m7", 3);
  const gDominant7 = getChord("G", "7th", 3);
  const cMajor7 = getChord("C", "maj7", 3);
  const fMajor7 = getChord("F", "maj7", 3);

  // scribble.getChordsByProgression("C4 melodic minor", "ii V I I")

  const instrumentSequence = getInstrumentPart(
    [dMinor7, gDominant7, cMajor7, fMajor7],
    "1",
    bpm
  );
  const drumSequence = getDefaultDrumPart(bpm);

  const handlePlayParts = () => {
    if (!instrumentSequence || !drumSequence) return;

    pianoPart.playPart(instrumentSequence, false);
    drumPart.playPart(drumSequence, false);
  };

  const totalDuration = instrumentSequence?.totalDuration ?? 60;

  const {
    togglePlayback,
    stopPlayback,
    setPlaybackPosition,
    pausePlayback,
    startPlayback,
    timeSignature,
    setTimeSignature,
    transportTime,
    transportPosition,
  } = usePlayer(handlePlayParts, totalDuration, bpm);

  const handlePlayClick = async () => {
    togglePlayback();
  };

  const scrollbarHandleChangePosition = (pos: number) => {
    setPlaybackPosition(pos);
  };

  return (
    <div>
      <button onClick={handlePlayClick} disabled={pianoPart.isLoading}>
        {pianoPart.isLoading
          ? "Loading Instruments..."
          : "▶ Play with Instruments"}
      </button>
      <button onClick={stopPlayback} disabled={pianoPart.isLoading}>
        {pianoPart.isLoading ? "Loading Instruments..." : "Stop"}
      </button>

      <div style={{ marginTop: "1rem" }}>
        <p>Transport time: {transportTime.toFixed(2)}s</p>
        <p>Position: {transportPosition.toString()}</p>
        <PlayerScrollbar
          duration={totalDuration}
          changePosition={scrollbarHandleChangePosition}
        />
      </div>
    </div>
  );
};

export default TestMusicGenerator;
