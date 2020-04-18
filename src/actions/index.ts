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
  return function (dispatch: any, getState: any) {};
};
