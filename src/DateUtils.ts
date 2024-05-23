export const subtractYears = (years: number) => {
  const today = new Date();
  const yr = today.getFullYear() - years;
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDay()).padStart(2, "0");

  return `${yr}-${month}-${day}`;
};
