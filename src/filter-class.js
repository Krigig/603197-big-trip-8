import {Component} from './component.js';

export class Filter extends Component {
  constructor(filter) {
    super();

    this._filter = filter.name;
    this._isChecked = filter.isChecked;
    this._onFilter = null;
    this._onFilterButtonClick = this._onFilterButtonClick.bind(this);
  }

  get template() {
    return `
        <span>
          <input type="radio" id="filter-${this._filter}" name="filter" value="${this._filter}" ${this._isChecked ? `checked` : ``}>
          <label class="trip-filter__item" for="filter-${this._filter}">${this._filter}</label>
        </span>`.trim();
  }

  _onFilterButtonClick() {
    return typeof this._onFilter === `function` && this._onFilter();
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  bind() {
    this._element
        .addEventListener(`click`, this._onFilterButtonClick);
  }

  unbind() {
    this._element
        .removeEventListener(`click`, this._onFilterButtonClick);
  }

}
