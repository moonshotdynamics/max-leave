import React from 'react';

interface SuggestedLeaveDay {
  leaveDate: string;
  reason: string;
  year: number;
  leaveDays: number;
}

interface SuggestionsListProps {
  suggestions: SuggestedLeaveDay[];
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions, year, leaveDays }) => {
  return (
    <div className="mt-10">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Suggested Leave Days
      </h3>

      <p>
        {/* {`To optimize your ${leaveDays} leave days for ${year}, I recommend you take the following days off: `} */}
        {suggestions}
      </p>
      {/* <ul className="mt-5 border-t border-gray-200 divide-y divide-gray-200">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="py-4 flex flex-col">
            <p className="text-sm font-medium text-gray-900">
              {suggestion.leaveDate}
            </p>
            <p className="text-sm text-gray-500">{suggestion.reason}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default SuggestionsList;
