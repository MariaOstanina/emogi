import { Button } from 'antd';
import styled from 'styled-components';
import { Fireworks } from './Fireworks';

type TWinCompProps = {
  resetAll: () => void;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const WinComp = ({ resetAll }: TWinCompProps) => (
  <Wrapper>
    <Fireworks />
    <Button onClick={resetAll}>Начать заново</Button>
  </Wrapper>
);
