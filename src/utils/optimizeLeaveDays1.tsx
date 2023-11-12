// Types and interfaces
interface PublicHoliday {
  date: string;
  name: string;
}

interface OptimizeLeaveDaysResult {
  longBreaks: {
    days: string[];
    totalLeaveDays: number;
  };
  spreadOut: {
    days: string[];
    totalLeaveDays: number;
  };
}

// Main function
export default function optimizeLeaveDays(
  year: number,
  publicHolidays: PublicHoliday[],
  availableLeaveDays: number
): OptimizeLeaveDaysResult {
  // Helper functions
  const isWeekend = (date: Date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getDayAfter = (date: Date) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  };

  const isPublicHoliday = (date: Date) => {
    const formattedDate = formatDate(date);
    return publicHolidays.some((holiday) => holiday.date === formattedDate);
  };

  // Strategy 1: Maximize Long Breaks
  const maximizeLongBreaks = (leaveDays: number) => {
    let daysOff = new Set<string>();
    let currentDate = new Date(year, 0, 1); // Start from Jan 1st

    while (leaveDays > 0 && currentDate.getFullYear() === year) {
      if (!isWeekend(currentDate) && !isPublicHoliday(currentDate)) {
        daysOff.add(formatDate(currentDate));
        leaveDays--;
      }
      currentDate = getDayAfter(currentDate);
    }
    console.log(Array.from(daysOff));

    return Array.from(daysOff);
  };

  // Strategy 2: Spread Out Leave Days
  const spreadOutLeaveDays = (leaveDays: number) => {
    let daysOff = new Set<string>();
    let currentDate = new Date(year, 0, 1); // Start from Jan 1st
    let interval = Math.ceil(365 / leaveDays);

    while (leaveDays > 0 && currentDate.getFullYear() === year) {
      if (!isWeekend(currentDate) && !isPublicHoliday(currentDate)) {
        daysOff.add(formatDate(currentDate));
        leaveDays--;
        currentDate.setDate(currentDate.getDate() + interval);
      } else {
        currentDate = getDayAfter(currentDate);
      }
    }

    return Array.from(daysOff);
  };

  // Implementing the strategies
  const longBreaksDaysOff = maximizeLongBreaks(availableLeaveDays);
  const spreadOutDaysOff = spreadOutLeaveDays(availableLeaveDays);

  console.log(longBreaksDaysOff, 'LONG');
  console.log(spreadOutDaysOff);


  return {
    longBreaks: {
      days: longBreaksDaysOff,
      totalLeaveDays: longBreaksDaysOff.length,
    },
    spreadOut: {
      days: spreadOutDaysOff,
      totalLeaveDays: spreadOutDaysOff.length,
    }
  };
}
