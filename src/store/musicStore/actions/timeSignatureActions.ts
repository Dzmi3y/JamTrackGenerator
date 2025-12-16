import type { MusicStore, SetState } from "../types";

export const createTimeSignatureActions = (set: SetState): Pick<MusicStore, "setTimeSignature"> => ({
  setTimeSignature: (newTimeSignature: [number, number]) => {
    set((state) => {
      const [currNum, currDen] = state.timeSignature;
      const [newNum, newDen] = newTimeSignature;
      
      if (currNum === newNum && currDen === newDen) return state;
      
      return { timeSignature: newTimeSignature };
    });
  },
});