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
  const [leaveDaysError, setLeaveDaysError] = useState<string>('');
  const [yearError, setYearError] = useState<string>('');

  

  const handleLeaveDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setLeaveDays(value);

    if (value <= 0) {
      setLeaveDaysError('Leave days must be greater than 0.');
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

  const currentYear = new Date().getFullYear();
  if (year < currentYear) {
    setYearError('Year must be the current year or a future year.');
  } else {
    setYearError('');
  }
};
  
  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    endDateRef.current = e.target.value;
    const currentYear = new Date().getFullYear();
    setEndDate(e.target.value);
    if (year > currentYear) {
      setYearError('Year must be greater than the current year.');
    }
    else {
      setYearError('')
    }
  }


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (leaveDaysError === '' && yearError === '') {
      onSubmit(leaveDays, country, startDate, endDate);
    }
  };

  const isSubmitDisabled = leaveDaysError !== '' || yearError !== '';

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
          type="text"
          id="leaveDays"
          value={leaveDays}
          onChange={handleLeaveDaysChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          min="0"
          placeholder="21"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {yearError && (
            <p className="text-red-500 text-xs italic">{yearError}</p>
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
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow appearance-none border rounded"
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
        className={`mt-2 p-2 border border-transparent text-sm font-medium rounded-md text-white bg-brightPink hover:bg-lightPink focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-brightPink transition ${
          isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isSubmitDisabled}
      >
        Calculate Best Leave Days
      </button>
    </form>
  );
};

export default LeaveInputForm;
