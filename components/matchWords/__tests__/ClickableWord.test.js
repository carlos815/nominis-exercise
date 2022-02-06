import ClickableWord from "../ClickableWord";
import { render, fireEvent, screen } from "../../../test-utils";

import reducer, {
  add,
  remove,
  setInitialState,
} from "../../../features/matchWords/matchWordsSlice";

describe("ClickableWord", () => {
  it("renders button with the given word", () => {
    const wordToTest = "test text";

    render(<ClickableWord word={wordToTest} />);

    const clickableWord = screen.getByRole("button", { name: wordToTest });

    expect(clickableWord).toBeInTheDocument;
  });

  /*it("adds the word to the userSubmission array when clicked", () => {
    const previousState = {
      initialPhrase: ["I", "brush", "my", "teeth."],
      userSubmission: [],
    };

    const wordToTest = "word";

    render(<ClickableWord word={wordToTest} />);

    const clickableWord = screen.getByRole("button", { name: wordToTest });
    //  fireEvent.click(clickableWord);

    expect(reducer(previousState), add(wordToTest)).toEqual({
      initialPhrase: ["I", "brush", "my", "teeth."],
      userSubmission: [wordToTest],
    });
  });*/
});
