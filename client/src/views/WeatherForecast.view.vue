<template>
  <LoadingSpinner :isLoading="showLoading" :valueOnLoad="onLoading" />
  <LocationForm
    @onLoading="isLoading(true, $event)"
    @loaded="isLoading(false)"
  />
  <WeatherForecastCard
    v-if="showCard"
    :location="selectedCity"
    :weatherOfToday="weatherOfToday"
    :forecast7Days="forecast7Days"
  />
</template>

<script lang="ts">
import { Ref, ref, toRefs, watch } from "vue";
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
import { useCitiesStore } from "../stores/cities.store";
import { storeToRefs } from "pinia";

export default {
  name: "WeatherForecastView",
  components: { LoadingSpinner, LocationForm, WeatherForecastCard },
  setup() {
    const showLoading = ref<Boolean>(false);
    const showCard = ref<Boolean>(false);
    const onLoading = ref<string | null>(null);

    const weatherOfToday = ref<WeatherOfToday | {}>({});
    const forecast7Days = ref<Forecast7Days | []>([]);

    const storeCities = useCitiesStore();
    const { selectedCity } = storeToRefs(storeCities);

    watch(selectedCity, () => {
      onSelectLocation();
    });

    // selectedCity
    const onSelectLocation = () => {
      if (selectedCity.value) {
        getWeatherAndForecastAndInitValues();
      } else {
        showCard.value = false;
      }
    };

    const getWeatherAndForecastAndInitValues = async (): Promise<void> => {
      const {
        weatherAndForecastObj,
        error: errorGetWeatherAndForecast,
        loadWeatherAndForecast,
      }: GetWeatherAndForecast = getWeatherAndForecast(
        selectedCity.value as unknown as CityObjFromAPI
      );

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

    const isLoading = (isLoading: boolean, labelOfValueOnLoading: string = "") => {
      showLoading.value = isLoading;
      onLoading.value = labelOfValueOnLoading;
    };

    const initWeatherAndForecast7Days = (weatherAndForecastObj: Ref<any>) => {
      const { current, daily } = toRefs<any>(weatherAndForecastObj.value);
      weatherOfToday.value = current.value;
      forecast7Days.value = daily.value;
    };

    return {
      showLoading,
      onLoading,
      showCard,
      weatherOfToday,
      forecast7Days,
      isLoading,
      selectedCity,
    };
  },
};
</script>

<style scoped></style>
