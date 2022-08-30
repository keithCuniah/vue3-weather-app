export const sortArrayOfObjByKey = <T>(
  arrayOfObj: Array<T>,
  keyOfObj: keyof T
) => arrayOfObj.sort((a: T, b: T) => (a[keyOfObj] > b[keyOfObj] ? 1 : -1));

export const convertDegToCardinal = (winDeg: number): string => {
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

  let section = parseInt(String(winDeg / 22.5 + 0.5), 10);

  section = section % 16;

  return directions[section];
};
