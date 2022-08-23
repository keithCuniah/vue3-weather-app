import { ref, Ref, toRefs } from "vue";
import { CityObjFromAPI, Coordinate } from "../types";

export const getWeather = (location: Ref<CityObjFromAPI>) => {
  const weatherObj = ref<any | {}>({});
  let error = ref<string | null>(null);

  const loadWeather = async (): Promise<void> => {
    try {
      getWeatherFromApi();
    } catch (err) {
      error.value = err as string;
    }
  };

  const getWeatherFromApi = async () => {
    const params = initParamsForUrl();
    let urlGetweather = new URL(
      `http://localhost:4000/api/weather/${params.id}`
    );
    Object.keys(params).forEach((key) => {
      console.log(key, params[key as ParamsKeys]);
      urlGetweather.searchParams.append(key, params[key as keyof Params]);
    });
    console.log(urlGetweather);
    const data: Response = await fetch(urlGetweather);
    if (!data.ok) {
      throw Error("No data available");
    }
    weatherObj.value = await data.json();
  };

  const initParamsForUrl = (): Params => {
    const { id, country, coord } = toRefs(location.value);

    const params = {
      id: id.value,
      country: country.value,
      ...coord.value,
    } as unknown as Params;
    return params;
  };

  const createUrlWithParams = (params: Params): URL => {
    let urlGetweather = new URL(
      `http://localhost:4000/api/weather/${params.id}`
    );
    Object.keys(params).forEach((key) => {
      console.log(key, params[key as ParamsKeys]);
      urlGetweather.searchParams.append(key, params[key as keyof Params]);
    });
    console.log(urlGetweather);
    return urlGetweather;
  };

  console.log(weatherObj.value);
  return { weatherObj, error, loadWeather };
};

type Params = {
  id: string;
  country: string;
  lat: keyof Coordinate;
  lon: keyof Coordinate;
};
type ParamsKeys = keyof Params;
