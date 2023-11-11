'use client'
import React, { useState, useEffect, useMemo } from 'react';
import LeaveInputForm from '@/components/LeaveInputForm';
import SuggestionsList from '@/components/SuggestionsList';
import optimizeLeaveDays from '@/utils/optimizeHolidays';

interface HomeProps {
  data: [];
}

const Home = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [year, setYear] = useState();
  const [leaveDays, setLeaveDays] = useState();

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
        code: country.code,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort countries alphabetically
}, [countries]);


  const handleFormSubmit = (leaveDays: number, country: string, year: number) => {
    // Find the country object from the countries state
    const selectedCountry = countries.find((c) => c.name === country);
    setYear(year);
    setLeaveDays(leaveDays);

    // If the country is found, use its code. Otherwise, default to 'US'
    const countryCode = selectedCountry ? selectedCountry.code : 'US';

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
      <SuggestionsList suggestions={suggestions} year={year} leaveDays={leaveDays} />
    </div>
  );
};

export default Home;
