import styled from 'styled-components';
import { Game, LeftSide } from './components';

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
