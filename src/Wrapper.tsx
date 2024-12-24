import styled from 'styled-components';
import { Game } from './Game';
import { LeftSide } from './LeftSide';

const Wrap = styled.div`
  display: flex;
  gap: 50px;
`;

export const Wrapper = () => {
  return (
    <Wrap>
      <LeftSide />
      <Game />
    </Wrap>
  );
};
