import GridCell from "./GridCell";
import initialiseGrid from "../utils/initialiseGrid";
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "../constants";

const grid = initialiseGrid(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);

function Grid({ gameState, onCellClick }) {
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
