import {
  correspondingIcon,
  CorrespondingWeather,
  correspondingWeather,
} from "../components/weather-icon/weatherConditions";

export const getIconByWeatherId = (weatherId: number): string => {
  // This method return the corresponding icon depending on weather id
  // get corresponding weather from id
  const currentWeather = Object.keys(correspondingWeather).find((key) =>
    correspondingWeather[key as keyof CorrespondingWeather].includes(weatherId)
  );

  // get corresponging icon
  const currentIcon =
    correspondingIcon[currentWeather as keyof CorrespondingWeather];
  return currentIcon;
};
