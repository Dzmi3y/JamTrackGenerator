import type { ScaleNotesInfo } from "../types/scaleNotesInfo";
import { getChord } from "./chordUtils";
import { getChordForDegree } from "./scales";
import * as scribble from "scribbletune";

export type Degree = {
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  octave: number;
};

export type ChordBar = string[][];

export const getChordBarsFromProgression = (
  scaleInfo: ScaleNotesInfo
): ChordBar[] => {
  const scale = scribble.scale(`${scaleInfo.note}0 ${scaleInfo.scaleMode}`);
  
  return scaleInfo.degrees.map(bar => 
    bar?.map(degree => {
      const chordInfo = getChordForDegree(scaleInfo.scaleMode, degree.value);
      const currentNote = scale[degree.value - 1].replace("0", "");
       return getChord(currentNote, chordInfo.primary[0], degree.octave); //TODO: add different chord types
    }) ?? []
  );
};