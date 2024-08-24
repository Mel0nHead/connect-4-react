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

  return consecutiveSquaresInColumn === winningNumber ||
    consecutiveSquaresInRow === winningNumber
    ? valueOfLastMove
    : null;
}

export default calculateWinner;
