// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRandomItemsInArray: (array: unknown[], numberOfItems: number) => any[] = (array, numberOfItems) => {
  const set = new Set();
  const result = [];
  for (let i = 0; i < numberOfItems; i++) {
    let randomIndex = Math.floor(Math.random() * array.length);
    while (set.has(randomIndex)) {
      randomIndex = Math.floor(Math.random() * array.length);
    }
    set.add(randomIndex);
    result.push(array[randomIndex]);
  }
  return result;
};
