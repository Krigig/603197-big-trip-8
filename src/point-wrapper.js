import Component from './component.js';
import moment from 'moment';

export default class Wrapper extends Component {
  constructor(data) {
    super();

    this._date = data.date;
    this._dateFlatpickr = null;
    this._dateNumberFlatpickr = null;
  }

  get template() {
    return `
        <section class="trip-day" id="day-${moment(this._date).format(`MMDDYYYY`)}">
          <article class="trip-day__info">
            <span class="trip-day__caption">Day</span>
            <p class="trip-day__number">${moment(this._date).format(`DD`)}</p>
            <h2 class="trip-day__title">${moment(this._date).format(`MMM YY`)}</h2>
          </article>

          <div class="trip-day__items">

          </div>
        </section>`.trim();
  }

  bind() {

  }

  unbind() {

  }

}
