import { NextResponse, NextRequest } from 'next/server';

export default async function GET(req: NextRequest, res: NextResponse) {
  const { countryCode, year } = await req.json();

    try {
      const response = await fetch(
        `https://date.nager.at/Api/v2/PublicHoliday/${year}/${countryCode}`
      );
      const data = await response.json();

      if (response.ok) {
       return NextResponse.json(data);
      } else {
   return NextResponse.json({
     error: 'Unable to fetch holidays'
   });
      }
    } catch (error) {
      return NextResponse.json({
        error: 'Unable to fetch countries',
        details: error,
      });
    }

}
