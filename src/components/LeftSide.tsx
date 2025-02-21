import { Button } from 'antd';
import styled from 'styled-components';
import { useGlobalState } from '../globalStateContext.tsx';
import { ChangeSize, CurrentTimer, LatestResults } from './index.ts';

const Wrapper = styled.div`
  width: 300px;
  height: 600px;
  margin: 0 auto;
  font-family: sans-serif;
`;

export const LeftSide = () => {
  const { reset } = useGlobalState();
  return (
    <Wrapper>
      <ChangeSize />
      <br />
      Последние результаты:
      <br />
      <LatestResults />
      <br />
      <br />
      Текущий:
      <br />
      <CurrentTimer />
      <br />
      <br />
      <Button onClick={reset} danger>
        Сбросить
      </Button>
    </Wrapper>
  );
};
