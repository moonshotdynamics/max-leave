'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import LeaveInputForm from '@/components/LeaveInputForm';
import SuggestionsList from '@/components/SuggestionsList';
import optimizeLeaveDays from '@/utils/optimizeLeaveDays';
import { toastError } from '@/utils/toasts';

interface Country {
  name: string;
  countryCode: string;
}

interface Suggestions {
  days: string[];
  totalLeaveDays: number;
  timelineItems: any[];
  timelineGroups: any[];
}

const Home = () => {
  const [suggestions, setSuggestions] = useState<Suggestions>();
  const [countries, setCountries] = useState<Country[]>([]);
  const [leaveDays, setLeaveDays] = useState<number>();
  const [year, setYear] = useState<number>(new Date().getFullYear());

  async function fetchPublicHolidays(countryCode: string, year: number) {
    const res = await fetch(
      `/api/publicHolidays?countryCode=${countryCode}&year=${year}`
    );
    if (!res.ok) {
      throw new Error('Failed to fetch public holidays');
    }
    return await res.json();
  }

  useEffect(() => {
    (async function fetchCountries() {
      try {
        const res = await fetch('/api/countries');
        const data = await res.json();
        setCountries(data);
      } catch (error:any) {
        toastError(error.message);
        console.error(error);
      }
    })();
  }, []);

  const sortedCountries = useMemo(() => {
    return countries
      .map((country) => {
        return {
          name: country.name,
          code: country.countryCode,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort countries alphabetically
  }, [countries]);

  const handleFormSubmit = useCallback(async (leaveDays: number, country: string, year: number) => {
    const selectedCountry = countries.find((c) => c.name === country);
    const countryCode = selectedCountry ? selectedCountry.countryCode : 'US';

    try {
      const holidays = await fetchPublicHolidays(countryCode, year);
      setSuggestions(optimizeLeaveDays(year, holidays, leaveDays));
    } catch (error: any) {
      toastError(error.message);
      console.error(error.message);
    }
  }, [countries]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold my-6">Annual Leave Planner</h1>
      <LeaveInputForm
        onSubmit={handleFormSubmit}
        countries={sortedCountries}
        //@ts-ignore
        leaveDays={leaveDays}
        year={year}
        setLeaveDays={setLeaveDays}
        setYear={setYear}
      />
      {suggestions?.days && (
        <SuggestionsList
          suggestions={suggestions?.days ?? []}
          //@ts-ignore
          leaveDays={leaveDays}
          year={year}
          totalLeaveDays={suggestions?.totalLeaveDays ?? 0}
        />
      )}
    </div>
  );
};

export default Home;
