const getCurrentMonth = (): number => {
  return new Date().getMonth() + 1;
};

const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

const getLastMonth = (): number => {
  return new Date().getMonth();
};

export { getCurrentMonth, getLastMonth, getCurrentYear };
