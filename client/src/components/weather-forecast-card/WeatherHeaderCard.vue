<template>
  <div class="card-info">
    <div class="icon-component">
      <IconComponent :name="weatherIcon" :colorFill="'white'" />
    </div>
    <div class="descriptions">
      <span class="description-item"> {{ locationNameAndCountry }} </span>
      <span class="description-item">
        {{ currentTemperatureInCelcius }}
      </span>
      <span class="description-item">
        {{ currentHumidity }}
      </span>
      <span class="description-item">{{ formatUVI }}</span>
      <span class="description-item">{{ formatWind }}</span>
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
import { convertDegToCardinal } from "../../utils";

export default {
  components: { IconComponent },
  props: {
    location: { type: Object, required: true },
    weatherOfToday: { type: Object, required: true },
  },
  setup(props: any) {
    /* COMPUTED */
    //get corresponding icon
    const weatherIcon = computed(() =>
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

    // format data
    const locationNameAndCountry = computed(
      () =>
        `${
          props.location.name.charAt(0).toUpperCase() +
          props.location.name.slice(1).toLowerCase()
        }, ${props.location.country.toUpperCase()}`
    );

    const currentTemperatureInCelcius = computed(
      () => `${Math.round(props.weatherOfToday.temp - 273.15)}º`
    );

    const currentHumidity = computed(
      () => `Humidity: ${props.weatherOfToday.humidity}%`
    );

    const formatUVI = computed(() => {
      return `UVI: ${props.weatherOfToday.uvi}`;
    });

    const formatWind = computed(() => {
      return `Wind: ${convertDegToCardinal(props.weatherOfToday.wind_deg)} ${props.weatherOfToday.wind_speed}kmh`;
    });
    console.log(props.weatherOfToday);
    return {
      weatherIcon,
      locationNameAndCountry,
      currentTemperatureInCelcius,
      currentHumidity,
      formatUVI,
      formatWind,
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

<!-- <template>
  {{ location }}
  <div class="card-info">
    <div class="icon-component">
      <IconComponent :name="weatherIcon" :colorFill="'white'" />
    </div>
    <div class="descriptions">
      <span class="description-item">
        {{ location.name | capitalizedStr }}, {{ country | capitalizedStr }}
      </span>
      <span class="description-item">
        {{ weatherOfToday.temp | tempKelvinToCelcius }}
      </span>
      <span class="description-item">
        {{ weatherOfToday.humidity | formatHumidity }}
      </span>
      <span class="description-item">{{ weatherOfToday.uvi | formatUVI }}</span>
      <span class="description-item">{{
        weatherOfToday.wind | formatWind
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs } from "vue";
import IconComponent from "../weather-icon/WeatherIcon.component.vue";

export default {
  components: { IconComponent },
  props: {
    location: { type: Object, required: true },
    weatherOfToday: { type: Object, required: true },
  },
  setup(props: any) {
    const { location, weatherOfToday } = toRefs<any>(props);
    console.log(weatherOfToday);

    return { location };
  },
};
</script>

<style lang="scss" scoped></style> -->
