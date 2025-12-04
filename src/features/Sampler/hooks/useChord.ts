import { useCallback } from "react";
import * as scribble from "scribbletune";
import type { ChordType } from "../Data/Chords";
import type { NoteType } from "../Data/Notes";

export function useChord() {
  const getChord = useCallback(
    (
      rootNote: NoteType,
      chordType: ChordType,
      octave: number = 4
    ): string[] => {
      if (chordType === "mMaj7") {
        return scribble
          .scale(rootNote + octave + " melodic minor")
          .filter((_: any, i: number) => [0, 2, 4, 6].includes(i));
      }
      return scribble.chord(rootNote + chordType, String(octave));
    },
    []
  );

  return { getChord };
}
