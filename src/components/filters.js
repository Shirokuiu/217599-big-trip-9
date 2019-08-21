export const makeFilter = ({title, isActive}) => `
              <div class="trip-filters__filter">
                <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${title.toLowerCase()}" ${isActive ? `checked` : ``}>
                <label class="trip-filters__filter-label" for="filter-${title.toLowerCase()}">${title}</label>
              </div>
            `;
