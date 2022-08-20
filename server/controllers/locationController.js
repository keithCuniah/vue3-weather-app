function locationController(listOfCountries, objectGroupByCountry) {
  // Controller for getting location as countries and cities from a specific country

  async function getCountries(req, res) {
    try {
      res.send(listOfCountries.sort((a, b) => a.country.localeCompare(b.country)));
    } catch (err) {
      res.send("Ressources not found, can't find any country");
      console.log(` Call in error : ${err}`);
    }
  }

  async function getCitiesByCountry(req, res) {
    const country = req.params.countryUnicode.toUpperCase();
    try {
      const cities = objectGroupByCountry[country].sort((a, b) => a.name.localeCompare(b.name));
      res.json(cities);
    } catch (err) {
      res.send(
        `Ressources not found, can't find any cities of country  ${country}`
      );
      console.log(` Call in error : ${err}`);
    }
  }
  return { getCountries, getCitiesByCountry };
}

module.exports = locationController;
