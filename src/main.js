import {makeTripInfo} from './components/trip-info';
import {makeMenu} from './components/menu';
import {makeFilter} from './components/filters';
import {makeSort} from './components/sorting';
import {makeContent} from './components/content';
import Card from './components/card';
import CardEdit from './components/card-edit';
import {getEvent, getMenu, getFilter} from './data';
import {render as rendering, Position} from './utils';

const APP_SETTINGS = {
  totalCards: 4,
  totalPrice: 0,
  month: null,
  startTrip: null,
  endTrip: null,
  cities: null,
};

const renderCard = (cardsMocks) => {
  const card = new Card(cardsMocks);
  const cardEdit = new CardEdit(cardsMocks);

  card.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    document.querySelector(`.trip-events__list`).replaceChild(cardEdit.getElement(), card.getElement());
  });

  cardEdit.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, () => {
    document.querySelector(`.trip-events__list`).replaceChild(card.getElement(), cardEdit.getElement());
  });

  rendering(document.querySelector(`.trip-events__list`), card.getElement(), Position.BEFOREEND);
};

const render = (container, component, place = `afterend`) => {
  container.insertAdjacentHTML(place, component);
};

const makeData = (createData, count = APP_SETTINGS.totalCards) => {
  let newArr = [];
  newArr = new Array(count).fill(``).map(createData);
  return newArr;
};

const calculateTotalPrice = (cards) => {
  let totalPrice = 0;
  totalPrice = cards.map((it) => +it.prices).reduce((first, second) => first + second);
  return totalPrice;
};

const getTripDates = (cards) => {
  return {
    month: new Date(cards[0].dates[0].date).toDateString().split(` `)[1],
    tripStart: new Date(cards[0].dates[0].date).toDateString().split(` `)[2],
    tripEnd: new Date(cards[cards.length - 1].dates[0].date).toDateString().split(` `)[2],
  };
};

const getAllCities = (cards) => {
  let cities = [];
  cities = cards.map((card) => card.cities);
  return cities;
};

const cardsData = makeData(getEvent).
sort((a, b) => a.dates.map((it) => it.date) - b.dates.map((it) => it.date));
const menuData = getMenu();
const filtersData = getFilter();
const tripDates = getTripDates(cardsData);
APP_SETTINGS.totalPrice = calculateTotalPrice(cardsData);
APP_SETTINGS.month = tripDates.month;
APP_SETTINGS.startTrip = tripDates.tripStart;
APP_SETTINGS.endTrip = tripDates.tripEnd;
APP_SETTINGS.cities = getAllCities(cardsData);

render(document.querySelector(`.trip-main`), makeTripInfo(APP_SETTINGS), `afterbegin`);
menuData.reverse().
forEach((menuItem) => render(document.querySelector(`.trip-tabs`), makeMenu(menuItem), `afterbegin`));
filtersData.reverse().forEach((filter) => render(document.querySelector(`.trip-filters`), makeFilter(filter), `afterbegin`));
render(document.querySelector(`.trip-events > h2`), makeSort());
render(document.querySelector(`.trip-events .trip-events__trip-sort`), makeContent());
cardsData.forEach((card) => renderCard(card));
