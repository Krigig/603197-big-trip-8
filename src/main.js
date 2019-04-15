import {filters, sorting} from './filter-data.js';
import {API} from './api.js';
import {dictionary} from './dictionary';

import {renderFilters} from './get-filter.js';
import {renderSorting} from './get-sorting.js';

import {getChart} from './chart.js';

import {Point} from './point.js';
import {PointEdit} from './point-edit.js';
import {renderWrappers} from './renderWrappers.js';
import {ModelPoint} from './parseData.js';
import {isEscEvent} from './utils.js';
import {renderTotalCost} from './total-cost.js';
import moment from 'moment';

// переключение на статистику
document.querySelectorAll(`.view-switch__item`).forEach((switcher) => switcher.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  document.querySelectorAll(`.block`).forEach((item) => item.classList.add(`visually-hidden`));
  document.querySelector(`${evt.target.hash}`).classList.remove(`visually-hidden`);
  document.querySelectorAll(`.view-switch__item`).forEach((item) => item.classList.remove(`view-switch__item--active`));
  evt.target.classList.add(`view-switch__item--active`);
}));

// получение пунтков с сервера + их отрисовка
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const container = document.querySelector(`.trip-points`);

const getMessageWaite = () => {
  container.innerHTML = `Loading route...`;
};
const getMessageError = () => {
  container.innerHTML = `Something went wrong while loading your route info. Check your connection or try again later`;
};

const renderPoints = (points) => {
  renderWrappers(points, container);
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    let day = `#day-` + moment(point.date).format(`MMDDYYYY`);
    let containerPoints = container.querySelector(day).querySelector(`.trip-day__items`);

    const pointComponent = new Point(point, dictionary);
    const editPointComponent = new PointEdit(point, dictionary);

    const closeEditPoint = () => {
      pointComponent.render();
      containerPoints.replaceChild(pointComponent.element, editPointComponent.element);
      editPointComponent.unrender();
    };

    pointComponent.onEdit = () => {
      editPointComponent.render();
      containerPoints.replaceChild(
          editPointComponent.element,
          pointComponent.element);
      pointComponent.unrender();
    };

    editPointComponent.onSubmit = (newObject) => {

      point.type = newObject.type;
      point.offers = newObject.offers;
      point.price = newObject.price;
      point.destination = newObject.destination;
      point.date = newObject.date;
      point.dateEnd = newObject.dateEnd;

      editPointComponent.blockSave();

      api.updatePoint({id: point.id, data: point.toRAW()})
        .then((newData) => {
          editPointComponent.unblockSave();
          pointComponent.update(newData);
          closeEditPoint();
        })
        .then(() => {
          api.getPoints()
            .then((updatePoints) => {
              renderPoints(updatePoints);
              getChart(updatePoints);
              renderTotalCost(updatePoints);
            });
        })
        .catch(() => {
          editPointComponent.catchError();
          editPointComponent.unblockSave();
        });
    };

    editPointComponent.onDelete = (id) => {
      editPointComponent.blockDelete();
      api.deletePoint(id)
        .then(() => {
          api.getPoints()
            .then((newData) => {
              getChart(newData);
              renderTotalCost(newData);
            });
        })
        .then(() => editPointComponent.unrender())
        .catch(() => {
          editPointComponent.catchError();
          editPointComponent.unblockDelete();
        });
    };

    editPointComponent.onESC = (evt) => {
      isEscEvent(evt, closeEditPoint);
    };

    containerPoints.appendChild(pointComponent.render());
  }
};


const filtersContainer = document.querySelector(`.trip-filter`);
const sortingContainer = document.querySelector(`.trip-sorting`);

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
      renderFilters(filters, filtersContainer, renderPoints, points);

      renderSorting(sorting, sortingContainer, renderPoints, points);

      renderPoints(points);
      getChart(points);
      renderTotalCost(points);
    })
    .catch(getMessageError);
  });

document.querySelector(`.new-event`).addEventListener(`click`, function () {
  const newEventData = new ModelPoint({
    'id': ``,
    'type': ``,
    'destination': {
      'name': ``,
      'pictures': [],
      'description': ``,
    },
    'base_price': 0,
    'date_from': Date.now(),
    'date_to': Date.now(),
    'offers': [],
    'is_favorite': false
  });
  const newEvent = new PointEdit(newEventData, dictionary);
  const closeNewEvent = () => newEvent.unrender();
  newEvent.onSubmit = (newObject) => {
    newEventData.type = newObject.type;
    newEventData.offers = newObject.offers;
    newEventData.price = newObject.price;
    newEventData.destination = newObject.destination;
    newEventData.date = newObject.date;
    newEventData.dateEnd = newObject.dateEnd;
    newEventData.picture = newObject.picture;
    newEventData.description = newObject.description;

    newEvent.blockSave();
    let point = newEventData.toRAW();

    api.createPoint({point})
    .then(() => {
      api.getPoints()
      .then((points) => {
        renderPoints(points);
        getChart(points);
        renderTotalCost(points);
      });
    })
    .catch(getMessageError);
  };

  newEvent.onESC = (evt) => {
    isEscEvent(evt, closeNewEvent);
  };

  newEvent.onDelete = () => {
    closeNewEvent();
  };
  container.prepend(newEvent.render());
});
