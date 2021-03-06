import getData from './getData.js';

const makeTripPoint = (point) => `<article class="trip-point">
<i class="trip-icon">${point.icon}</i>
<h3 class="trip-point__title">${point.type} to ${point.city}</h3>
<p class="trip-point__schedule">
  <span class="trip-point__timetable">10:00&nbsp;&mdash; 11:00</span>
  <span class="trip-point__duration">1h 30m</span>
</p>
<p class="trip-point__price">&euro;&nbsp;${point.price}</p>
<ul class="trip-point__offers">
${point.offers.map((it) => `<li><button class="trip-point__offer">${it}</button></li>`).join(``)}
</ul>
</article>`;

const renderTripPoint = (amount, dist) => {
  const points = new Array(amount)
    .fill()
    .map(() => makeTripPoint(getData()));
  dist.insertAdjacentHTML(`beforeend`, points.join(``));
};

const removeTripPoint = function () {
  const tripPointsContainer = document.querySelector(`.trip-day__items`);
  const tripPointsArray = document.querySelectorAll(`.trip-point`);
  if (tripPointsArray.length !== 0) {
    tripPointsArray.forEach(function (element) {
      tripPointsContainer.removeChild(element);
    });
  }
};

export {renderTripPoint, removeTripPoint};
