export function dateDifferenceInDays(date1, date2) {
  const startDate = new Date(date1);
  const endDate = new Date(date2);
  const differenceInTime = endDate - startDate;
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  return differenceInDays;
}
