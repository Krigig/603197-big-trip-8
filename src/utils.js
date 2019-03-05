const getRamdomArray = (arr, max) => {
  const shuffledArray = getShuffledArray(arr);
  const ramdomEnd = Math.floor(Math.random() * max);
  return shuffledArray.slice(0, ramdomEnd);
};

const getShuffledArray = (arr) => {
  const copyArr = arr.concat();
  copyArr.sort(function () {
    return Math.random() - 0.5;
  });
  return copyArr;
};

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

export {getRamdomArray, random};
