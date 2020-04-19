import { actionTypes } from "../actions";

export default (state: string = "", action: any) => {
  switch (action.type) {
    case actionTypes.SET_SECRET_WORD:
      // don't need to return entire state since we are setting the word to the state for the first
      // time when the app starts
      return action.secretWord;
    default:
      return state;
  }
};

// export default (state = null, action: any) => {
//   switch (action.type) {
//     case actionTypes.SET_SECRET_WORD:
//       // don't need to return entire state since we are setting the word to the state for the first
//       // time when the app starts
//       return action.secretWord;
//     default:
//       return state;
//   }
// };
