'use client'
import React, { useState, useEffect } from 'react';
import LeaveInputForm from '@/components/LeaveInputForm';
import SuggestionsList from '@/components/SuggestionsList';





interface HomeProps {
  data: [];
}

const Home = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);

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
    async function fetchCountries() {
      const res = await fetch('/api/countries');
      const data = await res.json();
      setCountries(data);
    }

    fetchCountries().catch(console.error);
  }, []);

  const handleFormSubmit = (leaveDays: number, country: string, year: number) => {
    // Call the API and set suggestions with the response data
    console.log(leaveDays, country);
    // For now, we'll just simulate the suggestions

    fetchPublicHolidays(country, year)
      .then((holidays) => {
        console.log(holidays); // Do something with the holidays
      })
      .catch((error) => {
        console.error(error.message); // Handle errors
      });
    setSuggestions([
      { leaveDate: '2023-12-24', reason: 'Long weekend - Christmas Eve' },
      { leaveDate: '2023-04-07', reason: 'Extended holiday - Good Friday' },
      // ... more suggestions
    ]);
  };



  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold my-6">Leave Planner</h1>
      <LeaveInputForm onSubmit={handleFormSubmit} countries={countries} />
      <SuggestionsList suggestions={suggestions} />
    </div>
  );
};

export default Home;
