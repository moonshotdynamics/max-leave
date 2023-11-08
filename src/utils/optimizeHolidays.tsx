// Assuming this is the structure of your public holiday data
interface PublicHoliday {
  date: string; // in the format 'YYYY-MM-DD'
  name: string;
}

function optimizeLeaveDays(
  year: number,
  country: string,
  publicHolidays: PublicHoliday[],
  availableLeaveDays: number
): string[] {
  // Helper function to check if a date is a public holiday
  const isPublicHoliday = (date: Date) =>
    publicHolidays.some((holiday) => holiday.date === formatDate(date));

  // Helper function to format a date as 'YYYY-MM-DD'
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  // Helper function to add days to a date
  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  let optimizedDaysOff: string[] = [];
  let tempDate: Date;

  for (const holiday of publicHolidays) {
    const holidayDate = new Date(holiday.date);
    const dayOfWeek = holidayDate.getDay();

    // Check the day before the holiday
    tempDate = addDays(holidayDate, -1);
    if (
      dayOfWeek !== 1 &&
      availableLeaveDays > 0 &&
      !isPublicHoliday(tempDate)
    ) {
      optimizedDaysOff.push(formatDate(tempDate));
      availableLeaveDays--;
    }

    // Always add the public holiday
    optimizedDaysOff.push(formatDate(holidayDate));

    // Check the day after the holiday
    tempDate = addDays(holidayDate, 1);
    if (
      dayOfWeek !== 0 &&
      availableLeaveDays > 0 &&
      !isPublicHoliday(tempDate)
    ) {
      optimizedDaysOff.push(formatDate(tempDate));
      availableLeaveDays--;
    }
  }

  // Sort the dates to be in chronological order
  optimizedDaysOff.sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return optimizedDaysOff;
}

// Example usage:
const year = 2023;
const country = 'US';
const publicHolidays: PublicHoliday[] = [
  // This should be replaced with actual public holiday data
  { date: '2023-01-01', name: "New Year's Day" },
  // ... other holidays
];
const availableLeaveDays = 10;

const optimizedLeave = optimizeLeaveDays(
  year,
  country,
  publicHolidays,
  availableLeaveDays
);
console.log(optimizedLeave);
