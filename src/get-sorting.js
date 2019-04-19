import Sorting from './sorting.js';
import {getTotalPrice} from './utils.js';

const sortingPoints = (points, filterName) => {
  switch (filterName) {
    case `Event`:
      return points;

    case `Time`:
      return points.concat().sort((a, b) => b.tripDuration - a.tripDuration);

    case `Price`:
      return points.concat().sort((a, b) => getTotalPrice(b) - getTotalPrice(a));
  }
  return points;
};

const getSorting = (sortedArray, sortingName, callback) => {
  const sortedPoints = sortingPoints(sortedArray, sortingName);
  callback(sortedPoints);
};

const renderSorting = (data, container, callback, sortedArray) => {
  container.innerHTML = ``;
  const sortingNameNow = data.find((it) => it.isChecked === true).name;
  getSorting(sortedArray, sortingNameNow, callback);

  for (const sorting of data) {
    const sortingComponent = new Sorting(sorting);

    sortingComponent.onSort = () => {
      if (sorting.isSorting) {
        data.map((it) => {
          it.isChecked = false;
        });
        sorting.isChecked = true;
        const sortingName = sorting.name;
        getSorting(sortedArray, sortingName, callback);
      }
    };

    container.appendChild(sortingComponent.render());
  }

};

export {renderSorting};
