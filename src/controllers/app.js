import TripController from "./trip";
import HeaderController from "./head";

import {getPoint, getMenu, getFilter} from '../data';

export default class AppController {
  constructor() {
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
    this._headerController = new HeaderController(document.querySelector(`.trip-main`), this._pointMocks, this._menuMocks, this._filterMocks, this._tripInfo);
    this._tripController = new TripController(document.querySelector(`.trip-events`), this._pointMocks, this.appInfo);
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
      .sort((a, b) => a.dates.map(({date}) => date) - b.dates.map(({date}) => date));
    this._calculateDifferenceTime(newPointMocks);
    return newPointMocks;
  }

  _calculateDifferenceTime(pointMocks) {
    pointMocks.map(({dates}) => (dates[0].timeDifference = Math.abs(+dates[0].to - +dates[0].from)));
  }
}
