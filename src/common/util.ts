export function daysBetween(d1: Date, d2: Date): number {
  const diffMS = Math.abs(d1.getTime() - d2.getTime());
  const secInMS = 1000;
  const minuteInMS = 60 * secInMS;
  const hourInMS = 60 * minuteInMS;
  const dayInMS = 24 * hourInMS;
  const diffDays = Math.ceil(diffMS / dayInMS);
  return diffDays;
}
