<template>
  <div class="web-component-forecast-weather">
    <div class="container-area">
      <slot name="header" />
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.web-component-forecast-weather {
  display: flex;
  justify-content: center;
  .container-area {
    display: flex;
    flex-direction: column;
    gap: 35px;
    max-width: 900px;
    flex: 1;
    min-height: 311px;
    padding: 1.5em;
    border-radius: 20px;
    box-shadow: 0px 4px 4px 0px #00000040 inset;
    background: linear-gradient(
        180deg,
        #0668c2 0%,
        #1c0168 100%,
        rgba(68, 12, 158, 0) 100%
      ),
      linear-gradient(0deg, #c4c4c4, #c4c4c4);
  }
}
</style>
