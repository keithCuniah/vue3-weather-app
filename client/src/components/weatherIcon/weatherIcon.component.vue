<template>
  <SunIcon v-if="name === IMAGES_TYPE.SUN" :colorFill="colorFill" />
  <CloudFogIcon
    v-else-if="name === IMAGES_TYPE.CLOUD_FOG"
    :colorFill="colorFill"
  />
  <CloudMoonIcon
    v-else-if="name === IMAGES_TYPE.CLOUD_MOON"
    :colorFill="colorFill"
  />
  <CloudRainMoonIcon
    v-else-if="name === IMAGES_TYPE.CLOUD_RAIN_MOON"
    :colorFill="colorFill"
  />
  <CloudRainSnowIcon
    v-else-if="name === IMAGES_TYPE.CLOUD_RAIN_SNOW"
    :colorFill="colorFill"
  />
  <CloudRainStormIcon
    v-else-if="name === IMAGES_TYPE.CLOUD_RAIN_STORM"
    :colorFill="colorFill"
  />
  <CloudRainSunIcon
    v-else-if="name === IMAGES_TYPE.CLOUD_RAIN_SUN"
    :colorFill="colorFill"
  />
  <CloudRainWindIcon
    v-else-if="name === IMAGES_TYPE.CLOUD_RAIN_WIND"
    :colorFill="colorFill"
  />
  <CloudRainIcon
    v-else-if="name === IMAGES_TYPE.CLOUD_RAIN"
    :colorFill="colorFill"
  />
  <CloudSnowIcon
    v-else-if="name === IMAGES_TYPE.CLOUD_SNOW"
    :colorFill="colorFill"
  />
  <CloudSunIcon
    v-else-if="name === IMAGES_TYPE.CLOUD_SUN"
    :colorFill="colorFill"
  />
  <MoonIcon v-else-if="name === IMAGES_TYPE.MOON" :colorFill="colorFill" />
  <WindIcon v-else-if="name === IMAGES_TYPE.WIND" :colorFill="colorFill" />
  <WindSnowIcon
    v-else-if="name === IMAGES_TYPE.WIND_SNOW"
    :colorFill="colorFill"
  />
  <CloudIcon v-else-if="name === IMAGES_TYPE.CLOUD" :colorFill="colorFill" />
</template>

<script lang="ts">
import IMAGES_TYPE from "../../assets/constantsIcons";
import SunIcon from "../../assets/Sun.vue";
import CloudFogIcon from "../../assets/CloudFog.vue";
import CloudMoonIcon from "../../assets/CloudMoon.vue";
import CloudRainMoonIcon from "../../assets/CloudRainMoon.vue";
import CloudRainSnowIcon from "../../assets/CloudRainSnow.vue";
import CloudRainStormIcon from "../../assets/CloudRainStorm.vue";
import CloudRainSunIcon from "../../assets/CloudRainSun.vue";
import CloudRainWindIcon from "../../assets/CloudRainWind.vue";
import CloudRainIcon from "../../assets/CloudRain.vue";
import CloudSnowIcon from "../../assets/CloudSnow.vue";
import CloudSunIcon from "../../assets/CloudSun.vue";
import MoonIcon from "../../assets/Moon.vue";
import WindIcon from "../../assets/Wind.vue";
import WindSnowIcon from "../../assets/WindSnow.vue";
import CloudIcon from "../../assets/Cloud.vue";
export default {
  name: "Icon",
  components: {
    SunIcon,
    CloudFogIcon,
    CloudMoonIcon,
    CloudRainMoonIcon,
    CloudRainSnowIcon,
    CloudRainStormIcon,
    CloudRainSunIcon,
    CloudRainWindIcon,
    CloudRainIcon,
    CloudSnowIcon,
    CloudSunIcon,
    MoonIcon,
    WindIcon,
    WindSnowIcon,
    CloudIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    colorFill: {
      type: String,
      default: () => "black",
    },
  },
  setup(props: any) {
    return {
      IMAGES_TYPE,
    };
  },
};
</script>

<style lang="scss" scoped></style>
