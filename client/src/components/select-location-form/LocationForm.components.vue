<template>
  <div class="location-from-wrapper">
    <h4>Select a location:</h4>
    <p>
      Select a country and then a city to show the weather & forecast from this
      location
    </p>

    <div class="q-pa-md select-input-content" v-if="countries.length">
      <SelectInput
        v-if="countries.length"
        :defaultOption="selectedCountry"
        :options="countries"
        label="Select a country"
        optionValue="id"
        optionLabel="country"
        @onSelect="onSelectCountry"
        :isDisabled="errorGetCountries"
      />
      <span v-if="errorGetCountries">
        There is an error when fetching the countries</span
      >

      <SelectInput
        :defaultOption="selectedCity"
        :options="cities"
        label="Select a city"
        optionValue="id"
        optionLabel="name"
        @onSelect="onSelectCity"
        :isDisabled="selectedCountry === null || errorGetCountries"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, Ref, ref, SetupContext, watch } from "vue";
import { useCountriesStore } from "../../stores/countries.store";
import { useCitiesStore } from "../../stores/cities.store";
import { storeToRefs } from "pinia";
import SelectInput from "./SelectInput.component.vue";
import { onAwaitCall } from "../../utils";
import {
  getCountries,
  GetCountries,
} from "../../composables/getCountries.composable";
import {
  getCitiesByCountry,
  GetCitiesByCountry,
} from "../../composables/getCitiesByCountry.composable";
import { CountryObjFromAPI, CityObjFromAPI } from "../../types";
import LoadingSpinner from "./../loading-spinner/LoadingSpinner.component.vue";
export default {
  components: {
    LoadingSpinner,
    SelectInput,
  },
  setup(props: any, context: SetupContext) {
    // const countrySelected = ref<CountryObjFromAPI | null>(null);
    // const citySelected = ref<CityObjFromAPI | null>(null);
    const storeCountries = useCountriesStore();
    const storeCities = useCitiesStore();
    const { selectedCountry, selectedCity } = storeToRefs(storeCities);
    const cities = ref<CityObjFromAPI[]>([]);
    const {
      countries,
      error: errorGetCountries,
      loadCountries,
    }: GetCountries = getCountries();

    onMounted(() => {
      initCountries();
    });

    watch(selectedCountry, () => {
      if (selectedCountry.value) {
        loadCitiesAndAssignResponse(selectedCountry.value);
      } else {
        resetSelectedCity();
      }
    });

    const initCountries = async () => {
      if (storeCountries.isCountriesInStore) {
        countries.value = storeCountries.countries;
      } else {
        await onAwaitCall(context, loadCountries, "countries");
        storeCountries.countries = countries.value;
      }
    };

    const loadCitiesAndAssignResponse = async (
      countrySelectedValue: CountryObjFromAPI
    ) => {
      const {
        cities: citiesFetched,
        error: errorGetCities,
        loadCities,
      }: GetCitiesByCountry = getCitiesByCountry(countrySelectedValue);

      await onAwaitCall(context, loadCities, "cities");

      if (errorGetCities.value === null) {
        cities.value = citiesFetched.value;
      }
    };

    const onSelectCountry = ($event: Ref<CountryObjFromAPI>) => {
      storeCities.setSelectedCountry($event.value);
      resetSelectedCity();
    };

    const onSelectCity = ($event: Ref<CityObjFromAPI>) => {
      selectedCity.value = $event.value;
    };

    const resetSelectedCity = () => {
      selectedCity.value = null;
    };

    return {
      countries,
      errorGetCountries,
      cities,
      onSelectCountry,
      onSelectCity,
      storeCountries,
      selectedCountry,
      selectedCity,
    };
  },
};
</script>

<style scoped>
.location-from-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.select-input-content {
  display: inline-flex;
  flex-direction: column;
  gap: 25px;
}
</style>
