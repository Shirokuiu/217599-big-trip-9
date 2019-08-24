import {createElement} from '../utils';

export default class TripInfo {
  constructor({totalCards, totalPrice, month, startTrip, endTrip, cities}) {
    this._totalPrice = totalPrice;
    this._month = month;
    this._startTrip = startTrip;
    this._endTrip = endTrip;
    this._cities = cities;
    this._totalCards = totalCards;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<section class="trip-main__trip-info  trip-info">
      ${this._totalCards ? `<div class="trip-info__main">
        <h1 class="trip-info__title">${this._cities.length > 2 ? (this._cities[0] + ` ... ` + this._cities[this._cities.length - 1]) : this._cities.map((city) => city).join(``)}</h1>
        <p class="trip-info__dates">${this._month} ${this._startTrip}&nbsp;&mdash;&nbsp;${this._endTrip}</p>
      </div>` : ``}
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._totalPrice}</span>
      </p>
    </section>`;
  }
}
