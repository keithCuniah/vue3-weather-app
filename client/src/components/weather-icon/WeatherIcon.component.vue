<template>
  <SunIcon v-if="props.name === IMAGES_TYPE.SUN" :colorFill="props.colorFill" />
  <CloudFogIcon
    v-else-if="props.name === IMAGES_TYPE.CLOUD_FOG"
    :colorFill="props.colorFill"
  />
  <CloudMoonIcon
    v-else-if="props.name === IMAGES_TYPE.CLOUD_MOON"
    :colorFill="props.colorFill"
  />
  <CloudRainMoonIcon
    v-else-if="props.name === IMAGES_TYPE.CLOUD_RAIN_MOON"
    :colorFill="props.colorFill"
  />
  <CloudRainSnowIcon
    v-else-if="props.name === IMAGES_TYPE.CLOUD_RAIN_SNOW"
    :colorFill="props.colorFill"
  />
  <CloudRainStormIcon
    v-else-if="props.name === IMAGES_TYPE.CLOUD_RAIN_STORM"
    :colorFill="props.colorFill"
  />
  <CloudRainSunIcon
    v-else-if="props.name === IMAGES_TYPE.CLOUD_RAIN_SUN"
    :colorFill="props.colorFill"
  />
  <CloudRainWindIcon
    v-else-if="props.name === IMAGES_TYPE.CLOUD_RAIN_WIND"
    :colorFill="props.colorFill"
  />
  <CloudRainIcon
    v-else-if="props.name === IMAGES_TYPE.CLOUD_RAIN"
    :colorFill="props.colorFill"
  />
  <CloudSnowIcon
    v-else-if="props.name === IMAGES_TYPE.CLOUD_SNOW"
    :colorFill="props.colorFill"
  />
  <CloudSunIcon
    v-else-if="props.name === IMAGES_TYPE.CLOUD_SUN"
    :colorFill="props.colorFill"
  />
  <MoonIcon
    v-else-if="props.name === IMAGES_TYPE.MOON"
    :colorFill="props.colorFill"
  />
  <WindIcon
    v-else-if="props.name === IMAGES_TYPE.WIND"
    :colorFill="props.colorFill"
  />
  <WindSnowIcon
    v-else-if="props.name === IMAGES_TYPE.WIND_SNOW"
    :colorFill="props.colorFill"
  />
  <CloudIcon
    v-else-if="props.name === IMAGES_TYPE.CLOUD"
    :colorFill="props.colorFill"
  />
</template>

<script lang="ts" setup>
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

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  colorFill: {
    type: String,
    default: () => "black",
  },
});
</script>
