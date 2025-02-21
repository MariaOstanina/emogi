import { useEffect, useState } from 'react';
import { EMOJI_ARRAY } from '../constants.ts';
import { useGlobalState } from '../globalStateContext.tsx';
import { mixRandom } from '../utils.ts';

let timerId: null | number = null;

const getEmojiArrayBySize = (size: string) => {
  const emoji = mixRandom(EMOJI_ARRAY).slice(0, (+size) ** 2 / 2);
  const emojiArray = [...emoji, ...emoji];

  return mixRandom(emojiArray);
};

export const useGame = () => {
  const { size, setIsStarted, setIsInitial, isInitial, addResult } =
    useGlobalState();

  const [emoji, setEmoji] = useState(getEmojiArrayBySize(size));
  const [openedIndexes, setOpenedIndexes] = useState<number[]>([]); //массив с индексами открытых ячеек
  const [firstTempIndex, setFirstTempIndex] = useState<number | null>(null); // временная выбранная ячейка
  const [secondTempIndex, setSecondTempIndex] = useState<number | null>(null); // временная выбранная ячейка

  useEffect(() => {
    setEmoji(getEmojiArrayBySize(size));
  }, [size]);

  const resetCellsTimer = () => {
    clearTimeout(timerId!);
    timerId = null;
  };

  const resetTemp = () => {
    setFirstTempIndex(null);
    setSecondTempIndex(null);
  };

  const resetAll = () => {
    setEmoji(getEmojiArrayBySize(size));
    resetCellsTimer();
    resetTemp();
    setOpenedIndexes([]);
    setIsInitial(true);
  };

  useEffect(() => {
    if (isInitial) {
      resetAll();
    }
  }, [isInitial, size]);

  const handleClick = (i: number) => {
    setIsInitial(false);
    setIsStarted(true);

    // если нажали на открытые
    if (
      openedIndexes.includes(i) ||
      [firstTempIndex, secondTempIndex].includes(i)
    )
      return;

    // если есть и first и second, то закрываем их
    if (![firstTempIndex, secondTempIndex].includes(null)) {
      resetCellsTimer();
      setFirstTempIndex(i);
      setSecondTempIndex(null);

      return;
    }

    // если не открыта первая ячейка
    if (firstTempIndex === null) {
      setFirstTempIndex(i); // делаем её открытой
    } else {
      // иначе если открыта

      setSecondTempIndex(i); // делаем открытой вторую ячейку

      if (emoji[i] === emoji[firstTempIndex]) {
        setOpenedIndexes((prev) => [...prev, firstTempIndex, i]);
      } else {
        timerId = setTimeout(() => {
          resetTemp();
          resetCellsTimer();
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (openedIndexes.length === emoji.length) {
      setIsStarted(false);
    }
  }, [openedIndexes.length, emoji.length]);

  const getCellIsOpened = (i: number) =>
    openedIndexes.includes(i) || [firstTempIndex, secondTempIndex].includes(i);

  const startNewGame = () => {
    resetAll();
    addResult();
  };

  return {
    emoji,
    size,
    isWin: openedIndexes.length === emoji.length,
    resetAll,
    onCellClick: handleClick,
    getCellIsOpened,
    startNewGame,
  };
};
