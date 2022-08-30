import { ref, Ref } from "vue";
import {
  CityObjFromAPI,
  Coordinate,
  GetWeatherForecastByLocationFromAPI,
  GetWeatherAndForecast,
  Params,
} from "../types";

export const getWeatherAndForecast = (
  location: Ref<CityObjFromAPI>
): GetWeatherAndForecast => {
  const weatherAndForecastObj = ref<
    GetWeatherForecastByLocationFromAPI<Coordinate> | {}
  >({});
  let error = ref<string | null>(null);

  let urlGetWeatherAndForecast = initUrlWithParams(location);

  const loadWeatherAndForecast = async (): Promise<void> => {
    try {
      const data: Response = await fetch(urlGetWeatherAndForecast);
      if (!data.ok) {
        throw Error("No data available");
      }
      weatherAndForecastObj.value = await data.json();
      console.log(weatherAndForecastObj.value);
    } catch (err) {
      error.value = err as string;
    }
  };

  return { weatherAndForecastObj, error, loadWeatherAndForecast };
};

const initUrlWithParams = (location: Ref<CityObjFromAPI>): URL => {
  const params = {
    id: location.value.id,
    country: location.value.country,
    ...location.value.coord,
  } as unknown as Params;

  let url = new URL(`http:localhost:4000/api/weather-forecast/${params.id}`);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key as keyof Params])
  );
  return url;
};
