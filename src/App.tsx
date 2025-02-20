import styled from 'styled-components';
import { Game } from './Game.tsx';
import { LeftSide } from './LeftSide.tsx';

const Wrapper = styled.div`
  display: flex;
  gap: 50px;
`;

export const App = () => {
  return (
    <Wrapper>
      <LeftSide />
      <Game />
    </Wrapper>
  );
};
