import React from "react";
import { shallow } from "enzyme";
import App from "./App";

import { storeFactory } from "../src/test/testUtils";

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store} />)
    .dive()
    .dive();

  return wrapper;
};

describe("redux properties", () => {
  test("success piece of state", () => {
    const success = false;
    const wrapper = setup({ success }) as any;
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });

  test("secretWord piece of state", () => {
    const secretWord = "party";
    const wrapper = setup({ secretWord }) as any;
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });

  test("guessWords piece of state", () => {
    const guessedWords = [{ guessedWord: "train", letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords }) as any;
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toBe(guessedWords);
  });

  test("getSecretWord action creator as a function prop", () => {
    const wrapper = setup() as any;
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});
