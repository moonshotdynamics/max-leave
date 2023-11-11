import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
   const url = new URL(req.url);
   const countryCode = url.searchParams.get('countryCode');
  const year = url.searchParams.get('year');
  
  console.log(countryCode, year);

    try {
      const response = await fetch(
        `https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const holidays = data.map((holiday) => ({
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
        error: 'Unable to fetch countries',
        details: error,
      });
    }

}
