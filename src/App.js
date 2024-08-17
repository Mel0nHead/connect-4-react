import { useState } from "react";
import "./App.css";
import initialiseGrid from "./utils/initialiseGrid";

const cellSize = 60;

const initialGameState = [...Array(6 * 7).fill(null)];
const grid = initialiseGrid();

function App() {
  const [isRedsTurn, setIsRedsTurn] = useState(true);
  const [gameState, setGameState] = useState(initialGameState);

  function handleCellClick(cellIndex) {
    const cellValue = isRedsTurn ? "red" : "yellow";

    setGameState((currentGameState) => {
      const slice1 = currentGameState.slice(0, cellIndex);
      const slice2 = currentGameState.slice(cellIndex + 1);
      const newState = [...slice1, cellValue, ...slice2];

      console.log(slice1);
      console.log(slice2);

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
                      height: cellSize,
                      width: cellSize,
                    }}
                    data-testid={`grid-cell-${cellIndex}`}
                  >
                    <span>{cellIndex}</span>
                    {gameState[cellIndex] ? (
                      <span>{gameState[cellIndex]}</span>
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
