import type { NoteType } from "../Data/Notes";
import type { FixedChordType } from "../Data/ScaleDegree";
import type { ScaleMode } from "../Data/ScaleMode";
import type { ScaleNotesInfo } from "../types/scaleNotesInfo";
import { getChord } from "./chordUtils";
import { getChordForDegree } from "./scales";
import * as scribble from "scribbletune";

export type Degree = {
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  octave: number;
  chordType?: FixedChordType;
  rootNote?: NoteType;
  scaleMode?: ScaleMode;
};

export type ChordBar = string[][];

export const getChordBarsFromProgression = (
  scaleInfo: ScaleNotesInfo
): ChordBar[] => {
  let scale = scribble.scale(`${scaleInfo.note}0 ${scaleInfo.scaleMode}`);

  return scaleInfo.degrees.map(
    (bar) =>
      bar?.map((degree) => {
        if (degree.scaleMode && degree.rootNote) {
          scale = scribble.scale(`${degree.rootNote}0 ${degree.scaleMode}`);
        }

        const chordInfo = getChordForDegree(scaleInfo.scaleMode, degree.value);
        const currentNote = scale[degree.value - 1].replace("0", "");
        const chordType: FixedChordType = degree.chordType ?? "basic";
        return getChord(currentNote, chordInfo[chordType], degree.octave);
      }) ?? []
  );
};
