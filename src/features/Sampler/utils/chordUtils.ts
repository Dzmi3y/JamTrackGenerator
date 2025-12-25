import * as scribble from "scribbletune";
import type { ChordType } from "../Data/Chords";
import type { NoteType } from "../Data/Notes";
import type { ScaleMode } from "../Data/ScaleMode";

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
  const res = scribble.chord(`${rootNote}${octave} ${chordType}`);
  return res;
}

export function getInterval(
  rootNote: NoteType,
  degre: number,
  interval: number,
  octave: number,
  scaleMode: ScaleMode
): string[] {
  const currentDegre: number = Math.min(Math.max(degre, 7), 1);
  const currentInterval: number = Math.min(Math.max(interval, 8), 2);

  const scale1 = scribble.scale(`${rootNote}${octave} ${scaleMode}`);
  const scale2 = scribble.scale(`${rootNote}${octave + 1} ${scaleMode}`);
  const scales = [...scale1, ...scale2];

  const currentNote: string = scales[currentDegre - 1];

  if (currentInterval == 8) {
    return [currentNote, currentNote.replace(`${octave}`, `${octave + 1}`)];
  }

  return [currentNote, scales[currentDegre + interval - 2]];

  return scribble
    .scale(`${rootNote}${octave} ${scaleMode}`)
    .filter((_: any, i: number) => [0, 2, 4, 6].includes(i));
}
