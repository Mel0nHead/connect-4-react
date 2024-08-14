import { useState } from "react";
import "./App.css";
import initialiseGrid from "./utils/initialiseGrid";

const cellSize = 60;

function App() {
  const [isRedNext, setIsRedNext] = useState(true);

  function handleCellClick() {
    setIsRedNext((isRed) => !isRed);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <div>
        <p>Current turn: {isRedNext ? "red" : "yellow"}</p>
        <div data-testid="grid">
          {initialiseGrid().map((row, i) => {
            return (
              <div style={{ display: "flex" }} key={i}>
                {row.map((cell) => (
                  <div
                    key={cell}
                    role="button"
                    onClick={handleCellClick}
                    style={{
                      border: "1px solid",
                      height: cellSize,
                      width: cellSize,
                    }}
                    data-testid="grid-cell"
                  ></div>
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
