import { defineStore } from "pinia";
import { CountryObjFromAPI } from "../types";

export const useCountriesStore = defineStore({
  id: "countries",
  state: () => ({
    countries: [] as CountryObjFromAPI[],
  }),
  getters: {
    isCountriesInStore: (state) => {
      return !!state.countries.length;
    },
  },
  actions: {
    setCountries(payload: CountryObjFromAPI[]) {
      this.countries = payload;
    },
  },
});
