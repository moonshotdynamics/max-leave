'use client';
import React, { useState } from 'react';

interface SuggestionsListProps {
  suggestions: string[];
  leaveDays: number;
  year: number;
  totalLeaveDays: number;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  leaveDays,
  year,
  totalLeaveDays,
}) => {
  const [showGrouped, setShowGrouped] = useState<boolean>(false);
  // Function to chunk the suggestions array for desktop layout
  const chunkArrayDesktop = (arr: string[], size: number) =>
    arr.reduce((chunks, item, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!chunks[chunkIndex]) {
        chunks[chunkIndex] = []; // start a new chunk
      }
      chunks[chunkIndex].push(item);
      return chunks;
    }, [] as string[][]);

  // Chunk the suggestions into sub-arrays of max 5 items for desktop layout
  const chunkedSuggestionsDesktop = chunkArrayDesktop(suggestions, 5);

  return (
    <div className="mt-10">
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
        {`To optimize your ${leaveDays} leave days for ${year}, I recommend you take the following days off: `}
      </p>

      {/* Mobile layout: Each suggestion in its own row */}
      <div className="mt-5 block sm:hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {suggestions.map((day, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {day}
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
            {chunkedSuggestionsDesktop.map((chunk, rowIndex) => (
              <tr key={rowIndex}>
                {chunk.map((day, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {day}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5">
        {`As a result of taking the following leave days, you have optimized your leave days from ${leaveDays} days to a total of ${totalLeaveDays} days for the year.`}
      </p>
    </div>
  );
};

export default SuggestionsList;
