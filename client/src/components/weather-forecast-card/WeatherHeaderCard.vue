<template>
  <div class="card-info">
    <div class="icon-component">
      <IconComponent :name="getWeatherIcon" :colorFill="'white'" />
    </div>
    <div class="descriptions">
      <span class="description-item">
        {{
          $filters.formatLocationNameAndCountry(location.name, location.country)
        }}
      </span>
      <span class="description-item">
        {{ $filters.formatTemperatureToCelcius(weatherOfToday.temp) }}
      </span>
      <span class="description-item">
        {{ $filters.formatHumidity(weatherOfToday.humidity) }}
      </span>
      <span class="description-item">
        {{ $filters.formatUVI(weatherOfToday.uvi) }}
      </span>
      <span class="description-item">
        {{
          $filters.formatWind(
            weatherOfToday.wind_deg,
            weatherOfToday.wind_speed
          )
        }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import IconComponent from "../weather-icon/WeatherIcon.component.vue";
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
    //get corresponding icon
    const getWeatherIcon = computed((): string =>
      getIconByWeatherId(props.weatherOfToday.weather[0].id)
    );

    const getIconByWeatherId = (weatherId: number): string => {
      // This method return the corresponding icon depending on weather id
      // get corresponding weather from id
      const currentWeather = Object.keys(correspondingWeather).find((key) =>
        correspondingWeather[key as keyof CorrespondingWeather].includes(
          weatherId
        )
      );

      // get corresponging icon
      const currentIcon =
        correspondingIcon[currentWeather as keyof CorrespondingWeather];
      return currentIcon;
    };

    return {
      getWeatherIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-info {
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
