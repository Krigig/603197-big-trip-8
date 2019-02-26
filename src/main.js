import makeFilter from './make-filter.js';
import makeTripPoint from './make-trip-point.js';

const filters = document.querySelector(`.trip-filter`);

filters.insertAdjacentHTML(`beforeend`, makeFilter(`Everything`, true));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`Future`));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`Past`));

const renderTripPoint = (dist) => {
  const tasks = new Array(7)
    .fill()
    .map(makeTripPoint);
  dist.insertAdjacentHTML(`beforeend`, tasks.join(``));
};

const tripPointsContainer = document.querySelector(`.trip-day__items`);
renderTripPoint(tripPointsContainer);
