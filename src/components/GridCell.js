import { PLAYERS } from "../constants";

const CELL_SIZE = 60;

function GameToken({ colour }) {
  return (
    <div
      style={{
        background: colour === PLAYERS.Red ? "#cc0000" : "#f6c901",
        height: CELL_SIZE,
        width: CELL_SIZE,
        borderRadius: "50%",
      }}
    >
      <span style={{ display: "none" }}>{colour}</span>
    </div>
  );
}

function GridCell({ onClick, cellIndex, value, isWinningCell }) {
  return (
    <div
      role="button"
      onClick={onClick}
      style={{
        border: "1px solid",
        height: CELL_SIZE,
        width: CELL_SIZE,
      }}
      data-testid={`grid-cell-${cellIndex}`}
    >
      {isWinningCell ? <span>W</span> : null}
      {value ? <GameToken colour={value} /> : null}
    </div>
  );
}

export default GridCell;
