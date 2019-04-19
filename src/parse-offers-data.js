
export default class ModelOffer {
  constructor(data) {
    this.type = data.type;
    this.offers = data.offers.map((it) => ({
      id: it[`name`].split(` `).join(`-`),
      accepted: false,
      title: it.name,
      price: it.price,
    }));
  }

  toRAW() {
    return {
      'type': this.type,
      'offers': this.offers.map((it) => ({
        name: it.title,
        price: it.price
      }))
    };
  }

  static parseOffer(data) {
    return new ModelOffer(data);
  }

  static parseOffers(data) {
    return data.map(ModelOffer.parseOffer);
  }
}
