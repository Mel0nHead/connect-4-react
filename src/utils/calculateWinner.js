import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "../constants";

const winningNumber = 4;

function getAscendingDiagonal(columnIndex, rowIndex) {
  return Array.from(Array(NUMBER_OF_COLUMNS).keys())
    .map((value) => [value, columnIndex + rowIndex - value])
    .filter(([_, rowIndex]) => rowIndex < NUMBER_OF_ROWS);
}

function getDescendingDiagonal(columnIndex, rowIndex) {
  const min = Math.min(columnIndex, rowIndex);

  let cI = columnIndex - min;
  let rI = rowIndex - min;
  const arr = [];

  while (cI < NUMBER_OF_COLUMNS && rI < NUMBER_OF_ROWS) {
    arr.push([cI, rI]);
    cI++;
    rI++;
  }

  return arr;
}

function hasWinningDiagonal(gameState, move) {
  const [columnIndex, rowIndex] = move;
  const valueOfLastMove = gameState[columnIndex][rowIndex];

  const ascendingConsecutiveCount = getAscendingDiagonal(
    columnIndex,
    rowIndex
  ).reduce((count, [colIndex, rowIndex]) => {
    const cellValue = gameState[colIndex][rowIndex];
    if (count === winningNumber) return count;

    return cellValue === valueOfLastMove ? count + 1 : 0;
  }, 0);

  const descendingConsecutiveCount = getDescendingDiagonal(
    columnIndex,
    rowIndex
  ).reduce((count, [colIndex, rowIndex]) => {
    const cellValue = gameState[colIndex][rowIndex];
    if (count === winningNumber) return count;

    return cellValue === valueOfLastMove ? count + 1 : 0;
  }, 0);

  return (
    descendingConsecutiveCount === winningNumber ||
    ascendingConsecutiveCount === winningNumber
  );
}

function hasWinningColumn(gameState, move) {
  const [columnIndex, rowIndex] = move;
  const valueOfLastMove = gameState[columnIndex][rowIndex];

  const consecutiveSquaresInColumn = gameState[columnIndex].reduce(
    (count, cellValue) => {
      if (count === winningNumber) return count;

      return cellValue === valueOfLastMove ? count + 1 : 0;
    },
    0
  );

  return consecutiveSquaresInColumn === winningNumber;
}

function hasWinningRow(gameState, move) {
  const [columnIndex, rowIndex] = move;
  const valueOfLastMove = gameState[columnIndex][rowIndex];

  const consecutiveSquaresInRow = gameState
    .map((col) => col[rowIndex])
    .reduce((count, cellValue) => {
      if (count === winningNumber) return count;

      return cellValue === valueOfLastMove ? count + 1 : 0;
    }, 0);

  return consecutiveSquaresInRow === winningNumber;
}

function calculateWinner(gameState, move) {
  const [columnIndex, rowIndex] = move;
  const valueOfLastMove = gameState[columnIndex][rowIndex];

  const hasWinner =
    hasWinningDiagonal(gameState, move) ||
    hasWinningColumn(gameState, move) ||
    hasWinningRow(gameState, move);

  return hasWinner ? valueOfLastMove : null;
}

export default calculateWinner;
