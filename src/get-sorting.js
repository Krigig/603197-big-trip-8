import {Sorting} from './sorting.js';
import {getTotalPrice} from './utils.js';

const filterPoints = (points, filterName) => {
  switch (filterName) {
    case `Event`:
      return points;

    case `Time`:
      return points.concat().sort((a, b) => a.tripDuration - b.tripDuration);

    case `Price`:
      return points.concat().sort((a, b) => getTotalPrice(a) - getTotalPrice(b));
  }
  return points;
};

const renderSorting = (data, container, callback, filteredArray) => {
  container.innerHTML = ``;

  for (let i = 0; i < data.length; i++) {
    const filter = data[i];
    const filterComponent = new Sorting(filter);

    filterComponent.onFilter = () => {
      const filterName = filter.name;
      const filteredPoints = filterPoints(filteredArray, filterName);
      callback(filteredPoints);
    };

    container.appendChild(filterComponent.render());
  }

};

export {renderSorting};
