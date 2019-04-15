import {Component} from './component.js';
import {getTotalCost} from './utils.js';

class TotalCost extends Component {
  constructor(cost) {
    super();
    this._cost = cost;
  }

  get template() {
    return `
    <span class="trip__total-cost">&euro;&nbsp;${this._cost}</span>`.trim();
  }

  bind() {

  }

  unbind() {

  }

}

export const renderTotalCost = (data) => {
  const container = document.querySelector(`.trip__total`);
  container.innerHTML = `Total: `;
  const totalCost = getTotalCost(data);
  const cost = new TotalCost(totalCost);
  container.appendChild(cost.render());
};
