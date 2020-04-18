import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";

// we export the middlewares so we can use them in our tests
export const middlewares = [ReduxThunk];
// we are wrapping the redux store (createStore) with the middlewares so it's dispatch function can use
// the middlewares in other parts of your code, when you access the store
const createStoreWithMiddlewares = applyMiddleware(...middlewares)(createStore);

// rootReducer gets passed into the 2nd parameter of createStoreWithMiddlewares, which
// is createStore
export default createStoreWithMiddlewares(rootReducer);
