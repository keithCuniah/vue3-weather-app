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
        :isDisabled="false"
      />

      <SelectInput
        :defaultOption="citySelected"
        :options="cities"
        label="Select a city"
        optionValue="id"
        optionLabel="name"
        @onSelect="onSelectCity"
        :isDisabled="countrySelected === null"
      />
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
import LoadingSpinner from "./../loading-spinner/LoadingSpinner.component.vue";

export default {
  components: {
    LoadingSpinner,
    SelectInput,
  },
  setup(props: any, { emit }: any) {
    const countrySelected = ref<CountryObjFromAPI | null>(null);
    const citySelected = ref<CityObjFromAPI | null>(null);
    const cities = ref<CityObjFromAPI[]>([]);

    onMounted(async () => {
      try {
        emit("onLoading", "country");
        await loadCountries();
        emit("loaded");
      } catch (err) {
        console.log(err);
      }
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

      try {
        emit("onLoading", "city");
        await loadCities();
        cities.value = citiesFetched.value;
        emit("loaded");
      } catch (err) {
        console.log(err);
      }
    };

    const onSelectCountry = ($event: Ref<CountryObjFromAPI>) => {
      countrySelected.value = $event.value;
      initSelectedCity();
    };

    const onSelectCity = ($event: Ref<CityObjFromAPI>) => {
      citySelected.value = $event.value;
    };

    const initSelectedCity = () => {
      citySelected.value = null;
    };

    return {
      countries,
      countrySelected,
      cities,
      citySelected,
      onSelectCountry,
      onSelectCity,
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
