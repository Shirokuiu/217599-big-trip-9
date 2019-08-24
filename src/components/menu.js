import {createElement} from '../utils';

export default class Menu {
  constructor(menuData) {
    this._menuData = menuData;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs trip-tabs">
        ${this._menuData.map(({title, isActive}) => `<a class="trip-tabs__btn ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${title}</a>`).join(``)}
      </nav>`;
  }
}
