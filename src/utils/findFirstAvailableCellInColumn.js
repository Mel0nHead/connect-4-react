function findFirstAvailableCellInColumn(gameState, columnIndex) {
  const cell = gameState[columnIndex]
    .map((value, i) => [value, i])
    .reverse()
    .find(([value, _]) => value === null);

  return cell ? cell[1] : null;
}

export default findFirstAvailableCellInColumn;
