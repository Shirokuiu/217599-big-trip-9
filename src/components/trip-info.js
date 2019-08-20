export const makeTripInfo = ({totalPrice, month, startTrip, endTrip, cities}) => `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${cities.length > 2 ? (cities[0] + ` ... ` + cities[cities.length - 1]) : cities.map((city) => city).join(``)}</h1>

    <p class="trip-info__dates">${month} ${startTrip}&nbsp;&mdash;&nbsp;${endTrip}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>
</section>`;
