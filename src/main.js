import TripInfo from './components/trip-info';
import Menu from './components/menu';
import Filters from './components/filters';
import NoEventsScreen from './components/noEventsScreen';

import TripController from "./controllers/trip";

import {getPoint, getMenu, getFilter} from './data';
import {render, Position, APP_SETTINGS} from './utils';

const renderTripInfo = (tripInfoMocks) => {
  const tripInfo = new TripInfo(tripInfoMocks);

  render(document.querySelector(`.trip-main`), tripInfo.getElement(), Position.AFTERBEGIN);
};

const renderMenu = (menuMocks) => {
  const menu = new Menu(menuMocks);

  render(document.querySelector(`.trip-controls__menu-wrap`), menu.getElement());
};

const renderFilters = (filterMocks) => {
  const filters = new Filters(filterMocks);

  render(document.querySelector(`.trip-main__trip-controls`), filters.getElement());
};

const renderNoEventsScreen = () => {
  const noEventsScreen = new NoEventsScreen();

  render(document.querySelector(`.trip-events`), noEventsScreen.getElement());
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
    tripController.init();
    renderTripInfo(APP_SETTINGS);
    renderMenu(menuData);
    renderFilters(filtersData);
    return;
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
const tripController = new TripController(document.querySelector(`.trip-events`), pointsData);

APP_SETTINGS.totalPrice = calculateTotalPrice(pointsData);
APP_SETTINGS.month = tripDates.month;
APP_SETTINGS.startTrip = tripDates.tripStart;
APP_SETTINGS.endTrip = tripDates.tripEnd;
APP_SETTINGS.cities = getAllCities(pointsData);

appInit();
