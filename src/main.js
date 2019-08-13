import {getRoute} from './components/route';
import {getMenu} from './components/menu';
import {getFilters} from './components/filters';
import {getSort} from './components/sorting';
import {getContent} from './components/content';
import {getCard} from './components/card';
import {getCardEdit} from './components/card-edit';
import {getStats} from './components/stats';

const render = (container, component, place = `afterend`) => {
  container.insertAdjacentHTML(place, component);
};

render(document.querySelector(`.trip-main__trip-info`), getRoute(), `afterbegin`);
render(document.querySelector(`.trip-main__trip-controls > h2`), getMenu());
render(document.querySelector(`.trip-main__trip-controls`), getFilters(), `beforeend`);
render(document.querySelector(`.trip-events > h2`), getSort());
render(document.querySelector(`.trip-events .trip-events__trip-sort`), getContent());

new Array(3).fill().forEach(() => render(document.querySelector(`.trip-days`), getCard(), `afterbegin`));
render(document.querySelector(`.trip-days`), getCardEdit(), `afterbegin`);
render(document.querySelector(`.trip-events`), getStats());