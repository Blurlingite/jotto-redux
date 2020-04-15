/**
 * @method
 * @param {string} guessedWord - Guessed word.
 * @param {string} secretWord - Secret word.
 * @returns {number} - Number of letters matched between guessed word and secret word
 */
export function getLetterMatchCount(guessedWord: string, secretWord: string) {
  const secretLetterSet = new Set(secretWord.split(""));
  const guessedLetterSet = new Set(guessedWord.split(""));
  // had to add "downlevelIteration": true to tsconfig.json to stop errorr - this is a typescript error that developers need to fix
  // there is a downside: https://stackoverflow.com/questions/33464504/using-spread-syntax-and-new-set-with-typescript/33464709
  return [...secretLetterSet].filter((letter) => guessedLetterSet.has(letter))
    .length;
}
