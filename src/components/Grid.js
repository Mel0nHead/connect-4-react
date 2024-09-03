import GridCell from "./GridCell";
import initialiseGrid from "../utils/initialiseGrid";
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "../constants";
import calculateWinner from "../utils/calculateWinner";

const grid = initialiseGrid(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);

function Grid({ gameState, onCellClick, mostRecentMove }) {
  const winningSquares = calculateWinner(gameState, mostRecentMove);

  function isWinningCell(columnIndex, rowIndex) {
    return winningSquares
      ? winningSquares.some(
          ([colIdx, rowIdx]) => colIdx === columnIndex && rowIdx === rowIndex
        )
      : false;
  }

  return (
    <div data-testid="grid">
      {grid.map(([row, id], rowIndex) => {
        return (
          <div style={{ display: "flex" }} key={id}>
            {row.map((cellIndex, columnIndex) => {
              return (
                <GridCell
                  key={cellIndex}
                  onClick={() => onCellClick(columnIndex, rowIndex)}
                  cellIndex={cellIndex}
                  value={gameState[columnIndex][rowIndex]}
                  isWinningCell={isWinningCell(columnIndex, rowIndex)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Grid;
