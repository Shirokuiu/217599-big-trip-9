export default class MainController {
  constructor() {
    this._container = null;
  }

  set container(value) {
    this._container = value;
  }

  get container() {
    return this._container;
  }

  init() {}
}
