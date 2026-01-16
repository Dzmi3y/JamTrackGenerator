import { usePlayer } from "./hooks/usePlayer";
import { useMusicStore } from "../../store/musicStore";
import { useInitInstruments } from "../Sampler/hooks/useInitInstruments";
import { useEffect, useState } from "react";
import PlayerScrollbar from "./components/PlayerScrollbar/PlayerScrollbar";
import buttonStyles from "./PlayerButton.module.css";
import playerStyles from "./Player.module.css";
import selectStyles from "./PlayerSelect.module.css";
import playerInputStyles from "./PlayerInput.module.css";
import PlayIcon from "/src/assets/images/player/play-icon.png";
import PauseIcon from "/src/assets/images/player/pause-icon.png";
import RepeatIcon from "/src/assets/images/player/repeat-icon.png";
import StopIcon from "/src/assets/images/player/stop-icon.png";
import PlayerTrack from "./components/PlayerTrack/PlayerTrack";
import { useInstruments } from "./hooks/useInstruments";
import { NoteList, type NoteType } from "../Sampler/Data/Notes";
import {
  MusicalStyleList,
  type MusicalStyleType,
} from "../Sampler/Data/InstrumentPatterns/MusicalStyleType";
import { useChangeTrack } from "../Sampler/hooks/useChangeTrack";

const useBpm = () => useMusicStore((state) => state.bpm);
const useSetBpm = () => useMusicStore((state) => state.setBpm);
// const useInstrumentTracks = () =>
//   useMusicStore((state) => state.instrumentTracks);

const Player = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [rootNote, setRootNote] = useState<NoteType>("A");
  const [musicalStyle, setMusicalStyle] = useState<MusicalStyleType>("Blues");
  const instruments = useInstruments(setIsLoading);
  const changeTrack = useChangeTrack();
  const bpm = useBpm();
  const setBpm = useSetBpm();
  useInitInstruments();
  const playerCore = usePlayer(instruments, setIsPlaying);
  const totalDuration = playerCore.getDuration();
  //const instrumentTracks = useInstrumentTracks();

  const handlePlayClick = async () => {
    playerCore.togglePlayback();
  };
  const handleStopClick = async () => {
    playerCore.stopPlayback();
  };

  const handleLoopClick = () => {
    const newLoopState = !isLooping;
    setIsLooping(newLoopState);
    playerCore.setIsLoop(newLoopState);
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

  const onChangeNote = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newNote = e.currentTarget.value as NoteType;
    setRootNote(newNote);
  };

  const onChangeStyle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStyle = e.currentTarget.value as MusicalStyleType;
    setMusicalStyle(newStyle);
  };

  useEffect(() => {
    changeTrack(rootNote, musicalStyle);
  }, [musicalStyle, rootNote, changeTrack]);

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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
        >
          <img src={RepeatIcon} alt="repeat-icon" />
        </button>
        <div>
          <label htmlFor="bpm" className={playerStyles["bpm-label"]}>
            BPM
          </label>
          <input
            id="bpm"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.valueAsNumber.toString();
            }}
            className={playerInputStyles["player-input"]}
            style={{
              width: "70px",
              textAlign: "center",
              fontWeight: "700",
            }}
            type="number"
            onChange={changeBpm}
            value={bpm}
          />
        </div>
      </div>
      {/* //todo add total volume */}
      <div>
        <div>Position: {playerCore.transportPosition.toString()}</div>
        <PlayerScrollbar
          duration={totalDuration}
          changePosition={scrollbarHandleChangePosition}
        />
      </div>
      <div className={playerStyles.changeTrackContainer}>
        <label htmlFor="notes">Note</label>
        <select
          name="notes"
          id="notes"
          defaultValue={"A"}
          className={selectStyles.select}
          onChange={onChangeNote}
        >
          {NoteList.map((n) => (
            <option className={selectStyles.option} key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <label htmlFor="styles">Styles</label>
        <select className={selectStyles.select}
          name="styles"
          id="styles"
          defaultValue={"Blues"}
          onChange={onChangeStyle}
        >
          {MusicalStyleList.map((s) => (
            <option className={selectStyles.option} key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        {[...instruments.values()].map((instr) => (
          <div key={instr.id} style={{ display: "flex" }}>
            <PlayerTrack key={instr.id} instrument={instr} />
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Player;
