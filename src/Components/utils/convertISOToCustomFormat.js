export default function convertISOToCustomFormat(isoDateString) {
  const date = new Date(isoDateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");
  return `${year}-${formattedMonth}-${formattedDay}`;
}
