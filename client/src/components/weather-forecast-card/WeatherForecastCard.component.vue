<template>
  <Card>
    <template v-slot:header>
      <div class="">
        <pre>{{ location }} </pre>
      </div>
    </template>
    <template v-slot:content>
      <div class="">
        <pre>{{ weatherOfToday }} </pre>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { onMounted, PropType, ref, toRefs } from "vue";
import { CityObjFromAPI } from "../../types";
import Card from "../card/Card.component.vue";
import {
  getWeatherAndForecast,
  GetWeatherAndForecast,
} from "../../composables/getWeatherForecastByLocation.composable";

export default {
  props: {
    location: {
      type: Object as PropType<CityObjFromAPI>,
      required: true,
    },
  },
  components: {
    Card,
  },
  setup(props: any) {
    const { location } = toRefs<any>(props);
    const weatherOfToday = ref<any | {}>({});
    const forecast7Days = ref<any[] | []>([]);

    onMounted(async () => {
      await loadWeatherAndForecast();
      initWeatherAndForecast7Days();
    });

    const {
      weatherAndForecastObj,
      error: errorGetWeatherAndForecast,
      loadWeatherAndForecast,
    }: GetWeatherAndForecast = getWeatherAndForecast(location);

    const initWeatherAndForecast7Days = () => {
      const { current, daily } = toRefs<any>(weatherAndForecastObj.value);
      weatherOfToday.value = current.value;
      forecast7Days.value = daily.value;
    };

    return { weatherOfToday, forecast7Days };
  },
};
</script>

<style lang="scss" scoped></style>
