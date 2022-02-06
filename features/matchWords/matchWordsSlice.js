import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialPhrase: [],
  userSubmission: [],
};

export const matchWordsSlice = createSlice({
  name: "matchWords",
  initialState,
  reducers: {
    add: (state, action) => {
      state.userSubmission.push(action.payload);
    },
    remove: (state, action) => {
      const indexOfWord = state.userSubmission.indexOf(action.payload);
      if (indexOfWord !== -1) state.userSubmission.splice(indexOfWord, 1);
    },

    setInitialState: (state, action) => {
      state.initialPhrase = action.payload.initialPhrase;
      state.userSubmission = action.payload.userSubmission;
    },

    reset: (state) => {
      state.userSubmission = [];
    },
  },
});

export const { add, remove, setInitialState, reset } = matchWordsSlice.actions;

export default matchWordsSlice.reducer;
