// This is the correspondence between weatherID and Images
//  It was made with : https://openweathermap.org/weather-conditions
import CONSTANTS_ICONS from "../../assets/constantsIcons";

export type CorrespondingWeather = {
  THUNDERSTORM: number[];
  DRIZZLE_RAIN: number[];
  RAIN: number[];
  FREEZING_RAIN: number[];
  INTENSE_RAIN: number[];
  SNOW: number[];
  MIST: number[];
  CLEAR_SKY: number[];
  CLOUD_SUN: number[];
  CLOUD: number[];
};
export type CorrespondingIcon = {
  THUNDERSTORM: string;
  DRIZZLE_RAIN: string;
  RAIN: string;
  FREEZING_RAIN: string;
  INTENSE_RAIN: string;
  SNOW: string;
  MIST: string;
  CLEAR_SKY: string;
  CLOUD_SUN: string;
  CLOUD: string;
};

export const correspondingWeather: CorrespondingWeather = {
  THUNDERSTORM: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  DRIZZLE_RAIN: [300, 301, 302, 310, 311, 312, 313, 314, 321],
  RAIN: [500, 501, 502, 503, 504],
  FREEZING_RAIN: [511],
  INTENSE_RAIN: [520, 521, 522, 531],
  SNOW: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  MIST: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  CLEAR_SKY: [800],
  CLOUD_SUN: [801],
  CLOUD: [802, 803, 804],
};

export const correspondingIcon: CorrespondingIcon = {
  THUNDERSTORM: CONSTANTS_ICONS.CLOUD_RAIN_STORM,
  DRIZZLE_RAIN: CONSTANTS_ICONS.CLOUD_RAIN,
  RAIN: CONSTANTS_ICONS.CLOUD_RAIN_SUN,
  FREEZING_RAIN: CONSTANTS_ICONS.CLOUD_RAIN_SNOW,
  INTENSE_RAIN: CONSTANTS_ICONS.CLOUD_RAIN_WIND,
  SNOW: CONSTANTS_ICONS.CLOUD_SNOW,
  MIST: CONSTANTS_ICONS.CLOUD_FOG,
  CLEAR_SKY: CONSTANTS_ICONS.SUN,
  CLOUD_SUN: CONSTANTS_ICONS.CLOUD_SUN,
  CLOUD: CONSTANTS_ICONS.CLOUD,
};
