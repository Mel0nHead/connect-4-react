import { NUMBER_OF_COLUMNS } from "../constants";

function findFirstAvailableCellInColumn(gameState, targetCellIndex) {
  const cell = gameState
    .map((value, i) => [value, i])
    .filter(([_, i]) => i % 7 === targetCellIndex % NUMBER_OF_COLUMNS)
    .reverse()
    .find(([value, _]) => value === null);

  return cell ? cell[1] : null;
}

export default findFirstAvailableCellInColumn;
