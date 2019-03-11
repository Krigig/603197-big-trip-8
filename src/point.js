import {createElement} from './utils.js';

export class Point {
  constructor(data) {
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
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  get element() {
    return this._element;
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

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  bind() {
    this._element
        .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unbind() {
    // Удаление обработчиков
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}

