import React from "react";
import { shallow } from "enzyme";
// "App" is the connected App  (from the export default statement in App.tsx which we have nicknamed here as just "App")
// while "UnconnectedApp" is the unconnected version of App (in the export class statement)
// We need UnconnectedApp to test if getSecretWord is being called in componentDidUpdate, b/c you can't do that with the connected version of App
import App, { UnconnectedApp } from "./App";

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

test("getSecretWord runs on App mount", () => {
  // create a mock function using jest which will tell you when itself is called
  const getSecretWordMock = jest.fn();

  const prop = {
    getSecretWord: getSecretWordMock,
    success: false,
    guessedWords: [],
  };
  // set up app component with getSecretWordMock as the getSecretWord prop
  // the real connected App gets the getSecretWord function from redux's connect() but we need to pass it on as a prop, so we will use the unconnected App
  // we can't use our setup() b/c that uses our connected App
  const wrapper = shallow(<UnconnectedApp {...prop} />);

  // For typescript, if you don't specify the type of the instance of the shallow wrapper, wrapper.instance(), the methods on the component it is shallowing will be undefined
  // Just mark it as the component like this: as ComponentYouAreShallowing
  const wrapperInstance = wrapper.instance() as UnconnectedApp;

  // run componentDidMount lifecycle method
  wrapperInstance.componentDidMount();

  // check to see if mock ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

  expect(getSecretWordCallCount).toBe(1);
});
