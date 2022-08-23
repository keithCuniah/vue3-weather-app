const sortArrayOfObjByKey = <T>(arrayOfObj: Array<T>, keyOfObj: keyof T) =>
  arrayOfObj.sort((a: T, b: T) => (a[keyOfObj] > b[keyOfObj] ? 1 : -1));

export default sortArrayOfObjByKey;
