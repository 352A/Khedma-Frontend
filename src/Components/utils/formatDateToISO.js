export default function formatDateToISO(dateObj) {
  const { day, month, year } = dateObj;
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  return `${year}-${formattedMonth}-${formattedDay}`;
}
