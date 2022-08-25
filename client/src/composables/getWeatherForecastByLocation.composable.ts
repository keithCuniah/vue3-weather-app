import { ref, Ref } from "vue";
import { Coordinate } from "../types";

export const getWeatherAndForecast = (
  location: Ref<any>
): GetWeatherAndForecast => {
  const weatherAndForecastObj = ref<any | {}>({});
  let error = ref<string | null>(null);

  let urlGetWeatherAndForecast = initUrlWithParams(location);

  const loadWeatherAndForecast = async (): Promise<void> => {
    try {
      const data: Response = await fetch(urlGetWeatherAndForecast);
      if (!data.ok) {
        throw Error("No data available");
      }
      weatherAndForecastObj.value = await data.json();
    } catch (err) {
      error.value = err as string;
    }
  };

  return { weatherAndForecastObj, error, loadWeatherAndForecast };
};

const initUrlWithParams = (location: Ref<any>): URL => {
  const params = {
    id: location.value.id,
    country: location.value.country,
    ...location.value.coord,
  } as unknown as Params;

  let url = new URL(`http:localhost:4000/api/weather/${params.id}`);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key as keyof Params])
  );
  return url;
};

export type GetWeatherAndForecast = {
  weatherAndForecastObj: Ref<any>;
  error: Ref<string | null>;
  loadWeatherAndForecast: () => Promise<void>;
};

type Params = {
  id: string;
  country: string;
  lat: keyof Coordinate;
  lon: keyof Coordinate;
};
