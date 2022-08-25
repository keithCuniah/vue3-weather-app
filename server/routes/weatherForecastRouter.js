const express = require('express');
const weatherForecastController = require('../controllers/weatherForecastController');
const locationController = require('../controllers/locationController');

function routes(listOfCountries, rawDataGroupByCountry) {
  const weatherForecastRouter = express.Router();
  const _locationController = locationController(
    listOfCountries,
    rawDataGroupByCountry
  );
  const apiKey = 'c4c8cb4635149c853f5fe04023add8c5';
  const _weatherForecastcontroller = weatherForecastController(apiKey);

  // Route for countries
  weatherForecastRouter
    .route('/countries')
    .get(_locationController.getCountries);

  // Route for cities of one country
  weatherForecastRouter
    .route('/countries/:countryUnicode')
    .get(_locationController.getCitiesByCountry);

  // Route for current weather and forecast from a city
  // NOTE: In the api, a city can have several coordinate
  //   the link which call the data use coordinate as parametes
  weatherForecastRouter
    .route('/weather-forecast/:locationID')
    .get(_weatherForecastcontroller.getWeatherForecastByCoord);
  return weatherForecastRouter;
}

module.exports = routes;
