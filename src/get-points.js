import {Point} from './point.js';
import {PointEdit} from './point-edit.js';

const deletePoint = (points, i) => {
  points.splice(i, 1);
  return points;
};

const updatePoint = (points, i, newPoint) => {
  points[i] = Object.assign({}, points[i], newPoint);
  return points[i];
};

const renderPoints = (points, container, dictionary) => {
  container.innerHTML = ``;

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const pointComponent = new Point(point, dictionary);
    const editPointComponent = new PointEdit(point, dictionary);

    pointComponent.onEdit = () => {
      editPointComponent.render();
      container.replaceChild(
          editPointComponent.element,
          pointComponent.element);
      pointComponent.unrender();
    };

    editPointComponent.onChangeDestination = (newObject) => {
      const updatedPoint = updatePoint(points, i, newObject);
      editPointComponent.update(updatedPoint);

    };

    editPointComponent.onSubmit = (newObject) => {
      const updatedPoint = updatePoint(points, i, newObject);

      pointComponent.update(updatedPoint);
      pointComponent.render();
      container.replaceChild(
          pointComponent.element,
          editPointComponent.element);
      editPointComponent.unrender();
    };

    editPointComponent.onDelete = () => {
      deletePoint(points, i);
      editPointComponent.unrender();
    };

    container.appendChild(pointComponent.render());
  }
};

export {renderPoints};
