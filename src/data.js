export const pointTypes = [
  {
    type: `taxi`,
    icon: `taxi`,
    title: `Taxi to`,
  },
  {
    type: `bus`,
    icon: `bus`,
    title: `Bus to`,
  },
  {
    type: `train`,
    icon: `train`,
    title: `Train to`,
  },
  {
    type: `ship`,
    icon: `ship`,
    title: `Ship to`,
  },
  {
    type: `transport`,
    icon: `transport`,
    title: `Transport to`,
  },
  {
    type: `drive`,
    icon: `drive`,
    title: `Drive to`,
  },
  {
    type: `flight`,
    icon: `flight`,
    title: `Flight to`,
  },
  {
    type: `check`,
    icon: `check-in`,
    title: `Check into`,
  },
  {
    type: `sightseeing`,
    icon: `sightseeing`,
    title: `Sightseeing`,
  },
  {
    type: `restaurant`,
    icon: `restaurant`,
    title: `Restaurant`,
  }
];

export const getPoint = () => ({
  type: [
    {
      type: `taxi`,
      icon: `taxi`,
      title: `Taxi to`,
    },
    {
      type: `bus`,
      icon: `bus`,
      title: `Bus to`,
    },
    {
      type: `train`,
      icon: `train`,
      title: `Train to`,
    },
    {
      type: `ship`,
      icon: `ship`,
      title: `Ship to`,
    },
    {
      type: `transport`,
      icon: `transport`,
      title: `Transport to`,
    },
    {
      type: `drive`,
      icon: `drive`,
      title: `Drive to`,
    },
    {
      type: `flight`,
      icon: `flight`,
      title: `Flight to`,
    },
    {
      type: `check`,
      icon: `check-in`,
      title: `Check into`,
    },
    {
      type: `sightseeing`,
      icon: `sightseeing`,
      title: `Sightseeing`,
    },
    {
      type: `restaurant`,
      icon: `restaurant`,
      title: `Restaurant`,
    }
  ].sort(() => Math.random() - 0.5)[0],
  cities: [
    `Amsterdam`,
    `Chamonix`,
    `Paris`,
    `Berlin`
  ].sort(() => Math.random() - 0.5)[0],
  dates: [
    {
      date: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
      from: `12.25`,
      to: `14.10`,
    },
    {
      date: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
      from: `12.22`,
      to: `14.05`,
    },
    {
      date: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
      from: `10.40`,
      to: `11.10`,
    },
    {
      date: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
      from: `14.30`,
      to: `16.05`,
    },
    {
      date: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
      from: `12.25`,
      to: `13.35`,
    },
    {
      date: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
      from: `10.30`,
      to: `11.00`,
    },
  ].sort(() => Math.random() - 0.5)[0],
  prices: [
    `100`,
    `30`,
    `200`
  ].sort(() => Math.random() - 0.5).slice(0, 1),
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ].sort(() => Math.random() - 0.5).slice(1, Math.floor(Math.random() * 9))[0],
  images: new Array(Math.floor(Math.random() * 3) + 1).fill(`http://picsum.photos/300/150?r=${Math.random()}.jpg`),
  options: [
    {
      title: `Add luggage`,
      price: `10`,
      isActive: Boolean(Math.round(Math.random()))
    },
    {
      title: `Switch to comfort class`,
      price: `150`,
      isActive: Boolean(Math.round(Math.random()))
    },
    {
      title: `Add meal`,
      price: `2`,
      isActive: Boolean(Math.round(Math.random()))
    },
    {
      title: `Choose seats`,
      price: `9`,
      isActive: Boolean(Math.round(Math.random()))
    },
  ]
});

export const getMenu = () => ([
  {
    title: `Table`,
    isActive: true,
  },
  {
    title: `Stats`,
    isActive: false,
  },
]);

export const getFilter = () => ([
  {
    title: `Everything`,
    isActive: true
  },
  {
    title: `Future`,
    isActive: false
  },
  {
    title: `Past`,
    isActive: false
  }
]);
