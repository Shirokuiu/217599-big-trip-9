import TripInfo from './components/trip-info';
import Menu from './components/menu';
import Filters from './components/filters';
import Sort from './components/sort';
import Content from './components/content';
import Point from './components/point';
import PointEdit from './components/point-edit';
import NoEventsScreen from './components/noEventsScreen';

import {getPoint, getMenu, getFilter} from './data';
import {render, Position} from './utils';

const APP_SETTINGS = {
  totalCards: 4,
  totalPrice: 0,
  maxOptionsToShow: 3,
  month: null,
  startTrip: null,
  endTrip: null,
  cities: null,
};

const renderPoint = (pointMocks, settings) => {
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

  render(document.querySelector(`.trip-events__list`), point.getElement(), Position.BEFOREEND);
};

const renderContent = () => {
  const content = new Content();

  render(document.querySelector(`.trip-events .trip-events__trip-sort`), content.getElement(), Position.BEFOREEND);
};

const renderTripInfo = (tripInfoMocks) => {
  const tripInfo = new TripInfo(tripInfoMocks);

  render(document.querySelector(`.trip-main`), tripInfo.getElement(), Position.AFTERBEGIN);
};

const renderMenu = (menuMocks) => {
  const menu = new Menu(menuMocks);

  render(document.querySelector(`.trip-controls__menu-wrap`), menu.getElement(), Position.BEFOREEND);
};

const renderFilters = (filterMocks) => {
  const filters = new Filters(filterMocks);

  render(document.querySelector(`.trip-main__trip-controls`), filters.getElement(), Position.BEFOREEND);
};

const renderSort = () => {
  const sort = new Sort();

  render(document.querySelector(`.trip-events__sort-wrap`), sort.getElement(), Position.BEFOREEND);
};

const renderNoEventsScreen = () => {
  const noEventsScreen = new NoEventsScreen();

  render(document.querySelector(`.trip-events`), noEventsScreen.getElement(), Position.BEFOREEND);
};

const calculateTotalPrice = (pointMocks) => {
  let totalPrice = 0;
  if (pointMocks.length) {
    totalPrice = pointMocks.map(({prices}) => +prices).reduce((first, second) => first + second);
  }
  return totalPrice;
};

const getTripDates = (pointMocks) => {
  if (pointMocks.length) {
    return {
      month: new Date(pointMocks[0].dates[0].date).toDateString().split(` `)[1],
      tripStart: new Date(pointMocks[0].dates[0].date).toDateString().split(` `)[2],
      tripEnd: new Date(pointMocks[pointMocks.length - 1].dates[0].date).toDateString().split(` `)[2],
    };
  }
  return {
    month: APP_SETTINGS.totalCards,
    tripStart: APP_SETTINGS.totalCards,
    tripEnd: APP_SETTINGS.totalCards,
  };
};

const getAllCities = (pointMocks) => {
  let cities = [];
  cities = pointMocks.map((point) => point.cities);
  return cities;
};

const makeData = (pointsMocks, count = APP_SETTINGS.totalCards) => {
  let newArr = [];
  newArr = new Array(count).fill(``).map(pointsMocks);
  return newArr;
};

const appInit = () => {
  if (APP_SETTINGS.totalCards) {
    renderSort();
    renderContent();
    pointsData.forEach((point) => renderPoint(point, APP_SETTINGS));
  }
  renderTripInfo(APP_SETTINGS);
  renderMenu(menuData);
  renderFilters(filtersData);
  renderNoEventsScreen();
};

const pointsData = makeData(getPoint).sort((a, b) => a.dates.map(({date}) => date) - b.dates.map(({date}) => date));
const menuData = getMenu();
const filtersData = getFilter();
const tripDates = getTripDates(pointsData);

APP_SETTINGS.totalPrice = calculateTotalPrice(pointsData);
APP_SETTINGS.month = tripDates.month;
APP_SETTINGS.startTrip = tripDates.tripStart;
APP_SETTINGS.endTrip = tripDates.tripEnd;
APP_SETTINGS.cities = getAllCities(pointsData);

appInit();
