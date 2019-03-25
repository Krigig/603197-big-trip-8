import getData from './getData.js';
import filters from './filter-data.js';

import {renderFilters} from './get-filter.js';
import {renderPoints} from './get-points.js';

import {getChart} from './chart.js';


document.querySelectorAll(`.view-switch__item`).forEach((switcher) => switcher.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  document.querySelectorAll(`.block`).forEach((item) => item.classList.add(`visually-hidden`));
  document.querySelector(`${evt.target.hash}`).classList.remove(`visually-hidden`);
  document.querySelectorAll(`.view-switch__item`).forEach((item) => item.classList.remove(`view-switch__item--active`));
  evt.target.classList.add(`view-switch__item--active`);
}));


const tripPointsContainer = document.querySelector(`.trip-day__items`);
const initialPoints = new Array(6).fill().map(getData);
renderPoints(initialPoints, tripPointsContainer);

const filtersContainer = document.querySelector(`.trip-filter`);
renderFilters(filters(), filtersContainer, renderPoints, initialPoints, tripPointsContainer);

getChart(initialPoints);
