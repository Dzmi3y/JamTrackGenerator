import { usePlayer } from "../Player/usePlayer";
import PlayerScrollbar from "../Player/PlayerScrollbar";
import { useMusicStore } from "../../store/musicStore";
import { useInitInstruments } from "../Sampler/hooks/useInitInstruments";

const useBpm = () => useMusicStore((state) => state.bpm);
const useSetBpm = () => useMusicStore((state) => state.setBpm);

const TestMusicGenerator: React.FC = () => {
  const bpm = useBpm();
  const setBpm = useSetBpm();
  const init = useInitInstruments();
  const player = usePlayer();
  const totalDuration = player.getDuration();

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
      <button onClick={handlePlayClick} disabled={init.isLoading}>
        {init.isLoading ? "Loading Instruments..." : "▶ Play with Instruments"}
      </button>
      <button onClick={player.stopPlayback} disabled={init.isLoading}>
        {init.isLoading ? "Loading Instruments..." : "Stop"}
      </button>
      <button onClick={isLoopToggle} disabled={init.isLoading}>
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
