import { useState } from "react";
import "./App.css";
import initialiseGrid from "./utils/initialiseGrid";
import findFirstAvailableCellInColumn from "./utils/findFirstAvailableCellInColumn";

const CELL_SIZE = 60;
const NUMBER_OF_ROWS = 6;
const NUMBER_OF_COLUMNS = 7;

const initialGameState = [
  ...Array(NUMBER_OF_ROWS * NUMBER_OF_COLUMNS).fill(null),
];
const grid = initialiseGrid(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);

function App() {
  const [isRedsTurn, setIsRedsTurn] = useState(true);
  const [gameState, setGameState] = useState(initialGameState);

  function handleCellClick(cellIndex) {
    if (gameState[cellIndex]) return;
    const cellValue = isRedsTurn ? "red" : "yellow";
    const targetIndex = findFirstAvailableCellInColumn(gameState, cellIndex);

    setGameState((currentGameState) => {
      const slice1 = currentGameState.slice(0, targetIndex);
      const slice2 = currentGameState.slice(targetIndex + 1);
      const newState = [...slice1, cellValue, ...slice2];
      return newState;
    });
    setIsRedsTurn((isRed) => !isRed);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <div>
        <p>Current turn: {isRedsTurn ? "red" : "yellow"}</p>
        <div data-testid="grid">
          {grid.map(([row, id]) => {
            return (
              <div style={{ display: "flex" }} key={id}>
                {row.map((cellIndex) => (
                  <div
                    key={cellIndex}
                    role="button"
                    onClick={() => handleCellClick(cellIndex)}
                    style={{
                      border: "1px solid",
                      height: CELL_SIZE,
                      width: CELL_SIZE,
                      background: gameState[cellIndex] || "none",
                    }}
                    data-testid={`grid-cell-${cellIndex}`}
                  >
                    <span>{cellIndex}</span>
                    {gameState[cellIndex] ? (
                      <span style={{ display: "none" }}>
                        {gameState[cellIndex]}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
