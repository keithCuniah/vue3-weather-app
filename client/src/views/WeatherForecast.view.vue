<template>
  <LoadingSpinner :isLoading="showLoading" :valueOnLoad="valueOnLoad" />
  <LocationForm
    @locationSelected="onLocationSelection"
    @onLoading="isLoading(true, $event)"
    @loaded="isLoading(false)"
  />
  <WeatherForecastCard
    v-if="showCard"
    :location="locationSelected"
    :weatherOfToday="weatherOfToday"
    :forecast7Days="forecast7Days"
  />
</template>

<script lang="ts">
import { Ref, ref, toRefs } from "vue";
import LocationForm from "../components/select-location-form/LocationForm.components.vue";
import WeatherForecastCard from "../components/weather-forecast-card/WeatherForecastCard.component.vue";
import LoadingSpinner from "../components/loading-spinner/LoadingSpinner.component.vue";
import {
  CityObjFromAPI,
  Forecast7Days,
  GetWeatherAndForecast,
  WeatherOfToday,
} from "../types";
import { getWeatherAndForecast } from "../composables/getWeatherForecastByLocation.composable";

export default {
  name: "WeatherForecastView",
  components: { LoadingSpinner, LocationForm, WeatherForecastCard },
  setup() {
    const locationSelected = ref<CityObjFromAPI | null>(null);
    const showLoading = ref<Boolean>(false);
    const showCard = ref<Boolean>(false);
    const valueOnLoad = ref<string | null>(null);

    const weatherOfToday = ref<WeatherOfToday | {}>({});
    const forecast7Days = ref<Forecast7Days | []>([]);

    const onLocationSelection = ($event: Ref<CityObjFromAPI | null>) => {
      locationSelected.value = $event.value;
      if (locationSelected.value) {
        getWeatherAndForecastAndInitValues(locationSelected.value);
      } else {
        showCard.value = false;
      }
    };

    const getWeatherAndForecastAndInitValues = async (
      location: CityObjFromAPI
    ): Promise<void> => {
      const {
        weatherAndForecastObj,
        error: errorGetWeatherAndForecast,
        loadWeatherAndForecast,
      }: GetWeatherAndForecast = getWeatherAndForecast(location);

      try {
        showCard.value = false;
        isLoading(true, "weather and forecast");
        await loadWeatherAndForecast();
        initWeatherAndForecast7Days(weatherAndForecastObj);
        isLoading(false);
        showCard.value = true;
      } catch (err) {
        console.log(err);
      }
    };

    const isLoading = (isLoading: boolean, valueOnLoading: string = "") => {
      showLoading.value = isLoading;
      valueOnLoad.value = valueOnLoading;
    };

    const initWeatherAndForecast7Days = (weatherAndForecastObj: Ref<any>) => {
      const { current, daily } = toRefs<any>(weatherAndForecastObj.value);
      weatherOfToday.value = current.value;
      forecast7Days.value = daily.value;
    };

    return {
      showLoading,
      locationSelected,
      valueOnLoad,
      showCard,
      weatherOfToday,
      forecast7Days,
      onLocationSelection,
      isLoading,
    };
  },
};
</script>

<style scoped></style>
