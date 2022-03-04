export const transformData = (data) => {
  const dataARR = [];
  if (data) {
    for (let key in data) {
      dataARR.push(data[key].tag);
    }
  }

  return dataARR;
};
