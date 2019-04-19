import Component from './component.js';
import flatpickr from 'flatpickr';

export default class PointEdit extends Component {
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
    this._description = data.description;
    this._price = data.price;
    this._date = data.date;
    this._dateEnd = data.dateEnd;
    this._isFavorite = data.isFavorite;

    this._element = null;
    this._onSubmit = null;
    this._onDelete = null;
    this._onESC = null;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onESCButtonPress = this._onESCButtonPress.bind(this);
    this._onChangeDestinationButtonClick = this._onChangeDestinationButtonClick.bind(this);
    this._onChangeTypeButtonClick = this._onChangeTypeButtonClick.bind(this);
    this._onChangeFavorite = this._onChangeFavorite.bind(this);

    this._dateFlatpickr = null;
    this._timeStartFlatpickr = null;
    this._timeEndFlatpickr = null;

  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  set onESC(fn) {
    this._onESC = fn;
  }

  get template() {
    return `
<article class="point">
  <form action="" method="get" class="point__form">
    <header class="point__header">
      <label class="point__date">
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
          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${it.name}" name="travel-way" value="${it.name}" ${it.name === this._type ? `checked` : ``}>
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
          <option value="${it.name}"></option>
          `)).join(` `)}
        </datalist>
      </div>
      <div class="point__time">
          choose time
          <input class="point__input" type="text" value="${this._date}" name="timeStart" placeholder="19:00">
          <input class="point__input" type="text" value="${this._dateEnd}" name="timeEnd" placeholder="21:00">
      </div>

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
        ${this.favoriteTemplate()}
      </div>
    </header>

    <section class="point__details">
      <section class="point__offers">
        <h3 class="point__details-title">offers</h3>

        <div class="point__offers-wrap">
        ${this.offersTemplate()}
        </div>

      </section>
      <section class="point__destination">
        <h3 class="point__details-title">Destination</h3>
        <p class="point__destination-text">${this._description}</p>
        <div class="point__destination-images">
        ${this.pictureTemplate()}
        </div>
      </section>
      <input type="hidden" class="point__total-price" name="total-price" value="">
    </section>
  </form>
