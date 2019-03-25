import {Component} from './component.js';
import flatpickr from 'flatpickr';


export class PointEdit extends Component {
  constructor(data) {
    super();
    this._travelWay = data.travelWay;
    this._type = data.type;
    this._icon = data.icon;
    this._destinations = data.destinations;
    this._destination = data.destination;
    this._picture = data.picture;
    this._offersList = data.offersList;
    this._offers = data.offers;
    this._description = data.description;
    this._price = data.price;
    this._date = data.date;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;

    this._element = null;
    this._onSubmit = null;
    this._onDelete = null;


    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);

    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);

    this._dateFlatpickr = null;
    this._timeStartFlatpickr = null;
    this._timeEndFlatpickr = null;

  }

  _processForm(formData) {
    const entry = {
      date: ``,
      type: this._type,
      price: ``,
      destination: ``,
      offers: [],
      timeStart: ``,
      timeEnd: ``,
      icon: ``
    };
    const pointEditMapper = PointEdit.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      pointEditMapper[property] && pointEditMapper[property](value);
    }
    console.log(entry);
    return entry;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.point__form`));
    const newData = this._processForm(formData);
    this.update(newData);
    return typeof this._onSubmit === `function` && this._onSubmit(newData);
  }

  _onDeleteButtonClick() {
    return typeof this._onDelete === `function` && this._onDelete();
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onReset(fn) {
    this._onReset = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get template() {
    return `
<article class="point">
  <form action="" method="get" class="point__form">
    <header class="point__header">
      <label class="point__date" style="display:block">
        choose day
        <!-- <input class="point__input" type="text" value="${Date.now()}" name="day"> -->
         <input class="point__input" type="text" value="${this._date}" name="day">
      </label>

      <div class="travel-way">
        <label class="travel-way__label" for="travel-way__toggle">${this._icon}</label>

        <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

        <div class="travel-way__select">
          <div class="travel-way__select-group">
          ${this._travelWay.map((it) => (`
          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${it.name}" name="travel-way" value="${it.name}">
          <label class="travel-way__select-label" for="travel-way-${it.name}">${it.icon} ${it.name}</label>`
            .trim())).join(``)}
          </div>

        </div>
      </div>

      <div class="point__destination-wrap">
        <label class="point__destination-label" for="destination">${this._type}</label>
        <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination}" name="destination">
        <datalist id="destination-select">
          ${this._destinations.map((it) => (`
          <option value="${it}"></option>
          `.trim())).join(``)}
          <option value="airport"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="hotel"></option>
        </datalist>
      </div>

      <span class="point__time" style="display: flex">
        <input class="point__input" type="text" value="${this._timeStart}" name="timeStart">
        <input class="point__input" type="text" value="${this._timeEnd}" name="timeEnd">
      </span>

      <label class="point__price">
        write price
        <span class="point__price-currency">€</span>
        <input class="point__input" type="text" value="${this._price}" name="price">
      </label>

      <div class="point__buttons">
        <button class="point__button point__button--save" type="submit">Save</button>
        <button class="point__button point__button--delete" type="reset">Delete</button>
      </div>

      <div class="paint__favorite-wrap">
        <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
        <label class="point__favorite" for="favorite">favorite</label>
      </div>
    </header>

    <section class="point__details">
      <section class="point__offers">
        <h3 class="point__details-title">offers</h3>

        <div class="point__offers-wrap">
          ${this._offersList.map((it) => (`
          <input ${this._offers.reduce((acc, item) => acc || item === it.id, false) ? `checked` : ``} class="point__offers-input visually-hidden" type="checkbox" id="${it.id}" name="offer" value="${it.id}">
          <label for="${it.id}" class="point__offers-label">
             <span class="point__offer-service">${it.text}</span> + €<span class="point__offer-price">${it.price}</span>
          </label>
          `.trim())).join(``)}
        </div>

      </section>
      <section class="point__destination">
        <h3 class="point__details-title">Destination</h3>
        <p class="point__destination-text">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>
        <div class="point__destination-images">
          <img src="${this._picture}" alt="picture from place" class="point__destination-image">
        </div>
      </section>
      <input type="hidden" class="point__total-price" name="total-price" value="">
    </section>
  </form>
</article>`.trim();
  }

  bind() {
    const timeStartInput = this._element.querySelector(`.point__time [name=timeStart]`);
    const timeEndInput = this._element.querySelector(`.point__time [name=timeEnd]`);

    this._element.querySelector(`.point__form`)
        .addEventListener(`submit`, this._onSubmitButtonClick);

    this._element.querySelector(`.point__button--delete`)
        .addEventListener(`click`, this._onDeleteButtonClick);

    this._dateFlatpickr = flatpickr(this._element.querySelector(`.point__date .point__input`), {altInput: true, altFormat: `M j`, dateFormat: `M j Y`});
    this._dateFlatpickr.setDate(new Date(this._date));
    this._timeStartFlatpickr = flatpickr(timeStartInput, {enableTime: true, noCalendar: true, dateFormat: `H:i`, time_24hr: true, maxDate: timeEndInput.value});
    this._timeEndFlatpickr = flatpickr(timeEndInput, {enableTime: true, noCalendar: true, dateFormat: `H:i`, time_24hr: true, minDate: timeStartInput.value, maxDate: `23:59:59`});

    timeStartInput.addEventListener(`change`, () => {
      this._timeEndFlatpickr.set({
        minDate: timeStartInput.value
      });
    });

    timeEndInput.addEventListener(`change`, () => {
      this._timeStartFlatpickr.set({
        minDate: timeEndInput.value
      });
    });
  }

  unbind() {
    this._element.querySelector(`.point__form`)
        .removeEventListener(`submit`, this._onSubmitButtonClick);

    this._element.querySelector(`.point__button--delete`)
        .removeEventListener(`click`, this._onDeleteButtonClick);

    this._dateFlatpickr.destroy();
    this._timeStartFlatpickr.destroy();
    this._timeEndFlatpickr.destroy();
  }

  update(data) {
    this._type = data.type;
    this._destination = data.destination;
    this._offers = data.offers;
    this._price = data.price;
    this._date = data.date;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._icon = this._travelWay.find((element) => element.name === this._type).icon;
  }

  static createMapper(target) {
    return {
      'day': (value) => {
        target.date = value;
      },
      'price': (value) => {
        target.price = value;
      },
      'time': (value) => {
        target.time = value;
      },
      'destination': (value) => {
        target.destination = value;
      },
      'travel-way': (value) => {
        target.type = value;
      },
      'offer': (value) => target.offers.push(value),
      'timeStart': (value) => {
        target.timeStart = value;
      },
      'timeEnd': (value) => {
        target.timeEnd = value;
      },
    };
  }

}

