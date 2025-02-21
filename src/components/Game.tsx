import styled from 'styled-components';
import { useGame } from '../hooks';
import { WinComp } from './index.ts';

const Container = styled.div<{ $grid: string }>`
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

export const Game = () => {
  const { size, isWin, startNewGame, emoji, onCellClick, getCellIsOpened } =
    useGame();

  return (
    <Container $grid={isWin ? '1' : size}>
      {isWin ? (
        <WinComp resetAll={startNewGame} />
      ) : (
        emoji.map((el, i) => (
          <Cell key={i} onClick={() => onCellClick(i)}>
            {getCellIsOpened(i) ? el : '❔'}
          </Cell>
        ))
      )}
    </Container>
  );
};
