// // Types and interfaces
// interface PublicHoliday {
//   date: string;
//   name: string;
// }

// interface OptimizeLeaveDaysResult {
//   longBreaks: {
//     days: string[];
//     totalLeaveDays: number;
//   };
//   spreadOut: {
//     days: string[];
//     totalLeaveDays: number;
//   };
// }

// // Main function
// export default function optimizeLeaveDays(
//   year: number,
//   publicHolidays: PublicHoliday[],
//   availableLeaveDays: number
// ): OptimizeLeaveDaysResult {
//   // Helper functions
//   const isWeekend = (date: Date) => {
//     const dayOfWeek = date.getDay();
//     return dayOfWeek === 0 || dayOfWeek === 6;
//   };

//   const formatDate = (date: Date) => {
//     return date.toISOString().split('T')[0];
//   };

//   const getDayAfter = (date: Date) => {
//     const nextDay = new Date(date);
//     nextDay.setDate(nextDay.getDate() + 1);
//     return nextDay;
//   };

//   const isPublicHoliday = (date: Date) => {
//     const formattedDate = formatDate(date);
//     return publicHolidays.some((holiday) => holiday.date === formattedDate);
//   };

//   // Strategy 1: Maximize Long Breaks
//   const maximizeLongBreaks = (leaveDays: number) => {
//     let daysOff = new Set<string>();
//     let currentDate = new Date(year, 0, 1); // Start from Jan 1st

//     while (leaveDays > 0 && currentDate.getFullYear() === year) {
//       if (!isWeekend(currentDate) && !isPublicHoliday(currentDate)) {
//         daysOff.add(formatDate(currentDate));
//         leaveDays--;
//       }
//       currentDate = getDayAfter(currentDate);
//     }
//     console.log(Array.from(daysOff));

//     return Array.from(daysOff);
//   };

//   // Strategy 2: Spread Out Leave Days
//   const spreadOutLeaveDays = (leaveDays: number) => {
//     let daysOff = new Set<string>();
//     let currentDate = new Date(year, 0, 1); // Start from Jan 1st
//     let interval = Math.ceil(365 / leaveDays);

//     while (leaveDays > 0 && currentDate.getFullYear() === year) {
//       if (!isWeekend(currentDate) && !isPublicHoliday(currentDate)) {
//         daysOff.add(formatDate(currentDate));
//         leaveDays--;
//         currentDate.setDate(currentDate.getDate() + interval);
//       } else {
//         currentDate = getDayAfter(currentDate);
//       }
//     }

//     return Array.from(daysOff);
//   };

//   // Implementing the strategies
//   const longBreaksDaysOff = maximizeLongBreaks(availableLeaveDays);
//   const spreadOutDaysOff = spreadOutLeaveDays(availableLeaveDays);

//   console.log(longBreaksDaysOff, 'LONG');
//   console.log(spreadOutDaysOff);


//   return {
//     longBreaks: {
//       days: longBreaksDaysOff,
//       totalLeaveDays: longBreaksDaysOff.length,
//     },
//     spreadOut: {
//       days: spreadOutDaysOff,
//       totalLeaveDays: spreadOutDaysOff.length,
//     }
//   };
// }


// interface PublicHoliday {
//   date: string; // in the format 'YYYY-MM-DD'
//   name: string;
// }

// interface OptimizeLeaveDaysResult {
//   days: string[];
//   totalLeaveDays: number;
//   timelineItems: any[];
//   timelineGroups: any[];
// }

// function optimizeLeaveDaysBackup(
//   year: number,
//   publicHolidays: PublicHoliday[],
//   availableLeaveDays: number,
//   startDate: string
// ): OptimizeLeaveDaysResult {
//   // Helper functions
//   const startOptimizationDate = new Date(startDate);
//   const formatDate = (date: Date) =>
//     `${date.toLocaleDateString('en-US', {
//       weekday: 'long',
//     })}, ${date.getDate()} ${date.toLocaleDateString('en-US', {
//       month: 'long',
//     })} ${date.getFullYear()}`;
//   const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;
//   const addDays = (date: Date, days: number) => {
//     const result = new Date(date);
//     result.setDate(result.getDate() + days);
//     return result;
//   };
//   const isPublicHoliday = (date: Date) => {
//     const dateString = date.toISOString().split('T')[0]; // Get date in 'YYYY-MM-DD' format
//     return publicHolidays.some((holiday) => holiday.date === dateString);
//   };

//   // Sort holidays by date
//   publicHolidays.sort(
//     (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//   );

//   // Initialize variables
//   let optimizedDaysOff = [];
//   let originalLeaveDays = availableLeaveDays;
//   let tempDate;

//   for (let holiday of publicHolidays) {
//     tempDate = new Date(holiday.date);

//     // Skip the holiday if it's before the start date
//     if (tempDate < startOptimizationDate) continue;

//     // Check the days before and after the holiday together
//     let dayBefore = addDays(tempDate, -1);
//     let dayAfter = addDays(tempDate, 1);
//     while (
//       availableLeaveDays > 0 &&
//       !isWeekend(dayBefore) &&
//       !isPublicHoliday(dayBefore) &&
//       !(dayBefore.getDay() === 5 && tempDate.getDay() === 6)
//     ) {
//       optimizedDaysOff.push(dayBefore);
//       availableLeaveDays--;
//       dayBefore = addDays(dayBefore, -1); // Move to the previous day
//     }
//     while (
//       availableLeaveDays > 0 &&
//       !isWeekend(dayAfter) &&
//       !isPublicHoliday(dayAfter)
//     ) {
//       optimizedDaysOff.push(dayAfter);
//       availableLeaveDays--;
//       dayAfter = addDays(dayAfter, 1); // Move to the next day
//     }
//   }

//   // Calculate totalLeaveDays after excluding days before the start date
//   let totalLeaveDays = originalLeaveDays + optimizedDaysOff.length;

//   // Sort optimized days off
//   optimizedDaysOff.sort((a, b) => a.getTime() - b.getTime());

//   // Formatting the result
//   let recommendation = `To optimize your ${originalLeaveDays} leave days for ${year}, I recommend you take the following days off: `;

//   let days = [];

//   for (let i = 0; i < optimizedDaysOff.length; i++) {
//     days.push(formatDate(optimizedDaysOff[i]));
//   }

//   const timelineItems = optimizedDaysOff.map((day, index) => ({
//     id: index + 1,
//     group: 1,
//     start_time: day,
//     end_time: addDays(day, 1),
//     title: 'Leave Day',
//   }));

//   const timelineGroups = [{ id: 1, title: 'Leave Days' }];

//   recommendation += `\n\nAs a result of taking the following leave days, you have optimized your leave days from ${originalLeaveDays} days to a total of ${totalLeaveDays} days for the year.`;

//   return { days, totalLeaveDays, timelineItems, timelineGroups };
// }
