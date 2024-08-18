function findFirstAvailableCellInColumn(gameState, targetCellIndex) {
  const cell = gameState
    .map((value, i) => [value, i])
    .filter(([_, i]) => i % 7 === targetCellIndex % 7)
    .reverse()
    .find(([value, _]) => value === null);

  return cell ? cell[1] : null;
}

export default findFirstAvailableCellInColumn;
