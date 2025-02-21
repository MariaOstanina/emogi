export const mixRandom = (array: string[]) => {
  const arr = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    // Генерируем случайный индекс
    const j = Math.floor(Math.random() * (i + 1));
    // Меняем элементы по индексам i и j
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
};

export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((time / 60) % 60)
    .toString()
    .padStart(2, '0');
  const sec = (time % 60).toString().padStart(2, '0');

  return `${hours}:${minutes}:${sec}`;
};
