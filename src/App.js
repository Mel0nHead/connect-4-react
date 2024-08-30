import { useState } from "react";
import "./App.css";
import initialiseGrid from "./utils/initialiseGrid";
import findFirstAvailableCellInColumn from "./utils/findFirstAvailableCellInColumn";
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS, PLAYERS } from "./constants";
import updateGameState from "./utils/updateGameState";
import DisplayMessage from "./components/DisplayMessage";
import calculateWinner from "./utils/calculateWinner";
import GridCell from "./components/GridCell";

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
      console.log(
        updateGameState(currentGameState, columnIndex, rowIndex, cellValue)
      );

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

  function handlePlayAgainButtonClick() {
    setIsRedsTurn(true);
    setGameState(initialGameState);
    setMostRecentMove(null);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <DisplayMessage isRedsTurn={isRedsTurn} winner={winner} />
          {winner ? (
            <button
              style={{ marginLeft: 16 }}
              onClick={handlePlayAgainButtonClick}
            >
              Play again
            </button>
          ) : null}
        </div>
        <div data-testid="grid">
          {grid.map(([row, id], rowIndex) => {
            return (
              <div style={{ display: "flex" }} key={id}>
                {row.map((cellIndex, columnIndex) => {
                  return (
                    <GridCell
                      key={cellIndex}
                      onClick={() => handleCellClick(columnIndex, rowIndex)}
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
      </div>
    </div>
  );
}

export default App;
