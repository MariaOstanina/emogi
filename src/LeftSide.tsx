import styled from 'styled-components';
import { BestResults } from './BestResults';
import { ChangeSize } from './ChangeSize';
import { Timer } from './Timer';

const Side = styled.div`
  width: 300px;
  height: 600px;
  margin: 0 auto;
  font-family: sans-serif;
`;

export const LeftSide = () => {
  return (
    <Side>
      <ChangeSize />
      <Timer />
      <BestResults />
    </Side>
  );
};
