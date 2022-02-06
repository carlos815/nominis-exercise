import { createSlice } from "@reduxjs/toolkit";

//This one controls the global state of teh game
//For now it only has a lives counter
const initialState = {
  lives: 5,
  livesTotal: 5,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementLives: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.lives += 1;
    },
    decrementLives: (state) => {
      state.lives -= 1;
    },
    setInitialState: (state, action) => {
      state.livesTotal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementLives, decrementLives, setInitialState } =
  gameSlice.actions;

export default gameSlice.reducer;
