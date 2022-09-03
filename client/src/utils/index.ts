import { SetupContext } from "vue";
import {
  correspondingWeather,
  CorrespondingWeather,
  correspondingIcon,
} from "../components/weather-icon/weatherConditions";

export const sortArrayOfObjByKey = <T>(
  arrayOfObj: Array<T>,
  keyOfObj: keyof T
) => arrayOfObj.sort((a: T, b: T) => (a[keyOfObj] > b[keyOfObj] ? 1 : -1));

export const onAwaitCall = async (
  context: SetupContext,
  getValues: () => Promise<void>,
  labelOfWaitedValues: string | null
) => {
  try {
    context.emit("onLoading", labelOfWaitedValues);
    await getValues();
    context.emit("loaded");
  } catch (err) {
    console.log(err);
  }
};

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

export const capitalizedWord = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase();

export const convertDegToCardinal = (windDeg: number): string => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  let section = parseInt(String(windDeg / 22.5 + 0.5), 10);

  section = section % 16;

  return directions[section];
};

export const convertVelocityMeterBySecondInKilometerByHour = (
  velocityInMeterBySecond: number
): number => Math.round(velocityInMeterBySecond * 3.6);

export const getDayFromTimestamp = (timeStamp: number): string =>
  new Date(timeStamp * 1000).toLocaleString("en-US", { weekday: "long" });
