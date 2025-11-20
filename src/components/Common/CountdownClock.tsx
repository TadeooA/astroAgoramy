import React, { useState, useEffect } from 'react';

interface CountdownClockProps {
  targetDate: string; // ISO 8601 string, e.g., '2025-12-31T23:59:59'
}

const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      días: Math.floor(difference / (1000 * 60 * 60 * 24)),
      horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((difference / 1000 / 60) % 60),
      segundos: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

const CountdownClock: React.FC<CountdownClockProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return;
    }

    timerComponents.push(
      <div key={interval} className="flex flex-col items-center mx-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
        <span className="text-4xl md:text-5xl font-bold text-gray-900">{timeLeft[interval as keyof typeof timeLeft]}</span>
        <span className="text-sm uppercase text-gray-600 mt-1">{interval}</span>
      </div>
    );
  });

  return (
    <div className="flex justify-center items-center mt-8 mb-12" data-aos="fade-up" data-aos-delay="250">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-2xl font-semibold text-white">¡Lanzado!</span>
      )}
    </div>
  );
};

export default CountdownClock;
