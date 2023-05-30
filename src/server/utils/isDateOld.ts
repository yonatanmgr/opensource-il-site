export function isDateOlderThanDays(inputDate: Date, days: number) {
  // Calculate the date that was 'days' days ago
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - days);

  return inputDate < daysAgo;
}
