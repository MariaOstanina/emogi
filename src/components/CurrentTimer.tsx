import { useEffect, useState } from 'react';
import { useGlobalState } from '../globalStateContext.tsx';
import { formatTime } from '../utils.ts';

export const CurrentTimer = () => {
  const { isStarted, isInitial, size, setIsStarted, setLastResult } =
    useGlobalState();
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (isInitial) {
      setTime(0);
      setIsStarted(false);
    }
  }, [isInitial, size]);

  useEffect(() => {
    if (!isStarted) {
      setLastResult(time);
    }
  }, [isStarted]);

  useEffect(() => {
    let timeout: number | null = null;

    if (isStarted) {
      const tick = () => {
        setTime((prev) => prev + 1);
        timeout = setTimeout(tick, 1000);
      };
      timeout = setTimeout(tick, 1000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isStarted]);

  return formatTime(time);
};
