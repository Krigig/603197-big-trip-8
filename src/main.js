import makeFilter from './make-filter.js';
import makeTripPoint from './make-trip-point.js';

const filters = document.querySelector(`.trip-filter`);

filters.insertAdjacentHTML(`beforeend`, makeFilter(`Everything`, true));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`Future`));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`Past`));

const renderTripPoint = (amount, dist) => {
  const tasks = new Array(amount)
    .fill()
    .map(makeTripPoint);
  dist.insertAdjacentHTML(`beforeend`, tasks.join(``));
};

const tripPointsContainer = document.querySelector(`.trip-day__items`);
renderTripPoint(7, tripPointsContainer);

const filtersArray = filters.querySelectorAll(`input`);
filtersArray.forEach(function (element) {
  element.addEventListener(`click`, function () {
    removeTripPoint();
    let amountTripPoins = Math.round(Math.random() * 10);
    renderTripPoint(amountTripPoins, tripPointsContainer);
  });
});

const removeTripPoint = function () {
  const tripPointsArray = document.querySelectorAll(`.trip-point`);
  if (tripPointsArray.length !== 0) {
    tripPointsArray.forEach(function (element) {
      tripPointsContainer.removeChild(element);
    });
  }
};


