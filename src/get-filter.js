import {Filter} from './filter-class.js';

const filterPoints = (points, filterName) => {
  switch (filterName) {
    case `everything`:
      return points;

    case `future`:
      return points.filter((it) => it.date > Date.now());

    case `past`:
      return points.filter((it) => it.date < Date.now());
  }
};

const renderFilters = (data, container, callback, filteredArray, filteresArrayContainer) => {
  container.innerHTML = ``;

  for (let i = 0; i < data.length; i++) {
    const filter = data[i];
    const filterComponent = new Filter(filter);

    filterComponent.onFilter = () => {
      const filterName = filter.name;
      const filteredPoints = filterPoints(filteredArray, filterName);
      callback(filteredPoints, filteresArrayContainer);
    };

    container.appendChild(filterComponent.render());
  }

};

export {renderFilters};
