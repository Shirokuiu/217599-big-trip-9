import MainController from "./main-controller";
import PointController from "./point-controller";

import Content from "../components/content";
import TripDay from "../components/trip-day";
import Sort from "../components/sort";
import NoEventsScreen from "../components/noEventsScreen";

import {render, unrender} from '../utils';
import {pointTypes} from '../data';

export default class TripController extends MainController {
  constructor(pointMocks, appInfo) {
    super();
    this.container = document.querySelector(`.trip-events`);
    this._pointMocks = pointMocks;
    this._appInfo = appInfo;
    this._sort = new Sort();
    this._content = new Content();
    this._tripDay = new TripDay();
    this._noEventsScreen = new NoEventsScreen();
    this._pointTypes = pointTypes;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    if (this._appInfo.totalPoints) {
      render(this.container, this._sort.getElement());
      render(this.container, this._content.getElement());
      render(this._content.getElement(), this._tripDay.getElement());
      this._pointMocks.forEach((point) => this._renderPoint(point, this._appInfo));

      this._sort.getElement().querySelector(`.trip-events__trip-sort`)
        .addEventListener(`change`, this._sortPointMocks.bind(this));
      return;
    }
    render(this.container, this._noEventsScreen.getElement());
  }

  _renderTripDay() {
    unrender(this._tripDay.getElement());
    this._tripDay.removeElement();

    render(this._content.getElement(), this._tripDay.getElement());
    this._pointMocks.forEach((point) => this._renderPoint(point));
  }

  _renderPoint(pointMock) {
    const tripController = new PointController(this._tripDay, pointMock, this._appInfo, this._pointTypes, this._onDataChange, this._onChangeView);
    this._subscriptions.push(tripController._setDefaultView.bind(tripController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    this._pointMocks[this._pointMocks.findIndex((point) => point === oldData)] = newData;
    this._renderTripDay();
  }

  _sortPointMocks(evt) {
    this._tripDay.getElement().querySelector(`.trip-events__list`).innerHTML = ``;
    switch (evt.target.id) {
      case `sort-event`:
        this._pointMocks.forEach((point) => this._renderPoint(point, this._appInfo));
        break;
      case `sort-time`:
        this._copyMocks(this._pointMocks)
          .sort((a, b) => a.dates.timeDifference - b.dates.timeDifference)
          .forEach((point) => this._renderPoint(point, this._appInfo));
        break;
      case `sort-price`:
        this._copyMocks(this._pointMocks)
          .sort((a, b) => a.prices[0] - b.prices[0])
          .forEach((point) => this._renderPoint(point, this._appInfo));
        break;
    }
  }

  _copyMocks(pointMocks) {
    return pointMocks.slice();
  }
}
