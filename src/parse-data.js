import moment from 'moment';
import {dictionary} from './dictionary.js';
import {getDiffTime} from './utils.js';

export default class ModelPoint {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`] || ``;
    this.icon = this.type !== `` ? dictionary.travelWay.find((element) => element.name === data[`type`]).icon : ``;
    this.destination = data.destination.name;
    this.picture = data.destination[`pictures`] || [];
    this.description = data.destination.description || ``;
    this.price = data[`base_price`] || ``;
    this.date = +data[`date_from`] || ``;
    this.dateEnd = +data[`date_to`] || ``;
    this.timeStart = moment(data[`date_from`], `x`).format(`HH:mm`);
    this.timeEnd = moment(data[`date_to`], `x`).format(`HH:mm`);
    this.tripDuration = getDiffTime(data[`date_from`], data[`date_to`]);
    this.offers = data.offers.map((it) => ({
      'id': it.title.split(` `).join(`-`),
      'accepted': it.accepted,
      'title': it.title,
      'price': it.price
    }));
    this.isFavorite = data[`is_favorite`];
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'destination': {
        'name': this.destination,
        'pictures': this.picture,
        'description': this.description,
      },
      'base_price': this.price,
      'date_from': moment(this.date, `YYYY-MM-DD HH:mm`).format(`x`),
      'date_to': moment(this.dateEnd, `YYYY-MM-DD HH:mm`).format(`x`),
      'offers': this.offers,
      'is_favorite': this.isFavorite
    };
  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}
