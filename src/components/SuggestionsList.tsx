'use client';
import React, { useState, useEffect } from 'react';

interface PublicHoliday {
  date: string; // in the format 'YYYY-MM-DD'
  name: string;
}

interface SuggestionsListProps {
  suggestions: string[];
  leaveDays: number;
  year: number;
  totalLeaveDays: number;
  publicHolidays: PublicHoliday[];
}

interface SuggestionObject {
  date: Date;
  label: string;
  isPublicHoliday: boolean;
}


const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  leaveDays,
  // year,
  // totalLeaveDays,
  publicHolidays
}) => {
  const [showGrouped, setShowGrouped] = useState<boolean>(false);
  const [chunkSize, setChunkSize] = useState<number>(4);

  const suggestionObjects = suggestions.map((suggestion) => ({
    date: new Date(suggestion),
    label: suggestion,
    isPublicHoliday: false,
  }));

  const publicHolidayObjects = publicHolidays.map((holiday) => {
    const holidayDate = new Date(holiday.date);
    const label = holidayDate.toLocaleDateString('en-US', {
      weekday: 'long', // e.g., Monday
      year: 'numeric', // e.g., 2024
      month: 'long', // e.g., January
      day: 'numeric', // e.g., 2
    });
    return {
      date: holidayDate,
      label: `${label} (${holiday.name})`,
      isPublicHoliday: true,
    };
  });

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Find the first and last dates in the suggestions
  const firstSuggestionDate = suggestionObjects[0].date;
  const lastSuggestionDate =
    suggestionObjects[suggestionObjects.length - 1].date;

  // Find the first public holiday before the first suggestion date
  const firstRelevantPublicHolidayIndex = publicHolidayObjects.findIndex(
    (holiday) => holiday.date >= firstSuggestionDate
  );
  const firstRelevantPublicHoliday =
    firstRelevantPublicHolidayIndex > 0
      ? publicHolidayObjects[firstRelevantPublicHolidayIndex - 1]
      : publicHolidayObjects[0]; // If no earlier holiday, take the first one

  // Find the first public holiday after the last suggestion date
  const lastRelevantPublicHolidayIndex = publicHolidayObjects.findIndex(
    (holiday) => holiday.date > lastSuggestionDate
  );
  const lastRelevantPublicHoliday =
    lastRelevantPublicHolidayIndex >= 0
      ? publicHolidayObjects[lastRelevantPublicHolidayIndex]
      : publicHolidayObjects[publicHolidayObjects.length - 1]; // If no later holiday, take the last one

  // Filter the publicHolidayObjects to include only the relevant holidays
  const relevantPublicHolidays = publicHolidayObjects.filter(
    (holiday) =>
      holiday.date >= firstRelevantPublicHoliday.date &&
      holiday.date <= lastRelevantPublicHoliday.date
  );

  // Merge and sort the arrays
  const mergedSuggestions = [...suggestionObjects, ...relevantPublicHolidays]
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((item) => ({
      ...item,
      label: item.isPublicHoliday ? item.label : formatDate(item.date),
    }));

  useEffect(() => {
    const handleResize = () => {
      // Set chunk size to 3 for tablet devices (768px to 1023px)
      if (window.innerWidth >= 641 && window.innerWidth < 1024) {
        setChunkSize(3);
      }
      if (window.innerWidth >= 475 && window.innerWidth < 641) {
        setChunkSize(2);
      } else {
        setChunkSize(4); // Default chunk size for desktop
      }
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to chunk the suggestions array for desktop layout
  const chunkArray = (arr: any[], size: number) =>
    arr.reduce((chunks, item, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!chunks[chunkIndex]) {
        chunks[chunkIndex] = []; // start a new chunk
      }
      chunks[chunkIndex].push(item);
      return chunks;
    }, [] as any[][]);

  // Chunk the suggestions into sub-arrays based on chunkSize
  const chunkedMergedSuggestions = chunkArray(mergedSuggestions, chunkSize);

  return (
    <div className="mt-10 py-8">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Suggested Leave Days
      </h3>

      {/* <button
        className="mt-2 p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-700 transition"
        onClick={() => setShowGrouped(!showGrouped)}
      >
        Show grouped
      </button> */}

      <p>
        {`To optimize your ${leaveDays} leave days, I recommend you take the following days off: `}
      </p>

      <p className='text-xs text-red-600'>
        <em>*There is no need to take the public holidays off</em>
      </p>

      {/* Mobile layout: Each suggestion in its own row */}
      <div className="mt-5 block sm:hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {mergedSuggestions.map((item, index) => (
              <tr key={index}>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    item.isPublicHoliday ? 'text-red-600' : 'text-gray-900'
                  }`}
                >
                  {item.label}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Desktop layout: Chunked suggestions */}
      <div className="hidden sm:block mt-5">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {chunkedMergedSuggestions.map(
              (chunk: SuggestionObject[], rowIndex: number) => (
                <tr key={rowIndex}>
                  {chunk.map((item, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        item.isPublicHoliday ? 'text-red-600' : 'text-gray-900'
                      }`}
                    >
                      {item.label}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* <p className="mt-5">
        {`As a result of taking the following leave days, you have optimized your leave days from ${leaveDays} days to a total of ${totalLeaveDays} days for the year.`}
      </p> */}
    </div>
  );
};

export default SuggestionsList;
