import type { ScaleNotesInfo } from "../types/scaleNotesInfo";
import { getChord } from "./chordUtils";
import { getChordForDegree } from "./scales";
import * as scribble from "scribbletune";

export type Degree = {
  val: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  oct: number;
};

export const getChordsByProgression = (
  info:ScaleNotesInfo
):string[][] => {
 const scale =scribble.scale(`${info.note}0 ${info.scaleMode}`);
  const res = info.degrees.map(d=>{
    const chord = getChordForDegree(info.scaleMode, d.val);
    
    const currentNote= scale[d.val-1].replace("0","");
    return getChord(currentNote, chord.primary[0], d.oct);
  })
  return res;
};
