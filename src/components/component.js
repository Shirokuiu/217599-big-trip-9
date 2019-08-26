import {createElement, unrender} from '../utils';

export default class Component {
  constructor() {
    this._element = null;
  }

  set element(value) {
    this._element = value;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement(component, element = null, value = null) {
    unrender(component);
    if (element) {
      this.element = value;
    }
  }

  getTemplate() {}
}
