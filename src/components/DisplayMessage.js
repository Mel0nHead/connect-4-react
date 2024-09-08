import { PLAYERS } from "../constants";

function DisplayMessage({ isRedsTurn, winner, isGridFull }) {
  function getMessage() {
    if (winner) {
      return `${winner === PLAYERS.Yellow ? "Yellow" : "Red"} wins!`;
    } else if (isGridFull) {
      return "It's a draw!";
    } else {
      return `Current turn: ${isRedsTurn ? PLAYERS.Red : PLAYERS.Yellow}`;
    }
  }

  return <p data-testid="display-message">{getMessage()}</p>;
}

export default DisplayMessage;
