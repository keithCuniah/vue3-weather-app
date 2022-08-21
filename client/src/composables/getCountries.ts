import { ref } from "vue";
import { GetCountriesObj } from "../types";

const getCountries = () => {
  const countries = ref<GetCountriesObj[]>([]);
  let error = ref<string | null>(null);

  const load = async (): Promise<void> => {
    try {
      const data: Response = await fetch("http://localhost:4000/api/countries");
      if (!data.ok) {
        throw Error("No data available");
      }
      countries.value = await data.json();
      countries.value = countries.value.sort(
        (a: GetCountriesObj, b: GetCountriesObj) =>
          a.country > b.country ? 1 : -1
      );
    } catch (err) {
      error.value = err as string;
    }
  };

  return { countries, error, load };
};

export default getCountries;
