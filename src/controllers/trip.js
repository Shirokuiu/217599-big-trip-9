import Content from "../components/content";
import TripDay from "../components/trip-day";
import Sort from "../components/sort";
import Point from "../components/point";
import PointEdit from "../components/point-edit";

import {render, APP_SETTINGS} from '../utils';

export default class TripController {
  constructor(container, pointMocks) {
    this._container = container;
    this._pointMocks = pointMocks;
    this._sort = new Sort();
    this._content = new Content();
    this._tripDay = new TripDay();
  }

  init() {
    render(this._container, this._sort.getElement());
    render(this._container, this._content.getElement());
    render(this._content.getElement(), this._tripDay.getElement());

    this._pointMocks.forEach((point) => this._renderPoint(point, APP_SETTINGS));
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
}
