<template>
  <transition name="fade">
    <Card>
      <template v-slot:header>
        <div class="header-slot">
          <HeaderCard :location="location" :weatherOfToday="weatherOfToday" />
        </div>
      </template>
      <template v-slot:content>
        <div class="content-slot">
          <ContentCard :forecast7Days="forecast7Days" />
        </div>
      </template>
    </Card>
  </transition>
</template>

<script lang="ts">
import { PropType } from "vue";
import { CityObjFromAPI, WeatherOfToday, Forecast7Days } from "../../types";
import Card from "../card/Card.component.vue";
import HeaderCard from "./WeatherHeaderCard.component.vue";
import ContentCard from "./ForecastContentCard.component.vue";

export default {
  props: {
    location: {
      type: Object as PropType<CityObjFromAPI>,
      required: true,
    },
    weatherOfToday: {
      type: Object as PropType<WeatherOfToday>,
      required: true,
    },
    forecast7Days: {
      type: Object as PropType<Forecast7Days>,
      required: true,
    },
  },
  components: {
    Card,
    HeaderCard,
    ContentCard,
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
