import { CELL_SIZE, PLAYERS } from "../constants";

function GameToken({ value }) {
  return (
    <div
      style={{
        background: value === PLAYERS.Red ? "#cc0000" : "#f6c901",
        height: CELL_SIZE,
        width: CELL_SIZE,
        borderRadius: "50%",
      }}
    >
      <span style={{ display: "none" }}>{value}</span>
    </div>
  );
}

export default GameToken;
