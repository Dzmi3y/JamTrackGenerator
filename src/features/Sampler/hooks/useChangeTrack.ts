import { useCallback } from "react";
import {
  buildDrumPatternBars,
  buildPatternBars,
} from "../utils/buildPatternBars";
import { useMusicStore } from "../../../store/musicStore";
import type { MusicalStyleType } from "../Data/InstrumentPatterns/MusicalStyleType";
import type { NoteType } from "../Data/Notes";
import { InstrumentPatterns } from "../Data/InstrumentPatterns/intex";

export function useChangeTrack() {
  const updateInstrumentTrackBars = useMusicStore(
    (state) => state.updateInstrumentTrackBars
  );

  const changeTrack = useCallback(
    (rootNote: NoteType, musicalStyle: MusicalStyleType) => {
      const pattern = InstrumentPatterns(musicalStyle);

      const drumBars = buildDrumPatternBars(pattern.Drums());
      const highPianoBars = buildPatternBars(pattern.PianoHigh({ rootNote }));
      const lowPianoBars = buildPatternBars(pattern.PianoLow({ rootNote }));

      updateInstrumentTrackBars("Drums", drumBars);
      updateInstrumentTrackBars("Piano High", highPianoBars);
      updateInstrumentTrackBars("Piano Low", lowPianoBars);
    },
    [updateInstrumentTrackBars]
  );

  return changeTrack;
}
