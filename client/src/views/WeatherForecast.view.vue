<template>
  <h1>Weather Forecast View</h1>
  <div class="countries">
    <span class="country" v-for="countryObj in countries" :key="countryObj.id">
      {{ countryObj.country }}</span
    >
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
// import getCountries from "@/composables/getCountries";
export default {
  name: "WeatherForecastView",
  setup() {
    const countries = ref<{ id: number; country: string }[]>([]);
    let error = ref<string | null>(null);
    const load = async () => {
      try {
        const data: Response = await fetch(
          "http://localhost:4000/api/countries"
        );
        if (!data.ok) {
          throw Error("No data available");
        }
        countries.value = await data.json();
        countries.value = countries.value.sort(
          (
            a: { id: number; country: string },
            b: { id: number; country: string }
          ) => (a.country > b.country ? 1 : -1)
        );
      } catch (err: string) {
        error.value = err;
      }
    };
    onMounted(load);

    return { countries };
  },
};
</script>

<style scoped>
.countries {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2em;
}
.country {
  max-width: 600px;
  background: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  color: #444;
  cursor: pointer;
}
.country:hover {
  background: #444;
  color: white;
}
</style>
