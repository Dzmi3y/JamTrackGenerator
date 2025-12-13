import { usePlayer } from "../Player/usePlayer";
import PlayerScrollbar from "../Player/PlayerScrollbar";
import { usePartCompose } from "../Sampler/hooks/usePartCompose";
import { useMusicStore } from "../../store/musicStore";

const useBpm = () => useMusicStore((state) => state.bpm);
const useSetBpm = () => useMusicStore((state) => state.setBpm);

const TestMusicGenerator: React.FC = () => {
  const bpm = useBpm();
  const setBpm = useSetBpm();
  const timeSignature: [number, number] = [4, 4];

  const parts = usePartCompose();

  const handlePlayParts = async () => {
    if (parts.playParts) {
      parts.playParts();
    }
  };

  const totalDuration = parts.totalDuration;

  const player = usePlayer(handlePlayParts, totalDuration, timeSignature);

  const handlePlayClick = async () => {
    player.togglePlayback();
  };

  const scrollbarHandleChangePosition = (pos: number) => {
    player.setPlaybackPosition(pos);
  };
  const isLoopToggle = () => {
    player.setIsLoop(!player.isLoop);
  };

  const changeBpm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.currentTarget.value;
    if (!isNaN(value)) {
      setBpm(value);
    }
  };

  return (
    <div>
      <button onClick={handlePlayClick} disabled={parts.isLoading}>
        {parts.isLoading ? "Loading Instruments..." : "▶ Play with Instruments"}
      </button>
      <button onClick={player.stopPlayback} disabled={parts.isLoading}>
        {parts.isLoading ? "Loading Instruments..." : "Stop"}
      </button>
      <button onClick={isLoopToggle} disabled={parts.isLoading}>
        {player.isLoop ? "Unloop" : "Loop"}
      </button>

      <input type="number" onChange={changeBpm} value={bpm} />

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
