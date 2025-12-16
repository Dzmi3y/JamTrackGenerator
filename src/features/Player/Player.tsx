import { usePlayer } from "./hooks/usePlayer";
import { useMusicStore } from "../../store/musicStore";
import { useInitInstruments } from "../Sampler/hooks/useInitInstruments";
import { useState } from "react";
import PlayerScrollbar from "./components/PlayerScrollbar/PlayerScrollbar";
import buttonStyles from "./PlayerButton.module.css";
import playerStyles from "./Player.module.css";
import playerInputStyles from "./PlayerInput.module.css";
import PlayIcon from "/src/assets/images/player/play-icon.png";
import PauseIcon from "/src/assets/images/player/pause-icon.png";
import RepeatIcon from "/src/assets/images/player/repeat-icon.png";
import StopIcon from "/src/assets/images/player/stop-icon.png";

const useBpm = () => useMusicStore((state) => state.bpm);
const useSetBpm = () => useMusicStore((state) => state.setBpm);
const useInstrumentTracks = () =>
  useMusicStore((state) => state.instrumentTracks);

const Player: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);

  const bpm = useBpm();
  const setBpm = useSetBpm();
  const init = useInitInstruments();
  const playerCore = usePlayer(setIsPlaying);
  const totalDuration = playerCore.getDuration();
  const instrumentTracks = useInstrumentTracks();
  const [pan, setPan] = useState<number>(0);

  const handlePlayClick = async () => {
    playerCore.togglePlayback();
  };
  const handleStopClick = async () => {
    playerCore.stopPlayback();
  };

  const handleLoopClick = () => {
    setIsLooping(!isLooping);
    playerCore.setIsLoop(!playerCore.isLoop);
  };

  const scrollbarHandleChangePosition = (pos: number) => {
    playerCore.setPlaybackPosition(pos);
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
      <div className={playerStyles["control-panel"]}>
        <button
          className={
            isPlaying
              ? `${buttonStyles["player-button"]} ${buttonStyles["active"]}`
              : buttonStyles["player-button"]
          }
          onClick={handlePlayClick}
          disabled={init.isLoading}
        >
          {isPlaying ? (
            <img src={PauseIcon} alt="pause-icon" />
          ) : (
            <img src={PlayIcon} alt="play-icon" />
          )}
        </button>
        <button
          className={buttonStyles["player-button"]}
          onClick={handleStopClick}
          disabled={init.isLoading}
        >
          <img src={StopIcon} alt="stop-icon" />
        </button>
        <button
          className={
            isLooping
              ? `${buttonStyles["player-button"]} ${buttonStyles["active"]}`
              : buttonStyles["player-button"]
          }
          onClick={handleLoopClick}
          disabled={init.isLoading}
        >
          <img src={RepeatIcon} alt="repeat-icon" />
        </button>
        <div>
          <label htmlFor="bpm" className={playerStyles['bpm-label']}>BPM</label>
        <input
          id="bpm"
          className={playerInputStyles["player-input"]}
          style={{width:"70px",textAlign:"center",fontWeight:"700"}}
          type="number"
          onChange={changeBpm}
          value={bpm}
        />
      </div>
      </div>
      <div>
        <button onClick={click}>{pan}</button>
      </div>

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
