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
  setYear
}) => {
  const [country, setCountry] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(leaveDays,country, year);
  };

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
          onChange={(e) => setLeaveDays(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          min="0"
          placeholder="21"
        />
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
          onChange={(e) => setYear(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          min="0"

        />
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
            //@ts-ignore
            <option key={c.code} value={c.name}>
              {/* @ts-ignore */}
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="mt-2 p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-700 transition"
      >
        Calculate Best Leave Days
      </button>
    </form>
  );
};

export default LeaveInputForm;
