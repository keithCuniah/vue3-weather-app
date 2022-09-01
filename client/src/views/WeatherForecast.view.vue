<template>
  <LoadingSpinner :isLoading="showLoading" :valueOnLoad="valueOnLoad" />
  <LocationForm
    @locationSelected="onLocationSelection"
    @onLoading="isLoading(true, $event)"
    @loaded="isLoading(false)"
  />
  <WeatherForecastCard v-if="locationSelected" :location="locationSelected" />
</template>

<script lang="ts">
import { Ref, ref } from "vue";
import LocationForm from "../components/select-location-form/LocationForm.components.vue";
import WeatherForecastCard from "../components/weather-forecast-card/WeatherForecastCard.component.vue";
import LoadingSpinner from "../components/loading-spinner/LoadingSpinner.component.vue";
import { CityObjFromAPI } from "../types";

export default {
  name: "WeatherForecastView",
  components: { LoadingSpinner, LocationForm, WeatherForecastCard },
  setup() {
    const locationSelected = ref<CityObjFromAPI | null>(null);
    const showLoading = ref<Boolean>(false);
    const valueOnLoad = ref<string | null>(null);

    const onLocationSelection = ($event: Ref<CityObjFromAPI | null>) => {
      locationSelected.value = $event.value;
    };

    const isLoading = (isLoading: boolean, valueOnLoading: string = "") => {
      showLoading.value = isLoading;
      valueOnLoad.value = valueOnLoading;
    };

    return {
      showLoading,
      locationSelected,
      valueOnLoad,
      onLocationSelection,
      isLoading,
    };
  },
};
</script>

<style scoped></style>
