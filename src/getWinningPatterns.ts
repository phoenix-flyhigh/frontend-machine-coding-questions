export const getWinningPatterns = (boardSize: number) => {
  const patterns = [];

  for (let i = 0; i < boardSize; i += 1) {
    const rowPattern = [];
    for (let j = 0; j < boardSize; j += 1) {
      rowPattern.push(i * boardSize + j);
    }
    patterns.push(rowPattern);
  }

  for (let i = 0; i < boardSize; i += 1) {
    const colPattern = [];
    for (let j = 0; j < boardSize; j += 1) {
      colPattern.push(i + j * boardSize);
    }
    patterns.push(colPattern);
  }

  const diag1 = [];
  const diag2 = [];

  for (let i = 0; i < boardSize; i += 1) {
    diag1.push(i * (boardSize + 1));
    diag2.push((i + 1) * (boardSize - 1));
  }

  patterns.push(diag1, diag2);
  return patterns;
};
