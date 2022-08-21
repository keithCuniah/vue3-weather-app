<template>
  <h1>Weather Forecast View</h1>
  <div class="countries" v-if="countries.length">
    <span class="country" v-for="countryObj in countries" :key="countryObj.id">
      {{ countryObj.id }} -
      <span>{{ countryObj.country }}</span>
    </span>
  </div>
  <div class="loading" v-if="!countries.length">Loading ...</div>
</template>

<script lang="ts">
import { onMounted, Ref, ref } from "vue";
import getCountries from "../composables/getCountries";
import { GetCountriesObj } from "../types";

export default {
  name: "WeatherForecastView",
  setup() {
    const {
      countries,
      error,
      load,
    }: {
      countries: Ref<GetCountriesObj[]>;
      error: Ref<string | null>;
      load: () => Promise<void>;
    } = getCountries();
    onMounted(load);

    return { countries };
  },
};
</script>

<style scoped>
.countries {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2em;
}
.country {
  max-width: 600px;
  background: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  color: #444;
  cursor: pointer;
  text-transform: capitalize;
}
.country:hover {
  background: #444;
  color: white;
}
</style>
