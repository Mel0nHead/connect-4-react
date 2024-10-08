import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "../constants";
import getGridCellValue from "./getGridCellValue";

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
  const valueOfLastMove = getGridCellValue(gameState, move);

  const ascendingConsecutiveSquares = getAscendingDiagonal(
    columnIndex,
    rowIndex
  ).reduce((arr, move) => {
    if (arr.length === winningNumber) return arr;

    return getGridCellValue(gameState, move) === valueOfLastMove
      ? [...arr, move]
      : [];
  }, []);

  const descendingConsecutiveSquares = getDescendingDiagonal(
    columnIndex,
    rowIndex
  ).reduce((arr, move) => {
    if (arr.length === winningNumber) return arr;

    return getGridCellValue(gameState, move) === valueOfLastMove
      ? [...arr, move]
      : [];
  }, []);

  return (
    (descendingConsecutiveSquares.length === winningNumber
      ? descendingConsecutiveSquares
      : null) ||
    (ascendingConsecutiveSquares.length === winningNumber
      ? ascendingConsecutiveSquares
      : null)
  );
}

function getColumnBasedWinner(gameState, move) {
  const columnIndex = move[0];
  const valueOfLastMove = getGridCellValue(gameState, move);

  const consecutiveSquaresInColumn = gameState[columnIndex].reduce(
    (arr, cellValue, rowIdx) => {
      if (arr.length === winningNumber) return arr;

      return cellValue === valueOfLastMove
        ? [...arr, [columnIndex, rowIdx]]
        : [];
    },
    []
  );

  return consecutiveSquaresInColumn.length === winningNumber
    ? consecutiveSquaresInColumn
    : null;
}

function getRowBasedWinner(gameState, move) {
  const rowIndex = move[1];
  const valueOfLastMove = getGridCellValue(gameState, move);

  const consecutiveSquaresInRow = gameState
    .map((col) => col[rowIndex])
    .reduce((arr, cellValue, colIdx) => {
      if (arr.length === winningNumber) return arr;

      return cellValue === valueOfLastMove ? [...arr, [colIdx, rowIndex]] : [];
    }, []);

  return consecutiveSquaresInRow.length === winningNumber
    ? consecutiveSquaresInRow
    : null;
}

function calculateWinner(gameState, move) {
  if (!move) return null;

  const winningSquares =
    hasWinningDiagonal(gameState, move) ||
    getColumnBasedWinner(gameState, move) ||
    getRowBasedWinner(gameState, move);

  return winningSquares || null;
}

export default calculateWinner;
