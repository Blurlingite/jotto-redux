import { actionTypes } from "../actions";

type guessedWordType = { guessedWord: string; letterMatchCount: number };

export default (state: guessedWordType[] = [], action: any) => {
  switch (action.type) {
    case actionTypes.GUESS_WORD:
      return [...state, action.guessedWord];
    default:
      return state;
  }
};
