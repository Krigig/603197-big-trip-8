import moment from 'moment';
import {dictionary} from './dictionary.js';

export class ModelPoint {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`] || ``;
    this.icon = dictionary.travelWay.find((element) => element.name === data[`type`]).icon;
    this.destination = data.destination.name;
    this.picture = data.destination[`pictures`] || ``;
    this.description = data.destination.description;
    this.price = data[`base_price`];
    this.timeStart = moment(data[`date_from`]).format(`h:mm`);
    this.timeEnd = moment(data[`date_to`]).format(`h:mm`);
    this.offers = data.offers;
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
      'date_from': moment(this.timeStart, `h:mm`).format(`x`),
      'date_to': moment(this.timeEnd, `h:mm`).format(`x`),
      'offers': this.offers
    };
  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}
