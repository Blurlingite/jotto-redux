import { ShallowWrapper } from "enzyme";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import { middlewares } from "../configureStore";
// import checkPropTypes from "check-prop-types";

/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper: ShallowWrapper, val: string) => {
  return wrapper.find(`[data-test="${val}"]`);
};

// make a redux store for test files
export const storeFactory = (initialState: any) => {
  const createStoreWithMiddlewares = applyMiddleware(...middlewares)(
    createStore
  );

  return createStoreWithMiddlewares(rootReducer, initialState);
};

// don't need to check proptypes when using Typescript & interfaces
// export const checkProps = (
//   component: React.FunctionComponent,
//   conformingProps: any
// ) => {
//   const expectedProps = { success: false };
//   const propError = checkPropTypes(
//     component.propTypes,
//     conformingProps,
//     "prop",
//     component.name
//   );
//   expect(propError).toBeUndefined();
// };
