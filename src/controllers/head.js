import Menu from "../components/menu";
import Filter from "../components/filters";
import TripInfo from "../components/trip-info";

import {render, Position} from '../utils';

export default class HeaderController {
  constructor(container, pointMocks, menuMocks, filterMocks, tripInfo) {
    this._container = container;
    this._pointMocks = pointMocks;
    this._menuMocks = menuMocks;
    this._filterMocks = filterMocks;
    this._appInfo = tripInfo;
    this._tripInfoDetails = this._getTripInfo(this._pointMocks);
    this._tripInfo = new TripInfo(this._tripInfoDetails);
    this._menu = new Menu(this._menuMocks);
    this._filter = new Filter(this._filterMocks);
  }

  init() {
    render(this._container, this._tripInfo.getElement(), Position.AFTERBEGIN);
    render(this._container.querySelector(`.trip-main__trip-controls`), this._menu.getElement());
    render(this._container.querySelector(`.trip-main__trip-controls`), this._filter.getElement());
  }

  _calculateTotalPrice(pointMocks) {
    let totalPrice = 0;
    if (pointMocks.length) {
      totalPrice = pointMocks.map(({prices}) => +prices).reduce((first, second) => first + second);
    }
    return totalPrice;
  }

  _getTripDates(pointMocks) {
    if (pointMocks.length) {
      return {
        month: new Date(pointMocks[0].dates[0].date).toDateString().split(` `)[1],
        tripStart: new Date(pointMocks[0].dates[0].date).toDateString().split(` `)[2],
        tripEnd: new Date(pointMocks[pointMocks.length - 1].dates[0].date).toDateString().split(` `)[2],
      };
    }
    return {
      month: this._appInfo.totalPoints,
      tripStart: this._appInfo.totalPoints,
      tripEnd: this._appInfo.totalPoints,
    };
  }

  _getAllCities(pointMocks) {
    let cities = [];
    cities = pointMocks.map((point) => point.cities);
    return cities;
  }

  _getTripInfo(pointMocks) {
    return {
      totalPoints: this._appInfo.totalPoints,
      totalPrice: this._calculateTotalPrice(pointMocks),
      month: this._getTripDates(pointMocks).month,
      startTrip: this._getTripDates(pointMocks).tripStart,
      endTrip: this._getTripDates(pointMocks).tripEnd,
      cities: this._getAllCities(pointMocks),
    };
  }
}
