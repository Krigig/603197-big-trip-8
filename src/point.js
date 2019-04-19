import Component from './component.js';
import {getDiffTimeParse} from './utils.js';

export default class Point extends Component {
  constructor(data, dictionary) {
    super();
    this._id = data.id;
    this._travelWay = dictionary.travelWay;
    this._type = data.type;
    this._icon = data.icon;
    this._destinations = dictionary.destinations;
    this._destination = data.destination;
    this._picture = data.picture;
    this._offersList = dictionary.offersList;
    this._offers = data.offers;
    this._checkedOffers = data.offers.filter((it) => it.accepted === true);
    this._description = data.description;
    this._price = data.price;
    this._date = data.date;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._tripDuration = data.tripDuration;
    this._isFavorite = data.isFavorite;

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
      <h3 class="trip-point__title">${this._type} to ${this._destination}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${this._timeStart} &nbsp;&mdash; ${this._timeEnd}</span>
        <span class="trip-point__duration">${getDiffTimeParse(this._tripDuration)}</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
      <ul class="trip-point__offers">
         ${this._checkedOffers.length > 3 ? this._checkedOffers.slice(0, 3)
                                                                .map((it) => (`<li><button class="trip-point__offer">${it.title} + € ${it.price}</button></li>`.trim()))
                                                                .join(``) : this._checkedOffers.map((it) => (`<li><button class="trip-point__offer">${it.title} + € ${it.price}</button></li>`.trim())).join(``)}
      </ul>
    </article>`.trim();
  }

  bind() {
    this._element
        .addEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._type = data.type;
    this._destination = data.destination;
    this._offers = data.offers;
    this._checkedOffers = data.offers.filter((it) => it.accepted === true);
    this._price = data.price;
    this._isFavorite = data.isFavorite;

    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._icon = this._travelWay.find((element) => element.name === this._type) ? this._travelWay.find((element) => element.name === this._type).icon : ``;
    this._tripDuration = data.tripDuration;
  }

}

