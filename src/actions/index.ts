import axios from "axios";

import { getLetterMatchCount } from "../helpers";

export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS",
  GUESS_WORD: "GUESS_WORD",
  SET_SECRET_WORD: "SET_SECRET_WORD",
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

export const getSecretWord = () => {
  return (dispatch: any) => {
    // make sure to put a return before the axios call in this case so
    // that this function doesn't complete before the asynchroncity is complete

    // the 'response' variable in .then() is being declared for the first time there, so you
    // can name it what you like. Whatever you name it, the response that axios gets will
    // be what the 'response' variable equals
    return axios.get("http://localhost:3030").then((response) => {
      dispatch({
        type: actionTypes.SET_SECRET_WORD,
        secretWord: response.data, // axios stores the stuff from the response (in this case the secretWord) in .data of the response object
      });
    });
  };
};
