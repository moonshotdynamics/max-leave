import { NextResponse, NextRequest } from 'next/server';


export async function GET (req: NextRequest, res: NextResponse) {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    const countries = data.map((country) => {
      return {
        name: country.name.common,
        code: country.cca2
      }
      
    });
    return NextResponse.json(countries);
  } catch (err) {
    return NextResponse
      .json({ error: 'Unable to fetch countries', details: err });
  }
};
