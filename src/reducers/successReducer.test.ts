import { actionTypes } from "../actions";
import successReducer from "./successReducer";

test("returns default initial state of `false` when no action is passed", () => {
  // We use undefined as the state parameter so the reducer will use default state,
  // this is fine b/c this reducer doesn't build upon existing state, it just changes a boolean
  // For example, if you were adding to an array, you should use default state and you should pass
  // in the previous state instead of undefined
  // We also pass in {} for the action so the reducer returns what you told it to in the default case of switch
  const newState = successReducer(undefined, {});
  expect(newState).toBe(false);
});

test("returns state of true upon receiving an action of type `CORRECT_GUESS`", () => {
  const newState = successReducer(undefined, {
    type: actionTypes.CORRECT_GUESS,
  });
  expect(newState).toBe(true);
});
