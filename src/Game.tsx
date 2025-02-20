import { createContext, useEffect, useState } from 'react';
import { Button, Flex } from 'antd';
import styled from 'styled-components';
import { EMOJI_ARRAY } from './constants';
import { useGlobalState } from './globalStateContext.tsx';
import { mixRandom } from './utils';

interface ContainerProps {
  $grid: string;
}

const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.$grid}, 1fr)`};
  grid-template-rows: ${(props) => `repeat(${props.$grid}, 1fr)`};
  width: 600px;
  height: 600px;
  margin: 0 auto;
  gap: 4px;
`;

const Cell = styled.div`
  background: #dad9f5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  cursor: pointer;
`;

let timerId: null | number = null;

export const timerContext = createContext(false);

export const Game = () => {
  const { size, setIsStarted, isStarted, setIsClear, isClear } =
    useGlobalState();
  const emojies = EMOJI_ARRAY.slice(0, (+size) ** 2 / 2);
  const emojiesArray = [...emojies, ...emojies];
  const [emoji, setEmoji] = useState(mixRandom(emojiesArray));
  const [openedIndexes, setOpenedIndexes] = useState<number[]>([]); //массив с индексами открытых ячеек
  const [firstTempIndex, setFirstTempIndex] = useState<number | null>(null); // временная выбранная ячейка
  const [secondTempIndex, setSecondTempIndex] = useState<number | null>(null); // временная выбранная ячейка

  useEffect(() => {
    setEmoji(mixRandom(emojiesArray));
  }, [size]);

  const resetTimer = () => {
    clearTimeout(timerId!);
    timerId = null;
  };

  const resetTemp = () => {
    setFirstTempIndex(null);
    setSecondTempIndex(null);
  };

  const resetAll = () => {
    setEmoji(mixRandom(emojiesArray));
    resetTimer();
    resetTemp();
    setOpenedIndexes([]);
    setIsClear(true);
  };

  useEffect(() => {
    if (isClear) {
      resetAll();
    }
  }, [isClear, size]);

  const handleClick = (i: number) => {
    setIsClear(false);
    if (!isStarted) {
      setIsStarted(true);
    }
    if (
      openedIndexes.includes(i) ||
      [firstTempIndex, secondTempIndex].includes(i)
    )
      return; // если нажали на открытые

    if (![firstTempIndex, secondTempIndex].includes(null)) {
      // если есть и first и second
      resetTimer();
      setFirstTempIndex(i);
      setSecondTempIndex(null);
      return;
    }

    if (firstTempIndex === null) {
      // если не открыта первая ячейка
      setFirstTempIndex(i); // делаем её открытой
    } else {
      // иначе если открыта
      setSecondTempIndex(i); // делаем открытой вторую ячейку

      if (emoji[i] === emoji[firstTempIndex]) {
        setOpenedIndexes((prev) => [...prev, firstTempIndex, i]);
      } else {
        timerId = setTimeout(() => {
          resetTemp();
          resetTimer();
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (openedIndexes.length === emoji.length) {
      setIsStarted(false);
    }
  }, [openedIndexes.length, emoji.length]);

  return (
    <Container $grid={size}>
      {openedIndexes.length === emoji.length ? (
        <Flex vertical>
          <img
            src='https://otkritkis.com/wp-content/uploads/2022/07/htjd4.gif'
            alt='знак вопроса'
          />
          <Button onClick={resetAll}>Начать заново</Button>
        </Flex>
      ) : (
        emoji.map((el, i) => (
          <Cell key={i} onClick={() => handleClick?.(i)}>
            {openedIndexes.includes(i) ||
            [firstTempIndex, secondTempIndex].includes(i)
              ? el
              : '❔'}
          </Cell>
        ))
      )}
    </Container>
  );
};
