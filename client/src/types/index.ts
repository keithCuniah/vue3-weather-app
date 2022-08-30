import { Ref } from "vue";

export type CountryObjFromAPI = { id: number; country: string };

export type CityObjFromAPI = {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: Coordinate;
};

export type GetWeatherForecastByLocationFromAPI<Coordinate> = {
  current: WeatherOfToday;
  daily: Forecast7Days;
  lat: keyof Coordinate;
  lon: keyof Coordinate;
  timezone: string;
  timezone_offset: number;
};

export type Coordinate = { lon: number; lat: number };

// weather and forecast
type Weather = { description: string; icon: string; id: number; main: string };

export type Forecast7Days = [
  WeatherOfToday,
  WeatherOfToday,
  WeatherOfToday,
  WeatherOfToday,
  WeatherOfToday,
  WeatherOfToday,
  WeatherOfToday,
  WeatherOfToday
];

export type WeatherOfToday = {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: Weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
};

export type GetWeatherAndForecast = {
  weatherAndForecastObj: Ref<any>;
  error: Ref<string | null>;
  loadWeatherAndForecast: () => Promise<void>;
};

export type Params = {
  id: string;
  country: string;
  lat: keyof Coordinate;
  lon: keyof Coordinate;
};
