export const generateData = (data: number[]) => {
  let newData: number[] = data.slice(1); // Shallow copy & remove the first element of the array
  let newNumber: number = getRandomNumberFromRange(1200, 1900); // Dummy data range
  newData.push(newNumber);
  return newData;
};

export const removeFirstDPAndAddNewDP = (dataPoint: number, data: number[]) => {
  // let newData: number[] = data.slice(1); // Shallow copy & remove the first element of the array
  data.shift(); // Using shift is almost 10x faster than slicing when using only one element.
  data.push(dataPoint);
  return data;
};

export const getRandomNumberFromRange = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
