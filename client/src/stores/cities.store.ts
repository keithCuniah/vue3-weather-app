import { defineStore } from "pinia";
import { CityObjFromAPI, CountryObjFromAPI } from "../types";

export const useCitiesStore = defineStore({
  id: "cities",
  state: () => ({
    selectedCountry: null as CountryObjFromAPI | null,
    selectedCity: null as CityObjFromAPI | null,
    cities: [],
  }),
  getters: {
    isSelectedCountriesInStore: (state) => {
      return state.selectedCountry;
    },
    isSelectedCitiesInStore: (state) => {
      return state.selectedCity;
    },
  },
  actions: {
    setSelectedCountry(payload: CountryObjFromAPI | null) {
      this.selectedCountry = payload;
    },
    setSelectedCity(payload: CityObjFromAPI | null) {
      this.selectedCity = payload;
    },
  },
});
