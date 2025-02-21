import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { SIZES } from './constants';

type TSizes = (typeof SIZES)[number];

type TValue = {
  size: TSizes;
  isInitial: boolean;
  isStarted: boolean;
  setSize: (n: TSizes) => void;
  setIsStarted: (v: boolean) => void;
  setIsInitial: (v: boolean) => void;
  reset: () => void;
  addResult: () => void;
  latestResults: number[];
  setLastResult: (t: number) => void;
};

export const GlobalStateContext = createContext<TValue | null>(null);

export const GlobalStateProvider = ({ children }: PropsWithChildren) => {
  const [size, setSizeState] = useState<TSizes>('2');
  const [isStarted, setIsStartedState] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [latestResults, setLatestResults] = useState(
    JSON.parse(localStorage.getItem('time') || '[]'),
  );
  const [lastResult, setLastResult] = useState<number>(0);

  const addResult = () => {
    setLatestResults((p: string) => {
      const newResults = [...p, lastResult];
      localStorage.setItem('time', JSON.stringify(newResults));

      return newResults;
    });
  };

  const setSize = useCallback((n: TSizes) => {
    setSizeState((prev) => (prev !== n ? n : prev)); // Обновляем, только если значение изменилось
  }, []);

  const setIsStarted = useCallback((v: boolean) => {
    setIsStartedState((prev) => (prev !== v ? v : prev));
  }, []);

  const reset = () => {
    setIsStarted(false);
    setIsInitial(true);
  };

  const value = useMemo(
    () => ({
      isInitial,
      size,
      isStarted,
      setSize,
      setIsStarted,
      setIsInitial,
      reset,
      addResult,
      latestResults,
      setLastResult,
    }),
    [size, isStarted, isInitial, latestResults, lastResult],
  );

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): TValue => {
  const context = useContext(GlobalStateContext);
  if (!context)
    throw new Error('useGlobalState must be used within GlobalStateProvider');
  return context;
};
