import { usePlayer } from "../Player/usePlayer";
import PlayerScrollbar from "../Player/PlayerScrollbar";
import { usePartCompose } from "../Sampler/hooks/usePartCompose";

const TestMusicGenerator: React.FC = () => {
  const bpm = 60;
  const timeSignature: [number, number] = [4, 4];

  const parts = usePartCompose(bpm);

  const handlePlayParts = async () => {
    if (parts.playParts) {
      parts.playParts();
    }
  };

  const totalDuration = parts.totalDuration;

  const player = usePlayer(handlePlayParts, totalDuration, bpm, timeSignature);

  const handlePlayClick = async () => {
    player.togglePlayback();
  };

  const scrollbarHandleChangePosition = (pos: number) => {
    player.setPlaybackPosition(pos);
  };

  return (
    <div>
      <button onClick={handlePlayClick} disabled={parts.isLoading}>
        {parts.isLoading ? "Loading Instruments..." : "▶ Play with Instruments"}
      </button>
      <button onClick={player.stopPlayback} disabled={parts.isLoading}>
        {parts.isLoading ? "Loading Instruments..." : "Stop"}
      </button>

      <div style={{ marginTop: "1rem" }}>
        <p>Transport time: {player.transportTime.toFixed(2)}s</p>
        <p>Position: {player.transportPosition.toString()}</p>
        <PlayerScrollbar
          duration={totalDuration}
          changePosition={scrollbarHandleChangePosition}
        />
      </div>
    </div>
  );
};

export default TestMusicGenerator;
