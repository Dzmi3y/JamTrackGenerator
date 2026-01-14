import { useEffect, useMemo } from "react";
import {
  buildDrumPatternBars,
  buildPatternBars,
} from "../utils/buildPatternBars";
import { useMusicStore } from "../../../store/musicStore";
import type { PartGenerationParams } from "../types/partGenerationParams";
import { InstrumentPatterns } from "../Data/InstrumentPatterns/intex";
import type { MusicalStyleType } from "../Data/InstrumentPatterns/MusicalStyleType";

export function useChangeTrack(
  partInfo: PartGenerationParams,
  musicalStyle: MusicalStyleType
) {
  const updateInstrumentTrackBars = useMusicStore(
    (state) => state.updateInstrumentTrackBars
  );

  const pattern = useMemo(
    () => InstrumentPatterns(musicalStyle),
    [musicalStyle]
  );

  const { drumBars, highPianoBars, lowPianoBars } = useMemo(() => {
    const drumBars = buildDrumPatternBars(pattern.Drums());
    const highPianoBars = buildPatternBars(pattern.PianoHigh(partInfo));
    const lowPianoBars = buildPatternBars(pattern.PianoLow(partInfo));

    return { drumBars, highPianoBars, lowPianoBars };
  }, [pattern, partInfo]);

  useEffect(() => {
    updateInstrumentTrackBars("Drums", drumBars);
    updateInstrumentTrackBars("Piano High", highPianoBars);
    updateInstrumentTrackBars("Piano Low", lowPianoBars);
  }, [drumBars, highPianoBars, lowPianoBars, updateInstrumentTrackBars]);
}
