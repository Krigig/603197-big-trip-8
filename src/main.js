import getData from './getData.js';
import filters from './filter-data.js';
import {API} from './api.js';
import {dictionary} from './dictionary';

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

// const filtersContainer = document.querySelector(`.trip-filter`);
// renderFilters(filters(), filtersContainer, renderPoints, initialPoints, tripPointsContainer);

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});


api.getOffers()
  .then((responsiv) => {
    dictionary.offersList = responsiv;
  })
  .then(() => {
    api.getDestination()
          .then((responsiv) => {
            dictionary.destinations = responsiv;
          });
  })
  .then(() => {
    api.getPoints()
    .then((points) => {
      renderPoints(points, tripPointsContainer, dictionary);
      // getChart(points);
      console.log(points);
      console.log(dictionary);
    });
  });
// api.getDestination()
//   .then((destination) => {
//     destinations = destination;
//     // console.log(destination);
//   });

// const options = {
//   headers: new Headers({
//       'Authorization': 'Basic eo0w590ik29889a',
//       'Content-Type': `application/json`
//   })
// };
// fetch('https://es8-demo-srv.appspot.com/big-trip/destinations', options)
//   .then(data => data.json())
//   .then(data => console.log(data));
