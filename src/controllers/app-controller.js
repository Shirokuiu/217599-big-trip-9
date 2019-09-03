import MainController from "./main-controller";
import TripController from "./trip-controller";
import HeaderController from "./head-controller";

import {getPoint, getMenu, getFilter} from '../data';

export default class AppController extends MainController {
  constructor() {
    super();
    this._totalPoints = 4;
    this._totalPrice = 0;
    this._maxOptionsToShow = 3;
    this._month = null;
    this._startTrip = null;
    this._endTrip = null;
    this._cities = null;
    this._pointMocks = this._makePointsMock(getPoint);
    this._menuMocks = getMenu();
    this._filterMocks = getFilter();
    this._tripInfo = this.appInfo;
    this._headerController = new HeaderController(this._pointMocks, this._menuMocks, this._filterMocks, this._tripInfo);
    this._tripController = new TripController(this._pointMocks, this.appInfo);
  }

  init() {
    this._headerController.init();
    this._tripController.init();
  }

  get appInfo() {
    return {
      totalPoints: this._totalPoints,
      totalPrice: this._totalPrice,
      maxOptionsToShow: this._maxOptionsToShow,
      month: this._month,
      startTrip: this._startTrip,
      endTrip: this._endTrip,
      cities: this._cities,
    };
  }

  _makePointsMock(pointMocks, count = this.appInfo.totalPoints) {
    const newPointMocks = new Array(count).fill(``).map(pointMocks)
      .sort((a, b) => a.dates.date - b.dates.date);
    return newPointMocks;
  }
}
