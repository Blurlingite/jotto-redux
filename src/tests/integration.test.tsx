import { storeFactory } from "../test/testUtils";
import { guessWord } from "../actions";

describe("guessWord action dispatcher", () => {
  const secretWord = "party";
  const unsuccessfulGuess = "train";

  describe("no guessed words", () => {
    let store: any;
    // success is defaulted to false & guessedWords array is defaulted to an empty array, so we just need to add
    // the secret word
    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test("updates state correctly for unsuccessful guess", () => {
      // dispatch guessWord action with the unsuccessful guess
      store.dispatch(guessWord(unsuccessfulGuess));
      // get the actual state after dispatching
      const newState = store.getState();
      // See if the state we get back is what we expect
      // we expect to get:
      // 1)  the secretWord (...initialState) since that should not have changes
      // 2) success should be false b/c we guessed incorrectly
      // 3) The word we guessed should be added to the array of guessedWords
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [{ guessedWord: unsuccessfulGuess, letterMatchCount: 3 }],
      };

      expect(newState).toEqual(expectedState);
    });

    test("updates state correctly for successful guess", () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();

      const expectedState = {
        secretWord,
        success: true,
        guessedWords: [{ guessedWord: secretWord, letterMatchCount: 5 }],
      };

      expect(newState).toEqual(expectedState);
    });
  });

  describe("some guessed words", () => {
    const guessedWords = [{ guessedWord: "agile", letterMatchCount: 1 }];
    const initialState = { guessedWords, secretWord };

    let store: any;
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test("updates state correctly for unsuccessful guess", () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: false,
        guessedWords: [
          ...guessedWords,
          { guessedWord: unsuccessfulGuess, letterMatchCount: 3 },
        ],
      };

      expect(newState).toEqual(expectedState);
    });

    test("updates state correctly for successful guess", () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: true,
        guessedWords: [
          ...guessedWords,
          { guessedWord: secretWord, letterMatchCount: 5 },
        ],
      };
      expect(newState).toEqual(expectedState);
    });
  });
});
