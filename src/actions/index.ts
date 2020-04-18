import { getLetterMatchCount } from "../helpers";

export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS",
  GUESS_WORD: "GUESS_WORD",
};

/**
 * @function guessWord
 * @param {string} guessedWord - Guessed word.
 * @returns {function} - Redux Thunk function.
 */
// TODO: find out how to type this action creator (Redux Thunk)
export const guessWord = (guessedWord: string) => {
  // this is possible b/c of Redux Thunk middleware
  // It lets us dispatch more than 1 action at once by returning a function
  return function (dispatch: any, getState: any) {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    // add to the guessedWords array in the state
    dispatch({
      type: actionTypes.GUESS_WORD,
      guessedWord: { guessedWord, letterMatchCount },
    });

    // if the guessed word matches the secret word, tell the successReducer to
    // update the success in state from false to true
    if (guessedWord === secretWord) {
      dispatch({
        type: actionTypes.CORRECT_GUESS,
      });
    }
  };
};
