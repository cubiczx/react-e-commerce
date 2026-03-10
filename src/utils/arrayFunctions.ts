export const countDuplicates = (value: any, array: any[]) => {
  let count = 0;
  array.forEach((item) => {
    if (item === value) {
      count++;
    }
  });
  return count;
};

export const removeDuplicates = (array: any[]) => {
  return Array.from(new Set(array));
};

export const removeItemOnce = (array: any[], value: any) => {
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};