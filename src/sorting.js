import Component from './component.js';

export default class Sorting extends Component {
  constructor(filter) {
    super();

    this._filter = filter.name;
    this._isChecked = filter.isChecked;
    this._isSorting = filter.isSorting;
    this._onSort = null;
    this._onFilterButtonClick = this._onFilterButtonClick.bind(this);
  }

  get template() {
    return this._isSorting ? `
        <span>
        <input type="radio" name="trip-sorting" id="sorting-${this._filter.toLowerCase()}" value="${this._filter.toLowerCase()}" ${this._isChecked ? `checked` : ``}>
        <label class="trip-sorting__item trip-sorting__item--${this._filter.toLowerCase()}" for="sorting-${this._filter.toLowerCase()}">${this._filter}</label>
        </span>`.trim() : `<span class="trip-sorting__item trip-sorting__item--${this._filter.toLowerCase()}">${this._filter}</span>`;
  }

  _onFilterButtonClick() {
    return typeof this._onSort === `function` && this._onSort();
  }

  set onSort(fn) {
    this._onSort = fn;
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
