import { Ref, ref } from "vue";
import { CountryObjFromAPI, CityObjFromAPI } from "../types";
import sortArrayOfObjByKey from "../utils";

export const getCitiesByCountry = (
  countrySelected: CountryObjFromAPI
): GetCitiesByCountry => {
  const cities = ref<CityObjFromAPI[]>([]);
  let error = ref<string | null>(null);

  const loadCities = async (): Promise<void> => {
    try {
      await getCitiesByCountryFromApi();
    } catch (err) {
      error.value = err as string;
    }
  };

  const getCitiesByCountryFromApi = async () => {
    const urlGetCitiesByCountry = `http://localhost:4000/api/countries/${countrySelected.country}`;
    const data: Response = await fetch(urlGetCitiesByCountry);
    if (!data.ok) {
      throw Error("No data available");
    }
    cities.value = await data.json();
    cities.value = sortArrayOfObjByKey<CityObjFromAPI>(cities.value, "name");
  };
  return { cities, error, loadCities };
};

export type GetCitiesByCountry = {
  cities: Ref<CityObjFromAPI[]>;
  error: Ref<string | null>;
  loadCities: () => Promise<void>;
};
