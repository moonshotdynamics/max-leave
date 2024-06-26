interface PublicHoliday {
  date: string; // in the format 'YYYY-MM-DD'
  name: string;
}

interface OptimizeLeaveDaysResult {
  days: string[];
  totalLeaveDays: number;
  timelineItems: any[];
  timelineGroups: any[];
}
export default function optimizeLeaveDays(
  publicHolidays: PublicHoliday[],
  availableLeaveDays: number,
  startDate: string,
  endDate: string
): OptimizeLeaveDaysResult | null {
  // Helper functions
  const startOptimizationDate = new Date(startDate);
  const endOptimizationDate = new Date(endDate);
  const formatDate = (date: Date) =>
    `${date.toLocaleDateString('en-US', {
      weekday: 'long',
    })}, ${date.getDate()} ${date.toLocaleDateString('en-US', {
      month: 'long',
    })} ${date.getFullYear()}`;
  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setHours(result.getHours() + days * 24); // Add 24 hours for each day
  return result;
};
  const isPublicHoliday = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]; // Get date in 'YYYY-MM-DD' format
    return publicHolidays.some((holiday) => holiday.date === dateString);
  };

  // Sort holidays by date
  publicHolidays.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group holidays that are close together
  let holidayGroups = [];
  let currentGroup = [];
  for (let i = 0; i < publicHolidays.length; i++) {
    currentGroup.push(publicHolidays[i]);
    if (
      i === publicHolidays.length - 1 ||
      new Date(publicHolidays[i + 1].date).getTime() -
        new Date(publicHolidays[i].date).getTime() >
        1000 * 60 * 60 * 24 * 2
    ) {
      holidayGroups.push(currentGroup);
      currentGroup = [];
    }
  }

  // Initialize variables
  let optimizedDaysOff: Date[] = [];
  let originalLeaveDays = availableLeaveDays;

  // Function to check if a date is already in the optimizedDaysOff array
  // Function to check if a date is already in the optimizedDaysOff array
const isDateAlreadyOptimized = (date: Date) => {
  return optimizedDaysOff.some(
    (optimizedDate) =>
      optimizedDate.getFullYear() === date.getFullYear() &&
      optimizedDate.getMonth() === date.getMonth() &&
      optimizedDate.getDate() === date.getDate()
  );
};

  for (let group of holidayGroups) {
    let firstHoliday = new Date(group[0].date);
    let lastHoliday = new Date(group[group.length - 1].date);

    // Skip the group if it's before the start date
    if (lastHoliday < startOptimizationDate) continue;

    // Check the days before and after the group
    let dayBefore = addDays(firstHoliday, -1);
    let dayAfter = addDays(lastHoliday, 1);
    while (
      availableLeaveDays > 0 &&
      dayBefore >= startOptimizationDate && // Skip days before the start date
      dayBefore <= endOptimizationDate && // Skip days after the end date
      !isWeekend(dayBefore) &&
      !isPublicHoliday(dayBefore) &&
      !(dayBefore.getDay() === 5 && firstHoliday.getDay() === 6) &&
      !isDateAlreadyOptimized(dayBefore)
    ) {
      optimizedDaysOff.push(new Date(dayBefore));
      availableLeaveDays--;
      dayBefore = addDays(dayBefore, -1); // Move to the previous day
    }
    while (
      availableLeaveDays > 0 &&
      dayAfter >= startOptimizationDate && // Skip days before the start date
      dayAfter <= endOptimizationDate && // Skip days after the end date
      !isWeekend(dayAfter) &&
      !isPublicHoliday(dayAfter) &&
      !isDateAlreadyOptimized(dayAfter)
    ) {
      optimizedDaysOff.push(new Date(dayAfter));
      availableLeaveDays--;
      dayAfter = addDays(dayAfter, 1); // Move to the next day
    }
  }
  // If there are still available leave days after optimizing around holidays,
  // continue to allocate them sequentially
let currentDate = startOptimizationDate;
while (availableLeaveDays > 0 && currentDate <= endOptimizationDate) {
  if (
    !isWeekend(currentDate) &&
    !isPublicHoliday(currentDate) &&
    !isDateAlreadyOptimized(new Date(currentDate))
  ) {
    optimizedDaysOff.push(new Date(currentDate));
    availableLeaveDays--;
  }
  currentDate = addDays(currentDate, 1);
}

  // Calculate totalLeaveDays after excluding days before the start date
  let totalLeaveDays = originalLeaveDays - availableLeaveDays;

  // Count the number of public holidays and weekends within the optimized days off
  let firstDayOff = optimizedDaysOff[0];
  let lastDayOff = optimizedDaysOff[optimizedDaysOff.length - 1];
  for (
    let d = new Date(firstDayOff);
    d <= lastDayOff;
    d.setDate(d.getDate() + 1)
  ) {
    if (isPublicHoliday(d)) {
      totalLeaveDays++;
    }
  }

  // Sort optimized days off
  optimizedDaysOff.sort((a, b) => a.getTime() - b.getTime());

  // Formatting the result
  let days = [];

  for (let i = 0; i < optimizedDaysOff.length; i++) {
    days.push(formatDate(optimizedDaysOff[i]));
  }

  const timelineItems = optimizedDaysOff.map((day, index) => ({
    id: index + 1,
    group: 1,
    start_time: day,
    end_time: addDays(day, 1),
    title: 'Leave Day',
  }));

  const timelineGroups = [{ id: 1, title: 'Leave Days' }];
  
  return { days, totalLeaveDays, timelineItems, timelineGroups };
}
