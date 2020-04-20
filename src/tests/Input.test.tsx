import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr, storeFactory } from "../test/testUtils";

import ConnectedInput, { Input } from "../components/Input";

const setup = (initialState = {}) => {
  // use whatever you passed in to populate the state in the store
  const store = storeFactory(initialState);

  // we use dive() twice:
  // The 1st time is to dive down from the ContextProvider component into the declaration of the Input component
  // The 2nd time is dive inside the Input component to see what it is rendering
  // This is useful when your component has child components and you are testing to see what
  // those child components are rendering, which we are in this file
  const wrapper = shallow(<ConnectedInput store={store} />)
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

describe("redux props", () => {
  test("has success piece of state as prop", () => {
    const success = true;
    const wrapper = setup({ success }) as any; // marked 'as any' b/c Typescript can't work with Enzyme's instance(), so I'll get an error about 'success' property not existing
    // get the props from the instance of the component, and then get the success piece of state
    // the success piece of state is in the props
    // const wrapper = shallow(<Input {...props} />);
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });

  // can't compare guessWord prop with guessWord function b/c comparing functions doesn't work, so we'll
  // just test that the guessWord action creator is there and is a function
  test("`guessWord` action creator is a function prop", () => {
    const wrapper = setup() as any; // marked 'as any' b/c Typescript can't work with Enzyme's instance(), so I'll get an error about 'success' property not existing
    // get the action creator
    const guessWordProp = wrapper.instance().props.guessWord;
    // when this 'expect' runs, it will look at your component's constructor. So if that guessWord action
    // creator isn't there (either in a constructor or the connect() function), you'll get an undefined error
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

// describe("guessWord action creator call", () => {
//   let guessWordMock: any;
//   let wrapper: any;
//   const guessedWord = "train";
//   beforeEach(() => {
//     guessWordMock = jest.fn();

//     const props = {
//       guessWord: guessWordMock,
//       success: false,
//     };
//     wrapper = shallow(<Input {...props} />);

//     // add value to Input box (equivalent of entering a word into the box) by setting state of shallow wrapper, this is not the same as the component state b/c you can put whatever kind of data you want
//     wrapper.setState({ correctGuess: guessedWord });
//     const submitButton = findByTestAttr(wrapper, "submit-button");

//     // simulate button click
//     submitButton.simulate("click", { preventDefault() {} });
//   });
//   test("guessWord is called once", () => {
//     // check to see if mock ran
//     const guessWordCallCount = guessWordMock.mock.calls.length;
//     expect(guessWordCallCount).toBe(1);
//   });

//   test("calls guessWord with input value as argument", () => {
//     // if you console.log() the "guessWordMock.mock.calls" you can find out more info about the calls
//     // you'll see that it's an array of arrays with each array representing a call from first to last
//     // So if you called your mock function 2 times with different arguments, in the case of guessWord let's say it's "train" & "party",
//     // It looks like this [["train"],["party"]]
//     // If you had 2 arguments per call ("train" 3 & "party" 5), it will look like this [["train,3"],[party,5]]
//     // So we can get the word from the input's state by first accessing the first element of the array of arrays, and then accessing that particular array's 1st element like this: [0][0]
//     const guessedWordArg = guessWordMock.mock.calls[0][0];
//     expect(guessedWordArg).toBe(guessedWord);
//   });
// });
describe("`guessWord` action creator", () => {
  let guessWordMock: any;
  let wrapper: any;
  const guessedWord = "train";

  beforeEach(() => {
    // create a mock function for `getSecretWord`
    guessWordMock = jest.fn();
    const props = {
      success: false,
      guessWord: guessWordMock,
    };
    // set up Input, with guessWordMock as a prop
    wrapper = shallow(<Input {...props} />);

    // add value to input box
    wrapper.setState({ currentGuess: guessedWord });

    // simulate click on submit button
    const submit = findByTestAttr(wrapper, "submit-button");
    submit.simulate("click", { preventDefault() {} });
  });
  test("`guessWord` was called once", () => {
    const guessWordCallCount = guessWordMock.mock.calls.length;
    expect(guessWordCallCount).toBe(1);
  });
  test("calls `guessWord with input value as argument`", () => {
    const guessWordArg = guessWordMock.mock.calls[0][0];
    expect(guessWordArg).toBe(guessedWord);
  });
});
