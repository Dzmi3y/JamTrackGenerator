import type { PatternBar } from "../patternBlock";
import { getPartInfo } from "../utils/patternUtils";
import { partBuilderService, type PartResult } from "./partBuilderService";

class InstrumentPartService {
  getInstrumentPart(
    patternBlocks: PatternBar[],
    bpm: number
  ): PartResult | undefined {
    const validPartInfo = patternBlocks
      .map((patternBlock) =>
        getPartInfo(patternBlock.note, patternBlock.id, patternBlock.barNumber)
      )
      .filter(
        (partInfo): partInfo is NonNullable<typeof partInfo> =>
          partInfo !== undefined
      );

    if (validPartInfo.length === 0) {
      return undefined;
    }

    return partBuilderService.getPart(validPartInfo, bpm);
  }

  getDrumPart(instruments: PatternBar[], bpm: number): PartResult | undefined {
    const infos = instruments
      .map(({ note, id, barNumber }) => getPartInfo(note, id, barNumber))
      .filter((r) => r !== undefined);

    if (infos.length !== instruments.length) {
      return undefined;
    }

    const parts = infos.map((info) => partBuilderService.getPart([info], bpm));
    const totalDuration = parts[parts.length - 1].totalDuration;

    return {
      totalDuration,
      part: parts.flatMap((p) => p.part),
    };
  }
}

export const instrumentPartService = new InstrumentPartService();
