import { useState } from "react";
import "./App.css";
import initialiseGrid from "./utils/initialiseGrid";
import findFirstAvailableCellInColumn from "./utils/findFirstAvailableCellInColumn";
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS, PLAYERS } from "./constants";
import updateGameState from "./utils/updateGameState";
import DisplayMessage from "./components/DisplayMessage";
import calculateWinner from "./utils/calculateWinner";

const CELL_SIZE = 60;

const initialGameState = [
  ...Array(NUMBER_OF_COLUMNS).fill([...Array(NUMBER_OF_ROWS).fill(null)]),
];

const grid = initialiseGrid(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);

function App() {
  const [isRedsTurn, setIsRedsTurn] = useState(true);
  const [gameState, setGameState] = useState(initialGameState);
  const [mostRecentMove, setMostRecentMove] = useState(null);

  const winner = calculateWinner(gameState, mostRecentMove);

  function handleCellClick(columnIndex) {
    const cellValue = isRedsTurn ? PLAYERS.Red : PLAYERS.Yellow;
    const rowIndex = findFirstAvailableCellInColumn(gameState, columnIndex);

    if (rowIndex === null || winner) return;

    setGameState((currentGameState) => {
      return updateGameState(
        currentGameState,
        columnIndex,
        rowIndex,
        cellValue
      );
    });
    setIsRedsTurn((isRed) => !isRed);
    setMostRecentMove([columnIndex, rowIndex]);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <div>
        <DisplayMessage isRedsTurn={isRedsTurn} winner={winner} />
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
