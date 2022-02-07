import * as game from "../features/game/gameSlice";
import {
  add,
  setNewWordGame,
  nextPhrase,
  resetWord,
} from "./matchWords/matchWordsSlice";
import { useDispatch } from "react-redux";

export const wordSubmitStatus = {
  completed: "completed",
  failed: "failed",
};

export const wordGameStatus = {
  completed: "completed",
  playing: "playing",
};

export default class WordGameController {
  constructor() {
    this.initialPhrase = [];
  }

  dispatch = useDispatch();

  phrasesArray = ["I brush my teeth.", "My name is Carlos"].map((phrase) =>
    phrase.split(" ")
  );

  async startWordGame() {
    //Here's where you fetch a new word
    this.dispatch(setNewWordGame(this.phrasesArray));
    this.dispatch(game.startGame());
  }

  tryNextPhrase(currentPhraseIndex) {
    //const waitAnimationMs = 1000;
    if (this.phrasesArray[currentPhraseIndex + 1] == undefined) {
      return wordGameStatus.completed;
    } else {
      this.dispatch(nextPhrase());
      return wordGameStatus.playing;
    }
  }

  trySubmitWord(word, userSubmission, initialPhrase) {
    if (this.#isRightWord(word, userSubmission, initialPhrase)) {
      this.dispatch(add(word));
      return wordSubmitStatus.completed;
    } else {
      this.dispatch(game.decrementLives());
      return wordSubmitStatus.failed;
    }
  }

  reset() {
    this.dispatch(game.startGame());
    this.dispatch(resetWord());
  }

  resetWord() {
    this.dispatch(resetWord());
  }

  #isRightWord(word, userSubmission, initialPhrase) {
    const indexOfSubmittedWord = userSubmission.length;
    return (
      initialPhrase[indexOfSubmittedWord].toLowerCase() == word.toLowerCase()
    );
  }
}
