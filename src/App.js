import { useState } from "react";
import "./App.css";
import findFirstAvailableCellInColumn from "./utils/findFirstAvailableCellInColumn";
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS, PLAYERS } from "./constants";
import updateGameState from "./utils/updateGameState";
import DisplayMessage from "./components/DisplayMessage";
import calculateWinner from "./utils/calculateWinner";
import Grid from "./components/Grid";

const initialGameState = [
  ...Array(NUMBER_OF_COLUMNS).fill([...Array(NUMBER_OF_ROWS).fill(null)]),
];

function App() {
  const [isRedsTurn, setIsRedsTurn] = useState(true);
  const [gameState, setGameState] = useState(initialGameState);
  const [mostRecentMove, setMostRecentMove] = useState(null);

  const winningSquares = calculateWinner(gameState, mostRecentMove);

  function handleCellClick(columnIndex) {
    const cellValue = isRedsTurn ? PLAYERS.Red : PLAYERS.Yellow;
    const rowIndex = findFirstAvailableCellInColumn(gameState, columnIndex);

    if (rowIndex === null || winningSquares) return;

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

  function handlePlayAgainButtonClick() {
    setIsRedsTurn(true);
    setGameState(initialGameState);
    setMostRecentMove(null);
  }

  function getWinner(winningSquares, gameState, mostRecentMove) {
    return winningSquares
      ? gameState[mostRecentMove[0]][mostRecentMove[1]]
      : null;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <div>
        <h1>Connect 4</h1>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <DisplayMessage
            isRedsTurn={isRedsTurn}
            winner={getWinner(winningSquares, gameState, mostRecentMove)}
          />
          {winningSquares ? (
            <button
              style={{ marginLeft: 16 }}
              onClick={handlePlayAgainButtonClick}
            >
              Play again
            </button>
          ) : null}
          <div data-testid="win-tallies">
            <h2>Wins</h2>
          </div>
        </div>
        <Grid
          gameState={gameState}
          onCellClick={handleCellClick}
          mostRecentMove={mostRecentMove}
          isRedsTurn={isRedsTurn}
        />
      </div>
    </div>
  );
}

export default App;
