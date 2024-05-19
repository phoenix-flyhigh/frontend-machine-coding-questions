export const textComparator = (longerText: string, shorterText: string) => {
  return longerText.toLowerCase().includes(shorterText.toLowerCase());
};
