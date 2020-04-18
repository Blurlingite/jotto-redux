import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
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
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    test("render component w/o error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("renders input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(1);
    });
    test("renders submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(1);
    });
  });

  describe("word has been guessed", () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });
    test("render component w/o error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("does not render input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(0);
    });
    test("does not render submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(0);
    });
  });
});

describe("update state", () => {});
