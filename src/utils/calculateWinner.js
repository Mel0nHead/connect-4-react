import { NUMBER_OF_COLUMNS } from "../constants";

const winningNumber = 4;

function hasRowBasedWinner(gameState, indexOfLastMove, valueOfLastMove) {
  const consecutiveSquaresInRow = gameState
    .filter(
      ([_, i]) =>
        Math.floor(i / NUMBER_OF_COLUMNS) ===
        Math.floor(indexOfLastMove / NUMBER_OF_COLUMNS)
    )
    .reduce((count, [cellValue, _]) => {
      if (count === winningNumber) return count;
      return cellValue === valueOfLastMove ? count + 1 : 0;
    }, 0);

  return consecutiveSquaresInRow === winningNumber;
}

function calculateWinner(gameState, move) {
  const [columnIndex, rowIndex] = move;

  const valueOfLastMove = gameState[columnIndex][rowIndex];

  const consecutiveSquaresInColumn = gameState[columnIndex].reduce(
    (count, cellValue) => {
      if (count === winningNumber) return count;

      return cellValue === valueOfLastMove ? count + 1 : 0;
    },
    0
  );

  return consecutiveSquaresInColumn === winningNumber ? valueOfLastMove : null;
}

export default calculateWinner;
