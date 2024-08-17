import { useState } from "react";
import "./App.css";
import initialiseGrid from "./utils/initialiseGrid";

const cellSize = 60;

const initialGameState = [...Array(6 * 7).fill(null)];

function App() {
  const [isRedsTurn, setIsRedsTurn] = useState(true);
  const [gameState, setGameState] = useState(initialGameState);

  function handleCellClick(cellIndex) {
    const cellValue = isRedsTurn ? "red" : "yellow";
    const slice1 = gameState.slice(0, cellIndex);
    const slice2 = gameState.slice(cellIndex);
    console.log(slice1);
    console.log(slice2);
    setGameState([...slice1, cellValue, ...slice2]);
    setIsRedsTurn((isRed) => !isRed);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <div>
        <p>Current turn: {isRedsTurn ? "red" : "yellow"}</p>
        <div data-testid="grid">
          {initialiseGrid().map((row, i) => {
            return (
              <div style={{ display: "flex" }} key={i}>
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
