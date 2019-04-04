
export class ModelOffer {
  constructor(data) {
    this.id = data[`name`].split(` `).join(`-`);
    this.accepted = false;
    this.title = data.name;
    this.price = data.price;
  }

  toRAW() {
    return {
      'accepted': this.accepted,
      'name': this.title,
      'price': this.price
    };
  }

  static parseOffer(data) {
    return {type: data.type, offers: data.offers.map((it) => new ModelOffer(it))};
  }

  static parseOffers(data) {
    return data.map(ModelOffer.parseOffer);
  }
}
