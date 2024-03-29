import Component from "./component";

export default class Point extends Component {
  constructor({type, cities, dates, prices, options}, {maxOptionsToShow}) {
    super();
    this._type = type;
    this._cities = cities;
    this._dates = dates;
    this._prices = prices;
    this._options = options;
    this._maxOptionsToShow = maxOptionsToShow;
  }

  getTemplate() {
    return `<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type.icon}.png" alt="Event type icon">
                    </div>
                    <h3 class="event__title">${this._type.title} ${this._cities}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="2019-03-18T10:30"> ${this._dates.from} </time>
                        &mdash;
                        <time class="event__start-time" datetime="2019-03-18T10:30"> ${this._dates.to} </time>
                      </p>
                      <p class="event__duration">1H 30M</p>
                    </div>

                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">${this._prices}</span>
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

