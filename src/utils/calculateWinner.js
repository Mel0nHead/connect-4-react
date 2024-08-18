import { NUMBER_OF_COLUMNS } from "../constants";

function calculateWinner(gameState, indexOfLastMove) {
  const valueOfLastMove = gameState[indexOfLastMove];

  const column = gameState
    .map((value, i) => [value, i])
    .filter(([_, i]) => i % 7 === indexOfLastMove % NUMBER_OF_COLUMNS);

  const consecutiveCellCount = column.reduce((count, [cellValue, _]) => {
    if (count === 4) return count;

    return cellValue === valueOfLastMove ? count + 1 : 0;
  }, 0);

  return consecutiveCellCount === 4 ? valueOfLastMove : null;
}

export default calculateWinner;
