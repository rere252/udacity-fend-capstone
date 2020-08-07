export function daysBetween(date1, date2) {
  const diffMS = Math.abs(date1.getTime() - date2.getTime());
  const secInMS = 1000;
  const minuteInMS = 60 * secInMS;
  const hourInMS = 60 * minuteInMS;
  const dayInMS = 24 * hourInMS;
  const diffDays = Math.ceil(diffMS / dayInMS);
  return diffDays;
}
