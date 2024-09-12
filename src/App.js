import { useEffect, useState } from "react";
import "./App.css";
import findFirstAvailableCellInColumn from "./utils/findFirstAvailableCellInColumn";
import { PLAYERS } from "./constants";
import DisplayMessage from "./components/DisplayMessage";
import calculateWinner from "./utils/calculateWinner";
import Grid from "./components/Grid";
import WinsCounter from "./components/WinsCounter";
import useGameState from "./hooks/useGameState";

function getWinner(winningSquares, gameState, mostRecentMove) {
  return winningSquares
    ? gameState[mostRecentMove[0]][mostRecentMove[1]]
    : null;
}

function App() {
  const { gameState, updateGameState, resetGameState } = useGameState();
  const [mostRecentMove, setMostRecentMove] = useState(null);
  const [winsCount, setWinsCount] = useState({
    [PLAYERS.Red]: 0,
    [PLAYERS.Yellow]: 0,
  });

  const winningSquares = calculateWinner(gameState, mostRecentMove);
  const winner = getWinner(winningSquares, gameState, mostRecentMove);
  const isGridFull = !gameState.flat().some((v) => v === null);

  const isRedsTurn = mostRecentMove
    ? // TODO: create util for this
      gameState[mostRecentMove[0]][mostRecentMove[1]] === PLAYERS.Yellow
    : true;

  function handleCellClick(columnIndex) {
    const cellValue = isRedsTurn ? PLAYERS.Red : PLAYERS.Yellow;
    const rowIndex = findFirstAvailableCellInColumn(gameState, columnIndex);

    if (rowIndex === null || winningSquares) return;

    updateGameState([columnIndex, rowIndex], cellValue);
    setMostRecentMove([columnIndex, rowIndex]);
  }

  function handlePlayAgainButtonClick() {
    resetGameState();
    setMostRecentMove(null);
  }

  useEffect(() => {
    if (winner) {
      setWinsCount((current) => {
        return { ...current, [winner]: current[winner] + 1 };
      });
    }
  }, [winner]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <div>
        <h1>Connect 4</h1>
        <WinsCounter winsCount={winsCount} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 16,
            marginTop: 16,
          }}
        >
          <DisplayMessage
            isRedsTurn={isRedsTurn}
            winner={winner}
            isGridFull={isGridFull}
          />
          {winningSquares || isGridFull ? (
            <button
              style={{ marginLeft: 16 }}
              onClick={handlePlayAgainButtonClick}
            >
              Play again
            </button>
          ) : null}
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
