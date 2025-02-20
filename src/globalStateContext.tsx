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
  isClear: boolean;
  isStarted: boolean;
  setSize: (n: TSizes) => void;
  setIsStarted: (v: boolean) => void;
  setIsClear: (v: boolean) => void;
};

export const GlobalStateContext = createContext<TValue | null>(null);

export const GlobalStateProvider = ({ children }: PropsWithChildren) => {
  const [size, setSizeState] = useState<TSizes>('2');
  const [isStarted, setIsStartedState] = useState(false);
  const [isClear, setIsClear] = useState(true);

  const setSize = useCallback((n: TSizes) => {
    setSizeState((prev) => (prev !== n ? n : prev)); // Обновляем, только если значение изменилось
  }, []);

  const setIsStarted = useCallback((v: boolean) => {
    setIsStartedState((prev) => (prev !== v ? v : prev));
  }, []);

  const value = useMemo(
    () => ({
      isClear,
      size,
      isStarted,
      setSize,
      setIsStarted,
      setIsClear,
    }),
    [size, isStarted, setSize, setIsStarted, isClear, setIsClear],
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
