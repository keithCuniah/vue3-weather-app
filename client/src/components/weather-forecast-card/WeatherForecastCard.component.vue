<template>
  <transition name="fade">
    <Card v-if="showCard">
      <template v-slot:header>
        <div class="">
          <HeaderCard :location="location" :weatherOfToday="weatherOfToday" />
        </div>
      </template>
      <template v-slot:content>
        <!-- <div class="">
        <pre>{{ weatherOfToday }} </pre>
      </div> -->
      </template>
    </Card>
  </transition>
</template>

<script lang="ts">
import { onMounted, PropType, ref, toRefs } from "vue";
import {
  CityObjFromAPI,
  WeatherOfToday,
  Forecast7Days,
  GetWeatherAndForecast,
} from "../../types";
import Card from "../card/Card.component.vue";
import HeaderCard from "./WeatherHeaderCard.vue";
import { getWeatherAndForecast } from "../../composables/getWeatherForecastByLocation.composable";

export default {
  props: {
    location: {
      type: Object as PropType<CityObjFromAPI>,
      required: true,
    },
  },
  components: {
    Card,
    HeaderCard,
  },
  setup(props: any) {
    const { location } = toRefs<any>(props);
    const weatherOfToday = ref<WeatherOfToday | {}>({});
    const forecast7Days = ref<Forecast7Days | []>([]);
    const showCard = ref<boolean>(false);

    onMounted(async () => {
      await loadWeatherAndForecast();
      initWeatherAndForecast7Days();
    });

    const {
      weatherAndForecastObj,
      error,
      loadWeatherAndForecast,
    }: GetWeatherAndForecast = getWeatherAndForecast(location);

    const initWeatherAndForecast7Days = () => {
      const { current, daily } = toRefs<any>(weatherAndForecastObj.value);
      weatherOfToday.value = current?.value;
      forecast7Days.value = daily?.value;
      showCard.value = true;
    };

    return { weatherOfToday, forecast7Days, error, showCard };
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
</style>
