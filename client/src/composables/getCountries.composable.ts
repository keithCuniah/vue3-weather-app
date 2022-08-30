import { Ref, ref } from "vue";
import { CountryObjFromAPI } from "../types";
import { sortArrayOfObjByKey } from "../utils";

export const getCountries = (): GetCountries => {
  const countries = ref<CountryObjFromAPI[]>([]);
  let error = ref<string | null>(null);

  const loadCountries = async (): Promise<void> => {
    try {
      await getCountriesFromApi();
    } catch (err) {
      error.value = err as string;
    }
  };

  const getCountriesFromApi = async () => {
    const urlGetCountries = "http://localhost:4000/api/countries";
    const data: Response = await fetch(urlGetCountries);
    if (!data.ok) {
      throw Error("No data available");
    }
    countries.value = await data.json();
    countries.value = sortArrayOfObjByKey<CountryObjFromAPI>(
      countries.value,
      "country"
    );
  };

  return { countries, error, loadCountries };
};

export type GetCountries = {
  countries: Ref<CountryObjFromAPI[]>;
  error: Ref<string | null>;
  loadCountries: () => Promise<void>;
};
