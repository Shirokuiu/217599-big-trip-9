import Component from "./component";

export default class Menu extends Component {
  constructor(menuData) {
    super();
    this._menuData = menuData;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs trip-tabs">
        ${this._menuData.map(({title, isActive}) => `<a class="trip-tabs__btn ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${title}</a>`).join(``)}
      </nav>`;
  }
}
