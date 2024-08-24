import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "../constants";

const winningNumber = 4;

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

  const consecutiveSquaresInRow = gameState
    .map((col) => col[rowIndex])
    .reduce((count, cellValue) => {
      if (count === winningNumber) return count;

      return cellValue === valueOfLastMove ? count + 1 : 0;
    }, 0);

  const increasingDialognal = Array.from(Array(NUMBER_OF_COLUMNS).keys())
    .map((value) => [value, columnIndex + rowIndex - value])
    .filter(([_, rowIndex]) => rowIndex < NUMBER_OF_ROWS);

  const x = increasingDialognal.reduce((count, [colIndex, rowIndex]) => {
    const cellValue = gameState[colIndex][rowIndex];
    if (count === winningNumber) return count;

    return cellValue === valueOfLastMove ? count + 1 : 0;
  }, 0);

  return x === winningNumber ||
    consecutiveSquaresInColumn === winningNumber ||
    consecutiveSquaresInRow === winningNumber
    ? valueOfLastMove
    : null;
}

export default calculateWinner;
