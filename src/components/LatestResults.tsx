import { useGlobalState } from '../globalStateContext.tsx';
import { formatTime } from '../utils.ts';

export const LatestResults = () => {
  const { latestResults } = useGlobalState();
  const newlatestResults = latestResults.slice(-5);
  localStorage.setItem('time', JSON.stringify(newlatestResults));

  return newlatestResults.map((el, i) => <div key={i}>{formatTime(el)}</div>);
};
