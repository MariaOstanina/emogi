import { useState } from 'react';
import { Button, Flex } from 'antd';
import styled from 'styled-components';
import { EMOJIES } from './constants';
import { mixRandom } from './utils';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
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

export const Game = () => {
  const [emoji, setEmoji] = useState(mixRandom(EMOJIES));
  const [openedIndexes, setOpenedIndexes] = useState<number[]>([]); //массив с индексами открытых ячеек
  const [firstTempIndex, setFirstTempIndex] = useState<number | null>(null); // временная выбранная ячейка
  const [secondTempIndex, setSecondTempIndex] = useState<number | null>(null); // временная выбранная ячейка

  const resetTimer = () => {
    clearTimeout(timerId!);
    timerId = null;
  };

  const resetTemp = () => {
    setFirstTempIndex(null);
    setSecondTempIndex(null);
  };

  const resetAll = () => {
    setEmoji(mixRandom(EMOJIES));
    resetTimer();
    resetTemp();
    setOpenedIndexes([]);
  };

  const handleClick = (i: number) => {
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

  return (
    <Container>
      {openedIndexes.length === emoji.length ? (
        <Flex vertical>
          <img
            src='https://otkritkis.com/wp-content/uploads/2022/07/htjd4.gif'
            alt=''
          />
          <Button onClick={resetAll}>Начать заново</Button>
        </Flex>
      ) : (
        emoji.map((el, i) => (
          <Cell key={i} onClick={() => handleClick(i)}>
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
