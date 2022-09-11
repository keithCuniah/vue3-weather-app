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
        :defaultOption="countrySelected"
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
        :defaultOption="citySelected"
        :options="cities"
        label="Select a city"
        optionValue="id"
        optionLabel="name"
        @onSelect="onSelectCity"
        :isDisabled="countrySelected === null || errorGetCountries"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, Ref, ref, SetupContext, watch } from "vue";
import { useCountriesStore } from "../../stores/countries.store";
import { useCitiesStore } from "../../stores/cities.store";
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
    const countrySelected = ref<CountryObjFromAPI | null>(null);
    const storeCountries = useCountriesStore();
    const storeCities = useCitiesStore();
    const citySelected = ref<CityObjFromAPI | null>(null);
    const cities = ref<CityObjFromAPI[]>([]);
    const {
      countries,
      error: errorGetCountries,
      loadCountries,
    }: GetCountries = getCountries();

    onMounted(() => {
      initCountries();
    });

    watch(countrySelected, async () => {
      if (countrySelected.value) {
        loadCitiesAndAssignResponse(countrySelected.value);
      } else {
        citySelected.value = null;
      }
    });

    watch(citySelected, () => {
      context.emit("locationSelected", citySelected);
    });

    const initCountries = async () => {
      if (storeCountries.isCountriesInStore) {
        countries.value = storeCountries.countries;
      } else {
        await onAwaitCall(context, loadCountries, "countries");
        storeCountries.setCountries(countries.value);
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
      countrySelected.value = $event.value;
      storeCities.setSelectedCountry($event.value);
      initSelectedCity();
    };

    const onSelectCity = ($event: Ref<CityObjFromAPI>) => {
      citySelected.value = $event.value;
    };

    const initSelectedCity = () => {
      citySelected.value = null;
      storeCities.setSelectedCity(null);
    };

    return {
      countries,
      countrySelected,
      errorGetCountries,
      cities,
      citySelected,
      onSelectCountry,
      onSelectCity,
      storeCountries,
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
