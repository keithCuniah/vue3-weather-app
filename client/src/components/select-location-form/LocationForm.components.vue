<template>
  <div class="location-from-wrapper">
    <h4>Select a location:</h4>
    <p>
      Select a country and then a city to show the weather & forecast from this
      location
    </p>
    <div class="loading-spinner-content">
      <q-inner-loading
        :showing="!countries.length"
        label="Please wait, countries are loaded..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      >
      </q-inner-loading>
    </div>
    <div class="q-pa-md select-input-content" v-if="countries.length">
      <SelectInput
        v-if="countries.length"
        :defaultOption="countrySelected"
        :options="countries"
        label="Select a country"
        optionValue="id"
        optionLabel="country"
        @onSelect="($event: Ref<CountryObjFromAPI>) => (countrySelected = $event.value)"
        :isDisabled="false"
      >
      </SelectInput>

      <SelectInput
        :defaultOption="citySelected"
        :options="cities"
        label="Select a city"
        optionValue="id"
        optionLabel="name"
        @onSelect="($event: Ref<CountryObjFromAPI>) => (citySelected = $event.value)"
        :isDisabled="countrySelected === null"
      >
      </SelectInput>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, Ref, ref, watch } from "vue";
import SelectInput from "./SelectInput.component.vue";
import {
  getCountries,
  GetCountries,
} from "../../composables/getCountries.composable";
import {
  getCitiesByCountry,
  GetCitiesByCountry,
} from "../../composables/getCitiesByCountry.composable";
import { CountryObjFromAPI, CityObjFromAPI } from "../../types";

export default {
  components: {
    SelectInput,
  },
  setup(props: any, { emit }: any) {
    const countrySelected = ref<CountryObjFromAPI | null>(null);
    const citySelected = ref<CityObjFromAPI | null>(null);
    const cities = ref<CityObjFromAPI[]>([]);

    onMounted(async () => {
      await loadCountries();
    });

    watch(countrySelected, async () => {
      if (countrySelected.value) {
        loadCitiesAndAssignResponse(countrySelected.value);
      } else {
        citySelected.value = null;
      }
    });

    watch(citySelected, () => {
      emit("locationSelected", citySelected);
    });

    const {
      countries,
      error: errorGetCountries,
      loadCountries,
    }: GetCountries = getCountries();

    const loadCitiesAndAssignResponse = async (
      countrySelectedValue: CountryObjFromAPI
    ) => {
      const {
        cities: citiesFetched,
        error: errorGetCities,
        loadCities,
      }: GetCitiesByCountry = getCitiesByCountry(countrySelectedValue);

      await loadCities();
      cities.value = citiesFetched.value;
    };
    return { countries, countrySelected, cities, citySelected };
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
