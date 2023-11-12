import { NextResponse, NextRequest } from 'next/server';

interface Holiday {
  date: string;
  name: string;
}
export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const countryCode = url.searchParams.get('countryCode');
  const year = url.searchParams.get('year');
  
    try {
      const response = await fetch(
        `https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`
      );
      const data = await response.json();

      if (response.ok) {
        const holidays = data.map((holiday: Holiday) => ({
          date: holiday.date,
          name: holiday.name,
        }));
       return NextResponse.json(holidays);
      } else {
   return NextResponse.json({
     error: 'Unable to fetch holidays'
   });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        error: 'Unable to fetch country holidays',
        details: error,
      });
    }

}
