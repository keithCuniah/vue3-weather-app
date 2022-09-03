<template>
  <div class="widget-container">
    <div class="widget-item">{{ forecastDate }}</div>
    <div class="widget-item">
      <div class="icon-component">
        <IconComponent :name="forecastIcon" :colorFill="'white'" />
      </div>
    </div>
    <div class="widget-item">{{ temperatureMax }}</div>
    <div class="widget-item">{{ temperatureMin }}</div>
  </div>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  computed,
  getCurrentInstance,
  PropType,
  toRefs,
} from "vue";
import { getIconByWeatherId } from "../../utils";
import IconComponent from "../weather-icon/WeatherIcon.component.vue";

export default {
  props: {
    forecast: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  components: { IconComponent },
  setup(props: any) {
    const proxy = getCurrentInstance() as ComponentInternalInstance;
    const { formatTemperatureToCelcius, formatDate } =
      proxy.appContext.config.globalProperties.$filters;
    const { forecast } = toRefs<any>(props);

    const forecastIcon = computed((): string =>
      getIconByWeatherId(forecast.value.weather[0].id)
    );

    //format data
    const temperatureMax = computed(() =>
      formatTemperatureToCelcius(forecast.value.temp.max)
    );
    const temperatureMin = computed(() =>
      formatTemperatureToCelcius(forecast.value.temp.min)
    );
    const forecastDate = computed(() =>
    formatDate(forecast.value.dt)
    );

    return { forecastIcon, temperatureMax, temperatureMin, forecastDate };
  },
};
</script>

<style lang="scss" scoped>
.widget-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 5px;
  .icon-component {
    width: 3em;
  }
}
.widget-item {
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: white;
  &:nth-last-child(2) {
    // color: $temp-hot;
    color: red;
  }
  &:last-child {
    // color: $temp-cold;
    color: cadetblue;
  }
}

@media (max-width: 500px) {
  .widget-container {
    flex-direction: row;
  }
}
</style>
