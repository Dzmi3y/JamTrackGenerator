import type { ChordType } from "../Data/Chords";
import type { FixedChordType } from "../Data/ScaleDegree";
import type { ScaleNotesInfo } from "../types/scaleNotesInfo";
import { getChord } from "./chordUtils";
import { getChordForDegree } from "./scales";
import * as scribble from "scribbletune";

export type Degree = {
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  octave: number;
  generalChordType?: FixedChordType;
  concreteChordType?: ChordType;
};

export type ChordBar = string[][];

export const getChordBarsFromProgression = (
  scaleInfo: ScaleNotesInfo
): ChordBar[] => {
  const scale = scribble.scale(`${scaleInfo.note}0 ${scaleInfo.scaleMode}`);

  return scaleInfo.degrees.map(
    (bar) =>
      bar?.map((degree) => {
        const currentNote = scale[degree.value - 1]
          .replace("0", "")
          .replace("1", "")
          .replace("2", "")
          .replace("-1", "");

        if (degree.concreteChordType) {
          return getChord(currentNote, degree.concreteChordType, degree.octave);
        } else {
          const chordInfo = getChordForDegree(
            scaleInfo.scaleMode,
            degree.value
          );
          const chordType: FixedChordType = degree.generalChordType ?? "basic";
          return getChord(currentNote, chordInfo[chordType], degree.octave);
        }
      }) ?? []
  );
};
