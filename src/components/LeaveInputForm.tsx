import React, { useState, FormEvent } from 'react';

interface LeaveInputFormProps {
  onSubmit: (leaveDays: number, country: string, startDate: string, endDate: string) => void;
  countries: { name: string; code: string }[];
  leaveDays: number;
  setLeaveDays(leaveDays: number): void;
  year: number;
  setYear(year: number): void;
  startDate: string;
  setStartDate(startDate: string): void;
  startDateRef: {
    current: string
  };
  endDateRef: {
    current: string
  }
  endDate: string;
  setEndDate(endDate: string): void;
}

const LeaveInputForm: React.FC<LeaveInputFormProps> = ({
  onSubmit,
  countries,
  leaveDays,
  setLeaveDays,
  year,
  setYear,
  startDate,
  setStartDate,
  startDateRef,
  endDateRef,
  endDate,
  setEndDate
}) => {
  const [country, setCountry] = useState<string>('');
  const [endDateError, setEndDateError] = useState<string>('');
  const [leaveDaysError, setLeaveDaysError] = useState<string>('');
  const [yearError, setYearError] = useState<string>('');

  
  const handleLeaveDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setLeaveDays(value);

   if (value <= 0) {
     setLeaveDaysError('Leave days must be greater than 0.');
   } else if (isNaN(value)) {
     setLeaveDaysError('Leave days must be a number.');
   } else {
     setLeaveDaysError('');
   }
  };

const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const startDate = new Date(e.target.value);
  const year = startDate.getFullYear();
  setYear(year);
  setStartDate(e.target.value);
  startDateRef.current = e.target.value;

  if (startDate < new Date()) {
    setYearError('Start date cannot be in the past.');
  } else {
    setYearError('');
  }
};

const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
  endDateRef.current = e.target.value;
  const endDate = new Date(e.target.value);
  setEndDate(e.target.value);
  if (endDate < new Date(startDateRef.current)) {
    setEndDateError('End date cannot be before the start date.');
  } else {
    setEndDateError('');
  }
};

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (leaveDaysError === '' && yearError === '') {
      onSubmit(leaveDays, country, startDate, endDate);
    }
  };

    const isSubmitDisabled =
      leaveDaysError !== '' || yearError !== '' || endDateError !== '' || leaveDays === 0 || leaveDays === undefined;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div>
        <label
          htmlFor="leaveDays"
          className="block text-sm font-medium text-gray-700"
        >
          How many leave days do you have?
        </label>
        <input
          type="number"
          id="leaveDays"
          value={leaveDays}
          onChange={handleLeaveDaysChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-lightPink focus:shadow-outline"
          min="0"
          placeholder="Number of leave days you have"
        />
        {leaveDaysError && (
          <p className="text-red-500 text-xs italic">{leaveDaysError}</p>
        )}
      </div>

      <div className="flex justify-between space-x-4">
        <div className="flex-1">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleYearChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-lightPink focus:shadow-outline"
          />
          {yearError && (
            <p className="text-red-500 text-xs italic">{yearError}</p>
          )}
        </div>

        <div className="flex-1">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDate}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-lightPink focus:shadow-outline"
          />
          {endDateError && (
            <p className="text-red-500 text-xs italic">{endDateError}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700"
        >
          Country
        </label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-lightPink focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow appearance-none border rounded"
        >
          <option value="">Select a country</option>
          {countries.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className={`mt-2 p-2 border border-transparent text-sm font-medium rounded-md text-white bg-brightPink hover:bg-lightPink focus:outline-lightPink focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-brightPink transition ${
          isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isSubmitDisabled}
      >
        Optimize
      </button>
    </form>
  );
};

export default LeaveInputForm;
