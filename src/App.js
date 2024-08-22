import { useState } from "react";
import "./App.css";
import initialiseGrid from "./utils/initialiseGrid";
import findFirstAvailableCellInColumn from "./utils/findFirstAvailableCellInColumn";
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "./constants";
import updateGameState from "./utils/updateGameState";

const CELL_SIZE = 60;

const initialGameState = [
  ...Array(NUMBER_OF_COLUMNS).fill([...Array(NUMBER_OF_ROWS).fill(null)]),
];

const grid = initialiseGrid(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);

function App() {
  const [isRedsTurn, setIsRedsTurn] = useState(true);
  const [gameState, setGameState] = useState(initialGameState);

  function handleCellClick(columnIndex) {
    const cellValue = isRedsTurn ? "red" : "yellow";
    const rowIndex = findFirstAvailableCellInColumn(gameState, columnIndex);

    if (rowIndex === null) return;

    setGameState((currentGameState) => {
      return updateGameState(
        currentGameState,
        columnIndex,
        rowIndex,
        cellValue
      );
    });
    setIsRedsTurn((isRed) => !isRed);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <div>
        <p>Current turn: {isRedsTurn ? "red" : "yellow"}</p>
        <div data-testid="grid">
          {grid.map(([row, id], rowIndex) => {
            return (
              <div style={{ display: "flex" }} key={id}>
                {row.map((cellIndex, columnIndex) => {
                  const cellValue = gameState[columnIndex][rowIndex];

                  return (
                    <div
                      key={cellIndex}
                      role="button"
                      onClick={() => handleCellClick(columnIndex, rowIndex)}
                      style={{
                        border: "1px solid",
                        height: CELL_SIZE,
                        width: CELL_SIZE,
                        background: cellValue || "none",
                      }}
                      data-testid={`grid-cell-${cellIndex}`}
                    >
                      <span>
                        {columnIndex}, {rowIndex}
                      </span>
                      {cellValue ? (
                        <span style={{ display: "none" }}>{cellValue}</span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
