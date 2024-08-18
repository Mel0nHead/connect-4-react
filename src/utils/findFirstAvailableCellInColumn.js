function findFirstAvailableCellInColumn(gameState, targetCellIndex) {
  const [_, targetIndex] = gameState
    .map((value, i) => [value, i])
    .filter(([_, i]) => i % 7 === targetCellIndex % 7)
    .reverse()
    .find(([value, _]) => value === null);

  return targetIndex;
}

export default findFirstAvailableCellInColumn;
