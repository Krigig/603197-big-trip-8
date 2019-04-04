import getData from './getData.js';
import filters from './filter-data.js';
import {API} from './api.js';
import {dictionary} from './dictionary';

import {renderFilters} from './get-filter.js';
// import {renderPoints} from './get-points.js';

import {getChart} from './chart.js';


document.querySelectorAll(`.view-switch__item`).forEach((switcher) => switcher.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  document.querySelectorAll(`.block`).forEach((item) => item.classList.add(`visually-hidden`));
  document.querySelector(`${evt.target.hash}`).classList.remove(`visually-hidden`);
  document.querySelectorAll(`.view-switch__item`).forEach((item) => item.classList.remove(`view-switch__item--active`));
  evt.target.classList.add(`view-switch__item--active`);
}));

// const filtersContainer = document.querySelector(`.trip-filter`);
// renderFilters(filters(), filtersContainer, renderPoints, initialPoints, tripPointsContainer);

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

import {Point} from './point.js';
import {PointEdit} from './point-edit.js';

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const container = document.querySelector(`.trip-day__items`);

const getMessageWaite = () => {
  container.innerHTML = `Loading route...`;
};
const getMessageError = () => {
  container.innerHTML = `Something went wrong while loading your route info. Check your connection or try again later`;
};

const renderPoints = (points) => {
  container.innerHTML = ``;

  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    const pointComponent = new Point(point, dictionary);
    const editPointComponent = new PointEdit(point, dictionary);

    pointComponent.onEdit = () => {
      editPointComponent.render();
      container.replaceChild(
          editPointComponent.element,
          pointComponent.element);
      pointComponent.unrender();
    };

    editPointComponent.onSubmit = (newObject) => {

      point.type = newObject.type;
      point.offers = newObject.offers;
      point.price = newObject.price;
      point.destination = newObject.destination;
      point.timeStart = newObject.timeStart;
      point.timeEnd = newObject.timeEnd;

      editPointComponent.blockSave();

      api.updatePoint({id: point.id, data: point.toRAW()})
        .then((newData) => {
          editPointComponent.unblockSave();
          pointComponent.update(newData);
          pointComponent.render();
          container.replaceChild(pointComponent.element, editPointComponent.element);
          editPointComponent.unrender();
        })
        .catch(() => {
          editPointComponent.catchError();
          editPointComponent.unblockSave();
        });
    };

    editPointComponent.onDelete = (id) => {
      editPointComponent.blockDelete();
      api.deletePoint(id)
        .then(editPointComponent.unrender())
        .catch(() => {
          editPointComponent.catchError();
          editPointComponent.unblockDelete();
        });
    };
    container.appendChild(pointComponent.render());
  }
};

getMessageWaite();
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
      renderPoints(points);
      getChart(points);
    })
    .catch(getMessageError);
  });
