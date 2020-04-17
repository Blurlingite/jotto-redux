import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../test/testUtils";

import Input from "../components/Input";

const setup = (initialState = {}) => {
  // use whatever you passed in to populate the state in the store
  const store = storeFactory(initialState);

  // we use dive() twice:
  // The 1st time is to dive down from the ContextProvider component into the declaration of the Input component
  // The 2nd time is dive inside the Input component to see what it is rendering
  // This is useful when your component has child components and you are testing to see what
  // those child components are rendering, which we are in this file
  const wrapper = shallow(<Input store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("render", () => {
  describe("word has not been guessed", () => {
    test("render component w/o error", () => {});
    test("renders input box", () => {});
    test("renders submit button", () => {});
  });

  describe("word has been guessed", () => {
    test("render component w/o error", () => {});
    test("does not render input box", () => {});
    test("does not render submit button", () => {});
  });
});

describe("update state", () => {});
