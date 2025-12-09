export function ticksToSeconds(
  ticks: number,
  bpm: number = 120,
  ticksPerQuarter: number = 64
): number {
  const secondsPerQuarter = 60 / bpm;
  const quarterNotes = ticks / ticksPerQuarter;
  const raw = quarterNotes * secondsPerQuarter;
  return Math.round(raw * 1000) / 1000;
}

export function secondsToTicks(
  seconds: number,
  bpm: number = 120,
  ticksPerQuarter: number = 64
): number {
  const secondsPerQuarter = 60 / bpm;
  const quarterNotes = seconds / secondsPerQuarter;
  return Math.round(quarterNotes * ticksPerQuarter);
}
