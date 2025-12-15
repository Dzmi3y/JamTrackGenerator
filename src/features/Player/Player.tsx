import { usePlayer } from "./hooks/usePlayer";
import { useMusicStore } from "../../store/musicStore";
import { useInitInstruments } from "../Sampler/hooks/useInitInstruments";
import { useState } from "react";
import PlayerScrollbar from "./components/PlayerScrollbar";

const useBpm = () => useMusicStore((state) => state.bpm);
const useSetBpm = () => useMusicStore((state) => state.setBpm);
const useInstrumentTracks = () =>
  useMusicStore((state) => state.instrumentTracks);

const Player: React.FC = () => {
  const bpm = useBpm();
  const setBpm = useSetBpm();
  const init = useInitInstruments();
  const playerCore = usePlayer();
  const totalDuration = playerCore.getDuration();
  const instrumentTracks = useInstrumentTracks();
  const [pan, setPan] = useState<number>(0);

  const handlePlayClick = async () => {
    playerCore.togglePlayback();
  };

  const scrollbarHandleChangePosition = (pos: number) => {
    playerCore.setPlaybackPosition(pos);
  };
  const isLoopToggle = () => {
    playerCore.setIsLoop(!playerCore.isLoop);
  };

  const changeBpm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.currentTarget.value;
    if (!isNaN(value)) {
      setBpm(value);
    }
  };

  const click = () => {
    if (instrumentTracks[0]) {
      instrumentTracks[0].instrument.setPan(100);
      setPan(100);
    }
  };

  return (
    <div>
      <button onClick={handlePlayClick} disabled={init.isLoading}>
        {init.isLoading ? "Loading Instruments..." : "▶ Play with Instruments"}
      </button>
      <button onClick={playerCore.stopPlayback} disabled={init.isLoading}>
        {init.isLoading ? "Loading Instruments..." : "Stop"}
      </button>
      <button onClick={isLoopToggle} disabled={init.isLoading}>
        {playerCore.isLoop ? "Unloop" : "Loop"}
      </button>
      <div>
        <button onClick={click}>{pan}</button>
      </div>

      <input type="number" onChange={changeBpm} value={bpm} />

      <div style={{ marginTop: "1rem" }}>
        <p>Transport time: {playerCore.transportTime.toFixed(2)}s</p>
        <p>Position: {playerCore.transportPosition.toString()}</p>
        <PlayerScrollbar
          duration={totalDuration}
          changePosition={scrollbarHandleChangePosition}
        />
      </div>
    </div>
  );
};

export default Player;
