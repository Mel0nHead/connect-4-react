import { useEffect, useState } from "react";
import "./App.css";
import findFirstAvailableCellInColumn from "./utils/findFirstAvailableCellInColumn";
import { PLAYERS } from "./constants";
import DisplayMessage from "./components/DisplayMessage";
import calculateWinner from "./utils/calculateWinner";
import Grid from "./components/Grid";
import WinsCounter from "./components/WinsCounter";
import useGridState from "./hooks/useGridState";
import getGridCellValue from "./utils/getGridCellValue";
import useMostRecentMove from "./hooks/useMostRecentMove";
import useWinsCount from "./hooks/useWinsCount";

function getWinner(winningSquares, gameState, mostRecentMove) {
  return winningSquares ? getGridCellValue(gameState, mostRecentMove) : null;
}

function App() {
  const { gridState, updateGridState, resetGridState } = useGridState();
  const [mostRecentMove, setMostRecentMove] = useMostRecentMove();
  const [winsCount, setWinsCount] = useWinsCount();

  const winningSquares = calculateWinner(gridState, mostRecentMove);
  const winner = getWinner(winningSquares, gridState, mostRecentMove);
  const isGridFull = !gridState.flat().some((v) => v === null);

  const isRedsTurn = mostRecentMove
    ? getGridCellValue(gridState, mostRecentMove) === PLAYERS.Yellow
    : true;

  function handleCellClick(columnIndex) {
    const cellValue = isRedsTurn ? PLAYERS.Red : PLAYERS.Yellow;
    const rowIndex = findFirstAvailableCellInColumn(gridState, columnIndex);

    if (rowIndex === null || winningSquares) return;

    const cellCoordinates = [columnIndex, rowIndex];

    updateGridState(cellCoordinates, cellValue);
    setMostRecentMove(cellCoordinates);
  }

  function handlePlayAgainButtonClick() {
    resetGridState();
    setMostRecentMove(null);
  }

  useEffect(() => {
    if (winner) {
      setWinsCount(winner);
    }
  }, [winner, setWinsCount]);

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
          gameState={gridState}
          onCellClick={handleCellClick}
          mostRecentMove={mostRecentMove}
          isRedsTurn={isRedsTurn}
        />
      </div>
    </div>
  );
}

export default App;
