export type CountryObjFromAPI = { id: number; country: string };

export type CityObjFromAPI = {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: Coordinate;
};

type Coordinate = { lon: number; lat: number };
