import { actionTypes } from "../actions";

export default (state: any = [], action: any) => {
  switch (action.type) {
    case actionTypes.GUESS_WORD:
      return [...state, action.guessedWord];
    default:
      return state;
  }
};
