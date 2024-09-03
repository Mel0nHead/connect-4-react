import { CELL_SIZE } from "../constants";
import GameToken from "./GameToken";

function GridCell({
  onClick,
  cellIndex,
  value,
  isWinningCell,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      role="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        border: "1px solid",
        height: CELL_SIZE,
        width: CELL_SIZE,
        padding: 5,
        background: isWinningCell ? "#3bfa3b" : "none",
      }}
      data-testid={`grid-cell-${cellIndex}`}
    >
      {isWinningCell ? <span style={{ display: "none" }}>W</span> : null}
      {value ? <GameToken value={value} /> : null}
    </div>
  );
}

export default GridCell;
