import type { PatternBar } from "../types/patternBlock";
import type { SampleInstrument } from "../types/SampleInstrument";
import { getPartInfo } from "../utils/patternUtils";
import { partBuilderService, type PartResult } from "./partBuilderService";

class InstrumentPartService {
  getPart(
    instrumentName: SampleInstrument,
    patternBlocks: PatternBar[] | undefined,
    bpm: number
  ): PartResult | undefined {
    if (!patternBlocks) return undefined;

    switch (instrumentName) {
      case "drums":
        return this.getDrumPart(patternBlocks, bpm);
      case "piano":
        return this.getInstrumentPart(patternBlocks, bpm);

      default:
        return undefined;
    }
  }

  private getInstrumentPart(
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

  private getDrumPart(
    instruments: PatternBar[],
    bpm: number
  ): PartResult | undefined {
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
