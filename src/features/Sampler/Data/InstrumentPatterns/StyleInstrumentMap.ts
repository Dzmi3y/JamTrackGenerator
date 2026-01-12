import { Blues } from "./Blues";
import { BossaNova } from "./BossaNova";
import type { InstrumentPatternsProps } from "./InstrumentPatternsProps";
import type { MusicalStyleType } from "./MusicalStyleType";
import { Rock } from "./Rock";

export const StyleInstrumentMap = new Map<
  MusicalStyleType,
  InstrumentPatternsProps
>([
  ["Blues", Blues],
  ["BossaNova", BossaNova],
  ["Rock", Rock],
]);
