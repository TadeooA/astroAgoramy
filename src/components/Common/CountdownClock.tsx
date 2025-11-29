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
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Inicializar solo en el cliente
    setMounted(true);
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return;
    }

    // En móvil, ocultar segundos
    const hideOnMobile = interval === 'segundos' ? 'hidden md:flex' : 'flex';

    timerComponents.push(
      <div
        key={interval}
        className={`${hideOnMobile} flex-col items-center mx-1.5 sm:mx-2 px-4 py-5 sm:px-5 sm:py-6 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[70px] sm:min-w-[90px]`}
      >
        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">{timeLeft[interval as keyof typeof timeLeft]}</span>
        <span className="text-xs sm:text-sm capitalize text-gray-600 mt-1">{interval}</span>
      </div>
    );
  });

  // No renderizar hasta que esté montado en el cliente
  if (!mounted) {
    return (
      <div className="flex flex-wrap justify-center items-center gap-1 mt-8 mb-12 px-4" data-aos="fade-up" data-aos-delay="250">
        <div className="flex flex-col items-center mx-1.5 sm:mx-2 px-4 py-5 sm:px-5 sm:py-6 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[70px] sm:min-w-[90px]">
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">--</span>
          <span className="text-xs sm:text-sm capitalize text-gray-600 mt-1">días</span>
        </div>
        <div className="flex flex-col items-center mx-1.5 sm:mx-2 px-4 py-5 sm:px-5 sm:py-6 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[70px] sm:min-w-[90px]">
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">--</span>
          <span className="text-xs sm:text-sm capitalize text-gray-600 mt-1">horas</span>
        </div>
        <div className="flex flex-col items-center mx-1.5 sm:mx-2 px-4 py-5 sm:px-5 sm:py-6 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[70px] sm:min-w-[90px]">
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">--</span>
          <span className="text-xs sm:text-sm capitalize text-gray-600 mt-1">minutos</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-1 mt-8 mb-12 px-4" data-aos="fade-up" data-aos-delay="250">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-2xl font-semibold text-white">¡Lanzado!</span>
      )}
    </div>
  );
};

export default CountdownClock;
