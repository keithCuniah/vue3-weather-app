import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import router from "./routes";
import { Quasar } from "quasar";
import { convertDegToCardinal, capitalizedWord } from "./utils";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

const app = createApp(App);
app.use(router);
app.use(Quasar, { config: {} });
app.mount("#app");

app.config.globalProperties.$filters = {
  formatWind(windDegreeDirection: number, windSpeed: number | string): string {
    return `Wind: ${convertDegToCardinal(windDegreeDirection)} ${windSpeed}kmh`;
  },
  formatUVI(uvi: number | string) {
    return `UVI: ${uvi}`;
  },
  formatHumidity(humidity: number) {
    return `Humidity: ${humidity}%`;
  },
  formatTemperatureToCelcius(temperatureInKelvin: number) {
    return `${Math.round(temperatureInKelvin - 273.15)}º`;
  },
  formatLocationNameAndCountry(name: string, country: string) {
    return `${capitalizedWord(name)}, ${country.toUpperCase()}`;
  },
};
