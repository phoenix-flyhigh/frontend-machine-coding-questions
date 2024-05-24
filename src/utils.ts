export const getRange = (start: number, end: number) => {
  const length = end - start;
  return Array(length)
    .fill(0)
    .map((_, i) => start + i);
};

export const getPaginationRange = (
  totalPages: number,
  currentPage: number,
  siblings: number
) => {
  const totalPageInArray = 7 + siblings;

  if (totalPages <= totalPageInArray) {
    return getRange(1, totalPages + 1);
  }

  const leftSiblingsIndex = Math.max(currentPage - siblings, 1);
  const rightSiblingsIndex = Math.min(currentPage + siblings, totalPages);

  const showLeftDots = leftSiblingsIndex > 2;
  const showRightDots = rightSiblingsIndex < totalPages - 2;

  if (!showLeftDots && showRightDots) {
    const leftItemsCount = 3 + 2 * siblings;
    const leftRange = getRange(1, leftItemsCount + 1);
    return [...leftRange, " ...", totalPages];
  } else if (showLeftDots && !showRightDots) {
    const rightItemsCount = 3 + 2 * siblings;
    const rightRange = getRange(
      totalPages - rightItemsCount + 1,
      totalPages + 1
    );
    return [1, "... ", ...rightRange];
  } else {
    const middleRange = getRange(leftSiblingsIndex, rightSiblingsIndex + 1);
    return [1, "... ", ...middleRange, " ...", totalPages];
  }
};
