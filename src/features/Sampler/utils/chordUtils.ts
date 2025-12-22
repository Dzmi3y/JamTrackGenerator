import * as scribble from "scribbletune";
import type { ChordType } from "../Data/Chords";
import type { NoteType } from "../Data/Notes";

export function getChord(
  rootNote: NoteType,
  chordType: ChordType,
  octave?: number
): string[] {
  octave ??= 4;
  if (chordType === "mMaj7") {
    return scribble
      .scale(`${rootNote}${octave} melodic minor`)
      .filter((_: any, i: number) => [0, 2, 4, 6].includes(i));
  }
  const res =scribble.chord(`${rootNote}${octave} ${chordType}`);
  return  res;
}
