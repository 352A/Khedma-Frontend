export default function formatDate(isoDateString) {
  const date = new Date(isoDateString);

  // Check for invalid date
  if (isNaN(date.getTime())) {
    return "تاريخ غير صالح"; // Return an error message in Arabic
  }

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  // Check if the date is within the current week
  const isWithinWeek = date >= startOfWeek && date <= today;

  // Arabic-Egypt format options
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24-hour format
  };

  if (isWithinWeek) {
    // Format day name in Arabic
    const dayNames = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    return dayNames[date.getDay()]; // Return the Arabic name of the day
  } else {
    // Calculate the difference in days
    const timeDifference = today - date;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert ms to days

    return `منذ ${daysDifference} يوم${daysDifference > 1 ? "ًا" : ""}`; // Return the days passed in Arabic
  }
}
