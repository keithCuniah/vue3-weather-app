// import {
//   correspondingWeather,
//   correspondingIcon,
// } from "../components/weather-icon/weatherConditions";

// const getIconByWeatherId = (weatherId: number) => {
//   // This method return the corresponding icon depending on weather id
//   // get corresponding weather from id
//   const currentWeather = Object.keys(correspondingWeather).find((key) =>
//     correspondingWeather[key].includes(weatherId)
//   );

//   // get corresponging icon
//   const currentIcon = correspondingIcon[currentWeather];
//   return currentIcon;
// };

// const shapeDate = (dateUTC: Date) => {
//   return `${dateUTC.getDate()}/${dateUTC.getMonth()}/${dateUTC.getFullYear()}`;
// };

// const compareDateToDateNow = (dateUTC: Date) => {
//   const dateNow = new Date();
//   const formatDateNow = shapeDate(dateNow);

//   const formatDateUTC = shapeDate(dateUTC);
//   return formatDateNow === formatDateUTC;
// };

// const findWeekDateOfDate = (dateUTC: Date) => {
//   const weekday = new Array(7);
//   weekday[0] = "Sunday";
//   weekday[1] = "Monday";
//   weekday[2] = "Tuesday";
//   weekday[3] = "Wednesday";
//   weekday[4] = "Thursday";
//   weekday[5] = "Friday";
//   weekday[6] = "Saturday";

//   return weekday[dateUTC.getDay()];
// };

// const convertDegToCardinal = (winDeg) => {
//   const directions = [
//     "N",
//     "NNE",
//     "NE",
//     "ENE",
//     "E",
//     "ESE",
//     "SE",
//     "SSE",
//     "S",
//     "SSW",
//     "SW",
//     "WSW",
//     "W",
//     "WNW",
//     "NW",
//     "NNW",
//   ];
//   let section = parseInt(winDeg / 22.5 + 0.5, 10);

//   section = section % 16;

//   return directions[section];
// };
// export default {
//   getIconByWeatherId,
//   shapeDate,
//   compareDateToDateNow,
//   findWeekDateOfDate,
//   convertDegToCardinal,
// };
