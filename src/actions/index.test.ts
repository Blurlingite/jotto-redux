import moxios from "moxios";
import { storeFactory } from "../test/testUtils";
import { getSecretWord } from ".";

describe("getSecretWord action creator", () => {
  beforeEach(() => {
    // moxios will make axios come to it for a response instead of the actual server (which is bad if
    // the test were accessing it)
    // install moxios before each test
    moxios.install();
  });
  afterEach(() => {
    // uninstall moxios after each test to allow axios to make it's normal api calls
    moxios.uninstall();
  });

  test("adds response word to state", () => {
    const secretWord = "party";
    const store = storeFactory({});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    return store.dispatch(getSecretWord()).then(() => {
      const newState = store.getState();
      expect(newState.secretWord).toBe(secretWord);
    });
  });
});
