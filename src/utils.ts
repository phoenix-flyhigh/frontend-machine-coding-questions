export const getRange = (start: number, end: number) => {
  const length = end - start;
  return Array(length)
    .fill(0)
    .map((_, i) => start + i);
};

const MIN_PAGES_NEAR_ELLIPSIS = 2;

export const getPaginationRange = (
  totalPages: number,
  currentPage: number,
  siblings: number
) => {
  // [1, ... , siblings, currentPage, siblings, ... , lastPage]
  const minPagesWithBothEllipsis = 5 + 2 * siblings;

  if (totalPages <= minPagesWithBothEllipsis) {
    return getRange(1, totalPages + 1);
  }

  const leftBoundary = Math.max(1, currentPage - siblings);
  const rightBoundary = Math.min(totalPages, currentPage + siblings);

  const needLeftEllipsis = leftBoundary > MIN_PAGES_NEAR_ELLIPSIS;
  const needRightEllipsis =
    rightBoundary < totalPages - MIN_PAGES_NEAR_ELLIPSIS;

  if (!needLeftEllipsis && needRightEllipsis) {
    // [1, bufferPage = 1, siblings, currentPage, siblings, ...]
    const leftItemsCount = 3 + 2 * siblings;
    const leftRange = getRange(1, leftItemsCount + 1);
    return [...leftRange, " ...", totalPages];
  }

  if (needLeftEllipsis && !needRightEllipsis) {
    const rightItemsCount = 3 + 2 * siblings;
    const rightRange = getRange(
      totalPages - rightItemsCount + 1,
      totalPages + 1
    );
    return [1, "... ", ...rightRange];
  }

  const middleRange = getRange(leftBoundary, rightBoundary + 1);
  return [1, "... ", ...middleRange, " ...", totalPages];
};
