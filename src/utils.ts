export const intersection: <T>(list1: T[], list2: T[]) => T[] = (
  list1,
  list2
) => {
  return list1.filter((x) =>
    list2.some((s) => JSON.stringify(s) === JSON.stringify(x))
  );
};

export const not: <T>(list1: T[], list2: T[]) => T[] = (list1, list2) => {
  return list1.filter(
    (x) => !list2.some((s) => JSON.stringify(s) === JSON.stringify(x))
  );
};