</article>`.trim();
  }


  _processForm(formData) {
    const entry = {
      date: ``,
      dateEnd: ``,
      type: this._type,
      price: ``,
      destination: ``,
      offers: this._offers,
      description: this._description,
      picture: this._picture,
      icon: this.icon,
      isFavorite: this._isFavorite,
    };
    const pointEditMapper = PointEdit.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (pointEditMapper[property]) {
        pointEditMapper[property](value);
      }
    }
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
    return typeof this._onDelete === `function` && this._onDelete(this._id);
  }

  _onESCButtonPress(evt) {
    return typeof this._onESC === `function` && this._onESC(evt);
  }

  _onChangeDestinationButtonClick(evt) {
    this._description = this._destinations.find((element) => element.name === evt.target.value) ? this._destinations.find((element) => element.name === evt.target.value).description : ``;
    this._picture = this._destinations.find((element) => element.name === evt.target.value) ? this._destinations.find((element) => element.name === evt.target.value).pictures : [];

    this._element.querySelector(`.point__destination-text`).innerHTML = this._description;
    this._element.querySelector(`.point__destination-images`).innerHTML = this.pictureTemplate();
  }

  _onChangeTypeButtonClick(evt) {
    if (this._offersList.some((it) => it.type === evt.target.value)) {
      this._offers = Object.assign({}, this._offersList.find((element) => element.type === evt.target.value)).offers.map((it) => ({
        id: it[`name`].split(` `).join(`-`),
        accepted: false,
        title: it.name,
        price: it.price,
      }));
    } else {
      this._offers = [];
    }
    this._type = evt.target.value;
    this._icon = this._travelWay.find((element) => element.name === this._type).icon;

    this._element.querySelector(`.point__destination-label`).innerHTML = this._type;
    this._element.querySelector(`.travel-way__label`).innerHTML = this._icon;
    this._element.querySelector(`.point__offers-wrap`).innerHTML = this.offersTemplate();
  }

  _onChangeFavorite() {
    this._isFavorite = !this._isFavorite;
    this._element.querySelector(`.paint__favorite-wrap`).innerHTML = this.favoriteTemplate();
  }

  pictureTemplate() {
    return `
        ${this._picture.map((it) => `<img src="${it.src}" alt="${it.description}" class="point__destination-image">`)}
       `;
  }

  offersTemplate() {
    return `${this._offers.map((it) => (`
          <input ${it.accepted ? `checked` : ``} class="point__offers-input visually-hidden" type="checkbox" id="${it.id}" name="offer" value="${it.id}">
          <label for="${it.id}" class="point__offers-label">
             <span class="point__offer-service">${it.title}</span> + €<span class="point__offer-price">${it.price}</span>
          </label>
          `.trim())).join(``)}`;
  }

  favoriteTemplate() {
    return `
        <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
        <label class="point__favorite" for="favorite">favorite</label>
      `;
  }

  catchError() {
    this._element.style.border = `2px solid red`;
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  blockSave() {
    this._element.querySelector(`.point__button--save`).disabled = true;
    this._element.querySelector(`.point__button--save`).innerHTML = `Saving...`;
    this._element.querySelector(`.point__button--delete`).disabled = true;
  }

  unblockSave() {
    this._element.querySelector(`.point__button--save`).disabled = false;
    this._element.querySelector(`.point__button--save`).innerHTML = `Save`;
    this._element.querySelector(`.point__button--delete`).disabled = false;
  }

  blockDelete() {
    this._element.querySelector(`.point__button--save`).disabled = true;
    this._element.querySelector(`.point__button--delete`).innerHTML = `Deleting...`;
    this._element.querySelector(`.point__button--delete`).disabled = true;
  }

  unblockDelete() {
    this._element.querySelector(`.point__button--save`).disabled = false;
    this._element.querySelector(`.point__button--delete`).innerHTML = `Delete`;
    this._element.querySelector(`.point__button--delete`).disabled = false;
  }

  bind() {
    const timeStartInput = this._element.querySelector(`.point__time [name=timeStart]`);
    const timeEndInput = this._element.querySelector(`.point__time [name=timeEnd]`);

    this._element.querySelector(`.point__form`)
        .addEventListener(`submit`, this._onSubmitButtonClick);

    this._element.querySelector(`.point__button--delete`)
        .addEventListener(`click`, this._onDeleteButtonClick);

    this._element.querySelector(`.point__destination-input`)
        .addEventListener(`change`, this._onChangeDestinationButtonClick);

    this._element.querySelector(`.travel-way__select`)
        .addEventListener(`change`, this._onChangeTypeButtonClick);

    this._element.querySelector(`.point__favorite`)
        .addEventListener(`click`, this._onChangeFavorite);

    document
        .addEventListener(`keydown`, this._onESCButtonPress);

    this._dateFlatpickr = flatpickr(this._element.querySelector(`.point__date .point__input`), {altInput: true, altFormat: `M j`, dateFormat: `M j Y`});
    this._dateFlatpickr.setDate(new Date(this._date));
    this._timeStartFlatpickr = flatpickr(timeStartInput, {'enableTime': true, 'altInput': true, 'altFormat': `H:i`, 'dateFormat': `Y-m-d H:i`, 'time_24hr': true, 'maxDate': ``});
    this._timeStartFlatpickr.setDate(new Date(this._date));
    this._timeEndFlatpickr = flatpickr(timeEndInput, {'enableTime': true, 'altInput': true, 'altFormat': `H:i`, 'dateFormat': `Y-m-d H:i`, 'time_24hr': true, 'minDate': timeStartInput.value});
    this._timeEndFlatpickr.setDate(new Date(this._dateEnd));

    timeStartInput.addEventListener(`change`, () => {
      this._timeEndFlatpickr.set({
        minDate: timeStartInput.value
      });
    });

    timeEndInput.addEventListener(`change`, () => {
      this._timeStartFlatpickr.set({
        maxDate: timeEndInput.value,
      });
    });
  }

  unbind() {
    this._element.querySelector(`.point__form`)
        .removeEventListener(`submit`, this._onSubmitButtonClick);

    this._element.querySelector(`.point__button--delete`)
        .removeEventListener(`click`, this._onDeleteButtonClick);

    this._element.querySelector(`.point__favorite`)
        .removeEventListener(`click`, this._onChangeFavorite);

    document
        .removeEventListener(`keydown`, this._onESCButtonPress);

    this._dateFlatpickr.destroy();
    this._timeStartFlatpickr.destroy();
    this._timeEndFlatpickr.destroy();
  }

  update(data) {
    this._type = data.type;
    this._destination = data.destination;
    this._offers = data.offers;
    this._price = data.price;
    this._description = data.description;
    this._date = data.date;
    this._dateEnd = data.dateEnd;
    this._icon = this._travelWay.find((element) => element.name === this._type) ? this._travelWay.find((element) => element.name === this._type).icon : ``;
    this._isFavorite = data.isFavorite;
  }

  static createMapper(target) {
    target.offers.map((it) => {
      it.accepted = false;
    });
    return {
      'price': (value) => {
        target.price = value;
      },
      'destination': (value) => {
        target.destination = value;
      },
      'travel-way': (value) => {
        target.type = value;
      },
      'offer': (value) => {
        target.offers.find((element) => element.id === value).accepted = true;
      },
      'timeStart': (value) => {
        target.date = value;
      },
      'timeEnd': (value) => {
        target.dateEnd = value;
      },
    };
  }
}

