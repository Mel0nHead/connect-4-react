function DisplayMessage({ isRedsTurn }) {
  return (
    <p data-testid="display-message">
      Current turn: {isRedsTurn ? "red" : "yellow"}
    </p>
  );
}

export default DisplayMessage;
