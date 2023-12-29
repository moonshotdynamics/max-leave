'use client';
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Image from 'next/image';
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

  const currentDate = new Date();
  const lastDayOfYear = new Date(currentDate.getFullYear(), 11, 31);

   const formattedCurrentDate = currentDate.toLocaleDateString('af-ZA');
   const formattedLastDayOfYear = lastDayOfYear.toLocaleDateString('af-ZA');
  const [suggestions, setSuggestions] = useState<Suggestions | null >();
  const [countries, setCountries] = useState<Country[]>([]);
  const [leaveDays, setLeaveDays] = useState<number>();
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [startDate, setStartDate] = useState<string>(formattedCurrentDate);
  const [endDate, setEndDate] = useState<string>(formattedLastDayOfYear);
  const startDateRef = useRef('');
  const endDateRef = useRef('');

  



  async function fetchPublicHolidays(
    countryCode: string,
    startYear: number,
    endYear: number
  ) {
    let allHolidays : any = [];
    for (let year = startYear; year <= endYear; year++) {
      const res = await fetch(
        `/api/publicHolidays?countryCode=${countryCode}&year=${year}`
      );
      if (!res.ok) {
        throw new Error('Failed to fetch public holidays');
      }
      const holidays = await res.json();
      allHolidays = [...allHolidays, ...holidays];
    }
    return allHolidays;
  }

  useEffect(() => {
    (async function fetchCountries() {
      try {
        const res = await fetch('/api/countries');
        const data = await res.json();
        setCountries(data);
      } catch (error: any) {
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

  const handleFormSubmit = useCallback(
    async (
      leaveDays: number,
      country: string,
      startDate: string,
      endDate: string
    ) => {
      const selectedCountry = countries.find((c) => c.name === country);
      const countryCode = selectedCountry ? selectedCountry.countryCode : 'US';
      const startYear = new Date(startDate).getFullYear();
      const endYear = new Date(endDate).getFullYear();

      try {
        const holidays = await fetchPublicHolidays(
          countryCode,
          startYear,
          endYear
        );
        setSuggestions(
          optimizeLeaveDays(holidays, leaveDays, startDate, endDate)
        );
      } catch (error: any) {
        toastError(error.message);
        console.error(error.message);
      }
    },
    [countries]
  );

  return (
    <div className="container mx-auto px-4 pb-16">
      <h1 className="text-xl font-bold my-6">Annual Leave Planner</h1>
      <LeaveInputForm
        onSubmit={handleFormSubmit}
        countries={sortedCountries}
        //@ts-ignore
        leaveDays={leaveDays}
        year={year}
        setLeaveDays={setLeaveDays}
        setYear={setYear}
        setStartDate={setStartDate}
        startDate={startDate}
        startDateRef={startDateRef}
        endDateRef={endDateRef}
        endDate={endDate}
        setEndDate={setEndDate}

        

      />
      {/* @ts-ignore */}
      {suggestions?.days?.length > 0 && (
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
