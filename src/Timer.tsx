import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalState } from './globalStateContext.tsx';

const Time = styled.div`
  margin-block-start: 20px;
`;

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((time / 60) % 60)
    .toString()
    .padStart(2, '0');
  const sec = (time % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${sec}`;
};

export const Timer = () => {
  const { isStarted, isClear, size, setIsStarted } = useGlobalState();
  const [time, setTime] = useState(0);
  const [dataTime, setDataTime] = useState<number[]>([]);

  useEffect(() => {
    if (isClear) {
      
      if (time !== 0) {
        setDataTime((p) => [...p, time]);
        localStorage.setItem('dataTime', JSON.stringify(dataTime));
        let res: string[] = [];

        const results: string | null = localStorage.getItem('dataTime');

        if (results) {
          res = JSON.parse(results);
        }
        console.log(res);
      }
      setTime(0);
      setIsStarted(false);
    }
  }, [isClear, size, dataTime]);

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

  return <Time>{formatTime(time)}</Time>;
};
