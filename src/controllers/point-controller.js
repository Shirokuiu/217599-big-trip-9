import MainController from "./main-controller";
import Point from "../components/point";
import PointEdit from "../components/point-edit";

import {render} from "../utils";

export default class PointController extends MainController {
  constructor(container, pointMock, appInfo, pointTypes, onDataChange, onChangeView) {
    super();
    this.container = container;
    this._pointMock = pointMock;
    this._pointTypes = pointTypes;
    this._point = new Point(pointMock, appInfo);
    this._pointEdit = new PointEdit(pointMock, this._pointTypes);
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;

    this.init();
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        document
          .querySelector(`.trip-events__list`).replaceChild(this._point.getElement(), this._pointEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._point.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      const tripTypeIcon = this._pointEdit.getElement().querySelector(`.event__type-btn`).dataset.triptypeIcon;

      this._onChangeView();
      document
        .querySelector(`.trip-events__list`).replaceChild(this._pointEdit.getElement(), this._point.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);

      if (tripTypeIcon === `check-in` || tripTypeIcon === `sightseeing` || tripTypeIcon === `restaurant`) {
        this._pointEdit.getElement().querySelector(`.event__available-offers`).style.display = `none`;
        Array.from(this._pointEdit.getElement().querySelectorAll(`.event__offer-checkbox`))
          .forEach((checkbox) => (checkbox.checked = false));
        return;
      }
      this._pointEdit.getElement().querySelector(`.event__available-offers`).style.display = `flex`;
    });

    this._pointEdit.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, () => {
      document
        .querySelector(`.trip-events__list`).replaceChild(this._point.getElement(), this._pointEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);

      const entry = {
        type: {
          type: this._pointEdit.getElement().querySelector(`.event__type-btn`).dataset.triptypeIcon,
          icon: this._pointEdit.getElement().querySelector(`.event__type-btn`).dataset.triptypeIcon,
          title: this._pointEdit.getElement().querySelector(`.event__type-output`).textContent.trim(),
        },
        cities: this._pointEdit.getElement().querySelector(`.event__input--destination`).value,
        dates: {
          date: this._pointMock.dates.date,
          from: this._pointMock.dates.from,
          to: this._pointMock.dates.to,
        },
        prices: this._pointEdit.getElement().querySelector(`.event__input--price`).value,
        description: this._pointEdit.getElement().querySelector(`.event__destination-description`).textContent,
        images: Array.from(this._pointEdit.getElement().querySelectorAll(`.event__photo`)).map(({src}) => src),
        options: Array.from(this._pointEdit.getElement().querySelectorAll(`.event__offer-selector`))
          .map((selector) => {
            return {
              title: selector.querySelector(`.event__offer-title`).textContent.trim(),
              price: selector.querySelector(`.event__offer-price`).textContent,
              isActive: selector.querySelector(`.event__offer-checkbox`).checked
            };
          })
      };
      this._onDataChange(entry, this._pointMock);
    });

    this._pointEdit.getElement().querySelector(`.event__type-list`).addEventListener(`click`, (evt) => {
      if (evt.target.value) {
        const value = evt.target.value;
        const text = evt.target.dataset.text;

        this._pointEdit.getElement().querySelector(`.event__type-btn`).dataset.triptypeIcon = value;
        this._pointEdit.getElement().querySelector(`.event__type-icon`).src = `img/icons/${value}.png`;
        this._pointEdit.getElement().querySelector(`.event__type-output`).textContent = text;

        if (value === `check-in` || value === `sightseeing` || value === `restaurant`) {
          this._pointEdit.getElement().querySelector(`.event__available-offers`).style.display = `none`;
          Array.from(this._pointEdit.getElement().querySelectorAll(`.event__offer-checkbox`))
            .forEach((checkbox) => (checkbox.checked = false));
          return;
        }
        this._pointEdit.getElement().querySelector(`.event__available-offers`).style.display = `flex`;
      }
    });

    this._pointEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      document
        .querySelector(`.trip-events__list`).replaceChild(this._point.getElement(), this._pointEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this.container.getElement().querySelector(`.trip-events__list`), this._point.getElement());
  }

  _setDefaultView() {
    if (this.container.getElement().contains(this._pointEdit.getElement())) {
      this.container.getElement().querySelector(`.trip-events__list`)
        .replaceChild(this._point.getElement(), this._pointEdit.getElement());
    }
  }
}
