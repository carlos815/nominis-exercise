import ClickableWord from "../ClickableWord";
import { render, fireEvent, screen } from "../../../test-utils";
import MatchWords from "../MatchWords";

describe("MatchWords element", () => {
  it("renders a collection of buttons given an array", () => {
    const wordToTest = "test text";

    render(
      <MatchWords
        wordsArray={[
          { word: 1, index: 1 },
          { word: 2, index: 2 },
          { word: 3, index: 3 },
        ]}
      />
    );

    const button1 = screen.getByRole("button", { name: "1" });
    const button2 = screen.getByRole("button", { name: "2" });
    const button3 = screen.getByRole("button", { name: "3" });

    expect(button1).toBeInTheDocument;
    expect(button2).toBeInTheDocument;
    expect(button3).toBeInTheDocument;
  });
});
