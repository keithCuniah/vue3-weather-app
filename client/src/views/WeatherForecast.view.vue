<template>
  <LocationForm @locationSelected="onLocationSelection"></LocationForm>
  {{ locationSelected }}
</template>

<script lang="ts">
import { Ref, ref } from "vue";
import LocationForm from "../components/select-location-form/LocationForm.components.vue";
import { CityObjFromAPI } from "../types";

export default {
  name: "WeatherForecastView",
  components: { LocationForm },
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
