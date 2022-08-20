const getFullCountryName = function (unicodeFlag) {
  // return a country (string) from his unicodeFlag (string)
  //  getFullCountryName('FR') => 'FRANCE'
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  return regionNames.of(unicodeFlag).toUpperCase();
};

const getCitiesGroupByCountry = function (rawDataJson, getFullCountryName) {
  const rawDataGroupByCountry = rawDataJson.reduce((acc, location) => {
    const countryfullName = getFullCountryName(location.country);
    const country = acc[countryfullName] || [];
    country.push(location);
    acc[countryfullName] = country;
    return acc;
  }, {});

  const listOfCountries = Object.keys(rawDataGroupByCountry).map(
    (country, id) => {
      return { country, id };
    }
  );

  return { rawDataGroupByCountry, listOfCountries };
};
module.exports = {
  getFullCountryName,
  getCitiesGroupByCountry,
};
