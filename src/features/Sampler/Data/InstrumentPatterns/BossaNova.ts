import type { BarInfo } from "../../utils/buildPatternBars";
import {
  getChordBarsFromProgression,
  type ChordBar,
} from "../../utils/progressionUtil";
import type { NoteType } from "../Notes";
import { Rhythms, type RhythmSize, type RhythmType } from "../Rhythms";

export const MinorBossaNova = () => {
  const PianoHigh = (rootNote: NoteType): Array<BarInfo> => {
    const rhythm: RhythmType = Rhythms.basic;
    const rhythmSize: RhythmSize = 1;

    const bars: ChordBar[] = getChordBarsFromProgression({
      note: rootNote,
      scaleMode: "dorian", 
      degrees: [
        [{ value: 1, octave: 4, concreteChordType: "m7" }],      
        [{ value: 1, octave: 4, concreteChordType: "m7" }],       
        [{ value: 4, octave: 4, concreteChordType: "m7" }],      
        [{ value: 5, octave: 4, concreteChordType: "7th" }],      

        [{ value: 1, octave: 4, concreteChordType: "m7" }],        
        [{ value: 1, octave: 4, concreteChordType: "m7" }],        
        [{ value: 2, octave: 4, concreteChordType: "m7b5" }],      
        [{ value: 5, octave: 4, concreteChordType: "7b9" }],      

        [{ value: 4, octave: 4, concreteChordType: "m7" }],       
        [{ value: 2, octave: 4, concreteChordType: "m7b5" }],    
        [{ value: 5, octave: 4, concreteChordType: "7b9" }],      
        [{ value: 5, octave: 4, concreteChordType: "7th" }],       
      ],
    });

    return bars
      .map((b) => {
        return {
          note: b,
          rhythm: rhythm,
          rhythmSize: rhythmSize,
        };
      })
      .flat();
  };
  
  return { PianoHigh };
};