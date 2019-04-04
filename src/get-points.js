import {Point} from './point.js';
import {PointEdit} from './point-edit.js';


const deletePoint = (points, i) => {
  points.splice(i, 1);
  return points;
};

const getUpdatePoint = (points, i, newPoint) => {
  points[i] = Object.assign({}, points[i], newPoint);
  return points[i];
};

const renderPoints = (points, container, dictionary, api) => {
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
      point = getUpdatePoint(points, i, newObject);

      api.updatePoint({id: point.id, data: point.toRAW()})
        .then((newData) => {
          pointComponent.update(newData);
          pointComponent.render();

          container.replaceChild(pointComponent.element, editPointComponent.element);

          editPointComponent.unrender();
        });
    };

    // editPointComponent.onDelete = () => {
    //   deletePoint(points, i);
    //   editPointComponent.unrender();
    // };

    editPointComponent.onDelete = () => {
      api.deletePoint(i)
        .then(() => api.getPoints())
        .then(renderPoints);
    };

    container.appendChild(pointComponent.render());
  }
};

export {renderPoints};
