<template>
  <div class="loading-spinner-content">
    <q-inner-loading
      :showing="isLoading"
      :label="label"
      label-class="text-teal"
      label-style="font-size: 1.1em"
    >
    </q-inner-loading>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  valueOnLoad: {
    required: true,
    validator: (value: string | null) =>
      typeof value === "string" || value === null,
  },
});

const label = computed((): string =>
  props.valueOnLoad
    ? `Please wait, ${props.valueOnLoad} are loaded...`
    : `Please wait ...`
);
</script>
