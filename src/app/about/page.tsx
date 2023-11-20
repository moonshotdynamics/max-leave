import Head from 'next/head';
import React from 'react';

const About: React.FC = () => {
  return (
    <div>
      <Head>
        <title>About Us</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          About Our Leave Optimization Platform
        </h1>

        <section className="text-lg space-y-4">
          <p>
            Welcome to Your Ultimate Leave Planner! Our platform is dedicated to
            helping you maximize your leave days with minimal effort. We provide
            an intuitive solution that seamlessly integrates with your schedule,
            offering the best strategies to optimize your time off.
          </p>
          <p>
            By considering public holidays and weekends, our system
            intelligently suggests the most effective way to use your leave
            days. This means you can enjoy extended breaks without exhausting
            your leave balance. Ideal for planning long vacations or maximizing
            time off around holidays, our platform ensures you get the most out
            of your leave entitlements.
          </p>
          <p>
            Our mission is to simplify leave planning while maximizing your
            leisure time. Whether you&apos;re planning a getaway or a
            staycation, our tool is designed to take the hassle out of leave
            planning. Enjoy more time off, stress-free!
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
