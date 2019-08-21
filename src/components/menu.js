export const makeMenu = ({title, isActive}) => `<a class="trip-tabs__btn ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${title}</a>`;
