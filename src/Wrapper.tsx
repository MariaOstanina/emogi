import { useState } from 'react';
import styled from 'styled-components';
import { Game, timerContext } from './Game';
import { LeftSide } from './LeftSide';
import { cellsContext } from './FormRadio';

const Wrap = styled.div`
  display: flex;
  gap: 50px;
`;

export const Wrapper = () => {
  const [timerIsStarted, setTimerIsStarted] = useState<boolean>(false);
  const [amountCells, setAmountCells] = useState<number>(16);
  return (
    <Wrap>
      <cellsContext.Provider value={{ amountCells, setAmountCells }}>
        <timerContext.Provider value={{ timerIsStarted, setTimerIsStarted }}>
          <LeftSide />
          <Game />
        </timerContext.Provider>
      </cellsContext.Provider>
    </Wrap>
  );
};
