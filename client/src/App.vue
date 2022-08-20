<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'WeatherForecast' }">
        Forecast & Weather
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import WeatherForecastView from "./views/WeatherForecast.view.vue";
import HomeView from "./views/Home.view.vue";

import { onMounted, onUnmounted, onUpdated } from "vue";

export default {
  name: "App",
  components: { WeatherForecastView, HomeView },
  setup() {
    onMounted(() => {
      console.log("mounted");
    });
    onUnmounted(() => {
      console.log("unmounted");
    });
    onUpdated(() => {
      console.log("update");
    });
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}
nav a.router-link-exact-active {
  color: white;
  background: crimson;
}
</style>
