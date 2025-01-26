import { useContext, useEffect, useState } from 'react';
import { timerContext } from './Game';

export const Timer = () => {
  const { timerIsStarted } = useContext(timerContext); //старт таймера
  const [time, setTime] = useState<number>(0);

  let hours: string = ('0' + Math.floor(time / 3600)).slice(-2);
  let minutes: string = ('0' + Math.floor((time / 60) % 60)).slice(-2);
  let sec: string = ('0' + Math.floor(time % 60)).slice(-2);
  const [timesPlay, setTimesPlay] = useState<string>('00:00:00'); // таймер

  useEffect(() => {
    let interval: number | null = null;
    if (timerIsStarted) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
        setTimesPlay(`${hours}:${minutes}:${sec}`);
      }, 1000);
    }
    return () => clearInterval(interval!);
  });

  return <div>{timesPlay}</div>;
};
