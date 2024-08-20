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

function hasColumnBasedWinner(gameState, indexOfLastMove, valueOfLastMove) {
  const consecutiveSquaresInColumn = gameState
    .filter(([_, i]) => i % 7 === indexOfLastMove % NUMBER_OF_COLUMNS)
    .reduce((count, [cellValue, _]) => {
      if (count === winningNumber) return count;

      return cellValue === valueOfLastMove ? count + 1 : 0;
    }, 0);

  return consecutiveSquaresInColumn === winningNumber;
}

function calculateWinner(gameState, indexOfLastMove) {
  const valueOfLastMove = gameState[indexOfLastMove];
  const gameStateWithIndexes = gameState.map((value, i) => [value, i]);

  return hasColumnBasedWinner(
    gameStateWithIndexes,
    indexOfLastMove,
    valueOfLastMove
  ) || hasRowBasedWinner(gameStateWithIndexes, indexOfLastMove, valueOfLastMove)
    ? valueOfLastMove
    : null;
}

export default calculateWinner;
