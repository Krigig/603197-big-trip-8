const ESC_KEY = 27;
const isEscEvent = (evt, action) => evt.keyCode === ESC_KEY ? action() : ``;

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

const getDiffTime = (timeStart, timeEnd) => Math.floor((timeEnd - timeStart) / 60000);

const getDiffTimeParse = (minute) => {
  let hour = Math.floor(minute / 60);
  let day = 0;
  if (hour > 24) {
    day = Math.floor(hour / 24);
    hour = hour - day * 24;
  }
  const min = Math.floor(minute - hour * 60 - day * 24 * 60);
  return [day !== 0 ? day + `D ` : ``] + [hour !== 0 ? hour + `H ` : ``] + [min !== 0 ? min + `M` : ``];
};

const getTotalPrice = (point) => {
  if (point.offers.length !== 0) {
    return +point.price + point.offers.reduce((acc, item) => acc + +[item.accepted ? item.price : 0], 0);
  } else {
    return point.price;
  }
};

const getTotalCost = (points) => {
  let cost = 0;
  for (const point of points) {
    cost += getTotalPrice(point);
  }
  return cost;
};

export {getRamdomArray, random, getRandomData, createElement, getDiffTime, getTotalPrice, getTotalCost, isEscEvent, getDiffTimeParse};
