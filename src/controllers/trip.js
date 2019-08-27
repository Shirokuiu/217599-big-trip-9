import Controller from "./controller";

import Content from "../components/content";
import TripDay from "../components/trip-day";
import Sort from "../components/sort";
import Point from "../components/point";
import PointEdit from "../components/point-edit";
import NoEventsScreen from "../components/noEventsScreen";

import {render} from '../utils';

export default class TripController extends Controller {
  constructor(pointMocks, appInfo) {
    super();
    this.container = document.querySelector(`.trip-events`);
    this._pointMocks = pointMocks;
    this._appInfo = appInfo;
    this._sort = new Sort();
    this._content = new Content();
    this._tripDay = new TripDay();
    this._noEventsScreen = new NoEventsScreen();
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

  _renderPoint(pointMocks, settings) {
    const point = new Point(pointMocks, settings);
    const pointEdit = new PointEdit(pointMocks);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        document.querySelector(`.trip-events__list`).replaceChild(point.getElement(), pointEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    point.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      document.querySelector(`.trip-events__list`).replaceChild(pointEdit.getElement(), point.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    pointEdit.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, () => {
      document.querySelector(`.trip-events__list`).replaceChild(point.getElement(), pointEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    pointEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      document.querySelector(`.trip-events__list`).replaceChild(point.getElement(), pointEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(document.querySelector(`.trip-events__list`), point.getElement());
  }

  _sortPointMocks(evt) {
    this._tripDay.getElement().querySelector(`.trip-events__list`).innerHTML = ``;
    switch (evt.target.id) {
      case `sort-event`:
        this._pointMocks.forEach((point) => this._renderPoint(point, this._appInfo));
        break;
      case `sort-time`:
        this._copyMocks(this._pointMocks)
          .sort((a, b) => a.dates[0].timeDifference - b.dates[0].timeDifference)
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
