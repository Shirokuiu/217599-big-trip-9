import MainController from "./main-controller";
import Point from "../components/point";
import PointEdit from "../components/point-edit";

import {render} from "../utils";

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import moment from 'moment';

export default class PointController extends MainController {
  constructor(container, pointMock, appInfo, pointTypes, onDataChange, onChangeView) {
    super();
    this.container = container;
    this._pointMock = pointMock;
    this._pointTypes = pointTypes;
    this._timeDifference = this._calculateDifferenceTime(this._pointMock);
    this._point = new Point(pointMock, appInfo, this._timeDifference);
    this._pointEdit = new PointEdit(pointMock, this._pointTypes);
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;

    this._init();
  }

  _init() {
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

      const formData = new FormData(this._pointEdit.getElement().querySelector(`.event--edit`));
      const entry = {
        type: {
          type: this._pointEdit.getElement().querySelector(`.event__type-btn`).dataset.triptypeIcon,
          icon: this._pointEdit.getElement().querySelector(`.event__type-btn`).dataset.triptypeIcon,
          title: this._pointEdit.getElement().querySelector(`.event__type-output`).textContent.trim(),
        },
        city: {
          cities: [
            {
              name: `Amsterdam`,
              description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
            },
            {
              name: `Chamonix`,
              description: `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`
            },
            {
              name: `Paris`,
              description: `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
            },
            {
              name: `Berlin`,
              description: `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
            }
          ],
          citySelected: {
            name: this._pointEdit.getElement().querySelector(`#event-destination-1`).value,
            description: this._pointEdit.getElement().querySelector(`.event__destination-description`).textContent,
          }
        },
        dates: {
          date: +moment(new Date(formData.get(`event-start-time`))).format(`x`),
          from: +moment(new Date(formData.get(`event-start-time`))).format(`x`),
          to: +moment(new Date(formData.get(`event-end-time`))).format(`x`),
        },
        price: this._pointEdit.getElement().querySelector(`.event__input--price`).value,
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

    this._pointEdit.getElement().querySelector(`#event-destination-1`).addEventListener(`change`, this._onSelectCityClick.bind(this));

    render(this.container.getElement().querySelector(`.trip-events__list`), this._point.getElement());

    const endDate = flatpickr(this._pointEdit.getElement().querySelector(`#event-end-time-1`), {
      enableTime: true,
      dateFormat: `d.m.Y H:i`,
      defaultDate: this._pointMock.dates.to
    });

    flatpickr(this._pointEdit.getElement().querySelector(`#event-start-time-1`), {
      enableTime: true,
      dateFormat: `d.m.Y H:i`,
      defaultDate: this._pointMock.dates.from,
      onChange(selectedDates) {
        endDate.set(`minDate`, selectedDates[0]);
      }
    });
  }

  _setDefaultView() {
    if (this.container.getElement().contains(this._pointEdit.getElement())) {
      this.container.getElement().querySelector(`.trip-events__list`)
        .replaceChild(this._point.getElement(), this._pointEdit.getElement());
    }
  }

  _onSelectCityClick(evt) {
    this._pointEdit.getElement().querySelector(`.event__destination-description`)
      .textContent = this._pointMock.city.cities.find(({name}) => name === evt.target.value).description;
  }

  _calculateDifferenceTime(pointMock) {
    const timeDifference = this._getDifferenceTime(pointMock);

    if (timeDifference <= 60) {
      return `${timeDifference}M`;
    } else if (timeDifference > 60 && timeDifference < 1440) {
      return `${Math.trunc((timeDifference / 60))}H ${Math
        .trunc((60 * (+`0.${parseInt(this._replaceNumbersAfterDot((timeDifference / 60)).slice(0, 2), 10)}`)))}M`;
    } else {
      return 0;
    }
  }

  _replaceNumbersAfterDot(num) {
    return ((num.toString().includes(`.`)) ? (num.toString().split(`.`).pop()) : (`00`));
  }

  _getDifferenceTime(pointMock) {
    return moment(pointMock.dates.to).diff(pointMock.dates.from, `m`);
  }
}
