import { beforeEach, describe, expect, it } from "vitest";
import {
  sortArrayOfObjByKey,
  capitalized,
  convertDegToCardinal,
  convertVelocityMeterBySecondInKilometerByHour,
  getDayFromTimestamp,
  onAwaitCall,
} from "./index";

describe("#sortArrayOfObjByKey", () => {
  type TestArr = { id: number; name: string };
  const testArr: TestArr[] = [
    {
      id: 1,
      name: "a",
    },
    {
      id: 2,
      name: "c",
    },
    {
      id: 4,
      name: "e",
    },
    {
      id: 3,
      name: "b",
    },
  ];

  beforeEach(() => {});
  it("sort Array of Object By Key value (typeof value : String)", () => {
    const newSortedArray = sortArrayOfObjByKey<TestArr>(testArr, "name");

    expect(newSortedArray).toStrictEqual([
      { id: 1, name: "a" },
      { id: 3, name: "b" },
      { id: 2, name: "c" },
      { id: 4, name: "e" },
    ]);
  });
  it("sort Array of Object By Key value (typeof value : number)", () => {
    const newSortedArray = sortArrayOfObjByKey<TestArr>(testArr, "id");

    expect(newSortedArray).toStrictEqual([
      { id: 1, name: "a" },
      { id: 2, name: "c" },
      { id: 3, name: "b" },
      { id: 4, name: "e" },
    ]);
  });
});

//TODO complete this test
describe.skip("#onAwaitCall", () => {
  it("try to get values", async () => {
    const emit: (event: "onLoading" | "loaded", ...args: any[]) => void = (
      event: "onLoading" | "loaded",
      ...args: any[]
    ): void => {};

    const getValues: () => Promise<void> = () =>
      new Promise((resolve: any, reject) => {
        setTimeout(() => {
          resolve("resolved");
        }, 0);
      });

    const labelOfWaitedValues = null;

    const daboudi = await onAwaitCall(emit, getValues, labelOfWaitedValues);

    expect(emit).toBeCalled();
    console.log(daboudi);
  });
});

describe("#capitalized", () => {
  const sentence = "daboudi dabouda";
  it("Capitalized a String", () => {
    const formatedsentence = capitalized(sentence);
    expect(formatedsentence).toBe("Daboudi dabouda");
  });
});

describe("#convertDegToCardinal", () => {
  const winDegs: number[] = [
    360, 30, 45, 60, 90, 110, 135, 155, 180, 200, 220, 245, 265, 290, 310, 330,
  ];
  const directions: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ] = [
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
  it("convert a degree value into cardinal", () => {
    const winDegInDirections: typeof directions = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ];
    winDegs.forEach((winDeg: number, index: number) => {
      const convertWinDeg = convertDegToCardinal(winDeg);
      winDegInDirections[index] = convertWinDeg;
    });

    expect(winDegInDirections).toStrictEqual(directions);
  });
});

describe("#convertVelocityMeterBySecondInKilometerByHour", () => {
  it("convert a velocity from m/s into Km/h", () => {
    const velocityInMeterBySecond = 1;
    const velocityInKilometerByHour =
      convertVelocityMeterBySecondInKilometerByHour(velocityInMeterBySecond);

    expect(velocityInKilometerByHour).toBe(3.6);
  });
});

describe("#getDayFromTimestamp", () => {
  it("return the day from a Timestamp", () => {
    const days = [
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
    ];

    const timestampsToTest: [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number
    ] = [
      1663239600, 1663326000, 1663412400, 1663498800, 1663585200, 1663671600,
      1663758000, 1663844400,
    ];

    const daysFromTimestamps: typeof days = [
      "date 1",
      "date 2",
      "date 3",
      "date 4",
      "date 5",
      "date 6",
      "date 7",
      "date 8",
    ];

    timestampsToTest.forEach(
      (timestamp, index) =>
        (daysFromTimestamps[index] = getDayFromTimestamp(timestamp))
    );

    expect(daysFromTimestamps).toStrictEqual(daysFromTimestamps);
  });
});
