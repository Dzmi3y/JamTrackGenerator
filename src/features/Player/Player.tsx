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
import PlayerTrack from "./components/PlayerTrack/PlayerTrack";

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
          <label htmlFor="bpm" className={playerStyles["bpm-label"]}>
            BPM
          </label>
          <input
            id="bpm"
            className={playerInputStyles["player-input"]}
            style={{ width: "70px", textAlign: "center", fontWeight: "700" }}
            type="number"
            onChange={changeBpm}
            value={bpm}
          />
        </div>
      </div>
      {/* //todo add total volume */}
      <div>
        <div className={playerStyles["time-panel"]}>
          <div>Time: {+playerCore.transportTime.toFixed(2)}s</div>
          <div>Position: {playerCore.transportPosition.toString()}</div>
        </div>
        <PlayerScrollbar
          duration={totalDuration}
          changePosition={scrollbarHandleChangePosition}
        />
      </div>
      <div>
        {instrumentTracks.map((t) => (
          <PlayerTrack key={t.id} prop={t} />
        ))}
      </div>
    </div>
  );
};

export default Player;
