export const makeCard = ({types, cities, dates, prices, options}) => `
                <li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      ${types.map((type) => `<img class="event__type-icon" width="42" height="42" src="img/icons/${type.icon}.png" alt="Event type icon">`)}
                    </div>
                    ${types.map((type) => `<h3 class="event__title">${type.title} ${cities}</h3>`)}

                    <div class="event__schedule">
                      <p class="event__time">
                        ${dates.map((it) => `<time class="event__start-time" datetime="2019-03-18T10:30"> ${it.from} </time>`)}
                        &mdash;
                        ${dates.map((it) => `<time class="event__start-time" datetime="2019-03-18T10:30"> ${it.to} </time>`)}
                      </p>
                      <p class="event__duration">1H 30M</p>
                    </div>

                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">${prices}</span>
                    </p>

                    <h4 class="visually-hidden">Offers:</h4>
                    <ul class="event__selected-offers">
                      ${options.filter((option) => option.isActive).map((option) => `<li class="event__offer">
                        <span class="event__offer-title">${option.title}</span>
                        &plus;
                        &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
                       </li>`).slice(0, 2).join(``)}
                    </ul>

                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </div>
                </li>`;
