import { actionTypes } from "../actions";

/**
 * @function successReducer
 * @param {boolean} state - boolean.
 * @param {object} action - action to be reduced.
 * @returns {boolean} - new success state
 */
// state is defaulted to false
export default (state: boolean = false, action: any) => {
  switch (action.type) {
    case actionTypes.CORRECT_GUESS: {
      return true;
    }
    default:
      return state;
  }
};
