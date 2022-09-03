<template>
  <div class="card-header">
    <div class="icon-component">
      <IconComponent :name="getWeatherIcon" :colorFill="'white'" />
    </div>
    <div class="descriptions">
      <span class="description-item">
        {{ locationNameAndCountry }}
      </span>
      <span class="description-item">
        {{ temperature }}
      </span>
      <span class="description-item">
        {{ humidity }}
      </span>
      <span class="description-item">
        {{ uvi }}
      </span>
      <span class="description-item">
        {{ windDirectionAndVelocity }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  computed,
  getCurrentInstance,
  toRefs,
} from "vue";
import IconComponent from "../weather-icon/WeatherIcon.component.vue";
import { getIconByWeatherId } from "../../utils/weatherUtils";
import {
  correspondingWeather,
  CorrespondingWeather,
  correspondingIcon,
} from "../weather-icon/weatherConditions";

export default {
  components: { IconComponent },
  props: {
    location: { type: Object, required: true },
    weatherOfToday: { type: Object, required: true },
  },
  setup(props: any) {
    const { location, weatherOfToday } = toRefs<any>(props);
    const proxy = getCurrentInstance() as ComponentInternalInstance;
    const {
      formatLocationNameAndCountry,
      formatTemperatureToCelcius,
      formatHumidity,
      formatUVI,
      formatWind,
    } = proxy.appContext.config.globalProperties.$filters;

    //get corresponding icon
    const getWeatherIcon = computed((): string =>
      getIconByWeatherId(props.weatherOfToday.weather[0].id)
    );

    // format data;
    const locationNameAndCountry = computed(() =>
      formatLocationNameAndCountry(location.value.name, location.value.country)
    );
    const temperature = computed(() =>
      formatTemperatureToCelcius(weatherOfToday.value.temp)
    );
    const humidity = computed(() =>
      formatHumidity(weatherOfToday.value.humidity)
    );
    const uvi = computed(() => formatUVI(weatherOfToday.value.uvi));
    const windDirectionAndVelocity = computed(() =>
      formatWind(weatherOfToday.value.wind_deg, weatherOfToday.value.wind_speed)
    );

    return {
      getWeatherIcon,
      location,
      weatherOfToday,
      locationNameAndCountry,
      temperature,
      humidity,
      uvi,
      windDirectionAndVelocity,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  flex: 1;
  .icon-component {
    display: flex;
    min-width: 107px;
    margin-right: 1em;
  }
  .descriptions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 295px;
    color: white;
  }
}
.description-item {
  font-style: normal;
  text-align: left;
  letter-spacing: 0em;
  font-weight: 400;
  font-size: 15px;
  line-height: 17.58px;
  &:first-child {
    font-size: 25px;
    line-height: 29px;
  }
  &:nth-child(2) {
    font-size: 20px;
    line-height: 23.44px;
  }
}
</style>
