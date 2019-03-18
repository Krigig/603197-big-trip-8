import {getRamdomArray, random, getRandomData} from './utils.js';

export default () => {
  const travelWay = [
    {name: `taxi`, icon:  `🚕 `},
    {name: `bus`, icon: `🚌 `},
    {name: `train`, icon: `🚂`},
    {name: `ship`, icon: `🛳️`},
    {name: `transport`, icon: `🚊`},
    {name: `drive`, icon: `🚗`},
    {name: `flight`, icon: `✈️ `},
    {name: `checkIn`, icon: `🏨`},
    {name: `sightseeing`, icon: `🏛️ `},
    {name: `restaurant`, icon: `🍴`},
  ];

  const type = travelWay[Math.floor(Math.random() * travelWay.length)].name;
  const timeStartHour = Math.floor(random(0, 24));
  const timeStartMinute = Math.floor(random(0, 60));
  const timeEndHour = Math.floor(random(0, 24));
  const timeEndMinute = Math.floor(random(0, 60));
  const timeStart = [timeStartHour < 10 ? `0` + timeStartHour.toString() : timeStartHour.toString()] + `:` + [timeStartMinute < 10 ? `0` + timeStartMinute : timeStartMinute];
  const timeEnd = [timeEndHour < 10 ? `0` + timeEndHour : timeEndHour] + `:` + [timeEndMinute < 10 ? `0` + timeEndMinute : timeEndMinute];
  const destinations = [`Amsterdam`, `Geneva`, `Chamonix`, `hotel`, `airport`, `Paris`, `Berlin`, `Milano`];
  const offersList = [
    {text: `Add luggage`,
      price: random(1, 330),
      id: `add-luggage`
    },
    {text: `Switch to comfort class`,
      price: random(1, 330),
      id: `switch-to-comfort-class`
    },
    {text: `Add meal`,
      price: random(1, 330),
      id: `add-meal`
    },
    {text: `Choose seats`,
      price: random(1, 330),
      id: `choose-seats`
    },
  ];

  return {
    travelWay,
    destinations,
    offersList,

    type,
    icon: travelWay.find((element) => element.name === type).icon,
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    picture: `http://picsum.photos/300/150?r=${Math.random()}`,
    offers: getRamdomArray([...new Set(offersList.reduce((prev, curr) => {
      return [...prev, curr.id];
    }, []))], 3),
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
    time: timeStart + ` &nbsp;&mdash; ` + timeEnd
  };
};
