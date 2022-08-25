<template>
  <div class="card-info">
    <div class="icon-component">
      <IconComponent :name="weatherIcon" :colorFill="'white'" />
    </div>
    <div class="descriptions">
      <span class="description-item">
        {{ city.name | capitalizedStr }}, {{ country | capitalizedStr }}
      </span>
      <span class="description-item">
        {{ currentInfo.temp | tempKelvinToCelcius }}
      </span>
      <span class="description-item">
        {{ currentInfo.humidity | formatHumidity }}
      </span>
      <span class="description-item">{{ currentInfo.uvi | formatUVI }}</span>
      <span class="description-item">{{ currentInfo.wind | formatWind }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
