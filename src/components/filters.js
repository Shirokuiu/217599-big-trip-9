import {createElement} from '../utils';

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">
                ${this._filters.map(({title, isActive}) => `<div class="trip-filters__filter">
                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${title.toLowerCase()}" ${isActive ? `checked` : ``}>
                  <label class="trip-filters__filter-label" for="filter-${title.toLowerCase()}">${title}</label>
                </div>`).join(``)}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
  }
}
