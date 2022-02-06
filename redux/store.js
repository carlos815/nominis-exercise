import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import matchWordsReducer from "../features/matchWords/matchWordsSlice";
import gameReducer from "../features/game/gameSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    matchWords: matchWordsReducer,
    game: gameReducer,
  },
});
