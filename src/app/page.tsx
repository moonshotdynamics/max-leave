'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import heroImage from '../../public/assets/images/landing.jpg';

const HeroSection = () => {
  const router = useRouter();

  const colors = {
    teal: 'rgb(5, 145, 125)',
    mutedTurquoise: 'rgb(155, 188, 181)',
    brightPink: 'rgb(246, 98, 128)',
    mediumTurquoise: 'rgb(87, 168, 159)',
    lightGray: 'rgb(204, 208, 204)',
  };

  const gradientBackground = `linear-gradient(to right, ${colors.mutedTurquoise}, ${colors.mediumTurquoise})`;
  return (
    <div className="flex flex-col md:flex-row items-center relative md:relative w-full h-full">
      <div
        style={{ background: gradientBackground }}
        className="md:w-1/2 h-screen  items-center justify-center text-white p-8 md:flex hidden w-full"
      >
        <div className="space-y-4 text-center md:text-left flex flex-col items-center justify-center">
          <h1
            className="text-4xl font-bold md:text-7xl"
            style={{ color: colors.brightPink }}
          >
            Leave Maximizer
          </h1>
          <p className="text-xl text-white">
            Maximize your leave days efficiently
          </p>
          <button
            onClick={() => router.push('/calculate')}
            className="px-6 py-2 rounded-md shadow transition hover:bg-lightPink bg-brightPink text-white"
          >
            Calculate Your Leave
          </button>
        </div>
      </div>
      <div className="relative md:w-1/2 h-screen md:h-screen w-full h-full">
        <Image
          src={heroImage}
          alt="Vacation"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center text-white p-8">
          <div className="space-y-4 text-center">
            <h1
              className="text-4xl font-bold"
              style={{ color: colors.brightPink }}
            >
              Leave Maximizer
            </h1>
            <p className="text-xl text-white">
              Maximize your leave days efficiently
            </p>
            <button
              onClick={() => router.push('/calculate')}
              className="px-6 py-2 rounded-md shadow transition hover:bg-lightPink bg-brightPink text-white"
            >
              Calculate Your Leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
