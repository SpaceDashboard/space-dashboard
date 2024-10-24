import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { UTCDate } from '@date-fns/utc';

export const UtcClock: React.FC = () => {
  const [utcTime, setUtcTime] = useState(new UTCDate());

  useEffect(() => {
    const timer = setInterval(() => {
      setUtcTime(new UTCDate());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedTime = format(utcTime, 'HH:mm:ss');

  return <>{`${formattedTime} UTC`}</>;
};
