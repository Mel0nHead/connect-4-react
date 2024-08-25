import { render, screen } from "@testing-library/react";
import DisplayMessage from "./DisplayMessage";

test("should display `Current turn: red` if isRedsTurn is true", async () => {
  render(<DisplayMessage isRedsTurn={true} />);
  const message = await screen.findByTestId("display-message");
  expect(message).toHaveTextContent("Current turn: red");
});

test("should display `Current turn: yellow` if isRedsTurn is false", async () => {
  render(<DisplayMessage isRedsTurn={false} />);
  const message = await screen.findByTestId("display-message");
  expect(message).toHaveTextContent("Current turn: yellow");
});
