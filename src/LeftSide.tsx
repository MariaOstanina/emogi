import styled from 'styled-components';
import { FormRadio } from './FormRadio';
import { Timer } from './Timer';

const Side = styled.div`
  width: 300px;
  height: 600px;
  margin: 0 auto;
  outline: 1px solid black;
  font-family: sans-serif;
`;

export const LeftSide = () => {
  return (
    <>
      <Side>
        <FormRadio/>
        <Timer />
      </Side>
    </>
  );
};
