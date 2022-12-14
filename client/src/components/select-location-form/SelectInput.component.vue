<template>
  <q-select
    outlined
    use-input
    clearable
    v-model="optionSelected"
    :options="(filteredOptions as any[])"
    :option-value="optionValue"
    :option-label="optionLabel"
    :label="label"
    @filter="filterOptions"
    :disable="isDisabled"
    style="width: 250px"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts" setup>
import { PropType, ref, toRefs, watch } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  defaultOption: {
    type: null as unknown as PropType<object | null>,
    required: true,
  },
  optionValue: {
    type: String,
    required: true,
  },
  optionLabel: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: () => true,
  },
  label: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["onSelect"]);

const { options, optionLabel, defaultOption } = toRefs(props);
const optionSelected = ref<typeof defaultOption | null>(null);
const filteredOptions = ref<unknown>([]) as typeof options;
const filterOptions = (searchInput: string, update: Function) => {
  if (searchInput === "") {
    update(() => {
      filteredOptions.value = options.value;
    });
    return;
  }

  update(() => {
    const needle = searchInput.toLowerCase();
    filteredOptions.value = options.value.filter(
      (option: any) =>
        option[optionLabel.value].toLowerCase().indexOf(needle) > -1
    );
  });
};

watch(defaultOption, () => {
  optionSelected.value = defaultOption.value;
});
watch(optionSelected, () => {
  emit("onSelect", optionSelected);
});
</script>

<style lang="scss" scoped></style>
