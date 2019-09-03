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
  city: {
    cities: [
      {
        name: `Amsterdam`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
      },
      {
        name: `Chamonix`,
        description: `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`
      },
      {
        name: `Paris`,
        description: `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
      },
      {
        name: `Berlin`,
        description: `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
      }
    ],
    citySelected: [
      {
        name: `Amsterdam`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
      },
      {
        name: `Chamonix`,
        description: `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`
      },
      {
        name: `Paris`,
        description: `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
      },
      {
        name: `Berlin`,
        description: `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
      }
    ].sort(() => Math.random() - 0.5)[0],
  },
  dates: [
    {
      date: Date.now() + 1 + 3 * 24 * 60 * 60 * 1000,
      from: Date.now() + 1 + 3 * 24 * 60 * 60 * 1000,
      to: Date.now() + 1 + 3 * 24 * 60 * 60 * 1000 + 2 * 3600 * 1000,
    },
    {
      date: Date.now() + 1 + 2 * 24 * 60 * 60 * 1000,
      from: Date.now() + 1 + 2 * 24 * 60 * 60 * 1000,
      to: Date.now() + 1 + 2 * 24 * 60 * 60 * 1000 + 3 * 3600 * 1000,
    },
    {
      date: Date.now() + 1 + 5 * 24 * 60 * 60 * 1000,
      from: Date.now() + 1 + 5 * 24 * 60 * 60 * 1000,
      to: Date.now() + 1 + 5 * 24 * 60 * 60 * 1000 + 5 * 3600 * 1000,
    },
    {
      date: Date.now() + 1 + 6 * 24 * 60 * 60 * 1000,
      from: Date.now() + 1 + 6 * 24 * 60 * 60 * 1000,
      to: Date.now() + 1 + 6 * 24 * 60 * 60 * 1000 + 4 * 3600 * 1000,
    },
    {
      date: Date.now() + 1 + 7 * 24 * 60 * 60 * 1000,
      from: Date.now() + 1 + 7 * 24 * 60 * 60 * 1000,
      to: Date.now() + 1 + 7 * 24 * 60 * 60 * 1000 + 2 * 3600 * 1000,
    },
    {
      date: Date.now() + 1 + 3 * 24 * 60 * 60 * 1000,
      from: Date.now() + 1 + 3 * 24 * 60 * 60 * 1000,
      to: Date.now() + 1 + 3 * 24 * 60 * 60 * 1000 + 3 * 3600 * 1000,
    },
  ].sort(() => Math.random() - 0.5)[0],
  price: [
    `100`,
    `30`,
    `200`
  ].sort(() => Math.random() - 0.5)[0],
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
