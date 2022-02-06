import reducer, { add, remove, setInitialState } from "../matchWordsSlice";

describe("match words reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      initialPhrase: [],
      userSubmission: [],
    });
  });

  it("should add a word to the userSubmission array", () => {
    const previousState = {
      initialPhrase: ["I", "brush", "my", "teeth."],
      userSubmission: [],
    };
    expect(reducer(previousState, add("word"))).toEqual({
      initialPhrase: ["I", "brush", "my", "teeth."],
      userSubmission: ["word"],
    });
  });

  it("should remove a word from the userSubmition array", () => {
    const previousState = {
      initialPhrase: ["I", "brush", "my", "teeth."],
      userSubmission: ["word", "this", "no", "yes"],
    };
    expect(reducer(previousState, remove("this"))).toEqual({
      initialPhrase: ["I", "brush", "my", "teeth."],
      userSubmission: ["word", "no", "yes"],
    });
  });

  it("should set the initial state to the given array", () => {
    const initialState = {
      initialPhrase: ["this", "state", "initial", "state."],
      userSubmission: ["word", "a", "b", "apple"],
    };

    expect(reducer(undefined, setInitialState(initialState))).toEqual(
      initialState
    );
  });
});
