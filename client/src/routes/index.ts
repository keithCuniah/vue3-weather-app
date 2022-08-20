import { createRouter, createWebHistory } from "vue-router";
import WeatherForecastView from "./../views/WeatherForecast.view.vue";
import HomeView from "./../views/Home.view.vue";

const routes = [
    { path: "/", name: "Home", component: HomeView },
    { path: "/weather-forecast", name: "WeatherForecast", component: WeatherForecastView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
