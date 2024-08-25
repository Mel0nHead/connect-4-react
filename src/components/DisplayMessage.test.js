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

test("should display `Yellow wins!` if yellow is the winner", async () => {
  render(<DisplayMessage isRedsTurn={false} winner="yellow" />);
  const message = await screen.findByTestId("display-message");
  expect(message).toHaveTextContent("Yellow wins!");
});

test("should display `Red wins!` if red is the winner", async () => {
  render(<DisplayMessage isRedsTurn={false} winner="red" />);
  const message = await screen.findByTestId("display-message");
  expect(message).toHaveTextContent("Red wins!");
});
