export type CountryObjFromAPI = { id: number; country: string };

export type CityObjFromAPI = {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: Coordinate;
};

export type GetWeatherForecastByLocationFromAPI<Coordinate> = {
  current: any;
  daily: any;
  lat: keyof Coordinate;
  lon: keyof Coordinate;
  timezone: string;
  timezone_offset: number;
};

export type Coordinate = { lon: number; lat: number };
