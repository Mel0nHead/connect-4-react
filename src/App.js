import { useEffect, useState } from "react";
import "./App.css";
import findFirstAvailableCellInColumn from "./utils/findFirstAvailableCellInColumn";
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS, PLAYERS } from "./constants";
import updateGameState from "./utils/updateGameState";
import DisplayMessage from "./components/DisplayMessage";
import calculateWinner from "./utils/calculateWinner";
import Grid from "./components/Grid";
import WinsCounter from "./components/WinsCounter";

const initialGameState = [
  ...Array(NUMBER_OF_COLUMNS).fill([...Array(NUMBER_OF_ROWS).fill(null)]),
];

function getWinner(winningSquares, gameState, mostRecentMove) {
  return winningSquares
    ? gameState[mostRecentMove[0]][mostRecentMove[1]]
    : null;
}

function getInitialGameState() {
  const storedState = localStorage.getItem("gameState");

  const initialGameState = [
    ...Array(NUMBER_OF_COLUMNS).fill([...Array(NUMBER_OF_ROWS).fill(null)]),
  ];

  if (!storedState) return initialGameState;

  try {
    const parsedResult = JSON.parse(storedState);
    return parsedResult;
  } catch (e) {
    return initialGameState;
  }
}

function App() {
  const [gameState, setGameState] = useState(() => getInitialGameState());
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

    setGameState((currentGameState) => {
      const updatedState = updateGameState(
        currentGameState,
        columnIndex,
        rowIndex,
        cellValue
      );

      localStorage.setItem("gameState", JSON.stringify(updatedState));

      return updatedState;
    });
    setMostRecentMove([columnIndex, rowIndex]);
  }

  function handlePlayAgainButtonClick() {
    setGameState(initialGameState);
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
