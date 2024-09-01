import GridCell from "./GridCell";
import initialiseGrid from "../utils/initialiseGrid";
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "../constants";
import calculateWinner from "../utils/calculateWinner";

const grid = initialiseGrid(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);

function Grid({ gameState, onCellClick, mostRecentMove }) {
  const winningSquares = calculateWinner(gameState, mostRecentMove);

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
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  isWinningCell={
                    winningSquares
                      ? winningSquares.some(
                          ([colIdx, rowIdx]) =>
                            colIdx === columnIndex && rowIdx === rowIndex
                        )
                      : false
                  }
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
