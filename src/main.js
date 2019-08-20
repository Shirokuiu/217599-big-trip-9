import {makeTripInfo} from './components/trip-info';
import {makeMenu} from './components/menu';
import {makeFilter} from './components/filters';
import {makeSort} from './components/sorting';
import {makeContent} from './components/content';
import {makeCard} from './components/card';
import {makeCardEdit} from './components/card-edit';
import {getEvent, getMenu, getFilter} from './data';

const APP_SETTINGS = {
  totalCards: 4,
  totalPrice: 0,
  month: null,
  startTrip: null,
  endTrip: null,
  cities: null,
};

const render = (container, component, place = `afterend`) => {
  container.insertAdjacentHTML(place, component);
};

const makeData = (createData, count = APP_SETTINGS.totalCards) => {
  let newArr = [];
  newArr = new Array(count).fill(``).map(createData);
  return newArr;
};

const calculateTotalPrice = (cards = cardsData) => {
  let totalPrice = 0;
  totalPrice = cards.map((it) => +it.prices).reduce((first, second) => first + second);
  return totalPrice;
};

const getTripDates = (cards = cardsData) => {
  return {
    month: new Date(cards.sort((a, b) => a.dates.map((it) => it.date) - b.dates.map((it) => it.date))[0].dates[0].date).toDateString().split(` `)[1],
    tripStart: new Date(cards.sort((a, b) => a.dates.map((it) => it.date) - b.dates.map((it) => it.date))[0].dates[0].date).toDateString().split(` `)[2],
    tripEnd: new Date(cards.sort((a, b) => a.dates.map((it) => it.date) - b.dates.map((it) => it.date))[cards.length - 1].dates[0].date).toDateString().split(` `)[2],
  };
};

const getTotalCities = (cards = cardsData) => {
  let cities = [];
  cities = cards.sort((a, b) => a.dates.map((it) => it.date) - b.dates.map((it) => it.date)).map((card) => card.cities);
  return cities;
};

const cardsData = makeData(getEvent);
const menuData = getMenu();
const filtersData = getFilter();
const tripDates = getTripDates();
APP_SETTINGS.totalPrice = calculateTotalPrice();
APP_SETTINGS.month = tripDates.month;
APP_SETTINGS.startTrip = tripDates.tripStart;
APP_SETTINGS.endTrip = tripDates.tripEnd;
APP_SETTINGS.cities = getTotalCities();

render(document.querySelector(`.trip-main`), makeTripInfo(APP_SETTINGS), `afterbegin`);
menuData.reverse().forEach((menuItem) => render(document.querySelector(`.trip-tabs`), makeMenu(menuItem), `afterbegin`));
filtersData.slice(1, 4).reverse().forEach((filter) => render(document.querySelector(`.trip-filters`), makeFilter(filter), `afterbegin`));
render(document.querySelector(`.trip-events > h2`), makeSort());
render(document.querySelector(`.trip-events .trip-events__trip-sort`), makeContent());
render(document.querySelector(`.trip-events__list`), makeCardEdit(cardsData[0]), `afterbegin`);
cardsData.slice(1, cardsData.length).sort((a, b) => a.dates.map((it) => it.date) - b.dates.map((it) => it.date)).forEach((card) => render(document.querySelector(`.trip-events__list`), makeCard(card), `beforeend`));
