<template>
  <div class="widget-area">
    <Widget
      v-for="forecastByDay in forecast7Days"
      :key="forecastByDay.dt"
      :forecast="forecastByDay"
    />
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import Widget from "../widget/Widget.component.vue";

export default {
  components: {
    Widget,
  },
  props: {
    forecast7Days: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.widget-area {
  display: flex;
  flex-wrap: wrap;
}
</style>
