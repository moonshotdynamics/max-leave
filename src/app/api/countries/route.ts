import { NextResponse, NextRequest } from 'next/server';

interface Country {
  name: string;
  code: string;
}

export async function GET (req: NextRequest, res: NextResponse) {
  try {
    const response = await fetch('https://date.nager.at/api/v3/AvailableCountries');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse
      .json({ error: 'Unable to fetch countries', details: err });
  }
};
