import type { NoteType } from "../Data/Notes";
import type { ScaleMode } from "../Data/ScaleMode";
import { getChord } from "./chordUtils";
import { getChordForDegree } from "./scales";
import * as scribble from "scribbletune";

export type Degree = {
  val: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  oct: number;
};

export const getChordsByProgression = (
  note: NoteType,
  scaleMode: ScaleMode,
  degrees: Degree[]
):string[][] => {
 const scale =scribble.scale(`${note}0 ${scaleMode}`);
  const res = degrees.map(d=>{
    const chord = getChordForDegree(scaleMode, d.val);
    
    const currentNote= scale[d.val-1].replace("0","");
    return getChord(currentNote, chord.primary[0], d.oct);
  })
  return res;
};
