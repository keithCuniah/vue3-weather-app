<template>
  <LocationForm @locationSelected="onLocationSelection"></LocationForm>
  <WeatherForecastCard
    v-if="locationSelected"
    :location="locationSelected"
  ></WeatherForecastCard>
</template>

<script lang="ts">
import { Ref, ref } from "vue";
import LocationForm from "../components/select-location-form/LocationForm.components.vue";
import WeatherForecastCard from "../components/weather-forecast-card/WeatherForecastCard.component.vue";
import { CityObjFromAPI } from "../types";

export default {
  name: "WeatherForecastView",
  components: { LocationForm, WeatherForecastCard },
  setup() {
    const locationSelected = ref<CityObjFromAPI | null>(null);

    const onLocationSelection = ($event: Ref<CityObjFromAPI | null>) => {
      locationSelected.value = $event.value;
    };
    return { locationSelected, onLocationSelection };
  },
};
</script>

<style scoped></style>
