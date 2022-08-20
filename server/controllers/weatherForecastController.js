const axios = require('axios');

function weatherForecastController(apiKey) {
// Controller for getting current weather and forecast data (7 days) by coordinate

  const getWeatherForecastByCoord = async (req, res) => {
    const {lat, lon} = req.query;
    const params = {
      appid: apiKey,
      uniots: 'metric',
      lat,
      lon,
      exclude: 'minutely,hourly,alerts',
    };

    const url = 'https://api.openweathermap.org/data/2.5/onecall';

    try {
      const result = await axios.get(url, { params });
      res.json(result.data);
    } catch (err) {
      res
        .status(404)
        .send(
          `Ressources not found, can't find any weather and forecast data for the location : ${req.params.locationID}`
        );
      console.log(` Call in error : ${err}`);
    }
  };

  return { getWeatherForecastByCoord };
}

module.exports = weatherForecastController;
