import {Wrapper} from './point-wrapper.js';
import moment from 'moment';

export const renderWrappers = (data, container) => {
  container.innerHTML = ``;
  const dataCopy = data.concat().sort((a, b) => a.date - b.date);

  for (let i = 0; i < dataCopy.length; i++) {
    const point = dataCopy[i];
    if (i === 0 || moment(dataCopy[i - 1].date).format(`L`) !== moment(point.date).format(`L`)) {
      const pointWrapper = new Wrapper(point);
      container.appendChild(pointWrapper.render());
    }
  }

};
