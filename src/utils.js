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

const parseDate = (date) => {
  const day = date.split(`.`)[0];
  const month = +date.split(`.`)[1] - 1;
  const year = date.split(`.`)[2];
  return new Date(year, month, day);
};

const getRandomData = (minDate, maxDate) => {
  const minParseDate = parseDate(minDate);
  const maxParseDate = parseDate(maxDate);
  return new Date(random(minParseDate.getTime(), maxParseDate.getTime()));
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const getDiffTime = (timeStart, timeEnd) => {
  let hour = Math.floor((timeEnd - timeStart) / 3600000);
  let day = 0;
  if (hour > 24) {
    day = hour % 24;
    hour = hour - day * 24;
  }
  const minute = Math.floor((timeEnd - timeStart) / 60000 - hour * 60 - day * 24 * 60);
  return [day !== 0 ? day + `D ` : ``] + [hour !== 0 ? hour + `H ` : ``] + [minute !== 0 ? minute + `M ` : ``];
};

export {getRamdomArray, random, getRandomData, createElement, getDiffTime};
