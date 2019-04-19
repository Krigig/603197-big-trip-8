import Filter from './filter-class.js';
import {renderSorting} from './get-sorting.js';
import {sorting} from './filter-data.js';

const filterPoints = (points, filterName) => {
  switch (filterName) {
    case `everything`:
      return points;

    case `future`:
      return points.filter((it) => it.date > Date.now());

    case `past`:
      return points.filter((it) => it.date < Date.now());
  }
  return points;
};

const renderFilters = (data, container, callback, filteredArray) => {
  const sortingContainer = document.querySelector(`.trip-sorting`);
  container.innerHTML = ``;

  const filterNameNow = data.find((it) => it.isChecked === true).name;
  let fiteredPoints = filterPoints(filteredArray, filterNameNow);
  renderSorting(sorting, sortingContainer, callback, fiteredPoints);

  for (const filter of data) {
    const filterComponent = new Filter(filter);
    filterComponent.onFilter = () => {
      data.map((it) => {
        it.isChecked = false;
      });
      filter.isChecked = true;
      const filterName = filter.name;
      fiteredPoints = filterPoints(filteredArray, filterName);
      renderSorting(sorting, sortingContainer, callback, fiteredPoints);
    };

    container.appendChild(filterComponent.render());
  }

};

export {renderFilters};
