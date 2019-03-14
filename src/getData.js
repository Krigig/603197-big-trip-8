import {getRamdomArray, random, getRandomData} from './utils.js';

export default () => {
  const icons = {
    taxi: `🚕 `,
    bus: `🚌 `,
    train: `🚂`,
    ship: `🛳️`,
    transport: `🚊`,
    drive: `🚗`,
    flight: `✈️ `,
    checkIn: `🏨`,
    sightseeing: `🏛️ `,
    restaurant: `🍴`
  };
  const type = Object.keys(icons)[Math.floor(Math.random() * 3)];
  const timeStartHour = Math.floor(random(0, 24));
  const timeStartMinute = Math.floor(random(0, 60));
  const timeEndHour = Math.floor(random(0, 24));
  const timeEndMinute = Math.floor(random(0, 60));

  return {
    type,
    icon: icons[type],
    city: [`Amsterdam`, `Geneva`, `Chamonix`][Math.floor(Math.random() * 3)],
    picture: `http://picsum.photos/300/150?r=${Math.random()}`,
    offers: getRamdomArray([...new Set([
      {text: `Add luggage +&euro;&nbsp;${random(1, 340)}`,
        id: `add-luggage`
      },
      {text: `Switch to comfort class +&euro;&nbsp;${random(1, 230)}`,
        id: `switch-to-comfort-class`
      },
      {text: `Add meal +&euro;&nbsp;${random(1, 330)}`,
        id: `add-meal`
      },
      {text: `Choose seats +&euro;&nbsp;${random(1, 430)}`,
        id: `choose-seats`
      },
    ])], 3),
    description: getRamdomArray([
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      `Cras aliquet varius magna, non porta ligula feugiat eget.`,
      `Fusce tristique felis at fermentum pharetra.`,
      `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
      `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
      `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
      `Sed sed nisi sed augue convallis suscipit in sed felis.`,
      `Aliquam erat volutpat.`,
      `Nunc fermentum tortor ac porta dapibus.`,
      `In rutrum ac purus sit amet tempus.`], 3),
    price: Math.floor(Math.random() * 1000),
    date: getRandomData(`01.03.2018`, `01.12.2018`),
    timeStart: [timeStartHour < 10 ? `0` + timeStartHour.toString() : timeStartHour.toString()] + `:` + [timeStartMinute < 10 ? `0` + timeStartMinute : timeStartMinute],
    timeEnd: [timeEndHour < 10 ? `0` + timeEndHour : timeEndHour] + `:` + [timeEndMinute < 10 ? `0` + timeEndMinute : timeEndMinute]
  };
};
