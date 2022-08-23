<template>
  <Card>
    <template v-slot:header>
      <div class="">
        <pre>{{ location }} </pre>
      </div>
    </template>
    <template v-slot:content>
      <div class="">
        <pre>{{ location }} </pre>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { onMounted, PropType, ref, toRef, toRefs } from "vue";
import { CityObjFromAPI } from "../../types";
import Card from "../card/Card.component.vue";
import { getWeather } from "../../composables/getWeatherForecastByLocation.composable";
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
    console.log(props.location);
    const { location } = toRefs<any>(props);
    const weather = ref<any | {}>({});
    const forecast = ref<any | {}>({});

    onMounted(async() => {
      await loadWeatherAndAssignResponse();
    });

    const loadWeatherAndAssignResponse = async () => {
      const {
        weatherObj: weatherFetched,
        error: errorGetWeather,
        loadWeather,
      }: any = getWeather(location);
      await loadWeather();
      weather.value = weatherFetched.value;
    };

    console.log(weather.value);
    // const getWeather = async () => {
    //   const params = {
    //     id: id.value,
    //     country: country.value,
    //     ...coord.value,
    //   } as unknown as any;
    //   console.log(params);
    //   let urlGetweather = new URL(
    //     `http://localhost:4000/api/weather/${id.value}`
    //   );
    //   Object.keys(params).forEach((key: any) =>
    //     urlGetweather.searchParams.append(key, params[key])
    //   );
    //   const data: Response = await fetch(urlGetweather);
    //   weather.value = await data.json();
    //   console.log(weather.value);
    // };

    return { weather };
  },
};
</script>

<style lang="scss" scoped></style>
