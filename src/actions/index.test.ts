import { correctGuess, actionTypes } from "./";

describe("correctGuess", () => {
  test("return an action with type `CORRECT_GUESS`", () => {
    const action = correctGuess();
    // can't use toBe() for mutable types like objects
    // expect the type of the action to be CORRECT_GUESS
    expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
  });
});
