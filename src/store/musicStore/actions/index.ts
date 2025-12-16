import type { MusicState, MusicStore, SetState } from "../types";
import { createTrackActions } from "./trackActions";
import { createBpmActions } from "./bpmActions";
import { createTimeSignatureActions } from "./timeSignatureActions";

export const createActions = (set: SetState): Omit<MusicStore, keyof MusicState> => ({
  ...createTrackActions(set),
  ...createBpmActions(set),
  ...createTimeSignatureActions(set),
});