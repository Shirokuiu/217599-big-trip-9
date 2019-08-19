import {makeRoute} from './components/route';
import {makeMenu} from './components/menu';
import {makeFilter} from './components/filters';
import {makeSort} from './components/sorting';
import {makeContent} from './components/content';
import {makeCard} from './components/card';
import {makeCardEdit} from './components/card-edit';
import {makeStats} from './components/stats';
import {getEvent, getMenu} from './data';

const APP_SETTINGS = {
  totalCards: 3
};

const render = (container, component, place = `afterend`) => {
  container.insertAdjacentHTML(place, component);
};

const makeData = (createData, count = APP_SETTINGS.totalCards) => {
  let newArr;
  
  return newArr = new Array(count).fill(``).map(createData);
};

const cardsData = makeData(getEvent);
const menuData = getMenu();

render(document.querySelector(`.trip-main__trip-info`), makeRoute(), `afterbegin`);
menuData.forEach((menuItem) => render(document.querySelector(`.trip-tabs`), makeMenu(menuItem)), `afterbegin`);
menuData.forEach((menuItem) => document.querySelector(`.trip-tabs`).insertAdjacentHTML(`beforeend`, makeMenu(menuItem)));
render(document.querySelector(`.trip-main__trip-controls`), makeFilter(), `beforeend`);
render(document.querySelector(`.trip-events > h2`), makeSort());
render(document.querySelector(`.trip-events .trip-events__trip-sort`), makeContent());

render(document.querySelector(`.trip-events__list`), makeCardEdit(cardsData[0]), `afterbegin`);

cardsData.forEach((card) => render(document.querySelector(`.trip-events__list`), makeCard(card), `beforeend`));