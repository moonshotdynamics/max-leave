'use client'
import React, { useState, useEffect, useMemo } from 'react';
import LeaveInputForm from '@/components/LeaveInputForm';
import SuggestionsList from '@/components/SuggestionsList';
import optimizeLeaveDays from '@/utils/optimizeHolidays';

interface Country {
  name: string;
  countryCode: string;
}

const Home = () => {
  const [suggestions, setSuggestions] = useState<string>('');
  const [countries, setCountries] = useState<Country[]>([]);

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
    const res = await fetch('/api/countries');
    const data = await res.json();
    setCountries(data);
  })().catch(console.error);
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


  const handleFormSubmit = (leaveDays: number, country: string, year: number) => {
    // Find the country object from the countries state
    const selectedCountry = countries.find((c) => c.name === country);

    // If the country is found, use its code. Otherwise, default to 'US'
    const countryCode = selectedCountry ? selectedCountry.countryCode : 'US';

    fetchPublicHolidays(countryCode, year)
      .then((holidays) => {
        console.log(holidays, 'HERE');
        optimizeLeaveDays(year, country, holidays, leaveDays);
        setSuggestions(optimizeLeaveDays(year, country, holidays, leaveDays));
      })
      .catch((error) => {
        console.error(error.message); // Handle errors
      });
  };


  return (
    <div className="container mx-auto px-4 bg-white">
      <h1 className="text-xl font-bold my-6">Leave Planner</h1>
      <LeaveInputForm onSubmit={handleFormSubmit} countries={sortedCountries} />
      <SuggestionsList suggestions={suggestions} />
    </div>
  );
};

export default Home;
