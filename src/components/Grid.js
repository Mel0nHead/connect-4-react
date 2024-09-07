import GridCell from "./GridCell";
import initialiseGrid from "../utils/initialiseGrid";
import {
  CELL_SIZE,
  NUMBER_OF_COLUMNS,
  NUMBER_OF_ROWS,
  PLAYERS,
} from "../constants";
import calculateWinner from "../utils/calculateWinner";
import { useState } from "react";
import GameToken from "./GameToken";

const grid = initialiseGrid(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);
const topRow = Array.from(Array(NUMBER_OF_COLUMNS).keys());

function Grid({ gameState, onCellClick, mostRecentMove, isRedsTurn }) {
  const [currentHoveredRow, setCurrentHoveredRow] = useState(null);

  const winningSquares = calculateWinner(gameState, mostRecentMove);

  function isWinningCell(columnIndex, rowIndex) {
    return winningSquares
      ? winningSquares.some(
          ([colIdx, rowIdx]) => colIdx === columnIndex && rowIdx === rowIndex
        )
      : false;
  }

  function handleMouseLeave() {
    setCurrentHoveredRow(null);
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        {topRow.map((val) => (
          <div
            key={val}
            style={{ width: CELL_SIZE + 2, height: CELL_SIZE + 2, padding: 5 }}
          >
            {currentHoveredRow === val && !winningSquares ? (
              <GameToken value={isRedsTurn ? PLAYERS.Red : PLAYERS.Yellow} />
            ) : null}
          </div>
        ))}
      </div>
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
                    onMouseEnter={() => {
                      setCurrentHoveredRow(columnIndex);
                    }}
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Grid;
