import { PLAYERS } from "../constants";

function DisplayMessage({ isRedsTurn, winner }) {
  if (winner) {
    return (
      <p data-testid="display-message">
        {winner === PLAYERS.Yellow ? "Yellow" : "Red"} wins!
      </p>
    );
  }

  return (
    <p data-testid="display-message">
      Current turn: {isRedsTurn ? PLAYERS.Red : PLAYERS.Yellow}
    </p>
  );
}

export default DisplayMessage;
