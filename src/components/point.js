import Component from './component';
import moment from 'moment';

export default class Point extends Component {
  constructor({type, city, dates, price, options}, {maxOptionsToShow}, timeDifference) {
    super();
    this._type = type;
    this._city = city;
    this._dates = dates;
    this._price = price;
    this._options = options;
    this._maxOptionsToShow = maxOptionsToShow;
    this._timeDifference = timeDifference;
  }

  getTemplate() {
    return `<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type.icon}.png" alt="Event type icon">
                    </div>
                    <h3 class="event__title">${this._type.title} ${this._city.citySelected.name}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="${moment(this._dates.from).format(`HH:mm`)}"> ${moment(this._dates.from).format(`HH:mm`)} </time>
                        &mdash;
                        <time class="event__start-time" datetime="${moment(this._dates.to).format(`HH:mm`)}"> ${moment(this._dates.to).format(`HH:mm`)} </time>
                      </p>
                      <p class="event__duration">${this._timeDifference}</p>
                    </div>

                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">${this._price}</span>
                    </p>

                    <h4 class="visually-hidden">Offers:</h4>
                    <ul class="event__selected-offers">
                      ${this._options.filter((option) => option.isActive).map((option) => `<li class="event__offer">
                        <span class="event__offer-title">${option.title}</span>
                        &plus;
                        &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
                       </li>`).slice(0, this._maxOptionsToShow).join(``)}
                    </ul>

                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </div>
                </li>`;
  }
}

