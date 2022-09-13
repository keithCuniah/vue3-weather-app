<template>
  <div class="widget-area">
    <Widget
      v-for="forecastByDay in forecast7Days"
      :key="forecastByDay.dt"
      :forecast="forecastByDay"
    />
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import Widget from "../widget/Widget.component.vue";

const props = defineProps({
  forecast7Days: {
    type: Array as PropType<any[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.widget-area {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}
</style>
