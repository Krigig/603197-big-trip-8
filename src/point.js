import {Component} from './component.js';
export class Point extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._icon = data.icon;
    this._city = data.city;
    this._picture = data.picture;
    this._offers = data.offers;
    this._description = data.description;
    this._price = data.price;
    this._date = data.date;

    this._element = null;
    this._onEdit = null;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
    <article class="trip-point">
      <i class="trip-icon">${this._icon}</i>
      <h3 class="trip-point__title">${this._type} to ${this._city}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">10:00&nbsp;&mdash; 11:00</span>
        <span class="trip-point__duration">1h 30m</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
      <ul class="trip-point__offers">
         ${this._offers.map((it) => (`<li><button class="trip-point__offer">${it.text}</button></li>`.trim())).join(``)}
      </ul>
    </article>`.trim();
  }

  bind() {
    this._element
        .addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element
        .removeEvenetListener(`click`, this._onEditButtonClick);
  }

}

