import Component from "./component";

export default class TripInfo extends Component {
  constructor({totalPoints, totalPrice, month, startTrip, endTrip, cities}) {
    super();
    this._totalPrice = totalPrice;
    this._month = month;
    this._startTrip = startTrip;
    this._endTrip = endTrip;
    this._cities = cities;
    this._totalPoints = totalPoints;
  }

  getTemplate() {
    return `<section class="trip-main__trip-info  trip-info">
      ${this._totalPoints ? `<div class="trip-info__main">
        <h1 class="trip-info__title">${this._cities.length > 2 ? (this._cities[0] + ` ... ` + this._cities[this._cities.length - 1]) : this._cities.map((city) => city).join(``)}</h1>
        <p class="trip-info__dates">${this._month} ${this._startTrip}&nbsp;&mdash;&nbsp;${this._endTrip}</p>
      </div>` : ``}
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._totalPrice}</span>
      </p>
    </section>`;
  }
}
