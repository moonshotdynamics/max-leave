import React, { useState, FormEvent } from 'react';

interface LeaveInputFormProps {
  onSubmit: (leaveDays: number, country: string, year: number) => void;
  countries: { name: string; code: string }[];
  leaveDays: number;
  setLeaveDays(leaveDays: number): void;
  year: number;
  setYear(year: number): void;
}

const LeaveInputForm: React.FC<LeaveInputFormProps> = ({
  onSubmit,
  countries,
  leaveDays,
  setLeaveDays,
  year,
  setYear,
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
    const value = Number(e.target.value);
    setYear(value);

    const currentYear = new Date().getFullYear();
    if (value < currentYear) {
      setYearError('Year must be the current year or a future year.');
    } else {
      setYearError('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (leaveDaysError === '' && yearError === '') {
      onSubmit(leaveDays, country, year);
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
          type="number"
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

      <div>
        <label
          htmlFor="year"
          className="block text-sm font-medium text-gray-700"
        >
          What year are you planning for?
        </label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={handleYearChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          min="0"
        />
        {yearError && (
          <p className="text-red-500 text-xs italic">{yearError}</p>
        )}
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
        className={`mt-2 p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-700 transition ${
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
