import makeFilter from './make-filter.js';
import getData from './getData.js';
import {Point} from './point.js';
import {PointEdit} from './point-edit.js';

const filters = document.querySelector(`.trip-filter`);

filters.insertAdjacentHTML(`beforeend`, makeFilter(`Everything`, true));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`Future`));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`Past`));

const tripPointsContainer = document.querySelector(`.trip-day__items`);
const pointData = getData();
const firstPoint = new Point(pointData);
const pointEditComponent = new PointEdit(pointData);

tripPointsContainer.appendChild(firstPoint.render());
firstPoint.onEdit = () => {
  pointEditComponent.render();
  tripPointsContainer.replaceChild(pointEditComponent.element, firstPoint.element);
  firstPoint.unrender();
};

pointEditComponent.onSubmit = () => {
  firstPoint.render();
  tripPointsContainer.replaceChild(firstPoint.element, pointEditComponent.element);
  pointEditComponent.unrender();
};

