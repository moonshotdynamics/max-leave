// Assuming this is the structure of your public holiday data
interface PublicHoliday {
  date: string; // in the format 'YYYY-MM-DD'
  name: string;
}

export default function optimizeLeaveDays(
  year: number,
  country: string,
  publicHolidays: PublicHoliday[],
  availableLeaveDays: number
): string {
  // Helper functions
  const formatDate = (date: Date) => `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${date.getDate()} ${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getFullYear()}`;
  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;
  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Sort holidays by date
  publicHolidays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Initialize variables
  let optimizedDaysOff = [];
  let originalLeaveDays = availableLeaveDays;
  let tempDate;

  for (let holiday of publicHolidays) {
    tempDate = new Date(holiday.date);

    // Check the day before the holiday
    let dayBefore = addDays(tempDate, -1);
    if (!isWeekend(dayBefore) && availableLeaveDays > 0) {
      optimizedDaysOff.push(dayBefore);
      availableLeaveDays--;
    }

    // Check the day after the holiday
    let dayAfter = addDays(tempDate, 1);
    if (!isWeekend(dayAfter) && availableLeaveDays > 0) {
      optimizedDaysOff.push(dayAfter);
      availableLeaveDays--;
    }
  }

  // Sort optimized days off
  optimizedDaysOff.sort((a, b) => a.getTime() - b.getTime());

  // Formatting the result
  let recommendation = `To optimize your ${originalLeaveDays} leave days for ${year}, I recommend you take the following days off: `;

  for (let i = 0; i < optimizedDaysOff.length; i++) {
    recommendation += `\n- ${formatDate(optimizedDaysOff[i])}`;
  }

  let optimizedLeave = originalLeaveDays + optimizedDaysOff.length;
  recommendation += `\n\nAs a result of taking the following leave days, you have optimized your leave days from ${originalLeaveDays} days to a total of ${optimizedLeave} days for the year.`;

  console.log(recommendation);

  return recommendation;
}



